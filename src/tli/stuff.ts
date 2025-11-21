import * as R from "remeda";
import { match } from "ts-pattern";
import * as Affix from "./affix";
import { DmgModType, CritRatingModType, CritDmgModType } from "./constants";

let dummy40Armor = 0.11;
let dummy85Armor = 0.44;

type Stat = "dex" | "int" | "str";

type SkillTag =
  | "Attack"
  | "Spell"
  | "Melee"
  | "Area"
  | "Physical"
  | "Slash-Stike"
  | "Persistent";

export type Skill = "[Test] Simple Attack" | "Berserking Blade";

interface SkillConfiguration {
  skill: Skill;
  tags: SkillTag[];
  stats: Stat[];
  addedDmgEffPct: number;
}

let offensiveSkillConfs: SkillConfiguration[] = [
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
];

export interface DmgRange {
  // inclusive on both ends
  min: number;
  max: number;
}

const addDR = (dr1: DmgRange, dr2: DmgRange): DmgRange => {
  return {
    min: dr1.min + dr2.min,
    max: dr1.max + dr2.max,
  };
};

const multDR = (dr: DmgRange, multiplier: number): DmgRange => {
  return {
    min: dr.min * multiplier,
    max: dr.max * multiplier,
  };
};

const emptyDamageRange = (): DmgRange => {
  return { min: 0, max: 0 };
};

export interface TalentPage {
  affixes: Affix.Affix[];
  coreTalents: Affix.Affix[];
}

export interface DivinitySlate {
  affixes: Affix.Affix[];
}

export interface DivinityPage {
  slates: DivinitySlate[];
}

export interface Gear {
  gearType:
    | "helmet"
    | "chest"
    | "neck"
    | "gloves"
    | "belt"
    | "boots"
    | "ring"
    | "sword"
    | "shield";
  affixes: Affix.Affix[];
}

export interface GearPage {
  helmet?: Gear;
  chest?: Gear;
  neck?: Gear;
  gloves?: Gear;
  belt?: Gear;
  boots?: Gear;
  leftRing?: Gear;
  rightRing?: Gear;
  mainHand?: Gear;
  offHand?: Gear;
}

export interface Loadout {
  equipmentPage: GearPage;
  talentPage: TalentPage;
  divinityPage: DivinityPage;
  customConfiguration: Affix.Affix[];
}

interface BasicMod {
  value: number;
  source: string;
}

namespace BMod {
  export interface IBMod {
    src?: string;
  }

  export class Str implements IBMod {
    constructor(
      readonly value: number,
      readonly mod: "pct" | "flat",
      readonly src?: string
    ) {}
  }

  export class Dex implements IBMod {
    constructor(
      readonly value: number,
      readonly mod: "pct" | "flat",
      readonly src?: string
    ) {}
  }

  export class Int implements IBMod {
    constructor(
      readonly value: number,
      readonly mod: "pct" | "flat",
      readonly src?: string
    ) {}
  }

  export class DmgPct implements IBMod {
    constructor(
      readonly value: number,
      readonly addn: boolean,
      readonly modType: DmgModType,
      readonly src?: string
    ) {}
  }

  export class CritRatingPct implements IBMod {
    constructor(
      readonly value: number,
      readonly modType: CritRatingModType,
      readonly src?: string
    ) {}
  }

  export class CritDmgPct implements IBMod {
    constructor(
      readonly value: number,
      readonly addn: boolean,
      readonly modType: CritDmgModType,
      readonly src?: string
    ) {}
  }

  export class AspdPct implements IBMod {
    constructor(
      readonly value: number,
      readonly addn: boolean,
      readonly src?: string
    ) {}
  }

  export class FervorEffPct implements IBMod {
    constructor(
      readonly value: number,
      readonly src?: string
    ) {}
  }
}

interface StatBag {
  additionalMainHandDamage: BasicMod[];
  damage: BasicMod[];
  additionalDamage: BasicMod[];
  critRate: BasicMod[];
  critDamage: BasicMod[];
  additionalCritDamage: BasicMod[];
  attackSpeed: BasicMod[];
  additionalAttackSpeed: BasicMod[];
  doubleDamage: BasicMod[];
  str: BasicMod[];
  dex: BasicMod[];
  steepStrikeChance: BasicMod[];
  steepStrikeDamage: BasicMod[];
  additionalSweepSlashDamage: BasicMod[];
  additionalSteepStrikeDamage: BasicMod[];
  fervorEffect: BasicMod[];
}

