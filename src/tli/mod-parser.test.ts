import { expect, test } from "vitest";
import { parseMod } from "./mod-parser/index";

test("parse basic damage without type (global)", () => {
  const result = parseMod("+9% damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 9, dmgModType: "global", addn: false },
  ]);
});

test("parse typed damage", () => {
  const result = parseMod("+18% fire damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 18, dmgModType: "fire", addn: false },
  ]);
});

test("parse additional global damage", () => {
  const result = parseMod("+9% additional damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 9, dmgModType: "global", addn: true },
  ]);
});

test("parse additional typed damage", () => {
  const result = parseMod("+9% additional attack damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 9, dmgModType: "attack", addn: true },
  ]);
});

test("parse additional damage when mana reaches max", () => {
  const result = parseMod(
    "+40% additional damage for the next skill when Mana reaches the max",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 40,
      dmgModType: "global",
      addn: true,
      cond: "has_full_mana",
    },
  ]);
});

test("parse additional damage against enemies with elemental ailments", () => {
  const result = parseMod(
    "+25% additional damage against enemies with Elemental Ailments",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 25,
      dmgModType: "global",
      addn: true,
      cond: "enemy_has_ailment",
    },
  ]);
});

test("parse additional damage against cursed enemies", () => {
  const result = parseMod("+8% additional damage against Cursed enemies");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 8,
      dmgModType: "global",
      addn: true,
      cond: "enemy_is_cursed",
    },
  ]);
});

test("parse damage against cursed enemies (non-additional)", () => {
  const result = parseMod("+10% damage against Cursed enemies");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 10,
      dmgModType: "global",
      addn: false,
      cond: "enemy_is_cursed",
    },
  ]);
});

test("parse additional erosion area damage against elites", () => {
  const result = parseMod("+10% additional Erosion Area Damage against Elites");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 10,
      dmgModType: "erosion_area",
      addn: true,
      cond: "target_enemy_is_elite",
    },
  ]);
});

test("parse curse damage dealt and damage taken", () => {
  const result = parseMod(
    "+20% additional damage dealt to Cursed enemies. -20% additional damage taken from Cursed enemies",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 20,
      dmgModType: "global",
      addn: true,
      cond: "enemy_is_cursed",
    },
    { type: "DmgTakenPct", value: -20, cond: "enemy_is_cursed" },
  ]);
});

test("parse additional damage per movement speed with cap", () => {
  const result = parseMod(
    "+1% additional Damage per +10% Movement Speed, up to +10%",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 1,
      dmgModType: "global",
      addn: true,
      per: { stackable: "movement_speed_bonus_pct", amt: 10, valueLimit: 10 },
    },
  ]);
});

test("parse additional damage when having both sealed mana and life", () => {
  const result = parseMod(
    "+10% additional damage when having both Sealed Mana and Life",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 10,
      dmgModType: "global",
      addn: true,
      cond: "have_both_sealed_mana_and_life",
    },
  ]);
});

test("parse damage when focus blessing is active", () => {
  const result = parseMod("+30% damage when Focus Blessing is active");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 30,
      dmgModType: "global",
      addn: false,
      cond: "has_focus_blessing",
    },
  ]);
});

test("parse damage if you have blocked recently", () => {
  const result = parseMod("+40% damage if you have Blocked recently");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 40,
      dmgModType: "global",
      addn: false,
      cond: "has_blocked_recently",
    },
  ]);
});

test("parse additional damage per frostbite rating", () => {
  const result = parseMod(
    "Deals +1% additional damage to an enemy for every 2 points of Frostbite Rating the enemy has",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 1,
      dmgModType: "global",
      addn: true,
      per: { stackable: "frostbite_rating", amt: 2 },
    },
  ]);
});

test("parse additional damage per fervor rating", () => {
  const result = parseMod("+1% additional damage per 2 Fervor Rating");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 1,
      dmgModType: "global",
      addn: true,
      per: { stackable: "fervor", amt: 2 },
    },
  ]);
});

test("parse additional damage per additional max channeled stack", () => {
  const result = parseMod(
    "+6% additional damage for every +1 additional Max Channeled Stack(s)",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 6,
      dmgModType: "global",
      addn: true,
      per: { stackable: "additional_max_channel_stack", amt: 1 },
    },
  ]);
});

test("parse additional attack damage to nearby enemies", () => {
  const result = parseMod(
    "Deals up to +25% additional Attack Damage to enemies in proximity, and this damage reduces as the distance from the enemy grows",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 25,
      dmgModType: "attack",
      addn: true,
      cond: "target_enemy_is_in_proximity",
    },
  ]);
});

test("parse additional attack and ailment damage with elites nearby", () => {
  const result = parseMod(
    "+20% additional Attack Damage and Ailment Damage dealt by attacks when there are Elites within 10m nearby",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 20,
      dmgModType: "attack",
      addn: true,
      cond: "has_elites_nearby",
    },
    {
      type: "DmgPct",
      value: 20,
      dmgModType: "ailment",
      addn: true,
      cond: "has_elites_nearby",
    },
  ]);
});

test("parse decimal damage", () => {
  const result = parseMod("+12.5% fire damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 12.5, dmgModType: "fire", addn: false },
  ]);
});

test("parse damage over time", () => {
  const result = parseMod("+94% Damage Over Time");
  expect(result).toEqual([
    { type: "DmgPct", value: 94, dmgModType: "damage_over_time", addn: false },
  ]);
});

test("parse additional damage over time", () => {
  const result = parseMod("+50% additional Damage Over Time");
  expect(result).toEqual([
    { type: "DmgPct", value: 50, dmgModType: "damage_over_time", addn: true },
  ]);
});

test("parse blur additional damage over time effect", () => {
  const result = parseMod(
    "Blur gains an additional effect: +25% additional Damage Over Time",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 25,
      dmgModType: "damage_over_time",
      addn: true,
      cond: "has_blur",
    },
  ]);
});

test("parse additional damage after blur ends", () => {
  const result = parseMod("+25% additional damage for 3 s after Blur ends");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 25,
      dmgModType: "global",
      addn: true,
      cond: "blur_ended_recently",
    },
  ]);
});

test("parse additional damage applied to life", () => {
  const result = parseMod("8% additional damage applied to Life");
  expect(result).toEqual([
    { type: "DmgPct", value: 8, dmgModType: "global", addn: true },
  ]);
});

test("parse damage for channeled skills", () => {
  const result = parseMod("+27% damage for Channeled Skills");
  expect(result).toEqual([
    { type: "DmgPct", value: 27, dmgModType: "channeled", addn: false },
  ]);
});

test("parse additional damage for channeled skills at max stacks", () => {
  const result = parseMod(
    "At max channeled stacks, +4% additional damage for Channeled Skills for 4 s",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 4,
      dmgModType: "channeled",
      addn: true,
      cond: "at_max_channeled_stacks",
    },
  ]);
});

test("return undefined for invalid damage type", () => {
  const result = parseMod("+10% invalid damage");
  expect(result).toBeUndefined();
});

test("parse global critical strike rating", () => {
  const result = parseMod("+10% Critical Strike Rating");
  expect(result).toEqual([
    { type: "CritRatingPct", value: 10, modType: "global" },
  ]);
});

test("parse typed critical strike rating", () => {
  const result = parseMod("+10% Attack Critical Strike Rating");
  expect(result).toEqual([
    { type: "CritRatingPct", value: 10, modType: "attack" },
  ]);
});

test("parse crit rating with decimal percentage", () => {
  const result = parseMod("+12.5% Attack Critical Strike Rating");
  expect(result).toEqual([
    { type: "CritRatingPct", value: 12.5, modType: "attack" },
  ]);
});

test("return undefined for invalid crit rating mod type", () => {
  const result = parseMod("+10% Fire Critical Strike Rating");
  expect(result).toBeUndefined();
});

test("parse flat spell critical strike rating", () => {
  const result = parseMod("+110 Spell Critical Strike Rating");
  expect(result).toEqual([
    { type: "FlatCritRating", value: 110, modType: "spell" },
  ]);
});

test("parse flat attack critical strike rating", () => {
  const result = parseMod("+200 Attack Critical Strike Rating");
  expect(result).toEqual([
    { type: "FlatCritRating", value: 200, modType: "attack" },
  ]);
});

test("parse flat global critical strike rating", () => {
  const result = parseMod("+100 Critical Strike Rating");
  expect(result).toEqual([
    { type: "FlatCritRating", value: 100, modType: "global" },
  ]);
});

test("parse gear base critical strike rating", () => {
  const result = parseMod("100 Critical Strike Rating");
  expect(result).toEqual([{ type: "GearBaseCritRating", value: 100 }]);
});

test("parse global critical strike damage", () => {
  const result = parseMod("+5% Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 5, modType: "global", addn: false },
  ]);
});

test("parse additional critical strike damage", () => {
  const result = parseMod("+10% additional Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 10, modType: "global", addn: true },
  ]);
});

test("parse attack critical strike damage", () => {
  const result = parseMod("+15% Attack Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 15, modType: "attack", addn: false },
  ]);
});

test("parse spell critical strike damage", () => {
  const result = parseMod("+20% Spell Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 20, modType: "spell", addn: false },
  ]);
});

test("parse additional attack critical strike damage", () => {
  const result = parseMod("+20% additional Attack Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 20, modType: "attack", addn: true },
  ]);
});

test("parse physical skill critical strike damage", () => {
  const result = parseMod("+26% Physical Skill Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 26, modType: "physical_skill", addn: false },
  ]);
});

test("parse cold skill critical strike damage", () => {
  const result = parseMod("+26% Cold Skill Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 26, modType: "cold_skill", addn: false },
  ]);
});

test("parse lightning skill critical strike damage", () => {
  const result = parseMod("+26% Lightning Skill Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 26, modType: "lightning_skill", addn: false },
  ]);
});

test("parse fire skill critical strike damage", () => {
  const result = parseMod("+26% Fire Skill Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 26, modType: "fire_skill", addn: false },
  ]);
});

test("parse erosion skill critical strike damage", () => {
  const result = parseMod("+26% Erosion Skill Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 26, modType: "erosion_skill", addn: false },
  ]);
});

test("parse crit damage with decimal percentage", () => {
  const result = parseMod("+12.5% Critical Strike Damage");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 12.5, modType: "global", addn: false },
  ]);
});

test("parse spell critical strike damage per stack of focus blessing owned", () => {
  const result = parseMod(
    "+5% Spell Critical Strike Damage per stack of Focus Blessing owned",
  );
  expect(result).toEqual([
    {
      type: "CritDmgPct",
      value: 5,
      modType: "spell",
      addn: false,
      per: { stackable: "focus_blessing" },
    },
  ]);
});

test("parse critical strike damage per spell skill used recently with stack limit", () => {
  const result = parseMod(
    "For each Spell Skill used recently, +4% Critical Strike Damage, stacking up to 12 time(s)",
  );
  expect(result).toEqual([
    {
      type: "CritDmgPct",
      value: 4,
      modType: "global",
      addn: false,
      per: { stackable: "num_spell_skills_used_recently", limit: 12 },
    },
  ]);
});

test("return undefined for invalid crit damage mod type", () => {
  const result = parseMod("+10% Fire Critical Strike Damage");
  expect(result).toBeUndefined();
});

test("parse basic attack speed", () => {
  const result = parseMod("+6% attack speed");
  expect(result).toEqual([{ type: "AspdPct", value: 6, addn: false }]);
});

test("parse additional attack speed", () => {
  const result = parseMod("+6% additional attack speed");
  expect(result).toEqual([{ type: "AspdPct", value: 6, addn: true }]);
});

test("parse additional attack speed when only 1 enemy nearby", () => {
  const result = parseMod(
    "+20% additional Attack Speed when only 1 enemies are Nearby",
  );
  expect(result).toEqual([
    {
      type: "AspdPct",
      value: 20,
      addn: true,
      condThreshold: {
        target: "num_enemies_nearby",
        comparator: "eq",
        value: 1,
      },
    },
  ]);
});

test("parse additional attack speed if you have dealt a critical strike recently", () => {
  const result = parseMod(
    "+6% additional Attack Speed if you have dealt a Critical Strike recently",
  );
  expect(result).toEqual([
    { type: "AspdPct", value: 6, addn: true, cond: "has_crit_recently" },
  ]);
});

test("parse attack speed with decimal percentage", () => {
  const result = parseMod("+12.5% attack speed");
  expect(result).toEqual([{ type: "AspdPct", value: 12.5, addn: false }]);
});

test("parse basic cast speed", () => {
  const result = parseMod("+6% cast speed");
  expect(result).toEqual([{ type: "CspdPct", value: 6, addn: false }]);
});

test("parse basic attack and cast speed", () => {
  const result = parseMod("+6% attack and cast speed");
  expect(result).toEqual([
    { type: "AspdPct", value: 6, addn: false },
    { type: "CspdPct", value: 6, addn: false },
  ]);
});

test("parse attack and cast speed when at full mana", () => {
  const result = parseMod("+20% Attack and Cast Speed when at Full Mana");
  expect(result).toEqual([
    { type: "AspdPct", value: 20, addn: false, cond: "has_full_mana" },
    { type: "CspdPct", value: 20, addn: false, cond: "has_full_mana" },
  ]);
});

test("parse additional cast speed if you have dealt a critical strike recently", () => {
  const result = parseMod(
    "+6% additional Cast Speed if you have dealt a Critical Strike recently",
  );
  expect(result).toEqual([
    { type: "CspdPct", value: 6, addn: true, cond: "has_crit_recently" },
  ]);
});

