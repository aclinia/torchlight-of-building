import { BaseGearAffix } from "./types";

export const ONE_HANDED_SWORD_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Skill Area",
    valueRanges: [
      {
        min: 10,
        max: 15,
      },
    ],
    rawAffix: "`+(10-15)`% Skill Area",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% gear Physical Damage",
    valueRanges: [
      {
        min: 15,
        max: 25,
      },
    ],
    rawAffix: "`+(15-25)`% gear Physical Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Attack Critical Strike Rating for this gear",
    valueRanges: [
      {
        min: 3,
        max: 6,
      },
    ],
    rawAffix: "`+(3-6)`% Attack Critical Strike Rating for this gear",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% chance to gain 1 stack of Tenacity Blessing on defeat",
    valueRanges: [
      {
        min: 4,
        max: 8,
      },
    ],
    rawAffix: "`+(4-8)`% chance to gain 1 stack of Tenacity Blessing on defeat",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% chance to gain 1 stack of Agility Blessing on defeat",
    valueRanges: [
      {
        min: 5,
        max: 10,
      },
    ],
    rawAffix: "`+(5-10)`% chance to gain 1 stack of Agility Blessing on defeat",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% gear Attack Speed",
    valueRanges: [
      {
        min: 5,
        max: 8,
      },
    ],
    rawAffix: "`+(5-8)`% gear Attack Speed",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+1Melee Skill Level",
    valueRanges: [],
    rawAffix: "`+1`Melee Skill Level",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Adds {0}- {1}Physical Damage to the gear",
    valueRanges: [
      {
        min: 2,
        max: 4,
      },
      {
        min: 8,
        max: 10,
      },
    ],
    rawAffix: "Adds `(2-4)`- `(8-10)`Physical Damage to the gear",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "One-Handed Sword",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Damage Penetrates {0}% Elemental Resistance",
    valueRanges: [
      {
        min: 5,
        max: 8,
      },
    ],
    rawAffix: "Damage Penetrates `(5-8)`% Elemental Resistance",
  },
] as const satisfies readonly BaseGearAffix[];

export type OneHandedSwordCorrosionBaseAffix =
  (typeof ONE_HANDED_SWORD_CORROSION_BASE_AFFIXES)[number];
