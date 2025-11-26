import { BaseGearAffix } from "./types";

export const CUDGEL_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}Support Skill Level",
    valueRanges: [
      {
        min: 1,
        max: 2,
      },
    ],
    rawAffix: "`+(1-2)`Support Skill Level",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Cast Speed",
    valueRanges: [
      {
        min: 18,
        max: 24,
      },
    ],
    rawAffix: "`+(18-24)`% Cast Speed",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Spell Damage",
    valueRanges: [
      {
        min: 35,
        max: 45,
      },
    ],
    rawAffix: "`+(35-45)`% Spell Damage",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Critical Strike Damage",
    valueRanges: [
      {
        min: 40,
        max: 48,
      },
    ],
    rawAffix: "`+(40-48)`% Critical Strike Damage",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Spell Critical Strike Rating",
    valueRanges: [
      {
        min: 50,
        max: 60,
      },
    ],
    rawAffix: "`+(50-60)`% Spell Critical Strike Rating",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% chance to gain 1 stack of Focus Blessing on defeat",
    valueRanges: [
      {
        min: 6,
        max: 12,
      },
    ],
    rawAffix: "`+(6-12)`% chance to gain 1 stack of Focus Blessing on defeat",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Cooldown Recovery Speed",
    valueRanges: [
      {
        min: 8,
        max: 15,
      },
    ],
    rawAffix: "`+(8-15)`% Cooldown Recovery Speed",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Cudgel",
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
    equipmentType: "Cudgel",
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

export type CudgelCorrosionBaseAffix =
  (typeof CUDGEL_CORROSION_BASE_AFFIXES)[number];
