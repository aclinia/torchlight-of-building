import { PassiveSkills } from "@/src/data/skill/passive";
import type {
  BasePassiveSkill,
  PassiveSkillName,
} from "@/src/data/skill/types";
import type { Mod } from "../mod";
import { passiveSkillModFactories } from "./passive_factories";

/**
 * Get all mods for a passive skill at a given level.
 */
export const getPassiveSkillMods = (
  skillName: PassiveSkillName,
  level: number,
): { mods?: Mod[]; buffMods?: Mod[] } => {
  const factory = passiveSkillModFactories[skillName];
  if (factory === undefined) {
    // Skill has no level-scaling mods
    return {};
  }

  // Get levelValues from generated skill data
  const skill = PassiveSkills.find((s) => s.name === skillName) as
    | BasePassiveSkill
    | undefined;
  if (skill === undefined) {
    throw new Error(`Passive skill "${skillName}" not found`);
  }

  const levelValues = skill.levelValues;
  if (levelValues === undefined) {
    throw new Error(
      `Passive skill "${skillName}" has a factory but no levelValues`,
    );
  }

  return factory(level, levelValues);
};