test("parse basic minion attack and cast speed", () => {
  const result = parseMod("+6% minion attack and cast speed");
  expect(result).toEqual([
    { type: "MinionAspdPct", value: 6, addn: false },
    { type: "MinionCspdPct", value: 6, addn: false },
  ]);
});

test("parse minion attack speed", () => {
  const result = parseMod("+10% Minion Attack Speed");
  expect(result).toEqual([{ type: "MinionAspdPct", value: 10, addn: false }]);
});

test("parse minion cast speed", () => {
  const result = parseMod("+34% Minion Cast Speed");
  expect(result).toEqual([{ type: "MinionCspdPct", value: 34, addn: false }]);
});

test("parse projectile critical strike rating", () => {
  const result = parseMod("+30% Projectile Critical Strike Rating");
  expect(result).toEqual([
    { type: "CritRatingPct", value: 30, modType: "projectile" },
  ]);
});

test("parse minion lightning damage", () => {
  const result = parseMod("+18% Minion Lightning Damage");
  expect(result).toEqual([
    {
      type: "MinionDmgPct",
      value: 18,
      addn: false,
      minionDmgModType: "lightning",
    },
  ]);
});

test("parse attack block chance", () => {
  const result = parseMod("+4% Attack Block Chance");
  expect(result).toEqual([{ type: "AttackBlockChancePct", value: 4 }]);
});

test("parse spell block chance", () => {
  const result = parseMod("+4% Spell Block Chance");
  expect(result).toEqual([{ type: "SpellBlockChancePct", value: 4 }]);
});

test("parse attack and spell block chance", () => {
  const result = parseMod("+19% Attack and Spell Block Chance");
  expect(result).toEqual([
    { type: "AttackBlockChancePct", value: 19 },
    { type: "SpellBlockChancePct", value: 19 },
  ]);
});

test("parse block ratio", () => {
  const result = parseMod("+25% Block Ratio");
  expect(result).toEqual([{ type: "BlockRatioPct", value: 25 }]);
});

test("parse block ratio when holding a shield", () => {
  const result = parseMod("+5% Block ratio when holding a Shield");
  expect(result).toEqual([
    { type: "BlockRatioPct", value: 5, cond: "holding_shield" },
  ]);
});

test("parse max life", () => {
  const result = parseMod("+3% Max Life");
  expect(result).toEqual([{ type: "MaxLifePct", value: 3, addn: false }]);
});

test("parse flat max life", () => {
  const result = parseMod("+151 Max Life");
  expect(result).toEqual([{ type: "MaxLife", value: 151 }]);
});

test("parse max energy shield", () => {
  const result = parseMod("+3% Max Energy Shield");
  expect(result).toEqual([
    { type: "MaxEnergyShieldPct", value: 3, addn: false },
  ]);
});

test("parse flat signed max energy shield", () => {
  const result = parseMod("+1 Max Energy Shield");
  expect(result).toEqual([{ type: "MaxEnergyShield", value: 1 }]);
});

test("parse armor", () => {
  const result = parseMod("+5% Armor");
  expect(result).toEqual([{ type: "ArmorPct", value: 5, addn: false }]);
});

test("parse evasion", () => {
  const result = parseMod("+5% Evasion");
  expect(result).toEqual([{ type: "EvasionPct", value: 5, addn: false }]);
});

test("parse defense", () => {
  const result = parseMod("+40% Defense");
  expect(result).toEqual([{ type: "DefensePct", value: 40 }]);
});

test("parse life regain", () => {
  const result = parseMod("1.5% Life Regain");
  expect(result).toEqual([{ type: "LifeRegainPct", value: 1.5 }]);
});

test("parse energy shield regain", () => {
  const result = parseMod("1.5% Energy Shield Regain");
  expect(result).toEqual([{ type: "EnergyShieldRegainPct", value: 1.5 }]);
});

test("parse multistrike chance", () => {
  const result = parseMod("+32% chance to Multistrike");
  expect(result).toEqual([{ type: "MultistrikeChancePct", value: 32 }]);
});

test("parse flat strength", () => {
  const result = parseMod("+6 Strength");
  expect(result).toEqual([{ type: "Stat", statModType: "str", value: 6 }]);
});

test("parse flat dexterity", () => {
  const result = parseMod("+6 Dexterity");
  expect(result).toEqual([{ type: "Stat", statModType: "dex", value: 6 }]);
});

test("parse flat intelligence", () => {
  const result = parseMod("+6 Intelligence");
  expect(result).toEqual([{ type: "Stat", statModType: "int", value: 6 }]);
});

test("parse intelligence per level", () => {
  const result = parseMod("+3 Intelligence per 4 level(s)");
  expect(result).toEqual([
    {
      type: "Stat",
      statModType: "int",
      value: 3,
      per: { stackable: "level", amt: 4 },
    },
  ]);
});

test("parse dexterity per level", () => {
  const result = parseMod("+2 Dexterity per 5 level(s)");
  expect(result).toEqual([
    {
      type: "Stat",
      statModType: "dex",
      value: 2,
      per: { stackable: "level", amt: 5 },
    },
  ]);
});

test("parse strength per level", () => {
  const result = parseMod("+1 Strength per 2 level(s)");
  expect(result).toEqual([
    {
      type: "Stat",
      statModType: "str",
      value: 1,
      per: { stackable: "level", amt: 2 },
    },
  ]);
});

test("parse flat all stats", () => {
  const result = parseMod("+20 all stats");
  expect(result).toEqual([{ type: "Stat", statModType: "all", value: 20 }]);
});

test("parse percentage strength", () => {
  const result = parseMod("+4% Strength");
  expect(result).toEqual([{ type: "StatPct", statModType: "str", value: 4 }]);
});

test("parse percentage dexterity", () => {
  const result = parseMod("+4% Dexterity");
  expect(result).toEqual([{ type: "StatPct", statModType: "dex", value: 4 }]);
});

test("parse percentage intelligence", () => {
  const result = parseMod("+4% Intelligence");
  expect(result).toEqual([{ type: "StatPct", statModType: "int", value: 4 }]);
});

test("parse percentage all stats", () => {
  const result = parseMod("+10% all stats");
  expect(result).toEqual([{ type: "StatPct", statModType: "all", value: 10 }]);
});

test("parse fervor effect", () => {
  const result = parseMod("+4% Fervor effect");
  expect(result).toEqual([{ type: "FervorEffPct", value: 4 }]);
});

test("parse steep strike chance", () => {
  const result = parseMod("+12% Steep Strike chance");
  expect(result).toEqual([{ type: "SteepStrikeChancePct", value: 12 }]);
});

test("parse shadow quantity", () => {
  const result = parseMod("+2 Shadow Quantity");
  expect(result).toEqual([{ type: "ShadowQuant", value: 2 }]);
});

test("parse adds damage as", () => {
  const result = parseMod("Adds 18% of Physical Damage to Cold Damage");
  expect(result).toEqual([
    { type: "AddsDmgAsPct", from: "physical", to: "cold", value: 18 },
  ]);
});

test("parse adds damage as with decimal", () => {
  const result = parseMod("Adds 12.5% of Fire Damage to Lightning Damage");
  expect(result).toEqual([
    { type: "AddsDmgAsPct", from: "fire", to: "lightning", value: 12.5 },
  ]);
});

test("parse adds damage as with 'as' keyword", () => {
  const result = parseMod("Adds 18% of Physical Damage as Lightning Damage");
  expect(result).toEqual([
    { type: "AddsDmgAsPct", from: "physical", to: "lightning", value: 18 },
  ]);
});

test("return undefined for invalid adds damage as types", () => {
  const result = parseMod("Adds 10% of Magic Damage to Cold Damage");
  expect(result).toBeUndefined();
});

test("parse cold penetration", () => {
  const result = parseMod("+8% Cold Penetration");
  expect(result).toEqual([{ type: "ResPenPct", value: 8, penType: "cold" }]);
});

test("parse unsigned cold penetration", () => {
  const result = parseMod("4.5% Cold Penetration");
  expect(result).toEqual([{ type: "ResPenPct", value: 4.5, penType: "cold" }]);
});

test("parse lightning penetration", () => {
  const result = parseMod("+12% Lightning Penetration");
  expect(result).toEqual([
    { type: "ResPenPct", value: 12, penType: "lightning" },
  ]);
});

test("parse fire penetration", () => {
  const result = parseMod("+10% Fire Penetration");
  expect(result).toEqual([{ type: "ResPenPct", value: 10, penType: "fire" }]);
});

test("parse elemental resistance penetration", () => {
  const result = parseMod("+15% Elemental Resistance Penetration");
  expect(result).toEqual([
    { type: "ResPenPct", value: 15, penType: "elemental" },
  ]);
});

test("parse erosion resistance penetration", () => {
  const result = parseMod("+10% Erosion Resistance Penetration");
  expect(result).toEqual([
    { type: "ResPenPct", value: 10, penType: "erosion" },
  ]);
});

test("parse elemental and erosion resistance penetration", () => {
  const result = parseMod("+23% Elemental and Erosion Resistance Penetration");
  expect(result).toEqual([{ type: "ResPenPct", value: 23, penType: "all" }]);
});

test("parse damage penetrates elemental resistance", () => {
  const result = parseMod("Damage Penetrates 2% Elemental Resistance");
  expect(result).toEqual([
    { type: "ResPenPct", value: 2, penType: "elemental" },
  ]);
});

test("parse elemental resistance penetration with stackable (when hitting)", () => {
  const result = parseMod(
    "+1% Elemental Resistance Penetration when hitting an enemy with Elemental Damage, stacking up to 4 times",
  );
  expect(result).toEqual([
    {
      type: "ResPenPct",
      value: 1,
      penType: "elemental",
      per: {
        stackable: "has_hit_enemy_with_elemental_dmg_recently",
        amt: 1,
        limit: 4,
      },
    },
  ]);
});

test("parse elemental resistance penetration with stackable (every time)", () => {
  const result = parseMod(
    "1.5% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times",
  );
  expect(result).toEqual([
    {
      type: "ResPenPct",
      value: 1.5,
      penType: "elemental",
      per: {
        stackable: "has_hit_enemy_with_elemental_dmg_recently",
        amt: 1,
        limit: 4,
      },
    },
  ]);
});

test("parse armor dmg mitigation penetration", () => {
  const result = parseMod("+8% Armor DMG Mitigation Penetration");
  expect(result).toEqual([{ type: "ArmorPenPct", value: 8 }]);
});

test("parse armor dmg mitigation penetration with decimal", () => {
  const result = parseMod("+12.5% Armor DMG Mitigation Penetration");
  expect(result).toEqual([{ type: "ArmorPenPct", value: 12.5 }]);
});

test("parse gear attack speed", () => {
  const result = parseMod("+8% gear Attack Speed");
  expect(result).toEqual([{ type: "GearAspdPct", value: 8 }]);
});

test("parse gear attack speed with damage penalty", () => {
  const result = parseMod(
    "+57% Gear Attack Speed. -12% additional Attack Damage",
  );
  expect(result).toEqual([
    { type: "GearAspdPct", value: 57 },
    { type: "DmgPct", value: -12, addn: true, dmgModType: "attack" },
  ]);
});

test("parse double damage chance", () => {
  const result = parseMod("+31% chance to deal Double Damage");
  expect(result).toEqual([{ type: "DoubleDmgChancePct", value: 31 }]);
});

test("parse flat max mana", () => {
  const result = parseMod("+166 Max Mana");
  expect(result).toEqual([{ type: "MaxMana", value: 166 }]);
});

test("parse percentage max mana", () => {
  const result = parseMod("+90% Max Mana");
  expect(result).toEqual([{ type: "MaxManaPct", value: 90, addn: false }]);
});

test("parse additional percentage max mana", () => {
  const result = parseMod("+20% additional Max Mana");
  expect(result).toEqual([{ type: "MaxManaPct", value: 20, addn: true }]);
});

test("parse mana per intelligence", () => {
  const result = parseMod("+1 Mana per 6 Intelligence");
  expect(result).toEqual([
    { type: "MaxMana", value: 1, per: { stackable: "int", amt: 6 } },
  ]);
});

test("parse flat fire damage to attacks", () => {
  const result = parseMod("Adds 9 - 15 Fire Damage to Attacks");
  expect(result).toEqual([
    { type: "FlatDmgToAtks", value: { min: 9, max: 15 }, dmgType: "fire" },
  ]);
});

test("parse flat cold damage to attacks", () => {
  const result = parseMod("Adds 20 - 30 Cold Damage to Attacks");
  expect(result).toEqual([
    { type: "FlatDmgToAtks", value: { min: 20, max: 30 }, dmgType: "cold" },
  ]);
});

test("parse flat fire damage to spells", () => {
  const result = parseMod("Adds 9 - 15 Fire Damage to Spells");
  expect(result).toEqual([
    { type: "FlatDmgToSpells", value: { min: 9, max: 15 }, dmgType: "fire" },
  ]);
});

test("parse flat lightning damage to spells", () => {
  const result = parseMod("Adds 12 - 25 Lightning Damage to Spells");
  expect(result).toEqual([
    {
      type: "FlatDmgToSpells",
      value: { min: 12, max: 25 },
      dmgType: "lightning",
    },
  ]);
});

test("parse flat fire damage to attacks and spells", () => {
  const result = parseMod("Adds 9 - 15 Fire Damage to Attacks and Spells");
  expect(result).toEqual([
    { type: "FlatDmgToAtks", value: { min: 9, max: 15 }, dmgType: "fire" },
    { type: "FlatDmgToSpells", value: { min: 9, max: 15 }, dmgType: "fire" },
  ]);
});

