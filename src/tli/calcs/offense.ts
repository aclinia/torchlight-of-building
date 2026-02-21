import * as R from "remeda";
import { match } from "ts-pattern";
import { bing2, type HeroName } from "@/src/data/hero-trait";
import { hasPactspirit } from "@/src/lib/pactspirit-utils";
import {
  ActivationMediumSkills,
  type ActiveSkillName,
  ActiveSkills,
  type BaseActiveSkill,
  type BasePassiveSkill,
  type BaseSkill,
  type BaseSupportSkill,
  type ImplementedActiveSkillName,
  MagnificentSupportSkills,
  NobleSupportSkills,
  type PassiveSkillName,
  PassiveSkills,
  SupportSkills,
} from "../../data/skill";
import type { DmgModType } from "../constants";
import type {
  ActivationMediumSkillSlot,
  BaseSupportSkillSlot,
  Configuration,
  DmgRange,
  Gear,
  Loadout,
  MagnificentSupportSkillSlot,
  NobleSupportSkillSlot,
  SkillSlot,
} from "../core";
import type { EquipmentType } from "../gear-data-types";
import { getHeroTraitMods } from "../hero/hero-trait-mods";
import type {
  DmgChunkType,
  Mod,
  ModT,
  ResType,
  Stackable,
  StatType,
} from "../mod";
import { getActiveSkillMods } from "../skills/active-mods";
import { getPassiveSkillMods } from "../skills/passive-mods";
import { buildSupportSkillAffixes } from "../storage/load-save";
import { getGearAffixes } from "./affix-collectors";
import {
  addDRs,
  applyDmgBonusesAndPen,
  type CritChance,
  calculateAspd,
  calculateCritChance,
  calculateCritDmg,
  calculateDoubleDmgMult,
  calculateExtraOffenseMults,
  calculateFlatDmg,
  calculateGearDmg,
  convertDmg,
  type DmgChunk,
  type DmgPools,
  type DmgRanges,
  dmgModTypesForSkill,
  emptyDmgRanges,
  multDRs,
  type NumDmgValues,
} from "./damage-calc";
import {
  calcEffMult,
  calculateAddn,
  collectMods,
  collectModsFromAffixes,
  condThresholdSatisfied,
  filterMods,
  filterOutPerMods,
  findMod,
  modExists,
  normalizeStackables,
  pushNormalizedStackable,
  sumByValue,
} from "./mod-utils";
import type { OffenseSkillName } from "./skill-confs";
import { type ModWithValue, multModValue, multValue } from "./util";

// Re-export types that consumers expect from offense.ts
export type { CritChance, DmgChunk, DmgPools, DmgRanges, TangleSummary };
export { collectMods, convertDmg };

export interface WeaponAttackSummary {
  critChance: CritChance;
  aspd: number;
  avgHit: number;
  avgHitWithCrit: number;
}

export interface OffenseAttackDpsSummary {
  mainhand: WeaponAttackSummary;
  offhand?: WeaponAttackSummary;
  critDmgMult: number;
  avgDps: number;
  multistrikeChancePct: number;
  multistrikeIncDmgPct: number;
}

interface SlashStrikeModeStats {
  mainhand: WeaponAttackSummary;
  offhand?: WeaponAttackSummary;
  avgDps: number;
}

export interface OffenseSlashStrikeDpsSummary {
  sweep: SlashStrikeModeStats;
  steep: SlashStrikeModeStats;
  steepStrikeChancePct: number;
  critDmgMult: number;
  avgDps: number;
  multistrikeChancePct: number;
  multistrikeIncDmgPct: number;
}

interface TangleSummary {
  maxTangles: number;
  maxTanglesPerEnemy: number;
}

export interface OffenseComboDpsSummary {
  comboFinisherAmplificationPct: number;
  comboPoints: number;
  comboFinisherCount: number;
  critDmgMult: number;
  avgDps: number;
}

interface OffenseSummary {
  attackDpsSummary?: OffenseAttackDpsSummary;
  slashStrikeDpsSummary?: OffenseSlashStrikeDpsSummary;
  comboDpsSummary?: OffenseComboDpsSummary;
  spellDpsSummary?: OffenseSpellDpsSummary;
  spellBurstDpsSummary?: OffenseSpellBurstDpsSummary;
  persistentDpsSummary?: PersistentDpsSummary;
  totalReapDpsSummary?: TotalReapDpsSummary;
  totalDps: number;
  movementSpeedBonusPct: number;
  tangleSummary?: TangleSummary;
  resolvedMods: Mod[];
}

// === Stats Types and Calculations ===

interface Stats {
  str: number;
  dex: number;
  int: number;
}

type DefenseType = "EnergyShield" | "Armor" | "Evasion";

// todo: very basic stat calculation, will definitely need to handle things like pct, per, and conditionals
const calculateStats = (mods: Mod[]): Stats => {
  const statMods = filterMods(mods, "Stat");
  const statPctMods = filterMods(mods, "StatPct");
  const calcFinalStat = (statType: StatType): number => {
    const flat = sumByValue(
      statMods.filter(
        (m) => m.statModType === statType || m.statModType === "all",
      ),
    );
    const mult =
      1 +
      sumByValue(
        statPctMods.filter(
          (m) => m.statModType === statType || m.statModType === "all",
        ),
      ) /
        100;
    return flat * mult;
  };
  return {
    str: calcFinalStat("str"),
    dex: calcFinalStat("dex"),
    int: calcFinalStat("int"),
  };
};

const calculateTotalMainStats = (
  skill: BaseActiveSkill | BasePassiveSkill,
  stats: Stats,
): number => {
  const mainStats = skill.mainStats ?? [];
  let totalMainStats = 0;
  for (const mainStatType of mainStats) {
    totalMainStats += stats[mainStatType];
  }
  return totalMainStats;
};

const getDefenseModTypes = (defenseType: DefenseType) => {
  return match(defenseType)
    .with(
      "Armor",
      () =>
        ({
          gearFlat: "GearArmor",
          gearMultPct: "GearArmorPct",
          finalFlat: "Armor",
          finalMultPct: "ArmorPct",
        }) as const,
    )
    .with(
      "Evasion",
      () =>
        ({
          gearFlat: "GearEvasion",
          gearMultPct: "GearEvasionPct",
          finalFlat: "Evasion",
          finalMultPct: "EvasionPct",
        }) as const,
    )
    .with(
      "EnergyShield",
      () =>
        ({
          gearFlat: "GearEnergyShield",
          gearMultPct: "GearEnergyShieldPct",
          finalFlat: "MaxEnergyShield",
          finalMultPct: "MaxEnergyShieldPct",
        }) as const,
    )
    .exhaustive();
};

const calculateDefenseStat = (
  loadout: Loadout,
  mods: Mod[],
  defenseType: DefenseType,
): number => {
  const modTypes = getDefenseModTypes(defenseType);
  const equippedGear = loadout.gearPage.equippedGear;
  let totalFromGear = 0;

  for (const gear in equippedGear) {
    const gearItem = equippedGear[gear as keyof typeof equippedGear];
    if (!gearItem) {
      continue;
    }

    // Sum up the flat defense then apply the pct multipliers
    const gearMods = collectModsFromAffixes(getGearAffixes(gearItem));
    const gearFlatDefense = sumByValue(filterMods(gearMods, modTypes.gearFlat));
    const gearDefenseMult = calcEffMult(gearMods, modTypes.gearMultPct);

    totalFromGear += gearFlatDefense * gearDefenseMult;

    // TODO - Handle bonuses such as "+15% Energy Shield from Shields"
    // These bonuses generally dont come from the same gear piece we are evaluating
  }

  // Now that we have the total from gear, apply final flat then multiply by final pct
  const baseFlatFromMods = sumByValue(filterMods(mods, modTypes.finalFlat));
  const totalFlat = totalFromGear + baseFlatFromMods;

  const finalMultPct = calcEffMult(
    R.concat(
      filterMods(mods, "DefensePct"),
      filterMods(mods, modTypes.finalMultPct),
    ),
  );

  return Math.round(totalFlat * finalMultPct);
};

export interface ResourcePool {
  stats: Stats;
  maxLife: number;
  maxMana: number;
  mercuryPts?: number;
  focusBlessings: number;
  maxFocusBlessings: number;
  agilityBlessings: number;
  maxAgilityBlessings: number;
  tenacityBlessings: number;
  maxTenacityBlessings: number;
  desecration?: number;
  additionalMaxChanneledStacks: number;
  hasFervor: boolean;
  fervorPts: number;
  sealedResources: {
    sealedManaPct: number;
    sealedLifePct: number;
    sealPerSkill: Record<
      string,
      { sealedManaPct?: number; sealedLifePct?: number }
    >;
  };
}

// === Defense Types ===

export interface Resistance {
  max: number;
  potential: number;
  actual: number;
}

export interface Defenses {
  coldRes: Resistance;
  lightningRes: Resistance;
  fireRes: Resistance;
  erosionRes: Resistance;
  attackBlockPct: number;
  spellBlockPct: number;
  blockRatioPct: number;
  energyShield: number;
  armor: number;
  evasion: number;
}

// === Blessing Calculations ===

const calcNumFocus = (maxFocus: number, config: Configuration): number => {
  if (config.focusBlessings !== undefined) {
    return config.focusBlessings;
  }
  return maxFocus;
};

const calcNumAgility = (maxAgility: number, config: Configuration): number => {
  if (config.agilityBlessings !== undefined) {
    return config.agilityBlessings;
  }
  return maxAgility;
};

const calcNumTenacity = (
  maxTenacity: number,
  config: Configuration,
): number => {
  if (config.tenacityBlessings !== undefined) {
    return config.tenacityBlessings;
  }
  return maxTenacity;
};

// === Affliction and Torment ===

const calcAfflictionPts = (config: Configuration): number => {
  return config.afflictionPts ?? 100;
};

const calculateAffliction = (mods: Mod[], config: Configuration): Mod[] => {
  if (config.enemyHasAffliction !== true) {
    return [];
  }
  const afflictionPts = calcAfflictionPts(config);
  const afflictionEffMult = calcEffMult(mods, "AfflictionEffectPct");
  const afflictionValue = afflictionPts * afflictionEffMult;
  return [
    {
      type: "DmgPct",
      value: afflictionValue,
      dmgModType: "damage_over_time",
      addn: true,
      isEnemyDebuff: true,
      src: "Additional Damage over Time from Affliction",
    },
  ];
};

const calculateTorment = (config: Configuration): Mod[] => {
  const tormentMod: Mod = {
    type: "DmgPct",
    value: 5,
    dmgModType: "damage_over_time",
    addn: true,
    per: { stackable: "torment", limit: 3 },
    src: "Additional Damage over Time from Torment (5% per stack)",
  };
  return normalizeStackables([tormentMod], "torment", config.tormentStacks);
};

// === Fervor ===

const calculateFervorCritRateMod = (
  mods: Mod[],
  resourcePool: ResourcePool,
): Mod => {
  const fervorEffMult = calcEffMult(mods, "FervorEffPct");
  const critRatePerPoint = 2 * fervorEffMult;
  const critRateFromFervor = resourcePool.fervorPts * critRatePerPoint;

  return {
    type: "CritRatingPct",
    value: critRateFromFervor,
    modType: "global",
    src: "fervor",
  };
};

const calculateFervorBaseEffSkillArea = (
  mods: Mod[],
  resourcePool: ResourcePool,
): Mod[] => {
  const baseEffMods = filterMods(mods, "FervorBaseEffSkillAreaPct");
  if (baseEffMods.length === 0) {
    return [];
  }
  const fervorEffMult = calcEffMult(mods, "FervorEffPct");
  return baseEffMods.map((mod) => {
    const stacks = Math.floor(resourcePool.fervorPts / mod.perFervorAmt);
    return {
      type: "SkillAreaPct" as const,
      value: mod.value * stacks * fervorEffMult,
      skillAreaModType: "global" as const,
      src: "fervor",
    };
  });
};

const calculateFervorBaseEffDmg = (
  mods: Mod[],
  resourcePool: ResourcePool,
): Mod[] => {
  const baseEffMods = filterMods(mods, "FervorBaseEffDmgPct");
  if (baseEffMods.length === 0) {
    return [];
  }
  const fervorEffMult = calcEffMult(mods, "FervorEffPct");
  const result: Mod[] = [];
  for (const mod of baseEffMods) {
    const stacks = Math.floor(resourcePool.fervorPts / mod.perFervorAmt);
    const value = mod.value * stacks * fervorEffMult;
    result.push({
      type: "DmgPct",
      value,
      dmgModType: "attack",
      addn: true,
      src: "fervor",
    });
    result.push({
      type: "DmgPct",
      value,
      dmgModType: "ailment",
      addn: true,
      src: "fervor",
    });
  }
  return result;
};

const calculateWillpower = (normalizedMods: Mod[]): number => {
  return findMod(normalizedMods, "MaxWillpowerStacks")?.value || 0;
};

// === Hero Trait Mods ===

const calculateHeroTraitMods = (loadout: Loadout): Mod[] => {
  const { traits, memorySlots } = loadout.heroPage;

  const mods: Mod[] = [];
  // Primary traits with their associated memories
  // Secondary traits (for dual-trait heroes) share the same memory slots
  const traitToMemory = [
    { trait: traits.level1, memory: undefined },
    { trait: traits.level45, memory: memorySlots.slot45 },
    { trait: traits.level45b, memory: memorySlots.slot45 },
    { trait: traits.level60, memory: memorySlots.slot60 },
    { trait: traits.level60b, memory: memorySlots.slot60 },
    { trait: traits.level75, memory: memorySlots.slot75 },
    { trait: traits.level75b, memory: memorySlots.slot75 },
  ];
  for (const { trait, memory } of traitToMemory) {
    if (trait !== undefined) {
      const memoryMods = collectModsFromAffixes(memory?.affixes ?? []);
      const addedLevel = findMod(memoryMods, "HeroTraitLevel")?.value ?? 0;
      const level = 3 + addedLevel;
      mods.push(...getHeroTraitMods(trait.name, level));
    }
  }
  return mods;
};

const calculatePactspiritMods = (
  loadout: Loadout,
  loadoutMods: Mod[],
): Mod[] => {
  const mods: Mod[] = [];

  if (hasPactspirit("Azure Gunslinger", loadout)) {
    mods.push({
      type: "DmgPct",
      value: 5,
      dmgModType: "global",
      per: { stackable: "pure_heart", multiplicative: true },
      addn: true,
      src: "Pure Heart",
      cond: "target_enemy_is_nearby",
    });
  }

  if (hasPactspirit("Kitty Express", loadout)) {
    mods.push({
      type: "DmgPct",
      value: 5,
      dmgModType: "attack",
      per: { stackable: "feline_stimulant", multiplicative: true },
      addn: true,
      src: "Feline Stimulant",
    });
  }

  if (hasPactspirit("Squiddle", loadout)) {
    const squidNovaEffMult = calcEffMult(loadoutMods, "SquidnovaEffPct");
    const squidNovaDmgPctValue = 16 * squidNovaEffMult;
    mods.push({
      type: "DmgPct",
      value: squidNovaDmgPctValue,
      dmgModType: "hit",
      addn: true,
      src: "Squidnova",
    });
  }

  return mods;
};

