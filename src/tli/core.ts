import type { HeroName, HeroTraitName } from "@/src/data/hero-trait/types";
import type {
  ActivationMediumSkillNmae,
  MagnificentSupportSkillName,
  NobleSupportSkillName,
  SupportSkillName,
} from "../data/skill";
import type { EquipmentType } from "./gear-data-types";
import type { Mod } from "./mod";

export const PRISM_RARITIES = ["rare", "legendary"] as const;
export type PrismRarity = (typeof PRISM_RARITIES)[number];

export interface AffixLine {
  text: string;
  mods?: Mod[];
}

export interface Affix {
  specialName?: string;
  voraxLegendaryName?: string;
  affixLines: AffixLine[];
  maxDivinity?: number;
  src?: string;
}

export interface SupportMod {
  mod: Mod;
}

export interface SupportAffix {
  text: string;
  mods?: SupportMod[];
}

export interface BaseStatLine {
  text: string;
  mods?: Mod[];
}

export interface BaseStats {
  name?: string;
  baseStatLines: BaseStatLine[];
  src?: string;
}

export const getAffixText = (affix: Affix): string =>
  affix.affixLines.map((l) => l.text).join("\n");

export const getAffixMods = (affix: Affix): Mod[] =>
  affix.affixLines.flatMap((l) => l.mods ?? []);

export interface DmgRange {
  // inclusive on both ends
  min: number;
  max: number;
}

export interface Configuration {
  level: number;
  fervorEnabled: boolean;
  // default to max
  fervorPoints?: number;
  enemyFrostbittenEnabled: boolean;
  // default to max
  enemyFrostbittenPoints?: number;
  // default to max
  crueltyBuffStacks?: number;
  // default to max
  numShadowHits?: number;
  // default to 0
  manaConsumedRecently?: number;
  // default to max
  focusBlessings?: number;
  hasFocusBlessing: boolean;
  // default to max
  agilityBlessings?: number;
  // default to max
  hasAgilityBlessing: boolean;
  // default to max
  tenacityBlessings?: number;
  // default to max
  hasTenacityBlessing: boolean;
  // default to false
  hasFullMana: boolean;
  // default to false
  hasLowMana: boolean;
  // default to false
  enemyParalyzed: boolean;
  // default to false
  enemyNumbed: boolean;
  // default to max
  enemyNumbedStacks?: number;
  // default to false
  targetEnemyIsElite: boolean;
  // default to false
  targetEnemyIsNearby: boolean;
  // default to false
  targetEnemyIsDistant: boolean;
  // default to false
  targetEnemyIsInProximity: boolean;
  // default to false
  targetEnemyHasFrail: boolean;
  // default to false
  targetEnemyHasWhimsySignal: boolean;
  // default to false
  targetEnemyMarked: boolean;
  // default to true if you have a curse skill, false otherwise
  targetEnemyIsCursed?: boolean;
  // default to 0
  numEnemiesNearby: number;
  // default to 0
  numEnemiesAffectedByWarcry: number;
  // default to false
  hasBlockedRecently: boolean;
  // default to false
  hasElitesNearby: boolean;
  // default to 0
  numSecondsWithEliteNearby: number;
  // default to false
  enemyHasAilment: boolean;
  // default to false
  hasCritRecently: boolean;
  // default fo false
  channeling: boolean;
  // Defaults to max channeled stacks
  channeledStacks?: number;
  // default to max
  stalkerStacks?: number;
  // default to false
  sagesInsightFireActivated: boolean;
  // default to false
  sagesInsightColdActivated: boolean;
  // default to false
  sagesInsightLightningActivated: boolean;
  // default to false
  sagesInsightErosionActivated: boolean;
  // default to false
  enemyHasAffliction: boolean;
  // default to 100
  afflictionPts?: number;
  // default to false
  enemyHasDesecration: boolean;
  // default to false
  enemyHasTrauma: boolean;
  // default to 0
  tormentStacks: number;
  // default to false
  hasBlur: boolean;
  // default to false
  blurEndedRecently: boolean;
  // default to max
  numMindControlLinksUsed?: number;
  // default to false
  hasSquidnova: boolean;
  // default to false
  targetEnemyIsFrozen: boolean;
  // default to false
  targetEnemyFrozenRecently: boolean;
  // default to false
  targetEnemyHasColdInfiltration: boolean;
  // default to false
  targetEnemyHasLightningInfiltration: boolean;
  // default to false
  targetEnemyHasFireInfiltration: boolean;
  // default to 0
  hasHitEnemyWithElementalDmgRecently: number;
  // default to 0
  numSpellSkillsUsedRecently: number;
  // default to max
  chainLightningInstancesOnTarget?: number;
  // default to false
  hasUsedMobilitySkillRecently: boolean;
  // default to false
  hasMovedRecently: boolean;
  // default to false
  isMoving: boolean;
  // default to false
  takingDamageOverTime: boolean;
  // default to false
  hasCastCurseRecently: boolean;
  // default to false
  hasAttackAggression: boolean;
  // default to false
  hasSpellAggression: boolean;
  // default to 0
  numMainSpellSkillsCastRecently: number;
  // default to 0
  numMaxMultistrikesRecently: number;
  // default to max
  numBerserkingBladeBuffStacks?: number;
  // default to 0
  numTimesRegainedRecently: number;
  // default to 100
  currentLifePct: number;

