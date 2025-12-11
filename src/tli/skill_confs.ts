import {
  ActiveSkills,
  SkillTag,
  type SkillName as DataSkillName,
} from "../data/skill";
import { Mod } from "./mod";
import type { Stat } from "./offense";

export type SkillName = DataSkillName | "[Test] Simple Attack";

export interface SkillConfiguration {
  skillName: SkillName;
  stats: Stat[];
  addedDmgEffPct: number;
  extraMods: Mod[];
}

export const offensiveSkillConfs = [
  {
    skillName: "[Test] Simple Attack",
    stats: ["dex", "str"],
    addedDmgEffPct: 1,
    extraMods: [],
  },
  {
    skillName: "Berserking Blade",
    stats: ["dex", "str"],
    addedDmgEffPct: 2.1,
    extraMods: [],
  },
  {
    skillName: "Frost Spike",
    stats: ["dex", "int"],
    addedDmgEffPct: 2.01,
    extraMods: [
      {
        type: "ConvertDmgPct",
        from: "physical",
        to: "cold",
        value: 1,
        src: "Skill: Frost Spike",
      },
    ],
  },
] as const satisfies readonly SkillConfiguration[];

export type ImplementedOffenseSkill =
  (typeof offensiveSkillConfs)[number]["skillName"];

// Export available skills for UI
export const AVAILABLE_SKILLS = offensiveSkillConfs.map((c) => c.skillName);

export const listTags = (skillName: SkillName): SkillTag[] => {
  if (skillName === "[Test] Simple Attack") return ["Attack"];
  return ActiveSkills.find((s) => s.name === skillName)?.tags || [];
};