// === Implicit Mods ===

// includes any mods that always apply, but don't come from loadout, like damage from stats, non-skill buffs, etc
const calculateImplicitMods = (): Mod[] => {
  return [
    // dual wield
    {
      type: "AspdPct",
      value: 10,
      addn: true,
      cond: "is_dual_wielding",
      src: "Dual Wielding",
    },
    {
      type: "AttackBlockChancePct",
      value: 30,
      cond: "is_dual_wielding",
      src: "Dual Wielding",
    },
    {
      type: "SpellBlockChancePct",
      value: 30,
      cond: "is_dual_wielding",
      src: "Dual Wielding",
    },
    {
      type: "DmgPct",
      value: 15,
      dmgModType: "global",
      addn: true,
      isEnemyDebuff: true,
      cond: "enemy_paralyzed",
      src: "Additional Damage when enemy paralyzed",
    },
    {
      type: "DmgPct",
      value: 5,
      dmgModType: "global",
      addn: true,
      per: { stackable: "focus_blessing" },
      cond: "has_focus_blessing",
      src: "Additional Damage from focus blessings (5% per blessing)",
    },
    {
      type: "AspdPct",
      value: 4,
      addn: false,
      per: { stackable: "agility_blessing" },
      cond: "has_agility_blessing",
      src: "Attack speed from agility blessings (4% per blessing)",
    },
    {
      type: "CspdPct",
      value: 4,
      addn: false,
      per: { stackable: "agility_blessing" },
      cond: "has_agility_blessing",
      src: "Cast speed from agility blessings (4% per blessing)",
    },
    {
      type: "DmgPct",
      value: 2,
      dmgModType: "global",
      addn: true,
      per: { stackable: "agility_blessing" },
      cond: "has_agility_blessing",
      src: "Additional Damage from agility blessings (2% per blessing)",
    },
    {
      type: "DmgPct",
      value: 15,
      dmgModType: "damage_over_time",
      addn: true,
      per: { stackable: "desecration", multiplicative: true },
      cond: "enemy_has_desecration",
      src: "Additional Damage over TIme from desecration (15% per stack)",
    },
    {
      type: "AspdPct",
      value: 2,
      addn: true,
      per: { stackable: "unsealed_mana_pct", amt: 10 },
      cond: "realm_of_mercury",
      src: "Realm of Mercury",
    },
    {
      type: "DmgPct",
      value: 3,
      dmgModType: "elemental",
      addn: true,
      per: { stackable: "unsealed_mana_pct", amt: 10 },
      cond: "realm_of_mercury",
      src: "Realm of Mercury",
    },
    {
      type: "AspdPct",
      value: 8,
      addn: true,
      cond: "has_hasten",
      src: "Hasten",
    },
    {
      type: "CspdPct",
      value: 8,
      addn: true,
      cond: "has_hasten",
      src: "Hasten",
    },
    {
      type: "MovementSpeedPct",
      value: 8,
      addn: true,
      cond: "has_hasten",
      src: "Hasten",
    },
    {
      type: "MobilitySkillCdrPct",
      value: 8,
      addn: true,
      cond: "has_hasten",
      src: "Hasten",
    },
    // Pactspirit: Portrait of a Fallen Saintess
    {
      type: "DmgPct",
      value: 4,
      addn: true,
      dmgModType: "erosion",
      cond: "has_portrait_of_a_fallen_saintess_pactspirit",
      per: { stackable: "repentance", multiplicative: true },
      src: "Repentance (4% additional dmg per stack, multiplicative)",
    },
  ];
};

interface BaseHitOverview {
  // Damage ranges of a single skill hit, not including crit
  base: {
    physical: DmgRange;
    cold: DmgRange;
    lightning: DmgRange;
    fire: DmgRange;
    erosion: DmgRange;
    total: DmgRange;
  };
  // Average damage of a single skill hit, not including crit
  avg: number;
}

const calcBaseHitOverview = (
  dmgRanges: DmgRanges,
  derivedCtx: DerivedCtx,
  mods: Mod[],
): BaseHitOverview => {
  // AddnMinDmgPct/AddnMaxDmgPct are now applied in calculateChunkDmg
  // which properly respects the dmgType property for damage type filtering
  const { physical, cold, lightning, fire, erosion } = dmgRanges;

  let min: number;
  let max: number;
  if (findMod(mods, "TrinitySingleElement") !== undefined) {
    // Average the elemental dmg instead of summing
    // This isn't 100% accurate, as there's some weighted probability
    // based on the flat damage ratios, but close enough.
    const eleComponents = [cold, lightning, fire];
    const nonZeroEle = eleComponents.filter((dr) => dr.min > 0 || dr.max > 0);
    const eleCount = Math.max(nonZeroEle.length, 1);
    const eleMin = R.sumBy(eleComponents, (dr) => dr.min) / eleCount;
    const eleMax = R.sumBy(eleComponents, (dr) => dr.max) / eleCount;
    min = physical.min + eleMin + erosion.min;
    max = physical.max + eleMax + erosion.max;
  } else {
    min = physical.min + cold.min + lightning.min + fire.min + erosion.min;
    max = physical.max + cold.max + lightning.max + fire.max + erosion.max;
  }

  const total = { min, max };
  let avg: number;
  if (derivedCtx.luckyDmg) {
    avg = (min + 2 * max) / 3;
  } else {
    avg = (min + max) / 2;
  }
  return { base: { physical, cold, lightning, fire, erosion, total }, avg };
};

const calculateAddnDmgFromShadows = (
  numShadowHits: number,
): ModT<"DmgPct"> | undefined => {
  if (numShadowHits <= 0) return;
  const shotgunCoefficientPct = 30;

  return {
    type: "DmgPct",
    addn: true,
    value: 100 + (numShadowHits - 1) * shotgunCoefficientPct,
    dmgModType: "global",
    src: `Shadow Strike: ${numShadowHits} hits`,
  };
};

interface SkillHitOverview extends BaseHitOverview {}

const calcAtkHit = (
  gearDmg: DmgRanges,
  flatDmg: DmgRanges,
  mods: Mod[],
  skill: BaseActiveSkill,
  derivedCtx: DerivedCtx,
  config: Configuration,
  weaponAtkDmgPct: number,
  addedDmgEffPct: number,
): SkillHitOverview => {
  const skillWeaponDR = multDRs(gearDmg, weaponAtkDmgPct / 100);
  const skillFlatDR = multDRs(flatDmg, addedDmgEffPct / 100);
  const skillBaseDmg = addDRs(skillWeaponDR, skillFlatDR);

  const addSpellTag =
    skill.tags.includes("Attack") &&
    findMod(mods, "SpellDmgBonusAppliesToAtkDmg") !== undefined;

  const baseDmgModTypes: DmgModType[] = addSpellTag
    ? [...dmgModTypesForSkill(skill), "spell"]
    : dmgModTypesForSkill(skill);

  const dmgPools = convertDmg(skillBaseDmg, mods);
  const finalDmgRanges = applyDmgBonusesAndPen({
    dmgPools,
    mods,
    baseDmgModTypes,
    config,
    ignoreArmor: false,
  });
  return calcBaseHitOverview(finalDmgRanges, derivedCtx, mods);
};

export interface OffenseInput {
  loadout: Loadout;
  configuration: Configuration;
}

export interface OffenseResults {
  errors: string[];
  skills: Partial<Record<ImplementedActiveSkillName, OffenseSummary>>;
  resourcePool: ResourcePool;
  defenses: Defenses;
}

interface DerivedCtx {
  hasHasten: boolean;
  hasBlasphemer: boolean;
  hero?: HeroName;
  luckyDmg: boolean;
  dualWielding: boolean;
  hasFervor: boolean;
  fervorPts: number;
}

const isOneHandedWeapon = (gear: Gear): boolean => {
  const validEquipmentTypes: EquipmentType[] = [
    "Claw",
    "Dagger",
    "One-Handed Sword",
    "One-Handed Hammer",
    "One-Handed Axe",
    "Wand",
    "Rod",
    "Scepter",
    "Cane",
    "Pistol",
  ];
  return validEquipmentTypes.includes(gear.equipmentType);
};

const resolveDerivedCtx = (
  loadout: Loadout,
  mods: Mod[],
  config: Configuration,
): DerivedCtx => {
  const hasHasten = findMod(mods, "HasHasten") !== undefined;
  const hasBlasphemer = findMod(mods, "Blasphemer") !== undefined;
  const luckyDmg = findMod(mods, "LuckyDmg") !== undefined;
  const hero = loadout.heroPage.selectedHero;
  const equippedGear = loadout.gearPage.equippedGear;
  const dualWielding =
    equippedGear.mainHand !== undefined &&
    equippedGear.offHand !== undefined &&
    isOneHandedWeapon(equippedGear.mainHand) &&
    isOneHandedWeapon(equippedGear.offHand);
  const haveFervor = findMod(mods, "HaveFervor") !== undefined;
  const hasFervor = config.fervorEnabled || haveFervor;
  const fixedFervorPts = findMod(mods, "FixedFervorPts");
  const fervorPts = fixedFervorPts?.value ?? config.fervorPoints ?? 100;
  return {
    hasHasten,
    hasBlasphemer,
    luckyDmg,
    hero,
    dualWielding,
    hasFervor,
    fervorPts,
  };
};

const isHero = (name: HeroName, loadout: Loadout): boolean => {
  return loadout.heroPage.selectedHero === name;
};

const enemyCcd = (config: Configuration) => {
  // todo: update with all cc
  return config.enemyParalyzed || config.enemyFrostbittenEnabled;
};

const filterModsByCond = (
  mods: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): Mod[] => {
  return mods.filter((m) => {
    if (m.cond === undefined) return true;
    return match(m.cond)
      .with("enemy_frostbitten", () => config.enemyFrostbittenEnabled)
      .with(
        "realm_of_mercury",
        () =>
          loadout.heroPage.selectedHero ===
            "Lightbringer Rosa: Unsullied Blade (#2)" &&
          config.realmOfMercuryEnabled,
      )
      .with("has_focus_blessing", () => config.hasFocusBlessing)
      .with("has_agility_blessing", () => config.hasAgilityBlessing)
      .with("has_tenacity_blessing", () => config.hasTenacityBlessing)
      .with("enemy_has_desecration", () => config.enemyHasDesecration)
      .with("enemy_has_trauma", () => config.enemyHasTrauma)
      .with("enemy_paralyzed", () => config.enemyParalyzed)
      .with("has_full_mana", () => config.hasFullMana)
      .with("target_enemy_is_elite", () => config.targetEnemyIsElite)
      .with("target_enemy_is_nearby", () => config.targetEnemyIsNearby)
      .with("target_enemy_is_distant", () => config.targetEnemyIsDistant)
      .with(
        "target_enemy_is_in_proximity",
        () => config.targetEnemyIsInProximity,
      )
      .with("has_blocked_recently", () => config.hasBlockedRecently)
      .with("has_elites_nearby", () => config.hasElitesNearby)
      .with("enemy_has_ailment", () => config.enemyHasAilment)
      .with("has_hasten", () => derivedCtx.hasHasten)
      .with("has_crit_recently", () => config.hasCritRecently)
      .with("has_blur", () => config.hasBlur)
      .with("blur_ended_recently", () => config.blurEndedRecently)
      .with("channeling", () => config.channeling)
      .with("sages_insight_fire", () => config.sagesInsightFireActivated)
      .with("sages_insight_cold", () => config.sagesInsightColdActivated)
      .with(
        "sages_insight_lightning",
        () => config.sagesInsightLightningActivated,
      )
      .with("sages_insight_erosion", () => config.sagesInsightErosionActivated)
      .with("at_max_channeled_stacks", () => true)
      .with("enemy_at_max_affliction", () => calcAfflictionPts(config) === 100)
      .with("enemy_is_cursed", () => {
        if (config.targetEnemyIsCursed !== undefined) {
          return config.targetEnemyIsCursed;
        }
        // assume enemy is cursed if we have an enabled curse skill
        return (
          listActiveSkillSlots(loadout)
            .filter((s) => s.enabled && s.skillName !== undefined)
            .map((s) => findActiveSkill(s.skillName as ActiveSkillName))
            .find((s) => s.tags.includes("Curse")) !== undefined
        );
      })
      .with(
        // todo: there's gotta be a better way to handle this, right?
        "equipped_in_left_ring_slot",
        () => m.src?.startsWith("Gear#leftRing") ?? false,
      )
      .with(
        "equipped_in_right_ring_slot",
        () => m.src?.startsWith("Gear#rightRing") ?? false,
      )
      .with("has_portrait_of_a_fallen_saintess_pactspirit", () =>
        hasPactspirit("Portrait of a Fallen Saintess", loadout),
      )
      .with(
        "enemy_has_desecration_and_cc",
        () => config.enemyHasDesecration && enemyCcd(config),
      )
      .with(
        "enemy_has_cold_infiltration",
        () => config.targetEnemyHasColdInfiltration,
      )
      .with(
        "enemy_has_lightning_infiltration",
        () => config.targetEnemyHasLightningInfiltration,
      )
      .with(
        "enemy_has_fire_infiltration",
        () => config.targetEnemyHasFireInfiltration,
      )
      .with(
        "target_enemy_frozen_recently",
        () => config.targetEnemyFrozenRecently,
      )
      .with("enemy_frozen", () => config.targetEnemyIsFrozen)
      .with("has_squidnova", () => hasPactspirit("Squiddle", loadout))
      .with("holding_shield", () => {
        const offhand = loadout.gearPage.equippedGear.offHand?.equipmentType;
        return (
          offhand === "Shield (DEX)" ||
          offhand === "Shield (INT)" ||
          offhand === "Shield (STR)"
        );
      })
      .with("enemy_numbed", () => config.enemyNumbed)
      .with("has_fervor", () => derivedCtx.hasFervor)
      .with(
        "has_used_mobility_skill_recently",
        () => config.hasUsedMobilitySkillRecently,
      )
      .with("has_moved_recently", () => config.hasMovedRecently)
      .with("is_moving", () => config.isMoving)
      .with("has_cast_curse_recently", () => config.hasCastCurseRecently)
      .with("is_dual_wielding", () => derivedCtx.dualWielding)
      .with("has_one_handed_weapon", () => {
        const { mainHand, offHand } = loadout.gearPage.equippedGear;
        return (
          (mainHand !== undefined && isOneHandedWeapon(mainHand)) ||
          (offHand !== undefined && isOneHandedWeapon(offHand))
        );
      })
      .with("taking_damage_over_time", () => config.takingDamageOverTime)
      .with("has_low_mana", () => config.hasLowMana)
      .with(
        "frostbitten_heart_is_active",
        () => config.frostbittenHeartIsActive,
      )
      .exhaustive();
  });
};

