import { BaseGearAffix } from "./types";

export const MUSKET_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% chance for Attacks to cause Ailment",
    valueRanges: [
      {
        min: 12,
        max: 15,
      },
    ],
    rawAffix: "`+(12-15)`% chance for Attacks to cause Ailment",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
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
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
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
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Elemental Damage",
    valueRanges: [
      {
        min: 40,
        max: 45,
      },
    ],
    rawAffix: "`+(40-45)`% Elemental Damage",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
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
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% chance to gain 1 stack of Agility Blessing on defeat",
    valueRanges: [
      {
        min: 6,
        max: 12,
      },
    ],
    rawAffix: "`+(6-12)`% chance to gain 1 stack of Agility Blessing on defeat",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Adds {0}- {1}Physical Damage to the gear",
    valueRanges: [
      {
        min: 7,
        max: 10,
      },
      {
        min: 14,
        max: 17,
      },
    ],
    rawAffix: "Adds `(7-10)`- `(14-17)`Physical Damage to the gear",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Adds {0}% of Elemental Damage as Erosion Damage",
    valueRanges: [
      {
        min: 7,
        max: 12,
      },
    ],
    rawAffix: "Adds `(7-12)`% of Elemental Damage as Erosion Damage",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Musket",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Damage Penetrates {0}% Elemental Resistance",
    valueRanges: [
      {
        min: 8,
        max: 12,
      },
    ],
    rawAffix: "Damage Penetrates `(8-12)`% Elemental Resistance",
  },
] as const satisfies readonly BaseGearAffix[];

export type MusketCorrosionBaseAffix =
  (typeof MUSKET_CORROSION_BASE_AFFIXES)[number];
