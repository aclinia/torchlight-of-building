import { execSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import {
  type ActiveSkill,
  type BaseSkill,
  type MagnificentSupportSkill,
  type NobleSupportSkill,
  SKILL_TAGS,
  type SkillTag,
  type SupportSkill,
  type SupportTarget,
} from "../data/skill/types";
import { readCodexHtml } from "./lib/codex";
import { classifyWithRegex } from "./skill_kind_patterns";

interface RawSkill {
  type: string;
  name: string;
  tags: string[];
  description: string[];
}

// Set for fast tag validation
const VALID_TAGS = new Set<string>(SKILL_TAGS);

// Compound tags that contain spaces (must be checked before splitting by whitespace)
const COMPOUND_TAGS: SkillTag[] = [
  "Base Skill",
  "Enhanced Skill",
  "Shadow Strike",
  "Slash-Strike",
  "Spirit Magus",
  "Synthetic Troop",
];

// Edge case: description uses "Slash Strike" but tag is "Slash-Strike"
const DESCRIPTION_TO_TAG: Record<string, SkillTag> = {
  "Slash Strike": "Slash-Strike",
};

const validateTag = (tag: string, skillName: string): SkillTag => {
  if (!VALID_TAGS.has(tag)) {
    throw new Error(`Unknown tag "${tag}" found in skill "${skillName}"`);
  }
  return tag as SkillTag;
};

// Parse tags from a string like "Melee Attack" or "Horizontal Projectile"
const parseTagsFromString = (
  tagString: string,
  skillName: string,
): SkillTag[] => {
  const tags: SkillTag[] = [];
  let remaining = tagString.trim();

  // First check for edge case mappings (e.g., "Slash Strike" -> "Slash-Strike")
  for (const [descText, tagValue] of Object.entries(DESCRIPTION_TO_TAG)) {
    if (remaining.includes(descText)) {
      tags.push(tagValue);
      remaining = remaining.replace(descText, "").trim();
    }
  }

  for (const compoundTag of COMPOUND_TAGS) {
    if (remaining.includes(compoundTag)) {
      tags.push(compoundTag);
      remaining = remaining.replace(compoundTag, "").trim();
    }
  }

  // Finally split remaining by spaces for single-word tags
  const singleTags = remaining.split(/\s+/).filter((t) => t.length > 0);
  for (const tag of singleTags) {
    tags.push(validateTag(tag, skillName));
  }

  return tags;
};

interface ParsedSupportTargets {
  supportTargets: SupportTarget[];
  cannotSupportTargets: SupportTarget[];
}

const parseSupportTargets = (
  description: string,
  skillName: string,
): ParsedSupportTargets => {
  const supportTargets: SupportTarget[] = [];
  const cannotSupportTargets: SupportTarget[] = [];

  // Search the entire first description part (not just first line)
  // as "Cannot support" clauses may appear on subsequent lines

  // Special patterns (check these first, in order of specificity)
  const specialPatterns: Array<{
    pattern: RegExp;
    targets: SupportTarget[];
    isCannotSupport?: boolean;
  }> = [
    // DoT + Ailment combinations (check before pure DoT)
    {
      pattern: /Supports DoT Skills and skills that can inflict Ailment/i,
      targets: ["dot", "inflict_ailment"],
    },
    {
      pattern:
        /Supports skills that deal Damage Over Time or inflict Ailments/i,
      targets: ["dot", "inflict_ailment"],
    },
    // Hit enemies + DoT combination
    {
      pattern: /Supports skills that hit enemies or deal Damage Over Time/i,
      targets: ["hit_enemies", "dot"],
    },
    // Spell + Spell Burst combination (existing)
    {
      pattern: /Supports Spell Skills or skills that can activate Spell Burst/i,
      targets: [{ tags: ["Spell"] }, "spell_burst"],
    },
    // Spell Skills that deal damage or Spell Burst (activation medium)
    {
      pattern:
        /Supports Spell Skills that deal damage or skills that can activate Spell Burst/i,
      targets: [
        { tags: ["Spell"], requiredKind: "deal_damage" },
        "spell_burst",
      ],
    },
    // Attack Skills and Spell Skills that deal damage (both must deal damage)
    {
      pattern: /Supports Attack Skills and Spell Skills that deal damage/i,
      targets: [
        { tags: ["Attack"], requiredKind: "deal_damage" },
        { tags: ["Spell"], requiredKind: "deal_damage" },
      ],
    },
    // Active Skill(s) that deal damage (skillType + kind)
    {
      pattern: /Supports Active Skills? that deal damage/i,
      targets: [{ skillType: "active" as const, requiredKind: "deal_damage" }],
    },
    // Attack Skills that deal damage
    {
      pattern: /Supports Attack Skills that deal damage/i,
      targets: [{ tags: ["Attack"], requiredKind: "deal_damage" }],
    },
    // Spell Skills that deal damage
    {
      pattern: /Supports Spell Skills that deal damage/i,
      targets: [{ tags: ["Spell"], requiredKind: "deal_damage" }],
    },
    // Pure DoT (after combinations)
    {
      pattern: /Supports? DoT Skills?\.?/i,
      targets: ["dot"],
    },
    // Summon patterns
    {
      pattern: /Supports skills that summon Spirit Magus/i,
      targets: ["summon_spirit_magus"],
    },
    {
      pattern: /Supports skills that summon Synthetic Troops/i,
      targets: ["summon_synthetic_troops"],
    },
    {
      pattern: /Supports skills that summon Minions/i,
      targets: ["summon_minions"],
    },
    // Skill type patterns (Active/Passive are skill types, not tags)
    {
      pattern: /Supports? Active Skills?/i,
      targets: [{ skillType: "active" as const }],
    },
    {
      pattern: /Supports? Passive Skills?/i,
      targets: [{ skillType: "passive" as const }],
    },
    // Generic patterns
    {
      pattern: /Supports any skill/i,
      targets: ["any"],
    },
    // "hit the enemy" variant (singular) - for activation medium
    {
      pattern: /Supports skills that hit the enemy/i,
      targets: ["hit_enemies"],
    },
    {
      pattern: /Supports skills that hit enemies/i,
      targets: ["hit_enemies"],
    },
    {
      pattern: /Supports skills that deal damage/i,
      targets: ["deal_damage"],
    },
  ];

  // Check special patterns
  for (const { pattern, targets: patternTargets } of specialPatterns) {
    if (pattern.test(description)) {
      supportTargets.push(...patternTargets);
      break; // Only match one special pattern for support targets
    }
  }

  // If no special pattern matched, parse generic tag patterns
  if (supportTargets.length === 0) {
    // Match "Supports? <tags> Skills?" pattern with greedy match to capture full clause
    // Handle both "Support" and "Supports", "Skill" and "Skills"
    const supportsMatch = description.match(
      /Supports?\s+(.+?Skills?)(?:\.|,|\n|$)/i,
    );

    if (supportsMatch?.[1]) {
      const fullClause = supportsMatch[1];

      // Check for "Skills or" pattern (e.g., "Attack Skills or Spell Skills")
      if (/Skills?\s+or\s+/i.test(fullClause)) {
        // Split by "Skills or" to get each target group
        const parts = fullClause
          .split(/Skills?\s+or\s+/i)
          .map((p) => p.replace(/Skills?$/i, "").trim())
          .filter((p) => p.length > 0);

        for (const part of parts) {
          const tags = parseTagsFromString(part, skillName);
          if (tags.length > 0) {
            supportTargets.push({ tags });
          }
        }
      }
      // Check for comma-separated list with "and" (e.g., "Empower, Defensive, Restoration, Curse, and Warcry Skills")
      else if (fullClause.includes(",")) {
        const tagsPart = fullClause.replace(/Skills?$/i, "").trim();
        // Split by comma (optionally followed by "and"), or standalone "and"
        // ", and " is a common pattern like "X, Y, and Z"
        const parts = tagsPart
          .split(/,\s*(?:and\s+)?|\s+and\s+/i)
          .map((p) => p.trim())
          .filter((p) => p.length > 0);

        for (const part of parts) {
          const tags = parseTagsFromString(part, skillName);
          if (tags.length > 0) {
            supportTargets.push({ tags });
          }
        }
      }
      // Check for simple "and" pattern between tags (creates separate targets)
      // e.g., "Attack and Spell Skills"
      else if (fullClause.includes(" and ")) {
        const tagsPart = fullClause.replace(/Skills?$/i, "").trim();
        const andParts = tagsPart
          .split(/\s+and\s+/i)
          .map((p) => p.trim())
          .filter((p) => p.length > 0);

        for (const part of andParts) {
          const tags = parseTagsFromString(part, skillName);
          if (tags.length > 0) {
            supportTargets.push({ tags });
          }
        }
      }
      // Adjacent tags (single target with multiple tags)
      // e.g., "Melee Attack Skills"
      else {
        const tagsPart = fullClause.replace(/Skills?$/i, "").trim();
        const tags = parseTagsFromString(tagsPart, skillName);
        if (tags.length > 0) {
          supportTargets.push({ tags });
        }
      }
    }
  }

  // Helper to parse a single cannot-support clause into a SupportTarget
  const parseCannotSupportPart = (part: string): SupportTarget | undefined => {
    const trimmed = part.trim();
    // Check for skill type patterns first (Passive/Active are skill types, not tags)
    if (/^Passive$/i.test(trimmed)) {
      return { skillType: "passive" as const };
    }
    if (/^Active$/i.test(trimmed)) {
      return { skillType: "active" as const };
    }
    const tags = parseTagsFromString(trimmed, skillName);
    if (tags.length > 0) {
      return { tags };
    }
    return undefined;
  };

  // Parse "Cannot support" patterns
  // Use greedy match to capture full clause like "Channeled Skills or Attack Skills"
  const cannotMatch = description.match(
    /Cannot support\s+(.+?Skills?)(?:\.|,|\n|$)/i,
  );
  if (cannotMatch?.[1]) {
    const fullClause = cannotMatch[1];

    // Check for "Skills or" pattern (e.g., "Channeled Skills or Attack Skills")
    if (/Skills?\s+or\s+/i.test(fullClause)) {
      // Split by "Skills or" to get each target group
      const parts = fullClause
        .split(/Skills?\s+or\s+/i)
        .map((p) => p.replace(/Skills?$/i, "").trim())
        .filter((p) => p.length > 0);

      for (const part of parts) {
        const target = parseCannotSupportPart(part);
        if (target) {
          cannotSupportTargets.push(target);
        }
      }
    }
    // Check for "Skills and" pattern (e.g., "Channeled Skills and Attack Skills", "Passive Skills and Channeled Skills")
    else if (/Skills?\s+and\s+/i.test(fullClause)) {
      // Split by "Skills and" to get each target group
      const parts = fullClause
        .split(/Skills?\s+and\s+/i)
        .map((p) => p.replace(/Skills?$/i, "").trim())
        .filter((p) => p.length > 0);

      for (const part of parts) {
        const target = parseCannotSupportPart(part);
        if (target) {
          cannotSupportTargets.push(target);
        }
      }
    }
    // Check for simple "or" pattern (e.g., "Mobility or Channeled Skills")
    else if (fullClause.includes(" or ")) {
      const tagsPart = fullClause.replace(/Skills?$/i, "").trim();
      const orParts = tagsPart
        .split(/\s+or\s+/i)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      for (const part of orParts) {
        const target = parseCannotSupportPart(part);
        if (target) {
          cannotSupportTargets.push(target);
        }
      }
    } else {
      const tagsPart = fullClause.replace(/Skills?$/i, "").trim();
      const target = parseCannotSupportPart(tagsPart);
      if (target) {
        cannotSupportTargets.push(target);
      }
    }
  }

  return { supportTargets, cannotSupportTargets };
};

// Parse the specific skill name from "Supports <SkillName>." for Magnificent/Noble supports
const parseSkillSupportTarget = (description: string): string => {
  const firstLine = description.split("\n")[0] ?? "";
  const match = firstLine.match(/^Supports\s+(.+?)\./);
  return match?.[1] ?? "";
};

// Maps JSON type → file key and type names
// supportType: "none" | "generic" | "magnificent" | "noble"
const SKILL_TYPE_CONFIG = {
  Active: {
    fileKey: "active",
    constName: "ActiveSkills",
    supportType: "none",
  },
  Passive: {
    fileKey: "passive",
    constName: "PassiveSkills",
    supportType: "none",
  },
  Support: {
    fileKey: "support",
    constName: "SupportSkills",
    supportType: "generic",
  },
  "Support (Magnificent)": {
    fileKey: "support_magnificent",
    constName: "MagnificentSupportSkills",
    supportType: "magnificent",
  },
  "Support (Noble)": {
    fileKey: "support_noble",
    constName: "NobleSupportSkills",
    supportType: "noble",
  },
  "Activation Medium": {
    fileKey: "activation_medium",
    constName: "ActivationMediumSkills",
    supportType: "generic",
  },
} as const;

type SkillTypeKey = keyof typeof SKILL_TYPE_CONFIG;

const extractSkillData = (html: string): RawSkill[] => {
  const $ = cheerio.load(html);
  const skills: RawSkill[] = [];

  const rows = $('#skill tbody tr[class*="thing"]');
  console.log(`Found ${rows.length} skill rows`);

  rows.each((_, row) => {
    const tds = $(row).find("td");

    if (tds.length !== 4) {
      console.warn(`Skipping row with ${tds.length} columns (expected 4)`);
      return;
    }

    const tags: string[] = [];
    $(tds[2])
      .find("span.multiVal")
      .each((_, elem) => {
        tags.push($(elem).text().replace(/\s+/g, " ").trim());
      });

    // Extract description from Effect column, split by <hr> tags
    const effectHtml = $(tds[3]).html() ?? "";
    const description = effectHtml
      .split(/<hr\s*\/?>/i)
      .map((block) => {
        // Replace <br> tags with newlines
        const withNewlines = block.replace(/<br\s*\/?>/gi, "\n");
        // Strip remaining HTML tags and get text
        const text = cheerio.load(withNewlines).text();
        // Trim each line and remove empty lines
        return text
          .split("\n")
          .map((line) => line.replace(/\s+/g, " ").trim())
          .filter((line) => line.length > 0)
          .join("\n");
      })
      .filter((block) => block.length > 0);

    const skill: RawSkill = {
      type: $(tds[0]).text().trim(),
      name: $(tds[1]).text().trim(),
      tags,
      description,
    };

    skills.push(skill);
  });

  return skills;
};

const generateActiveSkillFile = (
  constName: string,
  skills: ActiveSkill[],
): string => {
  return `import type { ActiveSkill } from "./types";

export const ${constName} = ${JSON.stringify(skills, null, 2)} as const satisfies readonly ActiveSkill[];
`;
};

const generateBaseSkillFile = (
  constName: string,
  skills: BaseSkill[],
): string => {
  return `import type { BaseSkill } from "./types";

export const ${constName}: readonly BaseSkill[] = ${JSON.stringify(skills, null, 2)};
`;
};

const generateSupportSkillFile = (
  constName: string,
  skills: SupportSkill[],
): string => {
  return `import type { SupportSkill } from "./types";

export const ${constName}: readonly SupportSkill[] = ${JSON.stringify(skills, null, 2)};
`;
};

const generateMagnificentSupportSkillFile = (
  constName: string,
  skills: MagnificentSupportSkill[],
): string => {
  return `import type { MagnificentSupportSkill } from "./types";

export const ${constName}: readonly MagnificentSupportSkill[] = ${JSON.stringify(skills, null, 2)};
`;
};

const generateNobleSupportSkillFile = (
  constName: string,
  skills: NobleSupportSkill[],
): string => {
  return `import type { NobleSupportSkill } from "./types";

export const ${constName}: readonly NobleSupportSkill[] = ${JSON.stringify(skills, null, 2)};
`;
};

const main = async (): Promise<void> => {
  console.log("Reading HTML file...");
  const html = await readCodexHtml();

  console.log("Extracting skill data...");
  const rawData = extractSkillData(html);
  console.log(`Extracted ${rawData.length} skills`);

  // Group by skill type - separate maps for different skill interfaces
  const activeSkillGroups = new Map<SkillTypeKey, ActiveSkill[]>();
  const baseSkillGroups = new Map<SkillTypeKey, BaseSkill[]>();
  const supportSkillGroups = new Map<SkillTypeKey, SupportSkill[]>();
  const magnificentSupportSkillGroups = new Map<
    SkillTypeKey,
    MagnificentSupportSkill[]
  >();
  const nobleSupportSkillGroups = new Map<SkillTypeKey, NobleSupportSkill[]>();

  for (const raw of rawData) {
    const skillType = raw.type as SkillTypeKey;

    if (!(skillType in SKILL_TYPE_CONFIG)) {
      console.warn(`Unknown skill type: ${skillType}`);
      continue;
    }

    const config = SKILL_TYPE_CONFIG[skillType];
    const firstDescription = raw.description[0] ?? "";

    if (config.supportType === "generic") {
      // Parse support targets for generic support skills
      const { supportTargets, cannotSupportTargets } = parseSupportTargets(
        firstDescription,
        raw.name,
      );

      const skillEntry: SupportSkill = {
        type: raw.type as SupportSkill["type"],
        name: raw.name,
        tags: raw.tags as unknown as SupportSkill["tags"],
        description: raw.description,
        supportTargets,
        cannotSupportTargets,
      };

      if (!supportSkillGroups.has(skillType)) {
        supportSkillGroups.set(skillType, []);
      }
      supportSkillGroups.get(skillType)?.push(skillEntry);
    } else if (config.supportType === "magnificent") {
      const supportTarget = parseSkillSupportTarget(firstDescription);

      const skillEntry: MagnificentSupportSkill = {
        type: raw.type as MagnificentSupportSkill["type"],
        name: raw.name,
        tags: raw.tags as unknown as MagnificentSupportSkill["tags"],
        description: raw.description,
        supportTarget,
      };

      if (!magnificentSupportSkillGroups.has(skillType)) {
        magnificentSupportSkillGroups.set(skillType, []);
      }
      magnificentSupportSkillGroups.get(skillType)?.push(skillEntry);
    } else if (config.supportType === "noble") {
      const supportTarget = parseSkillSupportTarget(firstDescription);

      const skillEntry: NobleSupportSkill = {
        type: raw.type as NobleSupportSkill["type"],
        name: raw.name,
        tags: raw.tags as unknown as NobleSupportSkill["tags"],
        description: raw.description,
        supportTarget,
      };

      if (!nobleSupportSkillGroups.has(skillType)) {
        nobleSupportSkillGroups.set(skillType, []);
      }
      nobleSupportSkillGroups.get(skillType)?.push(skillEntry);
    } else if (skillType === "Active") {
      // Active skills with inferred kinds
      const baseSkill: BaseSkill = {
        type: raw.type as BaseSkill["type"],
        name: raw.name,
        tags: raw.tags as unknown as BaseSkill["tags"],
        description: raw.description,
      };
      const kinds = classifyWithRegex(baseSkill);

      const skillEntry: ActiveSkill = {
        ...baseSkill,
        kinds,
      };

      if (!activeSkillGroups.has(skillType)) {
        activeSkillGroups.set(skillType, []);
      }
      activeSkillGroups.get(skillType)?.push(skillEntry);
    } else {
      // Other base skills (Passive only now - Activation Medium is handled by "generic" supportType)
      const skillEntry: BaseSkill = {
        type: raw.type as BaseSkill["type"],
        name: raw.name,
        tags: raw.tags as unknown as BaseSkill["tags"],
        description: raw.description,
      };

      if (!baseSkillGroups.has(skillType)) {
        baseSkillGroups.set(skillType, []);
      }
      baseSkillGroups.get(skillType)?.push(skillEntry);
    }
  }

  const totalGroups =
    activeSkillGroups.size +
    baseSkillGroups.size +
    supportSkillGroups.size +
    magnificentSupportSkillGroups.size +
    nobleSupportSkillGroups.size;
  console.log(`Grouped into ${totalGroups} skill types`);

  // Validate that all support skills have parseable support targets
  const allSupportSkills = Array.from(supportSkillGroups.values()).flat();
  const missingTargets = allSupportSkills.filter(
    (skill) => skill.supportTargets.length === 0,
  );

  if (missingTargets.length > 0) {
    console.error("\nSkills with unparseable support targets:");
    for (const skill of missingTargets) {
      console.error(`  - ${skill.name}: "${skill.description[0]}"`);
    }
    throw new Error(
      `${missingTargets.length} support skill(s) have no parseable support targets`,
    );
  }

  // Create output directory
  const outDir = join(process.cwd(), "src", "data", "skill");
  await mkdir(outDir, { recursive: true });

  // Generate active skill files
  for (const [skillType, skills] of activeSkillGroups) {
    const config = SKILL_TYPE_CONFIG[skillType];
    const fileName = `${config.fileKey}.ts`;
    const filePath = join(outDir, fileName);
    const content = generateActiveSkillFile(config.constName, skills);

    await writeFile(filePath, content, "utf-8");
    console.log(`Generated ${fileName} (${skills.length} active skills)`);
  }

  // Generate base skill type files
  for (const [skillType, skills] of baseSkillGroups) {
    const config = SKILL_TYPE_CONFIG[skillType];
    const fileName = `${config.fileKey}.ts`;
    const filePath = join(outDir, fileName);
    const content = generateBaseSkillFile(config.constName, skills);

    await writeFile(filePath, content, "utf-8");
    console.log(`Generated ${fileName} (${skills.length} base skills)`);
  }

  // Generate generic support skill type files
  for (const [skillType, skills] of supportSkillGroups) {
    const config = SKILL_TYPE_CONFIG[skillType];
    const fileName = `${config.fileKey}.ts`;
    const filePath = join(outDir, fileName);
    const content = generateSupportSkillFile(config.constName, skills);

    await writeFile(filePath, content, "utf-8");
    console.log(`Generated ${fileName} (${skills.length} support skills)`);
  }

  // Generate magnificent support skill type files
  for (const [skillType, skills] of magnificentSupportSkillGroups) {
    const config = SKILL_TYPE_CONFIG[skillType];
    const fileName = `${config.fileKey}.ts`;
    const filePath = join(outDir, fileName);
    const content = generateMagnificentSupportSkillFile(
      config.constName,
      skills,
    );

    await writeFile(filePath, content, "utf-8");
    console.log(
      `Generated ${fileName} (${skills.length} magnificent support skills)`,
    );
  }

  // Generate noble support skill type files
  for (const [skillType, skills] of nobleSupportSkillGroups) {
    const config = SKILL_TYPE_CONFIG[skillType];
    const fileName = `${config.fileKey}.ts`;
    const filePath = join(outDir, fileName);
    const content = generateNobleSupportSkillFile(config.constName, skills);

    await writeFile(filePath, content, "utf-8");
    console.log(
      `Generated ${fileName} (${skills.length} noble support skills)`,
    );
  }

  console.log("\nCode generation complete!");
  console.log(
    `Generated ${totalGroups} skill type files with ${rawData.length} total skills`,
  );

  execSync("pnpm format", { stdio: "inherit" });
};

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Script failed:", error);
      process.exit(1);
    });
}

export { main as generateSkillData };