interface FilteredMods {
  prenormMods: Mod[];
  mods: Mod[];
  resolvedCondMods: Mod[];
  condThresholdMods: Mod[];
}

const applyModFilters = (
  inputMods: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): FilteredMods => {
  const condFiltered = filterModsByCond(inputMods, loadout, config, derivedCtx);
  const resolvedCondMods = condFiltered.filter(
    (m) => m.resolvedCond !== undefined,
  );
  const prenormMods = condFiltered.filter((m) => m.resolvedCond === undefined);
  const nonPerMods = filterOutPerMods(prenormMods);
  // Separate non-per condThreshold mods — pushed back by normalize() when threshold is met.
  // Per mods with condThreshold stay in prenormMods (handled by normalizeStackables internally).
  const condThresholdMods = nonPerMods.filter(
    (m) => m.condThreshold !== undefined,
  );
  const mods = nonPerMods.filter((m) => m.condThreshold === undefined);
  return { prenormMods, mods, resolvedCondMods, condThresholdMods };
};

const listActiveSkillSlots = (loadout: Loadout): SkillSlot[] => {
  // we're sure that SkillSlots properties only has SkillSlot as values
  const slots = Object.values(loadout.skillPage.activeSkills) as (
    | SkillSlot
    | undefined
  )[];
  return slots.filter((s) => s !== undefined);
};

const findActiveSkill = (name: ActiveSkillName): BaseActiveSkill => {
  // ActiveSkillName should be guaranteed to be something within ActiveSkills
  return ActiveSkills.find((s) => s.name === name) as BaseActiveSkill;
};

const listPassiveSkillSlots = (loadout: Loadout): SkillSlot[] => {
  const slots = Object.values(loadout.skillPage.passiveSkills) as (
    | SkillSlot
    | undefined
  )[];
  return slots.filter((s) => s !== undefined);
};

const findSkill = (
  name: ActiveSkillName | PassiveSkillName,
): BaseActiveSkill | BasePassiveSkill | undefined => {
  const active = ActiveSkills.find((s) => s.name === name);
  if (active !== undefined) return active;
  const passive = PassiveSkills.find((s) => s.name === name);
  if (passive !== undefined) return passive;
  console.error(`findSkill: skill not found: ${name}`);
  return undefined;
};

const calcBuffSkillType = (
  skill: BaseActiveSkill | BasePassiveSkill,
): "aura" | "curse" | "spirit_magus_origin" | "warcry" | "other" => {
  if (skill.type === "Passive" && skill.tags?.includes("Aura")) {
    return "aura";
  }
  if (skill.type === "Active" && skill.tags?.includes("Curse")) {
    return "curse";
  }
  if (skill.type === "Passive" && skill.tags?.includes("Spirit Magus")) {
    return "spirit_magus_origin";
  }
  if (skill.tags?.includes("Warcry")) {
    return "warcry";
  }
  return "other";
};

// resolves mods coming from skills that provide buffs (levelBuffMods)
// for example, "Bull's Rage" provides a buff that increases all melee damage
const resolveBuffSkillMods = (
  loadout: Loadout,
  loadoutMods: Mod[],
  config: Configuration,
  derivedCtx: DerivedCtx,
): Mod[] => {
  const activeSkillSlots = listActiveSkillSlots(loadout);
  const passiveSkillSlots = listPassiveSkillSlots(loadout);
  const allSkillSlots: SkillSlot[] = [
    ...activeSkillSlots,
    ...passiveSkillSlots,
    ...filterMods(loadoutMods, "TriggersSkill").map((m) => ({
      enabled: true,
      skillName: m.skillName,
      level: m.level,
      supportSkills: {},
    })),
  ];
  const resolvedMods: Mod[] = [];

  const numAuraSkills = passiveSkillSlots.filter((slot) => {
    if (!slot.enabled || slot.skillName === undefined) {
      return false;
    }
    const skill = PassiveSkills.find((s) => s.name === slot.skillName) as
      | BasePassiveSkill
      | undefined;
    return skill?.tags.includes("Aura") === true;
  }).length;

  for (const skillSlot of allSkillSlots) {
    if (!skillSlot.enabled || skillSlot.skillName === undefined) {
      continue;
    }

    const skill = findSkill(
      skillSlot.skillName as ActiveSkillName | PassiveSkillName,
    );
    if (skill === undefined) {
      continue;
    }
    const buffSkillType = calcBuffSkillType(skill);

    // Get support skill mods (includes SkillEffPct, AuraEffPct, etc.)
    const supportMods = resolveSelectedSkillSupportMods(
      skillSlot,
      loadoutMods,
      loadout,
      config,
      derivedCtx,
    );

    // Get level mods from factory based on skill type
    let levelMods: Mod[] = [];
    let rawBuffMods: Mod[] = [];

    const level =
      (skillSlot.level || 20) +
      calculateAddedSkillLevels(
        loadoutMods,
        skill,
        loadout,
        config,
        derivedCtx,
      );
    const buffSrc = `${buffSkillType}: ${skill.name} Lv.${level}`;
    if (skill.type === "Active") {
      const activeMods = getActiveSkillMods(
        skill.name as ActiveSkillName,
        level,
      );
      levelMods =
        activeMods.mods?.map((mod) => ({
          ...mod,
          src: `${skill.name} Lv.${level}`,
        })) ?? [];
      rawBuffMods =
        activeMods.buffMods?.map((mod) => ({ ...mod, src: buffSrc })) ?? [];
    } else if (skill.type === "Passive") {
      const passiveMods = getPassiveSkillMods(
        skill.name as PassiveSkillName,
        level,
      );
      levelMods =
        passiveMods.mods?.map((mod) => ({
          ...mod,
          src: `${skill.name} Lv.${level}`,
        })) ?? [];
      rawBuffMods =
        passiveMods.buffMods?.map((mod) => ({ ...mod, src: buffSrc })) ?? [];
    }

    const prenormMods = [...loadoutMods, ...supportMods, ...levelMods];
    const {
      skillEffMult,
      auraEffMult,
      curseEffMult,
      spiritMagusOriginEffMult,
      warcryEffMult,
    } = resolveBuffSkillEffMults(
      prenormMods,
      loadout,
      config,
      derivedCtx,
      skill.name,
      numAuraSkills,
    );

    // === Apply multipliers to buff mods ===
    for (const mod of rawBuffMods) {
      // Skip mods without value property (like CoreTalent)
      if (!("value" in mod)) {
        resolvedMods.push(mod);
        continue;
      }

      // Calculate final value
      let finalValue = mod.value;
      if (!("unscalable" in mod && mod.unscalable === true)) {
        if (buffSkillType === "aura") {
          finalValue = multValue(finalValue, auraEffMult);
        } else if (buffSkillType === "curse") {
          finalValue = multValue(finalValue, curseEffMult);
        } else if (buffSkillType === "spirit_magus_origin") {
          finalValue = multValue(finalValue, spiritMagusOriginEffMult);
        } else if (buffSkillType === "warcry") {
          finalValue = multValue(finalValue, warcryEffMult);
        } else {
          finalValue = multValue(finalValue, skillEffMult);
        }
      }

      resolvedMods.push({ ...mod, value: finalValue } as Mod);
    }
  }
  return resolvedMods;
};

const resolveSelectedSkillMods = (
  selectedSkillName: OffenseSkillName,
  level: number,
): Mod[] => {
  const skill = findActiveSkill(selectedSkillName);
  const skillMods = getActiveSkillMods(skill.name as ActiveSkillName, level);
  if (skillMods.mods === undefined) {
    return [];
  }
  return skillMods.mods.map((mod) => ({
    ...mod,
    src: `Selected Active Skill: ${skill.name} Lv.${level}`,
  }));
};

type TieredSupportSlot =
  | MagnificentSupportSkillSlot
  | NobleSupportSkillSlot
  | ActivationMediumSkillSlot;

const collectSupportAffixMods = (ss: TieredSupportSlot): Mod[] => {
  const prefix = {
    magnificent_support: "Magnificent",
    noble_support: "Noble",
    activation_medium: "Activation Medium",
  }[ss.skillType];
  const tierPart = ` T${ss.tier}`;
  const rankPart = "rank" in ss ? ` R${ss.rank}` : "";

  const mods: Mod[] = [];
  for (const affix of ss.affixes) {
    for (const { mod } of affix.mods ?? []) {
      mods.push({ ...mod, src: `${prefix}: ${ss.name}${tierPart}${rankPart}` });
    }
  }
  return mods;
};

const resolveNormalSupportSkillMods = (
  ss: { name: string; level?: number },
  loadoutMods: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): Mod[] => {
  const supportSkill = SupportSkills.find((s) => s.name === ss.name) as
    | BaseSupportSkill
    | undefined;
  if (supportSkill === undefined) return [];

  const level =
    (ss.level ?? 20) +
    calculateAddedSkillLevels(
      loadoutMods,
      supportSkill,
      loadout,
      config,
      derivedCtx,
    );

  // Build affixes with the calculated level (includes added skill levels)
  // This ensures level bonuses are properly applied to templated mods
  const ret: Mod[] = [];
  const affixes = buildSupportSkillAffixes(ss.name, level);
  for (const affix of affixes) {
    if (affix.mods !== undefined) {
      for (const { mod } of affix.mods) {
        ret.push({ ...mod, src: `Support: ${ss.name} Lv.${level}` });
      }
    }
  }
  return ret;
};

const resolveSelectedSkillSupportMods = (
  slot: SkillSlot,
  loadoutMods: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): Mod[] => {
  const supportSlots = Object.values(slot.supportSkills) as (
    | BaseSupportSkillSlot
    | undefined
  )[];

  const supportMods: Mod[] = [];
  for (const ss of supportSlots) {
    if (ss === undefined) continue;

    // Handle regular support skills
    if (ss.skillType === "support") {
      supportMods.push(
        ...resolveNormalSupportSkillMods(
          ss,
          loadoutMods,
          loadout,
          config,
          derivedCtx,
        ),
      );
    }
    // Handle magnificent, noble, and activation medium support skills
    else {
      supportMods.push(...collectSupportAffixMods(ss));
    }
  }
  // Support skills coming from gear
  if (slot.skillName !== undefined && isMainSkill(slot.skillName, loadout)) {
    const extraSupports = filterMods(loadoutMods, "MainSkillSupportedBy").map(
      (m) => ({ name: m.skillName, level: m.level }),
    );
    for (const ss of extraSupports) {
      supportMods.push(
        ...resolveNormalSupportSkillMods(
          ss,
          loadoutMods,
          loadout,
          config,
          derivedCtx,
        ),
      );
    }
  }

  // Resolve CurrentSkillSupportedBy mods from support skill affixes
  const embeddedSupports = filterMods(supportMods, "CurrentSkillSupportedBy");
  for (const m of embeddedSupports) {
    supportMods.push(
      ...resolveNormalSupportSkillMods(
        { name: m.skillName, level: m.level },
        loadoutMods,
        loadout,
        config,
        derivedCtx,
      ),
    );
  }

  return supportMods;
};

// Context for mods specific to a single skill
interface PerSkillModContext {
  mods: Mod[];
  skill: BaseActiveSkill;
}

// Resolves mods specific to a single skill slot
// Returns undefined if the skill is not implemented (no offense data)
const resolvePerSkillMods = (
  skillSlot: SkillSlot,
  loadoutMods: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): PerSkillModContext | undefined => {
  if (skillSlot.skillName === undefined) {
    return undefined;
  }
  const skill = findActiveSkill(skillSlot.skillName as ActiveSkillName);

  // Skip non-implemented skills (those without levelValues)
  if (!("levelValues" in skill) || skill.levelValues === undefined) {
    return undefined;
  }

  const level =
    (skillSlot.level || 20) +
    calculateAddedSkillLevels(loadoutMods, skill, loadout, config, derivedCtx);

  // Check if the skill's factory returns offense data
  const skillMods = getActiveSkillMods(skill.name as ActiveSkillName, level);
  if (skillMods.offense === undefined) {
    // Skill has levelValues but no offense (e.g., buff-only skills like Ice Bond)
    return undefined;
  }

  const selectedSkillMods = resolveSelectedSkillMods(
    skillSlot.skillName as OffenseSkillName,
    level,
  );
  const supportMods = resolveSelectedSkillSupportMods(
    skillSlot,
    loadoutMods,
    loadout,
    config,
    derivedCtx,
  );

  return { mods: [...selectedSkillMods, ...supportMods], skill };
};

const calculateNumShadowHits = (mods: Mod[], config: Configuration): number => {
  const shadowQuantMods = filterMods(mods, "ShadowQuant");
  const shadowQuant = R.sumBy(shadowQuantMods, (m) => m.value);
  return config.numShadowHits ?? shadowQuant;
};

const calculateMercuryPts = (
  mods: Mod[],
  loadout: Loadout,
): number | undefined => {
  if (!isHero("Lightbringer Rosa: Unsullied Blade (#2)", loadout)) {
    return undefined;
  }
  const mult = calcEffMult(mods, "MaxMercuryPtsPct");
  return 100 * mult;
};

const resolveBuffSkillEffMults = (
  unresolvedModsFromParam: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
  buffSkillName: string,
  numAuraSkills: number,
): {
  skillEffMult: number;
  auraEffMult: number;
  curseEffMult: number;
  spiritMagusOriginEffMult: number;
  warcryEffMult: number;
} => {
  const buffSkillEffMods = unresolvedModsFromParam.filter(
    (m) =>
      m.type === "SkillEffPct" ||
      m.type === "CurseEffPct" ||
      m.type === "SpiritMagusOriginEffPct" ||
      m.type === "WarcryEffPct" ||
      // AuraEffPct: include if no skillName (global) or skillName matches
      (m.type === "AuraEffPct" &&
        (m.skillName === undefined || m.skillName === buffSkillName)),
  );
  const { prenormMods, mods } = applyModFilters(
    buffSkillEffMods,
    loadout,
    config,
    derivedCtx,
  );

  pushNormalizedStackable(mods, prenormMods, "skill_use", 3);
  pushNormalizedStackable(mods, prenormMods, "skill_charges_on_use", 2);
  pushNormalizedStackable(
    mods,
    prenormMods,
    "cruelty_buff",
    config.crueltyBuffStacks ?? 40,
  );
  pushNormalizedStackable(mods, prenormMods, "num_aura", numAuraSkills);

  const skillEffMult = calcEffMult(mods, "SkillEffPct");
  const auraEffMult = calcEffMult(mods, "AuraEffPct");
  const curseEffMult = calcEffMult(mods, "CurseEffPct");
  const spiritMagusOriginEffMult = calcEffMult(mods, "SpiritMagusOriginEffPct");
  const warcryEffMult = calcEffMult(mods, "WarcryEffPct");

  return {
    skillEffMult,
    auraEffMult,
    curseEffMult,
    spiritMagusOriginEffMult,
    warcryEffMult,
  };
};

