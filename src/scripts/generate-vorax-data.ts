import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import { program } from "commander";
import type { VoraxLimbData } from "../data/vorax/types";
import { fetchPage, processInBatches, toSnakeCase } from "./tlidb-tools";

const BASE_URL = "https://tlidb.com/en";
const VORAX_DIR = join(process.cwd(), ".garbage", "tlidb", "vorax");
const OUT_DIR = join(process.cwd(), "src", "data", "vorax");

const VORAX_LIMB_PAGES = [
  "Vorax_Limb%3A_Hands",
  "Vorax_Limb%3A_Legs",
  "Vorax_Limb%3A_Chest",
  "Vorax_Limb%3A_Head",
  "Vorax_Limb%3A_Neck",
  "Vorax_Limb%3A_Waist",
  "Vorax_Limb%3A_Digits",
];

/**
 * Parses modifier text from an element, handling:
 * - <span class="text-mod"> tags (keep inner text with ndash → hyphen)
 * - <e> hyperlink tags (remove, keep inner text)
 * - <br> tags (convert to newlines)
 * - Various dash characters to regular hyphens
 */
const parseModifierText = (
  // biome-ignore lint/suspicious/noExplicitAny: cheerio internal type
  el: cheerio.Cheerio<any>,
  $: cheerio.CheerioAPI,
): string => {
  const clone = el.clone();

  // Replace <e> hyperlink elements with their text
  clone.find("e").each((_, elem) => {
    $(elem).replaceWith($(elem).text());
  });

  // Remove tooltip icons
  clone.find("i.fa-solid").remove();

  // Replace <br> with placeholder
  let html = clone.html() || "";
  html = html.replace(/<br\s*\/?>/gi, "{NEWLINE}");

  // Parse and extract text
  const processed = cheerio.load(html);
  let text = processed.text();

  // Clean up whitespace
  text = text.replace(/\s+/g, " ").trim();
  text = text.replace(/{NEWLINE}\s*/g, "\n");

  // Normalize dashes
  text = text.replace(/\u2013/g, "-"); // en-dash
  text = text.replace(/\u2014/g, "-"); // em-dash
  text = text.replace(/&ndash;/g, "-");

  return text;
};

/**
 * Map Library column text to affix type
 */
const mapLibraryToAffixType = (
  library: string,
): "Basic" | "Advanced" | "Ultimate" => {
  const lower = library.toLowerCase();
  if (lower.includes("ultimate")) return "Ultimate";
  if (lower.includes("advanced")) return "Advanced";
  return "Basic";
};

/**
 * Parse craftable affixes from #Craft section.
 * Two tables: Pre-fix and Suffix, each with columns: Tier, Modifier, Lv, Weight, Library
 */
const parseCraftableAffixes = (
  $: cheerio.CheerioAPI,
): VoraxLimbData["craftableAffixes"] => {
  const affixes: VoraxLimbData["craftableAffixes"] = [];
  const section = $("#Craft");
  if (section.length === 0) return affixes;

  section.find("table").each((_, table) => {
    const $table = $(table);

    $table.find("tbody tr").each((_, row) => {
      const $row = $(row);
      const tds = $row.find("td");
      if (tds.length < 5) return;

      const tier = $(tds[0]).text().trim();
      const modifier = parseModifierText($(tds[1]), $);
      const library = $(tds[4]).text().trim();

      affixes.push({
        craftableAffix: modifier,
        tier,
        affixType: mapLibraryToAffixType(library),
      });
    });
  });

  return affixes;
};

/**
 * Parse legendary names from #Legendary section.
 * Structure: .col > .d-flex > .flex-grow-1 > a[data-hover*="ItemGold"]
 */
const parseLegendaryNames = ($: cheerio.CheerioAPI): string[] => {
  const names: string[] = [];
  const section = $("#Legendary");
  if (section.length === 0) return names;

  section.find(".flex-grow-1 > a[data-hover]").each((_, el) => {
    const name = $(el).text().trim();
    if (name.length > 0) {
      names.push(name);
    }
  });

  return names;
};

/**
 * Parse base affixes from #BaseAffix section.
 * Table with columns: Tier, Modifier, Level, Weight
 */
