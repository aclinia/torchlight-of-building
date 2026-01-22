import { enumRegistry } from "./enums";
import type { CompiledTemplate } from "./types";

// Get the regex pattern for a capture type
const getCapturePattern = (type: string): string => {
  // Check for percentage suffix
  const isPercent = type.endsWith("%");
  const baseType = isPercent ? type.slice(0, -1) : type;

  // Check for sign prefix: + (required sign), ? (optional sign), or none (unsigned)
  const isRequiredSign = baseType.startsWith("+");
  const isOptionalSign = baseType.startsWith("?");
  const numericType =
    isRequiredSign || isOptionalSign ? baseType.slice(1) : baseType;

  let pattern: string;
  switch (numericType) {
    case "int":
      if (isRequiredSign) {
        pattern = "([+-]\\d+)";
      } else if (isOptionalSign) {
        pattern = "([+-]?\\d+)";
      } else {
        pattern = "(\\d+)";
      }
      break;
    case "dec":
      if (isRequiredSign) {
        pattern = "([+-]\\d+(?:\\.\\d+)?)";
      } else if (isOptionalSign) {
        pattern = "([+-]?\\d+(?:\\.\\d+)?)";
      } else {
        pattern = "(\\d+(?:\\.\\d+)?)";
      }
      break;
    case "words":
      // Match one or more words (letters, possibly with spaces between)
      pattern = "([a-z]+(?:\\s+[a-z]+)*)";
      break;
    default:
      // Enum type - use word pattern
      pattern = "(\\w+)";
      break;
  }

  // For percentage types, include the % in the pattern (but outside capture group)
  return isPercent ? `${pattern}%` : pattern;
};

// Get the extractor function for a capture type
const getExtractor = (
  type: string,
  enumMappings: Map<string, Record<string, string>>,
): ((s: string) => string | number) => {
  // Check for percentage suffix
  const isPercent = type.endsWith("%");
  const baseType = isPercent ? type.slice(0, -1) : type;

  // Strip sign prefix if present (+int, +dec, ?int, ?dec)
  const numericType =
    baseType.startsWith("+") || baseType.startsWith("?")
      ? baseType.slice(1)
      : baseType;

  switch (numericType) {
    case "int":
      return (s) => parseInt(s, 10);
    case "dec":
      return (s) => parseFloat(s);
    case "words":
      // Return the matched words as title case (input is lowercased before matching)
      return (s) =>
        s
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    default: {
      // Check if there's a custom enum mapping
      const mapping = enumMappings.get(baseType);
      if (mapping) {
        return (s) => {
          const lower = s.toLowerCase();
          return mapping[lower] ?? lower;
        };
      }
      // Default: lowercase the value
      return (s) => s.toLowerCase();
    }
  }
};

export interface CompileOptions {
  /** If true, match substring instead of full string (no ^ and $ anchors) */
  substring?: boolean;
}