const calculateInc = (bonuses: number[]) => {
  return R.pipe(
    bonuses,
    R.filter((b) => true),
    R.sum()
  );
};

const calculateAddn = (bonuses: number[]) => {
  return R.pipe(
    bonuses,
    R.filter((b) => true),
    R.reduce((b1, b2) => b1 * (1 + b2), 1)
  );
};

const calculateBonus = (bonuses: BasicMod[]) => {
  return R.pipe(
    bonuses,
    R.filter((b) => true),
    R.sumBy((b) => b.value)
  );
};

const calculateAdditionalBonus = (bonuses: BasicMod[]) => {
  return R.pipe(
    bonuses,
    R.filter((b) => true),
    R.map((b) => b.value),
    R.reduce((b1, b2) => b1 * (1 + b2), 1)
  );
};

const collectAffixes = (loadout: Loadout): Affix.Affix[] => {
  return [
    ...loadout.divinityPage.slates.map((s) => s.affixes).flat(),
    ...loadout.talentPage.affixes,
    ...loadout.talentPage.coreTalents,
    ...(loadout.equipmentPage.helmet?.affixes || []),
    ...(loadout.equipmentPage.chest?.affixes || []),
    ...(loadout.equipmentPage.neck?.affixes || []),
    ...(loadout.equipmentPage.gloves?.affixes || []),
    ...(loadout.equipmentPage.belt?.affixes || []),
    ...(loadout.equipmentPage.boots?.affixes || []),
    ...(loadout.equipmentPage.leftRing?.affixes || []),
    ...(loadout.equipmentPage.rightRing?.affixes || []),
    ...(loadout.equipmentPage.mainHand?.affixes || []),
    ...(loadout.equipmentPage.offHand?.affixes || []),
    ...loadout.customConfiguration,
  ];
};

interface OffenseSummary {
  critChance: number;
  critDmgMult: number;
  aspd: number;
  avgHit: number;
  avgHitWithCrit: number;
  avgDps: number;
}

interface GearDmg {
  mainHand: WeaponDmg;
  offHand?: WeaponDmg;
}

interface WeaponDmg {
  phys: DmgRange;
  cold: DmgRange;
  lightning: DmgRange;
  fire: DmgRange;
  erosion: DmgRange;
}

const emptyGearDmg = (): GearDmg => {
  return {
    mainHand: {
      phys: { min: 0, max: 0 },
      cold: { min: 0, max: 0 },
      lightning: { min: 0, max: 0 },
      fire: { min: 0, max: 0 },
      erosion: { min: 0, max: 0 },
    },
  };
};

const findAffix = <T extends Affix.Affix["type"]>(
  affixes: Affix.Affix[],
  type: T
): Extract<Affix.Affix, { type: T }> | undefined => {
  return affixes.find((a) => a.type === type) as
    | Extract<Affix.Affix, { type: T }>
    | undefined;
};

const filterAffix = <T extends Affix.Affix["type"]>(
  affixes: Affix.Affix[],
  type: T
): Extract<Affix.Affix, { type: T }>[] => {
  return affixes.filter((a) => a.type === type) as Extract<
    Affix.Affix,
    { type: T }
  >[];
};