test("parse flat physical damage to attacks and spells", () => {
  const result = parseMod("Adds 20 - 35 Physical Damage to Attacks and Spells");
  expect(result).toEqual([
    { type: "FlatDmgToAtks", value: { min: 20, max: 35 }, dmgType: "physical" },
    {
      type: "FlatDmgToSpells",
      value: { min: 20, max: 35 },
      dmgType: "physical",
    },
  ]);
});

test("parse flat physical damage to attacks and spells per mana consumed recently", () => {
  const result = parseMod(
    "Adds 22 - 27 Physical Damage to Attacks and Spells for every 1034 Mana consumed recently. Stacks up to 200 time(s)",
  );
  expect(result).toEqual([
    {
      type: "FlatDmgToAtks",
      value: { min: 22, max: 27 },
      dmgType: "physical",
      per: { stackable: "mana_consumed_recently", amt: 1034, limit: 200 },
    },
    {
      type: "FlatDmgToSpells",
      value: { min: 22, max: 27 },
      dmgType: "physical",
      per: { stackable: "mana_consumed_recently", amt: 1034, limit: 200 },
    },
  ]);
});

test("parse spell damage per mana consumed recently with value limit", () => {
  const result = parseMod(
    "+7% Spell Damage for every 100 Mana consumed recently, up to 432%",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 7,
      dmgModType: "spell",
      addn: false,
      per: { stackable: "mana_consumed_recently", amt: 100, valueLimit: 432 },
    },
  ]);
});

test("parse additional spell damage per max spell burst stack", () => {
  const result = parseMod(
    "For every stack of Max Spell Burst, +6% additional Spell Damage, up to +24% additional Spell Damage",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 6,
      dmgModType: "spell",
      addn: true,
      per: { stackable: "max_spell_burst", valueLimit: 24 },
    },
  ]);
});

test("parse critical strike rating and damage combined", () => {
  const result = parseMod(
    "+5% Critical Strike Rating and Critical Strike Damage",
  );
  expect(result).toEqual([
    { type: "CritRatingPct", value: 5, modType: "global" },
    { type: "CritDmgPct", value: 5, modType: "global", addn: false },
  ]);
});

test("parse critical strike rating and damage per mana consumed recently", () => {
  const result = parseMod(
    "+5% Critical Strike Rating and Critical Strike Damage for every 720 Mana consumed recently",
  );
  expect(result).toEqual([
    {
      type: "CritRatingPct",
      value: 5,
      modType: "global",
      per: { stackable: "mana_consumed_recently", amt: 720 },
    },
    {
      type: "CritDmgPct",
      value: 5,
      modType: "global",
      addn: false,
      per: { stackable: "mana_consumed_recently", amt: 720 },
    },
  ]);
});

test("parse max focus blessing stacks", () => {
  const result = parseMod("Max Focus Blessing Stacks +1");
  expect(result).toEqual([{ type: "MaxFocusBlessing", value: 1 }]);
});

test("parse max focus blessing stacks with higher value", () => {
  const result = parseMod("Max Focus Blessing Stacks +3");
  expect(result).toEqual([{ type: "MaxFocusBlessing", value: 3 }]);
});

test("parse max agility blessing stacks", () => {
  const result = parseMod("Max Agility Blessing Stacks +1");
  expect(result).toEqual([{ type: "MaxAgilityBlessing", value: 1 }]);
});

test("parse max agility blessing stacks with higher value", () => {
  const result = parseMod("Max Agility Blessing Stacks +3");
  expect(result).toEqual([{ type: "MaxAgilityBlessing", value: 3 }]);
});

test("parse max repentance stacks", () => {
  const result = parseMod("+3 Max Repentance Stacks");
  expect(result).toEqual([{ type: "MaxRepentance", value: 3 }]);
});

test("parse max spell burst", () => {
  const result = parseMod("+1 Max Spell Burst");
  expect(result).toEqual([{ type: "MaxSpellBurst", value: 1 }]);
});

test("parse max spell burst with movement speed condition", () => {
  const result = parseMod(
    "+1 Max Spell Burst when Movement Speed is not higher than 200% of base",
  );
  expect(result).toEqual([{ type: "MaxSpellBurst", value: 1 }]);
});

test("parse spell burst charge speed with additional", () => {
  const result = parseMod("-20% additional Spell Burst Charge Speed");
  expect(result).toEqual([
    { type: "SpellBurstChargeSpeedPct", value: -20, addn: true },
  ]);
});

test("parse spell burst charge speed without additional", () => {
  const result = parseMod("-20% Spell Burst Charge Speed");
  expect(result).toEqual([
    { type: "SpellBurstChargeSpeedPct", value: -20, addn: false },
  ]);
});

test("parse play safe cast speed to spell burst", () => {
  const result = parseMod(
    "100% of the bonuses and additional bonuses to Cast Speed is also applied to Spell Burst Charge Speed",
  );
  expect(result).toEqual([{ type: "PlaySafe", value: 100 }]);
});

test("parse max spell burst when having squidnova", () => {
  const result = parseMod("+1 to Max Spell Burst when having Squidnova");
  expect(result).toEqual([
    { type: "MaxSpellBurst", value: 1, cond: "has_squidnova" },
  ]);
});

test("parse generates squidnova", () => {
  const result = parseMod(
    "Activating Spell Burst with at least 6 stack(s) of Max Spell Burst grants 1 stack of Squidnova",
  );
  expect(result).toEqual([{ type: "GeneratesSquidnova" }]);
});

test("parse squidnova effect", () => {
  const result = parseMod("+50% Squidnova Effect");
  expect(result).toEqual([{ type: "SquidnovaEffPct", value: 50 }]);
});

test("parse additional spell damage when having squidnova", () => {
  const result = parseMod("+8% additional Spell Damage when having Squidnova");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 8,
      dmgModType: "spell",
      addn: true,
      cond: "has_squidnova",
    },
  ]);
});

test("parse additional elemental damage dealt by spell skills", () => {
  const result = parseMod(
    "+14% additional Elemental Damage dealt by Spell Skills",
  );
  expect(result).toEqual([
    { type: "ElementalSpellDmgPct", value: 14, addn: true },
  ]);
});

test("parse elemental damage dealt by spell skills (non-additional)", () => {
  const result = parseMod("+20% Elemental Damage dealt by Spell Skills");
  expect(result).toEqual([
    { type: "ElementalSpellDmgPct", value: 20, addn: false },
  ]);
});

test("parse max channeled stacks", () => {
  const result = parseMod("Max Channeled Stacks +1");
  expect(result).toEqual([{ type: "MaxChannel", value: 1 }]);
});

test("parse max channeled stacks when equipped in left ring slot", () => {
  const result = parseMod(
    "+4 Max Channeled Stacks when equipped in the left Ring slot",
  );
  expect(result).toEqual([
    { type: "MaxChannel", value: 4, cond: "equipped_in_left_ring_slot" },
  ]);
});

test("parse additional attack damage dealt to nearby enemies", () => {
  const result = parseMod(
    "+10% additional Attack Damage dealt to Nearby enemies",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 10,
      dmgModType: "attack",
      addn: true,
      cond: "target_enemy_is_nearby",
    },
  ]);
});

test("parse additional attack damage when holding one-handed weapon", () => {
  const result = parseMod(
    "+20% additional Attack Damage when holding a One-Handed Weapon",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 20,
      dmgModType: "attack",
      addn: true,
      cond: "has_one_handed_weapon",
    },
  ]);
});

test("parse additional attack damage per unique weapon type while dual wielding", () => {
  const result = parseMod(
    "+5% additional Attack Damage for each unique type of weapon equipped while Dual Wielding",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 5,
      dmgModType: "attack",
      addn: true,
      per: { stackable: "num_unique_weapon_types_equipped" },
      cond: "is_dual_wielding",
    },
  ]);
});

test("parse has hasten", () => {
  const result = parseMod("Has Hasten");
  expect(result).toEqual([{ type: "HasHasten" }]);
});

test("parse have fervor", () => {
  const result = parseMod("Have Fervor");
  expect(result).toEqual([{ type: "HaveFervor" }]);
});

test("parse fixed fervor rating", () => {
  const result = parseMod("Has 67 point(s) of fixed Fervor Rating");
  expect(result).toEqual([{ type: "FixedFervorPts", value: 67 }]);
});

test("parse generates torment", () => {
  const result = parseMod(
    "Gains a stack of Torment when dealing damage to enemies with max Affliction",
  );
  expect(result).toEqual([{ type: "GeneratesTorment" }]);
});

test("parse movement speed", () => {
  const result = parseMod("+38% Movement Speed");
  expect(result).toEqual([
    { type: "MovementSpeedPct", value: 38, addn: false },
  ]);
});

test("parse additional movement speed", () => {
  const result = parseMod("+15% additional Movement Speed");
  expect(result).toEqual([{ type: "MovementSpeedPct", value: 15, addn: true }]);
});

test("parse movement speed per max spell burst stack", () => {
  const result = parseMod(
    "+5% Movement Speed per stack of Max Spell Burst, up to +28%",
  );
  expect(result).toEqual([
    {
      type: "MovementSpeedPct",
      value: 5,
      addn: false,
      per: { stackable: "max_spell_burst", valueLimit: 28 },
    },
  ]);
});

test("parse additional hit damage per spell burst charge speed", () => {
  const result = parseMod(
    "For every +75% Spell Burst Charge Speed, +19% additional Hit Damage for skills cast by Spell Burst, up to +80%",
  );
  expect(result).toEqual([
    {
      type: "SpellBurstAdditionalDmgPct",
      value: 19,
      addn: true,
      per: {
        stackable: "spell_burst_charge_speed_bonus_pct",
        amt: 75,
        valueLimit: 80,
      },
    },
  ]);
});

test("parse support skill level", () => {
  const result = parseMod("+7 Support Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 7, skillLevelType: "support" },
  ]);
});

test("parse main skill level", () => {
  const result = parseMod("+5 Main Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 5, skillLevelType: "main" },
  ]);
});

test("parse active skill level", () => {
  const result = parseMod("+2 Active Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 2, skillLevelType: "active" },
  ]);
});

test("parse persistent skill level", () => {
  const result = parseMod("+1 Persistent Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "persistent" },
  ]);
});

test("parse erosion skill level", () => {
  const result = parseMod("+2 Erosion Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 2, skillLevelType: "erosion" },
  ]);
});

test("parse spell skill level", () => {
  const result = parseMod("+1 Spell Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "spell" },
  ]);
});

test("parse lightning skill level", () => {
  const result = parseMod("+2 Lightning Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 2, skillLevelType: "lightning" },
  ]);
});

test("parse all skills level", () => {
  const result = parseMod("+1 all skills' level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "all" },
  ]);
});

test("parse all skills levels with 'to' prefix", () => {
  const result = parseMod("+1 to All Skills' Levels");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "all" },
  ]);
});

test("parse main skill level per sealed life at full mana", () => {
  const result = parseMod(
    "For every 11% Life Sealed when at Full Mana, Main Skill's level +1",
  );
  expect(result).toEqual([
    {
      type: "SkillLevel",
      value: 1,
      skillLevelType: "main",
      per: { stackable: "sealed_life_pct", amt: 11 },
      cond: "has_full_mana",
    },
  ]);
});

test("parse cold skill level", () => {
  const result = parseMod("+1 Cold Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "cold" },
  ]);
});

test("parse fire skill level", () => {
  const result = parseMod("+1 Fire Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "fire" },
  ]);
});

test("parse melee skill level", () => {
  const result = parseMod("+1 Melee Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "melee" },
  ]);
});

test("parse minion skill level", () => {
  const result = parseMod("+1 Minion Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "minion" },
  ]);
});

test("parse mobility skill level", () => {
  const result = parseMod("+1 Mobility Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "mobility" },
  ]);
});

test("parse physical skill level", () => {
  const result = parseMod("+1 Physical Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "physical" },
  ]);
});

test("parse hero trait level", () => {
  const result = parseMod("+2 to Hero Trait Level");
  expect(result).toEqual([{ type: "HeroTraitLevel", value: 2 }]);
});

test("parse cold resistance", () => {
  const result = parseMod("+24% Cold Resistance");
  expect(result).toEqual([
    { type: "ResistancePct", value: 24, resType: "cold" },
  ]);
});

test("parse elemental resistance", () => {
  const result = parseMod("+10% Elemental Resistance");
  expect(result).toEqual([
    { type: "ResistancePct", value: 10, resType: "elemental" },
  ]);
});

test("parse elemental and erosion resistance", () => {
  const result = parseMod("+10% Elemental and Erosion Resistance");
  expect(result).toEqual([
    { type: "ResistancePct", value: 10, resType: "elemental" },
    { type: "ResistancePct", value: 10, resType: "erosion" },
  ]);
});

test("parse max elemental resistance", () => {
  const result = parseMod("+10% Max Elemental Resistance");
  expect(result).toEqual([
    { type: "MaxResistancePct", value: 10, resType: "elemental" },
  ]);
});

test("parse max elemental and erosion resistance", () => {
  const result = parseMod("+15% Max Elemental and Erosion Resistance");
  expect(result).toEqual([
    { type: "MaxResistancePct", value: 15, resType: "elemental" },
    { type: "MaxResistancePct", value: 15, resType: "erosion" },
  ]);
});

test("parse max fire resistance", () => {
  const result = parseMod("+3% Max Fire Resistance");
  expect(result).toEqual([
    { type: "MaxResistancePct", value: 3, resType: "fire" },
  ]);
});

