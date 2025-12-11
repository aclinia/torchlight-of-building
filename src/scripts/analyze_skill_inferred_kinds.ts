import { exec } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import { ActiveSkills } from "../data/skill/active";
import type { BaseSkill, InferredSkillKind } from "../data/skill/types";
import { classifyWithRegex } from "./skill_kind_patterns";

const execAsync = promisify(exec);

interface InferredKindEntry {
  kind: InferredSkillKind;
  reason: string;
}

interface SkillAnalysisResult {
  inferredSkillKinds: InferredKindEntry[];
}

interface OutputEntry {
  inferredSkillKinds: InferredKindEntry[];
  sources?: {
    regex: InferredSkillKind[];
    llm: InferredSkillKind[];
  };
}

interface OutputRecord {
  [skillName: string]: OutputEntry;
}

type Mode = "regex" | "llm" | "hybrid";

interface CliArgs {
  start: number;
  end: number;
  concurrency: number;
  model: string;
  mode: Mode;
  votes: number;
}

const parseArgs = (): CliArgs => {
  const args = process.argv.slice(2);
  let start = 0;
  let end = ActiveSkills.length;
  let concurrency = 5;
  let model = "claude-3-5-haiku-20241022";
  let mode: Mode = "hybrid";
  let votes = 3;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--start" && args[i + 1]) {
      start = Number.parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--end" && args[i + 1]) {
      end = Number.parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--concurrency" && args[i + 1]) {
      concurrency = Number.parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--model" && args[i + 1]) {
      model = args[i + 1];
      i++;
    } else if (args[i] === "--mode" && args[i + 1]) {
      const modeArg = args[i + 1];
      if (modeArg === "regex" || modeArg === "llm" || modeArg === "hybrid") {
        mode = modeArg;
      }
      i++;
    } else if (args[i] === "--votes" && args[i + 1]) {
      votes = Number.parseInt(args[i + 1], 10);
      i++;
    }
  }

  // Clamp values
  start = Math.max(0, Math.min(start, ActiveSkills.length));
  end = Math.max(start, Math.min(end, ActiveSkills.length));
  concurrency = Math.max(1, concurrency);
  votes = Math.max(1, Math.min(votes, 10));

  return { start, end, concurrency, model, mode, votes };
};

const PROMPT_TEMPLATE_PATH = join(
  process.cwd(),
  "src/scripts/prompts/analyze_skill_inferred_kinds.md",
);

const OUTPUT_PATH = join(
  process.cwd(),
  ".garbage/skills/inferred_skill_kinds.json",
);

const buildPrompt = (template: string, skill: BaseSkill): string => {
  return template
    .replace("{{SKILL_NAME}}", skill.name)
    .replace("{{SKILL_TAGS}}", skill.tags.join(", "))
    .replace("{{SKILL_DESCRIPTION}}", skill.description.join("\n\n---\n\n"));
};

const analyzeSkillWithLLM = async (
  prompt: string,
  model: string,
): Promise<SkillAnalysisResult> => {
  // Escape the prompt for shell - use base64 encoding to avoid escaping issues
  const base64Prompt = Buffer.from(prompt).toString("base64");

  const { stdout } = await execAsync(
    `echo "${base64Prompt}" | base64 -d | claude -p - --output-format json --model ${model}`,
    {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    },
  );

  // Parse the JSON response
  const parsed = JSON.parse(stdout.trim());

  // The result property contains the actual response from Claude
  if (parsed.result) {
    // Try to parse the result as JSON (Claude returns a string with JSON inside)
    try {
      return JSON.parse(parsed.result);
    } catch {
      // If result is already an object, return it
      return parsed.result;
    }
  }

  return parsed;
};

// Run multiple LLM calls and take union of results for better recall
const analyzeWithVoting = async (
  prompt: string,
  model: string,
  votes: number,
): Promise<InferredKindEntry[]> => {
  const results = await Promise.all(
    Array.from({ length: votes }, () => analyzeSkillWithLLM(prompt, model)),
  );

  // Collect all kinds with their reasons
  const kindReasons = new Map<InferredSkillKind, string[]>();
  for (const result of results) {
    for (const { kind, reason } of result.inferredSkillKinds || []) {
      const reasons = kindReasons.get(kind) || [];
      reasons.push(reason);
      kindReasons.set(kind, reasons);
    }
  }

  // Return each kind with its first reason
  return [...kindReasons.entries()].map(([kind, reasons]) => ({
    kind,
    reason: reasons[0],
  }));
};