  // --------------------
  // hero-specific config
  // --------------------

  realmOfMercuryEnabled: boolean;
  // default to 0
  numEnemiesInsideRealmOfMercury: number;
  // default to false
  baptismOfPurityEnabled: boolean;
  // default to false
  frostbittenHeartIsActive: boolean;
  // default to 0
  danceOfFrostStacks?: number;

  // ------------
  // enemy config
  // ------------

  // defaults: cold/lightning/fire = 40, erosion = 30
  enemyColdRes?: number;
  enemyLightningRes?: number;
  enemyFireRes?: number;
  enemyErosionRes?: number;
  // default to 27273 (effective phys dmg mitigation of 50%)
  enemyArmor?: number;

  // default to 6
  pureHeartStacks?: number;
  // defaults to max of 5
  twistedSpacetimeStacks?: number;

  // default to 0
  numIcePuppetStacks?: number;

  // default to 1
  numActiveTangles: number;

  // default to 3
  numFelineStimulant?: number;

  // custom affix lines for injecting arbitrary mods
  customAffixLines?: string[];
}

export const DEFAULT_CONFIGURATION: Configuration = {
  level: 95,
  fervorEnabled: false,
  fervorPoints: undefined,
  enemyFrostbittenEnabled: false,
  enemyFrostbittenPoints: undefined,
  crueltyBuffStacks: 40,
  numShadowHits: undefined,
  manaConsumedRecently: undefined,
  focusBlessings: undefined,
  hasFocusBlessing: false,
  agilityBlessings: undefined,
  hasAgilityBlessing: false,
  tenacityBlessings: undefined,
  hasTenacityBlessing: false,
  hasFullMana: false,
  hasLowMana: false,
  enemyParalyzed: false,
  enemyNumbed: false,
  enemyNumbedStacks: undefined,
  targetEnemyIsElite: false,
  targetEnemyIsNearby: false,
  targetEnemyIsDistant: false,
  targetEnemyIsInProximity: false,
  targetEnemyHasFrail: false,
  targetEnemyHasWhimsySignal: false,
  targetEnemyMarked: false,
  targetEnemyIsCursed: undefined,
  numEnemiesNearby: 0,
  numEnemiesAffectedByWarcry: 0,
  hasBlockedRecently: false,
  hasElitesNearby: false,
  numSecondsWithEliteNearby: 0,
  enemyHasAilment: false,
  hasCritRecently: false,
  channeling: false,
  channeledStacks: undefined,
  stalkerStacks: undefined,
  sagesInsightFireActivated: false,
  sagesInsightColdActivated: false,
  sagesInsightLightningActivated: false,
  sagesInsightErosionActivated: false,
  enemyHasAffliction: false,
  afflictionPts: undefined,
  enemyHasDesecration: false,
  enemyHasTrauma: false,
  tormentStacks: 0,
  hasBlur: false,
  blurEndedRecently: false,
  numMindControlLinksUsed: undefined,
  hasSquidnova: false,
  targetEnemyIsFrozen: false,
  targetEnemyFrozenRecently: false,
  targetEnemyHasColdInfiltration: false,
  targetEnemyHasLightningInfiltration: false,
  targetEnemyHasFireInfiltration: false,
  hasHitEnemyWithElementalDmgRecently: 0,
  numSpellSkillsUsedRecently: 0,
  chainLightningInstancesOnTarget: undefined,
  hasUsedMobilitySkillRecently: false,
  hasMovedRecently: false,
  isMoving: false,
  takingDamageOverTime: false,
  hasCastCurseRecently: false,
  hasAttackAggression: false,
  hasSpellAggression: false,
  numMainSpellSkillsCastRecently: 0,
  numMaxMultistrikesRecently: 0,
  numBerserkingBladeBuffStacks: undefined,
  numTimesRegainedRecently: 0,
  currentLifePct: 100,
  realmOfMercuryEnabled: false,
  numEnemiesInsideRealmOfMercury: 0,
  baptismOfPurityEnabled: false,
  frostbittenHeartIsActive: false,
  danceOfFrostStacks: undefined,
  enemyColdRes: undefined,
  enemyLightningRes: undefined,
  enemyFireRes: undefined,
  enemyErosionRes: undefined,
  enemyArmor: undefined,
  pureHeartStacks: undefined,
  twistedSpacetimeStacks: undefined,
  numIcePuppetStacks: undefined,
  numActiveTangles: 1,
  numFelineStimulant: undefined,
  customAffixLines: undefined,
};