test("parse erosion resistance per stack of repentance", () => {
  const result = parseMod("+3% Erosion Resistance per stack of Repentance");
  expect(result).toEqual([
    {
      type: "ResistancePct",
      value: 3,
      resType: "erosion",
      per: { stackable: "repentance" },
    },
  ]);
});

test("parse reap", () => {
  const result = parseMod(
    "Reaps 0.17 s of Damage Over Time when dealing Damage Over Time. The effect has a 1 s cooldown against the same target",
  );
  expect(result).toEqual([{ type: "Reap", duration: 0.17, cooldown: 1 }]);
});

test("parse reap with recovery time wording", () => {
  const result = parseMod(
    "Reaps 0.07 s of Damage Over Time when dealing Damage Over Time. The effect has a 1 s Recovery Time against the same target",
  );
  expect(result).toEqual([{ type: "Reap", duration: 0.07, cooldown: 1 }]);
});

test("parse reap when inflicting ignite", () => {
  const result = parseMod(
    "Reaps 0.04 s of Damage Over Time when inflicting Ignite. The effect has a 1 s Recovery Time against the same target",
  );
  expect(result).toEqual([{ type: "Reap", duration: 0.04, cooldown: 1 }]);
});

test("parse reap when inflicting trauma", () => {
  const result = parseMod(
    "Reaps 0.04 s of Damage Over Time when inflicting Trauma. The effect has a 1 s Recovery Time against the same target",
  );
  expect(result).toEqual([{ type: "Reap", duration: 0.04, cooldown: 1 }]);
});

test("parse reap when inflicting wilt", () => {
  const result = parseMod(
    "Reaps 0.04 s of Damage Over Time when inflicting Wilt. The effect has a 1 s Recovery Time against the same target",
  );
  expect(result).toEqual([{ type: "Reap", duration: 0.04, cooldown: 1 }]);
});

test("parse reaping duration", () => {
  const result = parseMod("+56% Reaping Duration");
  expect(result).toEqual([{ type: "ReapDurationPct", value: 56 }]);
});

test("parse reaping cooldown recovery speed", () => {
  const result = parseMod("+24% Reaping Cooldown Recovery Speed");
  expect(result).toEqual([{ type: "ReapCdrPct", value: 24, addn: false }]);
});

test("parse affliction inflicted per second", () => {
  const result = parseMod("+18 Affliction inflicted per second");
  expect(result).toEqual([{ type: "AfflictionInflictedPerSec", value: 18 }]);
});

test("parse affliction effect", () => {
  const result = parseMod("+18% Affliction Effect");
  expect(result).toEqual([
    { type: "AfflictionEffectPct", value: 18, addn: false },
  ]);
});

test("parse curse effect", () => {
  const result = parseMod("+4% Curse Effect");
  expect(result).toEqual([{ type: "CurseEffPct", value: 4, addn: false }]);
});

test("parse additional curse effect", () => {
  const result = parseMod("+4% additional Curse Effect");
  expect(result).toEqual([{ type: "CurseEffPct", value: 4, addn: true }]);
});

test("parse warcry effect", () => {
  const result = parseMod("+43% Warcry Effect");
  expect(result).toEqual([{ type: "WarcryEffPct", value: 43, addn: false }]);
});

test("parse additional warcry effect", () => {
  const result = parseMod("+6% additional Warcry Effect");
  expect(result).toEqual([{ type: "WarcryEffPct", value: 6, addn: true }]);
});

test("parse sage's insight fire", () => {
  const result = parseMod(
    "When a Spell hit inflicts Fire Damage, -15% Cold, Lightning, and Erosion Resistance for the target for 3 s",
  );
  expect(result).toEqual([
    {
      type: "EnemyRes",
      value: -15,
      resType: "cold",
      cond: "sages_insight_fire",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "lightning",
      cond: "sages_insight_fire",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "erosion",
      cond: "sages_insight_fire",
    },
  ]);
});

test("parse sage's insight cold", () => {
  const result = parseMod(
    "When a Spell hit inflicts Cold Damage, -15% Fire, Lightning, and Erosion Resistance for the target for 3 s",
  );
  expect(result).toEqual([
    {
      type: "EnemyRes",
      value: -15,
      resType: "fire",
      cond: "sages_insight_cold",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "lightning",
      cond: "sages_insight_cold",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "erosion",
      cond: "sages_insight_cold",
    },
  ]);
});

test("parse sage's insight lightning", () => {
  const result = parseMod(
    "When a Spell hit inflicts Lightning Damage, -15% Fire, Cold, and Erosion Resistance for the target for 3 s",
  );
  expect(result).toEqual([
    {
      type: "EnemyRes",
      value: -15,
      resType: "fire",
      cond: "sages_insight_lightning",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "cold",
      cond: "sages_insight_lightning",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "erosion",
      cond: "sages_insight_lightning",
    },
  ]);
});

test("parse sage's insight erosion", () => {
  const result = parseMod(
    "When a Spell hit inflicts Erosion Damage, -15% Fire, Cold, and Lightning Resistance for the target for 3 s",
  );
  expect(result).toEqual([
    {
      type: "EnemyRes",
      value: -15,
      resType: "fire",
      cond: "sages_insight_erosion",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "cold",
      cond: "sages_insight_erosion",
    },
    {
      type: "EnemyRes",
      value: -15,
      resType: "lightning",
      cond: "sages_insight_erosion",
    },
  ]);
});

test("parse all resistance reduction when enemy has max affliction", () => {
  const result = parseMod(
    "-8% All Resistance when the enemy has max Affliction",
  );
  expect(result).toEqual([
    {
      type: "EnemyRes",
      value: -8,
      resType: "fire",
      cond: "enemy_at_max_affliction",
    },
    {
      type: "EnemyRes",
      value: -8,
      resType: "cold",
      cond: "enemy_at_max_affliction",
    },
    {
      type: "EnemyRes",
      value: -8,
      resType: "lightning",
      cond: "enemy_at_max_affliction",
    },
    {
      type: "EnemyRes",
      value: -8,
      resType: "erosion",
      cond: "enemy_at_max_affliction",
    },
  ]);
});

test("parse skill area", () => {
  const result = parseMod("+15% Skill Area");
  expect(result).toEqual([
    {
      type: "SkillAreaPct",
      value: 15,
      skillAreaModType: "global",
      addn: false,
    },
  ]);
});

test("parse curse skill area", () => {
  const result = parseMod("+8% Curse Skill Area");
  expect(result).toEqual([
    { type: "SkillAreaPct", value: 8, skillAreaModType: "curse", addn: false },
  ]);
});

test("parse additional skill area", () => {
  const result = parseMod("+10% additional Skill Area");
  expect(result).toEqual([
    { type: "SkillAreaPct", value: 10, skillAreaModType: "global", addn: true },
  ]);
});

test("parse additional curse skill area", () => {
  const result = parseMod("+5% additional Curse Skill Area");
  expect(result).toEqual([
    { type: "SkillAreaPct", value: 5, skillAreaModType: "curse", addn: true },
  ]);
});

test("parse skill effect duration", () => {
  const result = parseMod("+2% Skill Effect Duration");
  expect(result).toEqual([{ type: "SkillEffDurationPct", value: 2 }]);
});

test("parse unsigned sealed mana compensation", () => {
  const result = parseMod("4.5% Sealed Mana Compensation");
  expect(result).toEqual([
    { type: "SealedManaCompPct", value: 4.5, addn: false },
  ]);
});

test("parse signed sealed mana compensation", () => {
  const result = parseMod("+9% Sealed Mana Compensation");
  expect(result).toEqual([
    { type: "SealedManaCompPct", value: 9, addn: false },
  ]);
});

test("parse sealed mana compensation for skill", () => {
  const result = parseMod("+13% Sealed Mana Compensation for Charged Flames");
  expect(result).toEqual([
    {
      type: "SealedManaCompPct",
      value: 13,
      addn: false,
      skillName: "Charged Flames",
    },
  ]);
});

test("parse additional skill-specific sealed mana compensation", () => {
  const result = parseMod("-20% additional Deep Pain Sealed Mana Compensation");
  expect(result).toEqual([
    {
      type: "SealedManaCompPct",
      value: -20,
      addn: true,
      skillName: "Deep Pain",
    },
  ]);
});

test("parse chance to gain blur when reaping", () => {
  const result = parseMod("+5% chance to gain Blur when Reaping");
  expect(result).toEqual([{ type: "GeneratesBlur", value: 5 }]);
});

test("parse gains focus blessing when reaping", () => {
  const result = parseMod("Gains 1 stack(s) of Focus Blessing when Reaping");
  expect(result).toEqual([{ type: "GeneratesFocusBlessing" }]);
});

test("parse gains repentance when gaining any blessing", () => {
  const result = parseMod(
    "Gains 1 stack of Repentance when gaining any Blessing",
  );
  expect(result).toEqual([{ type: "GeneratesRepentance", value: 1 }]);
});

test("parse gear energy shield", () => {
  const result = parseMod("+140 gear Energy Shield");
  expect(result).toEqual([{ type: "GearEnergyShield", value: 140 }]);
});

test("parse curse duration", () => {
  const result = parseMod("+100% Curse Duration");
  expect(result).toEqual([{ type: "CurseDurationPct", value: 100 }]);
});

test("parse gear evasion", () => {
  const result = parseMod("+1920 gear Evasion");
  expect(result).toEqual([{ type: "GearEvasion", value: 1920 }]);
});

test("parse armor and evasion", () => {
  const result = parseMod("+685 Armor and Evasion");
  expect(result).toEqual([
    { type: "Armor", value: 685 },
    { type: "Evasion", value: 685 },
  ]);
});

test("parse additional damage taken by enemies frozen by you recently", () => {
  const result = parseMod(
    "+10% additional damage taken by enemies Frozen by you recently",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 10,
      dmgModType: "global",
      addn: true,
      isEnemyDebuff: true,
      cond: "target_enemy_frozen_recently",
    },
  ]);
});

test("parse inflicts cold infiltration", () => {
  const result = parseMod(
    "Inflicts Cold Infiltration when dealing damage to Frozen enemies",
  );
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "cold" },
  ]);
});

test("parse chance to inflict frostbite", () => {
  const result = parseMod("+18% chance to inflict Frostbite");
  expect(result).toEqual([{ type: "InflictFrostbitePct", value: 18 }]);
});

test("parse freeze duration", () => {
  const result = parseMod("+36% Freeze Duration");
  expect(result).toEqual([{ type: "FreezeDurationPct", value: 36 }]);
});

test("parse gear armor", () => {
  const result = parseMod("+274 Gear Armor");
  expect(result).toEqual([{ type: "GearArmor", value: 274 }]);
});

test("parse energy shield charge speed", () => {
  const result = parseMod("+4% Energy Shield Charge Speed");
  expect(result).toEqual([{ type: "EnergyShieldChargeSpeedPct", value: 4 }]);
});

test("parse unsigned movement speed", () => {
  const result = parseMod("7.5% Movement Speed");
  expect(result).toEqual([
    { type: "MovementSpeedPct", value: 7.5, addn: false },
  ]);
});

test("parse elemental resistance per stats", () => {
  const result = parseMod("+1% Elemental Resistance per 40 stats");
  expect(result).toEqual([
    {
      type: "ResistancePct",
      value: 1,
      resType: "elemental",
      per: { stackable: "stat", amt: 40 },
    },
  ]);
});

test("parse damage per highest stat", () => {
  const result = parseMod("+1% damage per 20 of the highest stat");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 1,
      dmgModType: "global",
      addn: false,
      per: { stackable: "highest_stat", amt: 20 },
    },
  ]);
});

test("parse generates spell aggression on defeat", () => {
  const result = parseMod("25% chance to gain Spell Aggression on defeat");
  expect(result).toEqual([{ type: "GeneratesSpellAggression" }]);
});

test("parse gains spell aggression when casting spell skill", () => {
  const result = parseMod("Gains Spell Aggression when casting a Spell Skill");
  expect(result).toEqual([{ type: "GeneratesSpellAggression" }]);
});

test("parse spell aggression effect", () => {
  const result = parseMod("+22% Spell Aggression Effect");
  expect(result).toEqual([{ type: "SpellAggressionEffPct", value: 22 }]);
});

test("parse skill cost", () => {
  const result = parseMod("-4 Skill Cost");
  expect(result).toEqual([{ type: "SkillCost", value: -4 }]);
});

test("parse focus blessing duration", () => {
  const result = parseMod("+30% Focus Blessing Duration");
  expect(result).toEqual([{ type: "FocusBlessingDurationPct", value: 30 }]);
});

test("parse minion critical strike damage", () => {
  const result = parseMod("+15% Minion Critical Strike Damage");
  expect(result).toEqual([
    { type: "MinionCritDmgPct", value: 15, addn: false },
  ]);
});

test("parse minion cold penetration", () => {
  const result = parseMod("4.5% Cold Penetration for Minions");
  expect(result).toEqual([
    { type: "MinionResPenPct", value: 4.5, penType: "cold" },
  ]);
});

test("parse inflicts frail on spell hit", () => {
  const result = parseMod("Inflicts Frail on Spell hit");
  expect(result).toEqual([{ type: "InflictFrail" }]);
});

test("parse lucky damage with spell burst consumption", () => {
  const result = parseMod(
    "Damage becomes Lucky and at least 4 stack(s) of Spell Burst Charge is consumed when Spell Burst is activated",
  );
  expect(result).toEqual([{ type: "LuckyDmg" }]);
});

