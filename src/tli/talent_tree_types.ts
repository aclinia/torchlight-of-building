// Tree name constants
export const GOD_GODDESS_TREES = [
  "God_of_War",
  "God_of_Might",
  "God_of_Machines",
  "Goddess_of_Hunting",
  "Goddess_of_Knowledge",
  "Goddess_of_Deception",
] as const;

export const PROFESSION_TREES = [
  "Warrior",
  "Warlord",
  "Onslaughter",
  "The_Brave",
  "Marksman",
  "Bladerunner",
  "Druid",
  "Assassin",
  "Magister",
  "Arcanist",
  "Elementalist",
  "Prophet",
  "Shadowdancer",
  "Ranger",
  "Sentinel",
  "Shadowmaster",
  "Psychic",
  "Warlock",
  "Lich",
  "Machinist",
  "Steel_Vanguard",
  "Alchemist",
  "Artisan",
  "Ronin",
] as const;

export type TreeName =
  | (typeof GOD_GODDESS_TREES)[number]
  | (typeof PROFESSION_TREES)[number];

// Check if a tree name is a god/goddess tree
export const isGodGoddessTree = (name: string): boolean => {
  return GOD_GODDESS_TREES.includes(name as (typeof GOD_GODDESS_TREES)[number]);
};
