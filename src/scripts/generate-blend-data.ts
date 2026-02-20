import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import type { Blend } from "../data/blend/types";

const BASE_URL = "https://tlidb.com/en";
const BLEND_URL = `${BASE_URL}/Blending_Rituals`;
const CACHE_DIR = join(process.cwd(), ".garbage", "tlidb");
const CACHE_PATH = join(CACHE_DIR, "blending_rituals.html");

const fetchPage = async (url: string): Promise<string> => {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

const fetchBlendHtml = async (useCache: boolean): Promise<string> => {
  if (useCache && existsSync(CACHE_PATH)) {
    console.log("Using cached blending rituals page");
    return readFile(CACHE_PATH, "utf-8");
  }

  await mkdir(CACHE_DIR, { recursive: true });
  const html = await fetchPage(BLEND_URL);
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

  // Get cleaned HTML then strip remaining tags
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

const parseBlendType = (typeText: string): string | undefined => {
  if (typeText.startsWith("Medium Talent")) return "Medium";
  if (typeText.startsWith("Core Talent")) return "Core";
  if (typeText.startsWith("Aromatic Talent")) return "Aromatic";
  return undefined;
};

const extractAromaticAffix = (tooltipHtml: string): string => {
  // data-bs-title contains HTML like:
  // <div class="text-start"><div>Name</div><div>Line1<br/>Line2</div></div>
  const $ = cheerio.load(tooltipHtml, null, false);
  const divs = $(".text-start > div");

  // Skip the first div (name), collect affix lines from remaining divs
  const lines: string[] = [];
  divs.each((i, el) => {
    if (i === 0) return; // skip name div
    const html = $(el).html() || "";
    lines.push(cleanAffixHtml(html));
  });

  return lines.join("\n");
};

const extractBlendData = (html: string): Blend[] => {
  const $ = cheerio.load(html);
  const items: Blend[] = [];

  // Each blend is in a <div class="col"> inside the BlendingRituals tab
  const tab = $("#BlendingRituals");
  const cols = tab.find("div.col");
  console.log(`Found ${cols.length} blend entries`);

  cols.each((_, col) => {
    const affixDiv = $(col).find("div.fw-bold.pb-2");
    const modifierSpan = affixDiv.find("span[data-modifier-id]");

    if (modifierSpan.length === 0) return;

    // The type is in the sibling div after fw-bold
    const typeDiv = affixDiv.next("div");
    const typeText = typeDiv.text().trim();
    const type = parseBlendType(typeText);

    if (type === undefined) {
      console.warn(`Unknown blend type: "${typeText}"`);
      return;
    }

    let affix: string;

    if (type === "Aromatic") {
      // Aromatic blends: name is in <e> tag text, full description in data-bs-title
      const eTag = modifierSpan.find("e");
      const name = eTag.text().trim();
      const tooltipHtml = eTag.attr("data-bs-title") || "";
      const description = extractAromaticAffix(tooltipHtml);
      affix = `[${name}] ${description}`;
    } else {
      // Medium/Core blends: affix is inline HTML in the modifier span
      affix = cleanAffixHtml(modifierSpan.html() || "");
    }

    items.push({ type, affix });
  });

  return items;
};

const generateDataFile = (items: Blend[]): string => {
  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-blend-data.ts
import type { Blend } from "./types";

export const Blends: readonly Blend[] = ${JSON.stringify(items)};
`;
};

const main = async (): Promise<void> => {
  const useCache = !process.argv.includes("--fetch");

  console.log("Loading blending rituals HTML...");
  const html = await fetchBlendHtml(useCache);

  console.log("Extracting blend data...");
  const items = extractBlendData(html);
  console.log(`Extracted ${items.length} blends`);

  if (items.length === 0) {
    throw new Error("No blends extracted — check HTML structure");
  }

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
