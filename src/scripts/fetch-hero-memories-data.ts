import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";

const BASE_URL = "https://tlidb.com/en/Hero_Memories";
const OUTPUT_DIR = ".garbage/tlidb/hero_memories";

const OUTPUT_FILES = [
  "hero_memories_base_stats.html",
  "hero_memories_fixed_affix.html",
  "hero_memories_random_affix.html",
] as const;

const fetchPage = async (url: string): Promise<string> => {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

interface Options {
  clean: boolean;
}

const main = async (options: Options): Promise<void> => {
  // Handle --clean option
  if (options.clean) {
    for (const filename of OUTPUT_FILES) {
      const filepath = path.join(OUTPUT_DIR, filename);
      if (existsSync(filepath)) {
        await rm(filepath);
        console.log(`Deleted: ${filepath}`);
      }
    }
    console.log("Clean complete.");
    return;
  }

  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Check if all files already exist
  const existingFiles = OUTPUT_FILES.filter((filename) =>
    existsSync(path.join(OUTPUT_DIR, filename)),
  );

  if (existingFiles.length === OUTPUT_FILES.length) {
    console.log("All files already exist. Use --clean to re-fetch.");
    return;
  }

  // Fetch the Hero_Memories page once (hash fragments are client-side only)
  const html = await fetchPage(BASE_URL);

  // Save to all three files
  for (const filename of OUTPUT_FILES) {
    const filepath = path.join(OUTPUT_DIR, filename);
    await writeFile(filepath, html);
    console.log(`Saved: ${filepath}`);
  }

  console.log("Done!");
};

const program = new Command();

program
  .name("fetch-hero-memories-data")
  .description("Fetch hero memories data from TLIDB")
  .option("--clean", "Delete cached files instead of fetching")
  .action((options: Options) => {
    main(options).catch(console.error);
  });

program.parse();
