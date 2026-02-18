import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { program } from "commander";
import { HeroTraits } from "../data/hero-trait/hero-traits";
import { fetchPage, processInBatches, toSnakeCase } from "./tlidb-tools";

export type Translate = "en" | "cn";

const BASE_URL = "https://tlidb.com";
const LEGENDARY_GEAR_DIR = join(process.cwd(), ".garbage", "tlidb");

const GetHeroName = (): Set<string> => {
  return new Set(HeroTraits.map((t) => t.hero));
};

const GetHerolist = (): { href: string; name: string }[] => {
  const links: { href: string; name: string }[] = [];
  for (const hero of GetHeroName()) {
    const heroName = hero.split("(")[0].trim();
    const afterColon = heroName.includes(":")
      ? heroName.split(":")[1]
      : heroName;
    const href = afterColon
      .trim()
      .replace(/^_+|_+$/g, "")
      .replace(/ /g, "_")
      .replace(/'/g, "%27")
      .replace(/Incarnation_of_The_Gods/g, "Incarnation_of_the_Gods");
    links.push({ href: href, name: hero });
  }
  return links;
};

// Hero traits are already listed in hero.html, no need to fetch individual pages
const fetchHeroPages = async (locale: Translate): Promise<void> => {
  const outDir = join(LEGENDARY_GEAR_DIR, locale, "hero");
  await mkdir(outDir, { recursive: true });

  await processInBatches(GetHerolist(), async ({ href, name }) => {
    const snakeCaseName = toSnakeCase(href);
    const filename = `${snakeCaseName}.html`;
    const filepath = join(outDir, filename);
    const enfilepath = join(LEGENDARY_GEAR_DIR, "en", "hero", filename);
    await mkdir(join(LEGENDARY_GEAR_DIR, "en", "hero"), { recursive: true });

    try {
      const url = `${BASE_URL}/${locale}/${href}`;
      const enurl = `${BASE_URL}/en/${href}`;
      const html = await fetchPage(url);
      const enhtml = await fetchPage(enurl);
      await writeFile(filepath, html);
      await writeFile(enfilepath, enhtml);
      console.log(`Saved: ${filepath}`);
      console.log(`Saved: ${enfilepath}`);
    } catch (error) {
      console.warn(`Error fetching ${name} (${href}):`, error);
    }
  });
};

const fetchHeroTrait = async (
  name: string,
): Promise<{
  traits: { en: string; cn: string; level: number }[];
  featureTranslate: { cn: string };
  heroName: { cn: string; nickname: string };
}> => {
  const html = await readFile(
    join(LEGENDARY_GEAR_DIR, "cn", "hero", `${toSnakeCase(name)}.html`),
    "utf-8",
  );
  const enhtml = await readFile(
    join(LEGENDARY_GEAR_DIR, "en", "hero", `${toSnakeCase(name)}.html`),
    "utf-8",
  );

  // Extract <div class="fw-bold">Name</div>Require lv XX or 需求等级 XX pattern
  const traitPattern =
    /<div class="fw-bold">([^<]+)<\/div>\s*(?:Require lv|需求等级) (\d+)/g;

  const cnTraits: { name: string; level: number }[] = [];
  for (
    let match: RegExpExecArray | null = traitPattern.exec(html);
    match !== null;
    match = traitPattern.exec(html)
  ) {
    cnTraits.push({ name: match[1].trim(), level: parseInt(match[2], 10) });
  }

  const enTraits: { name: string; level: number }[] = [];
  for (
    let match: RegExpExecArray | null = traitPattern.exec(enhtml);
    match !== null;
    match = traitPattern.exec(enhtml)
  ) {
    enTraits.push({ name: match[1].trim(), level: parseInt(match[2], 10) });
  }

  // Pair by level
  if (cnTraits.length !== enTraits.length) {
    throw new Error(
      `Trait count mismatch for ${name}: cn=${cnTraits.length}, en=${enTraits.length}`,
    );
  }
  const traits: { en: string; cn: string; level: number }[] = [];
  for (let i = 0; i < cnTraits.length; i++) {
    traits.push({
      en: enTraits[i].name,
      cn: cnTraits[i].name,
      level: cnTraits[i].level,
    });
  }

  // Extract trait name translation: <div class="card-header">TraitName - Hero Trait /8 </div>
  const cnFeaturePattern =
    /<div class="card-header">([^<]+?)\s*-\s*英雄特性\s*\/(\d+)\s*<\/div>/g;

  const cnFeatureMatches: { name: string; count: number }[] = [];
  for (
    let match: RegExpExecArray | null = cnFeaturePattern.exec(html);
    match !== null;
    match = cnFeaturePattern.exec(html)
  ) {
    cnFeatureMatches.push({
      name: match[1].trim(),
      count: parseInt(match[2], 10),
    });
  }

  let featureTranslate: { cn: string } | null = null;
  if (cnFeatureMatches.length > 0) {
    featureTranslate = { cn: cnFeatureMatches[0].name };
  }

  // Extract hero name: <a href="Pin">Escaper|Bin</a>
  // Format: <a href="EnglishHeroName">ChineseTranslation|ChineseNickname</a>
  const heroPattern = /<a href="([^"]+)">([^<|]+)\|([^<]+)<\/a>/g;

  let heroName: { cn: string; nickname: string } = { cn: "", nickname: "" };
  const match = heroPattern.exec(html);
  while (match !== null) {
    const cnName = match[2].trim();
    const nickname = match[3].trim();
    heroName = { cn: cnName, nickname };
    break;
  }

  return { traits, featureTranslate: featureTranslate!, heroName: heroName };
};

