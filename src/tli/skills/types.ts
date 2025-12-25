import type { LevelValues, SkillOffense } from "@/src/data/skill/types";
import type { Mod } from "../mod";

/**
 * Safe level-value accessor for factory functions.
 * Level is 1-indexed (1-40), array is 0-indexed.
 */
export const v = (arr: readonly number[], level: number): number => {
  const value = arr[level - 1];
  if (value === undefined) {
    throw new Error(
      `Level ${level} out of bounds for array of length ${arr.length}`,
    );
  }
  return value;
};

/**
 * Factory function for support skill mods.
 * Receives level (1-40) and named value arrays.
 * Returns array of complete Mod objects.
 */
export type SupportSkillModFactory = (
  level: number,
  values: LevelValues,
) => Mod[];

/**
 * Factory function for active skill mods.
 * Returns offense stats, mods, and buff mods separately.
 */
export type ActiveSkillModFactory = (
  level: number,
  values: LevelValues,
) => {
  offense?: SkillOffense[];
  mods?: Mod[];
  buffMods?: Mod[];
};

/**
 * Factory function for passive skill mods.
 * Returns mods and buff mods separately.
 */
export type PassiveSkillModFactory = (
  level: number,
  values: LevelValues,
) => {
  mods?: Mod[];
  buffMods?: Mod[];
};