test("parse additional cold damage per stack of focus blessing", () => {
  const result = parseMod(
    "+13% additional Cold Damage for every stack of Focus Blessing",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 13,
      dmgModType: "cold",
      addn: true,
      per: { stackable: "focus_blessing" },
    },
  ]);
});

test("parse additional spell damage per stack of focus blessing owned", () => {
  const result = parseMod(
    "+3% additional Spell Damage per stack of Focus Blessing owned",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 3,
      dmgModType: "spell",
      addn: true,
      per: { stackable: "focus_blessing" },
    },
  ]);
});

test("parse blessing duration (all types)", () => {
  const result = parseMod("+30% Blessing Duration");
  expect(result).toEqual([
    { type: "FocusBlessingDurationPct", value: 30 },
    { type: "AgilityBlessingDurationPct", value: 30 },
    { type: "TenacityBlessingDurationPct", value: 30 },
  ]);
});

test("parse spell damage when having focus blessing", () => {
  const result = parseMod("+30% Spell Damage when having Focus Blessing");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 30,
      dmgModType: "spell",
      addn: false,
      cond: "has_focus_blessing",
    },
  ]);
});

test("parse generates focus blessing when activating spell burst", () => {
  const result = parseMod(
    "Gains 1 stack(s) of Focus Blessing when activating Spell Burst",
  );
  expect(result).toEqual([{ type: "GeneratesFocusBlessing" }]);
});

test("parse cast speed when focus blessing is active", () => {
  const result = parseMod("+12% Cast Speed when Focus Blessing is active");
  expect(result).toEqual([
    { type: "CspdPct", value: 12, addn: false, cond: "has_focus_blessing" },
  ]);
});

test("parse multistrikes deal increasing damage", () => {
  const result = parseMod("Multistrikes deal 55% increasing damage");
  expect(result).toEqual([{ type: "MultistrikeIncDmgPct", value: 55 }]);
});

test("parse additional hit damage for skills cast by spell burst", () => {
  const result = parseMod(
    "+36% additional Hit Damage for skills cast by Spell Burst",
  );
  expect(result).toEqual([
    { type: "SpellBurstAdditionalDmgPct", value: 36, addn: true },
  ]);
});

test("parse spell ripple", () => {
  const result = parseMod(
    "Spell Skills on hit have a 50% chance to spawn a Pulse, dealing True Damage equal to 100% of Hit Damage. Interval: 0.03s",
  );
  expect(result).toEqual([
    { type: "SpellRipple", chancePct: 50, pctOfHitDmg: 100 },
  ]);
});

test("parse jumps", () => {
  const result = parseMod("+1 Jumps");
  expect(result).toEqual([{ type: "Jump", value: 1 }]);
});

test("parse inflict paralysis chance (cursed target)", () => {
  const result = parseMod(
    "Upon dealing damage to a Cursed target, there is a +25% chance to Paralyze it",
  );
  expect(result).toEqual([{ type: "InflictParalysisPct", value: 25 }]);
});

test("parse generates agility blessing on crit", () => {
  const result = parseMod(
    "100% chance to gain Agility Blessing on Critical Strike",
  );
  expect(result).toEqual([{ type: "GeneratesAgilityBlessing" }]);
});

test("parse generates blur on crowd control", () => {
  const result = parseMod(
    "+10% chance to gain Blur when inflicting crowd control effects",
  );
  expect(result).toEqual([{ type: "GeneratesBlur", value: 10 }]);
});

test("parse numbed effect", () => {
  const result = parseMod("+18% Numbed effect");
  expect(result).toEqual([{ type: "NumbedEffPct", value: 18 }]);
});

test("parse numbed chance", () => {
  const result = parseMod("+36% Numbed chance");
  expect(result).toEqual([{ type: "NumbedChancePct", value: 36 }]);
});

test("parse mana regen with focus blessing condition", () => {
  const result = parseMod(
    "Regenerates 0.4% Mana per second when Focus Blessing is active",
  );
  expect(result).toEqual([
    { type: "ManaRegenPerSecPct", value: 0.4, cond: "has_focus_blessing" },
  ]);
});

test("parse standalone damage taken from cursed enemies", () => {
  const result = parseMod("-2% additional damage taken from Cursed enemies");
  expect(result).toEqual([
    { type: "DmgTakenPct", value: -2, cond: "enemy_is_cursed" },
  ]);
});

test("parse additional skill cost", () => {
  const result = parseMod("+25% additional Skill Cost");
  expect(result).toEqual([{ type: "SkillCostPct", value: 25, addn: true }]);
});

test("parse lucky damage against numbed enemies", () => {
  const result = parseMod(
    "You and Minions deal Lucky Damage against Numbed enemies",
  );
  expect(result).toEqual([{ type: "LuckyDmg", cond: "enemy_numbed" }]);
});

test("parse numbed chance and effect combined", () => {
  const result = parseMod("+15% Numbed chance, and 7.5% Numbed Effect");
  expect(result).toEqual([
    { type: "NumbedChancePct", value: 15 },
    { type: "NumbedEffPct", value: 7.5 },
  ]);
});

test("parse mark effect", () => {
  const result = parseMod("+20% Mark effect");
  expect(result).toEqual([{ type: "MarkEffPct", value: 20 }]);
});

test("parse chance to mark on critical strike", () => {
  const result = parseMod("+25% chance to Mark the enemy on Critical Strike");
  expect(result).toEqual([{ type: "InflictsMark" }]);
});

test("parse chance to inflict trauma", () => {
  const result = parseMod("+6% chance to inflict Trauma");
  expect(result).toEqual([{ type: "InflictTrauma" }]);
});

test("parse chance for minions to inflict trauma", () => {
  const result = parseMod("+10% chance for Minions to inflict Trauma");
  expect(result).toEqual([{ type: "InflictTrauma" }]);
});

test("parse trauma damage", () => {
  const result = parseMod("+8% Trauma Damage");
  expect(result).toEqual([{ type: "TraumaDmgPct", value: 8, addn: false }]);
});

test("parse minions deal additional damage to life", () => {
  const result = parseMod("Minions deal 8% additional damage to Life");
  expect(result).toEqual([{ type: "MinionDmgPct", value: 8, addn: true }]);
});

test("parse elemental and erosion resistance penetration for minions", () => {
  const result = parseMod(
    "+8% Elemental and Erosion Resistance Penetration for Minions",
  );
  expect(result).toEqual([
    { type: "MinionResPenPct", value: 8, penType: "all" },
  ]);
});

test("parse armor dmg mitigation penetration for minions", () => {
  const result = parseMod("+7% Armor DMG Mitigation Penetration for Minions");
  expect(result).toEqual([{ type: "MinionArmorPenPct", value: 7 }]);
});

test("parse additional max damage", () => {
  const result = parseMod("+6% additional max damage");
  expect(result).toEqual([{ type: "AddnMaxDmgPct", value: 6, addn: true }]);
});

test("parse additional max damage for minions", () => {
  const result = parseMod("+6% additional Max Damage for Minions");
  expect(result).toEqual([{ type: "AddnMaxMinionDmgPct", value: 6 }]);
});

test("parse additional damage after using mobility skills", () => {
  const result = parseMod(
    "+10% additional damage for 4s after using Mobility Skills",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 10,
      dmgModType: "global",
      addn: true,
      cond: "has_used_mobility_skill_recently",
    },
  ]);
});

test("parse attack and spell critical strike rating", () => {
  const result = parseMod("+97 Attack and Spell Critical Strike Rating");
  expect(result).toEqual([
    { type: "FlatCritRating", value: 97, modType: "attack" },
    { type: "FlatCritRating", value: 97, modType: "spell" },
  ]);
});

test("parse inflicts cold infiltration when dealing damage", () => {
  const result = parseMod(
    "Inflicts Cold Infiltration when dealing damage. Interval for each enemy: 1 s",
  );
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "cold" },
  ]);
});

test("parse inflicts lightning infiltration when dealing damage", () => {
  const result = parseMod(
    "Inflicts Lightning Infiltration when dealing damage. Interval for each enemy: 2 s",
  );
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "lightning" },
  ]);
});

test("parse inflicts fire infiltration when dealing damage", () => {
  const result = parseMod(
    "Inflicts Fire Infiltration when dealing damage. Interval for each enemy: 1 s",
  );
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "fire" },
  ]);
});

test("parse minion inflicts cold infiltration", () => {
  const result = parseMod(
    "When Minions deal damage, inflicts Cold Infiltration. Interval for each enemy: 1 s",
  );
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "cold" },
  ]);
});

test("parse minion inflicts fire infiltration", () => {
  const result = parseMod(
    "When Minions deal damage, inflicts Fire Infiltration. Interval for each enemy: 1 s",
  );
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "fire" },
  ]);
});

test("parse when dealing damage inflicts fire infiltration", () => {
  const result = parseMod(
    "When dealing damage, inflicts Fire Infiltration. Interval for each enemy: 1 s",
  );
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "fire" },
  ]);
});

test("parse cold infiltration effect", () => {
  const result = parseMod("+11% Cold Infiltration Effect");
  expect(result).toEqual([
    { type: "InfiltrationEffPct", value: 11, infiltrationType: "cold" },
  ]);
});

test("parse lightning infiltration effect", () => {
  const result = parseMod("+15% Lightning Infiltration Effect");
  expect(result).toEqual([
    { type: "InfiltrationEffPct", value: 15, infiltrationType: "lightning" },
  ]);
});

test("parse additional damage on critical strike", () => {
  const result = parseMod("+10% additional damage on Critical Strike");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 10, modType: "global", addn: true },
  ]);
});

test("parse damage on critical strike (non-additional)", () => {
  const result = parseMod("+15% damage on Critical Strike");
  expect(result).toEqual([
    { type: "CritDmgPct", value: 15, modType: "global", addn: false },
  ]);
});

test("parse attack/cast/movement speed when having hasten", () => {
  const result = parseMod(
    "+8% Attack Speed, Cast Speed, and Movement Speed when having Hasten",
  );
  expect(result).toEqual([
    { type: "AspdPct", value: 8, addn: false, cond: "has_hasten" },
    { type: "CspdPct", value: 8, addn: false, cond: "has_hasten" },
    { type: "MovementSpeedPct", value: 8, addn: false, cond: "has_hasten" },
  ]);
});

test("parse gear energy shield percentage", () => {
  const result = parseMod("+50% gear Energy Shield");
  expect(result).toEqual([{ type: "GearEnergyShieldPct", value: 50 }]);
});

test("parse damage per stats", () => {
  const result = parseMod("+1% damage per 12 stats");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 1,
      dmgModType: "global",
      addn: false,
      per: { stackable: "stat", amt: 12 },
    },
  ]);
});

test("parse generates barrier", () => {
  const result = parseMod(
    "100% chance to gain a Barrier for every 5 m you move",
  );
  expect(result).toEqual([{ type: "GeneratesBarrier" }]);
});

test("parse origin of spirit magus effect", () => {
  const result = parseMod("+15% Origin of Spirit Magus effect");
  expect(result).toEqual([
    { type: "SpiritMagusOriginEffPct", value: 15, addn: false },
  ]);
});

test("parse additional origin of spirit magus effect", () => {
  const result = parseMod("+30% additional Origin of Spirit Magus Effect");
  expect(result).toEqual([
    { type: "SpiritMagusOriginEffPct", value: 30, addn: true },
  ]);
});

test("parse joined force disable offhand", () => {
  const result = parseMod(
    "Off-Hand Weapons do not participate in Attacks while Dual Wielding",
  );
  expect(result).toEqual([{ type: "JoinedForceDisableOffhand" }]);
});

test("parse joined force add offhand to mainhand", () => {
  const result = parseMod(
    "Adds 60% of the damage of the Off-Hand Weapon to the final damage of the Main-Hand Weapon",
  );
  expect(result).toEqual([
    { type: "JoinedForceAddOffhandToMainhandPct", value: 60 },
  ]);
});

test("parse attack skill level", () => {
  const result = parseMod("+1 to Attack Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 1, skillLevelType: "attack" },
  ]);
});

test("parse additional attack speed while dual wielding", () => {
  const result = parseMod("+6% additional Attack Speed while Dual Wielding");
  expect(result).toEqual([
    { type: "AspdPct", value: 6, addn: true, cond: "is_dual_wielding" },
  ]);
});

test("parse generates fortitude when using melee skill", () => {
  const result = parseMod(
    "Gains a stack of Fortitude when using a Melee Skill",
  );
  expect(result).toEqual([{ type: "GeneratesFortitude" }]);
});

test("parse combined additional damage and minion damage", () => {
  const result = parseMod(
    "+7% additional damage; +7% additional Minion Damage",
  );
  expect(result).toEqual([
    { type: "DmgPct", value: 7, dmgModType: "global", addn: true },
    { type: "MinionDmgPct", value: 7, addn: true },
  ]);
});

test("parse attack skills double damage chance", () => {
  const result = parseMod("Attack Skills: a +4% chance to deal Double Damage");
  expect(result).toEqual([
    { type: "DoubleDmgChancePct", value: 4, doubleDmgModType: "attack" },
  ]);
});

test("parse attack damage when dual wielding", () => {
  const result = parseMod("+27% Attack Damage when Dual Wielding");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 27,
      dmgModType: "attack",
      addn: false,
      cond: "is_dual_wielding",
    },
  ]);
});

test("parse attack aggression on defeat", () => {
  const result = parseMod("25% chance to gain Attack Aggression on defeat");
  expect(result).toEqual([{ type: "GeneratesAttackAggression" }]);
});

