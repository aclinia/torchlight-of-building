import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { program } from "commander";
import { ActivationMediumSkills } from "@/src/data/skill/activation-medium";
import { ActiveSkills } from "@/src/data/skill/active";
import { PassiveSkills } from "@/src/data/skill/passive";
import { SupportSkills } from "@/src/data/skill/support";
import { MagnificentSupportSkills } from "@/src/data/skill/support-magnificent";
import { fetchPage, processInBatches, toSnakeCase } from "./tlidb-tools";

export type Translate = "en" | "cn";

const BASE_URL = "https://tlidb.com";
const TLIDB_DIR = join(process.cwd(), ".garbage", "tlidb");

// Read name from ActiveSkills, PassiveSkills, SupportSkills, ActivationMediumSkills and MagnificentSupportSkills
const getSkillSet = (): Set<string> => {
  const SkillSet = new Set<string>();
  for (const skill of ActiveSkills) {
    SkillSet.add(skill.name);
  }
  for (const skill of PassiveSkills) {
    SkillSet.add(skill.name);
  }
  for (const skill of SupportSkills) {
    SkillSet.add(skill.name);
  }
  for (const skill of ActivationMediumSkills) {
    SkillSet.add(skill.name);
  }
  for (const skill of MagnificentSupportSkills) {
    SkillSet.add(skill.name);
  }
  return SkillSet;
};

const fetchSkillPages = async (locale: Translate): Promise<void> => {
  const outDir = join(TLIDB_DIR, locale, "skill");
  await mkdir(outDir, { recursive: true });

  const skillSet = getSkillSet();
  console.log(`Found ${skillSet.size} skills`);

  if (skillSet.size === 0) {
    throw new Error("No skills found.");
  }

  console.log(`Fetching ${skillSet.size} pages...`);

  let numoferror = 0;
  await processInBatches([...skillSet], async (name: string) => {
    const snakeCaseName = toSnakeCase(name);
    const filename = `${snakeCaseName}.html`;
    const filepath = join(outDir, filename);

    try {
      const url = `${BASE_URL}/${locale}/${name.replace(/ /g, "_").replace(/:/g, "%3A").replace(/\(/g, "%28").replace(/\)/g, "%29")}`;
      const html = await fetchPage(url);
      await writeFile(filepath, html);
      console.log(`Saved: ${filepath}`);
    } catch (error) {
      numoferror += 1;
      console.error(`Error fetching ${name}:`, error);
    }
  });

  console.log("Fetching complete!, total errors:", numoferror);
};

const generateTranslateNames = async (
  locale: Translate,
): Promise<{ en: string; trans: string }[]> => {
  console.log("Fetching translations for Skills...");
  const outDir = join(TLIDB_DIR, locale, "skill");
  const skillSet = getSkillSet();
  const results: { en: string; trans: string }[] = [];

  for (const name of skillSet) {
    if (name.length === 0) {
      continue;
    }
    const snakeCaseName = toSnakeCase(name);
    const filename = `${snakeCaseName}.html`;
    const filepath = join(outDir, filename);

    try {
      const html = await readFile(filepath, "utf-8");

      // Extract Chinese name from og:title meta tag like <meta property="og:title" content="烈火神盾" />
      const ogTitleMatch = html.match(
        /<meta\s+property="og:title"\s+content="([^"]+)"\s*\/?>/i,
      );

      if (ogTitleMatch) {
        results.push({ en: name, trans: ogTitleMatch[1].trim() });
      } else {
        // Fallback: extract from card-header like <div class="card-header">公牛之怒</div>
        // Skip card-headers inside cards with ui_item class (which has "Alts")
        const cardHeaderMatch = html.match(
          /<div\s+class="card(?!\s+ui_item)"[^>]*>[\s\S]*?<div\s+class="card-header"[^>]*>([^<]+)<\/div>/i,
        );
        if (cardHeaderMatch) {
          const transName = cardHeaderMatch[1].trim().split("/")[0].trim();
          results.push({ en: name, trans: transName });
        } else {
          console.log(`No translation found for Skill: ${name}`);
          results.push({ en: name, trans: "" });
        }
      }
    } catch {
      // Skip test skills that don't exist on tlidb
      console.log(`No page found for Skill: ${name} (skipped)`);
      results.push({ en: name, trans: "" });
    }
  }
  return results;
};

const generateSkillPO = async (): Promise<void> => {
  const Translations = await generateTranslateNames("cn");
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
  for (const r of Translations) {
    po += `#. js-lingui-explicit-id\n`;
    po += `#: src/data/translate/skills.ts:${n}\n`;
    po += `msgid "${r.en}"\n`;
    po += `msgstr "${r.trans}"\n\n`;
    n += 1;
  }

  const outDir = join(process.cwd(), "src", "locales");
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "zh", "skills.po"), po);
  console.log("Done! Generated src/locales/zh/skills.po");
};

const generateSkillTS = async () => {
  const skillSet = getSkillSet();
  const text = `import { i18n } from "@lingui/core";

export const skillNames = [
${[...skillSet].map((name: string) => `  i18n._("${name}")`).join(",\n")},
] as const;
`;

  const outDir = join(process.cwd(), "src", "data", "translate");
  await mkdir(outDir, { recursive: true });

  await writeFile(join(outDir, "skills.ts"), text);
};

interface Options {
  refetch: boolean;
}

const main = async (options: Options) => {
  if (options.refetch) {
    console.log("Refetching skill pages from tlidb...\n");
    await fetchSkillPages("cn");
    console.log("");
  }
  await generateSkillPO();
  await generateSkillTS();
};

program
  .description("Generate skill translate from cached HTML pages")
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
