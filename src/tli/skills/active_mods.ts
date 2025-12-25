import { ActiveSkills } from "@/src/data/skill/active";
import type {
  ActiveSkillName,
  BaseActiveSkill,
  SkillOffense,
} from "@/src/data/skill/types";
import type { Mod } from "../mod";
import { activeSkillModFactories } from "./active_factories";

/**
 * Get all mods and offense stats for an active skill at a given level.
 */
export const getActiveSkillMods = (
  skillName: ActiveSkillName,
  level: number,
): { offense?: SkillOffense[]; mods?: Mod[]; buffMods?: Mod[] } => {
  const factory = activeSkillModFactories[skillName];
  if (factory === undefined) {
    // Skill has no level-scaling mods
    return {};
  }

  // Get levelValues from generated skill data
  const skill = ActiveSkills.find((s) => s.name === skillName) as
    | BaseActiveSkill
    | undefined;
  if (skill === undefined) {
    throw new Error(`Active skill "${skillName}" not found`);
  }

  const levelValues = skill.levelValues;
  if (levelValues === undefined) {
    throw new Error(
      `Active skill "${skillName}" has a factory but no levelValues`,
    );
  }

  return factory(level, levelValues);
};