test("parse additional damage if recently moved", () => {
  const result = parseMod(
    "+30% additional damage if you have recently moved more than 5 m",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 30,
      dmgModType: "global",
      addn: true,
      cond: "has_moved_recently",
    },
  ]);
});

test("parse inflicts lightning infiltration on critical strike", () => {
  const result = parseMod("Inflicts Lightning Infiltration on Critical Strike");
  expect(result).toEqual([
    { type: "InflictsInfiltration", infiltrationType: "lightning" },
  ]);
});

test("parse conductive", () => {
  const result = parseMod(
    "Changes the base effect of Numbed to: +11% additional Lightning Damage taken",
  );
  expect(result).toEqual([{ type: "Conductive", value: 11 }]);
});

test("parse additional min damage", () => {
  const result = parseMod("-40% additional min damage");
  expect(result).toEqual([{ type: "AddnMinDmgPct", value: -40, addn: true }]);
});

test("parse combined additional min and max physical damage", () => {
  const result = parseMod(
    "-90% additional Min Physical Damage, and +80% additional Max Physical Damage",
  );
  expect(result).toEqual([
    { type: "AddnMinDmgPct", value: -90, addn: true, dmgType: "physical" },
    { type: "AddnMaxDmgPct", value: 80, addn: true, dmgType: "physical" },
  ]);
});

test("parse generates agility blessing when using mobility skills", () => {
  const result = parseMod(
    "Gains a stack Agility Blessing when using Mobility Skills",
  );
  expect(result).toEqual([{ type: "GeneratesAgilityBlessing" }]);
});

test("parse inflicts numbed stacks", () => {
  const result = parseMod("Inflicts 1 additional stack(s) of Numbed");
  expect(result).toEqual([{ type: "InflictNumbed" }]);
});

test("parse unsigned projectile speed", () => {
  const result = parseMod("4.5% Projectile Speed");
  expect(result).toEqual([
    { type: "ProjectileSpeedPct", value: 4.5, addn: false },
  ]);
});

test("parse tradeoff dex >= str attack speed", () => {
  const result = parseMod(
    "+20% additional Attack Speed when Dexterity is no less than Strength",
  );
  expect(result).toEqual([{ type: "TradeoffDexGteStrAspdPct", value: 20 }]);
});

test("parse tradeoff str >= dex attack damage", () => {
  const result = parseMod(
    "+25% additional Attack Damage when Strength is no less than Dexterity",
  );
  expect(result).toEqual([{ type: "TradeoffStrGteDexDmgPct", value: 25 }]);
});

test("parse additional lightning damage against numbed enemies", () => {
  const result = parseMod(
    "+35% additional Lightning Damage against Numbed enemies",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 35,
      dmgModType: "lightning",
      addn: true,
      cond: "enemy_numbed",
    },
  ]);
});

test("parse additional max lightning damage with numbed threshold", () => {
  const result = parseMod(
    "+35% additional Max Lightning Damage to an enemy when they have at least 8 stack(s) of Numbed",
  );
  expect(result).toEqual([
    {
      type: "AddnMaxDmgPct",
      value: 35,
      addn: true,
      dmgType: "lightning",
      condThreshold: {
        target: "enemy_numbed_stacks",
        comparator: "gte",
        value: 8,
      },
    },
  ]);
});

test("parse inflicts numbed per numbed chance", () => {
  const result = parseMod(
    "Inflicts 1 additional stack(s) of Numbed per +30% Numbed chance",
  );
  expect(result).toEqual([{ type: "InflictNumbed" }]);
});

test("parse additional numbed effect on critical strike", () => {
  const result = parseMod(
    "+24% additional Numbed Effect on Critical Strike with Lightning Damage for 2 s",
  );
  expect(result).toEqual([
    { type: "NumbedEffPct", value: 24, cond: "has_crit_recently" },
  ]);
});

test("parse gear attack critical strike rating", () => {
  const result = parseMod("+40% Attack Critical Strike Rating for this gear");
  expect(result).toEqual([{ type: "GearCritRatingPct", value: 40 }]);
});

test("parse gear critical strike rating (global)", () => {
  const result = parseMod("+25% Critical Strike Rating for this gear");
  expect(result).toEqual([{ type: "GearCritRatingPct", value: 25 }]);
});

test("parse flat gear lightning damage", () => {
  const result = parseMod("Adds 16 - 278 Lightning Damage to the gear");
  expect(result).toEqual([
    { type: "FlatGearDmg", value: { min: 16, max: 278 }, modType: "lightning" },
  ]);
});

test("parse flat gear physical damage", () => {
  const result = parseMod("Adds 10 - 50 Physical Damage to the gear");
  expect(result).toEqual([
    { type: "FlatGearDmg", value: { min: 10, max: 50 }, modType: "physical" },
  ]);
});

test("parse flat gear elemental damage", () => {
  const result = parseMod("Adds 5 - 100 Elemental Damage to the gear");
  expect(result).toEqual([
    { type: "FlatGearDmg", value: { min: 5, max: 100 }, modType: "elemental" },
  ]);
});

test("parse flat gear fire damage", () => {
  const result = parseMod("Adds 20 - 60 Fire Damage to the gear");
  expect(result).toEqual([
    { type: "FlatGearDmg", value: { min: 20, max: 60 }, modType: "fire" },
  ]);
});

test("parse flat gear cold damage", () => {
  const result = parseMod("Adds 30 - 80 Cold Damage to the gear");
  expect(result).toEqual([
    { type: "FlatGearDmg", value: { min: 30, max: 80 }, modType: "cold" },
  ]);
});

test("parse flat gear erosion damage", () => {
  const result = parseMod("Adds 15 - 45 Erosion Damage to the gear");
  expect(result).toEqual([
    { type: "FlatGearDmg", value: { min: 15, max: 45 }, modType: "erosion" },
  ]);
});

test("parse gear physical damage percent", () => {
  const result = parseMod("+94% Gear Physical Damage");
  expect(result).toEqual([{ type: "GearPhysDmgPct", value: 94 }]);
});

test("parse disable main stat damage", () => {
  const result = parseMod(
    "The main stat base no longer additionally increases damage",
  );
  expect(result).toEqual([{ type: "DisableMainStatDmg" }]);
});

test("parse additional lightning damage per dexterity", () => {
  const result = parseMod("+9% additional Lightning Damage per 10 Dexterity");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 9,
      dmgModType: "lightning",
      addn: true,
      per: { stackable: "dex", amt: 10 },
    },
  ]);
});

test("parse additional attack speed when performing multistrikes", () => {
  const result = parseMod(
    "+9% additional Attack Speed when performing Multistrikes",
  );
  expect(result).toEqual([
    { type: "AspdWhenMultistrikingPct", value: 9, addn: true },
  ]);
});

test("parse aura effect", () => {
  const result = parseMod("+10% Aura Effect");
  expect(result).toEqual([{ type: "AuraEffPct", value: 10, addn: false }]);
});

test("parse additional aura effect", () => {
  const result = parseMod("+15% additional Aura Effect");
  expect(result).toEqual([{ type: "AuraEffPct", value: 15, addn: true }]);
});

test("parse skill-specific aura effect without 'effect' suffix", () => {
  const result = parseMod("+25% Electric Conversion Aura");
  expect(result).toEqual([
    { type: "AuraEffPct", value: 25, skillName: "Electric Conversion" },
  ]);
});

test("parse skill-specific aura effect with 'effect' suffix", () => {
  const result = parseMod("+25% Precise Projectiles Aura effect");
  expect(result).toEqual([
    { type: "AuraEffPct", value: 25, skillName: "Precise Projectiles" },
  ]);
});

test("parse max mana + skill cost combo", () => {
  const result = parseMod("+10% Max Mana. +80 Skill Cost");
  expect(result).toEqual([
    { type: "MaxManaPct", value: 10, addn: false },
    { type: "SkillCost", value: 80 },
  ]);
});

test("parse additional projectile damage", () => {
  const result = parseMod("+10% additional Projectile Damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 10, dmgModType: "projectile", addn: true },
  ]);
});

test("parse projectile damage", () => {
  const result = parseMod("+100% Projectile Damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 100, dmgModType: "projectile", addn: false },
  ]);
});

test("parse projectile quantity +1", () => {
  const result = parseMod("Projectile Quantity +1");
  expect(result).toEqual([{ type: "Projectile", value: 1 }]);
});

test("parse projectile quantity +2", () => {
  const result = parseMod("Projectile Quantity +2");
  expect(result).toEqual([{ type: "Projectile", value: 2 }]);
});

test("parse nearby enemies within 15 m have frail", () => {
  const result = parseMod("Nearby enemies within 15 m have Frail");
  expect(result).toEqual([{ type: "InflictFrail" }]);
});

test("parse inflicts frail when dealing spell damage", () => {
  const result = parseMod("Inflicts Frail when dealing Spell Damage");
  expect(result).toEqual([{ type: "InflictFrail" }]);
});

test("parse main skill supported by single word skill", () => {
  const result = parseMod("Main Skill is supported by Lv. 25 Cataclysm");
  expect(result).toEqual([
    { type: "MainSkillSupportedBy", skillName: "Cataclysm", level: 25 },
  ]);
});

test("parse main skill supported by multi-word skill", () => {
  const result = parseMod("Main Skill is supported by Lv. 10 Chain Lightning");
  expect(result).toEqual([
    { type: "MainSkillSupportedBy", skillName: "Chain Lightning", level: 10 },
  ]);
});

test("parse main skill supported by Multistrike", () => {
  const result = parseMod("Main Skill is supported by Lv. 15 Multistrike");
  expect(result).toEqual([
    { type: "MainSkillSupportedBy", skillName: "Multistrike", level: 15 },
  ]);
});

test("parse main skill supported by with 'The' prefix", () => {
  const result = parseMod(
    "The Main Skill is supported by Lv. 25 Control Spell",
  );
  expect(result).toEqual([
    { type: "MainSkillSupportedBy", skillName: "Control Spell", level: 25 },
  ]);
});

test("parse main skill supported by with 'The' prefix and 'a' before level", () => {
  const result = parseMod(
    "The Main Skill is supported by a Lv. 25 Servant Damage",
  );
  expect(result).toEqual([
    { type: "MainSkillSupportedBy", skillName: "Servant Damage", level: 25 },
  ]);
});

test("parse triggers curse skill when minions deal damage", () => {
  const result = parseMod(
    "Triggers Lv. 20 Entangled Pain Curse when Minions deal damage. Cooldown: 0.2 s",
  );
  expect(result).toEqual([
    { type: "TriggersSkill", skillName: "Entangled Pain", level: 20 },
  ]);
});

test("parse triggers curse skill", () => {
  const result = parseMod(
    "Triggers Lv. 20 Timid Curse upon inflicting damage. Cooldown: 0.2 s",
  );
  expect(result).toEqual([
    { type: "TriggersSkill", skillName: "Timid", level: 20 },
  ]);
});

test("parse triggers skill upon starting to move", () => {
  const result = parseMod(
    "Triggers Lv. 3 Blurry Steps upon starting to move. Interval: 1 s",
  );
  expect(result).toEqual([
    { type: "TriggersSkill", skillName: "Blurry Steps", level: 3 },
  ]);
});

test("parse triggers multiple curse skills when minion deals damage", () => {
  const result = parseMod(
    "Triggers Lv. 10 Entangled Pain Curse and Timid Curse when a Minion deals damage. Cooldown: 1 s",
  );
  expect(result).toEqual([
    { type: "TriggersSkill", skillName: "Entangled Pain", level: 10 },
    { type: "TriggersSkill", skillName: "Timid", level: 10 },
  ]);
});

test("parse triggers skill while standing still", () => {
  const result = parseMod(
    "Triggers Lv. 16 Aim while standing still. Interval: 1 s",
  );
  expect(result).toEqual([
    { type: "TriggersSkill", skillName: "Aim", level: 16 },
  ]);
});

test("parse triggers skill when moving", () => {
  const result = parseMod(
    "Triggers Lv. 20 Dark Gate when moving. Interval: 4 s",
  );
  expect(result).toEqual([
    { type: "TriggersSkill", skillName: "Dark Gate", level: 20 },
  ]);
});

test("parse regenerates life per second (percentage)", () => {
  const result = parseMod("Regenerates 3% Life per second");
  expect(result).toEqual([{ type: "LifeRegenPerSecPct", value: 3 }]);
});

test("parse regenerates life per second (flat)", () => {
  const result = parseMod("Regenerates 139 Life per second");
  expect(result).toEqual([{ type: "FlatLifeRegenPerSec", value: 139 }]);
});

test("parse minion damage penetrates elemental resistance", () => {
  const result = parseMod("Minion Damage penetrates 14% Elemental Resistance");
  expect(result).toEqual([
    { type: "MinionResPenPct", value: 14, penType: "elemental" },
  ]);
});

test("parse min channeled stacks", () => {
  const result = parseMod("Min Channeled Stacks +1");
  expect(result).toEqual([{ type: "MinChannel", value: 1 }]);
});

test("parse max terra charge stacks", () => {
  const result = parseMod("Max Terra Charge Stacks -1");
  expect(result).toEqual([{ type: "MaxTerraChargeStack", value: -1 }]);
});

test("parse max terra quantity", () => {
  const result = parseMod("Max Terra Quantity +1");
  expect(result).toEqual([{ type: "MaxTerraQuant", value: 1 }]);
});

test("parse max sentry quantity", () => {
  const result = parseMod("Max Sentry Quantity +2");
  expect(result).toEqual([{ type: "MaxSentryQuant", value: 2 }]);
});

