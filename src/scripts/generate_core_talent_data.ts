import * as cheerio from "cheerio";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { execSync } from "child_process";
import type { CoreTalent } from "../data/core_talent/types";
import { isTree, Tree, Trees } from "../data/talent";

const cleanAffixText = (html: string): string => {
  const NEWLINE_PLACEHOLDER = "\x00";

  // Replace <br> tags with placeholder
  let text = html.replace(/<br\s*\/?>/gi, NEWLINE_PLACEHOLDER);

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

const extractCoreTalents = ($: cheerio.CheerioAPI): CoreTalent[] => {
  const talents: CoreTalent[] = [];

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

const generateDataFile = (talents: CoreTalent[]): string => {
  return `import type { CoreTalent } from "./types";

export const CoreTalents: readonly CoreTalent[] = ${JSON.stringify(talents, null, 2)};
`;
};

const main = async (): Promise<void> => {
  const inputPath = join(
    process.cwd(),
    ".garbage",
    "tlidb",
    "talent",
    "core_talent_node.html",
  );
  const outDir = join(process.cwd(), "src", "data", "core_talent");

  console.log("Reading HTML file from:", inputPath);
  const html = await readFile(inputPath, "utf-8");
  const $ = cheerio.load(html);

  const talents = extractCoreTalents($);

  console.log(`Extracted ${talents.length} core talents`);

  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "core_talents.ts");
  await writeFile(dataPath, generateDataFile(talents), "utf-8");
  console.log(`Generated core_talents.ts`);

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

export { main as generateCoreTalentData };
