import type { HeroTraitName } from "@/src/data/hero-trait";
import type { Mod } from "../mod";

type ModFactory = (levelIndex: number) => Mod[];

const heroTraitModFactories: Partial<Record<HeroTraitName, ModFactory>> = {
  // Frostfire Gemma: Frostbitten Heart (#2)
  "Frostbitten Heart": () => [
    { type: "InflictFrostbitePct", value: 100 },
    {
      type: "DmgPct",
      value: 20,
      addn: true,
      dmgModType: "cold",
      cond: "frostbitten_heart_is_active",
    },
  ],
  Deepfreeze: (i) => [
    {
      type: "MaxFrostbiteRatingLimitOverride",
      value: [150, 150, 200, 200, 200][i],
    },
    { type: "FrostbiteEffPct", value: [65, 90, 110, 130, 150][i] },
  ],
  // Frostfire Gemma: Blooming Frost Flower (#2)
  "Blooming Frost Flower": (i) => [
    { type: "MaxFrostbiteRating", value: [35, 45, 55, 65, 75][i] },
  ],
  "Dance of Frost": (i) => [
    {
      type: "DmgPct",
      value: [8, 10, 12, 15, 18][i],
      dmgModType: "cold",
      addn: true,
      isEnemyDebuff: true,
      per: { stackable: "dance_of_frost", limit: 4 },
    },
  ],
  // Cateye Erika: Wind Stalker (#1)
  "Wind Stalker": () => [
    { type: "MovementSpeedPct", value: 20 },
    { type: "WindStalker" },
    { type: "GeneratesStalker" },
  ],
  "Have Fun": (i) => [
    { type: "MainSkillSupportedBy", skillName: "Multistrike", level: 10 },
    { type: "AspdPct", addn: true, value: [2, 6, 12, 18, 24][i] },
  ],
  "Cat's Vision": (i) => [
    {
      type: "MaxStalker",
      value: 1,
      per: { stackable: "num_max_multistrikes_recently", limit: 3 },
    },
    {
      type: "DmgPct",
      dmgModType: "global",
      addn: true,
      value: [-4, 2, 8, 14, 20][i],
    },
  ],
  "Cat's Punches": (i) => [
    { type: "GeneratesStalker" },
    {
      type: "InitialMultistrikeCount",
      value: 1,
      per: { stackable: "stalker", amt: 3 },
    },
    {
      type: "DmgPct",
      dmgModType: "global",
      addn: true,
      value: [-18, -12, -6, 0, 6][i],
    },
  ],
  // Escapist Bing: Creative Genius (#2)
  "Creative Genius": () => [{ type: "MaxSpellBurst", value: 1 }],
  "Inspiration Overflow": (i) => [
    { type: "RestoreWhimsyEssenceOnSpellBurst", value: 5 },
    {
      type: "RestoreWhimsyEssenceOnSpellBurst",
      value: 6,
      per: { stackable: "max_spell_burst", amt: 3 },
    },
    {
      type: "SpellBurstAdditionalDmgPct",
      value: [20, 25, 30, 35, 40][i],
      addn: true,
    },
  ],
  "Auto-Ingenuity Program": (i) => [
    { type: "WhimsyEssenceRecoverySpeedPct", value: [-10, -5, 0, 5, 10][i] },
  ],
  "Hyper-Resonance Hypothesis": (i) => [
    {
      type: "SpellBurstChargeSpeedPct",
      addn: true,
      value: [15, 19, 23, 27, 31][i],
    },
  ],
  // Oracle Thea: Blasphemer (#3)
  Blasphemer: () => [{ type: "Blasphemer" }],
  "Unholy Baptism": (i) => [
    {
      type: "DmgPct",
      addn: true,
      value: [5, 10, 15, 20, 25][i],
      dmgModType: "erosion",
    },
  ],
  "Onset of Depravity": () => [
    {
      type: "EnemyRes",
      resType: "erosion",
      value: -10,
      cond: "enemy_has_desecration_and_cc",
    },
  ],
  // todo: too lazy to add conditional on hitting desecrated target for now
  "Tarnished Sage": (i) => [
    { type: "AspdPct", addn: false, value: [10, 15, 20, 25, 30][i] },
    { type: "CspdPct", addn: false, value: [10, 15, 20, 25, 30][i] },
    { type: "MovementSpeedPct", addn: false, value: [10, 15, 20, 25, 30][i] },
  ],
  // Rosa 2
  "Unsullied Blade": () => [{ type: "SpellDmgBonusAppliesToAtkDmg" }],
  "Born to Cleanse": (i) => [
    {
      type: "DmgPct",
      value: 0.4 * 25,
      dmgModType: "elemental",
      addn: true,
      cond: "realm_of_mercury",
    },
    {
      type: "AddnMainHandDmgPct",
      value: [20, 27, 34, 41, 48][i],
      cond: "realm_of_mercury",
    },
  ],
  "Boundless Sanctuary": (i) => [
    {
      type: "DmgPct",
      value: [6, 7, 8, 9, 10][i],
      dmgModType: "elemental",
      addn: true,
      per: {
        stackable: "num_enemies_inside_realm_of_mercury",
        valueLimit: [60, 70, 80, 90, 100][i],
      },
    },
  ],
  "Baptism of Purity": (i) => [
    { type: "MaxManaPct", value: 20, addn: true },
    { type: "InflictsInfiltration", infiltrationType: "cold" },
    { type: "InflictsInfiltration", infiltrationType: "lightning" },
    { type: "InflictsInfiltration", infiltrationType: "fire" },
    { type: "MercuryBaptismDmgPct", value: [12, 20, 28, 36, 44][i] },
  ],
  "Cleanse Filth": (i) => [
    {
      type: "DmgPct",
      value: [2, 2.5, 3, 3.5, 4][i],
      dmgModType: "elemental",
      addn: true,
      per: {
        stackable: "max_mana",
        valueLimit: [40, 50, 60, 70, 80][i],
        amt: 1000,
      },
    },
    { type: "ManaBeforeLifePct", value: 25, cond: "realm_of_mercury" },
  ],
  "Utmost Devotion": (i) => [
    {
      type: "MaxMercuryPtsPct",
      value: 10,
      per: {
        stackable: "max_mana",
        valueLimit: [200, 250, 300, 350, 400][i],
        amt: 1000,
      },
    },
    {
      type: "DmgPct",
      value: [0.08, 0.08, 0.1, 0.1, 0.1][i],
      dmgModType: "elemental",
      addn: true,
      per: { stackable: "mercury_pt" },
    },
  ],
  "Spacetime Elapse": () => [{ type: "SpacetimeElapsePct", value: 30 }],
  "Spacetime Speed-up": (i) => [
    {
      type: "SpacetimeRecordedDmgBonusPct",
      value: [5, 6.5, 8, 9.5, 11][i],
      per: { stackable: "twisted_spacetime", limit: 5 },
      addn: true,
    },
  ],
  "Spacetime Upheaval": (i) => [
    {
      type: "DmgPct",
      dmgModType: "damage_over_time",
      addn: true,
      value: [30, 37, 44, 51, 58][i],
    },
  ],
  "Spacetime Cutting": (i) => [
    { type: "GeneratesTorment" },
    { type: "DmgTakenPct", addn: true, value: [-10, -14, -18, -21, -24][i] },
  ],
  "Spacetime Pause": (i) => [
    {
      type: "SpacetimeRecordedDmgBonusPct",
      value: [60, 70, 80, 90, 100][i],
      addn: true,
    },
  ],
  "Spacetime Expansion": () => [],
};

export const getHeroTraitMods = (name: HeroTraitName, level: number): Mod[] => {
  const mods = heroTraitModFactories[name]?.(level - 1) ?? [];
  return mods.map((mod) => ({ ...mod, src: `HeroTrait: ${name} Lv.${level}` }));
};

/**
 * Check if a hero trait has a factory implementation.
 */
export const isHeroTraitImplemented = (name: HeroTraitName): boolean => {
  return heroTraitModFactories[name] !== undefined;
};
