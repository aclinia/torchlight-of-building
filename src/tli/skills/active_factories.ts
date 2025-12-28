import type { ActiveSkillName } from "@/src/data/skill/types";
import type { ActiveSkillModFactory } from "./types";
import { v } from "./types";

/**
 * Factory functions for active skill mods.
 * Each factory receives (level, values) where:
 * - level: 1-40
 * - values: named value arrays matching parser output keys
 */
export const activeSkillModFactories: Partial<
  Record<ActiveSkillName, ActiveSkillModFactory>
> = {
  // Test skill for unit tests - has constant offense values
  "[Test] Simple Attack": (l, vals) => ({
    offense: [
      { type: "WeaponAtkDmgPct", value: v(vals.weaponAtkDmgPct, l) },
      { type: "AddedDmgEffPct", value: v(vals.addedDmgEffPct, l) },
    ],
  }),
  "Frost Spike": (l, vals) => ({
    offense: [
      { type: "WeaponAtkDmgPct", value: v(vals.weaponAtkDmgPct, l) },
      { type: "AddedDmgEffPct", value: v(vals.addedDmgEffPct, l) },
    ],
    mods: [
      {
        type: "ConvertDmgPct",
        value: v(vals.convertPhysicalToColdPct, l),
        from: "physical",
        to: "cold",
      },
      {
        type: "MaxProjectile",
        value: v(vals.maxProjectile, l),
        override: true,
      },
      {
        type: "Projectile",
        value: v(vals.projectilePerFrostbiteRating, l),
        per: { stackable: "frostbite_rating", amt: 35 },
      },
      { type: "Projectile", value: v(vals.baseProjectile, l) },
      {
        type: "DmgPct",
        value: v(vals.dmgPctPerProjectile, l),
        modType: "global",
        addn: true,
        per: { stackable: "projectile" },
      },
    ],
  }),
  "Ice Bond": (l, vals) => ({
    buffMods: [
      {
        type: "DmgPct",
        value: v(vals.coldDmgPctVsFrostbitten, l),
        addn: true,
        modType: "cold",
        cond: "enemy_frostbitten",
      },
    ],
  }),
  "Bull's Rage": (l, vals) => ({
    buffMods: [
      {
        type: "DmgPct",
        value: v(vals.meleeDmgPct, l),
        addn: true,
        modType: "melee",
      },
    ],
  }),
  "Charging Warcry": (l, vals) => ({
    buffMods: [
      {
        type: "DmgPct",
        modType: "shadow_strike_skill",
        addn: true,
        value: v(vals.shadowStrikeSkillDmgPerEnemy, l),
        per: { stackable: "num_enemies_affected_by_warcry" },
      },
      {
        // TODO: THIS SHOULD ONLY AFFECT SHADOW STRIKE SKILLS
        type: "AspdPct",
        addn: true,
        value: v(vals.shadowStrikeSkillAspd, l),
      },
    ],
  }),
};
