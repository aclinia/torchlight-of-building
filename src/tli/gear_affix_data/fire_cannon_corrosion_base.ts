import { BaseGearAffix } from "./types";

export const FIRE_CANNON_CORROSION_BASE_AFFIXES = [
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Fire Cannon",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "-30% additional Damage Over Time taken while standing still",
    valueRanges: [],
    rawAffix: "`-30`% additional Damage Over Time taken while standing still",
  },
  {
    equipmentSlot: "Two-Handed",
    equipmentType: "Fire Cannon",
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
    equipmentType: "Fire Cannon",
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
    equipmentType: "Fire Cannon",
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
    equipmentType: "Fire Cannon",
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
    equipmentType: "Fire Cannon",
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
    equipmentType: "Fire Cannon",
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
    equipmentType: "Fire Cannon",
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
    equipmentType: "Fire Cannon",
    affixType: "Corrosion Base",
    craftingPool: "",
    tier: "0",
    template: "Parabolic Projectile Splits quantity +{0}",
    valueRanges: [
      {
        min: 1,
        max: 2,
      },
    ],
    rawAffix: "Parabolic Projectile Splits quantity `+(1-2)`",
  },
] as const satisfies readonly BaseGearAffix[];

export type FireCannonCorrosionBaseAffix =
  (typeof FIRE_CANNON_CORROSION_BASE_AFFIXES)[number];
