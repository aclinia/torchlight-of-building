import { SupportSkills } from "@/src/data/skill/support";
import type {
  BaseSupportSkill,
  SupportSkillName,
} from "@/src/data/skill/types";
import type { Mod } from "../mod";
import { supportSkillModFactories } from "./support_factories";

export const getSupportSkillMods = (
  skillName: SupportSkillName,
  level: number,
): Mod[] => {
  const factory = supportSkillModFactories[skillName];
  if (factory === undefined) {
    // Skill has no level-scaling mods
    return [];
  }

  // Get levelValues from generated skill data
  const skill = SupportSkills.find((s) => s.name === skillName) as
    | BaseSupportSkill
    | undefined;
  if (skill === undefined) {
    throw new Error(`Support skill "${skillName}" not found`);
  }

  const levelValues = skill.levelValues;
  if (levelValues === undefined) {
    throw new Error(
      `Support skill "${skillName}" has a factory but no levelValues`,
    );
  }

  return factory(level, levelValues);
};