export interface Gear {
  equipmentType: EquipmentType;
  equipmentSlot?: string;

  // UI fields (preserved from SaveData for display, always present for inventory items)
  id?: string;
  rarity?: "rare" | "legendary" | "vorax";
  legendaryName?: string;
  baseGearName?: string;

  // Base stats (shared by both regular and legendary gear)
  baseStats?: BaseStats;

  // Regular gear affix properties
  baseAffixes?: Affix[];
  prefixes?: Affix[];
  suffixes?: Affix[];
  blendAffix?: Affix;
  sweetDreamAffix?: Affix;
  towerSequenceAffix?: Affix;

  // Legendary gear affix property
  legendaryAffixes?: Affix[];

  // Custom affixes from advanced crafting (raw text, parsed like other affixes)
  customAffixes?: Affix[];
}

// Unified talent node type with all derived data
export interface TalentNode {
  // Position
  x: number;
  y: number;

  // From TalentNodeData
  nodeType: "micro" | "medium" | "legendary";
  maxPoints: number;
  prerequisite?: { x: number; y: number };
  iconName: string;

  // Allocation state
  points: number; // 0 for unallocated

  // Reflection state
  isReflected: boolean;
  sourcePosition?: { x: number; y: number }; // Only for reflected nodes
  inverseImageEffect?: number; // Decimal like 0.47 for 47%, only for reflected nodes

  // Parsed affix data (scaled by points)
  affix: Affix;
  prismAffixes: Affix[]; // Prism gauge affixes matching node type
}

// Talent types with parsed Affix objects (instead of strings)
export interface TalentTree {
  name: string;
  nodes: TalentNode[]; // All nodes including unallocated (0 points) and reflected
  selectedCoreTalents?: Affix[];
  selectedCoreTalentNames?: string[]; // Original names for UI display
  additionalCoreTalentPrismAffix?: Affix;
  replacementPrismCoreTalent?: Affix; // Ethereal talent affix if prism replaces core talents
}

export interface BonusNodeAffix {
  type: "bonusNode";
  targetType: "legendary" | "medium" | "micro";
  bonusText: string;
}

export interface AreaAffix {
  type: "area";
  dimensions: string; // e.g. "3x3"
}

export interface UnsupportedPrismAffix {
  type: "unsupported";
}

export type PrismAffix = { text: string } & (
  | BonusNodeAffix
  | AreaAffix
  | UnsupportedPrismAffix
);

// gaugeAffixes layout: [0] = area, [1] = rare, [2] = legendary
export interface CraftedPrism {
  id: string;
  rarity: PrismRarity;
  // prism affixes are a special case that are not parsed into normal mods
  baseAffix: string;
  gaugeAffixes: PrismAffix[];
}