// currently only calculating mainhand
const calculateGearDmg = (
  loadout: Loadout,
  allAffixes: Affix.Affix[]
): GearDmg => {
  let mh = loadout.equipmentPage.mainHand;
  if (mh === undefined) {
    return emptyGearDmg();
  }
  let basePhysDmg = findAffix(mh.affixes, "GearBasePhysFlatDmg");
  if (basePhysDmg === undefined) {
    return emptyGearDmg();
  }

  let phys = emptyDamageRange();
  let cold = emptyDamageRange();
  let lightning = emptyDamageRange();
  let fire = emptyDamageRange();
  let erosion = emptyDamageRange();

  phys.min += basePhysDmg.value;
  phys.max += basePhysDmg.value;
  let physBonusPct = 0;

  let gearEleMinusPhysDmg = findAffix(mh.affixes, "GearPlusEleMinusPhysDmg");
  if (gearEleMinusPhysDmg !== undefined) {
    physBonusPct -= 1;

    let min = gearEleMinusPhysDmg.value.min;
    let max = gearEleMinusPhysDmg.value.max;
    cold.min += min;
    cold.max += max;
    lightning.min += min;
    lightning.max += max;
    fire.min += min;
    fire.max += max;
  }

  let gearPhysDmgPct = findAffix(mh.affixes, "GearPhysDmgPct");
  if (gearPhysDmgPct !== undefined) {
    physBonusPct += gearPhysDmgPct.value;
  }

  filterAffix(mh.affixes, "FlatGearDmg").forEach((a) => {
    match(a.modType)
      .with("physical", () => {
        phys = addDR(phys, a.value);
      })
      .with("cold", () => {
        cold = addDR(cold, a.value);
      })
      .with("lightning", () => {
        lightning = addDR(lightning, a.value);
      })
      .with("fire", () => {
        fire = addDR(fire, a.value);
      })
      .with("erosion", () => {
        erosion = addDR(erosion, a.value);
      })
      .exhaustive();
  });

  let addnMHDmgMult = 1;
  filterAffix(allAffixes, "AddnMainHandDmgPct").forEach((a) => {
    addnMHDmgMult *= 1 + a.value;
  });

  phys = multDR(phys, 1 + physBonusPct);
  phys = multDR(phys, addnMHDmgMult);
  cold = multDR(cold, addnMHDmgMult);
  lightning = multDR(lightning, addnMHDmgMult);
  fire = multDR(fire, addnMHDmgMult);
  erosion = multDR(erosion, addnMHDmgMult);
  return {
    mainHand: {
      phys: phys,
      cold: cold,
      lightning: lightning,
      fire: fire,
      erosion: erosion,
    },
  };
};

const calculateGearAspd = (
  loadout: Loadout,
  allAffixes: Affix.Affix[]
): number => {
  let mh = loadout.equipmentPage.mainHand;
  if (mh === undefined) {
    return 0;
  }
  let baseAspd = findAffix(mh.affixes, "GearBaseAspd");
  if (baseAspd === undefined) {
    return 0;
  }
  let gearAspdPctBonus = calculateInc(
    filterAffix(mh.affixes, "GearAspdPct").map((b) => b.value)
  );
  return baseAspd.value * (1 + gearAspdPctBonus);
};

const calculateDmgPcts = (allAffixes: Affix.Affix[]): BMod.DmgPct[] => {
  let dmgPctAffixes = filterAffix(allAffixes, "DmgPct");
  return dmgPctAffixes.map((a) => {
    return new BMod.DmgPct(a.value, a.addn, a.modType, a.src);
  });
  // let byModType = R.pipe(
  //   dmgPctAffixes,
  //   R.map((a) => {
  //     return new BMod.DmgPct(a.value, a.addn, a.modType, a.src);
  //   }),
  //   R.groupBy((s) => s.modType)
  // );
  // let dmgPcts: DmgPcts = {
  //   global: byModType["global"] || [],
  //   attack: byModType["attack"] || [],
  //   spell: byModType["spell"] || [],
  //   physical: byModType["physical"] || [],
  //   cold: byModType["cold"] || [],
  //   lightning: byModType["lightning"] || [],
  //   fire: byModType["fire"] || [],
  //   erosion: byModType["erosion"] || [],
  // };
  // return dmgPcts;
};

const calculateCritRating = (allAffixes: Affix.Affix[]): number => {
  let critRatingPctAffixes = filterAffix(allAffixes, "CritRatingPct");
  let mods = critRatingPctAffixes.map((a) => {
    return new BMod.CritRatingPct(a.value, a.modType, a.src);
  });
  let inc = calculateInc(mods.map((v) => v.value));
  return 0.05 * (1 + inc);
};

const calculateCritDmg = (allAffixes: Affix.Affix[]): number => {
  let critDmgPctAffixes = filterAffix(allAffixes, "CritDmgPct");
  let mods = critDmgPctAffixes.map((a) => {
    return new BMod.CritDmgPct(a.value, a.addn, a.modType, a.src);
  });

  let inc = calculateInc(mods.filter((m) => !m.addn).map((v) => v.value));
  let addn = calculateAddn(mods.filter((m) => m.addn).map((v) => v.value));

  return 1.5 * (1 + inc) * addn;
};