const calcMaxBlessings = (
  mods: Mod[],
  blessingType: "focus" | "agility" | "tenacity",
  derivedCtx: DerivedCtx,
): number => {
  const blessingToModType = {
    focus: "MaxFocusBlessing",
    agility: "MaxAgilityBlessing",
    tenacity: "MaxTenacityBlessing",
  } as const;
  const modType = blessingToModType[blessingType];
  const additionalMaxBlessings = sumByValue(filterMods(mods, modType));
  if (derivedCtx.hasBlasphemer) {
    return Math.max(4 - additionalMaxBlessings, 0);
  } else {
    return 4 + additionalMaxBlessings;
  }
};

const calcDesecration = (
  mods: Mod[],
  derivedCtx: DerivedCtx,
): number | undefined => {
  if (!derivedCtx.hasBlasphemer) {
    return undefined;
  }
  const addedFocus = sumByValue(filterMods(mods, "MaxFocusBlessing"));
  const addedAgility = sumByValue(filterMods(mods, "MaxAgilityBlessing"));
  const addedTenacity = sumByValue(filterMods(mods, "MaxTenacityBlessing"));
  return (
    3 +
    Math.min(addedFocus, 4) +
    Math.min(addedAgility, 4) +
    Math.min(addedTenacity, 4)
  );
};

const isMainSkill = (skillName: string, loadout: Loadout) => {
  return skillName === loadout.skillPage.activeSkills[1]?.skillName;
};

const calculateAddedSkillLevels = (
  loadoutMods: Mod[],
  skill: BaseSkill,
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): number => {
  const { prenormMods, mods } = applyModFilters(
    loadoutMods,
    loadout,
    config,
    derivedCtx,
  );

  const sealedLifePct = config.sealedLifePct ?? 0;
  pushNormalizedStackable(mods, prenormMods, "sealed_life_pct", sealedLifePct);

  let addedSkillLevels = 0;
  for (const mod of filterMods(mods, "SkillLevel")) {
    const matches = match(mod.skillLevelType)
      .with("main", () => isMainSkill(skill.name, loadout))
      .with("support", () => skill.type === "Support")
      .with("active", () => skill.type === "Active")
      .with("attack", () => skill.tags.includes("Attack"))
      .with("persistent", () => skill.tags.includes("Persistent"))
      .with("erosion", () => skill.tags.includes("Erosion"))
      .with("spell", () => skill.tags.includes("Spell"))
      .with("lightning", () => skill.tags.includes("Lightning"))
      .with("cold", () => skill.tags.includes("Cold"))
      .with("fire", () => skill.tags.includes("Fire"))
      .with("melee", () => skill.tags.includes("Melee"))
      .with("minion", () => skill.tags.includes("Summon"))
      .with("mobility", () => skill.tags.includes("Mobility"))
      .with("physical", () => skill.tags.includes("Physical"))
      .with("projectile", () => skill.tags.includes("Projectile"))
      .with("all", () => true)
      .with("spirit_magus", () => skill.tags.includes("Spirit Magus"))
      .exhaustive();
    if (matches) {
      addedSkillLevels += mod.value;
    }
  }
  return Math.round(addedSkillLevels);
};

/**
 * every level from 21-30 is +10% additional damage, stacking multiplicately
 * every level from 31+ is +8% additional damage, stacking multiplicatively
 */
const calculateSkillLevelDmgMods = (skillLevel: number): ModT<"DmgPct">[] => {
  if (skillLevel <= 20) {
    return [];
  }

  const a = 1.1 ** Math.min(10, skillLevel - 20);
  if (skillLevel <= 30) {
    return [
      {
        type: "DmgPct",
        value: (a - 1) * 100,
        addn: true,
        dmgModType: "global",
      },
    ];
  }

  const b = 1.08 ** (skillLevel - 30);
  return [
    {
      type: "DmgPct",
      value: (a - 1) * 100,
      addn: true,
      dmgModType: "global",
      src: "Added skill levels (21-30)",
    },
    {
      type: "DmgPct",
      value: (b - 1) * 100,
      addn: true,
      dmgModType: "global",
      src: "Added skill levels (30+)",
    },
  ];
};

const calcChainLightningInstances = (
  mods: Mod[],
  config: Configuration,
  jumps: number,
): number => {
  if (!modExists(mods, "ChainLightningWebOfLightning")) {
    return 1;
  }
  if (config.chainLightningInstancesOnTarget !== undefined) {
    return Math.max(1, config.chainLightningInstancesOnTarget);
  }
  return 1 + jumps;
};

const calcInfiltration = (
  mods: Mod[],
  type: "cold" | "lightning" | "fire",
  config: Configuration,
): Mod | undefined => {
  if (type === "cold" && !config.targetEnemyHasColdInfiltration) {
    return undefined;
  }
  if (type === "lightning" && !config.targetEnemyHasLightningInfiltration) {
    return undefined;
  }
  if (type === "fire" && !config.targetEnemyHasFireInfiltration) {
    return undefined;
  }
  const infiltrationEffMult = calcEffMult(
    filterMods(mods, "InfiltrationEffPct").filter(
      (m) => m.infiltrationType === type,
    ),
  );
  const baseVal = 13;
  const finalVal = baseVal * infiltrationEffMult;
  return {
    type: "DmgPct",
    value: finalVal,
    addn: true,
    dmgModType: type,
    isEnemyDebuff: true,
    src: `${type} Infiltration`,
  };
};

const calcSpellBurstChargeSpeedBonusPct = (mods: Mod[]): number => {
  const playSafe = findMod(mods, "PlaySafe");
  const chargeSpeedMods = [
    ...filterMods(mods, "SpellBurstChargeSpeedPct"),
    ...(playSafe !== undefined
      ? filterMods(mods, "CspdPct").map((m) =>
          multModValue(m, playSafe.value / 100),
        )
      : []),
  ];
  return (calcEffMult(chargeSpeedMods) - 1) * 100;
};

const pushMultistrikeAspd = (
  mods: Mod[],
  multistrikeChancePct: number,
): void => {
  const multistrikeAspdPct = 20;
  const aspdWhenMultistrikingMods: ModWithValue[] = filterMods(
    mods,
    "AspdWhenMultistrikingPct",
  ).map((m) => ({ ...m, type: "AspdPct" }));
  if (multistrikeChancePct >= 100) {
    mods.push({ type: "AspdPct", addn: false, value: multistrikeAspdPct });
    mods.push(...aspdWhenMultistrikingMods);
  } else if (multistrikeChancePct > 0) {
    const mult = multistrikeChancePct / 100;
    mods.push({
      type: "AspdPct",
      addn: false,
      value: multistrikeAspdPct * mult,
      src: "Multistrike",
    });
    mods.push(...aspdWhenMultistrikingMods.map((m) => multModValue(m, mult)));
  }
};

const pushMultistrikeDmgBonus = (
  mods: Mod[],
  multistrikeChancePct: number,
  multistrikeIncDmgPct: number,
): void => {
  if (multistrikeChancePct <= 0 || multistrikeIncDmgPct <= 0) {
    return;
  }
  const initialCount = Math.trunc(
    sumByValue(filterMods(mods, "InitialMultistrikeCount")),
  );
  const maxHits = initialCount + Math.floor(multistrikeChancePct / 100) + 2;
  let expectedDmgMult = 0;
  for (let hitNumber = initialCount; hitNumber < maxHits; hitNumber++) {
    const hitProbability =
      hitNumber === initialCount
        ? 1.0
        : Math.min(
            1.0,
            multistrikeChancePct / 100 - (hitNumber - (1 + initialCount)),
          );

    const hitDamageMultiplier = 1.0 + hitNumber * (multistrikeIncDmgPct / 100);
    expectedDmgMult += hitProbability * hitDamageMultiplier;
  }
  const expectedHits = 1 + multistrikeChancePct / 100;
  const expectedDmgBonusPct = (expectedDmgMult / expectedHits - 1) * 100;
  mods.push({
    type: "DmgPct",
    value: expectedDmgBonusPct,
    dmgModType: "global",
    addn: true,
    src: "Multistrike Increasing Damage",
  });
};

interface DerivedOffenseCtx {
  maxSpellBurst: number;
  spellBurstChargeSpeedBonusPct: number;
  movementSpeedBonusPct: number;
  multistrikeChancePct: number;
  multistrikeIncDmgPct: number;
  tangleSummary?: TangleSummary;
  mods: Mod[];
  errors: string[];
}

// over-engineered way to get type safety on self-referential associative graph
const createSelfReferential = <T extends Record<string, (keyof T)[]>>(
  obj: T,
): T => {
  return obj;
};

// dependency graph of mod resolution steps that much be done in order
// examples:
//   * stalker, from erika1's hero trait, affects multistrike calculations
//     and this is a dependency of multistrike
//   * spell burst charge speed may be dependent on dependent on cast speed (from core talent playsafe)
//   * cast speed depends on many other things, including spell aggression
// WHENEVER ADDING A TEMPLATE WITH DEPENDENCY, CHECK HERE TO MAKE SURE IT'S CODIFIED
const stepDeps = createSelfReferential({
  stalker: [],
  multistrike: ["stalker"],
  attackAggression: [],
  spellAggression: [],
  castSpeed: ["spellAggression"],
  spellBurstChargeSpeed: ["castSpeed"],
  maxSpellBurst: ["movementSpeed"],
  movementSpeed: ["attackAggression"],
  fervor: [],
  berserkingBlade: [],
  skillArea: ["fervor", "berserkingBlade"],
});

const modSteps = Object.keys(stepDeps) as (keyof typeof stepDeps)[];

type ModStep = (typeof modSteps)[number];

