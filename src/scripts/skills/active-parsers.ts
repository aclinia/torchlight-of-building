import { t, ts } from "@/src/tli/mod-parser";
import {
  findColumn,
  parseNumericValue,
  validateAllLevels,
} from "./progression-table";
import type { SupportLevelParser } from "./types";
import { createConstantLevels, findMatch } from "./utils";

export const iceBondParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const coldDmgPctVsFrostbitten: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const match = findMatch(
      text,
      ts("{value:?dec%} additional cold damage against frostbitten enemies"),
      skillName,
    );
    coldDmgPctVsFrostbitten[level] = match.value;
  }

  validateAllLevels(coldDmgPctVsFrostbitten, skillName);

  return { coldDmgPctVsFrostbitten };
};

export const bullsRageParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const meleeDmgPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const match = findMatch(
      text,
      ts("{value:?dec%} additional melee skill damage"),
      skillName,
    );
    meleeDmgPct[level] = match.value;
  }

  validateAllLevels(meleeDmgPct, skillName);

  return { meleeDmgPct };
};

export const frostSpikeParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const addedDmgEffCol = findColumn(
    progressionTable,
    "effectiveness of added damage",
    skillName,
  );
  const damageCol = findColumn(progressionTable, "damage", skillName);
  const descriptCol = findColumn(progressionTable, "descript", skillName);

  const weaponAtkDmgPct: Record<number, number> = {};
  const addedDmgEffPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(addedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20) {
      addedDmgEffPct[level] = parseNumericValue(text);
    }
  }

  for (const [levelStr, text] of Object.entries(damageCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20) {
      const dmgMatch = findMatch(
        text,
        ts("deals {value:dec%} weapon attack damage"),
        skillName,
      );
      weaponAtkDmgPct[level] = dmgMatch.value;
    }
  }

  const level20WeaponDmg = weaponAtkDmgPct[20];
  const level20AddedDmgEff = addedDmgEffPct[20];

  if (level20WeaponDmg === undefined || level20AddedDmgEff === undefined) {
    throw new Error(
      `${skillName}: level 20 values missing, cannot fallback for levels 21-40`,
    );
  }

  for (let level = 21; level <= 40; level++) {
    if (weaponAtkDmgPct[level] === undefined) {
      weaponAtkDmgPct[level] = level20WeaponDmg;
    }
    if (addedDmgEffPct[level] === undefined) {
      addedDmgEffPct[level] = level20AddedDmgEff;
    }
  }

  const descript = descriptCol.rows[1];
  if (descript === undefined) {
    throw new Error(`${skillName}: no descript found for level 1`);
  }

  const convertPhysicalToColdPct = findMatch(
    descript,
    ts("converts {value:int%} of the skill's physical damage to cold damage"),
    skillName,
  ).value;

  const maxProjectile = findMatch(
    descript,
    ts(
      "max amount of projectiles that can be fired by this skill is {value:int}",
    ),
    skillName,
  ).value;

  const projectilePerFrostbiteRating = findMatch(
    descript,
    ts("{value:+int} projectile quantity for every {_:int} frostbite rating"),
    skillName,
  ).value;

  const baseProjectile = findMatch(
    descript,
    ts("fires {value:int} projectiles in its base state"),
    skillName,
  ).value;

  const dmgPctPerProjectile = findMatch(
    descript,
    ts(
      "{value:+int%} additional damage for every {_:+int} projectile quantity",
    ),
    skillName,
  ).value;

  validateAllLevels(weaponAtkDmgPct, skillName);
  validateAllLevels(addedDmgEffPct, skillName);

  return {
    weaponAtkDmgPct,
    addedDmgEffPct,
    convertPhysicalToColdPct: createConstantLevels(convertPhysicalToColdPct),
    maxProjectile: createConstantLevels(maxProjectile),
    projectilePerFrostbiteRating: createConstantLevels(
      projectilePerFrostbiteRating,
    ),
    baseProjectile: createConstantLevels(baseProjectile),
    dmgPctPerProjectile: createConstantLevels(dmgPctPerProjectile),
  };
};

