import { ALL_GEAR_AFFIXES } from "@/src/data/gear-affix/all-affixes";
import { craft } from "@/src/tli/crafting/craft";
import { parseMod } from "@/src/tli/mod-parser";

const main = (): void => {
  // Collect all unique affix lines
  const allLines = new Set<string>();

  for (const affix of ALL_GEAR_AFFIXES) {
    const craftedAffix = craft(affix, 50);
    const lines = craftedAffix.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length > 0) {
        allLines.add(trimmed);
      }
    }
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

  for (const line of unparseable.sort()) {
    console.log(line);
  }

  console.log("\n=== Summary ===");
  console.log(`Total unique affix lines: ${allLines.size}`);
  console.log(`Parsed successfully: ${allLines.size - unparseable.length}`);
  console.log(`Unparseable: ${unparseable.length}`);
};

main();
