import { BaseGearAffix } from "./types";

export const ROD_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Cast Speed",
    valueRanges: [
      {
        min: 10,
        max: 16,
      },
    ],
    rawAffix: "`+(10-16)`% Cast Speed",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Minion Damage",
    valueRanges: [
      {
        min: 20,
        max: 30,
      },
    ],
    rawAffix: "`+(20-30)`% Minion Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Minion Critical Strike Damage",
    valueRanges: [
      {
        min: 25,
        max: 32,
      },
    ],
    rawAffix: "`+(25-32)`% Minion Critical Strike Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Minion Critical Strike Rating",
    valueRanges: [
      {
        min: 30,
        max: 40,
      },
    ],
    rawAffix: "`+(30-40)`% Minion Critical Strike Rating",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
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
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template:
      "+{0}% chance to trigger the Main Spell Skill 1 additional time when using it",
    valueRanges: [
      {
        min: 5,
        max: 8,
      },
    ],
    rawAffix:
      "`+(5-8)`% chance to trigger the Main Spell Skill 1 additional time when using it",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Elemental and Erosion Resistance Penetration for Minions",
    valueRanges: [
      {
        min: 5,
        max: 8,
      },
    ],
    rawAffix:
      "`+(5-8)`% Elemental and Erosion Resistance Penetration for Minions",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Cooldown Recovery Speed",
    valueRanges: [
      {
        min: 6,
        max: 10,
      },
    ],
    rawAffix: "`+(6-10)`% Cooldown Recovery Speed",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Rod",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Adds {0}% of Elemental Damage as Erosion Damage",
    valueRanges: [
      {
        min: 5,
        max: 8,
      },
    ],
    rawAffix: "Adds `(5-8)`% of Elemental Damage as Erosion Damage",
  },
] as const satisfies readonly BaseGearAffix[];

export type RodCorrosionBaseAffix = (typeof ROD_CORROSION_BASE_AFFIXES)[number];
