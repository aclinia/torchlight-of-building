// Public exports - NO direct saveData access possible
export { useBuilderActions } from "./hooks";
export { useSaveDataRaw } from "./raw-access";
export {
  useBuilderState,
  useCalculationsSelectedSkill,
  useConfiguration,
  useConfigurationPage,
  useCurrentSaveId,
  useCurrentSaveName,
  useHasUnsavedChanges,
  useLoadout,
  useSavesIndex,
  useTalentTree,
} from "./selectors";
export type {
  // Re-exported types for action parameters
  AllocatedTalentNode,
  BuilderActions,
  BuilderReadableState,
  ConfigurationPage,
  CoreDivinitySlate,
  CraftedInverseImage,
  CraftedPrism,
  DivinitySlate,
  Gear,
  GearSlot,
  HeroMemory,
  HeroMemorySlot,
  InstalledDestinyResult,
  PactspiritSlot,
  PactspiritSlotIndex,
  ReflectedAllocatedNode,
  RingSlotKey,
  RingSlotState,
  SaveData,
  SavesIndex,
  SkillSlot,
  SkillSlots,
  SupportSkill,
  SupportSkills,
  TreeSlot,
} from "./types";

// DO NOT export:
// - internalStore (the actual zustand store)
// - anything from internal.ts
