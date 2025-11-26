import { BaseGearAffix } from "./types";

export const BOOTS_INT_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Cooldown Recovery Speed",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`% Cooldown Recovery Speed",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
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
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
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
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Movement Speed",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`% Movement Speed",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Cooldown Recovery Speed for Mobility Skills",
    valueRanges: [
      {
        min: 30,
        max: 40,
      },
    ],
    rawAffix: "`+(30-40)`% Cooldown Recovery Speed for Mobility Skills",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+{0}% gear Energy Shield",
    valueRanges: [
      {
        min: 30,
        max: 50,
      },
    ],
    rawAffix: "`+(30-50)`% gear Energy Shield",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
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
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "+1Mobility Skill Level",
    valueRanges: [],
    rawAffix: "`+1`Mobility Skill Level",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Has Hasten",
    valueRanges: [],
    rawAffix: "Has Hasten",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Max Agility Blessing Stacks +1",
    valueRanges: [],
    rawAffix: "Max Agility Blessing Stacks `+1`",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Regenerates 1% Mana per second while moving",
    valueRanges: [],
    rawAffix: "Regenerates `1`% Mana per second while moving",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Regenerates 1% of Life per second while moving",
    valueRanges: [],
    rawAffix: "Regenerates `1`% of Life per second while moving",
  },
  {
    equipmentSlot: "Boots",
    equipmentType: "Boots (INT)",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Triggers Lv. 20Stoneskin when moving. Interval: 2s",
    valueRanges: [],
    rawAffix: "Triggers Lv. `20`Stoneskin when moving. Interval: `2`s",
  },
] as const satisfies readonly BaseGearAffix[];

export type BootsIntCorrosionBaseAffix =
  (typeof BOOTS_INT_CORROSION_BASE_AFFIXES)[number];