// resolves mods, removing unmatched conditions, and normalizing per mods
const resolveModsForOffenseSkill = (
  prenormModsFromParam: Mod[],
  skill: BaseActiveSkill | BasePassiveSkill,
  skillLevel: number,
  resourcePool: ResourcePool,
  defenses: Defenses,
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): DerivedOffenseCtx => {
  const {
    stats,
    maxMana,
    mercuryPts,
    focusBlessings,
    maxFocusBlessings,
    agilityBlessings,
    tenacityBlessings,
    additionalMaxChanneledStacks,
    desecration,
  } = resourcePool;
  const {
    prenormMods,
    mods: baseMods,
    resolvedCondMods,
    condThresholdMods,
  } = applyModFilters(prenormModsFromParam, loadout, config, derivedCtx);
  const mods = [...baseMods, ...calculateSkillLevelDmgMods(skillLevel)];
  const steps: ModStep[] = [];
  // collect and verify in unit tests, rather than throw error
  // in case this somehow makes it past CI, we'd rather the user get
  //   potentially wrong results than simply crashing the app.
  const errors: string[] = [];
  const step = (stepName: ModStep) => {
    if (steps.includes(stepName)) {
      errors.push(`Duplicate step calculation occuring ${stepName}`);
    } else {
      steps.push(stepName);
    }
    const deps = stepDeps[stepName];
    if (R.intersection(steps, deps).length !== deps.length) {
      errors.push(
        `Step ${stepName} has deps ${deps}, but not all have been resolved yet`,
      );
    }
  };
  const pm = (...ms: Mod[]) => {
    mods.push(...ms);
  };

  // Local helper - captures mods, prenormMods, and condThresholdMods in closure
  // Normalizes per-stackable mods and pushes condThreshold mods when threshold is met
  const normalize = (stackable: Stackable, value: number | undefined): void => {
    if (value === undefined) {
      return;
    }
    // Push non-per condThreshold mods that target this stackable and satisfy the threshold
    pm(
      ...condThresholdMods.filter(
        (m) =>
          m.condThreshold !== undefined &&
          m.condThreshold.target === stackable &&
          condThresholdSatisfied(value, m.condThreshold),
      ),
    );
    // Normalize per-stackable mods (also filters by condThreshold internally)
    pm(...normalizeStackables(prenormMods, stackable, value));
  };

  // actual mod resolvers below
  const normalizeFromConfig = (): void => {
    normalize("level", config.level);
    normalize(
      "num_max_multistrikes_recently",
      config.numMaxMultistrikesRecently,
    );
    normalize(
      "num_main_spell_skills_cast_recently",
      config.numMainSpellSkillsCastRecently,
    );
    normalize(
      "has_hit_enemy_with_elemental_dmg_recently",
      config.hasHitEnemyWithElementalDmgRecently,
    );
    normalize(
      "num_spell_skills_used_recently",
      config.numSpellSkillsUsedRecently,
    );
    normalize("mana_consumed_recently", config.manaConsumedRecently ?? 0);
    normalize("unsealed_mana_pct", 100 - (config.sealedManaPct ?? 0));
    normalize("unsealed_life_pct", 100 - (config.sealedLifePct ?? 0));
    normalize(
      "num_enemies_affected_by_warcry",
      config.numEnemiesAffectedByWarcry,
    );
    normalize("num_enemies_nearby", config.numEnemiesNearby);
    normalize(
      "num_enemies_inside_realm_of_mercury",
      config.numEnemiesInsideRealmOfMercury,
    );
    normalize("seconds_with_elite_nearby", config.numSecondsWithEliteNearby);
    normalize("enemy_numbed_stacks", config.enemyNumbedStacks ?? 10);
    normalize("dance_of_frost", config.danceOfFrostStacks ?? 0);
    normalize("frostbite_rating", config.enemyFrostbittenPoints ?? 0);
    normalize("twisted_spacetime", config.twistedSpacetimeStacks ?? 5);
    normalize("num_ice_puppet_stacks", config.numIcePuppetStacks ?? 0);
    normalize("num_times_regained_recently", config.numTimesRegainedRecently);
    normalize("pct_life_lost", 100 - config.currentLifePct);
  };
  const pushStatNorms = (): void => {
    const totalMainStats = calculateTotalMainStats(skill, stats);
    const highestStat = Math.max(stats.dex, stats.int, stats.str);
    const sumStats = stats.dex + stats.int + stats.str;
    normalize("main_stat", totalMainStats);
    normalize("highest_stat", highestStat);
    normalize("stat", sumStats);
    normalize("str", stats.str);
    normalize("dex", stats.dex);
    normalize("int", stats.int);
    if (findMod(mods, "DisableMainStatDmg") === undefined) {
      const value = 0.5 * totalMainStats;
      mods.push({
        type: "DmgPct",
        value,
        dmgModType: "global",
        addn: true,
        src: "Additional Damage from skill Main Stat (.5% per stat)",
      });
    }
  };
  const pushDefenseNorms = (): void => {
    normalize("armor", defenses.armor);
    normalize("evasion", defenses.evasion);
    normalize("energy_shield", defenses.energyShield);
    normalize(
      "total_block_pct",
      defenses.attackBlockPct + defenses.spellBlockPct,
    );
    normalize("block_ratio", defenses.blockRatioPct);
    normalize("attack_block_pct", defenses.attackBlockPct);
  };
  const pushErika1 = (): void => {
    step("stalker");
    if (!modExists(mods, "WindStalker")) {
      return;
    }
    const addedMaxStacks = sumByValue(filterMods(mods, "MaxStalker"));
    const defaultStacks = 3 + addedMaxStacks;
    const stacks = config.stalkerStacks ?? defaultStacks;
    // This assumes that the player's multistrike chance is >= 100%
    // Therefore, it's an overestimation if not. However, if your
    // multistrike is below, 100%, why tf are you using e1
    mods.push({
      type: "DmgPct",
      dmgModType: "global",
      addn: true,
      value: 13 * stacks,
    });
    mods.push(...normalizeStackables(prenormMods, "stalker", stacks));
  };
  const pushYouga2 = (): void => {
    if (!modExists(mods, "SpacetimeElapsePct")) {
      return;
    }

    const baseRecordPct = calcEffMult(filterMods(mods, "SpacetimeElapsePct"));
    const recordedDmgMoreMods = filterMods(
      mods,
      "SpacetimeRecordedDmgBonusPct",
    );
    const recordedDmgMoreMult = calcEffMult(recordedDmgMoreMods);
    const finalDamagePct = (baseRecordPct - 1) * recordedDmgMoreMult * 100;

    mods.push({
      type: "DmgPct",
      dmgModType: "damage_over_time",
      addn: true,
      value: finalDamagePct,
      src: "Spacetime Turbulence",
    });
  };
  const pushMultistrike = () => {
    step("multistrike");
    const multistrikeChancePct = sumByValue(
      filterMods(mods, "MultistrikeChancePct"),
    );
    const multistrikeIncDmgPct = sumByValue(
      filterMods(mods, "MultistrikeIncDmgPct"),
    );
    pushMultistrikeAspd(mods, multistrikeChancePct);
    pushMultistrikeDmgBonus(mods, multistrikeChancePct, multistrikeIncDmgPct);
    return { multistrikeChancePct, multistrikeIncDmgPct };
  };
  const pushShadowStrike = () => {
    if (skill.tags.includes("Shadow Strike")) {
      const numShadowHits = calculateNumShadowHits(mods, config);
      const dmgFromShadowMod = calculateAddnDmgFromShadows(numShadowHits);
      if (dmgFromShadowMod !== undefined) {
        const shadowDmgPctMods = filterMods(mods, "ShadowDmgPct");
        const shadowDmgMult = calcEffMult(shadowDmgPctMods);
        mods.push({
          ...multModValue(dmgFromShadowMod, shadowDmgMult),
          per: undefined,
        });
      }
    }
  };
  const pushProjectiles = () => {
    const maxProjectiles = findMod(mods, "MaxProjectile")?.value;
    const projectiles = Math.trunc(
      Math.min(
        sumByValue(filterMods(mods, "Projectile")),
        maxProjectiles ?? Infinity,
      ),
    );
    normalize("projectile", projectiles);

    const projSpeedPct = sumByValue(filterMods(mods, "ProjSpdPct"));
    normalize("proj_speed_pct", projSpeedPct);
  };
  const pushSkillArea = (): void => {
    step("skillArea");
    const skillAreaPct = sumByValue(filterMods(mods, "SkillAreaPct"));
    normalize("skill_area", skillAreaPct);
  };
  const pushFervor = () => {
    step("fervor");
    if (resourcePool.hasFervor) {
      mods.push(calculateFervorCritRateMod(mods, resourcePool));
      mods.push(...calculateFervorBaseEffSkillArea(mods, resourcePool));
      mods.push(...calculateFervorBaseEffDmg(mods, resourcePool));
      normalize("fervor", resourcePool.fervorPts);
    }
  };
  const pushSpellAggression = (): void => {
    step("spellAggression");
    if (!config.hasSpellAggression && !modExists(mods, "HasSpellAggression")) {
      return;
    }
    const cspdBase = 7;
    const dmgBase = 7;
    const mobilityCdr = 7;
    const mult = calcEffMult(mods, "SpellAggressionEffPct");
    mods.push({
      type: "CspdPct",
      value: cspdBase * mult,
      addn: true,
      src: "Spell Aggression",
    });
    mods.push({
      type: "DmgPct",
      value: dmgBase * mult,
      dmgModType: "spell",
      addn: true,
      src: "Spell Aggression",
    });
    mods.push({
      type: "MobilitySkillCdrPct",
      value: mobilityCdr * mult,
      src: "Spell Aggression",
    });
  };
  const pushSpellBurstChargeSpeed = () => {
    // cast speed required for burst charge speed so we verify all cast speed deps have been resolved
    step("castSpeed");
    step("spellBurstChargeSpeed");
    const spellBurstChargeSpeedBonusPct =
      calcSpellBurstChargeSpeedBonusPct(mods);
    normalize(
      "spell_burst_charge_speed_bonus_pct",
      spellBurstChargeSpeedBonusPct,
    );
    return { spellBurstChargeSpeedBonusPct };
  };

  const pushPactspirits = () => {
    // Azure Gunslinger
    {
      const baseStacks = 5;
      const addedMaxStacks = sumByValue(filterMods(mods, "MaxPureHeartStacks"));
      const maxStacks = baseStacks + addedMaxStacks;
      const stacks = Math.min(maxStacks, config.pureHeartStacks ?? maxStacks);
      normalize("pure_heart", stacks);
    }
    {
      const baseStacks = 3;
      const addedMaxStacks = sumByValue(
        filterMods(mods, "MaxFelineStimulantStacks"),
      );
      const maxStacks = baseStacks + addedMaxStacks;
      const stacks = Math.min(
        maxStacks,
        config.numFelineStimulant ?? maxStacks,
      );
      normalize("feline_stimulant", stacks);
      if (stacks >= maxStacks) {
        pm(
          ...resolvedCondMods.filter(
            (m) => m.resolvedCond === "at_max_feline_stimulant_stacks",
          ),
        );
      }
    }
  };
  const pushTradeoff = (): void => {
    const { str, dex } = resourcePool.stats;
    const tradeoffDexGteStrAspdPct = findMod(mods, "TradeoffDexGteStrAspdPct");
    const tradeoffStrGteDexDmgPct = findMod(mods, "TradeoffStrGteDexDmgPct");
    if (tradeoffDexGteStrAspdPct !== undefined && dex >= str) {
      mods.push({
        type: "AspdPct",
        addn: true,
        value: tradeoffDexGteStrAspdPct.value,
        src: "Tradeoff",
      });
    }
    if (tradeoffStrGteDexDmgPct !== undefined && str >= dex) {
      mods.push({
        type: "DmgPct",
        addn: true,
        dmgModType: "attack",
        value: tradeoffStrGteDexDmgPct.value,
        src: "Tradeoff",
      });
    }
  };
  const pushWhimsy = (): void => {
    if (!config.targetEnemyHasWhimsySignal) return;

    const whimsySignalEffMult = calcEffMult(mods, "WhimsySignalEffPct");
    const whimsySignalDmgPctVal = 30 * whimsySignalEffMult;
    mods.push({
      type: "DmgPct",
      value: whimsySignalDmgPctVal,
      addn: true,
      dmgModType: "spell",
      isEnemyDebuff: true,
      src: "Whimsy Signal",
    });
  };
  const pushAttackAggression = (): void => {
    step("attackAggression");
    if (
      !config.hasAttackAggression &&
      !modExists(mods, "HasAttackAggression")
    ) {
      return;
    }
    const aspdBase = 5;
    const dmgBase = 5;
    const mspdBase = 10;
    const mult = calcEffMult(mods, "AttackAggressionEffPct");
    mods.push({
      type: "AspdPct",
      value: aspdBase * mult,
      addn: true,
      src: "Attack Aggression",
    });
    mods.push({
      type: "DmgPct",
      value: dmgBase * mult,
      dmgModType: "attack",
      addn: true,
      src: "Attack Aggression",
    });
    mods.push({
      type: "MovementSpeedPct",
      value: mspdBase * mult,
      src: "Attack Aggression",
    });
  };
  const pushMark = (): void => {
    if (!config.targetEnemyMarked) {
      return;
    }
    const markEffMult = calcEffMult(mods, "MarkEffPct");
    const baseValue = 20;
    mods.push({
      type: "CritDmgPct",
      value: baseValue * markEffMult,
      addn: true,
      modType: "global",
      isEnemyDebuff: true,
      src: "Mark",
    });
  };
  const pushInfiltrations = (): void => {
    const coldInfiltration = calcInfiltration(mods, "cold", config);
    if (coldInfiltration !== undefined) {
      mods.push(coldInfiltration);
    }
    const lightningInfiltration = calcInfiltration(mods, "lightning", config);
    if (lightningInfiltration !== undefined) {
      mods.push(lightningInfiltration);
    }
    const fireInfiltration = calcInfiltration(mods, "fire", config);
    if (fireInfiltration !== undefined) {
      mods.push(fireInfiltration);
    }
  };
  const pushNumbed = (): void => {
    if (!config.enemyNumbed) return;

    const numbedStacks = config.enemyNumbedStacks ?? 10;
    const numbedEffMult = calcEffMult(mods, "NumbedEffPct");

    const conductive = findMod(mods, "Conductive");
    if (conductive === undefined) {
      const baseNumbedValPerStack = 5;
      const numbedVal = baseNumbedValPerStack * numbedEffMult * numbedStacks;
      mods.push({
        type: "DmgPct",
        value: numbedVal,
        dmgModType: "lightning",
        addn: true,
        isEnemyDebuff: true,
        src: "Numbed",
      });
    } else {
      const baseNumbedValPerStack = 11;
      const numbedVal = baseNumbedValPerStack * numbedEffMult * numbedStacks;
      mods.push({
        type: "DmgPct",
        value: numbedVal,
        dmgModType: "lightning",
        addn: true,
        isEnemyDebuff: true,
        src: "Numbed:Conductive",
      });
    }
  };
  const pushFrostbite = (): void => {
    if (!config.enemyFrostbittenEnabled) return;

    const maxFrostbiteLimit =
      findMod(mods, "MaxFrostbiteRatingLimitOverride")?.value ?? 100;

    const maxFrostbiteRating = Math.min(
      maxFrostbiteLimit,
      10 + sumByValue(filterMods(mods, "MaxFrostbiteRating")),
    );
    const frostbitePoints = config.enemyFrostbittenPoints ?? maxFrostbiteRating;

    const frostbiteEffMult = calcEffMult(mods, "FrostbiteEffPct");
    const baseFrostbiteValPerPoint = 0.5 * frostbiteEffMult;
    const frostbiteVal = baseFrostbiteValPerPoint * frostbitePoints;
    mods.push({
      type: "DmgPct",
      value: frostbiteVal,
      dmgModType: "cold",
      addn: true,
      isEnemyDebuff: true,
      src: "Frostbite",
    });
  };
  const pushChainLightning = (): void => {
    const chainLightningInstances = calcChainLightningInstances(
      mods,
      config,
      jumps,
    );

    const chainLightningMerge = findMod(mods, "ChainLightningMerge");
    if (chainLightningMerge !== undefined) {
      mods.push({
        type: "DmgPct",
        value:
          (chainLightningInstances - 1) *
          (100 - chainLightningMerge.shotgunFalloffCoefficient),
        addn: true,
        dmgModType: "global",
        src: "Chain Lightning: Merge (Noble)",
      });
    }
  };
  const pushFrail = (): void => {
    if (!config.targetEnemyHasFrail) return;

    const frailEffMult = calcEffMult(mods, "FrailEffPct");
    const frailSpellDmgPctValue = 15 * frailEffMult;
    mods.push({
      type: "DmgPct",
      value: frailSpellDmgPctValue,
      dmgModType: "spell",
      addn: true,
      isEnemyDebuff: true,
      src: "Frail",
    });
  };
  const pushTrinity = (): void => {
    if (findMod(mods, "TrinityElePen") === undefined) return;
    const minEffEleRes = Math.min(
      defenses.coldRes.actual,
      defenses.lightningRes.actual,
      defenses.fireRes.actual,
    );
    pm({
      type: "ResPenPct",
      value: minEffEleRes,
      penType: "elemental",
      src: "Trinity: Elemental Penetration",
    });
  };
  const pushHasSealedLifeAndManaCond = (): void => {
    const { sealedManaPct, sealedLifePct } = resourcePool.sealedResources;
    if (sealedManaPct <= 0 || sealedLifePct <= 0) return;
    pm(
      ...resolvedCondMods.filter(
        (m) => m.resolvedCond === "have_both_sealed_mana_and_life",
      ),
    );
  };
  const pushBlessings = (): void => {
    normalize("focus_blessing", focusBlessings);
    if (focusBlessings === maxFocusBlessings) {
      pm(
        ...resolvedCondMods.filter(
          (m) => m.resolvedCond === "at_max_focus_blessing",
        ),
      );
    }
    normalize("agility_blessing", agilityBlessings);
    normalize("tenacity_blessing", tenacityBlessings);
    normalize(
      "any_blessing",
      tenacityBlessings + focusBlessings + agilityBlessings,
    );

    const changeTenacity = findMod(mods, "ChangeTenacityToAddnDmgPct");
    if (changeTenacity !== undefined) {
      mods.push({
        type: "DmgPct",
        value: changeTenacity.value,
        dmgModType: "global",
        addn: true,
        per: { stackable: "tenacity_blessing" },
        cond: "has_tenacity_blessing",
        src: "Tenacity Blessing (changed to additional damage)",
      });
    }
  };
  const pushTangle = (): TangleSummary | undefined => {
    if (!modExists(mods, "IsTangle")) return undefined;
    const maxTangles = 2 + sumByValue(filterMods(mods, "MaxTangleQuant"));
    const maxTanglesPerEnemy =
      1 + sumByValue(filterMods(mods, "MaxTangleQuantPerEnemy"));
    if (config.numActiveTangles > 1) {
      mods.push({
        type: "DmgPct",
        dmgModType: "global",
        addn: true,
        value: (config.numActiveTangles - 1) * 100,
        src: "Tangle",
      });
    }
    if (modExists(mods, "HasDormantEntanglement")) {
      const inactiveTangles = maxTangles - maxTanglesPerEnemy;
      if (inactiveTangles > 0) {
        mods.push({
          type: "DmgPct",
          dmgModType: "global",
          addn: true,
          value: inactiveTangles * 40,
          src: "Dormant Entanglement",
        });
      }
    }
    return { maxTangles, maxTanglesPerEnemy };
  };
  const pushBerserkingBlade = (): void => {
    step("berserkingBlade");
    let maxBBStacks = sumByValue(filterMods(mods, "MaxBerserkingBladeStacks"));
    const hasDouble =
      filterMods(mods, "DoubleBerserkingBladeUpperLimit").length > 0;
    if (hasDouble) {
      maxBBStacks = maxBBStacks * 2;
    }
    const bbStacks = config.numBerserkingBladeBuffStacks ?? maxBBStacks;
    normalize("berserking_blade_buff", bbStacks);
  };
  const pushMspd = (): number => {
    step("movementSpeed");
    const movementSpeedBonusPct =
      (calcEffMult(mods, "MovementSpeedPct") - 1) * 100;
    normalize("movement_speed_bonus_pct", movementSpeedBonusPct);
    return movementSpeedBonusPct;
  };
  const pushMaxSpellBurst = (): number => {
    step("maxSpellBurst");
    const maxSpellBurst = sumByValue(filterMods(mods, "MaxSpellBurst"));
    normalize("max_spell_burst", maxSpellBurst);
    return maxSpellBurst;
  };
  const pushMindControlLinks = (): void => {
    const maxChannelStacks =
      (findMod(mods, "InitialMaxChannel")?.value ?? 0) +
      additionalMaxChanneledStacks;
    const mcMaxLinks = maxChannelStacks;
    const mcLinks = config.numMindControlLinksUsed ?? mcMaxLinks;
    normalize("mind_control_link", mcLinks);
    normalize("unused_mind_control_link", mcMaxLinks - mcLinks);
  };

  normalizeFromConfig();
  pushBlessings();
  pushStatNorms();
  pushDefenseNorms();
  const { mainHand, offHand } = loadout.gearPage.equippedGear;
  normalize(
    "num_unique_weapon_types_equipped",
    R.unique([mainHand?.equipmentType ?? "", offHand?.equipmentType ?? ""])
      .length,
  );
  pushBerserkingBlade();
  pushTradeoff();
  pushWhimsy();
  pushAttackAggression();
  pushSpellAggression();
  pushMark();
  const movementSpeedBonusPct = pushMspd();
  pushInfiltrations();
  pushTrinity();
  pushNumbed();
  pushFrostbite();
  const jumps = sumByValue(filterMods(mods, "Jump"));
  normalize("jump", jumps);
  pushChainLightning();
  pushFrail();
  pushYouga2();
  const maxSpellBurst = pushMaxSpellBurst();
  normalize("additional_max_channel_stack", additionalMaxChanneledStacks);
  pushMindControlLinks();
  mods.push(...calculateTorment(config));
  mods.push(...calculateAffliction(mods, config));
  const repentanceStacks = 4 + sumByValue(filterMods(mods, "MaxRepentance"));
  const willpowerStacks = calculateWillpower(prenormMods);
  normalize("repentance", repentanceStacks);
  normalize("desecration", desecration ?? 0);
  normalize("willpower", willpowerStacks);
  pushProjectiles();
  pushFervor();
  pushSkillArea();
  pushShadowStrike();

  normalize("max_mana", maxMana);
  normalize("mercury_pt", mercuryPts);
  pushHasSealedLifeAndManaCond();
  pushPactspirits();
  const tangleSummary = pushTangle();
  const { spellBurstChargeSpeedBonusPct } = pushSpellBurstChargeSpeed();
  pushErika1();
  const { multistrikeChancePct, multistrikeIncDmgPct } = pushMultistrike();

  return {
    mods,
    errors,
    maxSpellBurst,
    movementSpeedBonusPct,
    multistrikeChancePct,
    multistrikeIncDmgPct,
    tangleSummary,
    spellBurstChargeSpeedBonusPct,
  };
};

