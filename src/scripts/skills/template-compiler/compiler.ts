import type { CompiledTemplate } from "./types";

/**
 * Get the regex pattern for a capture type.
 */
const getCapturePattern = (type: string): string => {
  const isPercent = type.endsWith("%");
  const baseType = isPercent ? type.slice(0, -1) : type;

  let pattern: string;
  switch (baseType) {
    case "int":
      pattern = "([+-]?\\d+)";
      break;
    case "dec":
      pattern = "([+-]?\\d+(?:\\.\\d+)?)";
      break;
    default:
      // Unknown type - use word pattern
      pattern = "(\\w+)";
      break;
  }

  return isPercent ? `${pattern}%` : pattern;
};

/**
 * Get the extractor function for a capture type.
 */
const getExtractor = (type: string): ((s: string) => string | number) => {
  const isPercent = type.endsWith("%");
  const baseType = isPercent ? type.slice(0, -1) : type;

  switch (baseType) {
    case "int":
      return (s) => parseInt(s, 10);
    case "dec":
      return (s) => parseFloat(s);
    default:
      return (s) => s.toLowerCase();
  }
};

/**
 * Find matching ] bracket, handling nesting.
 */
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

/**
 * Find matching ) parenthesis, handling nesting.
 */
const findMatchingParen = (str: string, start: number): number => {
  let depth = 1;
  let i = start + 1;
  while (i < str.length && depth > 0) {
    if (str[i] === "(") depth++;
    else if (str[i] === ")") depth--;
    i++;
  }
  return depth === 0 ? i - 1 : -1;
};

/**
 * Escape a single character for regex.
 */
const escapeRegexChar = (char: string): string => {
  // biome-ignore lint/suspicious/noTemplateCurlyInString: listing regex special chars
  if (".*+?^${}()|[]\\".includes(char)) {
    return "\\" + char;
  }
  return char;
};

/**
 * Escape literal text but preserve | for alternation.
 */
const escapeRegexLiteral = (str: string): string => {
  return str.replace(/[.*+?^${}()[\]\\]/g, "\\$&");
};

/**
 * Compile inner content (for optionals) without wrapping.
 */
const compileInner = (
  template: string,
  captureNames: string[],
  extractors: Map<string, (match: string) => string | number>,
): string => {
  let regexStr = "";
  let pos = 0;

  while (pos < template.length) {
    // Check for capture: {name:type}
    if (template[pos] === "{") {
      const endBrace = template.indexOf("}", pos);
      if (endBrace !== -1) {
        const captureContent = template.slice(pos + 1, endBrace);
        const colonIdx = captureContent.indexOf(":");
        if (colonIdx !== -1) {
          const name = captureContent.slice(0, colonIdx);
          const type = captureContent.slice(colonIdx + 1);

          captureNames.push(name);
          extractors.set(name, getExtractor(type));
          regexStr += getCapturePattern(type);

          pos = endBrace + 1;
          continue;
        }
      }
    }

    // Check for alternation: (a|b|c)
    if (template[pos] === "(") {
      const endParen = findMatchingParen(template, pos);
      if (endParen !== -1) {
        const content = template.slice(pos + 1, endParen);
        regexStr += `(?:${escapeRegexLiteral(content)})`;
        pos = endParen + 1;
        continue;
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

/**
 * Compile a template string into a regex and extractors.
 * Uses substring matching (no ^ or $ anchors).
 */
export const compileTemplate = (template: string): CompiledTemplate => {
  const captureNames: string[] = [];
  const extractors = new Map<string, (match: string) => string | number>();

  let regexStr = "";
  let pos = 0;
  let pendingSpace = false;

  while (pos < template.length) {
    // Check for escape sequence: \( or \) or \\
    if (template[pos] === "\\" && pos + 1 < template.length) {
      if (pendingSpace) {
        regexStr += "\\s+";
        pendingSpace = false;
      }
      regexStr += escapeRegexChar(template[pos + 1]);
      pos += 2;
      continue;
    }

    // Check for capture: {name:type}
    if (template[pos] === "{") {
      const endBrace = template.indexOf("}", pos);
      if (endBrace !== -1) {
        const captureContent = template.slice(pos + 1, endBrace);
        const colonIdx = captureContent.indexOf(":");
        if (colonIdx !== -1) {
          const name = captureContent.slice(0, colonIdx);
          const type = captureContent.slice(colonIdx + 1);

          if (pendingSpace) {
            regexStr += "\\s+";
            pendingSpace = false;
          }

          captureNames.push(name);
          extractors.set(name, getExtractor(type));
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
          const innerCompiled = compileInner(content, captureNames, extractors);
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

    // Check for alternation: (a|b|c)
    if (template[pos] === "(") {
      const endParen = findMatchingParen(template, pos);
      if (endParen !== -1) {
        if (pendingSpace) {
          regexStr += "\\s+";
          pendingSpace = false;
        }

        const content = template.slice(pos + 1, endParen);
        const altCaptureName = `_alt${captureNames.length}`;
        captureNames.push(altCaptureName);
        extractors.set(altCaptureName, (s) => s.toLowerCase());
        regexStr += `(${escapeRegexLiteral(content)})`;
        pos = endParen + 1;
        continue;
      }
    }

    // Check for whitespace - mark as pending
    if (/\s/.test(template[pos])) {
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

  // No anchors - substring matching
  return {
    templateStr: template,
    regex: new RegExp(regexStr, "i"),
    captureNames,
    extractors,
  };
};
