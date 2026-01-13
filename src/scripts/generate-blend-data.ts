import { execSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import type { Blend } from "../data/blend/types";
import { cleanEffectTextNew, readCodexHtml } from "./lib/codex";

const extractBlendData = (html: string): Blend[] => {
  const $ = cheerio.load(html);
  const items: Blend[] = [];

  const rows = $('#blend tbody tr[class*="thing"]');
  console.log(`Found ${rows.length} blend rows`);

  rows.each((_, row) => {
    const tds = $(row).find("td");

    if (tds.length !== 3) {
      console.warn(`Skipping row with ${tds.length} columns (expected 3)`);
      return;
    }

    const item: Blend = {
      type: $(tds[0]).text().trim(),
      affix: cleanEffectTextNew($(tds[2]).html() || ""),
    };

    // Only legendary talent nodes are named
    // To keep consistency with how data was previously scraped, we prefix the name in brackets
    const name = $(tds[1]).text().trim();
    if (name !== "") {
      item.affix = `[${name}]` + ` ${item.affix}`;
    }

    items.push(item);
  });

  return items;
};

const generateDataFile = (items: Blend[]): string => {
  return `import type { Blend } from "./types";

export const Blends: readonly Blend[] = ${JSON.stringify(items)};
`;
};

const main = async (): Promise<void> => {
  console.log("Reading HTML file...");
  const html = await readCodexHtml();

  console.log("Extracting blend data...");
  const items = extractBlendData(html);
  console.log(`Extracted ${items.length} blends`);

  const outDir = join(process.cwd(), "src", "data", "blend");
  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "blends.ts");
  await writeFile(dataPath, generateDataFile(items), "utf-8");
  console.log(`Generated blends.ts (${items.length} items)`);

  console.log("\nCode generation complete!");
  execSync("pnpm format", { stdio: "inherit" });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });

export { main as generateBlendData };