const calculateAspdPcts = (allAffixes: Affix.Affix[]): BMod.AspdPct[] => {
  let aspdPctAffixes = filterAffix(allAffixes, "AspdPct");
  return aspdPctAffixes.map((a) => {
    return new BMod.AspdPct(a.value, a.addn, a.src);
  });
};

const calculateAspd = (loadout: Loadout, allAffixes: Affix.Affix[]): number => {
  let gearAspd = calculateGearAspd(loadout, allAffixes);
  let aspdPctMods = calculateAspdPcts(allAffixes);
  let inc = calculateInc(
    aspdPctMods.filter((m) => !m.addn).map((v) => v.value)
  );
  let addn = calculateAddn(
    aspdPctMods.filter((m) => m.addn).map((v) => v.value)
  );

  return gearAspd * (1 + inc) * addn;
};

const dmgModTypePerSkillTag: Partial<Record<SkillTag, DmgModType>> = {
  Attack: "attack",
  Spell: "spell",
  Melee: "attack",
  Area: "attack",
};

const dmgModTypesForSkill = (conf: SkillConfiguration) => {
  let dmgModTypes: DmgModType[] = ["global"];
  conf.tags.forEach((t) => {
    let dmgModType = dmgModTypePerSkillTag[t];
    if (dmgModType !== undefined) {
      dmgModTypes.push(dmgModType);
    }
  });
  return dmgModTypes;
};

interface DmgOverview {
  phys: DmgRange;
  cold: DmgRange;
  lightning: DmgRange;
  fire: DmgRange;
  erosion: DmgRange;
}

const filterDmgPctMods = (
  dmgPctMods: BMod.DmgPct[],
  dmgModTypes: DmgModType[]
) => {
  return dmgPctMods.filter((p) => dmgModTypes.includes(p.modType));
};

interface DmgModsAggr {
  inc: number;
  addn: number;
}

interface TotalDmgModsPerType {
  phys: DmgModsAggr;
  cold: DmgModsAggr;
  lightning: DmgModsAggr;
  fire: DmgModsAggr;
  erosion: DmgModsAggr;
}

const calculateDmgInc = (mods: BMod.DmgPct[]) => {
  return calculateInc(mods.filter((m) => !m.addn).map((m) => m.value));
};

const calculateDmgAddn = (mods: BMod.DmgPct[]) => {
  return calculateAddn(mods.filter((m) => m.addn).map((m) => m.value));
};

const getTotalDmgModsPerType = (
  allDmgPctMods: BMod.DmgPct[],
  skillConf: SkillConfiguration
): TotalDmgModsPerType => {
  let dmgModTypes = dmgModTypesForSkill(skillConf);
  let dmgModTypesForPhys: DmgModType[] = [...dmgModTypes, "physical"];
  let dmgModTypesForCold: DmgModType[] = [...dmgModTypes, "cold", "elemental"];
  let dmgModTypesForLightning: DmgModType[] = [
    ...dmgModTypes,
    "lightning",
    "elemental",
  ];
  let dmgModTypesForFire: DmgModType[] = [...dmgModTypes, "fire", "elemental"];
  let dmgModTypesForErosion: DmgModType[] = [...dmgModTypes, "erosion"];

  let dmgPctModsForPhys = filterDmgPctMods(allDmgPctMods, dmgModTypesForPhys);
  let dmgPctModsForCold = filterDmgPctMods(allDmgPctMods, dmgModTypesForCold);
  let dmgPctModsForLightning = filterDmgPctMods(
    allDmgPctMods,
    dmgModTypesForLightning
  );
  let dmgPctModsForFire = filterDmgPctMods(allDmgPctMods, dmgModTypesForFire);
  let dmgPctModsForErosion = filterDmgPctMods(
    allDmgPctMods,
    dmgModTypesForErosion
  );

  return {
    phys: {
      inc: calculateDmgInc(dmgPctModsForPhys),
      addn: calculateDmgAddn(dmgPctModsForPhys),
    },
    cold: {
      inc: calculateDmgInc(dmgPctModsForCold),
      addn: calculateDmgAddn(dmgPctModsForCold),
    },
    lightning: {
      inc: calculateDmgInc(dmgPctModsForLightning),
      addn: calculateDmgAddn(dmgPctModsForLightning),
    },
    fire: {
      inc: calculateDmgInc(dmgPctModsForFire),
      addn: calculateDmgAddn(dmgPctModsForFire),
    },
    erosion: {
      inc: calculateDmgInc(dmgPctModsForErosion),
      addn: calculateDmgAddn(dmgPctModsForErosion),
    },
  };
};