export const chargingWarcryParser: SupportLevelParser = (input) => {
  const { skillName, description } = input;
  const firstDescription = description[0] ?? "";

  const dmgMatch = findMatch(
    firstDescription,
    ts(
      "shadow strike skills gain {dmg:int%} additional damage and Ailment Damage for every enemy",
    ),
    skillName,
  );

  return { shadowStrikeSkillDmgPerEnemy: createConstantLevels(dmgMatch.dmg) };
};

export const mindControlParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const addedDmgEffCol = findColumn(
    progressionTable,
    "effectiveness of added damage",
    skillName,
  );
  const damageCol = progressionTable.find(
    (col) => col.header.toLowerCase() === "damage",
  );
  if (damageCol === undefined) {
    throw new Error(`${skillName}: no "damage" column found`);
  }
  const descriptCol = findColumn(progressionTable, "descript", skillName);

  const addedDmgEffPct: Record<number, number> = {};
  const persistentDamage: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(addedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      const match = t("{value:dec%}").match(text, skillName);
      addedDmgEffPct[level] = match.value;
    }
  }

  for (const [levelStr, text] of Object.entries(damageCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      const match = findMatch(
        text,
        ts("deals {value:int} per second erosion damage over time"),
        skillName,
      );
      persistentDamage[level] = match.value;
    }
  }

  const level20AddedDmgEff = addedDmgEffPct[20];
  const level20PersistentDmg = persistentDamage[20];
  if (level20AddedDmgEff === undefined || level20PersistentDmg === undefined) {
    throw new Error(`${skillName}: level 20 values missing`);
  }
  for (let level = 21; level <= 40; level++) {
    addedDmgEffPct[level] = level20AddedDmgEff;
    persistentDamage[level] = level20PersistentDmg;
  }

  const descript = descriptCol.rows[1];
  if (descript === undefined) {
    throw new Error(`${skillName}: no descript found for level 1`);
  }

  const initialMaxChannel = findMatch(
    descript,
    ts("channels up to {value:int} stacks"),
    skillName,
  ).value;

  const additionalDmgPctPerMaxChannel = findMatch(
    descript,
    ts(
      "{value:dec} % additional damage for every {_:+int} additional max channeled stack",
    ),
    skillName,
  ).value;

  const initialMaxLinks = findMatch(
    descript,
    ts("initially has {value:int} maximum links"),
    skillName,
  ).value;

  const maxLinkPerChannel = findMatch(
    descript,
    ts("{value:+int} maximum link for every channeled stack"),
    skillName,
  ).value;

  const movementSpeedPctWhileChanneling = findMatch(
    descript,
    ts("{value:+int%} movement speed while channeling"),
    skillName,
  ).value;

  const restoreLifePctValue = findMatch(
    descript,
    ts("{value:dec%} max life per second per link"),
    skillName,
  ).value;

  validateAllLevels(addedDmgEffPct, skillName);
  validateAllLevels(persistentDamage, skillName);

  return {
    addedDmgEffPct,
    persistentDamage,
    initialMaxChannel: createConstantLevels(initialMaxChannel),
    additionalDmgPctPerMaxChannel: createConstantLevels(
      additionalDmgPctPerMaxChannel,
    ),
    initialMaxLinks: createConstantLevels(initialMaxLinks),
    maxLinkPerChannel: createConstantLevels(maxLinkPerChannel),
    movementSpeedPctWhileChanneling: createConstantLevels(
      movementSpeedPctWhileChanneling,
    ),
    restoreLifePctValue: createConstantLevels(restoreLifePctValue),
    restoreLifePctInterval: createConstantLevels(1),
  };
};

export const entangledPainParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const dmgPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const match = findMatch(
      text,
      ts("{value:?dec%} additional damage over time taken by cursed enemies"),
      skillName,
    );
    dmgPct[level] = match.value;
  }

  validateAllLevels(dmgPct, skillName);

  return { dmgPct };
};

