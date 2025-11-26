import { BaseGearAffix } from "./types";

export const SPIRIT_RING_BASE_STATS_AFFIXES = [
  {
    equipmentSlot: "Trinket",
    equipmentType: "Spirit Ring",
    affixType: "Base Stats",
    craftingPool: "",
    tier: "",
    template: "+12% Minion Damage",
    valueRanges: [],
    rawAffix: "`+12`% Minion Damage",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Spirit Ring",
    affixType: "Base Stats",
    craftingPool: "",
    tier: "",
    template: "+18% Minion Damage",
    valueRanges: [],
    rawAffix: "`+18`% Minion Damage",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Spirit Ring",
    affixType: "Base Stats",
    craftingPool: "",
    tier: "",
    template: "+24% Minion Damage",
    valueRanges: [],
    rawAffix: "`+24`% Minion Damage",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Spirit Ring",
    affixType: "Base Stats",
    craftingPool: "",
    tier: "",
    template: "+3% Minion Damage",
    valueRanges: [],
    rawAffix: "`+3`% Minion Damage",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Spirit Ring",
    affixType: "Base Stats",
    craftingPool: "",
    tier: "",
    template: "+5% Minion Damage",
    valueRanges: [],
    rawAffix: "`+5`% Minion Damage",
  },
  {
    equipmentSlot: "Trinket",
    equipmentType: "Spirit Ring",
    affixType: "Base Stats",
    craftingPool: "",
    tier: "",
    template: "+8% Minion Damage",
    valueRanges: [],
    rawAffix: "`+8`% Minion Damage",
  },
] as const satisfies readonly BaseGearAffix[];

export type SpiritRingBaseStatsAffix =
  (typeof SPIRIT_RING_BASE_STATS_AFFIXES)[number];