const calculateDmgRange = (
  dmgRange: DmgRange,
  dmgModsAggr: DmgModsAggr
): DmgRange => {
  let mult = (1 + dmgModsAggr.inc) * dmgModsAggr.addn;
  return multDR(dmgRange, mult);
};

interface SkillHitOverview {
  base: {
    phys: DmgRange;
    cold: DmgRange;
    lightning: DmgRange;
    fire: DmgRange;
    erosion: DmgRange;
    total: DmgRange;
    totalAvg: number;
  };
  avg: number;
}

const calculateSkillHit = (
  gearDmg: GearDmg,
  allDmgPcts: BMod.DmgPct[],
  skillConf: SkillConfiguration
): SkillHitOverview => {
  let totalDmgModsPerType = getTotalDmgModsPerType(allDmgPcts, skillConf);
  let phys = calculateDmgRange(gearDmg.mainHand.phys, totalDmgModsPerType.phys);
  let cold = calculateDmgRange(gearDmg.mainHand.cold, totalDmgModsPerType.cold);
  let lightning = calculateDmgRange(
    gearDmg.mainHand.lightning,
    totalDmgModsPerType.lightning
  );
  let fire = calculateDmgRange(gearDmg.mainHand.fire, totalDmgModsPerType.fire);
  let erosion = calculateDmgRange(
    gearDmg.mainHand.erosion,
    totalDmgModsPerType.erosion
  );
  let total = {
    min: phys.min + cold.min + lightning.min + fire.min + erosion.min,
    max: phys.max + cold.max + lightning.max + fire.max + erosion.max,
  };
  let totalAvg = (total.min + total.max) / 2;

  let finalAvg = match(skillConf.skill)
    .with("Berserking Blade", () => {
      return totalAvg * 2.1;
    })
    .with("[Test] Simple Attack", () => {
      return totalAvg;
    })
    .otherwise(() => {
      // either it's unimplemented, not an attack
      return 0;
    });

  return {
    base: {
      phys: phys,
      cold: cold,
      lightning: lightning,
      fire: fire,
      erosion: erosion,
      total: total,
      totalAvg: totalAvg,
    },
    avg: finalAvg,
  };
};

// return undefined if skill unimplemented or it's not an offensive skill
export const calculateOffense = (
  loadout: Loadout,
  skill: Skill
): OffenseSummary | undefined => {
  let skillConf = offensiveSkillConfs.find((c) => c.skill === skill);
  if (skillConf === undefined) {
    return undefined;
  }
  let allAffixes = collectAffixes(loadout);
  let gearDmg = calculateGearDmg(loadout, allAffixes);
  let aspd = calculateAspd(loadout, allAffixes);
  let dmgPcts = calculateDmgPcts(allAffixes);
  let critChance = calculateCritRating(allAffixes);
  let critDmgMult = calculateCritDmg(allAffixes);

  let skillHit = calculateSkillHit(gearDmg, dmgPcts, skillConf);
  let avgHitWithCrit =
    skillHit.avg * critChance * critDmgMult + skillHit.avg * (1 - critChance);
  let avgDps = avgHitWithCrit * aspd;

  return {
    critChance: critChance,
    critDmgMult: critDmgMult,
    aspd: aspd,
    avgHit: skillHit.avg,
    avgHitWithCrit: avgHitWithCrit,
    avgDps: avgDps,
  };
};

