import { RawLoadout, RawSkillWithSupports, RawHeroPage } from "@/src/tli/core";
import { DEBUG_MODE_STORAGE_KEY } from "./constants";

const createEmptySkillSlot = (): RawSkillWithSupports => ({
  enabled: true,
  supportSkills: {},
});

export const createEmptyHeroPage = (): RawHeroPage => ({
  selectedHero: undefined,
  traits: {
    level1: undefined,
    level45: undefined,
    level60: undefined,
    level75: undefined,
  },
  memorySlots: {
    slot45: undefined,
    slot60: undefined,
    slot75: undefined,
  },
});

export const generateItemId = (): string => crypto.randomUUID();

export const loadDebugModeFromStorage = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(DEBUG_MODE_STORAGE_KEY);
    return stored === "true";
  } catch (error) {
    console.error("Failed to load debug mode from localStorage:", error);
    return false;
  }
};

export const saveDebugModeToStorage = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DEBUG_MODE_STORAGE_KEY, enabled.toString());
  } catch (error) {
    console.error("Failed to save debug mode to localStorage:", error);
  }
};

export const createEmptyLoadout = (): RawLoadout => ({
  equipmentPage: {},
  talentPage: {},
  skillPage: {
    activeSkill1: createEmptySkillSlot(),
    activeSkill2: createEmptySkillSlot(),
    activeSkill3: createEmptySkillSlot(),
    activeSkill4: createEmptySkillSlot(),
    passiveSkill1: createEmptySkillSlot(),
    passiveSkill2: createEmptySkillSlot(),
    passiveSkill3: createEmptySkillSlot(),
    passiveSkill4: createEmptySkillSlot(),
  },
  heroPage: createEmptyHeroPage(),
  itemsList: [],
  heroMemoryList: [],
});
