import type { CoreTalent } from "@/src/data/core_talent";
import {
  type TreeSlot,
  getAvailableGodGoddessCoreTalents,
  getAvailableProfessionCoreTalents,
  isCoreTalentSlotUnlocked,
  getMaxCoreTalentSlots,
  isGodGoddessTree,
  getCoreTalentsForTree,
} from "@/src/app/lib/core-talent-utils";

interface CoreTalentSelectorProps {
  treeName: string;
  treeSlot: TreeSlot;
  pointsSpent: number;
  selectedCoreTalents: string[];
  onSelectCoreTalent: (
    slotIndex: number,
    talentName: string | undefined,
  ) => void;
}

interface SlotConfig {
  index: number;
  label: string;
  unlocked: boolean;
  available: CoreTalent[];
  selected: string | undefined;
}

export const CoreTalentSelector: React.FC<CoreTalentSelectorProps> = ({
  treeName,
  treeSlot,
  pointsSpent,
  selectedCoreTalents,
  onSelectCoreTalent,
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
  available: CoreTalent[];
  selected: string | undefined;
  allTalentsForTree: CoreTalent[];
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
  const selectedTalent = allTalentsForTree.find((ct) => ct.name === selected);

  return (
    <div
      className={`p-3 rounded-lg border ${
        unlocked
          ? selected
            ? "border-amber-500 bg-amber-500/10"
            : "border-zinc-600 bg-zinc-800"
          : "border-zinc-800 bg-zinc-900 opacity-50"
      }`}
    >
      <div className="text-xs text-zinc-400 mb-2">{label}</div>

      {unlocked ? (
        <select
          value={selected ?? ""}
          onChange={(e) => onSelect(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-50 text-sm"
        >
          <option value="">Select...</option>
          {available.map((ct) => (
            <option key={ct.name} value={ct.name} title={ct.affix}>
              {ct.name}
            </option>
          ))}
          {selected && !available.find((ct) => ct.name === selected) && (
            <option value={selected}>{selected}</option>
          )}
        </select>
      ) : (
        <div className="text-sm text-zinc-500 italic">Locked</div>
      )}

      {selectedTalent && (
        <div className="mt-2 text-xs text-zinc-400 whitespace-pre-line">
          {selectedTalent.affix}
        </div>
      )}
    </div>
  );
};
