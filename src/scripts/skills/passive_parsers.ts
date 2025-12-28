import { findColumn, validateAllLevels } from "./progression_table";
import { template } from "./template-compiler";
import type { SupportLevelParser } from "./types";

export const preciseCrueltyParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;

  const descriptCol = findColumn(progressionTable, "descript", skillName);
  const attackDmgPct: Record<number, number> = {};
  const auraEffPctPerCrueltyStack: Record<number, number> = {};

  for (const [levelStr, text] of Object.entries(descriptCol.rows)) {
    const level = Number(levelStr);

    // Match "+12.5% additional Attack Damage" or "12.5% additional Attack Damage"
    const dmgMatch = template("{value:dec%} additional attack damage").match(
      text,
      skillName,
    );
    attackDmgPct[level] = dmgMatch.value;

    // Match "2.5% additional Aura Effect per stack of the buff"
    const auraEffMatch = template(
      "{value:dec%} additional aura effect per stack",
    ).match(text, skillName);
    auraEffPctPerCrueltyStack[level] = auraEffMatch.value;
  }

  validateAllLevels(attackDmgPct, skillName);
  validateAllLevels(auraEffPctPerCrueltyStack, skillName);

  return {
    attackDmgPct,
    auraEffPctPerCrueltyStack,
  };
};
