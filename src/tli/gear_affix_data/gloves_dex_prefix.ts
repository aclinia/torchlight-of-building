import { BaseGearAffix } from "./types";

export const GLOVES_DEX_PREFIX_AFFIXES = [
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "0",
    template: "+{0}% additional Minion Damage when you have {1}Minion(s)",
    valueRanges: [
      {
        min: 26,
        max: 30,
      },
      {
        min: 1,
        max: 8,
      },
    ],
    rawAffix:
      "`+(26-30)`% additional Minion Damage when you have `(1-8)`Minion(s)",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "0",
    template:
      "+{0}% additional Cold Damage and +{1}% Cold Penetration when having at least 8stack(s) of Focus Blessing",
    valueRanges: [
      {
        min: 9,
        max: 10,
      },
      {
        min: 16,
        max: 18,
      },
    ],
    rawAffix:
      "`+(9-10)`% additional Cold Damage and `+(16-18)`% Cold Penetration when having at least `8`stack(s) of Focus Blessing",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "0",
    template:
      "+{0}% additional Fire Damage and +{1}% Fire Penetration when having at least 8stack(s) of Tenacity Blessing",
    valueRanges: [
      {
        min: 9,
        max: 10,
      },
      {
        min: 16,
        max: 18,
      },
    ],
    rawAffix:
      "`+(9-10)`% additional Fire Damage and `+(16-18)`% Fire Penetration when having at least `8`stack(s) of Tenacity Blessing",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "0",
    template:
      "+{0}% additional Lightning Damage and +{1}% Lightning Penetration when having at least 8stack(s) of Agility Blessing",
    valueRanges: [
      {
        min: 9,
        max: 10,
      },
      {
        min: 16,
        max: 18,
      },
    ],
    rawAffix:
      "`+(9-10)`% additional Lightning Damage and `+(16-18)`% Lightning Penetration when having at least `8`stack(s) of Agility Blessing",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "0",
    template: "+3Active Skill Level",
    valueRanges: [],
    rawAffix: "`+3`Active Skill Level",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "1",
    template: "+{0}% additional Minion Damage when you have {1}Minion(s)",
    valueRanges: [
      {
        min: 21,
        max: 25,
      },
      {
        min: 1,
        max: 8,
      },
    ],
    rawAffix:
      "`+(21-25)`% additional Minion Damage when you have `(1-8)`Minion(s)",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "1",
    template:
      "+{0}% additional Cold Damage and +{1}% Cold Penetration when having at least 8stack(s) of Focus Blessing",
    valueRanges: [
      {
        min: 6,
        max: 8,
      },
      {
        min: 12,
        max: 15,
      },
    ],
    rawAffix:
      "`+(6-8)`% additional Cold Damage and `+(12-15)`% Cold Penetration when having at least `8`stack(s) of Focus Blessing",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "1",
    template:
      "+{0}% additional Fire Damage and +{1}% Fire Penetration when having at least 8stack(s) of Tenacity Blessing",
    valueRanges: [
      {
        min: 6,
        max: 8,
      },
      {
        min: 12,
        max: 15,
      },
    ],
    rawAffix:
      "`+(6-8)`% additional Fire Damage and `+(12-15)`% Fire Penetration when having at least `8`stack(s) of Tenacity Blessing",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "1",
    template:
      "+{0}% additional Lightning Damage and +{1}% Lightning Penetration when having at least 8stack(s) of Agility Blessing",
    valueRanges: [
      {
        min: 6,
        max: 8,
      },
      {
        min: 12,
        max: 15,
      },
    ],
    rawAffix:
      "`+(6-8)`% additional Lightning Damage and `+(12-15)`% Lightning Penetration when having at least `8`stack(s) of Agility Blessing",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Ultimate",
    tier: "1",
    template: "+2Active Skill Level",
    valueRanges: [],
    rawAffix: "`+2`Active Skill Level",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "0",
    template: "Adds {0}% of Lightning Damage as Erosion Damage",
    valueRanges: [
      {
        min: 13,
        max: 16,
      },
    ],
    rawAffix: "Adds `(13-16)`% of Lightning Damage as Erosion Damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "0",
    template: "Adds {0}% of Physical Damage as Lightning Damage",
    valueRanges: [
      {
        min: 13,
        max: 16,
      },
    ],
    rawAffix: "Adds `(13-16)`% of Physical Damage as Lightning Damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "0",
    template: "Adds {0}- {1}Fire Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 54,
        max: 56,
      },
      {
        min: 71,
        max: 76,
      },
    ],
    rawAffix: "Adds `(54-56)`- `(71-76)`Fire Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "0",
    template: "Adds {0}- {1}Cold Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 55,
        max: 57,
      },
      {
        min: 73,
        max: 75,
      },
    ],
    rawAffix: "Adds `(55-57)`- `(73-75)`Cold Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "0",
    template: "Adds {0}- {1}Erosion Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 55,
        max: 57,
      },
      {
        min: 73,
        max: 75,
      },
    ],
    rawAffix: "Adds `(55-57)`- `(73-75)`Erosion Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "0",
    template: "Adds {0}- {1}Physical Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 58,
        max: 60,
      },
      {
        min: 71,
        max: 73,
      },
    ],
    rawAffix: "Adds `(58-60)`- `(71-73)`Physical Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "0",
    template: "Adds {0}- {1}Lightning Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 6,
        max: 8,
      },
      {
        min: 123,
        max: 125,
      },
    ],
    rawAffix: "Adds `(6-8)`- `(123-125)`Lightning Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "1",
    template: "Adds {0}- {1}Lightning Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 4,
        max: 6,
      },
      {
        min: 94,
        max: 96,
      },
    ],
    rawAffix: "Adds `(4-6)`- `(94-96)`Lightning Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "1",
    template: "Adds {0}- {1}Fire Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 42,
        max: 44,
      },
      {
        min: 54,
        max: 59,
      },
    ],
    rawAffix: "Adds `(42-44)`- `(54-59)`Fire Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "1",
    template: "Adds {0}- {1}Cold Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 42,
        max: 44,
      },
      {
        min: 56,
        max: 58,
      },
    ],
    rawAffix: "Adds `(42-44)`- `(56-58)`Cold Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "1",
    template: "Adds {0}- {1}Erosion Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 42,
        max: 44,
      },
      {
        min: 56,
        max: 58,
      },
    ],
    rawAffix: "Adds `(42-44)`- `(56-58)`Erosion Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "1",
    template: "Adds {0}- {1}Physical Damage to Attacks and Spells",
    valueRanges: [
      {
        min: 44,
        max: 46,
      },
      {
        min: 54,
        max: 56,
      },
    ],
    rawAffix: "Adds `(44-46)`- `(54-56)`Physical Damage to Attacks and Spells",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "1",
    template: "Adds {0}% of Lightning Damage as Erosion Damage",
    valueRanges: [
      {
        min: 9,
        max: 12,
      },
    ],
    rawAffix: "Adds `(9-12)`% of Lightning Damage as Erosion Damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Advanced",
    tier: "1",
    template: "Adds {0}% of Physical Damage as Lightning Damage",
    valueRanges: [
      {
        min: 9,
        max: 12,
      },
    ],
    rawAffix: "Adds `(9-12)`% of Physical Damage as Lightning Damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "0",
    template: "+{0}Max Mana",
    valueRanges: [
      {
        min: 121,
        max: 156,
      },
    ],
    rawAffix: "`+(121-156)`Max Mana",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "0",
    template: "+{0}Max Life",
    valueRanges: [
      {
        min: 221,
        max: 286,
      },
    ],
    rawAffix: "`+(221-286)`Max Life",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "0",
    template: "+{0}% Frostbite inflicted",
    valueRanges: [
      {
        min: 26,
        max: 37,
      },
    ],
    rawAffix: "`+(26-37)`% Frostbite inflicted",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "0",
    template: "+{0}gear Evasion",
    valueRanges: [
      {
        min: 2881,
        max: 3744,
      },
    ],
    rawAffix: "`+(2881-3744)`gear Evasion",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "0",
    template: "+{0}% Critical Strike Damage Mitigation",
    valueRanges: [
      {
        min: 61,
        max: 78,
      },
    ],
    rawAffix: "`+(61-78)`% Critical Strike Damage Mitigation",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "0",
    template: "+{0}% damage",
    valueRanges: [
      {
        min: 73,
        max: 94,
      },
    ],
    rawAffix: "`+(73-94)`% damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "0",
    template: "+{0}% Minion Damage",
    valueRanges: [
      {
        min: 73,
        max: 94,
      },
    ],
    rawAffix: "`+(73-94)`% Minion Damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "1",
    template: "+{0}Max Life",
    valueRanges: [
      {
        min: 155,
        max: 220,
      },
    ],
    rawAffix: "`+(155-220)`Max Life",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "1",
    template: "+{0}% Frostbite inflicted",
    valueRanges: [
      {
        min: 20,
        max: 25,
      },
    ],
    rawAffix: "`+(20-25)`% Frostbite inflicted",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "1",
    template: "+{0}gear Evasion",
    valueRanges: [
      {
        min: 2017,
        max: 2880,
      },
    ],
    rawAffix: "`+(2017-2880)`gear Evasion",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "1",
    template: "+{0}% Critical Strike Damage Mitigation",
    valueRanges: [
      {
        min: 43,
        max: 60,
      },
    ],
    rawAffix: "`+(43-60)`% Critical Strike Damage Mitigation",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "1",
    template: "+{0}% damage",
    valueRanges: [
      {
        min: 51,
        max: 72,
      },
    ],
    rawAffix: "`+(51-72)`% damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "1",
    template: "+{0}% Minion Damage",
    valueRanges: [
      {
        min: 51,
        max: 72,
      },
    ],
    rawAffix: "`+(51-72)`% Minion Damage",
  },
  {
    equipmentSlot: "Gloves",
    equipmentType: "Gloves (DEX)",
    affixType: "Prefix",
    craftingPool: "Basic",
    tier: "1",
    template: "+{0}Max Mana",
    valueRanges: [
      {
        min: 85,
        max: 120,
      },
    ],
    rawAffix: "`+(85-120)`Max Mana",
  },
] as const satisfies readonly BaseGearAffix[];

export type GlovesDexPrefixAffix = (typeof GLOVES_DEX_PREFIX_AFFIXES)[number];