const generateHeroText = async (): Promise<string> => {
  const herolist = GetHerolist();
  const allTraitNames: string[] = [];

  for (const h of herolist) {
    console.log(`Fetching traits for: ${h.name}`);
    try {
      const result = await fetchHeroTrait(h.href);
      for (const trait of result.traits) {
        allTraitNames.push(trait.en);
      }
    } catch (error) {
      console.warn(`Error fetching traits for ${h.name}:`, error);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-hero-translate.ts
import { i18n } from "@lingui/core";

export const heroNames = [
${herolist.map((h) => `  i18n._("${h.name}")`).join(",\n")},
] as const;

export const heroTraitNames = [
${allTraitNames.map((t) => `  i18n._("${t}")`).join(",\n")},
] as const;
`;
};

const generateHeroTranslate = async (): Promise<
  { en: string; cn: string }[]
> => {
  const herolist = GetHerolist();
  const results: { en: string; cn: string }[] = [];

  for (const h of herolist) {
    console.log(`Fetching translate for: ${h.name}`);
    try {
      const result = await fetchHeroTrait(h.href);
      for (const trait of result.traits) {
        results.push({ en: trait.en, cn: trait.cn });
      }
      results.push({
        en: h.name,
        cn:
          result.featureTranslate.cn +
          " " +
          result.heroName?.cn +
          result.heroName?.nickname,
      });
      console.log(h.name);
    } catch (error) {
      console.warn(`Error fetching traits for ${h.name}:`, error);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
};

const generateHeroPO = async () => {
  const outDir = join(process.cwd(), "src", "locales");
  await mkdir(outDir, { recursive: true });

  console.log("Fetching Chinese translations for Hero Traits...");
  const results = await generateHeroTranslate();

  // Generate .po format
  let po = 'msgid ""\n';
  po += 'msgstr ""\n';
  po += '"Project-Id-Version: \\n"\n';
  po += '"Report-Msgid-Bugs-To: \\n"\n';
  po += '"POT-Creation-Date: \\n"\n';
  po += '"PO-Revision-Date: \\n"\n';
  po += '"Last-Translator: \\n"\n';
  po += '"Language: \\n"\n';
  po += '"Language-Team: \\n"\n';
  po += '"Content-Type: \\n"\n';
  po += '"Content-Transfer-Encoding: \\n"\n';
  po += '"Plural-Forms: \\n"\n\n';

  let n = 4;
  for (const r of results) {
    po += `#. js-lingui-explicit-id\n`;
    po += `#: src/data/translate/hero.ts:${n}\n`;
    po += `msgid "${r.en}"\n`;
    po += `msgstr "${r.cn}"\n\n`;
    n += 1;
  }

  await writeFile(join(outDir, "zh", "hero.po"), po);
};

const generateHeroTS = async () => {
  const outDir = join(process.cwd(), "src", "data", "translate");
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "hero.ts"), await generateHeroText());
};

const main = async (refetch: boolean) => {
  if (refetch) {
    console.log("Refetching hero pages from tlidb...\n");
    await fetchHeroPages("cn");
  }

  await generateHeroTS();
  await generateHeroPO();
};

program
  .description("Generate hero trait translate from cached HTML pages")
  .option("--refetch", "Refetch HTML pages from tlidb before generating")
  .action((options) => {
    main(!!options.refetch)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error("Script failed:", error);
        process.exit(1);
      });
  })
  .parse();
