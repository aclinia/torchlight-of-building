import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import type { Destiny } from "../data/destiny/types";

const BASE_URL = "https://tlidb.com/en";
const DESTINY_URL = `${BASE_URL}/Destiny`;
const CACHE_DIR = join(process.cwd(), ".garbage", "tlidb");
const CACHE_PATH = join(CACHE_DIR, "destiny.html");

const fetchPage = async (url: string): Promise<string> => {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

const fetchDestinyHtml = async (useCache: boolean): Promise<string> => {
  if (useCache && existsSync(CACHE_PATH)) {
    console.log("Using cached destiny page");
    return readFile(CACHE_PATH, "utf-8");
  }

  await mkdir(CACHE_DIR, { recursive: true });
  const html = await fetchPage(DESTINY_URL);
  await writeFile(CACHE_PATH, html);
  console.log(`Cached: ${CACHE_PATH}`);
  return html;
};

const cleanAffixHtml = (html: string): string => {
  const $ = cheerio.load(html, null, false);

  // Replace <e> hyperlink elements with their text content
  $("e").each((_, el) => {
    $(el).replaceWith($(el).text());
  });

  // Replace <span class="text-mod"> with their text content
  $("span.text-mod").each((_, el) => {
    $(el).replaceWith($(el).text());
  });

  let text = $.html();

  // Replace <br> tags with newlines
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  text = text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&nbsp;/g, " ");

  // Convert en-dash to hyphen
  text = text.replace(/\u2013/g, "-");

  // Trim each line and remove empty lines
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
};

const parseDestinyEntry = (
  fullName: string,
): { type: string; name: string } | undefined => {
  const colonIdx = fullName.indexOf(":");
  if (colonIdx === -1) {
    // "Undetermined Fate" has no colon
    return { type: fullName, name: fullName };
  }
  const type = fullName.slice(0, colonIdx).trim();
  const name = fullName.slice(colonIdx + 1).trim();
  return { type, name };
};

const extractDestinyData = (html: string): Destiny[] => {
  const $ = cheerio.load(html);
  const items: Destiny[] = [];

  const cols = $("div.col");
  console.log(`Found ${cols.length} destiny entries`);

  cols.each((_, col) => {
    const nameLink = $(col).find("div.flex-grow-1 > a").first();
    const fullName = nameLink.text().trim();

    if (fullName === "") return;

    const parsed = parseDestinyEntry(fullName);
    if (parsed === undefined) return;

    // Affix is usually in a <span data-modifier-id>, but some entries
    // (e.g. "Destiny's Betrayal") have plain text in the div after the name link
    const modifierSpan = $(col).find("span[data-modifier-id]").first();
    const affixContainer = nameLink.next("div").find("div").first();
    const affixHtml =
      modifierSpan.length > 0
        ? modifierSpan.html() || ""
        : affixContainer.html() || "";
    const affix = cleanAffixHtml(affixHtml);

    items.push({ type: parsed.type, name: parsed.name, affix });
  });

  return items;
};

const generateDataFile = (items: Destiny[]): string => {
  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-destiny-data.ts
import type { Destiny } from "./types";

export const Destinies: readonly Destiny[] = ${JSON.stringify(items)};
`;
};

const main = async (): Promise<void> => {
  const useCache = !process.argv.includes("--fetch");

  console.log("Loading destiny HTML...");
  const html = await fetchDestinyHtml(useCache);

  console.log("Extracting destiny data...");
  const items = extractDestinyData(html);
  console.log(`Extracted ${items.length} destinies`);

  if (items.length === 0) {
    throw new Error("No destinies extracted — check HTML structure");
  }

  const outDir = join(process.cwd(), "src", "data", "destiny");
  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "destinies.ts");
  await writeFile(dataPath, generateDataFile(items), "utf-8");
  console.log(`Generated destinies.ts (${items.length} items)`);

  console.log("\nCode generation complete!");
  execSync("pnpm format", { stdio: "inherit" });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });

export { main as generateDestinyData };
