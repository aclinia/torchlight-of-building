import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import { program } from "commander";

// ============================================================================
// Fetching
// ============================================================================

const BASE_URL = "https://tlidb.com/en";
const HYPERLINK_URL = `${BASE_URL}/Hyperlink`;
const HYPERLINK_DIR = join(process.cwd(), ".garbage", "tlidb", "hyperlink");
const HYPERLINK_FILE = "hyperlink.html";

const fetchPage = async (url: string): Promise<string> => {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

const fetchHyperlinkPage = async (): Promise<void> => {
  await mkdir(HYPERLINK_DIR, { recursive: true });

  const html = await fetchPage(HYPERLINK_URL);
  const filepath = join(HYPERLINK_DIR, HYPERLINK_FILE);
  await writeFile(filepath, html);
  console.log(`Saved: ${filepath}`);
  console.log("Fetching complete!");
};

// ============================================================================
// Parsing
// ============================================================================

const TLIDB_HTML_PATH = join(HYPERLINK_DIR, HYPERLINK_FILE);

const cleanDescription = (html: string): string => {
  const NEWLINE_PLACEHOLDER = "\x00";

  // Replace <br> tags with placeholder
  let text = html.replace(/<br\s*\/?>/gi, NEWLINE_PLACEHOLDER);

  // Remove all HTML tags but keep content (strips <e> tags etc.)
  text = text.replace(/<[^>]+>/g, "");

  // Decode common HTML entities
  text = text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Replace Unicode hyphens/dashes with ASCII hyphen
  text = text.replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-");

  // Replace other common Unicode punctuation with ASCII equivalents
  text = text.replace(/[\u2018\u2019]/g, "'");
  text = text.replace(/[\u201C\u201D]/g, '"');

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

const extractHyperlinks = ($: cheerio.CheerioAPI): Record<string, string> => {
  const hyperlinks: Record<string, string> = {};

  $("table tbody tr").each((_, row) => {
    const tds = $(row).find("td");
    if (tds.length < 2) return;

    const name = $(tds[0]).find("a").first().text().trim();
    if (name === "") return;

    // Skip duplicates — keep first occurrence
    if (name in hyperlinks) return;

    const descriptionHtml = $(tds[1]).html() || "";
    const description = cleanDescription(descriptionHtml);

    if (description !== "") {
      hyperlinks[name] = description;
    }
  });

  return hyperlinks;
};

const generateDataFile = (hyperlinks: Record<string, string>): string => {
  const entries = Object.entries(hyperlinks)
    .map(([name, desc]) => `  ${JSON.stringify(name)}: ${JSON.stringify(desc)}`)
    .join(",\n");

  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-hyperlink-data.ts
export const Hyperlinks: Record<string, string> = {
${entries},
};
`;
};

interface Options {
  refetch: boolean;
}

const main = async (options: Options): Promise<void> => {
  if (options.refetch) {
    console.log("Refetching hyperlink page from tlidb...\n");
    await fetchHyperlinkPage();
    console.log("");
  }

  const outDir = join(process.cwd(), "src", "data", "hyperlink");

  console.log("Reading HTML file from:", TLIDB_HTML_PATH);
  const html = await readFile(TLIDB_HTML_PATH, "utf-8");
  const $ = cheerio.load(html);

  const hyperlinks = extractHyperlinks($);

  const count = Object.keys(hyperlinks).length;
  console.log(`Extracted ${count} hyperlinks`);

  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "hyperlinks.ts");
  await writeFile(dataPath, generateDataFile(hyperlinks), "utf-8");
  console.log("Generated hyperlinks.ts");

  console.log("\nCode generation complete!");
  execSync("pnpm format", { stdio: "inherit" });
};

program
  .description("Generate hyperlink data from cached HTML pages")
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
