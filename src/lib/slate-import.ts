import type { DivinityGod } from "../tli/core";
import { LEGENDARY_SLATE_TEMPLATES } from "./legendary-slate-templates";
import type { DivinitySlate } from "./schemas/divinity.schema";
import { generateItemId } from "./storage";

interface ImportedSlateInput {
  name: string;
  affixes: string[];
}

// Map in-game god slate names to DivinityGod values
const GOD_SLATE_NAME_MAP: Record<string, DivinityGod> = {
  "God of Might's Divinity": "Might",
  "Goddess of Hunting's Divinity": "Hunting",
  "Goddess of Knowledge's Divinity": "Knowledge",
  "God of War's Divinity": "War",
  "Goddess of Deception's Divinity": "Deception",
  "God of Machines' Divinity": "Machines",
};

// Build a lookup from displayName to template
const LEGENDARY_NAME_MAP = new Map(
  Object.values(LEGENDARY_SLATE_TEMPLATES).map((t) => [t.displayName, t]),
);

export const parseImportedSlates = (
  json: string,
): { slates: DivinitySlate[]; errors: string[] } => {
  const errors: string[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { slates: [], errors: ["Invalid JSON"] };
  }

  const arr = Array.isArray(parsed) ? parsed : [parsed];

  const slates: DivinitySlate[] = [];
  for (let i = 0; i < arr.length; i++) {
    const entry = arr[i] as ImportedSlateInput;

    if (typeof entry !== "object" || entry === null) {
      errors.push(`Slate ${i + 1}: not an object`);
      continue;
    }

    if (typeof entry.name !== "string" || entry.name.length === 0) {
      errors.push(`Slate ${i + 1}: missing or empty name`);
      continue;
    }

    const affixes = Array.isArray(entry.affixes)
      ? entry.affixes.filter((a): a is string => typeof a === "string")
      : [];

    // Try matching as legendary slate
    const legendaryTemplate = LEGENDARY_NAME_MAP.get(entry.name);
    if (legendaryTemplate !== undefined) {
      // Copy slates (those with fixedAffixes) store their affix as metaAffixes
      const hasFixedAffixes =
        legendaryTemplate.fixedAffixes !== undefined &&
        legendaryTemplate.fixedAffixes.length > 0;

      slates.push({
        id: generateItemId(),
        shape: legendaryTemplate.shape,
        rotation: 0,
        flippedH: false,
        flippedV: false,
        affixes,
        metaAffixes: hasFixedAffixes ? affixes : [],
        isLegendary: true,
        legendaryName: legendaryTemplate.displayName,
      });
      continue;
    }

    // Try matching as god slate
    const god = GOD_SLATE_NAME_MAP[entry.name];
    if (god !== undefined) {
      slates.push({
        id: generateItemId(),
        god,
        shape: "O",
        rotation: 0,
        flippedH: false,
        flippedV: false,
        affixes,
        metaAffixes: [],
      });
      continue;
    }

    // Unknown name — treat as legendary with the imported name
    slates.push({
      id: generateItemId(),
      shape: "Single",
      rotation: 0,
      flippedH: false,
      flippedV: false,
      affixes,
      metaAffixes: [],
      isLegendary: true,
      legendaryName: entry.name,
    });
  }

  return { slates, errors };
};