export const corruptionParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const dmgPct: Record<number, number> = {};
  const inflictWiltPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const dmgMatch = findMatch(
      text,
      ts("{value:?dec%} additional erosion damage taken"),
      skillName,
    );
    dmgPct[level] = dmgMatch.value;

    const wiltMatch = findMatch(
      text,
      ts("{value:?dec%} chance to wilt when you are hit by a cursed enemy"),
      skillName,
    );
    inflictWiltPct[level] = wiltMatch.value;
  }

  validateAllLevels(dmgPct, skillName);
  validateAllLevels(inflictWiltPct, skillName);

  return { dmgPct, inflictWiltPct };
};

export const manaBoilParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const spellDmgPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const match = findMatch(
      text,
      ts("{value:?dec%} additional spell damage while the skill lasts"),
      skillName,
    );
    spellDmgPct[level] = match.value;
  }

  validateAllLevels(spellDmgPct, skillName);

  return { spellDmgPct };
};

export const arcaneCircleParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const spellDmgPctPerStack: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const match = findMatch(
      text,
      ts("grants {value:?dec%} additional spell damage"),
      skillName,
    );
    spellDmgPctPerStack[level] = match.value;
  }

  validateAllLevels(spellDmgPctPerStack, skillName);

  return { spellDmgPctPerStack };
};

export const chainLightningParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const addedDmgEffCol = findColumn(
    progressionTable,
    "effectiveness of added damage",
    skillName,
  );
  const damageCol = progressionTable.find(
    (col) => col.header.toLowerCase() === "damage",
  );
  if (damageCol === undefined) {
    throw new Error(`${skillName}: no "damage" column found`);
  }
  const descriptCol = findColumn(progressionTable, "descript", skillName);

  const addedDmgEffPct: Record<number, number> = {};
  const spellDmgMin: Record<number, number> = {};
  const spellDmgMax: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(addedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      addedDmgEffPct[level] = parseNumericValue(text);
    }
  }

  for (const [levelStr, text] of Object.entries(damageCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      const match = findMatch(
        text,
        ts("deals {min:int}-{max:int} spell lightning damage"),
        skillName,
      );
      spellDmgMin[level] = match.min;
      spellDmgMax[level] = match.max;
    }
  }

  const level20AddedDmgEff = addedDmgEffPct[20];
  const level20SpellDmgMin = spellDmgMin[20];
  const level20SpellDmgMax = spellDmgMax[20];
  if (
    level20AddedDmgEff === undefined ||
    level20SpellDmgMin === undefined ||
    level20SpellDmgMax === undefined
  ) {
    throw new Error(`${skillName}: level 20 values missing`);
  }
  for (let level = 21; level <= 40; level++) {
    addedDmgEffPct[level] = level20AddedDmgEff;
    spellDmgMin[level] = level20SpellDmgMin;
    spellDmgMax[level] = level20SpellDmgMax;
  }

  const descript = descriptCol.rows[1];
  if (descript === undefined) {
    throw new Error(`${skillName}: no descript found for level 1`);
  }

  const jump = findMatch(
    descript,
    ts("{value:+int} jumps for this skill"),
    skillName,
  ).value;

  validateAllLevels(addedDmgEffPct, skillName);
  validateAllLevels(spellDmgMin, skillName);
  validateAllLevels(spellDmgMax, skillName);

  return {
    addedDmgEffPct,
    spellDmgMin,
    spellDmgMax,
    castTime: createConstantLevels(0.65),
    jump: createConstantLevels(jump),
  };
};

export const bitingColdParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const dmgPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const dmgMatch = findMatch(
      text,
      ts("{value:?dec%} additional cold damage taken"),
      skillName,
    );
    dmgPct[level] = dmgMatch.value;
  }

  validateAllLevels(dmgPct, skillName);

  return { dmgPct };
};

export const timidParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const dmgPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const match = findMatch(
      text,
      ts("{value:?dec%} additional hit damage taken by cursed enemies"),
      skillName,
    );
    dmgPct[level] = match.value;
  }

  validateAllLevels(dmgPct, skillName);

  return { dmgPct };
};

