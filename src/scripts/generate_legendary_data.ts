import * as cheerio from "cheerio";
import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import { join } from "path";
import { execSync } from "child_process";
import type { Legendary } from "../data/legendary/types";

const cleanText = (text: string): string => {
  // Replace en-dash (U+2013) with regular hyphen
  let cleaned = text.replace(/\u2013/g, "-");

  // Normalize whitespace to single spaces
  cleaned = cleaned.replace(/\s+/g, " ");

  return cleaned.trim();
};

const extractLegendary = (
  $: cheerio.CheerioAPI,
  filename: string,
): Legendary | undefined => {
  // Find the SS10Season card (not the previousItem one)
  let mainCard: cheerio.Cheerio<any> | undefined;

  $(".card.ui_item").each((_, card) => {
    const $card = $(card);
    // Skip if it's a previousItem (SS9 card)
    if ($card.hasClass("previousItem")) return;
    // Check if it has item_ver with SS10Season
    const itemVer = $card.find(".item_ver").text().trim();
    if (itemVer === "SS10Season") {
      mainCard = $card;
      return false; // break loop
    }
  });

  if (!mainCard) {
    console.log(`  Skipping ${filename}: No SS10Season card found`);
    return undefined;
  }

  // Extract name
  const name = mainCard.find("h5.card-title.item_rarity").text().trim();

  // Extract baseStat
  const baseStat = cleanText(
    mainCard.find('div[data-block="attrs2"]').text() || "",
  );

  // Extract normal affixes (div.t1)
  const normalAffixes: string[] = [];
  mainCard.find("div.t1").each((_, el) => {
    const affix = cleanText($(el).text());
    if (affix) {
      normalAffixes.push(affix);
    }
  });

  // Find the Corroded card
  let corrodedCard: cheerio.Cheerio<any> | undefined;
  $(".card.ui_item").each((_, card) => {
    const $card = $(card);
    const header = $card.find(".card-header").text().trim();
    if (header === "Corroded") {
      corrodedCard = $card;
      return false; // break loop
    }
  });

  // Extract corruption affixes (div.t0)
  const corruptionAffixes: string[] = [];
  if (corrodedCard) {
    corrodedCard.find("div.t0").each((_, el) => {
      const affix = cleanText($(el).text());
      if (affix) {
        corruptionAffixes.push(affix);
      }
    });
  }

  // Find the Info card and extract baseItem
  let baseItem = "";
  $(".card.ui_item").each((_, card) => {
    const $card = $(card);
    const header = $card.find(".card-header").text().trim();
    if (header === "Info") {
      // Find the Base: line and get the <a> text
      $card.find(".card-body li").each((_, li) => {
        const $li = $(li);
        const text = $li.text();
        if (text.startsWith("Base:")) {
          baseItem = $li.find("a").text().trim();
          return false; // break inner loop
        }
      });
      return false; // break outer loop
    }
  });

  // Skip items without a base item (like Divinity Slates)
  if (!baseItem) {
    console.log(`  Skipping ${filename}: No baseItem found`);
    return undefined;
  }

  return {
    baseItem,
    baseStat,
    name,
    normalAffixes,
    corruptionAffixes,
  };
};

const generateDataFile = (items: Legendary[]): string => {
  return `import type { Legendary } from "./types";

export const Legendaries = ${JSON.stringify(items, null, 2)} as const satisfies readonly Legendary[];

export type LegendaryEntry = (typeof Legendaries)[number];
`;
};

const main = async (): Promise<void> => {
  const inputDir = join(process.cwd(), ".garbage", "tlidb", "legendary_gear");
  const outDir = join(process.cwd(), "src", "data", "legendary");

  console.log("Reading HTML files from:", inputDir);
  const files = await readdir(inputDir);
  const htmlFiles = files.filter((f) => f.endsWith(".html"));
  console.log(`Found ${htmlFiles.length} HTML files`);

  const legendaries: Legendary[] = [];

  for (const filename of htmlFiles) {
    const filepath = join(inputDir, filename);
    const html = await readFile(filepath, "utf-8");
    const $ = cheerio.load(html);

    const legendary = extractLegendary($, filename);
    if (legendary) {
      legendaries.push(legendary);
    }
  }

  // Sort by name for consistent output
  legendaries.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`Extracted ${legendaries.length} legendaries`);

  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "legendaries.ts");
  await writeFile(dataPath, generateDataFile(legendaries), "utf-8");
  console.log(`Generated legendaries.ts`);

  console.log("\nCode generation complete!");
  execSync("pnpm format", { stdio: "inherit" });
};

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Script failed:", error);
      process.exit(1);
    });
}

export { main as generateLegendaryData };
