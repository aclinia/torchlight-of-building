import { parseNumericValue, validateAllLevels } from "./progression_table";
import type { SupportLevelParser } from "./types";
import { createConstantLevels } from "./utils";

export const iceBondParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  // levelBuffMods: DmgPct cold additional damage vs frostbitten from Descript column (values[2])
  const buffDmgPctLevels: Record<number, number> = {};

  for (const [levelStr, values] of Object.entries(progressionTable.values)) {
    const level = Number(levelStr);
    const descript = values[2];

    if (descript !== undefined && descript !== "") {
      // Match "23.5% additional Cold Damage" or "+24% additional Cold Damage"
      const match = descript.match(
        /[+]?([\d.]+)%\s+additional\s+Cold\s+Damage/i,
      );
      if (match !== null) {
        buffDmgPctLevels[level] = parseNumericValue(match[1], {
          asPercentage: true,
        });
      }
    }
  }

  validateAllLevels(buffDmgPctLevels, skillName);

  // Return array matching template order:
  // levelBuffMods: [DmgPct cold vs frostbitten]
  return [buffDmgPctLevels];
};

export const frostSpikeParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  // levelOffense: WeaponAtkDmgPct from "damage" column (values[1])
  // levelOffense: AddedDmgEffPct from "Effectiveness of added damage" column (values[0])
  const weaponAtkDmgLevels: Record<number, number> = {};
  const addedDmgEffLevels: Record<number, number> = {};

  // levelMods from Descript column (values[2])
  let convertDmgPct: number | undefined;
  let maxProjectile: number | undefined;
  let projectilePerRating: number | undefined;
  let baseProjectile: number | undefined;
  let dmgPctPerProjectile: number | undefined;

  // First pass: extract values from dedicated columns (levels 1-20 typically have data)
  for (const [levelStr, values] of Object.entries(progressionTable.values)) {
    const level = Number(levelStr);

    // values[0] = "Effectiveness of added damage" (e.g., "149%")
    // values[1] = "damage" (e.g., "Deals 149.0% weapon Attack Damage")
    const addedDmgEffValue = values[0];
    const damageValue = values[1];

    // Try dedicated columns
    if (addedDmgEffValue !== undefined && addedDmgEffValue !== "") {
      addedDmgEffLevels[level] = parseNumericValue(addedDmgEffValue, {
        asPercentage: true,
      });
    }

    if (damageValue !== undefined && damageValue !== "") {
      const dmgMatch = damageValue.match(/([\d.]+)%/);
      if (dmgMatch !== null) {
        weaponAtkDmgLevels[level] = parseNumericValue(dmgMatch[1], {
          asPercentage: true,
        });
      }
    }
  }

  // Second pass: fill in missing levels 21-40 with level 20 values
  const level20WeaponDmg = weaponAtkDmgLevels[20];
  const level20AddedDmgEff = addedDmgEffLevels[20];

  if (level20WeaponDmg === undefined || level20AddedDmgEff === undefined) {
    throw new Error(
      `${skillName}: level 20 values missing, cannot fallback for levels 21-40`,
    );
  }

  for (let level = 21; level <= 40; level++) {
    if (weaponAtkDmgLevels[level] === undefined) {
      weaponAtkDmgLevels[level] = level20WeaponDmg;
    }
    if (addedDmgEffLevels[level] === undefined) {
      addedDmgEffLevels[level] = level20AddedDmgEff;
    }
  }

  // Extract constant mods from level 1 Descript
  const level1Values = progressionTable.values[1];
  const descript = level1Values?.[2];

  if (descript !== undefined) {
    // ConvertDmgPct: "Converts 100% of the skill's Physical Damage to Cold"
    const convertMatch = descript.match(
      /Converts\s+(\d+)%\s+of the skill's Physical Damage to Cold/i,
    );
    if (convertMatch !== null) {
      convertDmgPct = parseNumericValue(convertMatch[1], {
        asPercentage: true,
      });
    }

    // MaxProjectile: "max amount of Projectiles that can be fired by this skill is 5"
    const maxProjMatch = descript.match(
      /max amount of Projectiles.*is\s+(\d+)/i,
    );
    if (maxProjMatch !== null) {
      maxProjectile = Number.parseInt(maxProjMatch[1], 10);
    }

    // Projectile per frostbite_rating: "+1 Projectile Quantity for every 35 Frostbite Rating"
    // The value stored is 1 (gains +1 projectile), the 35 is encoded in the template's per.amt
    const projPerRatingMatch = descript.match(
      /\+(\d+)\s+Projectile Quantity for every\s+\d+\s+.*Frostbite Rating/i,
    );
    if (projPerRatingMatch !== null) {
      projectilePerRating = Number.parseInt(projPerRatingMatch[1], 10);
    }

    // Base Projectile: "fires 2 Projectiles in its base state"
    const baseProjMatch = descript.match(
      /fires\s+(\d+)\s+Projectiles? in its base state/i,
    );
    if (baseProjMatch !== null) {
      baseProjectile = Number.parseInt(baseProjMatch[1], 10);
    }

    // DmgPct per projectile: "+8% additional Damage for every +1 Projectile"
    const dmgPctMatch = descript.match(
      /\+(\d+)%\s+additional Damage for every\s+\+1\s+Projectile/i,
    );
    if (dmgPctMatch !== null) {
      dmgPctPerProjectile = parseNumericValue(dmgPctMatch[1], {
        asPercentage: true,
      });
    }
  }

  // Validate we found all required values
  if (convertDmgPct === undefined) {
    throw new Error(`${skillName}: could not find ConvertDmgPct value`);
  }
  if (maxProjectile === undefined) {
    throw new Error(`${skillName}: could not find MaxProjectile value`);
  }
  if (projectilePerRating === undefined) {
    throw new Error(`${skillName}: could not find Projectile per rating value`);
  }
  if (baseProjectile === undefined) {
    throw new Error(`${skillName}: could not find base Projectile value`);
  }
  if (dmgPctPerProjectile === undefined) {
    throw new Error(`${skillName}: could not find DmgPct per projectile value`);
  }

  validateAllLevels(weaponAtkDmgLevels, skillName);
  validateAllLevels(addedDmgEffLevels, skillName);

  // Return arrays in order matching template:
  // levelOffense: [WeaponAtkDmgPct, AddedDmgEffPct]
  // levelMods: [ConvertDmgPct, MaxProjectile, Projectile(per), Projectile, DmgPct]
  return [
    weaponAtkDmgLevels,
    addedDmgEffLevels,
    createConstantLevels(convertDmgPct),
    createConstantLevels(maxProjectile),
    createConstantLevels(projectilePerRating),
    createConstantLevels(baseProjectile),
    createConstantLevels(dmgPctPerProjectile),
  ];
};