// Compile a template string into a regex and extractors
export const compileTemplate = (
  template: string,
  enumMappings: Map<string, Record<string, string>>,
  options?: CompileOptions,
): CompiledTemplate => {
  const captureNames: string[] = [];
  const extractors = new Map<string, (match: string) => string | number>();

  // Process the template piece by piece
  let regexStr = "";
  let pos = 0;
  let pendingSpace = false; // Track if we have a pending space before optionals

  while (pos < template.length) {
    // Check for escape sequence: \( or \) or \\
    if (template[pos] === "\\" && pos + 1 < template.length) {
      if (pendingSpace) {
        regexStr += "\\s+";
        pendingSpace = false;
      }
      // Escape the next character literally
      regexStr += escapeRegexChar(template[pos + 1]);
      pos += 2;
      continue;
    }

    // Check for brace: {name:type} or {(alt1|alt2)}
    if (template[pos] === "{") {
      const endBrace = template.indexOf("}", pos);
      if (endBrace !== -1) {
        const captureContent = template.slice(pos + 1, endBrace);

        // Check for alternation: {(a|b|c)}
        if (captureContent.startsWith("(") && captureContent.endsWith(")")) {
          // Flush pending space
          if (pendingSpace) {
            regexStr += "\\s+";
            pendingSpace = false;
          }

          const alternatives = captureContent.slice(1, -1); // strip parens
          // Use capturing group for alternation so we can extract the matched value
          const altCaptureName = `_alt${captureNames.length}`;
          captureNames.push(altCaptureName);
          extractors.set(altCaptureName, (s) => s.toLowerCase());
          regexStr += `(${escapeRegexLiteral(alternatives)})`;

          pos = endBrace + 1;
          continue;
        }

        // Check for capture: {name:type}
        const colonIdx = captureContent.indexOf(":");
        if (colonIdx !== -1) {
          const name = captureContent.slice(0, colonIdx);
          const type = captureContent.slice(colonIdx + 1);

          // Flush pending space before non-optional elements
          if (pendingSpace) {
            regexStr += "\\s+";
            pendingSpace = false;
          }

          captureNames.push(name);
          extractors.set(name, getExtractor(type, enumMappings));
          regexStr += getCapturePattern(type);

          pos = endBrace + 1;
          continue;
        }
      }
    }

    // Check for optional: [content]
    if (template[pos] === "[") {
      const endBracket = findMatchingBracket(template, pos);
      if (endBracket !== -1) {
        const content = template.slice(pos + 1, endBracket);

        // Check if content is just a literal word (like "additional")
        const literalMatch = content.match(/^(\w+)$/);
        if (literalMatch) {
          // For literal words, add as a capture group so we can detect presence
          const word = literalMatch[1];
          captureNames.push(word);
          extractors.set(word, (s) => s.toLowerCase());

          if (pendingSpace) {
            regexStr += `(?:\\s+(${word}))?`;
            pendingSpace = false;
          } else {
            regexStr += `(?:(${word}))?`;
          }
        } else {
          // Recursively compile the optional content, including the pending space
          const innerCompiled = compileInner(
            content,
            enumMappings,
            captureNames,
            extractors,
          );
          if (pendingSpace) {
            regexStr += `(?:\\s+${innerCompiled})?`;
            pendingSpace = false;
          } else {
            regexStr += `(?:${innerCompiled})?`;
          }
        }

        pos = endBracket + 1;
        continue;
      }
    }

    // Check for whitespace - mark as pending
    if (/\s/.test(template[pos])) {
      // Skip all consecutive whitespace
      while (pos < template.length && /\s/.test(template[pos])) {
        pos++;
      }
      pendingSpace = true;
      continue;
    }

    // Regular character - flush pending space and escape if needed
    if (pendingSpace) {
      regexStr += "\\s+";
      pendingSpace = false;
    }
    regexStr += escapeRegexChar(template[pos]);
    pos++;
  }

  const pattern = options?.substring === true ? regexStr : `^${regexStr}$`;

  return {
    templateStr: template,
    regex: new RegExp(pattern, "i"),
    captureNames,
    extractors,
  };
};

// Compile inner content (for optionals) without wrapping in ^...$
const compileInner = (
  template: string,
  enumMappings: Map<string, Record<string, string>>,
  captureNames: string[],
  extractors: Map<string, (match: string) => string | number>,
): string => {
  let regexStr = "";
  let pos = 0;

  while (pos < template.length) {
    // Check for brace: {name:type} or {(alt1|alt2)}
    if (template[pos] === "{") {
      const endBrace = template.indexOf("}", pos);
      if (endBrace !== -1) {
        const captureContent = template.slice(pos + 1, endBrace);

        // Check for alternation: {(a|b|c)}
        if (captureContent.startsWith("(") && captureContent.endsWith(")")) {
          const alternatives = captureContent.slice(1, -1); // strip parens
          // Use non-capturing group for alternation inside optionals
          regexStr += `(?:${escapeRegexLiteral(alternatives)})`;

          pos = endBrace + 1;
          continue;
        }

        // Check for capture: {name:type}
        const colonIdx = captureContent.indexOf(":");
        if (colonIdx !== -1) {
          const name = captureContent.slice(0, colonIdx);
          const type = captureContent.slice(colonIdx + 1);

          captureNames.push(name);
          extractors.set(name, getExtractor(type, enumMappings));
          regexStr += getCapturePattern(type);

          pos = endBrace + 1;
          continue;
        }
      }
    }

    // Check for whitespace - convert to \s+
    if (/\s/.test(template[pos])) {
      while (pos < template.length && /\s/.test(template[pos])) {
        pos++;
      }
      regexStr += "\\s+";
      continue;
    }

    // Regular character - escape if needed
    regexStr += escapeRegexChar(template[pos]);
    pos++;
  }

  return regexStr;
};

// Find matching ] bracket
const findMatchingBracket = (str: string, start: number): number => {
  let depth = 1;
  let i = start + 1;
  while (i < str.length && depth > 0) {
    if (str[i] === "[") depth++;
    else if (str[i] === "]") depth--;
    i++;
  }
  return depth === 0 ? i - 1 : -1;
};

// Escape a single character for regex
const escapeRegexChar = (char: string): string => {
  // biome-ignore lint/suspicious/noTemplateCurlyInString: listing regex special chars, not template
  if (".*+?^${}()|[]\\".includes(char)) {
    return `\\${char}`;
  }
  return char;
};

// Escape literal text but preserve | for alternation
const escapeRegexLiteral = (str: string): string => {
  return str.replace(/[.*+?^${}()[\]\\]/g, "\\$&");
};

// Validate a captured value against an enum
export const validateEnum = (enumName: string, value: string): boolean => {
  const values = enumRegistry.get(enumName);
  if (!values) return true; // No validation if enum not registered
  return values.has(value.toLowerCase());
};
