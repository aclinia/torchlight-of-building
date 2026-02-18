import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import { program } from "commander";
import type { BaseCoreTalent } from "../data/core-talent/types";
import { isTree } from "../data/talent";

// ============================================================================
// Fetching
// ============================================================================

const BASE_URL = "https://tlidb.com/en";
const CORE_TALENT_URL = `${BASE_URL}/Talent#CoreTalentNode`;
const CORE_TALENT_DIR = join(process.cwd(), ".garbage", "tlidb", "core_talent");
const CORE_TALENT_FILE = "core_talent_node.html";

const fetchPage = async (url: string): Promise<string> => {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

const fetchCoreTalentPage = async (): Promise<void> => {
  await mkdir(CORE_TALENT_DIR, { recursive: true });

  const html = await fetchPage(CORE_TALENT_URL);
  const filepath = join(CORE_TALENT_DIR, CORE_TALENT_FILE);
  await writeFile(filepath, html);
  console.log(`Saved: ${filepath}`);
  console.log("Fetching complete!");
};

// ============================================================================
// Parsing
// ============================================================================

const TLIDB_HTML_PATH = join(CORE_TALENT_DIR, CORE_TALENT_FILE);

const cleanAffixText = (html: string): string => {
  const NEWLINE_PLACEHOLDER = "\x00";

  // Remove data-bs-title attributes (tooltip content we don't want)
  let text = html.replace(/\s*data-bs-title="[^"]*"/g, "");

  // Replace <br> tags with placeholder
  text = text.replace(/<br\s*\/?>/gi, NEWLINE_PLACEHOLDER);

  // Remove all HTML tags but keep content
  text = text.replace(/<[^>]+>/g, "");

  // Decode common HTML entities
  text = text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Normalize whitespace (excluding placeholder)
  text = text.replace(/[ \t]+/g, " ");

  // Restore newlines
  text = text.replace(new RegExp(NEWLINE_PLACEHOLDER, "g"), "\n");

  // Clean up: trim each line and remove empty lines
  text = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  return text.trim();
};

const extractCoreTalents = ($: cheerio.CheerioAPI): BaseCoreTalent[] => {
  const talents: BaseCoreTalent[] = [];

  $("div.col").each((_, col) => {
    const contentDiv = $(col).find("div.flex-grow-1.mx-2.my-1");
    if (contentDiv.length === 0) return;

    // Extract name from span.fw-bold
    const name = contentDiv.find("span.fw-bold").first().text().trim();
    if (!name) return;

    // Extract tree from the anchor tag
    const tree = contentDiv.find("a").first().text().trim();
    if (!tree) return;
    if (!isTree(tree)) return;

    // Skip "New God" talents
    if (tree === "New God") return;

    // Get affix: clone the content div, remove the header, get remaining HTML
    const contentClone = contentDiv.clone();
    contentClone.find("div.d-flex.justify-content-between").remove();
    const affixHtml = contentClone.html() || "";
    const affix = cleanAffixText(affixHtml);

    if (affix) {
      talents.push({ name, tree, affix });
    }
  });

  return talents;
};

const generateDataFile = (talents: BaseCoreTalent[]): string => {
  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-core-talent-data.ts
import type { BaseCoreTalent } from "./types";

export const CoreTalents = ${JSON.stringify(talents)} as const satisfies readonly BaseCoreTalent[];
`;
};

interface Options {
  refetch: boolean;
}

const main = async (options: Options): Promise<void> => {
  if (options.refetch) {
    console.log("Refetching core talent page from tlidb...\n");
    await fetchCoreTalentPage();
    console.log("");
  }

  const outDir = join(process.cwd(), "src", "data", "core-talent");

  console.log("Reading HTML file from:", TLIDB_HTML_PATH);
  const html = await readFile(TLIDB_HTML_PATH, "utf-8");
  const $ = cheerio.load(html);

  const talents = extractCoreTalents($);

  console.log(`Extracted ${talents.length} core talents`);

  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "core-talents.ts");
  await writeFile(dataPath, generateDataFile(talents), "utf-8");
  console.log(`Generated core-talents.ts`);

  console.log("\nCode generation complete!");
  execSync("pnpm format", { stdio: "inherit" });
};

program
  .description("Generate core talent data from cached HTML pages")
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