const parseBaseAffixes = (
  $: cheerio.CheerioAPI,
): VoraxLimbData["baseAffixes"] => {
  const affixes: VoraxLimbData["baseAffixes"] = [];
  const section = $("#BaseAffix");
  if (section.length === 0) return affixes;

  const table = section.find("table");
  if (table.length === 0) return affixes;

  table.find("tbody tr").each((_, row) => {
    const $row = $(row);
    const tds = $row.find("td");
    if (tds.length < 2) return;

    const tier = $(tds[0]).text().trim();
    const modifier = parseModifierText($(tds[1]), $);

    affixes.push({ affix: modifier, tier });
  });

  return affixes;
};

/**
 * Parse a single Vorax Limb page into VoraxLimbData
 */
const parseVoraxLimbPage = (html: string, pageName: string): VoraxLimbData => {
  const $ = cheerio.load(html);

  // Derive display name from page name: "Vorax_Limb%3A_Hands" -> "Vorax Limb: Hands"
  const name = decodeURIComponent(pageName).replace(/_/g, " ");

  const craftableAffixes = parseCraftableAffixes($);
  const legendaryNames = parseLegendaryNames($);
  const baseAffixes = parseBaseAffixes($);

  console.log(
    `  Craft: ${craftableAffixes.length}, Legendary: ${legendaryNames.length}, BaseAffix: ${baseAffixes.length}`,
  );

  return { name, legendaryNames, craftableAffixes, baseAffixes };
};

const fetchVoraxPages = async (): Promise<void> => {
  await mkdir(VORAX_DIR, { recursive: true });

  console.log(`Fetching ${VORAX_LIMB_PAGES.length} vorax limb pages...`);

  await processInBatches(VORAX_LIMB_PAGES, async (pageName) => {
    const snakeCaseName = toSnakeCase(decodeURIComponent(pageName));
    const filepath = join(VORAX_DIR, `${snakeCaseName}.html`);

    try {
      const url = `${BASE_URL}/${pageName}`;
      const html = await fetchPage(url);
      await writeFile(filepath, html);
      console.log(`Saved: ${filepath}`);
    } catch (error) {
      console.error(`Error fetching ${pageName}:`, error);
    }
  });
};

const generateVoraxDataFile = (allData: VoraxLimbData[]): string => {
  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-vorax-data.ts
import type { VoraxLimbData } from "./types";

export const ALL_VORAX_LIMBS: readonly VoraxLimbData[] = ${JSON.stringify(allData)};
`;
};

interface Options {
  refetch: boolean;
}

const main = async (options: Options): Promise<void> => {
  if (options.refetch) {
    console.log("Refetching vorax limb pages from tlidb...\n");
    await fetchVoraxPages();
    console.log("");
  }

  console.log("Reading vorax limb files from cache...");

  const allData: VoraxLimbData[] = [];

  for (const pageName of VORAX_LIMB_PAGES) {
    const snakeCaseName = toSnakeCase(decodeURIComponent(pageName));
    const filePath = join(VORAX_DIR, `${snakeCaseName}.html`);

    let html: string;
    try {
      html = await readFile(filePath, "utf-8");
    } catch {
      throw new Error(
        `Missing cached file: ${filePath}\nRun with --refetch to download pages first.`,
      );
    }

    console.log(`Processing ${snakeCaseName}...`);
    const data = parseVoraxLimbPage(html, pageName);
    allData.push(data);
  }

  console.log(`\nTotal vorax limbs: ${allData.length}`);

  await mkdir(OUT_DIR, { recursive: true });

  const outPath = join(OUT_DIR, "all-vorax-limbs.ts");
  const content = generateVoraxDataFile(allData);
  await writeFile(outPath, content, "utf-8");
  console.log(`Generated all-vorax-limbs.ts`);

  console.log("\nCode generation complete!");

  execSync("pnpm format", { stdio: "inherit" });
};

program
  .description("Generate vorax limb data from cached HTML pages")
  .option("--refetch", "Refetch HTML pages from tlidb before generating")
  .action((options: Options) => {
    main(options)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error("Script failed:", error);
        process.exit(1);
      });
  })
  .parse();
