import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import { program } from "commander";
import type { God, Talent, Tree, Type } from "../data/talent/types";
import { Gods, Trees } from "../data/talent/types";

// ============================================================================
// Fetching
// ============================================================================

const BASE_URL = "https://tlidb.com/en";
const TALENT_CACHE_DIR = join(process.cwd(), ".garbage", "tlidb", "talent");
const TALENT_CACHE_FILE = join(TALENT_CACHE_DIR, "talent.html");

const fetchPage = async (url: string): Promise<string> => {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

const fetchTalentPage = async (): Promise<void> => {
  await mkdir(TALENT_CACHE_DIR, { recursive: true });
  const html = await fetchPage(`${BASE_URL}/Talent`);
  await writeFile(TALENT_CACHE_FILE, html);
  console.log(`Saved: ${TALENT_CACHE_FILE}`);
};

// ============================================================================
// Tree → God mapping
// ============================================================================

// Trees are grouped by god in types.ts: 5 per god (except New God which has 1)
const TREE_TO_GOD: Record<Tree, God> = (() => {
  const map: Partial<Record<Tree, God>> = {};
  // Index into Trees array, grouped by god
  const godTreeCounts: [God, number][] = [
    ["Deception", 5],
    ["New God", 1],
    ["Hunting", 5],
    ["Knowledge", 5],
    ["Machines", 5],
    ["Might", 5],
    ["War", 5],
  ];

  let idx = 0;
  for (const [god, count] of godTreeCounts) {
    for (let i = 0; i < count; i++) {
      const tree = Trees[idx];
      if (tree === undefined) {
        throw new Error(`Tree index ${idx} out of bounds`);
      }
      map[tree] = god;
      idx++;
    }
  }

  // Validate all trees are mapped
  for (const tree of Trees) {
    if (map[tree] === undefined) {
      throw new Error(`Tree "${tree}" has no god mapping`);
    }
  }

  return map as Record<Tree, God>;
})();

// Validate the mapping covers all gods
for (const god of Gods) {
  const trees = Object.entries(TREE_TO_GOD).filter(([_, g]) => g === god);
  if (trees.length === 0) {
    throw new Error(`God "${god}" has no trees mapped`);
  }
}

// ============================================================================
// Type label mapping
// ============================================================================

const TYPE_LABEL_MAP: Record<string, Type> = {
  "Micro Talent": "Micro",
  "Medium Talent": "Medium",
  "Legendary Medium Talent": "Legendary Medium",
};

// ============================================================================
// Parsing
// ============================================================================

const cleanEffectHtml = (html: string): string => {
  // Use cheerio to properly extract text, avoiding attribute content leaking
  // (e.g., <e data-bs-title="tooltip text">visible text</e>)
  const $ = cheerio.load(html, undefined, false);

  // Replace <br> with newline text nodes before extracting text
  $("br").replaceWith("\n");

  // Get text content (cheerio's .text() ignores attributes like data-bs-title)
  let text = $.text();

  // Convert en-dash to hyphen
  text = text.replace(/\u2013/g, "-");

  // Trim each line, normalize whitespace, remove empty lines
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
};

const extractTalentData = (html: string): Talent[] => {
  const $ = cheerio.load(html);
  const items: Talent[] = [];

  // Find the Talent tab content (id="Talent")
  const talentTab = $("#Talent");
  if (talentTab.length === 0) {
    throw new Error('Could not find Talent tab (id="Talent")');
  }

  // Each talent entry is a .col within the .row grid
  const cols = talentTab.find("div.col");
  console.log(`Found ${cols.length} talent entries in Talent tab`);

  cols.each((_, col) => {
    const $col = $(col);

    // Extract name/type label from the first span in the header
    const headerDiv = $col.find("div.d-flex.justify-content-between");
    const nameSpan = headerDiv.find("span").first();
    const nameText = nameSpan.text().trim();

    // Extract tree from the link
    const treeLink = headerDiv.find("a");
    const treeName = treeLink.text().trim() as Tree;

    if (!Trees.includes(treeName)) {
      console.warn(`Unknown tree: "${treeName}", skipping entry`);
      return;
    }

    // Determine god from tree
    const god = TREE_TO_GOD[treeName];

    // Determine type and name based on image
    const img = $col.find("img").first();
    const imgSrc = img.attr("src") ?? "";
    const isCoreTalent = imgSrc.includes("CoreTalentIcon");

    let type: Type;
    let name: string;

    if (isCoreTalent) {
      type = "Core";
      name = nameText;
    } else {
      const mappedType = TYPE_LABEL_MAP[nameText];
      if (mappedType === undefined) {
        throw new Error(
          `Unknown talent type label: "${nameText}" for tree "${treeName}"`,
        );
      }
      type = mappedType;
      name = "";
    }

    // Extract effect text: everything in flex-grow-1 after the header div
    const contentDiv = $col.find("div.flex-grow-1");
    // Clone to avoid modifying the DOM
    const contentClone = contentDiv.clone();
    // Remove the header div to get just the effect
    contentClone.find("div.d-flex.justify-content-between").remove();
    const effectHtml = contentClone.html() ?? "";
    const effect = cleanEffectHtml(effectHtml);

    items.push({ god, tree: treeName, type, name, effect });
  });

  return items;
};

const generateDataFile = (items: Talent[]): string => {
  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-talent-data.ts
import type { Talent } from "./types";

export const Talents: readonly Talent[] = ${JSON.stringify(items)};
`;
};

interface Options {
  refetch: boolean;
}

const main = async (options: Options): Promise<void> => {
  if (options.refetch) {
    console.log("Refetching talent page from tlidb...\n");
    await fetchTalentPage();
    console.log("");
  }

  console.log("Reading cached HTML file...");
  const html = await readFile(TALENT_CACHE_FILE, "utf-8");

  console.log("Extracting talent data...");
  const items = extractTalentData(html);
  console.log(`Extracted ${items.length} talents`);

  // Log breakdown by type
  const typeCounts = new Map<string, number>();
  for (const item of items) {
    typeCounts.set(item.type, (typeCounts.get(item.type) ?? 0) + 1);
  }
  for (const [type, count] of typeCounts) {
    console.log(`  ${type}: ${count}`);
  }

  const outDir = join(process.cwd(), "src", "data", "talent");
  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "talents.ts");
  await writeFile(dataPath, generateDataFile(items), "utf-8");
  console.log(`Generated talents.ts (${items.length} items)`);

  console.log("\nCode generation complete!");
  execSync("pnpm format", { stdio: "inherit" });
};

program
  .description("Generate talent data from cached HTML pages")
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