const loadExistingOutput = async (): Promise<OutputRecord> => {
  try {
    const content = await readFile(OUTPUT_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
};

interface ClassificationResult {
  name: string;
  entry: OutputEntry;
  error?: string;
}

// Classify a single skill based on the mode
const classifySkill = async (
  skill: BaseSkill,
  template: string,
  model: string,
  mode: Mode,
  votes: number,
  index: number,
  total: number,
): Promise<ClassificationResult> => {
  const logPrefix = `[${index + 1}/${total}]`;

  try {
    if (mode === "regex") {
      // Fast path: regex only
      console.log(`${logPrefix} Regex: ${skill.name}`);
      const regexKinds = classifyWithRegex(skill);
      const entry: OutputEntry = {
        inferredSkillKinds: regexKinds.map((kind) => ({
          kind,
          reason: "regex match",
        })),
        sources: { regex: regexKinds, llm: [] },
      };
      console.log(
        `${logPrefix} Done: ${skill.name} (${regexKinds.length} kinds via regex)`,
      );
      return { name: skill.name, entry };
    }

    if (mode === "llm") {
      // LLM only with voting
      console.log(`${logPrefix} LLM (${votes} votes): ${skill.name}`);
      const prompt = buildPrompt(template, skill);
      const llmResults = await analyzeWithVoting(prompt, model, votes);
      const llmKinds = llmResults.map((r) => r.kind);
      const entry: OutputEntry = {
        inferredSkillKinds: llmResults,
        sources: { regex: [], llm: llmKinds },
      };
      console.log(
        `${logPrefix} Done: ${skill.name} (${llmKinds.length} kinds via LLM)`,
      );
      return { name: skill.name, entry };
    }

    // Hybrid mode: regex first, LLM if regex found nothing
    const regexKinds = classifyWithRegex(skill);

    if (regexKinds.length > 0) {
      console.log(
        `${logPrefix} Regex: ${skill.name} (${regexKinds.length} kinds)`,
      );
      const entry: OutputEntry = {
        inferredSkillKinds: regexKinds.map((kind) => ({
          kind,
          reason: "regex match",
        })),
        sources: { regex: regexKinds, llm: [] },
      };
      return { name: skill.name, entry };
    }

    // Regex found nothing, use LLM with voting
    console.log(`${logPrefix} LLM fallback (${votes} votes): ${skill.name}`);
    const prompt = buildPrompt(template, skill);
    const llmResults = await analyzeWithVoting(prompt, model, votes);
    const llmKinds = llmResults.map((r) => r.kind);
    const entry: OutputEntry = {
      inferredSkillKinds: llmResults,
      sources: { regex: [], llm: llmKinds },
    };
    console.log(
      `${logPrefix} Done: ${skill.name} (${llmKinds.length} kinds via LLM)`,
    );
    return { name: skill.name, entry };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`${logPrefix} Error: ${skill.name} - ${errorMsg}`);
    return {
      name: skill.name,
      entry: { inferredSkillKinds: [], sources: { regex: [], llm: [] } },
      error: errorMsg,
    };
  }
};

const processInBatches = async <T, R>(
  items: T[],
  concurrency: number,
  processor: (item: T, index: number) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = [];
  let currentIndex = 0;

  const processNext = async (): Promise<void> => {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      const result = await processor(items[index], index);
      results[index] = result;
    }
  };

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => processNext(),
  );
  await Promise.all(workers);

  return results;
};

const main = async (): Promise<void> => {
  const { start, end, concurrency, model, mode, votes } = parseArgs();
  const skillsToProcess = ActiveSkills.slice(start, end);

  console.log("Reading prompt template...");
  const template = await readFile(PROMPT_TEMPLATE_PATH, "utf-8");

  console.log(`\nConfiguration:`);
  console.log(`  Range: ${start} to ${end} (${skillsToProcess.length} skills)`);
  console.log(`  Mode: ${mode}`);
  console.log(`  Concurrency: ${concurrency}`);
  if (mode !== "regex") {
    console.log(`  Model: ${model}`);
    console.log(`  Votes: ${votes}`);
  }
  console.log(`  Total skills in dataset: ${ActiveSkills.length}\n`);

  // Load existing output to merge with
  const existingOutput = await loadExistingOutput();
  const existingCount = Object.keys(existingOutput).length;
  if (existingCount > 0) {
    console.log(`Loaded ${existingCount} existing results to merge with\n`);
  }

  const results = await processInBatches(
    skillsToProcess,
    concurrency,
    (skill, localIndex) =>
      classifySkill(
        skill,
        template,
        model,
        mode,
        votes,
        start + localIndex,
        end,
      ),
  );

  // Merge results into output
  const output: OutputRecord = { ...existingOutput };
  let successCount = 0;
  let errorCount = 0;
  let regexOnlyCount = 0;
  let llmCount = 0;

  for (const { name, entry, error } of results) {
    output[name] = entry;
    if (error) {
      errorCount++;
    } else {
      successCount++;
      if (entry.sources?.llm.length === 0 && entry.sources?.regex.length > 0) {
        regexOnlyCount++;
      } else if ((entry.sources?.llm.length ?? 0) > 0) {
        llmCount++;
      }
    }
  }

  // Ensure output directory exists
  await mkdir(join(process.cwd(), ".garbage/skills"), { recursive: true });

  // Write output
  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");

  console.log(`\nComplete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
  if (mode === "hybrid") {
    console.log(`  Classified by regex only: ${regexOnlyCount}`);
    console.log(`  Required LLM: ${llmCount}`);
  }
  console.log(`  Total in output: ${Object.keys(output).length}`);
  console.log(`  Output: ${OUTPUT_PATH}`);
};

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Script failed:", error);
      process.exit(1);
    });
}

export { main as analyzeSkillInferredKinds };
