import { BaseGearAffix } from "./types";

export const DAGGER_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Dagger",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template:
      "Wilted enemies defeated by you will explode, dealing Secondary Erosion Damage equal to {0}% of their Max Life to enemies within a 5m radius",
    valueRanges: [
      {
        min: 5,
        max: 10,
      },
    ],
    rawAffix:
      "Wilted enemies defeated by you will explode, dealing Secondary Erosion Damage equal to `(5-10)`% of their Max Life to enemies within a 5m radius",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Dagger",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "{0}% chance to inflict 1additional stacks of Wilt",
    valueRanges: [
      {
        min: 5,
        max: 8,
      },
    ],
    rawAffix: "`(5-8)`% chance to inflict `1`additional stacks of Wilt",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Dagger",
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
    equipmentType: "Dagger",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Elemental Damage",
    valueRanges: [
      {
        min: 25,
        max: 30,
      },
    ],
    rawAffix: "`+(25-30)`% Elemental Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Dagger",
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
    equipmentType: "Dagger",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% chance to gain 1 stack of Focus Blessing on defeat",
    valueRanges: [
      {
        min: 4,
        max: 8,
      },
    ],
    rawAffix: "`+(4-8)`% chance to gain 1 stack of Focus Blessing on defeat",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Dagger",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}Affliction inflicted per second",
    valueRanges: [
      {
        min: 5,
        max: 10,
      },
    ],
    rawAffix: "`+(5-10)`Affliction inflicted per second",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Dagger",
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
    equipmentType: "Dagger",
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
] as const satisfies readonly BaseGearAffix[];

export type DaggerCorrosionBaseAffix =
  (typeof DAGGER_CORROSION_BASE_AFFIXES)[number];
