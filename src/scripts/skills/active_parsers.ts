import {
  findColumn,
  parseNumericValue,
  validateAllLevels,
} from "./progression_table";
import { template } from "./template-compiler";
import type { SupportLevelParser } from "./types";
import { createConstantLevels } from "./utils";

export const iceBondParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const coldDmgPctVsFrostbitten: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);
    // Match "23.5% additional Cold Damage" or "+24% additional Cold Damage"
    const match = template("{value:dec%} additional cold damage").match(
      text,
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
    // Match "17.5% additional Melee Skill Damage" or "+27% additional Melee Skill Damage"
    const match = template("{value:dec%} additional melee skill damage").match(
      text,
      skillName,
    );
    meleeDmgPct[level] = match.value;
  }

  validateAllLevels(meleeDmgPct, skillName);

  return { meleeDmgPct };
};

export const frostSpikeParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  // Get columns
  const addedDmgEffCol = findColumn(
    progressionTable,
    "effectiveness of added damage",
    skillName,
  );
  const damageCol = findColumn(progressionTable, "damage", skillName);
  const descriptCol = findColumn(progressionTable, "descript", skillName);

  const weaponAtkDmgPct: Record<number, number> = {};
  const addedDmgEffPct: Record<number, number> = {};

  // Extract values from dedicated columns (levels 1-20 typically have data)
  for (const [levelStr, text] of Object.entries(addedDmgEffCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20) {
      addedDmgEffPct[level] = parseNumericValue(text);
    }
  }

  for (const [levelStr, text] of Object.entries(damageCol.rows)) {
    const level = Number(levelStr);
    if (level <= 20) {
      const dmgMatch = template("{value:dec%}").match(text, skillName);
      weaponAtkDmgPct[level] = dmgMatch.value;
    }
  }

  // Fill in missing levels 21-40 with level 20 values
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

  // Extract constant mods from level 1 Descript
  const descript = descriptCol.rows[1];
  if (descript === undefined) {
    throw new Error(`${skillName}: no descript found for level 1`);
  }

  // ConvertDmgPct: "Converts 100% of the skill's Physical Damage to Cold"
  const convertPhysicalToColdPct = template(
    "converts {value:int%} of the skill's physical damage to cold",
  ).match(descript, skillName).value;

  // MaxProjectile: "max amount of Projectiles that can be fired by this skill is 5"
  const maxProjectile = template(
    "max amount of projectiles that can be fired by this skill is {value:int}",
  ).match(descript, skillName).value;

  // Projectile per frostbite_rating: "+1 Projectile Quantity for every 35 Frostbite Rating"
  const projectilePerFrostbiteRating = template(
    "{value:int} projectile quantity for every",
  ).match(descript, skillName).value;

  // Base Projectile: "fires 2 Projectiles in its base state"
  const baseProjectile = template("fires {value:int} projectile").match(
    descript,
    skillName,
  ).value;

  // DmgPct per projectile: "+8% additional Damage for every +1 Projectile"
  const dmgPctPerProjectile = template(
    "{value:int%} additional damage for every +1 projectile",
  ).match(descript, skillName).value;

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
