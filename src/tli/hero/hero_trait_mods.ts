import type { HeroTraitName } from "@/src/data/hero_trait";
import type { Mod } from "../mod";

type ModFactory = (levelIndex: number) => Mod;

const heroTraitModFactories: Partial<Record<HeroTraitName, ModFactory[]>> = {
  "Cleanse Filth": [
    (i) => ({
      type: "DmgPct",
      value: [0.6, 0.7, 0.8, 0.9, 1.0][i],
      modType: "elemental",
      addn: true,
    }),
    () => ({ type: "ManaBeforeLife", value: 0.25, cond: "realm_of_mercury" }),
  ],
};

export const getHeroTraitMods = (name: HeroTraitName, level: number): Mod[] => {
  return heroTraitModFactories[name]?.map((f) => f(level - 1)) ?? [];
};
