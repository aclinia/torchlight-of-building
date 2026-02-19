import { ALL_GEAR_AFFIXES } from "@/src/tli/all-affixes";
import type { Gear } from "@/src/tli/core";
import type { EquipmentType } from "@/src/tli/gear-data-types";
import {
  SLOT_TO_EQUIPMENT_SLOT,
  SLOT_TO_VALID_EQUIPMENT_TYPES,
} from "./constants";
import type { GearSlot } from "./types";

// Maps free-form equipmentSlot strings (from in-game data) to GearSlot keys
const EQUIPMENT_SLOT_TO_GEAR_SLOTS: Record<string, GearSlot[]> = {
  Helmet: ["helmet"],
  Chest: ["chest"],
  "Chest Armor": ["chest"],
  Gloves: ["gloves"],
  Hands: ["gloves"],
  Boots: ["boots"],
  Feet: ["boots"],
  Trinket: ["belt", "neck", "leftRing", "rightRing"],
  Waist: ["belt"],
  Neck: ["neck"],
  Finger: ["leftRing", "rightRing"],
  "One-Handed": ["mainHand", "offHand"],
  "Two-Handed": ["mainHand"],
  Shield: ["offHand"],
  "Off-Hand": ["offHand"],
};

export const getValidEquipmentTypes = (slot: GearSlot): EquipmentType[] => {
  const validEquipSlots = SLOT_TO_EQUIPMENT_SLOT[slot];
  const types = new Set<EquipmentType>();

  ALL_GEAR_AFFIXES.forEach((affix) => {
    if (validEquipSlots.includes(affix.equipmentSlot)) {
      types.add(affix.equipmentType);
    }
  });

  return Array.from(types).sort();
};

const isItemCompatibleWithSlot = (item: Gear, slot: GearSlot): boolean => {
  if (item.equipmentSlot !== undefined) {
    const validSlots = EQUIPMENT_SLOT_TO_GEAR_SLOTS[item.equipmentSlot];
    if (validSlots !== undefined) {
      return validSlots.includes(slot);
    }
  }
  // Fallback to equipment type matching
  const validTypes = SLOT_TO_VALID_EQUIPMENT_TYPES[slot];
  return validTypes.includes(item.equipmentType);
};

export const getCompatibleItems = (
  itemsList: Gear[],
  slot: GearSlot,
): Gear[] => {
  return itemsList.filter((item) => isItemCompatibleWithSlot(item, slot));
};
