import type { Mod } from "@/src/tli/mod";

export const STAT_CATEGORIES = [
  "damage",
  "critRating",
  "critDmg",
  "aspd",
  "other",
] as const;
export type StatCategory = (typeof STAT_CATEGORIES)[number];

export interface GroupedMods {
  damage: Mod[];
  critRating: Mod[];
  critDmg: Mod[];
  aspd: Mod[];
  other: Mod[];
}

export const getStatCategoryLabel = (category: StatCategory): string => {
  switch (category) {
    case "damage":
      return "Damage Modifiers";
    case "critRating":
      return "Critical Rating";
    case "critDmg":
      return "Critical Damage";
    case "aspd":
      return "Attack Speed";
    case "other":
      return "Other Modifiers";
  }
};

export const getStatCategoryDescription = (category: StatCategory): string => {
  switch (category) {
    case "damage":
      return "Mods that affect damage output directly";
    case "critRating":
      return "Mods that affect critical hit chance";
    case "critDmg":
      return "Mods that affect critical damage multiplier";
    case "aspd":
      return "Mods that affect attack speed";
    case "other":
      return "Mods with other effects";
  }
};

export const categorizeModType = (mod: Mod): StatCategory => {
  switch (mod.type) {
    case "DmgPct":
    case "FlatDmgToAtks":
    case "FlatDmgToSpells":
    case "AddsDmgAsPct":
    case "ConvertDmgPct":
    case "FlatGearDmg":
    case "GearPhysDmgPct":
    case "AddnMainHandDmgPct":
    case "SteepStrikeDmgPct":
    case "SweepSlashDmgPct":
      return "damage";

    case "CritRatingPct":
    case "SteepStrikeChancePct":
      return "critRating";

    case "CritDmgPct":
      return "critDmg";

    case "AspdPct":
    case "GearAspdPct":
      return "aspd";
    default:
      return "other";
  }
};

export const groupModsByEffect = (mods: Mod[]): GroupedMods => {
  const groups: GroupedMods = {
    damage: [],
    critRating: [],
    critDmg: [],
    aspd: [],
    other: [],
  };

  for (const mod of mods) {
    const category = categorizeModType(mod);
    groups[category].push(mod);
  }

  return groups;
};

const formatLargeNumber = (val: number): string => {
  const absVal = Math.abs(val);
  const sign = val < 0 ? "-" : "";

  if (absVal >= 1_000_000_000_000) {
    return `${sign}${(absVal / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (absVal >= 1_000_000_000) {
    return `${sign}${(absVal / 1_000_000_000).toFixed(2)}B`;
  }
  if (absVal >= 1_000_000) {
    return `${sign}${(absVal / 1_000_000).toFixed(2)}M`;
  }
  if (absVal >= 1_000) {
    return `${sign}${(absVal / 1_000).toFixed(2)}K`;
  }
  return val.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatStatValue = {
  percentage: (val: number): string => `${(val * 100).toFixed(1)}%`,
  pct: (val: number): string => `${val.toFixed(1)}%`,
  multiplier: (val: number): string => `${(val * 100).toFixed(0)}%`,
  aps: (val: number): string => `${val.toFixed(2)} APS`,
  damage: formatLargeNumber,
  dps: formatLargeNumber,
  integer: (val: number): string => Math.round(val).toLocaleString("en-US"),
  duration: (val: number): string => `${val.toFixed(1)}s`,
};
