import type {
  SaveData,
  Gear as SaveDataGear,
  GearPage as SaveDataGearPage,
} from "@/src/app/lib/save-data";
import type { Affix, EquippedGear, Gear, GearPage, Loadout } from "../core";
import type { Mod } from "../mod";
import { parseMod } from "../mod_parser";

type GearSlot = keyof SaveDataGearPage;

const getSrc = (gearSlot: GearSlot): string => {
  return `Gear#${gearSlot}`;
};

const convertAffix = (affixText: string, src: string | undefined): Affix => {
  const affixLines = affixText.split(/\n/);
  const mods: Mod[] = [];
  for (const affixLine of affixLines) {
    const mod = parseMod(affixLine);
    if (mod !== undefined) {
      mods.push({ ...mod, src });
    }
  }

  return {
    text: affixText,
    mods: mods.length > 0 ? mods : undefined,
    src,
  };
};

const convertAffixArray = (
  affixes: string[] | undefined,
  src: string | undefined,
): Affix[] | undefined => {
  if (!affixes || affixes.length === 0) return undefined;
  return affixes.map((text) => convertAffix(text, src));
};

const convertGear = (gear: SaveDataGear, src: string | undefined): Gear => {
  return {
    equipmentType: gear.equipmentType,
    id: gear.id,
    rarity: gear.rarity,
    legendaryName: gear.legendaryName,
    baseStats: gear.baseStats ? convertAffix(gear.baseStats, src) : undefined,
    base_affixes: convertAffixArray(gear.base_affixes, src),
    prefixes: convertAffixArray(gear.prefixes, src),
    suffixes: convertAffixArray(gear.suffixes, src),
    blend_affix: gear.blend_affix
      ? convertAffix(gear.blend_affix, src)
      : undefined,
    legendary_affixes: convertAffixArray(gear.legendary_affixes, src),
  };
};

const convertGearPage = (
  saveDataGearPage: SaveDataGearPage,
  gearInventory: SaveDataGear[],
): GearPage => {
  const slots: GearSlot[] = [
    "helmet",
    "chest",
    "neck",
    "gloves",
    "belt",
    "boots",
    "leftRing",
    "rightRing",
    "mainHand",
    "offHand",
  ];

  const equippedGear: EquippedGear = {};

  for (const slot of slots) {
    const gear = saveDataGearPage[slot];
    if (gear) {
      const src = getSrc(slot);
      equippedGear[slot] = convertGear(gear, src);
    }
  }

  return {
    equippedGear,
    inventory: gearInventory.map((gear) => {
      return convertGear(gear, undefined);
    }),
  };
};

export const loadSave = (saveData: SaveData): Loadout => {
  return {
    gearPage: convertGearPage(saveData.equipmentPage, saveData.itemsList),
    talentPage: { affixes: [] },
    divinityPage: { slates: [] },
    customConfiguration: [],
  };
};
