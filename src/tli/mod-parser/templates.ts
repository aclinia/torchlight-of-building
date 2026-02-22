import type { InfiltrationType, PerStackable, SkillCostType } from "../mod";
import { StatWordMapping } from "./enums";
import { spec, t } from "./template";

export const allParsers = [
  t(
    "{dmgValue:+dec%} additional damage; {minionValue:+dec%} additional minion damage",
  ).outputMany([
    spec((c) => ({
      type: "DmgPct",
      value: c.dmgValue,
      dmgModType: "global",
      addn: true,
    })),
    spec((c) => ({ type: "MinionDmgPct", value: c.minionValue, addn: true })),
  ]),
  t(
    "{aspd:+dec%} gear attack speed. {dmg:+dec%} additional attack damage",
  ).outputMany([
    spec((c) => ({ type: "GearAspdPct", value: c.aspd })),
    spec((c) => ({
      type: "DmgPct",
      value: c.dmg,
      addn: true,
      dmgModType: "attack",
    })),
  ]),
  t(
    "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to attacks and spells for every {amt:int} mana consumed recently. stacks up to {limit:int} time(s)",
  ).outputMany([
    spec((c) => {
      const per: PerStackable = {
        stackable: "mana_consumed_recently",
        amt: c.amt,
        limit: c.limit,
      };
      return {
        type: "FlatDmgToAtks",
        value: { min: c.min, max: c.max },
        dmgType: c.dmgType,
        per,
      };
    }),
    spec((c) => {
      const per: PerStackable = {
        stackable: "mana_consumed_recently",
        amt: c.amt,
        limit: c.limit,
      };
      return {
        type: "FlatDmgToSpells",
        value: { min: c.min, max: c.max },
        dmgType: c.dmgType,
        per,
      };
    }),
  ]),
  t(
    "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to attacks and spells",
  ).outputMany([
    spec((c) => ({
      type: "FlatDmgToAtks",
      value: { min: c.min, max: c.max },
      dmgType: c.dmgType,
    })),
    spec((c) => ({
      type: "FlatDmgToSpells",
      value: { min: c.min, max: c.max },
      dmgType: c.dmgType,
    })),
  ]),
  t(
    "{value:+dec%} critical strike rating and critical strike damage for every {amt:int} mana consumed recently",
  ).outputMany([
    spec((c) => {
      const per: PerStackable = {
        stackable: "mana_consumed_recently",
        amt: c.amt,
      };
      return { type: "CritRatingPct", value: c.value, modType: "global", per };
    }),
    spec((c) => {
      const per: PerStackable = {
        stackable: "mana_consumed_recently",
        amt: c.amt,
      };
      return {
        type: "CritDmgPct",
        value: c.value,
        modType: "global",
        addn: false,
        per,
      };
    }),
  ]),
  t(
    "{value:+dec%} critical strike rating and critical strike damage",
  ).outputMany([
    spec((c) => ({ type: "CritRatingPct", value: c.value, modType: "global" })),
    spec((c) => ({
      type: "CritDmgPct",
      value: c.value,
      modType: "global",
      addn: false,
    })),
  ]),
  t(
    "{value:+dec%} {modType:DmgModType} damage for every {amt:int} mana consumed recently, up to {limit:dec%}",
  ).output((c) => {
    const per: PerStackable = {
      stackable: "mana_consumed_recently",
      amt: c.amt,
      valueLimit: c.limit,
    };
    return {
      type: "DmgPct",
      value: c.value,
      dmgModType: c.modType,
      addn: false,
      per,
    };
  }),
  t(
    "for every {amt:+dec%} attack or spell block chance, {value:+dec%} additional damage, up to {limit:+dec%}",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    per: { stackable: "total_block_pct", amt: c.amt, valueLimit: c.limit },
  })),
  t(
    "{value:+dec%} additional damage per {amt:+dec%} movement speed, up to {limit:+dec%}",
  ).output((c) => {
    const per: PerStackable = {
      stackable: "movement_speed_bonus_pct",
      amt: c.amt,
      valueLimit: c.limit,
    };
    return {
      type: "DmgPct",
      value: c.value,
      dmgModType: "global",
      addn: true,
      per,
    };
  }),
  t(
    "for every stack of max spell burst, {value:+dec%} additional spell damage, up to {limit:+dec%} additional spell damage",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "spell",
    addn: true,
    per: { stackable: "max_spell_burst", valueLimit: c.limit },
  })),
  t(
    "{value:+dec%} movement speed per stack of max spell burst, up to {limit:+dec%}",
  ).output((c) => ({
    type: "MovementSpeedPct",
    value: c.value,
    addn: false,
    per: { stackable: "max_spell_burst", valueLimit: c.limit },
  })),
  t(
    "for every {amt:+dec%} spell burst charge speed, {value:+dec%} additional hit damage for skills cast by spell burst, up to {limit:+dec%}",
  ).output((c) => ({
    type: "SpellBurstAdditionalDmgPct",
    value: c.value,
    addn: true,
    per: {
      stackable: "spell_burst_charge_speed_bonus_pct",
      amt: c.amt,
      valueLimit: c.limit,
    },
  })),
  t(
    "{value:+dec%} additional damage for the next skill when mana reaches the max",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    cond: "has_full_mana",
  })),
  t(
    "{value:+dec%} additional damage against enemies with elemental ailments",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    cond: "enemy_has_ailment",
  })),
  t("{value:+dec%} [additional] damage against frozen enemies").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: c.additional !== undefined,
    cond: "enemy_frozen",
  })),
  t(
    "{dmgValue:+dec%} additional damage dealt to cursed enemies. {takenValue:+int%} additional damage taken from cursed enemies",
  ).outputMany([
    spec((c) => ({
      type: "DmgPct",
      value: c.dmgValue,
      dmgModType: "global",
      addn: true,
      cond: "enemy_is_cursed",
    })),
    spec((c) => ({
      type: "DmgTakenPct",
      value: c.takenValue,
      cond: "enemy_is_cursed",
    })),
  ]),
  t("{value:+dec%} [additional] damage against cursed enemies").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: c.additional !== undefined,
    cond: "enemy_is_cursed",
  })),
  t("{value:+dec%} additional erosion area damage against elites").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "erosion_area",
      addn: true,
      cond: "target_enemy_is_elite",
    }),
  ),
  t(
    "{value:+dec%} [additional] damage when having both sealed mana and life",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: c.additional !== undefined,
    resolvedCond: "have_both_sealed_mana_and_life",
  })),
  t("{value:+dec%} damage {(when|while)} focus blessing is active").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "global",
      addn: false,
      cond: "has_focus_blessing",
    }),
  ),
  t(
    "{value:+dec%} {modType:DmgModType} damage {(when|while)} tenacity blessing is active",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: c.modType,
    addn: false,
    cond: "has_tenacity_blessing",
  })),
  t("{value:+dec%} spell damage when having focus blessing").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "spell",
    addn: false,
    cond: "has_focus_blessing",
  })),
  t("{value:+dec%} additional spell damage at max focus blessings").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "spell",
      addn: true,
      resolvedCond: "at_max_focus_blessing",
    }),
  ),
  t("{value:+dec%} [additional] damage while having fervor").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: c.additional !== undefined,
    cond: "has_fervor",
  })),
  t("{value:+dec%} damage if you have blocked recently").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: false,
    cond: "has_blocked_recently",
  })),
  t("{value:+dec%} attack damage when dual wielding").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "attack",
    addn: false,
    cond: "is_dual_wielding",
  })),
  t(
    "{value:+dec%} additional damage taken by enemies frozen by you recently",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    isEnemyDebuff: true,
    cond: "target_enemy_frozen_recently",
  })),
  t("{value:+dec%} additional damage taken by nearby enemies").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    isEnemyDebuff: true,
    cond: "target_enemy_is_nearby",
  })),
  t(
    "deals {value:+dec%} additional damage to an enemy for every {amt:int} points of frostbite rating the enemy has",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    per: { stackable: "frostbite_rating", amt: c.amt },
  })),
  t("{value:+dec%} additional damage per {amt:int} fervor rating").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "global",
      addn: true,
      per: { stackable: "fervor", amt: c.amt },
    }),
  ),
  t("{value:+dec%} damage per {amt:int} of the highest stat").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: false,
    per: { stackable: "highest_stat", amt: c.amt },
  })),
  t("{value:+dec%} damage per {amt:int} stats").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: false,
    per: { stackable: "stat", amt: c.amt },
  })),
  t(
    "{value:+dec%} [additional] damage for every {amt:+int} additional max channeled stack(s)",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: c.additional !== undefined,
    per: { stackable: "additional_max_channel_stack", amt: c.amt },
  })),
  t(
    "deals up to {value:+dec%} additional attack damage to enemies in proximity, and this {(effect|damage)} reduces as the distance from the enemy grows",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "attack",
    addn: true,
    cond: "target_enemy_is_in_proximity",
  })),
  t(
    "{value:+dec%} additional attack damage and ailment damage dealt by attacks when there are elites within 10m nearby",
  ).outputMany([
    spec((c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "attack",
      addn: true,
      cond: "has_elites_nearby",
    })),
    spec((c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "ailment",
      addn: true,
      cond: "has_elites_nearby",
    })),
  ]),
  t("{value:+dec%} additional attack damage dealt to nearby enemies").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "attack",
      addn: true,
      cond: "target_enemy_is_nearby",
    }),
  ),
  t(
    "{value:+dec%} additional attack damage when holding a one-handed weapon",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "attack",
    addn: true,
    cond: "has_one_handed_weapon",
  })),
  t("{value:+dec%} attack damage when holding a one-handed weapon").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "attack",
      addn: false,
      cond: "has_one_handed_weapon",
    }),
  ),
  t("{value:+dec%} damage dealt when holding a shield").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: false,
    cond: "holding_shield",
  })),
  t(
    "{value:+dec%} additional attack damage for each unique type of weapon equipped while dual wielding",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "attack",
    addn: true,
    per: { stackable: "num_unique_weapon_types_equipped" },
    cond: "is_dual_wielding",
  })),
  t(
    "blur gains an additional effect: {value:+dec%} additional damage over time",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "damage_over_time",
    addn: true,
    cond: "has_blur",
  })),
  t("{value:+dec%} [additional] damage over time").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "damage_over_time",
    addn: c.additional !== undefined,
  })),
  t(
    "{value:+dec%} additional {modType:DmgModType} damage against numbed enemies",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: c.modType,
    addn: true,
    cond: "enemy_numbed",
  })),
  t("{value:dec%} additional damage applied to life").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
  })),
  t(
    "at max channeled stacks, {value:+dec%} additional damage for channeled skills for {dur:int} s",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "channeled",
    addn: true,
    cond: "at_max_channeled_stacks",
  })),
  t("{value:+dec%} [additional] damage for channeled skills").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "channeled",
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} additional damage for {dur:int} s after blur ends").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "global",
      addn: true,
      cond: "blur_ended_recently",
    }),
  ),
  t(
    "{value:+dec%} additional damage for {dur:int} s after using mobility skills",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    cond: "has_used_mobility_skill_recently",
  })),
  t(
    "{value:+dec%} additional damage for {dur:int}s after using mobility skills",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    cond: "has_used_mobility_skill_recently",
  })),
  t(
    "{value:+dec%} additional damage if you have recently moved more than {dist:int} m",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: true,
    cond: "has_moved_recently",
  })),
  t("{value:+dec%} [additional] elemental damage dealt by spell skills").output(
    (c) => ({
      type: "ElementalSpellDmgPct",
      value: c.value,
      addn: c.additional !== undefined,
    }),
  ),
  t("{value:+dec%} [additional] [{modType:DmgModType}] damage").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: c.modType ?? "global",
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} critical strike rating against frostbitten enemies").output(
    (c) => ({
      type: "CritRatingPct",
      value: c.value,
      modType: "global",
      cond: "enemy_frostbitten",
    }),
  ),
  t("{value:+int} critical strike rating against frostbitten enemies").output(
    (c) => ({
      type: "FlatCritRating",
      value: c.value,
      modType: "global",
      cond: "enemy_frostbitten",
    }),
  ),
  t("{value:+dec%} critical strike damage against frostbitten enemies").output(
    (c) => ({
      type: "CritDmgPct",
      value: c.value,
      addn: false,
      modType: "global",
      cond: "enemy_frostbitten",
    }),
  ),
  t(
    "{value:+dec%} [additional] critical strike damage against paralyzed enemies",
  ).output((c) => ({
    type: "CritDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
    modType: "global",
    cond: "enemy_paralyzed",
  })),
  t("{value:dec%} critical strike damage per fervor rating").output((c) => ({
    type: "CritDmgPct",
    value: c.value,
    addn: false,
    modType: "global",
    per: { stackable: "fervor" },
  })),
  t("{value:+dec%} sentry skill critical strike rating").output((c) => ({
    type: "CritRatingPct",
    value: c.value,
    modType: "sentry_skill",
  })),
  t("{value:+dec%} ranged attack critical strike rating").output((c) => ({
    type: "CritRatingPct",
    value: c.value,
    modType: "ranged_attack",
  })),
  t(
    "{value:+dec%} [{modType:CritRatingModType}] critical strike rating",
  ).output((c) => ({
    type: "CritRatingPct",
    value: c.value,
    modType: c.modType ?? "global",
  })),
  t("{value:+int} attack and spell critical strike rating").outputMany([
    spec((c) => ({
      type: "FlatCritRating",
      value: c.value,
      modType: "attack",
    })),
    spec((c) => ({ type: "FlatCritRating", value: c.value, modType: "spell" })),
  ]),
  t("{value:+int} [{modType:CritRatingModType}] critical strike rating").output(
    (c) => ({
      type: "FlatCritRating",
      value: c.value,
      modType: c.modType ?? "global",
    }),
  ),
  t(
    "for each spell skill used recently, {value:+dec%} critical strike damage, stacking up to {limit:int} time(s)",
  ).output((c) => ({
    type: "CritDmgPct",
    value: c.value,
    addn: false,
    modType: "global",
    per: { stackable: "num_spell_skills_used_recently", limit: c.limit },
  })),
  t(
    "{value:+dec%} [{modType:CritDmgModType}] critical strike damage per stack of focus blessing owned",
  ).output((c) => ({
    type: "CritDmgPct",
    value: c.value,
    addn: false,
    modType: c.modType ?? "global",
    per: { stackable: "focus_blessing" },
  })),
  t("{value:+dec%} [additional] physical skill critical strike damage").output(
    (c) => ({
      type: "CritDmgPct",
      value: c.value,
      addn: c.additional !== undefined,
      modType: "physical_skill",
    }),
  ),
  t("{value:+dec%} [additional] cold skill critical strike damage").output(
    (c) => ({
      type: "CritDmgPct",
      value: c.value,
      addn: c.additional !== undefined,
      modType: "cold_skill",
    }),
  ),
  t("{value:+dec%} [additional] lightning skill critical strike damage").output(
    (c) => ({
      type: "CritDmgPct",
      value: c.value,
      addn: c.additional !== undefined,
      modType: "lightning_skill",
    }),
  ),
  t("{value:+dec%} [additional] fire skill critical strike damage").output(
    (c) => ({
      type: "CritDmgPct",
      value: c.value,
      addn: c.additional !== undefined,
      modType: "fire_skill",
    }),
  ),
  t("{value:+dec%} [additional] erosion skill critical strike damage").output(
    (c) => ({
      type: "CritDmgPct",
      value: c.value,
      addn: c.additional !== undefined,
      modType: "erosion_skill",
    }),
  ),
  t("{value:+dec%} [additional] damage on critical strike").output((c) => ({
    type: "CritDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
    modType: "global",
  })),
  t("{value:+dec%} [additional] sentry skill critical strike damage").output(
    (c) => ({
      type: "CritDmgPct",
      value: c.value,
      addn: c.additional !== undefined,
      modType: "sentry_skill",
    }),
  ),
  t(
    "{value:+dec%} [additional] [{modType:CritDmgModType}] critical strike damage",
  ).output((c) => ({
    type: "CritDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
    modType: c.modType ?? "global",
  })),
  t("{value:+dec%} [additional] minion attack and cast speed").outputMany([
    spec((c) => ({
      type: "MinionAspdPct",
      value: c.value,
      addn: c.additional !== undefined,
    })),
    spec((c) => ({
      type: "MinionCspdPct",
      value: c.value,
      addn: c.additional !== undefined,
    })),
  ]),
  t("{value:+dec%} [additional] minion attack speed").output((c) => ({
    type: "MinionAspdPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] minion cast speed").output((c) => ({
    type: "MinionCspdPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] minion critical strike rating").output((c) => ({
    type: "MinionCritRatingPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+int} minion critical strike rating").output((c) => ({
    type: "MinionFlatCritRating",
    value: c.value,
  })),
  t("{value:+dec%} [additional] minion critical strike damage").output((c) => ({
    type: "MinionCritDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t(
    "{value:+dec%} [additional] minion {minionDmgModType:MinionDmgModType} damage",
  ).output((c) => ({
    type: "MinionDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
    minionDmgModType: c.minionDmgModType,
  })),
  t("{value:+dec%} [additional] minion damage").output((c) => ({
    type: "MinionDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t(
    "{value:+dec%} [additional] {minionDmgModType:MinionDmgModType} damage for minions",
  ).output((c) => ({
    type: "MinionDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
    minionDmgModType: c.minionDmgModType,
  })),
  t("{value:+dec%} minion skill area").output((c) => ({
    type: "MinionSkillAreaPct",
    value: c.value,
  })),
  t("{value:+dec%} minion max life").output((c) => ({
    type: "MinionMaxLifePct",
    value: c.value,
  })),
  t("{value:+dec%} {penType:ResPenType} penetration for minions").output(
    (c) => ({ type: "MinionResPenPct", value: c.value, penType: c.penType }),
  ),
  t("{value:dec%} {penType:ResPenType} penetration for minions").output(
    (c) => ({ type: "MinionResPenPct", value: c.value, penType: c.penType }),
  ),
  t(
    "{value:+dec%} elemental and erosion resistance penetration for minions",
  ).output((c) => ({
    type: "MinionResPenPct",
    value: c.value,
    penType: "all",
  })),
  t("{value:+dec%} armor dmg mitigation penetration for minions").output(
    (c) => ({ type: "MinionArmorPenPct", value: c.value }),
  ),
  t("minions deal {value:dec%} additional damage to life").output((c) => ({
    type: "MinionDmgPct",
    value: c.value,
    addn: true,
  })),
  t("{value:+dec%} chance for minions to inflict trauma").output(() => ({
    type: "InflictTrauma",
  })),
  t("{value:+dec%} additional max damage for minions").output((c) => ({
    type: "AddnMaxMinionDmgPct",
    value: c.value,
  })),
  t("{value:+dec%} chance for minions to deal double damage").output((c) => ({
    type: "MinionDoubleDmgChancePct",
    value: c.value,
  })),
  t(
    "{minValue:+dec%} additional min physical damage, and {maxValue:+dec%} additional max physical damage",
  ).outputMany([
    spec((c) => ({
      type: "AddnMinDmgPct",
      value: c.minValue,
      addn: true,
      dmgType: "physical",
    })),
    spec((c) => ({
      type: "AddnMaxDmgPct",
      value: c.maxValue,
      addn: true,
      dmgType: "physical",
    })),
  ]),
  t(
    "{value:+dec%} additional max {dmgType:DmgChunkType} damage to an enemy when they have at least {threshold:int} stack(s) of numbed",
  ).output((c) => ({
    type: "AddnMaxDmgPct",
    value: c.value,
    dmgType: "lightning",
    addn: true,
    condThreshold: {
      target: "enemy_numbed_stacks",
      comparator: "gte",
      value: c.threshold,
    },
  })),
  t("{value:+dec%} additional max damage").output((c) => ({
    type: "AddnMaxDmgPct",
    value: c.value,
    addn: true,
  })),
  t("{value:+dec%} additional min damage").output((c) => ({
    type: "AddnMinDmgPct",
    value: c.value,
    addn: true,
  })),
  t(
    "{value:+dec%} [additional] attack and cast speed when at full mana",
  ).outputMany([
    spec((c) => ({
      type: "AspdPct",
      value: c.value,
      addn: c.additional !== undefined,
      cond: "has_full_mana",
    })),
    spec((c) => ({
      type: "CspdPct",
      value: c.value,
      addn: c.additional !== undefined,
      cond: "has_full_mana",
    })),
  ]),
  t(
    "{value:+dec%} attack speed, cast speed, and movement speed when having hasten",
  ).outputMany([
    spec((c) => ({
      type: "AspdPct",
      value: c.value,
      addn: false,
      cond: "has_hasten",
    })),
    spec((c) => ({
      type: "CspdPct",
      value: c.value,
      addn: false,
      cond: "has_hasten",
    })),
    spec((c) => ({
      type: "MovementSpeedPct",
      value: c.value,
      addn: false,
      cond: "has_hasten",
    })),
  ]),
  t(
    "{value:+dec%} [additional] attack and cast speed when holding a shield",
  ).outputMany([
    spec((c) => ({
      type: "AspdPct",
      value: c.value,
      addn: c.additional !== undefined,
      cond: "holding_shield",
    })),
    spec((c) => ({
      type: "CspdPct",
      value: c.value,
      addn: c.additional !== undefined,
      cond: "holding_shield",
    })),
  ]),
  t("{value:+dec%} [additional] attack and cast speed").outputMany([
    spec((c) => ({
      type: "AspdPct",
      value: c.value,
      addn: c.additional !== undefined,
    })),
    spec((c) => ({
      type: "CspdPct",
      value: c.value,
      addn: c.additional !== undefined,
    })),
  ]),
  t(
    "{value:+dec%} attack speed and movement speed for every {amt:dec%} of attack or spell block",
  ).outputMany([
    spec((c) => ({
      type: "AspdPct",
      value: c.value,
      addn: false,
      per: { stackable: "total_block_pct", amt: c.amt },
    })),
    spec((c) => ({
      type: "MovementSpeedPct",
      value: c.value,
      addn: false,
      per: { stackable: "total_block_pct", amt: c.amt },
    })),
  ]),
  t("{value:dec%} attack speed for every {amt:dec%} of life lost").output(
    (c) => ({
      type: "AspdPct",
      value: c.value,
      addn: false,
      per: { stackable: "pct_life_lost", amt: c.amt },
    }),
  ),
  t(
    "{value:+dec%} additional attack speed for each time you have regained in the last {dur:int}s. stacks up to {limit:int} time(s)",
  ).output((c) => ({
    type: "AspdPct",
    value: c.value,
    addn: true,
    per: { stackable: "num_times_regained_recently", limit: c.limit },
  })),
  t(
    "{value:+dec%} additional attack speed when only {count:int} enemies are nearby",
  ).output((c) => ({
    type: "AspdPct",
    value: c.value,
    addn: true,
    condThreshold: {
      target: "num_enemies_nearby",
      comparator: "eq",
      value: c.count,
    },
  })),
  t(
    "{value:+dec%} additional attack speed if you have dealt a critical strike recently",
  ).output((c) => ({
    type: "AspdPct",
    value: c.value,
    addn: true,
    cond: "has_crit_recently",
  })),
  t("{value:+dec%} additional attack speed while dual wielding").output(
    (c) => ({
      type: "AspdPct",
      value: c.value,
      addn: true,
      cond: "is_dual_wielding",
    }),
  ),
  t(
    "{value:+dec%} additional cast speed if you have dealt a critical strike recently",
  ).output((c) => ({
    type: "CspdPct",
    value: c.value,
    addn: true,
    cond: "has_crit_recently",
  })),
  t("{value:+dec%} cast speed when focus blessing is active").output((c) => ({
    type: "CspdPct",
    value: c.value,
    addn: false,
    cond: "has_focus_blessing",
  })),
  t(
    "{value:+dec%} additional attack speed when performing multistrikes",
  ).output((c) => ({
    type: "AspdWhenMultistrikingPct",
    value: c.value,
    addn: true,
  })),
  t("{value:+dec%} [additional] attack speed").output((c) => ({
    type: "AspdPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t(
    "{value:+dec%} additional cast speed per second when an elite is nearby, up to {limit:+dec%}",
  ).output((c) => ({
    type: "CspdPct",
    value: c.value,
    addn: true,
    per: { stackable: "seconds_with_elite_nearby", valueLimit: c.limit },
    cond: "has_elites_nearby",
  })),
  t("{value:+dec%} [additional] cast speed").output((c) => ({
    type: "CspdPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} gear attack speed").output((c) => ({
    type: "GearAspdPct",
    value: c.value,
  })),
  t("{value:+dec%} fervor effect").output((c) => ({
    type: "FervorEffPct",
    value: c.value,
  })),
  t(
    "fervor gains an additional base effect: {value:+dec%} skill area for every {amt:int} fervor rating",
  ).output((c) => ({
    type: "FervorBaseEffSkillAreaPct",
    value: c.value,
    perFervorAmt: c.amt,
  })),
  t(
    "fervor gains an additional base effect: {value:+dec%} additional attack and ailment damage for every {amt:int} fervor rating",
  ).output((c) => ({
    type: "FervorBaseEffDmgPct",
    value: c.value,
    perFervorAmt: c.amt,
  })),
  t(
    "{area:+dec%} slash-strike skill area and {dmg:+dec%} additional steep strike damage for every {amt:+dec%} steep strike chance",
  ).outputMany([
    spec((c) => ({
      type: "SkillAreaPct",
      value: c.area,
      skillAreaModType: "global",
      per: { stackable: "steep_strike_chance_pct", amt: c.amt },
    })),
    spec((c) => ({
      type: "SteepStrikeDmgPct",
      value: c.dmg,
      addn: true,
      per: { stackable: "steep_strike_chance_pct", amt: c.amt },
    })),
  ]),
  t("{value:+dec%} steep strike chance.").output((c) => ({
    type: "SteepStrikeChancePct",
    value: c.value,
  })),
  t("{value:+dec%} steep strike chance").output((c) => ({
    type: "SteepStrikeChancePct",
    value: c.value,
  })),
  t("{value:+dec%} [additional] steep strike damage").output((c) => ({
    type: "SteepStrikeDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] sweep slash damage").output((c) => ({
    type: "SweepSlashDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} additional damage for main-hand weapons").output((c) => ({
    type: "AddnMainHandDmgPct",
    value: c.value,
  })),
  t
    .multi([
      t("{value:+int} shadow quantity"),
      t("shadow quantity {value:+int}"),
    ])
    .output((c) => ({ type: "ShadowQuant", value: c.value })),
  t("{value:+dec%} [additional] shadow damage").output((c) => ({
    type: "ShadowDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t(
    "adds {value:dec%} of {from:DmgChunkType} damage {(to|as)} {to:DmgChunkType} damage",
  ).output((c) => ({
    type: "AddsDmgAsPct",
    from: c.from,
    to: c.to,
    value: c.value,
  })),
  t(
    "converts {value:dec%} of {from:DmgChunkType} damage to {to:DmgChunkType} damage",
  ).output((c) => ({
    type: "ConvertDmgPct",
    from: c.from,
    to: c.to,
    value: c.value,
  })),
  t(
    "{value:+dec%} elemental resistance penetration when hitting an enemy with elemental damage, stacking up to {limit:int} times",
  ).output((c) => ({
    type: "ResPenPct",
    value: c.value,
    penType: "elemental",
    per: {
      stackable: "has_hit_enemy_with_elemental_dmg_recently",
      amt: 1,
      limit: c.limit,
    },
  })),
  t(
    "{value:dec%} elemental resistance penetration every time you hit an enemy with elemental damage recently. stacks up to {limit:int} times",
  ).output((c) => ({
    type: "ResPenPct",
    value: c.value,
    penType: "elemental",
    per: {
      stackable: "has_hit_enemy_with_elemental_dmg_recently",
      amt: 1,
      limit: c.limit,
    },
  })),
  t("{value:+dec%} elemental and erosion resistance penetration").output(
    (c) => ({ type: "ResPenPct", value: c.value, penType: "all" }),
  ),
  t
    .multi([
      t("{value:+dec%} {penType:ResPenType} resistance penetration"),
      t("{value:+dec%} {penType:ResPenType} penetration"),
    ])
    .output((c) => ({ type: "ResPenPct", value: c.value, penType: c.penType })),
  t("{value:dec%} {penType:ResPenType} penetration").output((c) => ({
    type: "ResPenPct",
    value: c.value,
    penType: c.penType,
  })),
  t("damage penetrates {value:dec%} {penType:ResPenType} resistance").output(
    (c) => ({ type: "ResPenPct", value: c.value, penType: c.penType }),
  ),
  t("{value:+dec%} armor dmg mitigation penetration").output((c) => ({
    type: "ArmorPenPct",
    value: c.value,
  })),
  t("attack skills: a {value:+dec%} chance to deal double damage").output(
    (c) => ({
      type: "DoubleDmgChancePct",
      value: c.value,
      doubleDmgModType: "attack",
    }),
  ),
  t("{value:+dec%} chance for spells to deal double damage").output((c) => ({
    type: "DoubleDmgChancePct",
    value: c.value,
    doubleDmgModType: "spell",
  })),
  t("{value:+dec%} chance to deal double damage").output((c) => ({
    type: "DoubleDmgChancePct",
    value: c.value,
  })),
  t(
    "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to attacks",
  ).output((c) => ({
    type: "FlatDmgToAtks",
    value: { min: c.min, max: c.max },
    dmgType: c.dmgType,
  })),
  t(
    "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to spells",
  ).output((c) => ({
    type: "FlatDmgToSpells",
    value: { min: c.min, max: c.max },
    dmgType: c.dmgType,
  })),
  t(
    "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to minions",
  ).output((c) => ({
    type: "FlatDmgToMinions",
    value: { min: c.min, max: c.max },
    dmgType: c.dmgType,
  })),
  t("{value:+dec} max mana").output((c) => ({
    type: "MaxMana",
    value: c.value,
  })),
  t("{value:+dec} mana per {amt:int} intelligence").output((c) => ({
    type: "MaxMana",
    value: c.value,
    per: { stackable: "int", amt: c.amt },
  })),
  t("{value:+dec%} [additional] max mana").output((c) => ({
    type: "MaxManaPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} attack block chance when holding a shield").output((c) => ({
    type: "AttackBlockChancePct",
    value: c.value,
    cond: "holding_shield",
  })),
  t("{value:+dec%} attack block chance").output((c) => ({
    type: "AttackBlockChancePct",
    value: c.value,
  })),
  t("{value:+dec%} spell block chance").output((c) => ({
    type: "SpellBlockChancePct",
    value: c.value,
  })),
  t("{value:+dec%} attack and spell block chance").outputMany([
    spec((c) => ({ type: "AttackBlockChancePct", value: c.value })),
    spec((c) => ({ type: "SpellBlockChancePct", value: c.value })),
  ]),
  t("block ratio is set to {value:dec%}").output((c) => ({
    type: "BlockRatioPctOverride",
    value: c.value,
  })),
  t("{value:+dec%} block ratio").output((c) => ({
    type: "BlockRatioPct",
    value: c.value,
  })),
  t("{value:+dec%} block ratio when holding a shield").output((c) => ({
    type: "BlockRatioPct",
    value: c.value,
    cond: "holding_shield",
  })),
  t("{value:+dec} max life").output((c) => ({
    type: "MaxLife",
    value: c.value,
  })),
  t("{value:+dec%} [additional] max life").output((c) => ({
    type: "MaxLifePct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec} max energy shield").output((c) => ({
    type: "MaxEnergyShield",
    value: c.value,
  })),
  t("{value:+dec%} [additional] max energy shield").output((c) => ({
    type: "MaxEnergyShieldPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:dec} max energy shield").output((c) => ({
    type: "MaxEnergyShield",
    value: c.value,
  })),
  t("{value:+dec%} [additional] armor while moving").output((c) => ({
    type: "ArmorPct",
    value: c.value,
    addn: c.additional !== undefined,
    cond: "is_moving",
  })),
  t("{value:+dec%} [additional] evasion while moving").output((c) => ({
    type: "EvasionPct",
    value: c.value,
    addn: c.additional !== undefined,
    cond: "is_moving",
  })),
  t("{value:+dec%} [additional] armor").output((c) => ({
    type: "ArmorPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] evasion").output((c) => ({
    type: "EvasionPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} defense").output((c) => ({
    type: "DefensePct",
    value: c.value,
  })),
  t("{value:+int} gear energy shield").output((c) => ({
    type: "GearEnergyShield",
    value: c.value,
  })),
  t("{value:+dec%} gear energy shield").output((c) => ({
    type: "GearEnergyShieldPct",
    value: c.value,
  })),
  t("{value:+int} gear armor").output((c) => ({
    type: "GearArmor",
    value: c.value,
  })),
  t("{value:+dec%} energy shield charge speed").output((c) => ({
    type: "EnergyShieldChargeSpeedPct",
    value: c.value,
  })),
  t("{value:+int} gear evasion").output((c) => ({
    type: "GearEvasion",
    value: c.value,
  })),
  t("{value:+int} armor and evasion").outputMany([
    spec((c) => ({ type: "Armor", value: c.value })),
    spec((c) => ({ type: "Evasion", value: c.value })),
  ]),
  t("{value:+int} armor").output((c) => ({ type: "Armor", value: c.value })),
  t("{value:+int} evasion").output((c) => ({
    type: "Evasion",
    value: c.value,
  })),
  t("{value:+dec%} max elemental and erosion resistance").outputMany([
    spec((c) => ({
      type: "MaxResistancePct",
      value: c.value,
      resType: "elemental",
    })),
    spec((c) => ({
      type: "MaxResistancePct",
      value: c.value,
      resType: "erosion",
    })),
  ]),
  t("{value:+dec%} elemental and erosion resistance").outputMany([
    spec((c) => ({
      type: "ResistancePct",
      value: c.value,
      resType: "elemental",
    })),
    spec((c) => ({
      type: "ResistancePct",
      value: c.value,
      resType: "erosion",
    })),
  ]),
  t("{value:+dec%} max {resType:ResType} resistance").output((c) => ({
    type: "MaxResistancePct",
    value: c.value,
    resType: c.resType,
  })),
  t(
    "{value:+dec%} {resType:ResType} resistance per stack of repentance",
  ).output((c) => ({
    type: "ResistancePct",
    value: c.value,
    resType: c.resType,
    per: { stackable: "repentance" },
  })),
  t("{value:+dec%} {resType:ResType} resistance per {amt:int} stats").output(
    (c) => ({
      type: "ResistancePct",
      value: c.value,
      resType: c.resType,
      per: { stackable: "stat", amt: c.amt },
    }),
  ),
  t("{value:+dec%} {resType:ResType} resistance").output((c) => ({
    type: "ResistancePct",
    value: c.value,
    resType: c.resType,
  })),
  t("{value:+dec%} chance to avoid elemental ailments").output((c) => ({
    type: "AvoidElementalAilmentsChancePct",
    value: c.value,
  })),
  t("{value:+dec%} chance to avoid elemental ailment").output((c) => ({
    type: "AvoidElementalAilmentsChancePct",
    value: c.value,
  })),
  t("{value:+dec%} chance to avoid spell damage").output((c) => ({
    type: "AvoidSpellDmgChancePct",
    value: c.value,
  })),
  t("{value:+dec%} critical strike damage mitigation").output((c) => ({
    type: "CriticalStrikeDmgMitigationPct",
    value: c.value,
  })),

  t("{value:+dec%} energy shield regain").output((c) => ({
    type: "EnergyShieldRegainPct",
    value: c.value,
  })),
  t("{value:dec%} energy shield regain").output((c) => ({
    type: "EnergyShieldRegainPct",
    value: c.value,
  })),
  t("{value:+dec%} life regain").output((c) => ({
    type: "LifeRegainPct",
    value: c.value,
  })),
  t("{value:dec%} life regain").output((c) => ({
    type: "LifeRegainPct",
    value: c.value,
  })),
  t("{value:+dec} {statModType:StatWord} per {amt:int} level(s)")
    .enum("StatWord", StatWordMapping)
    .output((c) => ({
      type: "Stat",
      value: c.value,
      statModType: c.statModType,
      per: { stackable: "level", amt: c.amt },
    })),
  t("{value:+dec} {statModType:StatWord}")
    .enum("StatWord", StatWordMapping)
    .output((c) => ({
      type: "Stat",
      value: c.value,
      statModType: c.statModType,
    })),
  t("{value:+dec} [to] all stats").output((c) => ({
    type: "Stat",
    value: c.value,
    statModType: "all",
  })),
  t("{value:+dec%} {statModType:StatWord}")
    .enum("StatWord", StatWordMapping)
    .output((c) => ({
      type: "StatPct",
      value: c.value,
      statModType: c.statModType,
    })),
  t("{value:+dec%} all stats").output((c) => ({
    type: "StatPct",
    value: c.value,
    statModType: "all",
  })),
  t(
    "{dmgValue:+dec%} additional cold damage and {penValue:+dec%} cold penetration when you have at least {threshold:int} stack(s) of focus blessing",
  ).outputMany([
    spec((c) => ({
      type: "DmgPct",
      value: c.dmgValue,
      dmgModType: "cold",
      addn: true,
      condThreshold: {
        target: "focus_blessing",
        comparator: "gte",
        value: c.threshold,
      },
    })),
    spec((c) => ({
      type: "ResPenPct",
      value: c.penValue,
      penType: "cold",
      condThreshold: {
        target: "focus_blessing",
        comparator: "gte",
        value: c.threshold,
      },
    })),
  ]),
  t(
    "{dmgValue:+dec%} additional fire damage and {penValue:+dec%} fire penetration when you have at least {threshold:int} stack(s) of tenacity blessing",
  ).outputMany([
    spec((c) => ({
      type: "DmgPct",
      value: c.dmgValue,
      dmgModType: "fire",
      addn: true,
      condThreshold: {
        target: "tenacity_blessing",
        comparator: "gte",
        value: c.threshold,
      },
    })),
    spec((c) => ({
      type: "ResPenPct",
      value: c.penValue,
      penType: "fire",
      condThreshold: {
        target: "tenacity_blessing",
        comparator: "gte",
        value: c.threshold,
      },
    })),
  ]),
  t(
    "{dmgValue:+dec%} additional lightning damage and {penValue:+dec%} lightning penetration when you have at least {threshold:int} stack(s) of agility blessing",
  ).outputMany([
    spec((c) => ({
      type: "DmgPct",
      value: c.dmgValue,
      dmgModType: "lightning",
      addn: true,
      condThreshold: {
        target: "agility_blessing",
        comparator: "gte",
        value: c.threshold,
      },
    })),
    spec((c) => ({
      type: "ResPenPct",
      value: c.penValue,
      penType: "lightning",
      condThreshold: {
        target: "agility_blessing",
        comparator: "gte",
        value: c.threshold,
      },
    })),
  ]),
  t("max focus blessing stacks {value:+int}").output((c) => ({
    type: "MaxFocusBlessing",
    value: c.value,
  })),
  t("max agility blessing stacks {value:+int}").output((c) => ({
    type: "MaxAgilityBlessing",
    value: c.value,
  })),
  t("max tenacity blessing stacks {value:+int}").output((c) => ({
    type: "MaxTenacityBlessing",
    value: c.value,
  })),
  t("{value:+int} to max focus blessing stacks").output((c) => ({
    type: "MaxFocusBlessing",
    value: c.value,
  })),
  t("{value:+int} to max agility blessing stacks").output((c) => ({
    type: "MaxAgilityBlessing",
    value: c.value,
  })),
  t("{value:+int} to max tenacity blessing stacks").output((c) => ({
    type: "MaxTenacityBlessing",
    value: c.value,
  })),
  t("{value:+int} max repentance stacks").output((c) => ({
    type: "MaxRepentance",
    value: c.value,
  })),
  // TODO: Properly implement condition threshold for movement speed (add to ConditionThresholdTarget type
  // and handle in offense.ts). For now, we parse the value but ignore the threshold condition.
  t(
    "{value:+int} max spell burst when movement speed is not higher than {threshold:int%} of base",
  ).output((c) => ({ type: "MaxSpellBurst", value: c.value })),
  t("{value:+int} max spell burst").output((c) => ({
    type: "MaxSpellBurst",
    value: c.value,
  })),
  t("{value:+int} to max spell burst when having squidnova").output((c) => ({
    type: "MaxSpellBurst",
    value: c.value,
    cond: "has_squidnova",
  })),
  t(
    "activating spell burst with at least {stacks:int} stack(s) of max spell burst grants {grant:int} stack of squidnova",
  ).output(() => ({ type: "GeneratesSquidnova" })),
  t("{value:+dec%} squidnova effect").output((c) => ({
    type: "SquidnovaEffPct",
    value: c.value,
  })),
  t("{value:+dec%} additional spell damage when having squidnova").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "spell",
      addn: true,
      cond: "has_squidnova",
    }),
  ),
  t("{value:+dec%} [additional] spell burst charge speed").output((c) => ({
    type: "SpellBurstChargeSpeedPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t(
    "{value:+dec%} additional hit damage for skills cast by spell burst",
  ).output((c) => ({
    type: "SpellBurstAdditionalDmgPct",
    value: c.value,
    addn: true,
  })),
  t("{value:+dec%} chance to multistrike").output((c) => ({
    type: "MultistrikeChancePct",
    value: c.value,
  })),
  t("Multistrikes deal {value:dec%} increasing damage").output((c) => ({
    type: "MultistrikeIncDmgPct",
    value: c.value,
  })),
  t(
    "{value:dec%} of the bonuses and additional bonuses to cast speed is also applied to spell burst charge speed",
  ).output((c) => ({ type: "PlaySafe", value: c.value })),
  t(
    "{value:dec%} of the projectile speed bonus is also applied to the additional bonus for projectile damage",
  ).output((c) => ({
    type: "DmgPct",
    value: 1,
    dmgModType: "projectile",
    addn: true,
    per: { stackable: "proj_speed_pct", amt: 100 / c.value },
  })),
  t(
    "{value:+int} max channeled stacks when equipped in the left ring slot",
  ).output((c) => ({
    type: "MaxChannel",
    value: c.value,
    cond: "equipped_in_left_ring_slot",
  })),
  t("max channeled stacks {value:+int}").output((c) => ({
    type: "MaxChannel",
    value: c.value,
  })),
  t("{value:+int} to max channeled stacks").output((c) => ({
    type: "MaxChannel",
    value: c.value,
  })),
  t("has hasten").output(() => ({ type: "HasHasten" })),
  t(
    "damage becomes lucky and at least {stacks:int} stack(s) of spell burst charge is consumed when spell burst is activated",
  ).output(() => ({ type: "LuckyDmg" })),
  t(
    "gains additional fervor rating equal to {value:dec%} of the current fervor rating on hit. cooldown: {cd:dec} s",
  ).output(() => ({ type: "GainsFervor" })),
  t("have fervor").output(() => ({ type: "HaveFervor" })),
  t("has {value:int} point(s) of fixed fervor rating").output((c) => ({
    type: "FixedFervorPts",
    value: c.value,
  })),
  t(
    "gains a stack of torment when dealing damage to enemies with max affliction",
  ).output(() => ({ type: "GeneratesTorment" })),
  t("gains a stack of fortitude when using a melee skill").output(() => ({
    type: "GeneratesFortitude",
  })),
  t(
    "{value:+dec%} chance to gain a stack of fortitude when using a melee skill",
  ).output(() => ({ type: "GeneratesFortitude" })),
  t("{value:+dec%} chance to gain blur when reaping").output((c) => ({
    type: "GeneratesBlur",
    value: c.value,
  })),
  t("gains {value:int} stack(s) of focus blessing when reaping").output(() => ({
    type: "GeneratesFocusBlessing",
  })),
  t(
    "gains {value:int} stack(s) of focus blessing when activating spell burst",
  ).output(() => ({ type: "GeneratesFocusBlessing" })),
  t(
    "{value:+dec%} chance to gain {stacks:int} stack of focus blessing when casting a summon skill. interval: {interval:int} s",
  ).output(() => ({ type: "GeneratesFocusBlessing" })),
  t(
    "{value:+dec%} chance to gain a stack of focus blessing upon inflicting damage to a frostbitten enemy. interval: {interval:dec}s",
  ).output(() => ({ type: "GeneratesFocusBlessing" })),
  t(
    "{value:+dec%} chance to gain {stacks:int} stack of tenacity blessing when casting a skill. interval: {interval:int} s",
  ).output(() => ({ type: "GeneratesTenacityBlessing" })),
  t(
    "{value:+dec%} additional {modType:DmgModType} damage for every stack of focus blessing",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: c.modType,
    addn: true,
    per: { stackable: "focus_blessing" },
  })),
  t(
    "{value:+dec%} additional {modType:DmgModType} damage per stack of focus blessing owned",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: c.modType,
    addn: true,
    per: { stackable: "focus_blessing" },
  })),
  t("{value:+dec%} damage per stack of any blessing").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: false,
    per: { stackable: "any_blessing" },
  })),
  t("{value:+dec%} blessing duration").outputMany([
    spec((c) => ({ type: "FocusBlessingDurationPct", value: c.value })),
    spec((c) => ({ type: "AgilityBlessingDurationPct", value: c.value })),
    spec((c) => ({ type: "TenacityBlessingDurationPct", value: c.value })),
  ]),
  t("{value:+dec%} focus blessing duration").output((c) => ({
    type: "FocusBlessingDurationPct",
    value: c.value,
  })),
  t("gains {value:int} stack of repentance when gaining any blessing").output(
    (c) => ({ type: "GeneratesRepentance", value: c.value }),
  ),
  t("{value:dec%} chance to gain spell aggression on defeat").output(() => ({
    type: "GeneratesSpellAggression",
  })),
  t("{value:dec%} chance to gain attack aggression on defeat").output(() => ({
    type: "GeneratesAttackAggression",
  })),
  t("gains spell aggression when casting a spell skill").output(() => ({
    type: "GeneratesSpellAggression",
  })),
  t("has spell aggression").output(() => ({ type: "HasSpellAggression" })),
  t("has attack aggression when reaching max feline stimulant stacks").output(
    () => ({
      type: "HasAttackAggression",
      resolvedCond: "at_max_feline_stimulant_stacks",
    }),
  ),
  t("has attack aggression").output(() => ({ type: "HasAttackAggression" })),
  t(
    "{value:+dec%} spell aggression effect for every main spell skill cast recently. stacks up to {limit:int} times",
  ).output((c) => ({
    type: "SpellAggressionEffPct",
    value: c.value,
    per: { stackable: "num_main_spell_skills_cast_recently", limit: c.limit },
  })),
  t("{value:+dec%} spell aggression effect").output((c) => ({
    type: "SpellAggressionEffPct",
    value: c.value,
  })),
  t("{value:+dec%} attack aggression effect").output((c) => ({
    type: "AttackAggressionEffPct",
    value: c.value,
  })),
  t(
    "{value:dec%} chance to gain a barrier for every {dist:int} m you move",
  ).output(() => ({ type: "GeneratesBarrier" })),
  t(
    "{value:+dec%} movement speed if you have used a mobility skill recently",
  ).output((c) => ({
    type: "MovementSpeedPct",
    value: c.value,
    addn: false,
    cond: "has_used_mobility_skill_recently",
  })),
  t(
    "{value:+dec%} movement speed when an elite is nearby, up to {limit:+dec%}",
  ).output((c) => ({
    type: "MovementSpeedPct",
    value: c.value,
    addn: false,
    per: { stackable: "seconds_with_elite_nearby", valueLimit: c.limit },
    cond: "has_elites_nearby",
  })),
  t("{value:+dec%} [additional] movement speed").output((c) => ({
    type: "MovementSpeedPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:dec%} movement speed").output((c) => ({
    type: "MovementSpeedPct",
    value: c.value,
    addn: false,
  })),
  t("{value:+dec%} [additional] projectile speed").output((c) => ({
    type: "ProjSpdPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:dec%} projectile speed").output((c) => ({
    type: "ProjSpdPct",
    value: c.value,
    addn: false,
  })),
  t("{value:+int} [to] all skills' level[s]").output((c) => ({
    type: "SkillLevel",
    value: c.value,
    skillLevelType: "all",
  })),
  t("{value:+int} to attack skill level").output((c) => ({
    type: "SkillLevel",
    value: c.value,
    skillLevelType: "attack",
  })),
  t("{value:+int} spirit magus skill level").output((c) => ({
    type: "SkillLevel",
    value: c.value,
    skillLevelType: "spirit_magus",
  })),
  t("{value:+int} {skillLevelType:SkillLevelType} skill level").output((c) => ({
    type: "SkillLevel",
    value: c.value,
    skillLevelType: c.skillLevelType,
  })),
  t(
    "for every {amt:dec%} life sealed when at full mana, main skill's level \\+1",
  ).output((c) => ({
    type: "SkillLevel",
    value: 1,
    skillLevelType: "main",
    per: { stackable: "sealed_life_pct", amt: c.amt },
    cond: "has_full_mana",
  })),
  t("{value:+int} {skillCostType:SkillCostType} skill cost").output((c) => ({
    type: "SkillCost",
    value: c.value,
    skillCostType: c.skillCostType as SkillCostType,
  })),
  t("{value:+int} skill cost").output((c) => ({
    type: "SkillCost",
    value: c.value,
  })),
  t("{value:+int} to hero trait level").output((c) => ({
    type: "HeroTraitLevel",
    value: c.value,
  })),
  t("{min:int} - {max:int} physical damage").output((c) => ({
    type: "GearBasePhysDmg",
    value: (c.min + c.max) / 2,
  })),
  t("{value:int} critical strike rating").output((c) => ({
    type: "GearBaseCritRating",
    value: c.value,
  })),
  t("{value:dec} attack speed").output((c) => ({
    type: "GearBaseAttackSpeed",
    value: c.value,
  })),
  t(
    "reaps {duration:dec} s of damage over time when dealing damage over time. the effect has a {cooldown:dec} s cooldown against the same target",
  ).output((c) => ({
    type: "Reap",
    duration: c.duration,
    cooldown: c.cooldown,
  })),
  t(
    "reaps {duration:dec} s of damage over time when {(dealing damage over time|inflicting ignite|inflicting trauma|inflicting wilt)}. the effect has a {cooldown:dec} s recovery time against the same target",
  ).output((c) => ({
    type: "Reap",
    duration: c.duration,
    cooldown: c.cooldown,
  })),
  t("{value:+dec%} reaping duration").output((c) => ({
    type: "ReapDurationPct",
    value: c.value,
  })),
  t("{value:+dec%} [additional] reaping cooldown recovery speed").output(
    (c) => ({
      type: "ReapCdrPct",
      value: c.value,
      addn: c.additional !== undefined,
    }),
  ),
  t("{value:+dec%} reaping recovery speed").output((c) => ({
    type: "ReapCdrPct",
    value: c.value,
    addn: false,
  })),
  t("{value:+dec%} cooldown recovery speed").output((c) => ({
    type: "CdrPct",
    value: c.value,
  })),
  t("{value:+dec} affliction inflicted per second").output((c) => ({
    type: "AfflictionInflictedPerSec",
    value: c.value,
  })),
  t("{value:+dec%} [additional] affliction effect").output((c) => ({
    type: "AfflictionEffectPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] curse effect").output((c) => ({
    type: "CurseEffPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] origin of spirit magus effect").output((c) => ({
    type: "SpiritMagusOriginEffPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} curse duration").output((c) => ({
    type: "CurseDurationPct",
    value: c.value,
  })),
  t("{value:+dec%} [additional] curse skill area").output((c) => ({
    type: "SkillAreaPct",
    value: c.value,
    skillAreaModType: "curse",
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] skill area").output((c) => ({
    type: "SkillAreaPct",
    value: c.value,
    skillAreaModType: "global",
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} skill effect duration").output((c) => ({
    type: "SkillEffDurationPct",
    value: c.value,
  })),
  t("{value:+dec%} [additional] sealed mana compensation").output((c) => ({
    type: "SealedManaCompPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:dec%} sealed mana compensation").output((c) => ({
    type: "SealedManaCompPct",
    value: c.value,
    addn: false,
  })),
  t("{value:?dec%} sealed mana compensation for spirit magus skills").output(
    (c) => ({
      type: "SealedManaCompPct",
      value: c.value,
      addn: false,
      skillType: "spirit_magus",
    }),
  ),
  t("{value:+dec%} sealed mana compensation for {skillName:words}").output(
    (c) => ({
      type: "SealedManaCompPct",
      value: c.value,
      addn: false,
      skillName: c.skillName,
    }),
  ),
  t(
    "{value:+dec%} [additional] {skillName:words} sealed mana compensation",
  ).output((c) => ({
    type: "SealedManaCompPct",
    value: c.value,
    addn: c.additional !== undefined,
    skillName: c.skillName,
  })),
  t(
    "additionally settles {value:dec%} of the remaining total damage when reaping, then removes all damage over time acting on the target",
  ).output((c) => ({ type: "ReapPurificationPct", value: c.value })),
  t(
    "when a spell hit inflicts fire damage, {value:+dec%} cold, lightning, and erosion resistance for the target for {dur:dec} s",
  ).outputMany([
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "cold",
      cond: "sages_insight_fire",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "lightning",
      cond: "sages_insight_fire",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "erosion",
      cond: "sages_insight_fire",
    })),
  ]),
  t(
    "when a spell hit inflicts cold damage, {value:+dec%} fire, lightning, and erosion resistance for the target for {dur:dec} s",
  ).outputMany([
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "fire",
      cond: "sages_insight_cold",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "lightning",
      cond: "sages_insight_cold",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "erosion",
      cond: "sages_insight_cold",
    })),
  ]),
  t(
    "when a spell hit inflicts lightning damage, {value:+dec%} fire, cold, and erosion resistance for the target for {dur:dec} s",
  ).outputMany([
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "fire",
      cond: "sages_insight_lightning",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "cold",
      cond: "sages_insight_lightning",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "erosion",
      cond: "sages_insight_lightning",
    })),
  ]),
  t(
    "when a spell hit inflicts erosion damage, {value:+dec%} fire, cold, and lightning resistance for the target for {dur:dec} s",
  ).outputMany([
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "fire",
      cond: "sages_insight_erosion",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "cold",
      cond: "sages_insight_erosion",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "lightning",
      cond: "sages_insight_erosion",
    })),
  ]),
  t("{value:+int} to max frostbite rating").output((c) => ({
    type: "MaxFrostbiteRating",
    value: c.value,
  })),
  t("{value:+dec%} chance to inflict frostbite").output((c) => ({
    type: "InflictFrostbitePct",
    value: c.value,
  })),
  t("{value:+dec%} freeze duration").output((c) => ({
    type: "FreezeDurationPct",
    value: c.value,
  })),
  t("{value:+dec%} ailment duration").output((c) => ({
    type: "AilmentDurationPct",
    value: c.value,
  })),
  t("{value:+dec%} wilt duration").output((c) => ({
    type: "WiltDurationPct",
    value: c.value,
  })),
  t("{value:+dec%} wilt chance").output((c) => ({
    type: "WiltChancePct",
    value: c.value,
  })),
  t("{value:+dec%} trauma duration").output((c) => ({
    type: "TraumaDurationPct",
    value: c.value,
  })),
  t("{value:+dec%} [additional] ignite duration").output((c) => ({
    type: "IgniteDurationPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("inflicts frail on spell hit").output(() => ({ type: "InflictFrail" })),
  t("{value:+dec%} chance to inflict trauma").output(() => ({
    type: "InflictTrauma",
  })),
  t("{value:+dec%} [additional] wilt damage").output((c) => ({
    type: "WiltDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] trauma damage").output((c) => ({
    type: "TraumaDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] ignite damage").output((c) => ({
    type: "IgniteDmgPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("inflicts cold infiltration when dealing damage to frozen enemies").output(
    () => ({ type: "InflictsInfiltration", infiltrationType: "cold" }),
  ),
  t(
    "inflicts {infiltrationType:InfiltrationType} infiltration on critical strike",
  ).output((c) => ({
    type: "InflictsInfiltration",
    infiltrationType: c.infiltrationType as InfiltrationType,
  })),
  t(
    "when minions deal damage, inflicts {infiltrationType:InfiltrationType} infiltration. interval for each enemy: {interval:int} s",
  ).output((c) => ({
    type: "InflictsInfiltration",
    infiltrationType: c.infiltrationType as InfiltrationType,
  })),
  t(
    "when dealing damage, inflicts {infiltrationType:InfiltrationType} infiltration. interval for each enemy: {interval:int} s",
  ).output((c) => ({
    type: "InflictsInfiltration",
    infiltrationType: c.infiltrationType as InfiltrationType,
  })),
  t(
    "inflicts {infiltrationType:InfiltrationType} infiltration when dealing damage. interval for each enemy: {interval:int} s",
  ).output((c) => ({
    type: "InflictsInfiltration",
    infiltrationType: c.infiltrationType as InfiltrationType,
  })),
  t(
    "{value:+dec%} {infiltrationType:InfiltrationType} infiltration effect",
  ).output((c) => ({
    type: "InfiltrationEffPct",
    value: c.value,
    infiltrationType: c.infiltrationType as InfiltrationType,
  })),
  t(
    "spell skills on hit have a {chancePct:dec%} chance to spawn a pulse, dealing true damage equal to {pctOfHitDmg:dec%} of hit damage. interval: {interval:dec}s",
  ).output((c) => ({
    type: "SpellRipple",
    chancePct: c.chancePct,
    pctOfHitDmg: c.pctOfHitDmg,
  })),
  t(
    "{value:+int%} all resistance when the enemy has max affliction",
  ).outputMany([
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "fire",
      cond: "enemy_at_max_affliction",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "cold",
      cond: "enemy_at_max_affliction",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "lightning",
      cond: "enemy_at_max_affliction",
    })),
    spec((c) => ({
      type: "EnemyRes",
      value: c.value,
      resType: "erosion",
      cond: "enemy_at_max_affliction",
    })),
  ]),
  t("{value:+int} jumps").output((c) => ({ type: "Jump", value: c.value })),
  t(
    "upon dealing damage to a cursed target, there is a {value:+dec%} chance to paralyze it",
  ).output((c) => ({ type: "InflictParalysisPct", value: c.value })),
  t("{value:dec%} chance to gain agility blessing on critical strike").output(
    () => ({ type: "GeneratesAgilityBlessing" }),
  ),
  t("gains a stack agility blessing when using mobility skills").output(() => ({
    type: "GeneratesAgilityBlessing",
  })),
  t(
    "{value:+dec%} chance to gain {stacks:int} stack of agility blessing on defeat",
  ).output(() => ({ type: "GeneratesAgilityBlessing" })),
  t(
    "{value:+dec%} chance to gain {stacks:int} stack of focus blessing on defeat",
  ).output(() => ({ type: "GeneratesFocusBlessing" })),
  t(
    "{value:+dec%} chance to gain {stacks:int} stack of tenacity blessing on defeat",
  ).output(() => ({ type: "GeneratesTenacityBlessing" })),
  t(
    "{value:+dec%} chance to gain {stacks:int} stack(s) of tenacity blessing when hitting an enemy",
  ).output(() => ({ type: "GeneratesTenacityBlessing" })),
  t(
    "{value:+dec%} chance to gain blur when inflicting crowd control effects",
  ).output((c) => ({ type: "GeneratesBlur", value: c.value })),
  t("{value:+dec%} numbed effect").output((c) => ({
    type: "NumbedEffPct",
    value: c.value,
  })),
  t(
    "{value:+dec%} additional numbed effect on critical strike with {dmgType:DmgChunkType} damage for {dur:int} s",
  ).output((c) => ({
    type: "NumbedEffPct",
    value: c.value,
    cond: "has_crit_recently",
  })),
  t("inflicts {value:int} additional stack(s) of numbed").output(() => ({
    type: "InflictNumbed",
  })),
  t(
    "inflicts {stacks:int} additional stack(s) of numbed per {value:+dec%} numbed chance",
  ).output(() => ({ type: "InflictNumbed" })),
  t("{value:+dec%} numbed chance").output((c) => ({
    type: "NumbedChancePct",
    value: c.value,
  })),
  t("{chance:+dec%} numbed chance, and {effect:dec%} numbed effect").outputMany(
    [
      spec((c) => ({ type: "NumbedChancePct", value: c.chance })),
      spec((c) => ({ type: "NumbedEffPct", value: c.effect })),
    ],
  ),
  t("{value:+dec%} mark effect").output((c) => ({
    type: "MarkEffPct",
    value: c.value,
  })),
  t("{value:+dec%} chance to mark the enemy on critical strike").output(() => ({
    type: "InflictsMark",
  })),
  t(
    "regenerates {value:dec%} mana per second {(when|while)} focus blessing is active",
  ).output((c) => ({
    type: "ManaRegenPerSecPct",
    value: c.value,
    cond: "has_focus_blessing",
  })),
  t("{value:+dec%} mana regeneration speed").output((c) => ({
    type: "ManaRegenSpeedPct",
    value: c.value,
  })),
  t("{value:+int%} additional damage taken from cursed enemies").output(
    (c) => ({ type: "DmgTakenPct", value: c.value, cond: "enemy_is_cursed" }),
  ),
  t("{value:+dec%} additional skill cost").output((c) => ({
    type: "SkillCostPct",
    value: c.value,
    addn: true,
  })),
  t("you and minions deal lucky damage against numbed enemies").output(() => ({
    type: "LuckyDmg",
    cond: "enemy_numbed",
  })),
  t("lucky critical strike").output(() => ({ type: "LuckyCrit" })),
  // Joined Force (core talent)
  t(
    "off-hand weapons do not participate in attacks while dual wielding",
  ).output(() => ({ type: "JoinedForceDisableOffhand" })),
  t(
    "adds {value:dec%} of the damage of the off-hand weapon to the final damage of the main-hand weapon",
  ).output((c) => ({
    type: "JoinedForceAddOffhandToMainhandPct",
    value: c.value,
  })),
  // Conductive - changes Numbed to provide additional Lightning Damage taken
  t(
    "changes the base effect of numbed to: {value:+dec%} additional lightning damage taken",
  ).output((c) => ({ type: "Conductive", value: c.value })),
  t(
    "changes the base effect of tenacity blessing to: {value:+dec%} additional damage",
  ).output((c) => ({ type: "ChangeTenacityToAddnDmgPct", value: c.value })),
  // Tradeoff mods (Impermanence core talent)
  t(
    "{value:+dec%} additional attack speed when dexterity is no less than strength",
  ).output((c) => ({ type: "TradeoffDexGteStrAspdPct", value: c.value })),
  t(
    "{value:+dec%} additional attack damage when strength is no less than dexterity",
  ).output((c) => ({ type: "TradeoffStrGteDexDmgPct", value: c.value })),
  // Gear-specific mods
  t(
    "{value:+dec%} [{modType:CritRatingModType}] critical strike rating for this gear",
  ).output((c) => ({ type: "GearCritRatingPct", value: c.value })),
  t(
    "adds {min:int} - {max:int} {modType:GearDmgModType} damage to the gear",
  ).output((c) => ({
    type: "FlatGearDmg",
    value: { min: c.min, max: c.max },
    modType: c.modType as
      | "physical"
      | "cold"
      | "lightning"
      | "fire"
      | "erosion"
      | "elemental",
  })),
  t("{value:+dec%} gear physical damage").output((c) => ({
    type: "GearPhysDmgPct",
    value: c.value,
  })),
  t("{value:+dec%} gear elemental damage").output((c) => ({
    type: "GearEleDmgPct",
    value: c.value,
  })),
  // Legendary gear mods
  t("the main stat base no longer additionally increases damage").output(
    () => ({ type: "DisableMainStatDmg" }),
  ),
  t(
    "randomly selects a type of elemental damage on hit, and only elemental damage of this type can be dealt. other elements cannot deal damage. the lower the flat damage percentage of an elemental damage, the higher the chance of it being chosen",
  ).output(() => ({ type: "TrinitySingleElement" })),
  t(
    "gains elemental resistance penetration equal to your minimum effective elemental resistance",
  ).output(() => ({ type: "TrinityElePen" })),
  t("damage types cannot be converted").output(() => ({
    type: "TrinityNoConversion",
  })),
  t(
    "any hit dealing elemental damage is guaranteed to deal {value:int}x elemental damage",
  ).output((c) => ({
    type: "DmgPct",
    value: (c.value - 1) * 100,
    dmgModType: "elemental",
    addn: true,
  })),
  t(
    "{value:+dec%} additional {dmgType:DmgChunkType} damage per {amt:int} {stat:StatWord}",
  )
    .enum("StatWord", StatWordMapping)
    .output((c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: c.dmgType,
      addn: true,
      per: { stackable: c.stat, amt: c.amt },
    })),
  t("{value:+int} Max Pure Heart Stacks").output((c) => ({
    type: "MaxPureHeartStacks",
    value: c.value,
  })),
  t("{value:+int} to max feline stimulant stacks").output((c) => ({
    type: "MaxFelineStimulantStacks",
    value: c.value,
  })),
  t(
    "{value:+dec%} additional attack damage when having feline {(stimulants|stimulant)}",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "attack",
    addn: true,
    condThreshold: { target: "feline_stimulant", comparator: "gt", value: 0 },
  })),
  t("{value:+dec%} additional damage taken when Pure Heart is active").output(
    (c) => ({ type: "DmgTakenPct", value: c.value }),
  ),
  t(
    "gains {stacks:int} stack of pure heart when using an attack mobility skill",
  ).outputNone(),
  t(
    "gains {stacks:int} stack of feline stimulant when triggering a main skill",
  ).outputNone(),
  t(
    "converts {value:dec%} of {from:DmgChunkType} damage taken to {to:DmgChunkType} damage",
  ).output((c) => ({
    type: "ConvertDmgTakenPct",
    value: c.value,
    from: c.from,
    to: c.to,
  })),
  t("{value:+dec%} [additional] aura effect").output((c) => ({
    type: "AuraEffPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} {skillName:words} aura [effect]").output((c) => ({
    type: "AuraEffPct",
    value: c.value,
    skillName: c.skillName,
  })),
  t("{mana:+dec%} max mana. {cost:+int} skill cost").outputMany([
    spec((c) => ({ type: "MaxManaPct", value: c.mana, addn: false })),
    spec((c) => ({ type: "SkillCost", value: c.cost })),
  ]),
  t("{value:+dec%} [additional] projectile damage").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "projectile",
    addn: c.additional !== undefined,
  })),
  t(
    "projectile damage increases with the distance traveled, dealing up to {value:+dec%} damage to distant enemies",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "projectile",
    addn: true,
    cond: "target_enemy_is_distant",
  })),
  t("projectile quantity {value:+int}").output((c) => ({
    type: "Projectile",
    value: c.value,
  })),
  t("nearby enemies within {distance:int} m have frail").output(() => ({
    type: "InflictFrail",
  })),
  t("inflicts frail when dealing spell damage").output(() => ({
    type: "InflictFrail",
  })),
  t(
    "{(the main skill is|main skill is)} supported by [a] lv. {level:int} {skillName:words}",
  ).output((c) => ({
    type: "MainSkillSupportedBy",
    skillName: c.skillName,
    level: c.level,
  })),
  t("regenerates {value:dec%} mana per second while moving").output((c) => ({
    type: "ManaRegenPerSecPct",
    value: c.value,
    cond: "is_moving",
  })),
  t("regenerates {value:dec%} [of] life per second while moving").output(
    (c) => ({ type: "LifeRegenPerSecPct", value: c.value, cond: "is_moving" }),
  ),
  t(
    "regenerates {value:dec%} life per second when taking damage over time",
  ).output((c) => ({
    type: "LifeRegenPerSecPct",
    value: c.value,
    cond: "taking_damage_over_time",
  })),
  t("restores {value:dec%} energy shield per second while moving").output(
    (c) => ({
      type: "EnergyShieldRegenPerSecPct",
      value: c.value,
      cond: "is_moving",
    }),
  ),
  t("regenerates {value:dec%} life per second").output((c) => ({
    type: "LifeRegenPerSecPct",
    value: c.value,
  })),
  t("regenerates {value:int} life per second").output((c) => ({
    type: "FlatLifeRegenPerSec",
    value: c.value,
  })),
  t(
    "minion damage penetrates {value:dec%} {penType:ResPenType} resistance",
  ).output((c) => ({
    type: "MinionResPenPct",
    value: c.value,
    penType: c.penType,
  })),
  t("min channeled stacks {value:+int}").output((c) => ({
    type: "MinChannel",
    value: c.value,
  })),
  t("max terra charge stacks {value:+int}").output((c) => ({
    type: "MaxTerraChargeStack",
    value: c.value,
  })),
  t("{value:+dec%} terra charge recovery speed").output((c) => ({
    type: "TerraChargeRecoverySpeedPct",
    value: c.value,
  })),
  t("max terra quantity {value:+int}").output((c) => ({
    type: "MaxTerraQuant",
    value: c.value,
  })),
  t("max sentry quantity {value:+int}").output((c) => ({
    type: "MaxSentryQuant",
    value: c.value,
  })),
  t("you can apply {value:int} additional tangle(s) to enemies").output(
    (c) => ({ type: "MaxTangleQuantPerEnemy", value: c.value }),
  ),
  t("{value:+int} max tangle quantity").output((c) => ({
    type: "MaxTangleQuant",
    value: c.value,
  })),
  t("has dormant entanglement").output(() => ({
    type: "HasDormantEntanglement",
  })),
  t
    .multi([
      t("{value:+int} command per second"),
      t("+ {value:int} command per second"),
    ])
    .output((c) => ({ type: "CommandPerSec", value: c.value })),
  t("{value:+int} max fortitude stacks").output((c) => ({
    type: "MaxFortitudeStack",
    value: c.value,
  })),
  t("gains attack aggression when minions land a critical strike").output(
    () => ({ type: "GeneratesAttackAggression" }),
  ),
  t("gains attack aggression when casting an attack skill").output(() => ({
    type: "GeneratesAttackAggression",
  })),
  t("adds {min:int} - {max:int} base wilt damage").output((c) => ({
    type: "BaseWiltFlatDmg",
    value: (c.min + c.max) / 2,
  })),
  t("adds {min:int} - {max:int} base trauma damage").output((c) => ({
    type: "BaseTraumaFlatDmg",
    value: (c.min + c.max) / 2,
  })),
  t("adds {min:int} - {max:int} base ignite damage").output((c) => ({
    type: "BaseIgniteFlatDmg",
    value: (c.min + c.max) / 2,
  })),
  t("{value:dec%} chance to gain blur per {dist:int} m you move").output(
    (c) => ({ type: "GeneratesBlur", value: c.value }),
  ),
  t("{value:dec%} of damage is taken from mana before life").output((c) => ({
    type: "ManaBeforeLifePct",
    value: c.value,
  })),
  // Immunities
  t("immune to blinding").output(() => ({ type: "ImmuneToBlinding" })),
  t("immune to elemental ailments").output(() => ({
    type: "ImmuneToElementalAilments",
  })),
  t("immune to frostbite").output(() => ({ type: "ImmuneToFrostbite" })),
  t("immune to ignite").output(() => ({ type: "ImmuneToIgnite" })),
  t("immune to numbed").output(() => ({ type: "ImmuneToNumbed" })),
  t("immune to paralysis").output(() => ({ type: "ImmuneToParalysis" })),
  t("immune to slow").output(() => ({ type: "ImmuneToSlow" })),
  t("immune to trauma").output(() => ({ type: "ImmuneToTrauma" })),
  t("immune to weaken").output(() => ({ type: "ImmuneToWeaken" })),
  t("immune to wilt").output(() => ({ type: "ImmuneToWilt" })),
  t("immune to crowd control effects").output(() => ({
    type: "ImmuneToCrowdControl",
  })),
  t("immune to curse").output(() => ({ type: "ImmuneToCurse" })),
  t("eliminate enemies under {value:dec%} life on hit").output((c) => ({
    type: "EliminationPct",
    value: c.value,
  })),
  t("eliminates enemies under {value:dec%} life upon inflicting damage").output(
    (c) => ({ type: "EliminationPct", value: c.value }),
  ),
  t(
    "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to attacks per {amt:int} {statModType:StatWord}",
  )
    .enum("StatWord", StatWordMapping)
    .output((c) => ({
      type: "FlatDmgToAtks",
      value: { min: c.min, max: c.max },
      dmgType: c.dmgType,
      per: { stackable: c.statModType, amt: c.amt },
    })),
  t(
    "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to attacks per {amt:int} armor",
  ).output((c) => ({
    type: "FlatDmgToAtks",
    value: { min: c.min, max: c.max },
    dmgType: c.dmgType,
    per: { stackable: "armor", amt: c.amt },
  })),
  t(
    "{value:+dec%} additional damage over time taken when having at least {threshold:int} armor",
  ).output((c) => ({
    type: "DmgTakenPct",
    value: c.value,
    addn: true,
    dmgTakenType: "damage_over_time",
    condThreshold: { target: "armor", comparator: "gte", value: c.threshold },
  })),
  t(
    "{value:+dec%} additional damage over time taken when having at least {threshold:int} evasion",
  ).output((c) => ({
    type: "DmgTakenPct",
    value: c.value,
    addn: true,
    dmgTakenType: "damage_over_time",
    condThreshold: { target: "evasion", comparator: "gte", value: c.threshold },
  })),
  t(
    "{value:+dec%} additional damage over time taken when you have at least {threshold:int} max energy shield",
  ).output((c) => ({
    type: "DmgTakenPct",
    value: c.value,
    addn: true,
    dmgTakenType: "damage_over_time",
    condThreshold: {
      target: "energy_shield",
      comparator: "gte",
      value: c.threshold,
    },
  })),
  t("{value:+dec%} additional physical damage taken").output((c) => ({
    type: "DmgTakenPct",
    value: c.value,
    addn: true,
    dmgTakenType: "physical",
  })),
  t("{value:+dec%} additional damage dealt by nearby enemies").output((c) => ({
    type: "DmgTakenPct",
    value: c.value,
    addn: true,
    cond: "target_enemy_is_nearby",
  })),
  // MUST come before non-curse triggers, or else the Curse keyword will be
  // captured by {skillName:words}
  t(
    "triggers lv. {level:int} {skillName1:words} curse and {skillName2:words} curse when a minion deals damage. cooldown: {cooldown:dec} s",
  ).outputMany([
    spec((c) => ({
      type: "TriggersSkill",
      skillName: c.skillName1,
      level: c.level,
    })),
    spec((c) => ({
      type: "TriggersSkill",
      skillName: c.skillName2,
      level: c.level,
    })),
  ]),
  t(
    "triggers lv. {level:int} {skillName:words} curse when minions deal damage. cooldown: {cooldown:dec} s",
  ).output((c) => ({
    type: "TriggersSkill",
    skillName: c.skillName,
    level: c.level,
  })),
  t(
    "triggers lv. {level:int} {skillName:words} curse upon inflicting damage. cooldown: {cooldown:dec} s",
  ).output((c) => ({
    type: "TriggersSkill",
    skillName: c.skillName,
    level: c.level,
  })),
  t(
    "triggers lv. {level:int} {skillName:words} upon starting to move. interval: {interval:dec} s",
  ).output((c) => ({
    type: "TriggersSkill",
    skillName: c.skillName,
    level: c.level,
  })),
  t(
    "triggers lv. {level:int} {skillName:words} while standing still. interval: {interval:dec} s",
  ).output((c) => ({
    type: "TriggersSkill",
    skillName: c.skillName,
    level: c.level,
  })),
  t(
    "triggers lv. {level:int} {skillName:words} when moving. interval: {interval:dec} s",
  ).output((c) => ({
    type: "TriggersSkill",
    skillName: c.skillName,
    level: c.level,
  })),
  t("support skill's mana multiplier is set to {value:dec%}.").output((c) => ({
    type: "OverrideSupportSkillManaMultPct",
    value: c.value,
  })),
  t(
    "gains {stacks:int} stack(s) of all blessings when casting a restoration skill",
  ).outputMany([
    spec(() => ({ type: "GeneratesFocusBlessing" })),
    spec(() => ({ type: "GeneratesAgilityBlessing" })),
    spec(() => ({ type: "GeneratesTenacityBlessing" })),
  ]),
  t("{value:+dec%} additional damage taken").output((c) => ({
    type: "DmgTakenPct",
    value: c.value,
    addn: true,
  })),
  t("{value:+dec%} [additional] damage when channeling").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "global",
    addn: c.additional !== undefined,
    cond: "channeling",
  })),
  t("{value:+dec%} additional damage taken at low mana").output((c) => ({
    type: "DmgTakenPct",
    value: c.value,
    addn: true,
    cond: "has_low_mana",
  })),
  t("{value:+dec%} [additional] max energy shield while moving").output(
    (c) => ({
      type: "MaxEnergyShieldPct",
      value: c.value,
      addn: c.additional !== undefined,
      cond: "is_moving",
    }),
  ),
  t("{value:+dec%} [additional] knockback distance").output((c) => ({
    type: "KnockbackDistancePct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} xp earned").output((c) => ({
    type: "XPEarnedPct",
    value: c.value,
  })),
  t(
    "{value:+dec%} critical strike rating and critical strike damage for every {amt:dec%} of attack block",
  ).outputMany([
    spec((c) => ({
      type: "CritRatingPct",
      value: c.value,
      modType: "global",
      per: { stackable: "attack_block_pct", amt: c.amt },
    })),
    spec((c) => ({
      type: "CritDmgPct",
      value: c.value,
      modType: "global",
      addn: false,
      per: { stackable: "attack_block_pct", amt: c.amt },
    })),
  ]),
  t("{value:+dec%} gear armor").output((c) => ({
    type: "GearArmorPct",
    value: c.value,
  })),
  t("{value:+dec%} gear evasion").output((c) => ({
    type: "GearEvasionPct",
    value: c.value,
  })),
  t("{value:+dec%} life regeneration speed").output((c) => ({
    type: "LifeRegenSpeedPct",
    value: c.value,
  })),
  t("{value:+dec%} chance to blind the target on hit").output(() => ({
    type: "InflictsBlind",
  })),
  t("{value:+dec%} chance to mark the target on hit").output(() => ({
    type: "InflictsMark",
  })),
  t("{value:+dec%} chance to inflict paralysis on hit").output((c) => ({
    type: "InflictParalysisPct",
    value: c.value,
  })),
  t("{value:+dec%} chance for attacks to inflict paralysis on hit").output(
    (c) => ({ type: "InflictParalysisPct", value: c.value }),
  ),
  t("{value:+dec%} max life and max mana").outputMany([
    spec((c) => ({ type: "MaxLifePct", value: c.value, addn: false })),
    spec((c) => ({ type: "MaxManaPct", value: c.value, addn: false })),
  ]),
  t("minions can cast {value:int} additional curse(s)").output((c) => ({
    type: "AddnCurse",
    value: c.value,
  })),
  t("gains spell aggression when minion spells land a critical strike").output(
    () => ({ type: "GeneratesSpellAggression" }),
  ),
  t(
    "for every {dist:int} m moved, gains {value:int} stack(s) of deflection",
  ).output(() => ({ type: "GeneratesDeflection" })),
  t("gains a stack of torment when reaping").output(() => ({
    type: "GeneratesTorment",
  })),
  t("cooldown: {value:dec}s").outputNone(),
  t("energy shield starts to charge when blocking").outputNone(),
  t("energy shield charge cannot be interrupted").outputNone(),
  t(
    "restores {value:dec%} missing energy shield when suffering a severe injury",
  ).outputNone(),
  t("loses fervor at low life").outputNone(),
  t(
    "consumes {value:dec%} of current life and energy shield per second while fervor is active",
  ).outputNone(),
  t("you can cast {value:int} additional curse(s)").output((c) => ({
    type: "AddnCurse",
    value: c.value,
  })),
  t(
    "restores {value:dec%} energy shield on block. interval: {interval:dec}s",
  ).outputNone(),
  t(
    "restores {value:dec%} life on block. interval: {interval:dec}s",
  ).outputNone(),
  t("takes {value:int} true damage every {interval:dec}s").outputNone(),
  t(
    "copies the last talent on the adjacent slate above to this slate. unable to copy the core talent.",
  ).outputNone(),
  t(
    "copies the last talent on the adjacent slate on the left to this slate. unable to copy the core talent.",
  ).outputNone(),
  t(
    "copies the last talent on the adjacent slate below this slate. unable to copy the core talents.",
  ).outputNone(),
  t(
    "copies the last talent on the adjacent slate on the right to this slate. unable to copy the core talent.",
  ).outputNone(),
  t("{value:+dec%} [additional] warcry effect").output((c) => ({
    type: "WarcryEffPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t(
    "immediately casts warcry. {value:+dec%} additional warcry skill effect",
  ).output((c) => ({ type: "WarcryEffPct", value: c.value, addn: true })),
  t("doubles max warcry skill effects").output(() => ({
    type: "WarcryEffPct",
    value: 100,
    addn: true,
  })),
  t("warcry is cast immediately").outputNone(),
  t("gains hasten when minions land a critical strike").output(() => ({
    type: "GeneratesHasten",
  })),
  t("{value:dec%} chance to gain a barrier on defeat").output(() => ({
    type: "GeneratesBarrier",
  })),
  t("{value:dec%} chance to gain hardened when you are hit").output(() => ({
    type: "GeneratesHardened",
  })),
  t(
    "{value:dec%} chance to inflict {stacks:int} additional stack(s) of wilt",
  ).output((c) => ({ type: "InflictWiltPct", value: c.value })),
  t("{value:+dec%} blur effect").output((c) => ({
    type: "BlurEffPct",
    value: c.value,
  })),
  t("{value:+dec%} [additional] focus speed").output((c) => ({
    type: "FocusSpeedPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("{value:+dec%} [additional] barrier shield").output((c) => ({
    type: "BarrierShieldPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t(
    "when using a mobility skill, you can use {stacks:int} stack(s) of agility blessing to reset the mobility skill's cooldown. interval: {interval:dec} s",
  ).outputNone(),
  t(
    "gains {stacks:int} stack of focus blessing every {interval:dec} s. loses focus blessing instead if you have not dealt any critical strikes recently",
  ).output(() => ({ type: "GeneratesFocusBlessing" })),
  t(
    "focus energy to create an ice prison near yourself and the pact holder, which debuffs frostbitten enemies inside every second and makes them take {value:+dec%} additional cold damage, up to {limit:int} stacks, for {dur:int}s.",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "cold",
    addn: true,
    per: { stackable: "num_ice_puppet_stacks", limit: c.limit },
  })),
  t(
    "copies the last talent on all adjacent slates. unable to copy core talents.",
  ).outputNone(),
  t(
    "activates the following effects when there are 2 of this kismet on the same pact page:",
  ).outputNone(),
];
