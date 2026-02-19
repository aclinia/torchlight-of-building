import {
  ActivationMediumSkills,
  ActiveSkills,
  MagnificentSupportSkills,
  NobleSupportSkills,
  PassiveSkills,
  SupportSkills,
} from "@/src/data/skill";
import type {
  BaseSupportSkillSlot,
  SkillPage,
  SkillSlot,
} from "@/src/lib/save-data";
import { getWorstActivationMediumDefaults } from "./activation-medium-utils";
import { getWorstSpecialDefaults } from "./special-support-utils";

export interface ImportedSkill {
  skillType: "active" | "passive";
  slot: number;
  name: string;
  supports?: { slot: number; name: string }[];
}

interface ImportSkillsResult {
  skillPage: SkillPage;
  warnings: string[];
}

/**
 * Strip trailing ellipsis (... or …) and prefix-match against a list of skill names.
 * Returns the exact name if found, or the first prefix match, or undefined.
 */
const resolveSkillName = (
  input: string,
  knownNames: readonly string[],
): string | undefined => {
  // Exact match first
  if (knownNames.includes(input)) return input;

  // Check for ellipsis suffix
  const stripped = input.replace(/\.{3}$|…$/, "");
  if (stripped === input) return undefined; // No ellipsis, and no exact match

  // Prefix match
  const match = knownNames.find((n) => n.startsWith(stripped));
  return match;
};

const ALL_ACTIVE_NAMES = ActiveSkills.map((s) => s.name);
const ALL_PASSIVE_NAMES = PassiveSkills.map((s) => s.name);
const ALL_SUPPORT_NAMES = SupportSkills.map((s) => s.name);
const ALL_MAGNIFICENT_NAMES = MagnificentSupportSkills.map((s) => s.name);
const ALL_NOBLE_NAMES = NobleSupportSkills.map((s) => s.name);
const ALL_ACTIVATION_MEDIUM_NAMES = ActivationMediumSkills.map((s) => s.name);

/**
 * Resolve a support skill name and build the appropriate BaseSupportSkillSlot.
 */
const resolveSupportSkill = (
  name: string,
): BaseSupportSkillSlot | undefined => {
  // Regular support
  const regularName = resolveSkillName(name, ALL_SUPPORT_NAMES);
  if (regularName !== undefined) {
    return { skillType: "support", name: regularName, level: 20 };
  }

  // Magnificent support
  const magnificentName = resolveSkillName(name, ALL_MAGNIFICENT_NAMES);
  if (magnificentName !== undefined) {
    const skill = MagnificentSupportSkills.find(
      (s) => s.name === magnificentName,
    );
    if (skill !== undefined) {
      const defaults = getWorstSpecialDefaults(skill);
      return {
        skillType: "magnificent_support",
        name: magnificentName,
        ...defaults,
        value: 0,
      };
    }
  }

  // Noble support
  const nobleName = resolveSkillName(name, ALL_NOBLE_NAMES);
  if (nobleName !== undefined) {
    const skill = NobleSupportSkills.find((s) => s.name === nobleName);
    if (skill !== undefined) {
      const defaults = getWorstSpecialDefaults(skill);
      return {
        skillType: "noble_support",
        name: nobleName,
        ...defaults,
        value: 0,
      };
    }
  }

  // Activation medium
  const activationMediumName = resolveSkillName(
    name,
    ALL_ACTIVATION_MEDIUM_NAMES,
  );
  if (activationMediumName !== undefined) {
    const skill = ActivationMediumSkills.find(
      (s) => s.name === activationMediumName,
    );
    if (skill !== undefined) {
      const defaults = getWorstActivationMediumDefaults(skill);
      return {
        skillType: "activation_medium",
        name: activationMediumName,
        ...defaults,
      };
    }
  }

  return undefined;
};

/**
 * Process support skills for a skill slot.
 */
const processSupportSkills = (
  supports: { slot: number; name: string }[],
  targetSlot: SkillSlot,
  parentSkillName: string,
  warnings: string[],
): void => {
  for (const support of supports) {
    if (support.slot < 1 || support.slot > 5) {
      warnings.push(
        `Invalid support slot ${support.slot} for "${parentSkillName}", skipping support "${support.name}"`,
      );
      continue;
    }
    const supportSlotKey = support.slot as 1 | 2 | 3 | 4 | 5;
    const resolved = resolveSupportSkill(support.name);
    if (resolved === undefined) {
      warnings.push(
        `Unknown support skill "${support.name}" for "${parentSkillName}", skipping`,
      );
      continue;
    }
    targetSlot.supportSkills[supportSlotKey] = resolved;
  }
};

/**
 * Import skills from JSON data into a SkillPage.
 * Only overwrites slots that are specified in the input.
 * Supports that aren't mentioned get cleared (set to undefined).
 */
export const importSkills = (
  input: ImportedSkill[],
  currentSkillPage: SkillPage,
): ImportSkillsResult => {
  const warnings: string[] = [];

  // Deep copy current skill page
  const skillPage: SkillPage = JSON.parse(JSON.stringify(currentSkillPage));

  for (const entry of input) {
    const { skillType, slot, name, supports } = entry;

    if (skillType === "active") {
      if (slot < 1 || slot > 5) {
        warnings.push(`Invalid active skill slot ${slot}, skipping "${name}"`);
        continue;
      }

      const resolvedName = resolveSkillName(name, ALL_ACTIVE_NAMES);
      if (resolvedName === undefined) {
        warnings.push(`Unknown active skill "${name}", skipping slot ${slot}`);
        continue;
      }

      const slotKey = slot as 1 | 2 | 3 | 4 | 5;
      const newSlot: SkillSlot = {
        skillName: resolvedName,
        enabled: true,
        level: 20,
        supportSkills: {},
      };
      skillPage.activeSkills[slotKey] = newSlot;

      // Process supports
      if (supports !== undefined) {
        processSupportSkills(supports, newSlot, resolvedName, warnings);
      }
    } else {
      if (slot < 1 || slot > 4) {
        warnings.push(`Invalid passive skill slot ${slot}, skipping "${name}"`);
        continue;
      }

      const resolvedName = resolveSkillName(name, ALL_PASSIVE_NAMES);
      if (resolvedName === undefined) {
        warnings.push(`Unknown passive skill "${name}", skipping slot ${slot}`);
        continue;
      }

      const slotKey = slot as 1 | 2 | 3 | 4;
      const newSlot: SkillSlot = {
        skillName: resolvedName,
        enabled: true,
        level: 20,
        supportSkills: {},
      };
      skillPage.passiveSkills[slotKey] = newSlot;

      // Process supports
      if (supports !== undefined) {
        processSupportSkills(supports, newSlot, resolvedName, warnings);
      }
    }
  }

  return { skillPage, warnings };
};
