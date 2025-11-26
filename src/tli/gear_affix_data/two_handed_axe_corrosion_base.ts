import { BaseGearAffix } from "./types";

export const TWO_HANDED_AXE_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Two-Handed Axe",
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
    equipmentSlot: "Two-Handed",
    equipmentType: "Two-Handed Axe",
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
    equipmentType: "Two-Handed Axe",
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
    equipmentType: "Two-Handed Axe",
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
    equipmentType: "Two-Handed Axe",
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
    equipmentType: "Two-Handed Axe",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% chance to gain 1 stack of Tenacity Blessing on defeat",
    valueRanges: [
      {
        min: 6,
        max: 12,
      },
    ],
    rawAffix:
      "`+(6-12)`% chance to gain 1 stack of Tenacity Blessing on defeat",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Two-Handed Axe",
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
    equipmentType: "Two-Handed Axe",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Eliminates enemies under {0}% Life upon inflicting damage",
    valueRanges: [
      {
        min: 5,
        max: 8,
      },
    ],
    rawAffix: "Eliminates enemies under `(5-8)`% Life upon inflicting damage",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Two-Handed Axe",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template:
      "Enemies have a 30% chance to explode when defeated, dealing Secondary Physical Damage equal to {0}% of their Max Life to enemies within a 5m radius",
    valueRanges: [
      {
        min: 5,
        max: 10,
      },
    ],
    rawAffix:
      "Enemies have a `30`% chance to explode when defeated, dealing Secondary Physical Damage equal to `(5-10)`% of their Max Life to enemies within a 5m radius",
  },
] as const satisfies readonly BaseGearAffix[];

export type TwoHandedAxeCorrosionBaseAffix =
  (typeof TWO_HANDED_AXE_CORROSION_BASE_AFFIXES)[number];
