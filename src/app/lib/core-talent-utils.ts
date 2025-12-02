import { CoreTalents, type CoreTalent } from "@/src/data/core_talent";
import { isGodGoddessTree } from "@/src/tli/talent_tree_types";

export type TreeSlot = "tree1" | "tree2" | "tree3" | "tree4";

export const getCoreTalentsForTree = (treeName: string): CoreTalent[] => {
  const normalizedName = treeName.replace(/_/g, " ");
  return CoreTalents.filter((ct) => ct.tree === normalizedName);
};

export const getAvailableGodGoddessCoreTalents = (
  treeName: string,
  pointsSpent: number,
  alreadySelected: string[],
): { firstSlot: CoreTalent[]; secondSlot: CoreTalent[] } => {
  const allTalents = getCoreTalentsForTree(treeName);
  const firstThree = allTalents.slice(0, 3);
  const lastThree = allTalents.slice(3, 6);

  const filterSelected = (talents: CoreTalent[]) =>
    talents.filter((ct) => !alreadySelected.includes(ct.name));

  return {
    firstSlot: pointsSpent >= 12 ? filterSelected(firstThree) : [],
    secondSlot: pointsSpent >= 24 ? filterSelected(lastThree) : [],
  };
};

export const getAvailableProfessionCoreTalents = (
  treeName: string,
  pointsSpent: number,
  alreadySelected: string[],
): CoreTalent[] => {
  if (pointsSpent < 24) return [];
  return getCoreTalentsForTree(treeName).filter(
    (ct) => !alreadySelected.includes(ct.name),
  );
};

export const isCoreTalentSlotUnlocked = (
  slot: TreeSlot,
  slotIndex: 0 | 1,
  pointsSpent: number,
): boolean => {
  if (slot === "tree1") {
    return slotIndex === 0 ? pointsSpent >= 12 : pointsSpent >= 24;
  }
  return pointsSpent >= 24;
};

export const getMaxCoreTalentSlots = (slot: TreeSlot): number =>
  slot === "tree1" ? 2 : 1;

export { isGodGoddessTree };