test("parse gains attack aggression when minions land critical strike", () => {
  const result = parseMod(
    "Gains Attack Aggression when Minions land a Critical Strike",
  );
  expect(result).toEqual([{ type: "GeneratesAttackAggression" }]);
});

test("parse gains attack aggression when casting attack skill", () => {
  const result = parseMod(
    "Gains Attack Aggression when casting an Attack Skill",
  );
  expect(result).toEqual([{ type: "GeneratesAttackAggression" }]);
});

test("parse mana regen while moving", () => {
  const result = parseMod("Regenerates 1% Mana per second while moving");
  expect(result).toEqual([
    { type: "ManaRegenPerSecPct", value: 1, cond: "is_moving" },
  ]);
});

test("parse life regen while moving (with 'of')", () => {
  const result = parseMod("Regenerates 1% of Life per second while moving");
  expect(result).toEqual([
    { type: "LifeRegenPerSecPct", value: 1, cond: "is_moving" },
  ]);
});

test("parse life regen while moving (without 'of')", () => {
  const result = parseMod("Regenerates 1% Life per second while moving");
  expect(result).toEqual([
    { type: "LifeRegenPerSecPct", value: 1, cond: "is_moving" },
  ]);
});

test("parse life regen when taking damage over time", () => {
  const result = parseMod(
    "Regenerates 10% Life per second when taking Damage Over Time",
  );
  expect(result).toEqual([
    { type: "LifeRegenPerSecPct", value: 10, cond: "taking_damage_over_time" },
  ]);
});

test("parse energy shield restore while moving", () => {
  const result = parseMod("Restores 2% Energy Shield per second while moving");
  expect(result).toEqual([
    { type: "EnergyShieldRegenPerSecPct", value: 2, cond: "is_moving" },
  ]);
});

test("parse command per second", () => {
  const result = parseMod("+10 Command per second");
  expect(result).toEqual([{ type: "CommandPerSec", value: 10 }]);
});

test("parse command per second with space after plus", () => {
  const result = parseMod("+ 12 Command per second");
  expect(result).toEqual([{ type: "CommandPerSec", value: 12 }]);
});

test("parse minion double damage chance", () => {
  const result = parseMod("+25% chance for Minions to deal Double Damage");
  expect(result).toEqual([{ type: "MinionDoubleDmgChancePct", value: 25 }]);
});

test("parse additional damage against frozen enemies", () => {
  const result = parseMod("+21% additional damage against Frozen enemies");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 21,
      dmgModType: "global",
      addn: true,
      cond: "enemy_frozen",
    },
  ]);
});

test("parse attack speed and movement speed per block", () => {
  const result = parseMod(
    "+1% Attack Speed and Movement Speed for every 6% of Attack or Spell Block",
  );
  expect(result).toEqual([
    {
      type: "AspdPct",
      value: 1,
      addn: false,
      per: { stackable: "total_block_pct", amt: 6 },
    },
    {
      type: "MovementSpeedPct",
      value: 1,
      addn: false,
      per: { stackable: "total_block_pct", amt: 6 },
    },
  ]);
});

test("parse max fortitude stacks", () => {
  const result = parseMod("+1 Max Fortitude Stacks");
  expect(result).toEqual([{ type: "MaxFortitudeStack", value: 1 }]);
});

test("parse additional armor while moving", () => {
  const result = parseMod("+10% additional Armor while moving");
  expect(result).toEqual([
    { type: "ArmorPct", value: 10, addn: true, cond: "is_moving" },
  ]);
});

test("parse additional evasion while moving", () => {
  const result = parseMod("+10% additional Evasion while moving");
  expect(result).toEqual([
    { type: "EvasionPct", value: 10, addn: true, cond: "is_moving" },
  ]);
});

test("parse chance to gain focus blessing when casting summon skill", () => {
  const result = parseMod(
    "+100% chance to gain 1 stack of Focus Blessing when casting a Summon Skill. Interval: 1 s",
  );
  expect(result).toEqual([{ type: "GeneratesFocusBlessing" }]);
});

test("parse chance to gain tenacity blessing when casting skill", () => {
  const result = parseMod(
    "+100% chance to gain 1 stack of Tenacity Blessing when casting a skill. Interval: 1 s",
  );
  expect(result).toEqual([{ type: "GeneratesTenacityBlessing" }]);
});

test("parse chance to gain fortitude when using melee skill", () => {
  const result = parseMod(
    "+100% chance to gain a stack of Fortitude when using a Melee Skill",
  );
  expect(result).toEqual([{ type: "GeneratesFortitude" }]);
});

test("parse flat minion critical strike rating", () => {
  const result = parseMod("+107 Minion Critical Strike Rating");
  expect(result).toEqual([{ type: "MinionFlatCritRating", value: 107 }]);
});

test("parse reaping recovery speed", () => {
  const result = parseMod("+107% Reaping Recovery Speed");
  expect(result).toEqual([{ type: "ReapCdrPct", value: 107, addn: false }]);
});

test("parse cooldown recovery speed", () => {
  const result = parseMod("+12% Cooldown Recovery Speed");
  expect(result).toEqual([{ type: "CdrPct", value: 12 }]);
});

test("parse ailment duration", () => {
  const result = parseMod("+12% Ailment Duration");
  expect(result).toEqual([{ type: "AilmentDurationPct", value: 12 }]);
});

test("parse energy shield regain (signed)", () => {
  const result = parseMod("+12% Energy Shield Regain");
  expect(result).toEqual([{ type: "EnergyShieldRegainPct", value: 12 }]);
});

test("parse life regain (signed)", () => {
  const result = parseMod("+12% Life Regain");
  expect(result).toEqual([{ type: "LifeRegainPct", value: 12 }]);
});

test("parse steep strike chance (signed with period)", () => {
  const result = parseMod("+12% Steep Strike chance.");
  expect(result).toEqual([{ type: "SteepStrikeChancePct", value: 12 }]);
});

test("parse convert damage taken", () => {
  const result = parseMod(
    "Converts 14% of Physical Damage taken to Cold Damage",
  );
  expect(result).toEqual([
    { type: "ConvertDmgTakenPct", value: 14, from: "physical", to: "cold" },
  ]);
});

test("parse flat damage to minions", () => {
  const result = parseMod("Adds 83 - 110 Fire Damage to Minions");
  expect(result).toEqual([
    { type: "FlatDmgToMinions", value: { min: 83, max: 110 }, dmgType: "fire" },
  ]);
});

test("parse base wilt damage", () => {
  const result = parseMod("Adds 56 - 70 Base Wilt Damage");
  expect(result).toEqual([{ type: "BaseWiltFlatDmg", value: 63 }]);
});

test("parse base trauma damage", () => {
  const result = parseMod("Adds 360 - 840 Base Trauma Damage");
  expect(result).toEqual([{ type: "BaseTraumaFlatDmg", value: 600 }]);
});

test("parse base ignite damage", () => {
  const result = parseMod("Adds 250 - 470 Base Ignite Damage");
  expect(result).toEqual([{ type: "BaseIgniteFlatDmg", value: 360 }]);
});

test("parse generates blur from movement", () => {
  const result = parseMod("50% chance to gain Blur per 8 m you move");
  expect(result).toEqual([{ type: "GeneratesBlur", value: 50 }]);
});

test("parse mana before life", () => {
  const result = parseMod("18% of damage is taken from Mana before life");
  expect(result).toEqual([{ type: "ManaBeforeLifePct", value: 18 }]);
});

test("parse wilt duration", () => {
  const result = parseMod("+56% Wilt Duration");
  expect(result).toEqual([{ type: "WiltDurationPct", value: 56 }]);
});

test("parse trauma duration", () => {
  const result = parseMod("+56% Trauma Duration");
  expect(result).toEqual([{ type: "TraumaDurationPct", value: 56 }]);
});

test("parse ignite duration", () => {
  const result = parseMod("+56% Ignite Duration");
  expect(result).toEqual([
    { type: "IgniteDurationPct", value: 56, addn: false },
  ]);
});

test("parse additional steep strike damage", () => {
  const result = parseMod("+56% additional Steep Strike Damage");
  expect(result).toEqual([
    { type: "SteepStrikeDmgPct", value: 56, addn: true },
  ]);
});

test("parse steep strike damage (non-additional)", () => {
  const result = parseMod("+56% Steep Strike Damage");
  expect(result).toEqual([
    { type: "SteepStrikeDmgPct", value: 56, addn: false },
  ]);
});

test("parse additional wilt damage", () => {
  const result = parseMod("+52% additional Wilt Damage");
  expect(result).toEqual([{ type: "WiltDmgPct", value: 52, addn: true }]);
});

test("parse additional trauma damage", () => {
  const result = parseMod("+52% additional Trauma Damage");
  expect(result).toEqual([{ type: "TraumaDmgPct", value: 52, addn: true }]);
});

test("parse additional ignite damage", () => {
  const result = parseMod("+52% additional Ignite Damage");
  expect(result).toEqual([{ type: "IgniteDmgPct", value: 52, addn: true }]);
});

test("parse sweep slash damage", () => {
  const result = parseMod("+56% additional Sweep Slash Damage");
  expect(result).toEqual([{ type: "SweepSlashDmgPct", value: 56, addn: true }]);
});

// Immunity mods
test("parse immune to blinding", () => {
  const result = parseMod("Immune to Blinding");
  expect(result).toEqual([{ type: "ImmuneToBlinding" }]);
});

test("parse immune to elemental ailments", () => {
  const result = parseMod("Immune to Elemental Ailments");
  expect(result).toEqual([{ type: "ImmuneToElementalAilments" }]);
});

test("parse immune to frostbite", () => {
  const result = parseMod("Immune to Frostbite");
  expect(result).toEqual([{ type: "ImmuneToFrostbite" }]);
});

test("parse immune to ignite", () => {
  const result = parseMod("Immune to Ignite");
  expect(result).toEqual([{ type: "ImmuneToIgnite" }]);
});

test("parse immune to numbed", () => {
  const result = parseMod("Immune to Numbed");
  expect(result).toEqual([{ type: "ImmuneToNumbed" }]);
});

test("parse immune to paralysis", () => {
  const result = parseMod("Immune to Paralysis");
  expect(result).toEqual([{ type: "ImmuneToParalysis" }]);
});

test("parse immune to slow", () => {
  const result = parseMod("Immune to Slow");
  expect(result).toEqual([{ type: "ImmuneToSlow" }]);
});

test("parse immune to trauma", () => {
  const result = parseMod("Immune to Trauma");
  expect(result).toEqual([{ type: "ImmuneToTrauma" }]);
});

test("parse immune to weaken", () => {
  const result = parseMod("Immune to Weaken");
  expect(result).toEqual([{ type: "ImmuneToWeaken" }]);
});

test("parse immune to wilt", () => {
  const result = parseMod("Immune to Wilt");
  expect(result).toEqual([{ type: "ImmuneToWilt" }]);
});

test("parse immune to crowd control effects", () => {
  const result = parseMod("Immune to crowd control effects");
  expect(result).toEqual([{ type: "ImmuneToCrowdControl" }]);
});

test("parse immune to curse", () => {
  const result = parseMod("Immune to curse");
  expect(result).toEqual([{ type: "ImmuneToCurse" }]);
});

test("parse converts physical damage to cold damage", () => {
  const result = parseMod("Converts 50% of Physical Damage to Cold Damage");
  expect(result).toEqual([
    { type: "ConvertDmgPct", from: "physical", to: "cold", value: 50 },
  ]);
});

test("parse converts 100% physical to lightning", () => {
  const result = parseMod(
    "Converts 100% of Physical Damage to Lightning Damage",
  );
  expect(result).toEqual([
    { type: "ConvertDmgPct", from: "physical", to: "lightning", value: 100 },
  ]);
});

test("parse eliminates enemies under life threshold", () => {
  const result = parseMod(
    "Eliminates enemies under 15% Life upon inflicting damage",
  );
  expect(result).toEqual([{ type: "EliminationPct", value: 15 }]);
});

test("parse flat lightning damage to attacks per dexterity", () => {
  const result = parseMod(
    "Adds 1 - 7 Lightning Damage to Attacks per 10 Dexterity",
  );
  expect(result).toEqual([
    {
      type: "FlatDmgToAtks",
      value: { min: 1, max: 7 },
      dmgType: "lightning",
      per: { stackable: "dex", amt: 10 },
    },
  ]);
});

test("parse flat physical damage to attacks per armor", () => {
  const result = parseMod(
    "Adds 1 - 1 Physical Damage to Attacks per 2260 Armor",
  );
  expect(result).toEqual([
    {
      type: "FlatDmgToAtks",
      value: { min: 1, max: 1 },
      dmgType: "physical",
      per: { stackable: "armor", amt: 2260 },
    },
  ]);
});

test("parse minion elemental damage", () => {
  const result = parseMod("+66% Minion Elemental Damage");
  expect(result).toEqual([
    {
      type: "MinionDmgPct",
      value: 66,
      addn: false,
      minionDmgModType: "elemental",
    },
  ]);
});

test("parse physical damage for minions", () => {
  const result = parseMod("+66% Physical Damage for Minions");
  expect(result).toEqual([
    {
      type: "MinionDmgPct",
      value: 66,
      addn: false,
      minionDmgModType: "physical",
    },
  ]);
});

test("parse minion skill area", () => {
  const result = parseMod("+62% Minion Skill Area");
  expect(result).toEqual([{ type: "MinionSkillAreaPct", value: 62 }]);
});