const getSupportSkillManaCostMultiplierPct = (
  slot: BaseSupportSkillSlot,
): number => {
  switch (slot.skillType) {
    case "support": {
      const skill = SupportSkills.find((s) => s.name === slot.name);
      return skill?.manaCostMultiplierPct ?? 100;
    }
    case "magnificent_support": {
      const skill = MagnificentSupportSkills.find((s) => s.name === slot.name);
      return skill?.manaCostMultiplierPct ?? 100;
    }
    case "noble_support": {
      const skill = NobleSupportSkills.find((s) => s.name === slot.name);
      return skill?.manaCostMultiplierPct ?? 100;
    }
    case "activation_medium": {
      const skill = ActivationMediumSkills.find((s) => s.name === slot.name);
      return skill?.manaCostMultiplierPct ?? 100;
    }
  }
};

const calculateSealedResources = (
  loadout: Loadout,
  loadoutMods: Mod[],
  config: Configuration,
  derivedCtx: DerivedCtx,
): ResourcePool["sealedResources"] => {
  const overrideSupportManaMultPct = findMod(
    loadoutMods,
    "OverrideSupportSkillManaMultPct",
  )?.value;
  const sealPerSkill: Record<
    string,
    { sealedManaPct?: number; sealedLifePct?: number }
  > = {};
  let totalSealedManaPct = 0;
  let totalSealedLifePct = 0;

  const passiveSlots = loadout.skillPage.passiveSkills;
  for (const slotKey of [1, 2, 3, 4] as const) {
    const slot = passiveSlots[slotKey];
    if (slot === undefined || slot.skillName === undefined || !slot.enabled) {
      continue;
    }
    const passiveSkill = PassiveSkills.find((s) => s.name === slot.skillName) as
      | BasePassiveSkill
      | undefined;
    if (passiveSkill === undefined) {
      continue;
    }

    const baseSealedManaPct = passiveSkill.sealedManaPct;

    // Calculate combined mana cost multiplier from all support skills
    let combinedManaCostMult = 1;
    const supportSlots = slot.supportSkills;
    for (const supportSlotKey of [1, 2, 3, 4, 5] as const) {
      const supportSlot = supportSlots[supportSlotKey];
      if (supportSlot === undefined) {
        continue;
      }
      const manaCostMultPct =
        overrideSupportManaMultPct ??
        getSupportSkillManaCostMultiplierPct(supportSlot);
      combinedManaCostMult *= manaCostMultPct / 100;
    }

    // Get support skill mods for this passive skill to calculate per-skill sealed mana comp
    const supportMods = resolveSelectedSkillSupportMods(
      slot,
      loadoutMods,
      loadout,
      config,
      derivedCtx,
    );

    const sealedManaCompMods = filterMods(
      R.concat(loadoutMods, supportMods),
      "SealedManaCompPct",
    ).filter(
      (m) =>
        m.skillName === undefined ||
        m.skillName === slot.skillName ||
        (passiveSkill.tags.includes("Spirit Magus") &&
          m.skillType === "spirit_magus"),
    );
    const sealedManaCompMult = calcEffMult(sealedManaCompMods);
    const skillSealedPct =
      (baseSealedManaPct * combinedManaCostMult) / sealedManaCompMult;

    // SealConversion converts sealed mana to sealed life
    const hasSealConversion = modExists(supportMods, "SealConversion");
    if (hasSealConversion) {
      sealPerSkill[slot.skillName] = { sealedLifePct: skillSealedPct };
      totalSealedLifePct += skillSealedPct;
    } else {
      sealPerSkill[slot.skillName] = { sealedManaPct: skillSealedPct };
      totalSealedManaPct += skillSealedPct;
    }
  }

  return {
    sealedManaPct: totalSealedManaPct,
    sealedLifePct: totalSealedLifePct,
    sealPerSkill,
  };
};

const calculateResourcePool = (
  paramMods: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): ResourcePool => {
  // potential perf issue: this is a duplicate filtering, since it also
  //   happens in calculateOffense with a slightly larger superset.
  //   maybe we should factor it out if performance becomes an issue
  const { prenormMods, mods } = applyModFilters(
    paramMods,
    loadout,
    config,
    derivedCtx,
  );

  pushNormalizedStackable(mods, prenormMods, "level", config.level);

  const stats = calculateStats(mods);

  pushNormalizedStackable(mods, prenormMods, "str", stats.str);
  pushNormalizedStackable(mods, prenormMods, "dex", stats.dex);
  pushNormalizedStackable(mods, prenormMods, "int", stats.int);

  const maxLifeFromMods = sumByValue(filterMods(mods, "MaxLife"));
  const maxLifeMult = calcEffMult(mods, "MaxLifePct");
  const maxLife = (50 + config.level * 13 + maxLifeFromMods) * maxLifeMult;

  const maxManaFromMods = sumByValue(filterMods(mods, "MaxMana"));
  const maxManaMult = calcEffMult(mods, "MaxManaPct");
  const maxMana = (40 + config.level * 5 + maxManaFromMods) * maxManaMult;

  // max_mana must be normalized before calculating mercuryPts
  // (for mods with per: { stackable: "max_mana" })
  pushNormalizedStackable(mods, prenormMods, "max_mana", maxMana);

  const mercuryPts = calculateMercuryPts(mods, loadout);
  pushNormalizedStackable(mods, prenormMods, "mercury_pt", mercuryPts);

  const maxFocusBlessings = calcMaxBlessings(mods, "focus", derivedCtx);
  const focusBlessings = calcNumFocus(maxFocusBlessings, config);
  const maxAgilityBlessings = calcMaxBlessings(mods, "agility", derivedCtx);
  const agilityBlessings = calcNumAgility(maxAgilityBlessings, config);
  const maxTenacityBlessings = calcMaxBlessings(mods, "tenacity", derivedCtx);
  const tenacityBlessings = calcNumTenacity(maxTenacityBlessings, config);
  const desecration = calcDesecration(mods, derivedCtx);

  const additionalMaxChanneledStacks = Math.round(
    sumByValue(filterMods(mods, "MaxChannel")),
  );

  const { hasFervor, fervorPts } = derivedCtx;
  const sealedResources = calculateSealedResources(
    loadout,
    mods,
    config,
    derivedCtx,
  );

  return {
    stats,
    maxLife,
    maxMana,
    mercuryPts,
    maxFocusBlessings,
    focusBlessings,
    maxAgilityBlessings,
    agilityBlessings,
    maxTenacityBlessings,
    tenacityBlessings,
    desecration,
    additionalMaxChanneledStacks,
    hasFervor,
    fervorPts,
    sealedResources,
  };
};

export const calculateDefenses = (
  paramMods: Mod[],
  loadout: Loadout,
  config: Configuration,
  derivedCtx: DerivedCtx,
): Defenses => {
  const { mods } = applyModFilters(paramMods, loadout, config, derivedCtx);

  const maxResMods = filterMods(mods, "MaxResistancePct");
  const resMods = filterMods(mods, "ResistancePct");

  type ResMod = ModT<"MaxResistancePct"> | ModT<"ResistancePct">;
  const sumResMods = <T extends ResMod>(
    mods: T[],
    resTypes: ResType[],
  ): number => {
    return sumByValue(mods.filter((m) => resTypes.includes(m.resType)));
  };

  const calcRes = (resTypes: ResType[]): Resistance => {
    const max = Math.min(90, 60 + sumResMods(maxResMods, resTypes));
    const potential = sumResMods(resMods, resTypes);
    const actual = Math.min(max, potential);
    return { max, potential, actual };
  };

  const attackBlockPct = sumByValue(filterMods(mods, "AttackBlockChancePct"));
  const spellBlockPct = sumByValue(filterMods(mods, "SpellBlockChancePct"));
  const blockRatioPctOverride = findMod(mods, "BlockRatioPctOverride");
  const blockRatioPct =
    blockRatioPctOverride !== undefined
      ? blockRatioPctOverride.value
      : Math.min(60, 30 + sumByValue(filterMods(mods, "BlockRatioPct")));

  const energyShield = calculateDefenseStat(loadout, mods, "EnergyShield");
  const armor = calculateDefenseStat(loadout, mods, "Armor");
  const evasion = calculateDefenseStat(loadout, mods, "Evasion");

  return {
    coldRes: calcRes(["cold", "elemental"]),
    lightningRes: calcRes(["lightning", "elemental"]),
    fireRes: calcRes(["fire", "elemental"]),
    erosionRes: calcRes(["erosion"]),
    attackBlockPct,
    spellBlockPct,
    blockRatioPct,
    energyShield,
    armor,
    evasion,
  };
};

export interface PersistentDpsSummary {
  base: Record<DmgChunkType, number>;
  total: number;
  duration: number;
}

interface CalcAvgPersistentDpsInput {
  mods: Mod[];
  loadout: Loadout;
  perSkillContext: PerSkillModContext;
  skillLevel: number;
  config: Configuration;
}

const calcAvgPersistentDps = (
  input: CalcAvgPersistentDpsInput,
): PersistentDpsSummary | undefined => {
  const { mods, perSkillContext, skillLevel, config } = input;
  const skill = perSkillContext.skill as BaseActiveSkill;

  const implementedPersistentSkills: ActiveSkillName[] = [
    "[Test] Simple Persistent Spell",
    "Mind Control",
  ];
  if (!implementedPersistentSkills.includes(skill.name as ActiveSkillName)) {
    return undefined;
  }

  const skillMods = getActiveSkillMods(
    skill.name as ActiveSkillName,
    skillLevel,
  );
  const persistentDmg = skillMods.offense?.persistentDmg;
  if (persistentDmg === undefined) return;

  const baseDmg: NumDmgValues = {
    [persistentDmg.dmgType]: persistentDmg.value,
  };
  const baseDmgModTypes: DmgModType[] = dmgModTypesForSkill(skill);

  const dmgPools = convertDmg(baseDmg, mods);
  const dmgValues = applyDmgBonusesAndPen({
    dmgPools,
    mods,
    baseDmgModTypes,
    config,
    ignoreArmor: true,
  });

  const physical = dmgValues.physical ?? 0;
  const cold = dmgValues.cold ?? 0;
  const lightning = dmgValues.lightning ?? 0;
  const fire = dmgValues.fire ?? 0;
  const erosion = dmgValues.erosion ?? 0;
  const total = physical + cold + lightning + fire + erosion;

  const duration =
    persistentDmg.duration * calcEffMult(mods, "SkillEffDurationPct");

  return {
    base: { physical, cold, lightning, fire, erosion },
    total,
    duration,
  };
};

const calcReapsPerSecond = (cooldown: number) => {
  const roundedCooldown = Math.ceil(cooldown * 30) / 30;
  return 1 / roundedCooldown;
};

export interface ReapDpsSummary {
  rawCooldown: number;
  duration: number;
  reapsPerSecond: number;
  dmgPerReap: number;
  reapDps: number;
}

export interface TotalReapDpsSummary {
  reaps: ReapDpsSummary[];
  totalReapDps: number;
  reapDurationBonusPct: number;
  reapCdrBonusPct: number;
}

