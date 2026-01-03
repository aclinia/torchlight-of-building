import type { ActivationMediumMod } from "../core";
import { t } from "../mod_parser";

const GLOBAL = "global" as const;

/**
 * Generic template parsers for activation medium skill affixes.
 * Each template handles a specific affix pattern across all skills.
 */
const allActivationMediumParsers = [
  t("auto-used supported skills {value:int%} additional damage").output(
    "DmgPct",
    (c) => ({
      value: c.value,
      dmgModType: GLOBAL,
      addn: true,
    }),
  ),
  t("manually used supported skills {value:int%} additional damage").output(
    "DmgPct",
    (c) => ({
      value: c.value,
      dmgModType: GLOBAL,
      addn: true,
    }),
  ),
  t(
    "{value:int%} additional damage for minions summoned by the supported skill",
  ).output("MinionDmgPct", (c) => ({
    value: c.value,
    addn: true,
  })),
];

/**
 * Parse a single activation medium affix text.
 * Returns undefined if no parser matches.
 */
const parseActivationMediumAffix = (
  text: string,
): ActivationMediumMod[] | undefined => {
  const normalized = text.trim().toLowerCase();
  for (const parser of allActivationMediumParsers) {
    const mods = parser.parse(normalized);
    if (mods !== undefined) {
      return mods.map((mod) => ({ mod }));
    }
  }
  return undefined;
};

export const parseActivationMediumAffixes = (
  affixes: string[],
): ActivationMediumMod[][] => {
  return affixes.map((text) => parseActivationMediumAffix(text) ?? []);
};
