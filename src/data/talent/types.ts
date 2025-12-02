// export type God =
export const Gods = [
  "Deception",
  "New God",
  "Hunting",
  "Knowledge",
  "Machines",
  "Might",
  "War",
] as const;
export type God = (typeof Gods)[number];

export const Trees = [
  "Goddess of Deception",
  "Lich",
  "Psychic",
  "Shadowmaster",
  "Warlock",
  "New God",
  "Goddess of Hunting",
  "Assassin",
  "Bladerunner",
  "Druid",
  "Marksman",
  "Goddess of Knowledge",
  "Arcanist",
  "Elementalist",
  "Magister",
  "Prophet",
  "God of Machines",
  "Alchemist",
  "Artisan",
  "Machinist",
  "Steel Vanguard",
  "God of Might",
  "Onslaughter",
  "The Brave",
  "Warlord",
  "Warrior",
  "God of War",
  "Ranger",
  "Ronin",
  "Sentinel",
  "Shadowdancer",
] as const;
export type Tree = (typeof Trees)[number];

export const isTree = (name: string): name is Tree => {
  return name in Trees;
};

export const Types = ["Core", "Legendary Medium", "Medium", "Micro"] as const;
export type Type = (typeof Types)[number];

export interface Talent {
  god: God;
  tree: Tree;
  type: Type;
  name: string;
  effect: string;
}