const calcTotalReapDps = (
  mods: Mod[],
  persistentDpsSummary: PersistentDpsSummary,
): TotalReapDpsSummary | undefined => {
  const dotDuration = persistentDpsSummary.duration;
  const dotDps = persistentDpsSummary.total;
  const reapDurationMult = calcEffMult(mods, "ReapDurationPct");
  const reapCdrMult = calcEffMult(mods, "ReapCdrPct");
  const reapPurificationPct =
    sumByValue(filterMods(mods, "ReapPurificationPct")) / 100;
  const reaps = filterMods(mods, "Reap").map((m) => {
    const duration = Math.min(m.duration * reapDurationMult, dotDuration);
    const rawCooldown = m.cooldown / reapCdrMult;
    const reapsPerSecond = calcReapsPerSecond(rawCooldown);
    // Base reap damage from reaped duration
    const baseReapDmg = dotDps * duration;
    // Purification adds a portion of remaining DOT damage
    const remainingDotDuration = dotDuration - duration;
    const purificationDmg = remainingDotDuration * dotDps * reapPurificationPct;
    const dmgPerReap = baseReapDmg + purificationDmg;
    const reapDps = dmgPerReap * reapsPerSecond;
    return { rawCooldown, duration, reapsPerSecond, dmgPerReap, reapDps };
  });
  if (reaps.length === 0) {
    return undefined;
  }
  const totalReapDps = R.sumBy(reaps, (r) => r.reapDps);
  return {
    reaps,
    reapDurationBonusPct: (reapDurationMult - 1) * 100,
    reapCdrBonusPct: (reapCdrMult - 1) * 100,
    totalReapDps,
  };
};

interface CalcWeaponAttackInput {
  mods: Mod[];
  skill: BaseActiveSkill;
  derivedCtx: DerivedCtx;
  config: Configuration;
  critDmgMult: number;
  weaponAtkDmgPct: number;
  addedDmgEffPct: number;
}

const calcWeaponAttack = (
  weapon: Gear,
  extraJoinedForceAvgHitDmg: number,
  input: CalcWeaponAttackInput,
): WeaponAttackSummary => {
  const {
    mods,
    skill,
    derivedCtx,
    config,
    critDmgMult,
    weaponAtkDmgPct,
    addedDmgEffPct,
  } = input;
  const gearDmg = calculateGearDmg(weapon, mods);
  const flatDmg = calculateFlatDmg(mods, "attack");
  const skillHit = calcAtkHit(
    gearDmg.mainHand,
    flatDmg,
    mods,
    skill,
    derivedCtx,
    config,
    weaponAtkDmgPct,
    addedDmgEffPct,
  );

  const avgHit = skillHit.avg + extraJoinedForceAvgHitDmg;
  const aspd = calculateAspd(weapon, mods, skill);
  const critChance = calculateCritChance(mods, skill);
  const avgHitWithCrit =
    avgHit * critChance.actual * critDmgMult + avgHit * (1 - critChance.actual);
  return { avgHit, aspd, critChance, avgHitWithCrit };
};

const calcDualWieldDps = (
  mainhandAtk: WeaponAttackSummary,
  offhandAtk: WeaponAttackSummary | undefined,
  disableOffhand: boolean,
): number => {
  if (offhandAtk === undefined || disableOffhand) {
    return mainhandAtk.aspd * mainhandAtk.avgHitWithCrit;
  }
  const mainhandAtkInterval = 1 / mainhandAtk.aspd;
  const offhandAtkInterval = 1 / offhandAtk.aspd;
  const fullInterval = mainhandAtkInterval + offhandAtkInterval;
  return (
    (mainhandAtk.avgHitWithCrit + offhandAtk.avgHitWithCrit) / fullInterval
  );
};

const calcAvgAttackDps = (
  mods: Mod[],
  loadout: Loadout,
  perSkillContext: PerSkillModContext,
  skillLevel: number,
  derivedOffenseCtx: DerivedOffenseCtx,
  derivedCtx: DerivedCtx,
  config: Configuration,
): OffenseAttackDpsSummary | undefined => {
  const skill = perSkillContext.skill;

  // Look up skill offense values early
  const skillMods = getActiveSkillMods(
    skill.name as ActiveSkillName,
    skillLevel,
  );
  const offense = skillMods.offense;

  // Get offense percentages based on skill type
  const weaponAtkDmgPct = offense?.weaponAtkDmgPct?.value;
  const addedDmgEffPct = offense?.addedDmgEffPct?.value;
  if (weaponAtkDmgPct === undefined || addedDmgEffPct === undefined) {
    return undefined;
  }
  const offenseValues = { weaponAtkDmgPct, addedDmgEffPct };

  const critDmgMult = calculateCritDmg(mods, skill);
  const mainhand = loadout.gearPage.equippedGear.mainHand;
  const offhand = loadout.gearPage.equippedGear.offHand;
  if (mainhand === undefined) {
    return undefined;
  }

  const calcWeaponAttackInput: CalcWeaponAttackInput = {
    mods,
    skill,
    derivedCtx,
    config,
    critDmgMult,
    weaponAtkDmgPct: offenseValues.weaponAtkDmgPct,
    addedDmgEffPct: offenseValues.addedDmgEffPct,
  };

  // Only calculate offhand attack if offhand is a one-handed weapon (not a shield)
  const offhandAtk =
    offhand !== undefined && isOneHandedWeapon(offhand)
      ? calcWeaponAttack(offhand, 0, calcWeaponAttackInput)
      : undefined;
  const joinedForceAddedDmgPct = findMod(
    mods,
    "JoinedForceAddOffhandToMainhandPct",
  );
  const joinedForceAddedDmg =
    ((joinedForceAddedDmgPct?.value ?? 0) / 100) * (offhandAtk?.avgHit ?? 0);
  const mainhandAtk = calcWeaponAttack(
    mainhand,
    joinedForceAddedDmg,
    calcWeaponAttackInput,
  );

  const disableOffhand = modExists(mods, "JoinedForceDisableOffhand");
  const avgDpsWithoutExtras = calcDualWieldDps(
    mainhandAtk,
    offhandAtk,
    disableOffhand,
  );

  const doubleDmgMult = calculateDoubleDmgMult(mods, skill);
  const extraMult = calculateExtraOffenseMults(mods, config);

  const avgDps = avgDpsWithoutExtras * doubleDmgMult * extraMult;
  return {
    mainhand: mainhandAtk,
    offhand: disableOffhand ? undefined : offhandAtk,
    critDmgMult,
    avgDps,
    multistrikeChancePct: derivedOffenseCtx.multistrikeChancePct,
    multistrikeIncDmgPct: derivedOffenseCtx.multistrikeIncDmgPct,
  };
};

const calcAvgSlashStrikeDps = (
  mods: Mod[],
  loadout: Loadout,
  perSkillContext: PerSkillModContext,
  skillLevel: number,
  derivedOffenseCtx: DerivedOffenseCtx,
  derivedCtx: DerivedCtx,
  config: Configuration,
): OffenseSlashStrikeDpsSummary | undefined => {
  const skill = perSkillContext.skill;
  const skillMods = getActiveSkillMods(
    skill.name as ActiveSkillName,
    skillLevel,
  );
  const offense = skillMods.offense;

  // Validate sweep/steep offense properties exist
  if (
    offense?.sweepWeaponAtkDmgPct === undefined ||
    offense?.sweepAddedDmgEffPct === undefined ||
    offense?.steepWeaponAtkDmgPct === undefined ||
    offense?.steepAddedDmgEffPct === undefined
  ) {
    return undefined;
  }

  const mainhand = loadout.gearPage.equippedGear.mainHand;
  if (mainhand === undefined) {
    return undefined;
  }
  const offhand = loadout.gearPage.equippedGear.offHand;

  // Get steep strike chance (capped at 100%)
  const steepStrikeChancePct = Math.min(
    100,
    sumByValue(filterMods(mods, "SteepStrikeChancePct")),
  );
  const steepChance = steepStrikeChancePct / 100;

  const critDmgMult = calculateCritDmg(mods, skill);
  const disableOffhand = modExists(mods, "JoinedForceDisableOffhand");

  // Build sweep input for weapon attack calculations
  const sweepInput: CalcWeaponAttackInput = {
    mods,
    skill,
    derivedCtx,
    config,
    critDmgMult,
    weaponAtkDmgPct: offense.sweepWeaponAtkDmgPct.value,
    addedDmgEffPct: offense.sweepAddedDmgEffPct.value,
  };
  const sweepOffhandAtk =
    offhand !== undefined && isOneHandedWeapon(offhand)
      ? calcWeaponAttack(offhand, 0, sweepInput)
      : undefined;

  const joinedForceAddedDmgPct = findMod(
    mods,
    "JoinedForceAddOffhandToMainhandPct",
  );
  const joinedForceAddedDmg =
    ((joinedForceAddedDmgPct?.value ?? 0) / 100) *
    (sweepOffhandAtk?.avgHit ?? 0);

  // Calculate sweep mode attacks
  const sweepMainhandAtk = calcWeaponAttack(
    mainhand,
    joinedForceAddedDmg,
    sweepInput,
  );

  // Build steep input for weapon attack calculations
  const steepInput: CalcWeaponAttackInput = {
    mods,
    skill,
    derivedCtx,
    config,
    critDmgMult,
    weaponAtkDmgPct: offense.steepWeaponAtkDmgPct.value,
    addedDmgEffPct: offense.steepAddedDmgEffPct.value,
  };
  const steepOffhandAtk =
    offhand !== undefined && isOneHandedWeapon(offhand)
      ? calcWeaponAttack(offhand, 0, steepInput)
      : undefined;

  // For steep mode, recalculate joined force bonus with steep offhand damage
  const steepJoinedForceAddedDmg =
    ((joinedForceAddedDmgPct?.value ?? 0) / 100) *
    (steepOffhandAtk?.avgHit ?? 0);
  const steepMainhandAtk = calcWeaponAttack(
    mainhand,
    steepJoinedForceAddedDmg,
    steepInput,
  );

  // Calculate DPS for each mode
  const sweepDpsWithoutExtras = calcDualWieldDps(
    sweepMainhandAtk,
    sweepOffhandAtk,
    disableOffhand,
  );
  const steepDpsWithoutExtras = calcDualWieldDps(
    steepMainhandAtk,
    steepOffhandAtk,
    disableOffhand,
  );

  const doubleDmgMult = calculateDoubleDmgMult(mods, skill);
  const extraMult = calculateExtraOffenseMults(mods, config);
  const sweepSlashDmgMult = calcEffMult(mods, "SweepSlashDmgPct");
  const steepStrikeDmgMult = calcEffMult(mods, "SteepStrikeDmgPct");
  const sweepDps =
    sweepDpsWithoutExtras * doubleDmgMult * extraMult * sweepSlashDmgMult;
  const steepDps =
    steepDpsWithoutExtras * doubleDmgMult * extraMult * steepStrikeDmgMult;

  const avgDps = (1 - steepChance) * sweepDps + steepChance * steepDps;

  return {
    sweep: {
      mainhand: sweepMainhandAtk,
      offhand: disableOffhand ? undefined : sweepOffhandAtk,
      avgDps: sweepDps,
    },
    steep: {
      mainhand: steepMainhandAtk,
      offhand: disableOffhand ? undefined : steepOffhandAtk,
      avgDps: steepDps,
    },
    steepStrikeChancePct,
    critDmgMult,
    avgDps,
    multistrikeChancePct: derivedOffenseCtx.multistrikeChancePct,
    multistrikeIncDmgPct: derivedOffenseCtx.multistrikeIncDmgPct,
  };
};

// Combo Attack Archetype
//
// Combo skills have a 3-part rotation: Starter 1 → Starter 2 → Finisher(s).
// Each part has its own weapon attack damage % (which also serves as added
// damage effectiveness). The DPS is time-weighted across the full cycle.
//
// Key mechanics:
// - Combo Points: Each starter generates 1 point (+ ComboPointGainedFromStarter
//   mods). Points accumulate through both starters and are consumed by the
//   finisher. With multiple finisher charges, points persist across finishers.
// - Finisher Amplification: The finisher's damage is multiplied by
//   1 + comboPoints * amplificationMult. This is the main scaling mechanic.
// - Per-part attack speed: Each part can have its own aspd modifier
//   (e.g. finisher typically has -40% aspd, making it slower).
// - Dual wield: Unlike normal attacks which alternate hands, combos average
//   the two weapons' gear damage, attack speed, and crit rating into a
//   single effective weapon.
// - Multistrike: Ignored entirely for combo skills.
//
// Skill-specific mechanics (handled via skill name matching):
// - Spectral Slash: Starter 1 inflicts a special mark causing subsequent
//   hits to deal 30% more damage (applied to starter 2 and finisher).
//   The finisher also spawns clones equal to combo points, each dealing
//   finisher damage with a shotgun falloff coefficient.
//
// Skills using this archetype: Spectral Slash (implemented),
// Crescent Slash, Gale Slash, Serpent Beam (future).
const calcAvgComboDps = (
  mods: Mod[],
  loadout: Loadout,
  perSkillContext: PerSkillModContext,
  skillLevel: number,
  derivedCtx: DerivedCtx,
  config: Configuration,
): OffenseComboDpsSummary | undefined => {
  const skill = perSkillContext.skill;
  const skillMods = getActiveSkillMods(
    skill.name as ActiveSkillName,
    skillLevel,
  );
  const offense = skillMods.offense;

  if (
    offense?.comboStarter1WeaponAtkDmgPct === undefined ||
    offense?.comboStarter2WeaponAtkDmgPct === undefined ||
    offense?.comboFinisherWeaponAtkDmgPct === undefined
  ) {
    return undefined;
  }

  const mainhand = loadout.gearPage.equippedGear.mainHand;
  if (mainhand === undefined) {
    return undefined;
  }
  const offhand = loadout.gearPage.equippedGear.offHand;
  const isDualWield = offhand !== undefined && isOneHandedWeapon(offhand);

  const critDmgMult = calculateCritDmg(mods, skill);

  // Combo dual wield: average the two weapons' results into a single summary.
  // Unlike normal attacks which alternate hands, combos use the average of both
  // weapons' gear damage, attack speed, and crit rating.
  // addedDmgEffPct is always the same as weaponAtkDmgPct for combo skills.
  const calcComboPart = (weaponAtkDmgPct: number): WeaponAttackSummary => {
    const input: CalcWeaponAttackInput = {
      mods,
      skill,
      derivedCtx,
      config,
      critDmgMult,
      weaponAtkDmgPct,
      addedDmgEffPct: weaponAtkDmgPct,
    };
    const mhAtk = calcWeaponAttack(mainhand, 0, input);
    if (!isDualWield) {
      return mhAtk;
    }
    // biome-ignore lint/style/noNonNullAssertion: guarded by isDualWield
    const ohAtk = calcWeaponAttack(offhand!, 0, input);
    return {
      avgHit: (mhAtk.avgHit + ohAtk.avgHit) / 2,
      aspd: (mhAtk.aspd + ohAtk.aspd) / 2,
      critChance: {
        actual: (mhAtk.critChance.actual + ohAtk.critChance.actual) / 2,
        uncapped: (mhAtk.critChance.uncapped + ohAtk.critChance.uncapped) / 2,
      },
      avgHitWithCrit: (mhAtk.avgHitWithCrit + ohAtk.avgHitWithCrit) / 2,
    };
  };

  const starter1Atk = calcComboPart(offense.comboStarter1WeaponAtkDmgPct.value);
  const starter2Atk = calcComboPart(offense.comboStarter2WeaponAtkDmgPct.value);
  const finisherAtk = calcComboPart(offense.comboFinisherWeaponAtkDmgPct.value);

  // Per-part attack speed adjustments
  const starter1AspdMult = calcEffMult(mods, "ComboStarter1AspdPct");
  const starter2AspdMult = calcEffMult(mods, "ComboStarter2AspdPct");
  const finisherAspdMult = calcEffMult(mods, "ComboFinisherAspdPct");

  const starter1Aspd = starter1Atk.aspd * starter1AspdMult;
  const starter2Aspd = starter2Atk.aspd * starter2AspdMult;
  const finisherAspd = finisherAtk.aspd * finisherAspdMult;

  // Combo points: each starter generates 1 + additional points from mods
  const additionalPointsPerStarter = filterMods(
    mods,
    "ComboPointGainedFromStarter",
  ).reduce((sum, m) => sum + m.value, 0);
  const pointsPerStarter = 1 + additionalPointsPerStarter;
  // 2 starters total, so combo points = 2 * pointsPerStarter
  const comboPoints = 2 * pointsPerStarter;

  // Combo finisher charges: base 1 + additional charges from mods
  const additionalFinisherCharges = filterMods(
    mods,
    "ComboFinisherCharge",
  ).reduce((sum, m) => sum + m.value, 0);
  const comboFinisherCount = 1 + additionalFinisherCharges;

  // Time-weighted rotation
  const interval1 = 1 / starter1Aspd;
  const interval2 = 1 / starter2Aspd;
  const intervalF = 1 / finisherAspd;
  const fullCycleTime = interval1 + interval2 + intervalF * comboFinisherCount;

  // Combo Finisher Amplification
  const comboFinisherAmplificationMult = calcEffMult(
    mods,
    "ComboFinisherAmplificationPct",
  );
  const finisherDmgMult =
    1 + comboPoints * (comboFinisherAmplificationMult - 1);

  // Spectral Slash-specific multipliers:
  // - Finisher generates clones (= combo points), capped by maxClones, with shotgun falloff
  // - Starter 1 marks the target for 30% additional damage on subsequent hits
  const isSpectralSlash = skill.name === "Spectral Slash";
  const maxClones = offense.maxClones?.value ?? Infinity;
  const cloneCount = Math.min(comboPoints, maxClones);
  const spectralFinisherCloneMult = isSpectralSlash
    ? 1 + cloneCount * ((offense.shotgunEffFalloffPct?.value ?? 0) / 100)
    : 1;
  const markDmgMult = isSpectralSlash ? 1.3 : 1;

  // Calculate per-part damage contributions in the rotation
  const starter1HitDmg = starter1Atk.avgHitWithCrit;
  const starter2HitDmg = starter2Atk.avgHitWithCrit * markDmgMult;
  const finisherHitDmg =
    finisherAtk.avgHitWithCrit *
    finisherDmgMult *
    spectralFinisherCloneMult *
    markDmgMult;

  const doubleDmgMult = calculateDoubleDmgMult(mods, skill);
  const extraMult = calculateExtraOffenseMults(mods, config);

  const cycleDmg =
    starter1HitDmg + starter2HitDmg + finisherHitDmg * comboFinisherCount;
  const avgDps = (cycleDmg / fullCycleTime) * doubleDmgMult * extraMult;

  return {
    comboFinisherAmplificationPct: (comboFinisherAmplificationMult - 1) * 100,
    comboPoints,
    comboFinisherCount,
    critDmgMult,
    avgDps,
  };
};

