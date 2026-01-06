export const DMG_MOD_TYPES = [
  "global",
  "melee",
  "area",
  "attack",
  "spell",
  "physical",
  "cold",
  "lightning",
  "fire",
  "erosion",
  "elemental",
  "ailment",
  "shadow_strike_skill",
  "hit",
  "damage_over_time",
  "channeled",
  "erosion_area",
] as const;

export type DmgModType = (typeof DMG_MOD_TYPES)[number];

export const CRIT_RATING_MOD_TYPES = [
  "global",
  "attack",
  "spell",
  "projectile",
] as const;

export type CritRatingModType = (typeof CRIT_RATING_MOD_TYPES)[number];

export const CRIT_DMG_MOD_TYPES = [
  "global",
  "attack",
  "spell",
  "lightning_skill",
] as const;

export type CritDmgModType = (typeof CRIT_DMG_MOD_TYPES)[number];
