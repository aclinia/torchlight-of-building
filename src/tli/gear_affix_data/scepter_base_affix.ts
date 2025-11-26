import { BaseGearAffix } from "./types";

export const SCEPTER_BASE_AFFIX_AFFIXES = [
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "0",
    template: "+{0}% Blur Effect",
    valueRanges: [
      {
        min: 6,
        max: 8,
      },
    ],
    rawAffix: "`+(6-8)`% Blur Effect",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "0",
    template: "Max Agility Blessing Stacks +1",
    valueRanges: [],
    rawAffix: "Max Agility Blessing Stacks `+1`",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "0",
    template: "Max Focus Blessing Stacks +1",
    valueRanges: [],
    rawAffix: "Max Focus Blessing Stacks `+1`",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "0",
    template: "Max Tenacity Blessing Stacks +1",
    valueRanges: [],
    rawAffix: "Max Tenacity Blessing Stacks `+1`",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "1",
    template: "+{0}% Reaping Cooldown Recovery Speed",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`% Reaping Cooldown Recovery Speed",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "1",
    template: "+{0}% additional Damage Over Time",
    valueRanges: [
      {
        min: 6,
        max: 8,
      },
    ],
    rawAffix: "`+(6-8)`% additional Damage Over Time",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "1",
    template: "+{0}% Elemental and Erosion Resistance Penetration",
    valueRanges: [
      {
        min: 6,
        max: 8,
      },
    ],
    rawAffix: "`+(6-8)`% Elemental and Erosion Resistance Penetration",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}% Affliction Effect",
    valueRanges: [
      {
        min: 10,
        max: 14,
      },
    ],
    rawAffix: "`+(10-14)`% Affliction Effect",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}Dexterity",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`Dexterity",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}Intelligence",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`Intelligence",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}Strength",
    valueRanges: [
      {
        min: 15,
        max: 20,
      },
    ],
    rawAffix: "`+(15-20)`Strength",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}% Elemental Damage",
    valueRanges: [
      {
        min: 20,
        max: 24,
      },
    ],
    rawAffix: "`+(20-24)`% Elemental Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}% Erosion Damage",
    valueRanges: [
      {
        min: 20,
        max: 24,
      },
    ],
    rawAffix: "`+(20-24)`% Erosion Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}% Physical Damage",
    valueRanges: [
      {
        min: 20,
        max: 24,
      },
    ],
    rawAffix: "`+(20-24)`% Physical Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}% Spell Damage",
    valueRanges: [
      {
        min: 20,
        max: 24,
      },
    ],
    rawAffix: "`+(20-24)`% Spell Damage",
  },
  {
    equipmentSlot: "One-Handed",
    equipmentType: "Scepter",
    affixType: "Base Affix",
    craftingPool: "",
    tier: "2",
    template: "+{0}% Reaping Duration",
    valueRanges: [
      {
        min: 8,
        max: 10,
      },
    ],
    rawAffix: "`+(8-10)`% Reaping Duration",
  },
] as const satisfies readonly BaseGearAffix[];

export type ScepterBaseAffixAffix = (typeof SCEPTER_BASE_AFFIX_AFFIXES)[number];
