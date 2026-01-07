import { useMemo } from "react";
import {
  SearchableSelect,
  type SearchableSelectOption,
} from "@/src/components/ui/SearchableSelect";
import { Tooltip } from "@/src/components/ui/Tooltip";
import type { BaseActiveSkill, BaseSkill } from "@/src/data/skill/types";
import type { BaseSupportSkillSlot as SaveDataBaseSupportSkillSlot } from "@/src/lib/save-data";
import type { SkillSlot as SkillSlotType } from "@/src/tli/core";
import { OptionWithSkillTooltip } from "./OptionWithSkillTooltip";
import { SkillTooltipContent } from "./SkillTooltipContent";
import { SupportSkillSelector } from "./SupportSkillSelector";

type SupportSlotKey = 1 | 2 | 3 | 4 | 5;

const SUPPORT_SLOT_KEYS: SupportSlotKey[] = [1, 2, 3, 4, 5];

const SKILL_LEVEL_OPTIONS = Array.from({ length: 21 }, (_, i) => ({
  value: i + 1,
  label: `Lv. ${i + 1}`,
}));

interface SkillSlotProps {
  slotLabel: string;
  skill: SkillSlotType | undefined;
  availableSkills: readonly (BaseActiveSkill | BaseSkill)[];
  excludedSkillNames: string[];
  onSkillChange: (skillName: string | undefined) => void;
  onToggle: () => void;
  onLevelChange: (level: number) => void;
  onUpdateSupport: (
    supportKey: SupportSlotKey,
    slot: SaveDataBaseSupportSkillSlot | undefined,
  ) => void;
}

export const SkillSlot: React.FC<SkillSlotProps> = ({
  slotLabel,
  skill,
  availableSkills,
  excludedSkillNames,
  onSkillChange,
  onToggle,
  onLevelChange,
  onUpdateSupport,
}) => {
  const mainSkill = useMemo(
    () => availableSkills.find((s) => s.name === skill?.skillName),
    [availableSkills, skill?.skillName],
  );

  const selectedSupports: string[] = skill
    ? SUPPORT_SLOT_KEYS.map((key) => skill.supportSkills[key]?.name).filter(
        (name): name is NonNullable<typeof name> => name !== undefined,
      )
    : [];

  const hasSkill = skill?.skillName !== undefined;

  // Filter available skills to exclude already-selected ones (but keep current selection)
  const filteredSkills = availableSkills.filter(
    (s) => s.name === skill?.skillName || !excludedSkillNames.includes(s.name),
  );

  const skillsByName = useMemo(() => {
    const map = new Map<string, BaseActiveSkill | BaseSkill>();
    for (const s of availableSkills) {
      map.set(s.name, s);
    }
    return map;
  }, [availableSkills]);

  const renderOption = (
    option: SearchableSelectOption<string>,
    { selected }: { active: boolean; selected: boolean },
  ): React.ReactNode => {
    const skillData = skillsByName.get(option.value);
    if (skillData === undefined) return <span>{option.label}</span>;
    return <OptionWithSkillTooltip skill={skillData} selected={selected} />;
  };

  const renderSelectedTooltip = (
    option: SearchableSelectOption<string>,
    triggerRect: DOMRect,
  ): React.ReactNode => {
    const skillData = skillsByName.get(option.value);
    if (skillData === undefined) return null;
    return (
      <Tooltip isVisible={true} triggerRect={triggerRect}>
        <SkillTooltipContent skill={skillData} />
      </Tooltip>
    );
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-700 p-4">
      <div className="flex gap-4">
        {/* Main skill column */}
        <div className="flex items-start gap-3 shrink-0">
          <input
            type="checkbox"
            checked={skill?.enabled ?? false}
            onChange={onToggle}
            disabled={!hasSkill}
            className="w-5 h-5 mt-1.5 disabled:opacity-50 accent-amber-500"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 w-16">{slotLabel}</span>
              <SearchableSelect
                value={skill?.skillName}
                onChange={onSkillChange}
                options={filteredSkills.map(
                  (s): SearchableSelectOption<string> => ({
                    value: s.name,
                    label: s.name,
                  }),
                )}
                placeholder="<Empty slot>"
                size="sm"
                className="w-48"
                renderOption={renderOption}
                renderSelectedTooltip={renderSelectedTooltip}
              />
              {hasSkill && (
                <SearchableSelect
                  value={skill?.level ?? 20}
                  onChange={(val) => val !== undefined && onLevelChange(val)}
                  options={SKILL_LEVEL_OPTIONS}
                  placeholder="Lv."
                  size="sm"
                  className="w-20"
                />
              )}
            </div>
          </div>
        </div>

        {/* Support skills column */}
        <div className="flex-1 space-y-1.5 border-l border-zinc-700 pl-4">
          {SUPPORT_SLOT_KEYS.map((supportKey) => (
            <div
              key={`support-${supportKey}`}
              className="flex items-center gap-2"
            >
              <span className="text-xs text-zinc-600 w-4">{supportKey}.</span>
              <SupportSkillSelector
                mainSkill={mainSkill}
                selectedSlot={
                  hasSkill ? skill?.supportSkills[supportKey] : undefined
                }
                excludedSkills={selectedSupports.filter(
                  (s) => s !== skill?.supportSkills[supportKey]?.name,
                )}
                onChange={(slot) => onUpdateSupport(supportKey, slot)}
                slotIndex={supportKey}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