export const secretOriginUnleashParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const spellDmgPct: Record<number, number> = {};

  const level1Text = descriptCol.rows[1];
  if (level1Text === undefined) {
    throw new Error(`${skillName}: no descript found for level 1`);
  }
  const cspdMatch = findMatch(
    level1Text,
    ts("{value:+int}% cast speed for every stack of focus blessing"),
    skillName,
  );

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    const match = findMatch(
      text,
      ts("{value:?dec%} additional spell damage while the skill lasts"),
      skillName,
    );
    spellDmgPct[level] = match.value;
  }

  validateAllLevels(spellDmgPct, skillName);

  return {
    spellDmgPct,
    cspdPctPerFocusBlessing: createConstantLevels(cspdMatch.value),
  };
};

export const thunderSpikeParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const addedDmgEffCol = findColumn(
    progressionTable,
    "effectiveness of added damage",
    skillName,
  );

  const weaponAtkDmgPct: Record<number, number> = {};
  const addedDmgEffPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(addedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      const value = parseNumericValue(text);
      weaponAtkDmgPct[level] = value;
      addedDmgEffPct[level] = value;
    }
  }

  const level20Value = weaponAtkDmgPct[20];
  if (level20Value === undefined) {
    throw new Error(`${skillName}: level 20 value missing`);
  }
  for (let level = 21; level <= 40; level++) {
    weaponAtkDmgPct[level] = level20Value;
    addedDmgEffPct[level] = level20Value;
  }

  validateAllLevels(weaponAtkDmgPct, skillName);
  validateAllLevels(addedDmgEffPct, skillName);

  return { weaponAtkDmgPct, addedDmgEffPct };
};

export const electrocuteParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const lightningDmgPct: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);

    const dmgMatch = findMatch(
      text,
      ts("{value:?dec%} additional lightning damage taken by cursed enemies"),
      skillName,
    );
    lightningDmgPct[level] = dmgMatch.value;
  }

  validateAllLevels(lightningDmgPct, skillName);

  return { lightningDmgPct };
};

export const iceLancesParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const addedDmgEffCol = findColumn(
    progressionTable,
    "effectiveness of added damage",
    skillName,
  );
  const damageCol = progressionTable.find(
    (col) => col.header.toLowerCase() === "damage",
  );
  if (damageCol === undefined) {
    throw new Error(`${skillName}: no "damage" column found`);
  }
  const descriptCol = findColumn(progressionTable, "descript", skillName);

  const addedDmgEffPct: Record<number, number> = {};
  const spellDmgMin: Record<number, number> = {};
  const spellDmgMax: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(addedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      addedDmgEffPct[level] = parseNumericValue(text);
    }
  }

  for (const [levelStr, text] of Object.entries(damageCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      const match = findMatch(
        text,
        ts("deals {min:int}-{max:int} spell cold damage"),
        skillName,
      );
      spellDmgMin[level] = match.min;
      spellDmgMax[level] = match.max;
    }
  }

  const level20AddedDmgEff = addedDmgEffPct[20];
  const level20SpellDmgMin = spellDmgMin[20];
  const level20SpellDmgMax = spellDmgMax[20];
  if (
    level20AddedDmgEff === undefined ||
    level20SpellDmgMin === undefined ||
    level20SpellDmgMax === undefined
  ) {
    throw new Error(`${skillName}: level 20 values missing`);
  }
  for (let level = 21; level <= 40; level++) {
    addedDmgEffPct[level] = level20AddedDmgEff;
    spellDmgMin[level] = level20SpellDmgMin;
    spellDmgMax[level] = level20SpellDmgMax;
  }

  const descript = descriptCol.rows[1];
  if (descript === undefined) {
    throw new Error(`${skillName}: no descript found for level 1`);
  }

  const jump = findMatch(
    descript,
    ts("{value:+int} jumps for this skill"),
    skillName,
  ).value;

  const shotgunEffFalloffPct = findMatch(
    descript,
    ts("shotgun effect falloff coefficient is {value:int%}"),
    skillName,
  ).value;

  validateAllLevels(addedDmgEffPct, skillName);
  validateAllLevels(spellDmgMin, skillName);
  validateAllLevels(spellDmgMax, skillName);

  return {
    addedDmgEffPct,
    spellDmgMin,
    spellDmgMax,
    castTime: createConstantLevels(0.65),
    jump: createConstantLevels(jump),
    shotgunEffFalloffPct: createConstantLevels(shotgunEffFalloffPct),
  };
};

