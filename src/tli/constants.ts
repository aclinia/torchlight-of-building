export const DMG_MOD_TYPES = [
  "global",
  "melee",
  "area",
  "area_ailment",
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
  "slash_strike_skill",
  "slash_strike_skill_ailment",
  "hit",
  "damage_over_time",
  "channeled",
  "erosion_area",
  "projectile",
  "ranged",
] as const;

export type DmgModType = (typeof DMG_MOD_TYPES)[number];

export const CRIT_RATING_MOD_TYPES = [
  "global",
  "attack",
  "spell",
  "projectile",
  "melee",
  "ranged_attack",
  "sentry_skill",
] as const;

export type CritRatingModType = (typeof CRIT_RATING_MOD_TYPES)[number];

export const CRIT_DMG_MOD_TYPES = [
  "global",
  "attack",
  "spell",
  "physical_skill",
  "cold_skill",
  "lightning_skill",
  "fire_skill",
  "erosion_skill",
  "sentry_skill",
] as const;

export type CritDmgModType = (typeof CRIT_DMG_MOD_TYPES)[number];