test("parse minion max life", () => {
  const result = parseMod("+64% Minion Max Life");
  expect(result).toEqual([{ type: "MinionMaxLifePct", value: 64 }]);
});

test("parse terra charge recovery speed", () => {
  const result = parseMod("+44% Terra Charge Recovery Speed");
  expect(result).toEqual([{ type: "TerraChargeRecoverySpeedPct", value: 44 }]);
});

test("parse flat armor", () => {
  const result = parseMod("+860 Armor");
  expect(result).toEqual([{ type: "Armor", value: 860 }]);
});

test("parse flat evasion", () => {
  const result = parseMod("+860 Evasion");
  expect(result).toEqual([{ type: "Evasion", value: 860 }]);
});

test("parse cold penetration for minions (signed)", () => {
  const result = parseMod("+8% Cold Penetration for Minions");
  expect(result).toEqual([
    { type: "MinionResPenPct", value: 8, penType: "cold" },
  ]);
});

test("parse mana regeneration speed", () => {
  const result = parseMod("+70% Mana Regeneration Speed");
  expect(result).toEqual([{ type: "ManaRegenSpeedPct", value: 70 }]);
});

test("parse chance to gain agility blessing on defeat", () => {
  const result = parseMod(
    "+6% chance to gain 1 stack of Agility Blessing on defeat",
  );
  expect(result).toEqual([{ type: "GeneratesAgilityBlessing" }]);
});

test("parse chance to gain focus blessing on defeat", () => {
  const result = parseMod(
    "+6% chance to gain 1 stack of Focus Blessing on defeat",
  );
  expect(result).toEqual([{ type: "GeneratesFocusBlessing" }]);
});

test("parse chance to gain tenacity blessing on defeat", () => {
  const result = parseMod(
    "+6% chance to gain 1 stack of Tenacity Blessing on defeat",
  );
  expect(result).toEqual([{ type: "GeneratesTenacityBlessing" }]);
});

// Damage taken mods
test("parse DoT damage taken with armor threshold", () => {
  const result = parseMod(
    "-25% additional Damage Over Time taken when having at least 50000 Armor",
  );
  expect(result).toEqual([
    {
      type: "DmgTakenPct",
      value: -25,
      addn: true,
      dmgTakenType: "damage_over_time",
      condThreshold: { target: "armor", comparator: "gte", value: 50000 },
    },
  ]);
});

test("parse DoT damage taken with evasion threshold", () => {
  const result = parseMod(
    "-25% additional Damage Over Time taken when having at least 50000 Evasion",
  );
  expect(result).toEqual([
    {
      type: "DmgTakenPct",
      value: -25,
      addn: true,
      dmgTakenType: "damage_over_time",
      condThreshold: { target: "evasion", comparator: "gte", value: 50000 },
    },
  ]);
});

test("parse DoT damage taken with energy shield threshold", () => {
  const result = parseMod(
    "-25% additional Damage Over Time taken when you have at least 8000 Max Energy Shield",
  );
  expect(result).toEqual([
    {
      type: "DmgTakenPct",
      value: -25,
      addn: true,
      dmgTakenType: "damage_over_time",
      condThreshold: {
        target: "energy_shield",
        comparator: "gte",
        value: 8000,
      },
    },
  ]);
});

test("parse additional physical damage taken", () => {
  const result = parseMod("-11% additional Physical Damage taken");
  expect(result).toEqual([
    { type: "DmgTakenPct", value: -11, addn: true, dmgTakenType: "physical" },
  ]);
});

test("parse damage dealt by nearby enemies", () => {
  const result = parseMod("-13% additional Damage dealt by Nearby enemies");
  expect(result).toEqual([
    {
      type: "DmgTakenPct",
      value: -13,
      addn: true,
      cond: "target_enemy_is_nearby",
    },
  ]);
});

test("parse additional cold damage and penetration with focus blessing threshold", () => {
  const result = parseMod(
    "+7% additional Cold Damage and +14% Cold Penetration when you have at least 8 stack(s) of Focus Blessing",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 7,
      dmgModType: "cold",
      addn: true,
      condThreshold: { target: "focus_blessing", comparator: "gte", value: 8 },
    },
    {
      type: "ResPenPct",
      value: 14,
      penType: "cold",
      condThreshold: { target: "focus_blessing", comparator: "gte", value: 8 },
    },
  ]);
});

test("parse additional fire damage and penetration with tenacity blessing threshold", () => {
  const result = parseMod(
    "+7% additional Fire Damage and +14% Fire Penetration when you have at least 8 stack(s) of Tenacity Blessing",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 7,
      dmgModType: "fire",
      addn: true,
      condThreshold: {
        target: "tenacity_blessing",
        comparator: "gte",
        value: 8,
      },
    },
    {
      type: "ResPenPct",
      value: 14,
      penType: "fire",
      condThreshold: {
        target: "tenacity_blessing",
        comparator: "gte",
        value: 8,
      },
    },
  ]);
});

test("parse additional lightning damage and penetration with agility blessing threshold", () => {
  const result = parseMod(
    "+7% additional Lightning Damage and +14% Lightning Penetration when you have at least 8 stack(s) of Agility Blessing",
  );
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 7,
      dmgModType: "lightning",
      addn: true,
      condThreshold: {
        target: "agility_blessing",
        comparator: "gte",
        value: 8,
      },
    },
    {
      type: "ResPenPct",
      value: 14,
      penType: "lightning",
      condThreshold: {
        target: "agility_blessing",
        comparator: "gte",
        value: 8,
      },
    },
  ]);
});

test("parse support skill mana multiplier override", () => {
  const result = parseMod("Support Skill's Mana Multiplier is set to 95%.");
  expect(result).toEqual([
    { type: "OverrideSupportSkillManaMultPct", value: 95 },
  ]);
});

test("parse gains stacks of all blessings when casting restoration skill", () => {
  const result = parseMod(
    "Gains 1 stack(s) of all Blessings when casting a Restoration Skill",
  );
  expect(result).toEqual([
    { type: "GeneratesFocusBlessing" },
    { type: "GeneratesAgilityBlessing" },
    { type: "GeneratesTenacityBlessing" },
  ]);
});

test("parse unsigned additional damage taken", () => {
  const result = parseMod("-7% additional damage taken");
  expect(result).toEqual([{ type: "DmgTakenPct", value: -7, addn: true }]);
});

test("parse additional damage when channeling", () => {
  const result = parseMod("+70% additional damage when channeling");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 70,
      dmgModType: "global",
      addn: true,
      cond: "channeling",
    },
  ]);
});

test("parse additional damage taken at low mana", () => {
  const result = parseMod("-13% additional damage taken at Low Mana");
  expect(result).toEqual([
    { type: "DmgTakenPct", value: -13, addn: true, cond: "has_low_mana" },
  ]);
});

test("parse max frostbite rating", () => {
  const result = parseMod("+9 to Max Frostbite Rating");
  expect(result).toEqual([{ type: "MaxFrostbiteRating", value: 9 }]);
});

test("parse additional damage taken by nearby enemies", () => {
  const result = parseMod("+28% additional damage taken by Nearby enemies");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 28,
      dmgModType: "global",
      addn: true,
      isEnemyDebuff: true,
      cond: "target_enemy_is_nearby",
    },
  ]);
});

test("parse additional damage while having fervor", () => {
  const result = parseMod("+28% additional damage while having Fervor");
  expect(result).toEqual([
    {
      type: "DmgPct",
      value: 28,
      dmgModType: "global",
      addn: true,
      cond: "has_fervor",
    },
  ]);
});

test("parse chance to avoid elemental ailments", () => {
  const result = parseMod("+28% chance to avoid Elemental Ailments");
  expect(result).toEqual([
    { type: "AvoidElementalAilmentsChancePct", value: 28 },
  ]);
});

test("parse chance to avoid spell damage", () => {
  const result = parseMod("+28% chance to avoid Spell Damage");
  expect(result).toEqual([{ type: "AvoidSpellDmgChancePct", value: 28 }]);
});

test("parse additional max energy shield while moving", () => {
  const result = parseMod("+7% additional Max Energy Shield while moving");
  expect(result).toEqual([
    { type: "MaxEnergyShieldPct", value: 7, addn: true, cond: "is_moving" },
  ]);
});

test("parse knockback distance", () => {
  const result = parseMod("+69% Knockback distance");
  expect(result).toEqual([
    { type: "KnockbackDistancePct", value: 69, addn: false },
  ]);
});

test("parse additional knockback distance", () => {
  const result = parseMod("+50% additional Knockback distance");
  expect(result).toEqual([
    { type: "KnockbackDistancePct", value: 50, addn: true },
  ]);
});

test("parse xp earned", () => {
  const result = parseMod("+5% XP earned");
  expect(result).toEqual([{ type: "XPEarnedPct", value: 5 }]);
});

test("parse critical strike rating and damage per attack block", () => {
  const result = parseMod(
    "+5% Critical Strike Rating and Critical Strike Damage for every 5% of Attack Block",
  );
  expect(result).toEqual([
    {
      type: "CritRatingPct",
      value: 5,
      modType: "global",
      per: { stackable: "attack_block_pct", amt: 5 },
    },
    {
      type: "CritDmgPct",
      value: 5,
      modType: "global",
      addn: false,
      per: { stackable: "attack_block_pct", amt: 5 },
    },
  ]);
});

test("parse gear armor percentage", () => {
  const result = parseMod("+40% Gear Armor");
  expect(result).toEqual([{ type: "GearArmorPct", value: 40 }]);
});

test("parse gear evasion percentage", () => {
  const result = parseMod("+40% gear Evasion");
  expect(result).toEqual([{ type: "GearEvasionPct", value: 40 }]);
});

test("parse life regeneration speed", () => {
  const result = parseMod("+21% Life Regeneration Speed");
  expect(result).toEqual([{ type: "LifeRegenSpeedPct", value: 21 }]);
});

test("parse projectile skill level", () => {
  const result = parseMod("+2 Projectile Skill Level");
  expect(result).toEqual([
    { type: "SkillLevel", value: 2, skillLevelType: "projectile" },
  ]);
});

test("parse chance to blind the target on hit", () => {
  const result = parseMod("+18% chance to Blind the target on hit");
  expect(result).toEqual([{ type: "InflictsBlind" }]);
});

test("parse chance to mark the target on hit", () => {
  const result = parseMod("+18% chance to Mark the target on hit");
  expect(result).toEqual([{ type: "InflictsMark" }]);
});

test("parse chance to inflict paralysis on hit", () => {
  const result = parseMod("+18% chance to inflict Paralysis on hit");
  expect(result).toEqual([{ type: "InflictParalysisPct", value: 18 }]);
});

test("parse max life and max mana percentage", () => {
  const result = parseMod("+15% Max Life and Max Mana");
  expect(result).toEqual([
    { type: "MaxLifePct", value: 15, addn: false },
    { type: "MaxManaPct", value: 15, addn: false },
  ]);
});

test("parse chance to avoid elemental ailment", () => {
  const result = parseMod("+10% chance to avoid Elemental Ailment");
  expect(result).toEqual([
    { type: "AvoidElementalAilmentsChancePct", value: 10 },
  ]);
});

test("parse ranged damage", () => {
  const result = parseMod("+22% Ranged Damage");
  expect(result).toEqual([
    { type: "DmgPct", value: 22, dmgModType: "ranged", addn: false },
  ]);
});

test("parse critical strike damage mitigation", () => {
  const result = parseMod("+28% Critical Strike Damage Mitigation");
  expect(result).toEqual([
    { type: "CriticalStrikeDmgMitigationPct", value: 28 },
  ]);
});

test("parse minions can cast additional curses", () => {
  const result = parseMod("Minions can cast 1 additional Curse(s)");
  expect(result).toEqual([{ type: "AddnCurse", value: 1 }]);
});

test("parse gains spell aggression when minion spells crit", () => {
  const result = parseMod(
    "Gains Spell Aggression when Minion Spells land a Critical Strike",
  );
  expect(result).toEqual([{ type: "GeneratesSpellAggression" }]);
});

test("parse gains deflection when moving", () => {
  const result = parseMod(
    "For every 5 m moved, gains 1 stack(s) of Deflection",
  );
  expect(result).toEqual([{ type: "GeneratesDeflection" }]);
});

test("parse gains torment when reaping", () => {
  const result = parseMod("Gains a stack of Torment when Reaping");
  expect(result).toEqual([{ type: "GeneratesTorment" }]);
});

test("parse energy shield starts to charge when blocking (empty)", () => {
  const result = parseMod("Energy Shield starts to Charge when Blocking");
  expect(result).toEqual([]);
});

test("parse you can cast additional curses", () => {
  const result = parseMod("You can cast 1 additional Curse(s)");
  expect(result).toEqual([{ type: "AddnCurse", value: 1 }]);
});

test("parse restores energy shield on block (empty)", () => {
  const result = parseMod("Restores 3% Energy Shield on Block. Interval: 0.3s");
  expect(result).toEqual([]);
});

test("parse restores life on block (empty)", () => {
  const result = parseMod("Restores 3% Life on Block. Interval: 0.3s");
  expect(result).toEqual([]);
});

test("parse takes true damage (empty)", () => {
  const result = parseMod("Takes 10 True Damage every 0.1s");
  expect(result).toEqual([]);
});

test("parse warcry is cast immediately (empty)", () => {
  const result = parseMod("Warcry is cast immediately");
  expect(result).toEqual([]);
});

test("parse gains hasten when minions crit", () => {
  const result = parseMod("Gains Hasten when Minions land a Critical Strike");
  expect(result).toEqual([{ type: "GeneratesHasten" }]);
});