export const berserkingBladeParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  // This skill has duplicate column headers:
  // [0] "Effectiveness of added damage" (Sweep)
  // [1] "damage" (Sweep)
  // [2] "Effectiveness of added damage" (Steep)
  // [3] "damage" (Steep)
  // [4] "Descript"
  // Access by index since findColumn would return the first match
  const sweepAddedDmgEffCol = progressionTable[0];
  const steepAddedDmgEffCol = progressionTable[2];
  const descriptCol = progressionTable[4];

  if (
    sweepAddedDmgEffCol === undefined ||
    steepAddedDmgEffCol === undefined ||
    descriptCol === undefined
  ) {
    throw new Error(
      `${skillName}: missing expected columns in progression table`,
    );
  }

  const sweepWeaponAtkDmgPct: Record<number, number> = {};
  const sweepAddedDmgEffPct: Record<number, number> = {};
  const steepWeaponAtkDmgPct: Record<number, number> = {};
  const steepAddedDmgEffPct: Record<number, number> = {};

  // Parse levels 1-20 from the columns
  for (const [levelStr, text] of Object.entries(sweepAddedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      const value = parseNumericValue(text);
      sweepWeaponAtkDmgPct[level] = value;
      sweepAddedDmgEffPct[level] = value;
    }
  }

  for (const [levelStr, text] of Object.entries(steepAddedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20 && text !== "") {
      const value = parseNumericValue(text);
      steepWeaponAtkDmgPct[level] = value;
      steepAddedDmgEffPct[level] = value;
    }
  }

  // Fill levels 21-40 with level 20 values
  const level20SweepValue = sweepWeaponAtkDmgPct[20];
  const level20SteepValue = steepWeaponAtkDmgPct[20];
  if (level20SweepValue === undefined || level20SteepValue === undefined) {
    throw new Error(`${skillName}: level 20 values missing`);
  }
  for (let level = 21; level <= 40; level++) {
    sweepWeaponAtkDmgPct[level] = level20SweepValue;
    sweepAddedDmgEffPct[level] = level20SweepValue;
    steepWeaponAtkDmgPct[level] = level20SteepValue;
    steepAddedDmgEffPct[level] = level20SteepValue;
  }

  // Extract constant values from descript
  const descript = descriptCol.rows[1];
  if (descript === undefined) {
    throw new Error(`${skillName}: no descript found for level 1`);
  }

  const skillAreaBuffPct = findMatch(
    descript,
    ts("this skill {value:dec}% skill area for each stack of buff"),
    skillName,
  ).value;

  const maxBerserkingBladeStacks = findMatch(
    descript,
    ts("Stacks up to {value:int} time\\(s\\)"),
    skillName,
  ).value;

  const steepStrikeChancePct = findMatch(
    descript,
    ts("this skill {value:+int}% steep strike chance"),
    skillName,
  ).value;

  validateAllLevels(sweepWeaponAtkDmgPct, skillName);
  validateAllLevels(sweepAddedDmgEffPct, skillName);
  validateAllLevels(steepWeaponAtkDmgPct, skillName);
  validateAllLevels(steepAddedDmgEffPct, skillName);

  return {
    sweepWeaponAtkDmgPct,
    sweepAddedDmgEffPct,
    steepWeaponAtkDmgPct,
    steepAddedDmgEffPct,
    skillAreaBuffPct: createConstantLevels(skillAreaBuffPct),
    maxBerserkingBladeStacks: createConstantLevels(maxBerserkingBladeStacks),
    steepStrikeChancePct: createConstantLevels(steepStrikeChancePct),
  };
};