const _calculateDps = (statBag: StatBag) => {
  // let weaponDamage = 178;
  //let weaponDamage = 209.5;
  let weaponDamage = ((20 + 107) / 2) * 2.1;
  let weaponAttackSpeed = 1.5;
  let weaponCritRate = 0.05;

  let additionalMainHandDamageBonus = calculateAdditionalBonus(
    statBag.additionalMainHandDamage
  );
  let dmgBonus = calculateBonus(statBag.damage);
  let additionalAttrDmgBonus = {
    value:
      0.005 *
      (R.sumBy(statBag.str, (b) => b.value) +
        R.sumBy(statBag.dex, (b) => b.value)),
    source: "main stats",
  };
  let additionalDmgBonus = calculateAdditionalBonus(
    R.concat(statBag.additionalDamage, [additionalAttrDmgBonus])
  );

  let critRateBonus = calculateBonus(statBag.critRate);

  let critDmgBonus = calculateBonus(statBag.critDamage);
  let additionalCritDamageBonus = calculateAdditionalBonus(
    statBag.additionalCritDamage
  );

  let aspdBonus = calculateBonus(statBag.attackSpeed);
  let additionalAspdBonus = calculateAdditionalBonus(
    statBag.additionalAttackSpeed
  );

  let doubleDamageBonus = calculateBonus(statBag.doubleDamage);

  let steepStrikeChance = calculateBonus(statBag.steepStrikeChance);
  let steepStrikeDamageBonus = calculateBonus(statBag.steepStrikeDamage);
  let additionalSweepSlashDamage = calculateAdditionalBonus(
    statBag.additionalSweepSlashDamage
  );
  let additionalSteepStrikeDamageBonus = calculateAdditionalBonus(
    statBag.additionalSteepStrikeDamage
  );
  let steepWeaponDamage =
    Math.min(1, steepStrikeChance) *
      4.21 *
      (1 + steepStrikeDamageBonus) *
      additionalSteepStrikeDamageBonus +
    Math.max(0, 1 - steepStrikeChance) * 2.1 * additionalSweepSlashDamage;

  console.log(`steepWeaponDamage: ${steepWeaponDamage.toLocaleString()}`);

  let trinityMult = 1;

  let damage =
    weaponDamage *
    (1 + dmgBonus) *
    additionalDmgBonus *
    steepWeaponDamage *
    additionalMainHandDamageBonus *
    trinityMult;
  let critRate = Math.min(1, weaponCritRate * (1 + critRateBonus));
  let critDamage = (1.5 + critDmgBonus) * additionalCritDamageBonus;
  let attackSpeed = Math.min(
    30,
    weaponAttackSpeed * (1 + aspdBonus) * additionalAspdBonus
  );
  let dph = damage * (1 + critRate * (critDamage - 1));
  let dps =
    damage *
    (1 + critRate * (critDamage - 1)) *
    attackSpeed *
    (1 + doubleDamageBonus);

  console.log(`dph: ${dph.toLocaleString()}`);
  console.log(`dph no crit: ${damage.toLocaleString()}`);
  console.log(`damage bonus: ${dmgBonus.toLocaleString()}`);
  console.log(`critRate: ${critRate}`);
  console.log(`critDamage: ${critDamage}`);
  console.log(`aspdBonus: ${aspdBonus}`);
  console.log(`additionalAspdBonus: ${additionalAspdBonus - 1}`);
  console.log(`attackSpeed: ${attackSpeed}`);
  console.log(`dps: ${dps.toLocaleString()}`);
};
let bag2: StatBag = {
  additionalMainHandDamage: [
    // { value: 0.08, source: "sword" },
    { value: 0.22, source: "left ring" },
    { value: 0.28, source: "right ring" },
    { value: 0.192, source: "trait 3" },
  ],
  damage: [
    // { value: 0.5, source: "sword" },
    { value: 0.91, source: "right ring" },
    { value: 0.27, source: "talent: god of might 0x3" },
    { value: 0.54, source: "talent: god of might 3x3" },
    { value: 0.27, source: "talent: god of might 12x1" },
    { value: 0.54, source: "talent: god of might 15x1" },
    { value: 0.27, source: "talent: god of might 12x5" },
    { value: 0.36 * 1.64, source: "talent: the brave 3x4" },
    { value: 0.54 * 1.64, source: "talent: the brave 3x5" },
    { value: 0.27, source: "talent: the brave 12x1" },
    { value: 0.54, source: "talent: the brave 15x1" },
    { value: 0.27, source: "talent: ronin 15x2" },
  ],
  additionalDamage: [
    // { value: -0.11, source: "lvl40 dummy armor" },
    { value: -0.066, source: "lvl40 dummy armor nonphys" },
    // { value: -.44, source: "lvl85 dummy armor"},
    { value: 0.25, source: "scorch res pen" },
    { value: 0.05, source: "numb 1 stack" },
    { value: 0.19, source: "dirty tricks (3 ailment)" },
    { value: 0.08, source: "agility blessing" },
    { value: 0.1, source: "motionless" },
    { value: 0.1, source: "boots: skill +1" },
    { value: 0.1, source: "talent: god of might 18x1: skill +1" },
    { value: 0.05, source: "attack aggression" },
    { value: 0.15, source: "hidden mastery" },
    { value: 0.25, source: "tradeoff" },
    { value: 0.08 * 1.44, source: "talent: the brave 0x5" },
    { value: 0.08, source: "talent: the brave 18x1" },
    { value: 0.1, source: "talent: ranger 18x4" },
    { value: 0.3, source: "trait 0" }, // ele only
    { value: 0.28, source: "trait 1" }, // flaky?
    { value: 0.4, source: "trait 2" }, // ele only
    { value: 0.1, source: "trait 3" }, // ele only
    { value: -0.2, source: "trait uptime" },
  ],
  critRate: [
    {
      value: 3 * (1 + 0.12 + 0.84 + 0.64 + 0.12 + 0.24 + 0.2 + 0.8),
      source: "fervor + eff",
    },
  ],
  critDamage: [
    { value: 0.63, source: "right ring" },
    { value: 0.225, source: "talent: ranger 3x2" },
    { value: 0.75, source: "talent: ranger 15x1" },
    { value: 0.58, source: "memory 1" },
    { value: 0.42, source: "memory 2" },
    { value: 0.58, source: "memory 2" },
  ],
  additionalCritDamage: [],
  attackSpeed: [
    { value: 0.06, source: "divinity" },
    { value: 0.16, source: "agility blessing" },
    { value: 0.15, source: "hidden mastery" },
    { value: 0.05, source: "boots" },
    { value: 0.09, source: "talent: the brave 3x2" },
    { value: 0.06, source: "talent: the brave 6x2" },
    { value: 0.09, source: "talent: ranger 6x1" },
    { value: 0.18, source: "talent: ranger 9x1" },
    { value: 0.09, source: "talent: ronin 3x2" },
    { value: 0.18, source: "talent: ronin 6x2" },
    { value: 0.14, source: "memory 3" },
    { value: 0.44, source: "memory 3" },
  ],
  additionalAttackSpeed: [
    { value: 0.05, source: "attack aggression" },
    { value: 0.08, source: "hasten" },
    { value: 0.2, source: "trait 0" },
    { value: 0.19, source: "weapon" },
  ],
  doubleDamage: [
    //{ value: 0.39, source: "sword" }
  ],
  str: [{ value: 162, source: "stat sheet" }],
  dex: [{ value: 152, source: "stat sheet" }],
  steepStrikeChance: [{ value: 1, source: "stat sheet" }],
  steepStrikeDamage: [],
  additionalSweepSlashDamage: [{ value: -0.15, source: "neck" }],
  additionalSteepStrikeDamage: [{ value: 1.4, source: "neck" }],
  fervorEffect: [],
};

// calculateDps(bag2);

let loadout: Loadout = {
  equipmentPage: {
    helmet: { gearType: "helmet", affixes: [] },
    chest: { gearType: "chest", affixes: [] },
    neck: { gearType: "neck", affixes: [] },
    gloves: { gearType: "gloves", affixes: [] },
    belt: { gearType: "belt", affixes: [] },
    boots: { gearType: "boots", affixes: [] },
    leftRing: { gearType: "ring", affixes: [] },
    rightRing: { gearType: "ring", affixes: [] },
    mainHand: { gearType: "sword", affixes: [] },
    offHand: { gearType: "shield", affixes: [] },
  },
  talentPage: { affixes: [], coreTalents: [] },
  divinityPage: { slates: [] },
  customConfiguration: [],
};