// Convert engine CraftedPrism back to SaveData-compatible format (string[] gaugeAffixes)
export const toSaveDataPrism = (
  prism: CraftedPrism,
): {
  id: string;
  rarity: PrismRarity;
  baseAffix: string;
  gaugeAffixes: string[];
} => ({
  id: prism.id,
  rarity: prism.rarity,
  baseAffix: prism.baseAffix,
  gaugeAffixes: prism.gaugeAffixes.map((a) => a.text),
});

export interface PlacedPrism {
  prism: CraftedPrism;
  treeSlot: "tree1" | "tree2" | "tree3" | "tree4";
  position: { x: number; y: number };
}

export interface CraftedInverseImage {
  id: string;
  microTalentEffect: number; // -100 to 200
  mediumTalentEffect: number; // -100 to 100
  legendaryTalentEffect: number; // -100 to 50
}

export interface PlacedInverseImage {
  inverseImage: CraftedInverseImage;
  treeSlot: "tree2" | "tree3" | "tree4";
  position: { x: number; y: number };
}

export interface TalentTrees {
  tree1?: TalentTree;
  tree2?: TalentTree;
  tree3?: TalentTree;
  tree4?: TalentTree;
  placedPrism?: PlacedPrism;
  placedInverseImage?: PlacedInverseImage;
}

export interface TalentInventory {
  prismList: CraftedPrism[];
  inverseImageList: CraftedInverseImage[];
}

export interface TalentPage {
  talentTrees: TalentTrees;
  inventory: TalentInventory;
}

export const SLATE_SHAPES = ["O", "L", "Z", "T"] as const;
export type SlateShape = (typeof SLATE_SHAPES)[number];

export const LEGENDARY_SLATE_SHAPES = [
  "Single",
  "CornerL",
  "Vertical2",
  "Pedigree",
] as const;
export type LegendarySlateShape = (typeof LEGENDARY_SLATE_SHAPES)[number];

export const ALL_SLATE_SHAPES = [
  ...SLATE_SHAPES,
  ...LEGENDARY_SLATE_SHAPES,
] as const;
export type AnySlateShape = (typeof ALL_SLATE_SHAPES)[number];

export const DIVINITY_GODS = [
  "Deception",
  "Hunting",
  "Knowledge",
  "Machines",
  "Might",
  "War",
] as const;
export type DivinityGod = (typeof DIVINITY_GODS)[number];

export const ROTATIONS = [0, 90, 180, 270] as const;
export type Rotation = (typeof ROTATIONS)[number];

export const DIVINITY_AFFIX_TYPES = [
  "Legendary Medium",
  "Medium",
  "Micro",
  "Core",
] as const;
export type DivinityAffixType = (typeof DIVINITY_AFFIX_TYPES)[number];

export interface PlacedSlate {
  slateId: string;
  position: { row: number; col: number };
}

export interface DivinitySlate {
  id: string;
  god?: DivinityGod;
  shape?: SlateShape;
  rotation: Rotation;
  flippedH: boolean;
  flippedV: boolean;
  affixes: Affix[];
  isLegendary?: boolean;
  legendaryName?: string;
}