interface CalcSpellHitOutput {
  base: {
    physical: DmgRange;
    cold: DmgRange;
    lightning: DmgRange;
    fire: DmgRange;
    erosion: DmgRange;
    total: { min: number; max: number };
  };
  castTime: number;
  avg: number;
}

const calcSpellHit = (
  flatDmg: DmgRanges,
  mods: Mod[],
  skill: BaseActiveSkill,
  level: number,
  derivedCtx: DerivedCtx,
  config: Configuration,
): CalcSpellHitOutput | undefined => {
  const implementedSpells: ActiveSkillName[] = [
    "[Test] Simple Spell",
    "Chain Lightning",
    "Ice Lances",
  ];
  if (!implementedSpells.includes(skill.name as ActiveSkillName)) {
    return undefined;
  }

  const skillMods = getActiveSkillMods(skill.name as ActiveSkillName, level);
  const spellDmg = skillMods.offense?.spellDmg;
  if (spellDmg === undefined) {
    return undefined;
  }
  const { value: skillSpellDR, dmgType, castTime } = spellDmg;
  const skillSpellDRs = { ...emptyDmgRanges(), [dmgType]: skillSpellDR };

  const addedDmgEffPct = skillMods.offense?.addedDmgEffPct?.value;
  if (addedDmgEffPct === undefined) {
    return undefined;
  }
  const skillFlatDRs = multDRs(flatDmg, addedDmgEffPct / 100);
  const skillBaseDR = addDRs(skillSpellDRs, skillFlatDRs);
  const baseDmgModTypes = dmgModTypesForSkill(skill);

  const dmgPools = convertDmg(skillBaseDR, mods);
  const finalDmgRanges = applyDmgBonusesAndPen({
    dmgPools,
    mods,
    baseDmgModTypes,
    config,
    ignoreArmor: false,
  });
  const baseHitOverview = calcBaseHitOverview(finalDmgRanges, derivedCtx, mods);
  return { ...baseHitOverview, castTime };
};

const calcSpellRippleMult = (mods: Mod[]): number => {
  const spellRipple = findMod(mods, "SpellRipple");
  const spellRippleMult =
    spellRipple !== undefined
      ? 1 + (spellRipple.pctOfHitDmg / 100) * (spellRipple.chancePct / 100)
      : 1;
  return spellRippleMult;
};

export interface OffenseSpellDpsSummary {
  critChance: CritChance;
  critDmgMult: number;
  castsPerSec: number;
  avgHitWithCrit: number;
  avgDps: number;
}

const calcAvgSpellDps = (
  mods: Mod[],
  _loadout: Loadout,
  perSkillContext: PerSkillModContext,
  skillLevel: number,
  derivedCtx: DerivedCtx,
  config: Configuration,
): OffenseSpellDpsSummary | undefined => {
  const skill = perSkillContext.skill;
  const flatDmg = calculateFlatDmg(mods, "spell");
  const spellHit = calcSpellHit(
    flatDmg,
    mods,
    skill,
    skillLevel,
    derivedCtx,
    config,
  );
  if (spellHit === undefined) {
    return undefined;
  }
  const { avg, castTime } = spellHit;

  const cspdMult = calcEffMult(mods, "CspdPct");
  const cspd = (1 / castTime) * cspdMult;
  const critChance = calculateCritChance(mods, skill);
  const critDmgMult = calculateCritDmg(mods, skill);
  const doubleDmgMult = calculateDoubleDmgMult(mods, skill);
  const extraMult = calculateExtraOffenseMults(mods, config);
  const spellRippleMult = calcSpellRippleMult(mods);

  const avgHitWithCrit =
    avg * critChance.actual * critDmgMult + avg * (1 - critChance.actual);
  const avgDps =
    avgHitWithCrit * doubleDmgMult * cspd * extraMult * spellRippleMult;
  return { critChance, critDmgMult, castsPerSec: cspd, avgHitWithCrit, avgDps };
};

export interface OffenseSpellBurstDpsSummary {
  burstsPerSec: number;
  maxSpellBurst: number;
  avgDps: number;
  ingenuityOverload?: { avgDps: number; interval: number };
}

const calcAvgSpellBurstDps = (
  mods: Mod[],
  avgHit: number,
  derivedOffenseCtx: DerivedOffenseCtx,
  derivedCtx: DerivedCtx,
): OffenseSpellBurstDpsSummary => {
  const { maxSpellBurst, spellBurstChargeSpeedBonusPct } = derivedOffenseCtx;
  const baseBurstsPerSec = 0.5;
  const burstsPerSecMult = 1 + spellBurstChargeSpeedBonusPct / 100;
  const burstsPerSec = baseBurstsPerSec * burstsPerSecMult;
  const spellBurstDmgMult = calculateAddn(
    filterMods(mods, "SpellBurstAdditionalDmgPct").map((m) => m.value),
  );
  const spellRippleMult = calcSpellRippleMult(mods);

  if (derivedCtx.hero !== bing2) {
    const avgDps =
      burstsPerSec *
      maxSpellBurst *
      avgHit *
      spellBurstDmgMult *
      spellRippleMult;
    return { burstsPerSec, maxSpellBurst, avgDps };
  }

  // Everything after this is bing2 specific

  // Bing2 Ingenuity Overload calculation:
  // - Whimsy Essence accumulates over time and on each Spell Burst
  // - At 100 Whimsy Essence, it resets and grants 25 Ingenuity Essence
  // - At 100 Ingenuity Essence, it resets and triggers Ingenuity Overload
  const baseWhimsyEssencePerSec = 20;
  const whimsyEssenceOnBurst = sumByValue(
    filterMods(mods, "RestoreWhimsyEssenceOnSpellBurst"),
  );
  const whimsyEssenceRecoverSpeedMult = calcEffMult(
    mods,
    "WhimsyEssenceRecoverySpeedPct",
  );

  // Burst gains can overshoot 100 and waste essence. Assuming uniform
  // position in cycle when burst occurs: efficiency ≈ 1 - W/200
  const burstEfficiency = 1 - whimsyEssenceOnBurst / 200;
  const whimsyEssencePerSec =
    baseWhimsyEssencePerSec * whimsyEssenceRecoverSpeedMult +
    whimsyEssenceOnBurst * burstsPerSec * burstEfficiency;

  // 100 Whimsy → 25 Ingenuity, 100 Ingenuity → 1 Overload
  // So 400 Whimsy Essence = 1 Ingenuity Overload
  const ingenuityOverloadPerSec = whimsyEssencePerSec / 400;

  const normalBurstsPerSec = burstsPerSec - 0.5 * ingenuityOverloadPerSec;
  const normalAvgDps =
    normalBurstsPerSec *
    maxSpellBurst *
    avgHit *
    spellBurstDmgMult *
    spellRippleMult;
  // overload triggers +200% additional max spell burst
  const overloadAvgDps =
    ingenuityOverloadPerSec *
    (3 * maxSpellBurst) *
    avgHit *
    spellBurstDmgMult *
    spellRippleMult;
  return {
    burstsPerSec,
    maxSpellBurst,
    avgDps: normalAvgDps,
    ingenuityOverload: {
      avgDps: overloadAvgDps,
      interval: 1 / ingenuityOverloadPerSec,
    },
  };
};

// Calculates offense for all enabled implemented skills
export const calculateOffense = (input: OffenseInput): OffenseResults => {
  const errors: string[] = [];
  const { loadout, configuration: config } = input;
  const loadoutMods = [
    ...collectMods(loadout),
    ...calculateHeroTraitMods(loadout),
  ];

  loadoutMods.push(...calculatePactspiritMods(loadout, loadoutMods));

  const derivedCtx = resolveDerivedCtx(loadout, loadoutMods, config);
  const resourcePool = calculateResourcePool(
    loadoutMods,
    loadout,
    config,
    derivedCtx,
  );

  const unresolvedLoadoutAndBuffMods = [
    ...loadoutMods,
    ...calculateImplicitMods(),
    ...resolveBuffSkillMods(loadout, loadoutMods, config, derivedCtx),
  ];

  const defenses = calculateDefenses(
    unresolvedLoadoutAndBuffMods,
    loadout,
    config,
    derivedCtx,
  );

  const skillSlots = listActiveSkillSlots(loadout);
  const enabledSlots = skillSlots.filter(
    (s) => s.enabled && s.skillName !== undefined,
  );

  //  Calculate for each implemented skill
  const skills: OffenseResults["skills"] = {};
  for (const slot of enabledSlots) {
    const perSkillContext = resolvePerSkillMods(
      slot,
      loadoutMods,
      loadout,
      config,
      derivedCtx,
    );
    if (perSkillContext === undefined) {
      continue; // Skip non-implemented skills
    }
    const skillLevel =
      (slot.level || 20) +
      calculateAddedSkillLevels(
        loadoutMods,
        perSkillContext.skill,
        loadout,
        config,
        derivedCtx,
      );

    const derivedOffenseCtx = resolveModsForOffenseSkill(
      [...unresolvedLoadoutAndBuffMods, ...perSkillContext.mods],
      perSkillContext.skill,
      skillLevel,
      resourcePool,
      defenses,
      loadout,
      config,
      derivedCtx,
    );
    const { mods, movementSpeedBonusPct, tangleSummary } = derivedOffenseCtx;
    errors.push(...derivedOffenseCtx.errors);

    const attackHitSummary = calcAvgAttackDps(
      mods,
      loadout,
      perSkillContext,
      skillLevel,
      derivedOffenseCtx,
      derivedCtx,
      config,
    );

    const slashStrikeDpsSummary = calcAvgSlashStrikeDps(
      mods,
      loadout,
      perSkillContext,
      skillLevel,
      derivedOffenseCtx,
      derivedCtx,
      config,
    );

    const comboDpsSummary = calcAvgComboDps(
      mods,
      loadout,
      perSkillContext,
      skillLevel,
      derivedCtx,
      config,
    );

    const spellDpsSummary = calcAvgSpellDps(
      mods,
      loadout,
      perSkillContext,
      skillLevel,
      derivedCtx,
      config,
    );

    const spellBurstDpsSummary =
      spellDpsSummary !== undefined && derivedOffenseCtx.maxSpellBurst > 0
        ? calcAvgSpellBurstDps(
            mods,
            spellDpsSummary.avgHitWithCrit,
            derivedOffenseCtx,
            derivedCtx,
          )
        : undefined;

    const persistentDpsSummary = calcAvgPersistentDps({
      mods,
      loadout,
      perSkillContext,
      skillLevel,
      config,
    });

    const totalReapDpsSummary =
      persistentDpsSummary !== undefined
        ? calcTotalReapDps(mods, persistentDpsSummary)
        : undefined;

    const totalDps =
      (attackHitSummary?.avgDps ?? 0) +
      (slashStrikeDpsSummary?.avgDps ?? 0) +
      (comboDpsSummary?.avgDps ?? 0) +
      (spellDpsSummary?.avgDps ?? 0) +
      (spellBurstDpsSummary?.avgDps ?? 0) +
      (spellBurstDpsSummary?.ingenuityOverload?.avgDps ?? 0) +
      (persistentDpsSummary?.total ?? 0) +
      (totalReapDpsSummary?.totalReapDps ?? 0);

    skills[slot.skillName as ImplementedActiveSkillName] = {
      attackDpsSummary: attackHitSummary,
      slashStrikeDpsSummary,
      comboDpsSummary,
      spellDpsSummary,
      spellBurstDpsSummary,
      persistentDpsSummary,
      totalReapDpsSummary,
      totalDps,
      movementSpeedBonusPct,
      tangleSummary,
      resolvedMods: mods,
    };
  }

  return { errors, skills, resourcePool, defenses };
};
