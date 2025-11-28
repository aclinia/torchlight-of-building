"use client";

import { useState } from "react";
import { RawSkillWithSupports, RawSupportSkills } from "@/src/tli/core";
import { SupportSkillSelector } from "./SupportSkillSelector";

type SupportSkillKey = keyof RawSupportSkills;

const SUPPORT_SKILL_KEYS: SupportSkillKey[] = [
  "supportSkill1",
  "supportSkill2",
  "supportSkill3",
  "supportSkill4",
  "supportSkill5",
];

interface SkillSlotProps {
  slotLabel: string;
  skill: RawSkillWithSupports;
  availableSkills: readonly { name: string }[];
  excludedSkillNames: string[];
  onSkillChange: (skillName: string | undefined) => void;
  onToggle: () => void;
  onUpdateSupport: (
    supportKey: SupportSkillKey,
    supportName: string | undefined,
  ) => void;
}

export const SkillSlot: React.FC<SkillSlotProps> = ({
  slotLabel,
  skill,
  availableSkills,
  excludedSkillNames,
  onSkillChange,
  onToggle,
  onUpdateSupport,
}) => {
  const [expanded, setExpanded] = useState(false);

  const selectedSupports = SUPPORT_SKILL_KEYS.map(
    (key) => skill.supportSkills[key],
  ).filter((s): s is string => s !== undefined);

  const supportCount = selectedSupports.length;
  const hasSkill = skill.skillName !== undefined;

  // Filter available skills to exclude already-selected ones (but keep current selection)
  const filteredSkills = availableSkills.filter(
    (s) => s.name === skill.skillName || !excludedSkillNames.includes(s.name),
  );

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-700">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={skill.enabled}
            onChange={onToggle}
            disabled={!hasSkill}
            className="w-5 h-5 disabled:opacity-50 accent-amber-500"
          />
          <span className="text-xs text-zinc-500 w-16">{slotLabel}</span>
          <select
            className={`flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 ${
              hasSkill
                ? skill.enabled
                  ? "text-zinc-50"
                  : "text-zinc-500"
                : "text-zinc-500"
            }`}
            value={skill.skillName ?? ""}
            onChange={(e) => onSkillChange(e.target.value || undefined)}
          >
            <option value="" className="text-zinc-500">
              &lt;Empty slot&gt;
            </option>
            {filteredSkills.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          {hasSkill && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-amber-500 rounded text-sm text-zinc-400"
            >
              {expanded ? "Hide" : "Supports"} ({supportCount}/5)
            </button>
          )}
        </div>
      </div>

      {expanded && hasSkill && (
        <div className="px-4 pb-4 border-t border-zinc-800 pt-3">
          <div className="space-y-2">
            {SUPPORT_SKILL_KEYS.map((key, index) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 w-6">{index + 1}.</span>
                <SupportSkillSelector
                  selectedSkill={skill.supportSkills[key]}
                  excludedSkills={selectedSupports.filter(
                    (s) => s !== skill.supportSkills[key],
                  )}
                  onChange={(supportName) => onUpdateSupport(key, supportName)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
