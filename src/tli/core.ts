import type { EquipmentType } from "./gear_data_types";
import type { Mod } from "./mod";

export interface Affix {
  mods?: Mod[];
  maxDivinity?: number;
  src?: string;
  text?: string;
}

export interface DmgRange {
  // inclusive on both ends
  min: number;
  max: number;
}

export interface Configuration {
  fervor: {
    enabled: boolean;
    points: number;
  };
}

export interface DivinitySlate {
  affixes: Affix[];
}

export interface Gear {
  equipmentType: EquipmentType;

  // UI fields (preserved from SaveData for display, always present for inventory items)
  id?: string;
  rarity?: "rare" | "legendary";
  legendaryName?: string;

  // Base stats (shared by both regular and legendary gear)
  baseStats?: Affix;

  // Regular gear affix properties
  base_affixes?: Affix[];
  prefixes?: Affix[];
  suffixes?: Affix[];
  blend_affix?: Affix;

  // Legendary gear affix property
  legendary_affixes?: Affix[];
}

export const getAllAffixes = (gear: Gear): Affix[] => {
  const affixes: Affix[] = [];

  if (gear.baseStats) affixes.push(gear.baseStats);

  if (gear.legendary_affixes) {
    affixes.push(...gear.legendary_affixes);
  } else {
    if (gear.base_affixes) affixes.push(...gear.base_affixes);
    if (gear.blend_affix) affixes.push(gear.blend_affix);
    if (gear.prefixes) affixes.push(...gear.prefixes);
    if (gear.suffixes) affixes.push(...gear.suffixes);
  }

  return affixes;
};

export interface TalentPage {
  affixes: Affix[];
}

export interface DivinityPage {
  slates: DivinitySlate[];
}

export interface EquippedGear {
  helmet?: Gear;
  chest?: Gear;
  neck?: Gear;
  gloves?: Gear;
  belt?: Gear;
  boots?: Gear;
  leftRing?: Gear;
  rightRing?: Gear;
  mainHand?: Gear;
  offHand?: Gear;
}

export interface GearPage {
  equippedGear: EquippedGear;
  inventory: Gear[];
}

export interface Loadout {
  gearPage: GearPage;
  talentPage: TalentPage;
  divinityPage: DivinityPage;
  customConfiguration: Affix[];
}
