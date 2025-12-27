import React from "react";
import { ModNotImplementedIcon } from "@/src/components/ui/ModNotImplementedIcon";
import { Tooltip, TooltipTitle } from "@/src/components/ui/Tooltip";
import type { BaseCoreTalent } from "@/src/data/core_talent";
import { CoreTalentMods } from "@/src/data/core_talent/core_talent_mods";
import type { CoreTalentName } from "@/src/data/core_talent/types";
import { useTooltip } from "@/src/hooks/useTooltip";
import {
  getAvailableGodGoddessCoreTalents,
  getAvailableProfessionCoreTalents,
  getCoreTalentsForTree,
  getMaxCoreTalentSlots,
  isCoreTalentSlotUnlocked,
  isGodGoddessTree,
  type TreeSlot,
} from "@/src/lib/core-talent-utils";

interface CoreTalentSelectorProps {
  treeName: string;
  treeSlot: TreeSlot;
  pointsSpent: number;
  selectedCoreTalents: string[];
  onSelectCoreTalent: (
    slotIndex: number,
    talentName: string | undefined,
  ) => void;
  replacedByPrism?: string; // Ethereal talent name if prism replaces core talents
}

interface SlotConfig {
  index: number;
  label: string;
  unlocked: boolean;
  available: BaseCoreTalent[];
  selected: string | undefined;
}

export const CoreTalentSelector: React.FC<CoreTalentSelectorProps> = ({
  treeName,
  treeSlot,
  pointsSpent,
  selectedCoreTalents,
  onSelectCoreTalent,
  replacedByPrism,
}) => {
  const isGodTree = isGodGoddessTree(treeName);
  const maxSlots = getMaxCoreTalentSlots(treeSlot);
  const allTalentsForTree = getCoreTalentsForTree(treeName);

  const slots: SlotConfig[] = [];

  if (isGodTree) {
    const { firstSlot, secondSlot } = getAvailableGodGoddessCoreTalents(
      treeName,
      pointsSpent,
      selectedCoreTalents,
    );

    slots.push({
      index: 0,
      label: "Core Talent 1 (12 pts)",
      unlocked: isCoreTalentSlotUnlocked(treeSlot, 0, pointsSpent),
      available: firstSlot,
      selected: selectedCoreTalents[0],
    });

    slots.push({
      index: 1,
      label: "Core Talent 2 (24 pts)",
      unlocked: isCoreTalentSlotUnlocked(treeSlot, 1, pointsSpent),
      available: secondSlot,
      selected: selectedCoreTalents[1],
    });
  } else {
    const available = getAvailableProfessionCoreTalents(
      treeName,
      pointsSpent,
      selectedCoreTalents,
    );

    slots.push({
      index: 0,
      label: "Core Talent (24 pts)",
      unlocked: isCoreTalentSlotUnlocked(treeSlot, 0, pointsSpent),
      available,
      selected: selectedCoreTalents[0],
    });
  }

  // If core talents are replaced by a prism, show disabled state
  if (replacedByPrism) {
    return (
      <div className="bg-zinc-900 rounded-lg p-4 border border-purple-500/50 mb-4 opacity-60">
        <h3 className="text-lg font-semibold mb-3 text-zinc-400">
          Core Talents
        </h3>
        <div className="text-sm text-purple-400">
          Replaced by Prism Ethereal Talent
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700 mb-4">
      <h3 className="text-lg font-semibold mb-3 text-zinc-50">Core Talents</h3>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${maxSlots}, 1fr)` }}
      >
        {slots.map((slot) => (
          <CoreTalentSlot
            key={slot.index}
            label={slot.label}
            unlocked={slot.unlocked}
            available={slot.available}
            selected={slot.selected}
            allTalentsForTree={allTalentsForTree}
            onSelect={(name) => onSelectCoreTalent(slot.index, name)}
          />
        ))}
      </div>
    </div>
  );
};

interface CoreTalentSlotProps {
  label: string;
  unlocked: boolean;
  available: BaseCoreTalent[];
  selected: string | undefined;
  allTalentsForTree: BaseCoreTalent[];
  onSelect: (name: string | undefined) => void;
}

const CoreTalentSlot: React.FC<CoreTalentSlotProps> = ({
  label,
  unlocked,
  available,
  selected,
  allTalentsForTree,
  onSelect,
}) => {
  const { isVisible, triggerRef, triggerRect, tooltipHandlers } = useTooltip();
  const [hoveredTalent, setHoveredTalent] = React.useState<
    BaseCoreTalent | undefined
  >();

  // Clear hoveredTalent when tooltip hides (after the useTooltip delay)
  React.useEffect(() => {
    if (!isVisible) {
      setHoveredTalent(undefined);
    }
  }, [isVisible]);

  return (
    <div
      className={`p-3 rounded-lg border ${
        unlocked
          ? selected
            ? "border-amber-500 bg-amber-500/10"
            : "border-zinc-600 bg-zinc-800"
          : "border-zinc-800 bg-zinc-900 opacity-50"
      }`}
      ref={triggerRef}
    >
      <div className="text-xs text-zinc-400 mb-2">{label}</div>

      {unlocked ? (
        <div className="space-y-1">
          {available.map((ct) => (
            <button
              key={ct.name}
              onClick={() =>
                onSelect(selected === ct.name ? undefined : ct.name)
              }
              onMouseEnter={() => setHoveredTalent(ct)}
              className={`w-full px-3 py-2 border rounded-lg text-sm text-left transition-colors ${
                selected === ct.name
                  ? "border-amber-500 bg-amber-500/20 text-amber-400"
                  : "border-zinc-700 bg-zinc-800 text-zinc-50 hover:border-amber-500/50"
              }`}
            >
              {ct.name}
            </button>
          ))}
          {selected &&
            !available.find((ct) => ct.name === selected) &&
            (() => {
              const orphanedTalent = allTalentsForTree.find(
                (ct) => ct.name === selected,
              );
              return (
                <button
                  onClick={() => onSelect(undefined)}
                  onMouseEnter={() => setHoveredTalent(orphanedTalent)}
                  className="w-full px-3 py-2 border border-amber-500 bg-amber-500/20 text-amber-400 rounded-lg text-sm text-left"
                >
                  {selected}
                </button>
              );
            })()}
        </div>
      ) : (
        <div className="text-sm text-zinc-500 italic">Locked</div>
      )}

      <Tooltip
        isVisible={isVisible && hoveredTalent !== undefined}
        triggerRect={triggerRect}
        variant="legendary"
        {...tooltipHandlers}
      >
        {hoveredTalent !== undefined && (
          <>
            <TooltipTitle>{hoveredTalent.name}</TooltipTitle>
            <ul className="space-y-1">
              {CoreTalentMods[
                hoveredTalent.name as CoreTalentName
              ].affixLines.map((line, idx) => (
                <li
                  key={idx}
                  className="text-xs text-zinc-300 flex items-center"
                >
                  <span>{line.text}</span>
                  {line.mods === undefined && <ModNotImplementedIcon />}
                </li>
              ))}
            </ul>
          </>
        )}
      </Tooltip>
    </div>
  );
};
