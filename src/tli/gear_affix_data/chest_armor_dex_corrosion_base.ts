import { BaseGearAffix } from "./types";

export const CHEST_ARMOR_DEX_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "{0}% additional Physical Damage taken",
    valueRanges: [
      {
        min: -6,
        max: -4,
      },
    ],
    rawAffix: "`(-6--4)`% additional Physical Damage taken",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Attack and Spell Block Chance while standing still",
    valueRanges: [
      {
        min: 10,
        max: 15,
      },
    ],
    rawAffix: "`+(10-15)`% Attack and Spell Block Chance while standing still",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Max Energy Shield",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`% Max Energy Shield",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Max Life",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`% Max Life",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Max Elemental Resistance",
    valueRanges: [
      {
        min: 3,
        max: 5,
      },
    ],
    rawAffix: "`+(3-5)`% Max Elemental Resistance",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% gear Evasion",
    valueRanges: [
      {
        min: 30,
        max: 50,
      },
    ],
    rawAffix: "`+(30-50)`% gear Evasion",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% damage",
    valueRanges: [
      {
        min: 50,
        max: 70,
      },
    ],
    rawAffix: "`+(50-70)`% damage",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Elemental and Erosion Resistance",
    valueRanges: [
      {
        min: 8,
        max: 10,
      },
    ],
    rawAffix: "`+(8-10)`% Elemental and Erosion Resistance",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+1Support Skill Level",
    valueRanges: [],
    rawAffix: "`+1`Support Skill Level",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+2Active Skill Level",
    valueRanges: [],
    rawAffix: "`+2`Active Skill Level",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "50% chance to gain Hardened when you are hit",
    valueRanges: [],
    rawAffix: "`50`% chance to gain Hardened when you are hit",
  },
  {
    equipmentSlot: "Chest Armor",
    equipmentType: "Chest Armor (DEX)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Immune to Elemental Ailments",
    valueRanges: [],
    rawAffix: "Immune to Elemental Ailments",
  },
] as const satisfies readonly BaseGearAffix[];

export type ChestArmorDexCorrosionBaseAffix =
  (typeof CHEST_ARMOR_DEX_CORROSION_BASE_AFFIXES)[number];
