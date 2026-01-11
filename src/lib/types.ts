import type { EquippedGear, PactspiritSlot } from "./save-data";

export type GearSlot = keyof EquippedGear;

export type TreeSlot = "tree1" | "tree2" | "tree3" | "tree4";

export type TalentSlotParam = "slot_1" | "slot_2" | "slot_3" | "slot_4";
export const TALENT_SLOT_PARAMS = [
  "slot_1",
  "slot_2",
  "slot_3",
  "slot_4",
] as const;

const PARAM_TO_TREE_SLOT: Record<TalentSlotParam, TreeSlot> = {
  slot_1: "tree1",
  slot_2: "tree2",
  slot_3: "tree3",
  slot_4: "tree4",
};

const TREE_SLOT_TO_PARAM: Record<TreeSlot, TalentSlotParam> = {
  tree1: "slot_1",
  tree2: "slot_2",
  tree3: "slot_3",
  tree4: "slot_4",
};

export const paramToTreeSlot = (param: TalentSlotParam): TreeSlot =>
  PARAM_TO_TREE_SLOT[param];

export const treeSlotToParam = (slot: TreeSlot): TalentSlotParam =>
  TREE_SLOT_TO_PARAM[slot];

export type ActivePage =
  | "equipment"
  | "talents"
  | "skills"
  | "hero"
  | "pactspirit"
  | "divinity"
  | "configuration"
  | "calculations";

export interface AffixSlotState {
  affixIndex: number | undefined;
  tierIndex: number;
  percentage: number;
}

export type InnerRingSlot =
  | "innerRing1"
  | "innerRing2"
  | "innerRing3"
  | "innerRing4"
  | "innerRing5"
  | "innerRing6";
export type MidRingSlot = "midRing1" | "midRing2" | "midRing3";
export type RingSlotKey = InnerRingSlot | MidRingSlot;

export const RING_DISPLAY_ORDER: RingSlotKey[] = [
  "innerRing1",
  "innerRing2",
  "midRing1",
  "innerRing3",
  "innerRing4",
  "midRing2",
  "innerRing5",
  "innerRing6",
  "midRing3",
];

export type PactspiritSlotIndex = 1 | 2 | 3;
export type PactspiritSlotKey = keyof PactspiritSlot["rings"];

export interface InstalledDestinyResult {
  destinyName: string;
  destinyType: string;
  resolvedAffix: string;
}
