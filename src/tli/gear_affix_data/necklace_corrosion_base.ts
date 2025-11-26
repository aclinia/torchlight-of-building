import { BaseGearAffix } from "./types";

export const NECKLACE_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Sealed Mana Compensation for Charged Flames",
    valueRanges: [
      {
        min: 10,
        max: 15,
      },
    ],
    rawAffix: "`+(10-15)`% Sealed Mana Compensation for Charged Flames",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Sealed Mana Compensation for Deep Pain",
    valueRanges: [
      {
        min: 10,
        max: 15,
      },
    ],
    rawAffix: "`+(10-15)`% Sealed Mana Compensation for Deep Pain",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Sealed Mana Compensation for Electric Conversion",
    valueRanges: [
      {
        min: 10,
        max: 15,
      },
    ],
    rawAffix: "`+(10-15)`% Sealed Mana Compensation for Electric Conversion",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Sealed Mana Compensation for Frigid Domain",
    valueRanges: [
      {
        min: 10,
        max: 15,
      },
    ],
    rawAffix: "`+(10-15)`% Sealed Mana Compensation for Frigid Domain",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Sealed Mana Compensation for Weapon Amplification",
    valueRanges: [
      {
        min: 10,
        max: 15,
      },
    ],
    rawAffix: "`+(10-15)`% Sealed Mana Compensation for Weapon Amplification",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Skill Effect Duration",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`% Skill Effect Duration",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Skill Area",
    valueRanges: [
      {
        min: 30,
        max: 40,
      },
    ],
    rawAffix: "`+(30-40)`% Skill Area",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
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
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}Attack and Spell Critical Strike Rating",
    valueRanges: [
      {
        min: 60,
        max: 80,
      },
    ],
    rawAffix: "`+(60-80)`Attack and Spell Critical Strike Rating",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Elemental Resistance",
    valueRanges: [
      {
        min: 8,
        max: 10,
      },
    ],
    rawAffix: "`+(8-10)`% Elemental Resistance",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Immune to Ignite\nImmune to Numbed",
    valueRanges: [],
    rawAffix: "Immune to Ignite<> Immune to Numbed",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Immune to Frostbite\nImmune to Numbed",
    valueRanges: [],
    rawAffix: "Immune to Frostbite<> Immune to Numbed",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Immune to Elemental Ailments",
    valueRanges: [],
    rawAffix: "Immune to Elemental Ailments",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Necklace",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "You can cast 1additional Curses",
    valueRanges: [],
    rawAffix: "You can cast `1`additional Curses",
  },
] as const satisfies readonly BaseGearAffix[];

export type NecklaceCorrosionBaseAffix =
  (typeof NECKLACE_CORROSION_BASE_AFFIXES)[number];
