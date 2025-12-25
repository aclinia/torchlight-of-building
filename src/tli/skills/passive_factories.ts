import type { PassiveSkillName } from "@/src/data/skill/types";
import type { PassiveSkillModFactory } from "./types";
import { v } from "./types";

/**
 * Factory functions for passive skill mods.
 * Each factory receives (level, values) where:
 * - level: 1-40
 * - values: named value arrays matching parser output keys
 */
export const passiveSkillModFactories: Partial<
  Record<PassiveSkillName, PassiveSkillModFactory>
> = {
  "Precise: Cruelty": (l, vals) => ({
    buffMods: [
      {
        type: "DmgPct",
        value: v(vals.attackDmgPct, l),
        addn: true,
        modType: "attack",
      },
    ],
    mods: [
      {
        type: "AuraEffPct",
        value: v(vals.auraEffPctPerCrueltyStack, l),
        addn: true,
        per: { stackable: "cruelty_buff", limit: 40 },
        unscalable: true,
      },
    ],
  }),
};
