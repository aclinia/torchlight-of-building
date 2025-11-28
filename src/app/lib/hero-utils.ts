import { HeroTraits } from "@/src/data/hero_trait/hero_traits";
import { HeroMemories } from "@/src/data/hero_memory/hero_memories";
import type { HeroTrait } from "@/src/data/hero_trait/types";
import type {
  HeroMemoryType,
  RawHeroMemory,
  HeroMemorySlot,
} from "@/src/tli/core";

/**
 * Normalize hero name by removing newlines and extra whitespace
 */
export const normalizeHeroName = (hero: string): string => {
  return hero.replace(/\n\s*/g, " ").trim();
};

/**
 * Get unique list of heroes from the trait data
 */
export const getUniqueHeroes = (): string[] => {
  const heroSet = new Set<string>();
  HeroTraits.forEach((trait) => {
    heroSet.add(normalizeHeroName(trait.hero));
  });
  return Array.from(heroSet).sort();
};

/**
 * Get all traits for a specific hero
 */
export const getTraitsForHero = (hero: string): HeroTrait[] => {
  const normalizedHero = normalizeHeroName(hero);
  return HeroTraits.filter(
    (trait) => normalizeHeroName(trait.hero) === normalizedHero,
  );
};

/**
 * Get traits for a hero at a specific level
 */
export const getTraitsForHeroAtLevel = (
  hero: string,
  level: number,
): HeroTrait[] => {
  return getTraitsForHero(hero).filter((trait) => trait.level === level);
};

/**
 * Get the base trait (level 1) for a hero - auto-selected
 */
export const getBaseTraitForHero = (hero: string): HeroTrait | undefined => {
  const traits = getTraitsForHeroAtLevel(hero, 1);
  return traits[0];
};

/**
 * Memory type restrictions for each slot level
 */
export const MEMORY_SLOT_TYPE_MAP: Record<HeroMemorySlot, HeroMemoryType> = {
  slot45: "Memory of Origin",
  slot60: "Memory of Discipline",
  slot75: "Memory of Progress",
};

/**
 * Level to slot mapping
 */
export const LEVEL_TO_SLOT_MAP: Record<45 | 60 | 75, HeroMemorySlot> = {
  45: "slot45",
  60: "slot60",
  75: "slot75",
};

/**
 * Get base stats available for a memory type
 */
export const getBaseStatsForMemoryType = (
  memoryType: HeroMemoryType,
): string[] => {
  return HeroMemories.filter(
    (m) => m.item === memoryType && m.type === "Base Stats",
  ).map((m) => m.effect);
};

/**
 * Get fixed affixes available for a memory type
 */
export const getFixedAffixesForMemoryType = (
  memoryType: HeroMemoryType,
): string[] => {
  return HeroMemories.filter(
    (m) => m.item === memoryType && m.type === "Fixed Affix",
  ).map((m) => m.effect);
};

/**
 * Get random affixes available for a memory type
 */
export const getRandomAffixesForMemoryType = (
  memoryType: HeroMemoryType,
): string[] => {
  return HeroMemories.filter(
    (m) => m.item === memoryType && m.type === "Random Affix",
  ).map((m) => m.effect);
};

/**
 * Craft a hero memory affix by interpolating ranges at given quality
 * The effect text may contain ranges like (10-12) or (10–12) (en-dash)
 */
export const craftHeroMemoryAffix = (
  effectText: string,
  quality: number,
): string => {
  // Handle both hyphen and en-dash
  const rangePattern = /\((-?\d+)[–-](-?\d+)\)/g;

  return effectText.replace(rangePattern, (_match, minStr, maxStr) => {
    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);
    const value = Math.round(min + (max - min) * (quality / 100));
    return value.toString();
  });
};

/**
 * Format a complete hero memory with all crafted affixes
 */
export const formatCraftedMemoryAffixes = (memory: RawHeroMemory): string[] => {
  const lines: string[] = [];

  // Base stat (no range, static)
  lines.push(memory.baseStat);

  // Fixed affixes
  memory.fixedAffixes.forEach((affix) => {
    lines.push(craftHeroMemoryAffix(affix.effect, affix.quality));
  });

  // Random affixes
  memory.randomAffixes.forEach((affix) => {
    lines.push(craftHeroMemoryAffix(affix.effect, affix.quality));
  });

  return lines;
};

/**
 * Check if a memory can be equipped in a specific slot
 */
export const canEquipMemoryInSlot = (
  memory: RawHeroMemory,
  slot: HeroMemorySlot,
): boolean => {
  return memory.memoryType === MEMORY_SLOT_TYPE_MAP[slot];
};

/**
 * Get compatible memories from inventory for a specific slot
 */
export const getCompatibleMemoriesForSlot = (
  memories: RawHeroMemory[],
  slot: HeroMemorySlot,
): RawHeroMemory[] => {
  return memories.filter((memory) => canEquipMemoryInSlot(memory, slot));
};
