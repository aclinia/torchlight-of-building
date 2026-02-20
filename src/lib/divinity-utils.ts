import { Talents } from "@/src/data/talent/talents";
import type { AnySlateShape, DivinitySlate } from "@/src/tli/core";
import { LEGENDARY_SLATE_TEMPLATES } from "./legendary-slate-templates";
import type { DivinityAffixType, DivinityGod } from "./save-data";

// Build reverse lookup from displayName → template
const LEGENDARY_NAME_TO_TEMPLATE = new Map(
  Object.values(LEGENDARY_SLATE_TEMPLATES).map((t) => [t.displayName, t]),
);

export const getSlateShape = (slate: {
  shape?: AnySlateShape;
  isLegendary?: boolean;
  legendaryName?: string;
}): AnySlateShape => {
  if (slate.isLegendary === true && slate.legendaryName !== undefined) {
    const template = LEGENDARY_NAME_TO_TEMPLATE.get(slate.legendaryName);
    if (template !== undefined) {
      return template.shape;
    }
    return "Single";
  }
  return slate.shape ?? "Single";
};

export interface DivinityAffix {
  effect: string;
  type: DivinityAffixType;
}

export const getDivinityAffixes = (god: DivinityGod): DivinityAffix[] => {
  const seen = new Set<string>();
  const result: DivinityAffix[] = [];

  Talents.filter(
    (t) =>
      t.god === god && (t.type === "Legendary Medium" || t.type === "Medium"),
  ).forEach((t) => {
    if (!seen.has(t.effect)) {
      seen.add(t.effect);
      result.push({ effect: t.effect, type: t.type as DivinityAffixType });
    }
  });

  return result;
};

export const GOD_COLORS: Record<DivinityGod, string> = {
  Hunting: "bg-emerald-600",
  Deception: "bg-purple-600",
  Knowledge: "bg-blue-600",
  War: "bg-red-600",
  Machines: "bg-cyan-500",
  Might: "bg-stone-500",
};

export const GOD_BORDER_COLORS: Record<DivinityGod, string> = {
  Hunting: "border-emerald-500",
  Deception: "border-purple-500",
  Knowledge: "border-blue-500",
  War: "border-red-500",
  Machines: "border-cyan-400",
  Might: "border-stone-400",
};

export const GOD_TEXT_COLORS: Record<DivinityGod, string> = {
  Hunting: "text-emerald-400",
  Deception: "text-purple-400",
  Knowledge: "text-blue-400",
  War: "text-red-400",
  Machines: "text-cyan-400",
  Might: "text-stone-400",
};

// Legendary slate colors (orange theme)
export const LEGENDARY_SLATE_COLOR = "bg-orange-600";
export const LEGENDARY_SLATE_BORDER = "border-orange-500";
export const LEGENDARY_SLATE_TEXT = "text-orange-400";

export const getSlateDisplayName = (god: DivinityGod): string => {
  return `${god} Slate`;
};

export const getSlateColor = (slate: DivinitySlate): string => {
  if (slate.isLegendary === true) {
    return LEGENDARY_SLATE_COLOR;
  }
  if (slate.god !== undefined) {
    return GOD_COLORS[slate.god];
  }
  return "bg-zinc-600";
};
