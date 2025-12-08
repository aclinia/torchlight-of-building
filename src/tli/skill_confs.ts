import type { Stat } from "./offense";

export type SkillTag =
  | "Attack"
  | "Spell"
  | "Cold"
  | "Melee"
  | "Area"
  | "Physical"
  | "Projectile"
  | "Horizontal"
  | "Slash-Stike"
  | "Shadow Strike"
  | "Persistent";
export interface SkillConfiguration {
  skill: string;
  tags: SkillTag[];
  stats: Stat[];
  addedDmgEffPct: number;
}
export const offensiveSkillConfs = [
  {
    skill: "[Test] Simple Attack",
    tags: ["Attack"],
    stats: ["dex", "str"],
    addedDmgEffPct: 1,
  },
  {
    skill: "Berserking Blade",
    tags: ["Attack", "Melee", "Area", "Physical", "Slash-Stike", "Persistent"],
    stats: ["dex", "str"],
    addedDmgEffPct: 2.1,
  },
  {
    skill: "Frost Spike",
    tags: [
      "Attack",
      "Melee",
      "Projectile",
      "Shadow Strike",
      "Cold",
      "Area",
      "Horizontal",
    ],
    stats: ["dex", "int"],
    addedDmgEffPct: 2.01,
  },
] as const satisfies readonly SkillConfiguration[];
// Derive Skill type from the actual skills array (single source of truth)

export type Skill = (typeof offensiveSkillConfs)[number]["skill"];

// Export available skills for UI
export const AVAILABLE_SKILLS = offensiveSkillConfs.map((c) => c.skill);