export interface DivinityPage {
  placedSlates: PlacedSlate[];
  inventory: DivinitySlate[];
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

export interface SupportSkillSlot {
  skillType: "support";
  name: SupportSkillName;
  level?: number; // default 20
  affixes: SupportAffix[];
}

export interface MagnificentSupportSkillSlot {
  skillType: "magnificent_support";
  name: MagnificentSupportSkillName;
  tier: 0 | 1 | 2; // lower is better (tier 0 is best)
  rank: 1 | 2 | 3 | 4 | 5; // higher is better (rank 5 is max)
  affixes: SupportAffix[];
}

export interface NobleSupportSkillSlot {
  skillType: "noble_support";
  name: NobleSupportSkillName;
  tier: 0 | 1 | 2; // lower is better (tier 0 is best)
  rank: 1 | 2 | 3 | 4 | 5; // higher is better (rank 5 is max)
  affixes: SupportAffix[];
}

export interface ActivationMediumSkillSlot {
  skillType: "activation_medium";
  name: ActivationMediumSkillNmae;
  tier: 0 | 1 | 2 | 3;
  affixes: SupportAffix[];
}

export type BaseSupportSkillSlot =
  | SupportSkillSlot
  | MagnificentSupportSkillSlot
  | NobleSupportSkillSlot
  | ActivationMediumSkillSlot;

export interface SupportSkills {
  1?: BaseSupportSkillSlot;
  2?: BaseSupportSkillSlot;
  3?: BaseSupportSkillSlot;
  4?: BaseSupportSkillSlot;
  5?: BaseSupportSkillSlot;
}

export interface SkillSlot {
  skillName?: string;
  enabled: boolean;
  level?: number; // default 20
  supportSkills: SupportSkills;
}

export interface ActiveSkillSlots {
  1?: SkillSlot;
  2?: SkillSlot;
  3?: SkillSlot;
  4?: SkillSlot;
  5?: SkillSlot;
}

export interface PassiveSkillSlots {
  1?: SkillSlot;
  2?: SkillSlot;
  3?: SkillSlot;
  4?: SkillSlot;
}

export interface SkillPage {
  activeSkills: ActiveSkillSlots;
  passiveSkills: PassiveSkillSlots;
}

export const HERO_MEMORY_TYPES = [
  "Memory of Origin",
  "Memory of Discipline",
  "Memory of Progress",
] as const;
export type HeroMemoryType = (typeof HERO_MEMORY_TYPES)[number];

export type HeroMemorySlot = "slot45" | "slot60" | "slot75";

export interface HeroMemory {
  id: string;
  memoryType: HeroMemoryType;
  rarity: string;
  level: number;
  affixes: Affix[];
}

export interface HeroTrait {
  name: HeroTraitName;
}

export interface HeroTraits {
  level1?: HeroTrait;
  level45?: HeroTrait;
  level45b?: HeroTrait;
  level60?: HeroTrait;
  level60b?: HeroTrait;
  level75?: HeroTrait;
  level75b?: HeroTrait;
}

export interface HeroMemorySlots {
  slot45?: HeroMemory;
  slot60?: HeroMemory;
  slot75?: HeroMemory;
}

export interface HeroPage {
  selectedHero?: HeroName;
  traits: HeroTraits;
  memorySlots: HeroMemorySlots;
  memoryInventory: HeroMemory[];
}

export interface InstalledDestiny {
  destinyName: string;
  destinyType: string;
  affix: Affix;
}

export interface RingSlotState {
  installedDestiny?: InstalledDestiny;
  originalRingName: string;
  originalAffix: Affix;
}

export interface UndeterminedFateSlotState {
  slotType: "micro" | "medium";
  installedDestiny?: InstalledDestiny;
  defaultAffix: Affix; // parsed "+6% damage\n+6% minion damage"
}

export interface UndeterminedFate {
  slots: UndeterminedFateSlotState[];
}

export interface PactspiritSlot {
  pactspiritName: string;
  level: number;
  mainAffix: Affix;
  rings: {
    innerRing1: RingSlotState;
    innerRing2: RingSlotState;
    innerRing3: RingSlotState;
    innerRing4: RingSlotState;
    innerRing5: RingSlotState;
    innerRing6: RingSlotState;
    midRing1: RingSlotState;
    midRing2: RingSlotState;
    midRing3: RingSlotState;
  };
  // 10th node: undetermined fate
  // When undefined: provides defaultUndeterminedAffix
  undeterminedFate?: UndeterminedFate;
  // Always present - the default "+6% damage\n+6% minion damage" for the 10th node
  defaultUndeterminedAffix: Affix;
}

export interface PactspiritPage {
  slot1?: PactspiritSlot;
  slot2?: PactspiritSlot;
  slot3?: PactspiritSlot;
}

export interface Loadout {
  gearPage: GearPage;
  talentPage: TalentPage;
  divinityPage: DivinityPage;
  skillPage: SkillPage;
  heroPage: HeroPage;
  pactspiritPage: PactspiritPage;
  customAffixLines: AffixLine[];
}
