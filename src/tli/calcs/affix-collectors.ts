import type {
  Affix,
  AffixLine,
  DivinityPage,
  Gear,
  HeroPage,
  Loadout,
  TalentPage,
} from "../core";
import type { Mod } from "../mod";
import { type ModWithValue, multModValue } from "./util";

const hasValue = (mod: Mod): mod is ModWithValue => "value" in mod;

const scaleAffixByInverseImage = (affix: Affix, multiplier: number): Affix => ({
  ...affix,
  affixLines: affix.affixLines.map((line) => ({
    ...line,
    mods: line.mods?.map((mod) =>
      hasValue(mod) ? multModValue(mod, multiplier) : mod,
    ),
  })),
});

export const getAllAffixes = (gear: Gear): Affix[] => {
  const affixes: Affix[] = [];

  if (gear.legendary_affixes !== undefined) {
    // Legendary gear: blend first, then legendary affixes
    if (gear.blend_affix !== undefined) affixes.push(gear.blend_affix);
    affixes.push(...gear.legendary_affixes);
  } else {
    if (gear.base_affixes !== undefined) affixes.push(...gear.base_affixes);
    if (gear.sweet_dream_affix !== undefined)
      affixes.push(gear.sweet_dream_affix);
    if (gear.tower_sequence_affix !== undefined)
      affixes.push(gear.tower_sequence_affix);
    if (gear.blend_affix !== undefined) affixes.push(gear.blend_affix);
    if (gear.prefixes !== undefined) affixes.push(...gear.prefixes);
    if (gear.suffixes !== undefined) affixes.push(...gear.suffixes);
  }

  return affixes;
};

export const getTalentAffixes = (talentPage: TalentPage): Affix[] => {
  const affixes: Affix[] = [];
  const { talentTrees: allocatedTalents } = talentPage;

  const trees = [
    allocatedTalents.tree1,
    allocatedTalents.tree2,
    allocatedTalents.tree3,
    allocatedTalents.tree4,
  ];

  for (const tree of trees) {
    if (tree?.selectedCoreTalents) {
      affixes.push(...tree.selectedCoreTalents);
    }
    if (tree?.additionalCoreTalentPrismAffix) {
      affixes.push(tree.additionalCoreTalentPrismAffix);
    }
    if (tree?.nodes) {
      for (const node of tree.nodes) {
        if (node.points > 0) {
          const multiplier = node.inverseImageEffect
            ? 1 + node.inverseImageEffect
            : 1;

          if (multiplier !== 1) {
            affixes.push(scaleAffixByInverseImage(node.affix, multiplier));
            affixes.push(
              ...node.prismAffixes.map((a) =>
                scaleAffixByInverseImage(a, multiplier),
              ),
            );
          } else {
            affixes.push(node.affix);
            affixes.push(...node.prismAffixes);
          }
        }
      }
    }
  }

  return affixes;
};

export const getHeroAffixes = (heroPage: HeroPage): Affix[] => {
  const affixes: Affix[] = [];

  const memorySlots = heroPage.memorySlots;

  if (memorySlots.slot45) affixes.push(...memorySlots.slot45.affixes);
  if (memorySlots.slot60) affixes.push(...memorySlots.slot60.affixes);
  if (memorySlots.slot75) affixes.push(...memorySlots.slot75.affixes);

  return affixes;
};

export const getGearAffixes = (
  gear: Loadout["gearPage"]["equippedGear"][keyof Loadout["gearPage"]["equippedGear"]],
): Affix[] => {
  return gear ? getAllAffixes(gear) : [];
};

export const getPactspiritAffixes = (
  pactspiritPage: Loadout["pactspiritPage"],
): Affix[] => {
  const affixes: Affix[] = [];
  const slots = [
    pactspiritPage.slot1,
    pactspiritPage.slot2,
    pactspiritPage.slot3,
  ];
  for (const slot of slots) {
    if (slot === undefined) continue;
    affixes.push(slot.mainAffix);
    for (const ring of Object.values(slot.rings)) {
      affixes.push(ring.installedDestiny?.affix ?? ring.originalAffix);
    }
  }
  return affixes;
};

export const getDivinityAffixes = (divinityPage: DivinityPage): Affix[] => {
  const affixes: Affix[] = [];
  for (const placedSlate of divinityPage.placedSlates) {
    const slate = divinityPage.inventory.find(
      (s) => s.id === placedSlate.slateId,
    );
    if (slate !== undefined) {
      affixes.push(...slate.affixes);
    }
  }
  return affixes;
};

export const getCustomAffixes = (customAffixLines: AffixLine[]): Affix[] => {
  if (customAffixLines.length === 0) return [];
  return [{ affixLines: customAffixLines, src: "CustomAffix" }];
};
