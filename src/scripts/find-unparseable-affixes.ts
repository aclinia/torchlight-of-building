import { CoreTalents } from "@/src/data/core-talent";
import { ALL_GEAR_AFFIXES } from "@/src/data/gear-affix/all-affixes";
import { HeroMemories } from "@/src/data/hero-memory";
import { Talents } from "@/src/data/talent";
import { craft } from "@/src/tli/crafting/craft";
import { parseMod } from "@/src/tli/mod-parser";

const addLines = (allLines: Set<string>, text: string): void => {
  const lines = text.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      allLines.add(trimmed);
    }
  }
};

const main = (): void => {
  // Collect all unique affix lines (excluding base stats)
  const allLines = new Set<string>();

  // Gear affixes
  for (const affix of ALL_GEAR_AFFIXES) {
    // Skip base stats - they don't need to be parsed
    if (affix.affixType === "Base Stats") {
      continue;
    }

    const craftedAffix = craft(affix, 50);
    addLines(allLines, craftedAffix);
  }

  // Hero memories (skip base stats)
  for (const memory of HeroMemories) {
    if (memory.type === "Base Stats") {
      continue;
    }
    addLines(allLines, memory.affix);
  }

  // Talents
  for (const talent of Talents) {
    addLines(allLines, talent.effect);
  }

  // Core talents
  for (const coreTalent of CoreTalents) {
    addLines(allLines, coreTalent.affix);
  }

  // Test each line through mod-parser
  const unparseable: string[] = [];

  for (const line of allLines) {
    const result = parseMod(line);
    if (result === undefined) {
      unparseable.push(line);
    }
  }

  // Output results
  console.log("=== Unparseable Affix Lines ===\n");

  const getFirstAlpha = (s: string): string => {
    const match = s.match(/[a-zA-Z]/);
    return match !== null ? match[0].toLowerCase() : "";
  };

  for (const line of unparseable.sort((a, b) =>
    getFirstAlpha(a).localeCompare(getFirstAlpha(b)),
  )) {
    console.log(line);
  }

  console.log("\n=== Summary ===");
  console.log(`Total unique affix lines: ${allLines.size}`);
  console.log(`Parsed successfully: ${allLines.size - unparseable.length}`);
  console.log(`Unparseable: ${unparseable.length}`);
};

main();
