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
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={skill.enabled}
            onChange={onToggle}
            disabled={!hasSkill}
            className="w-5 h-5 disabled:opacity-50"
          />
          <span className="text-xs text-zinc-500 dark:text-zinc-400 w-16">
            {slotLabel}
          </span>
          <select
            className={`flex-1 bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 text-sm ${
              hasSkill
                ? skill.enabled
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-500"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
            value={skill.skillName ?? ""}
            onChange={(e) => onSkillChange(e.target.value || undefined)}
          >
            <option value="" className="text-zinc-400 dark:text-zinc-500">
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
              className="px-3 py-1 bg-zinc-200 dark:bg-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-500 rounded text-sm text-zinc-700 dark:text-zinc-200"
            >
              {expanded ? "Hide" : "Supports"} ({supportCount}/5)
            </button>
          )}
        </div>
      </div>

      {expanded && hasSkill && (
        <div className="px-4 pb-4 border-t border-zinc-200 dark:border-zinc-700 pt-3">
          <div className="space-y-2">
            {SUPPORT_SKILL_KEYS.map((key, index) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 w-6">
                  {index + 1}.
                </span>
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
