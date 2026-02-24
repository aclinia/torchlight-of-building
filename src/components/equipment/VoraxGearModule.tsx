import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import { useEffect, useMemo, useState } from "react";
import { Legendaries } from "@/src/data/legendary/legendaries";
import type { LegendaryAffix } from "@/src/data/legendary/types";
import { ALL_VORAX_LIMBS } from "@/src/data/vorax/all-vorax-limbs";
import type { VoraxLimbData } from "@/src/data/vorax/types";
import type { Gear } from "@/src/lib/save-data";
import { type Gear as EngineGear, getAffixText } from "@/src/tli/core";
import { craft, craftMulti, extractRanges } from "@/src/tli/crafting/craft";
import type { BaseGearAffix } from "@/src/tli/gear-data-types";
import {
  getAffixForPercentage,
  getPercentageWithinTier,
  groupAffixesByBaseName,
} from "../../lib/affix-utils";
import { DEFAULT_QUALITY } from "../../lib/constants";
import { generateItemId } from "../../lib/storage";
import type { AffixSlotState } from "../../lib/types";
import { Modal, ModalActions, ModalButton } from "../ui/Modal";
import { SearchableSelect } from "../ui/SearchableSelect";
import { GroupedAffixSlotComponent } from "./GroupedAffixSlotComponent";

// --- Types ---

type RegularVoraxSlot = {
  type: "regular";
  affixIndex: number | undefined;
  percentage: number;
};

type LegendaryVoraxSlot = {
  type: "legendary";
  legendaryName: string | undefined;
  affixIndex: number | undefined;
  isCorrupted: boolean;
  selectedChoiceIndex: number | undefined;
  percentages: number[];
};

type ExistingVoraxSlot = { type: "existing"; text: string };

type VoraxAffixSlot = RegularVoraxSlot | LegendaryVoraxSlot | ExistingVoraxSlot;

const createRegularSlot = (): RegularVoraxSlot => ({
  type: "regular",
  affixIndex: undefined,
  percentage: DEFAULT_QUALITY,
});

const createLegendarySlot = (): LegendaryVoraxSlot => ({
  type: "legendary",
  legendaryName: undefined,
  affixIndex: undefined,
  isCorrupted: false,
  selectedChoiceIndex: undefined,
  percentages: [],
});

// --- Helpers ---

const convertToBaseGearAffixes = (
  limb: VoraxLimbData,
  section: "prefix" | "suffix",
): BaseGearAffix[] => {
  return limb.craftableAffixes
    .filter((a) => a.section === section)
    .map((a) => ({
      equipmentSlot: "Trinket" as const,
      equipmentType: "Vorax Gear" as const,
      affixType:
        section === "prefix" ? ("Prefix" as const) : ("Suffix" as const),
      craftingPool: a.affixType as "Basic" | "Advanced" | "Ultimate",
      tier: a.tier,
      craftableAffix: a.craftableAffix,
    }));
};

const countRanges = (affix: string): number => {
  return extractRanges(affix).length;
};

const isChoiceType = (
  affix: LegendaryAffix,
): affix is { choiceDescriptor: string; choices: string[] } => {
  return typeof affix !== "string";
};

const getAffixString = (
  affix: LegendaryAffix,
  choiceIndex: number | undefined,
): string | undefined => {
  if (typeof affix === "string") return affix;
  if (choiceIndex !== undefined) return affix.choices[choiceIndex];
  return undefined;
};

const getCurrentAffix = (
  legendary: (typeof Legendaries)[number],
  affixIndex: number,
  isCorrupted: boolean,
): LegendaryAffix => {
  return isCorrupted
    ? legendary.corruptionAffixes[affixIndex]
    : legendary.normalAffixes[affixIndex];
};

// --- Sub-components ---

interface LegendarySlotEditorProps {
  slot: LegendaryVoraxSlot;
  availableLegendaryNames: string[];
  onUpdate: (slot: LegendaryVoraxSlot) => void;
}

const LegendarySlotEditor = ({
  slot,
  availableLegendaryNames,
  onUpdate,
}: LegendarySlotEditorProps): React.ReactElement => {
  const legendaryOptions = useMemo(() => {
    return availableLegendaryNames.map((name, idx) => ({
      value: idx,
      label: i18n._(name),
    }));
  }, [availableLegendaryNames]);

  const selectedLegendaryIdx =
    slot.legendaryName !== undefined
      ? availableLegendaryNames.indexOf(slot.legendaryName)
      : undefined;

  const selectedLegendary =
    slot.legendaryName !== undefined
      ? Legendaries.find((l) => l.name === slot.legendaryName)
      : undefined;

  const affixOptions = useMemo(() => {
    if (selectedLegendary === undefined) return [];
    // Show affixes from the current corruption state
    const affixes = slot.isCorrupted
      ? selectedLegendary.corruptionAffixes
      : selectedLegendary.normalAffixes;
    return affixes.map((affix, idx) => ({
      value: idx,
      label:
        typeof affix === "string"
          ? affix.replace(/\n/g, " / ").substring(0, 80)
          : affix.choiceDescriptor,
    }));
  }, [selectedLegendary, slot.isCorrupted]);

  const currentAffix =
    selectedLegendary !== undefined && slot.affixIndex !== undefined
      ? getCurrentAffix(selectedLegendary, slot.affixIndex, slot.isCorrupted)
      : undefined;

  const affixStr =
    currentAffix !== undefined
      ? getAffixString(currentAffix, slot.selectedChoiceIndex)
      : undefined;

  const ranges = affixStr !== undefined ? extractRanges(affixStr) : [];

  const craftedText =
    affixStr !== undefined
      ? craftMulti({ craftableAffix: affixStr }, slot.percentages)
      : undefined;

  const handleLegendarySelect = (idx: number | undefined): void => {
    if (idx === undefined) {
      onUpdate(createLegendarySlot());
      return;
    }
    const name = availableLegendaryNames[idx];
    onUpdate({
      ...slot,
      legendaryName: name,
      affixIndex: undefined,
      isCorrupted: false,
      selectedChoiceIndex: undefined,
      percentages: [],
    });
  };

  const handleAffixSelect = (idx: number | undefined): void => {
    if (selectedLegendary === undefined || idx === undefined) {
      onUpdate({
        ...slot,
        affixIndex: undefined,
        selectedChoiceIndex: undefined,
        percentages: [],
      });
      return;
    }
    const affix = getCurrentAffix(selectedLegendary, idx, slot.isCorrupted);
    const affStr = typeof affix === "string" ? affix : affix.choices[0];
    const rangeCount = countRanges(affStr);
    onUpdate({
      ...slot,
      affixIndex: idx,
      selectedChoiceIndex: undefined,
      percentages: Array.from({ length: rangeCount }, () => DEFAULT_QUALITY),
    });
  };

  const handleChoiceSelect = (choiceIdx: number | undefined): void => {
    if (
      selectedLegendary === undefined ||
      slot.affixIndex === undefined ||
      choiceIdx === undefined
    ) {
      onUpdate({ ...slot, selectedChoiceIndex: undefined, percentages: [] });
      return;
    }
    const affix = getCurrentAffix(
      selectedLegendary,
      slot.affixIndex,
      slot.isCorrupted,
    );
    const affStr = typeof affix === "string" ? affix : affix.choices[choiceIdx];
    const rangeCount = countRanges(affStr);
    onUpdate({
      ...slot,
      selectedChoiceIndex: choiceIdx,
      percentages: Array.from({ length: rangeCount }, () => DEFAULT_QUALITY),
    });
  };

  const handlePercentageChange = (rangeIdx: number, value: number): void => {
    const newPercentages = [...slot.percentages];
    newPercentages[rangeIdx] = value;
    onUpdate({ ...slot, percentages: newPercentages });
  };

  return (
    <div className="space-y-2">
      <SearchableSelect
        value={selectedLegendaryIdx !== -1 ? selectedLegendaryIdx : undefined}
        onChange={handleLegendarySelect}
        options={legendaryOptions}
        placeholder="Select legendary..."
      />

      {selectedLegendary !== undefined && (
        <SearchableSelect
          value={slot.affixIndex}
          onChange={handleAffixSelect}
          options={affixOptions}
          placeholder="Select affix..."
        />
      )}

      {currentAffix !== undefined && isChoiceType(currentAffix) && (
        <div>
          <div className="mb-1 text-xs italic text-zinc-400">
            {currentAffix.choiceDescriptor}
          </div>
          <select
            value={slot.selectedChoiceIndex ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              handleChoiceSelect(val === "" ? undefined : parseInt(val, 10));
            }}
            className="w-full rounded border border-zinc-600 bg-zinc-700 px-2 py-1.5 text-sm text-zinc-50 focus:border-amber-500 focus:outline-none"
          >
            <option value="">Select an option...</option>
            {currentAffix.choices.map((choice, idx) => (
              <option key={idx} value={idx}>
                {choice.replace(/\n/g, " / ").substring(0, 80)}
              </option>
            ))}
          </select>
        </div>
      )}

      {ranges.length > 0 && (
        <div className="space-y-2">
          {ranges.map((range, rangeIdx) => (
            <div key={rangeIdx}>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs text-zinc-500">
                  {ranges.length > 1
                    ? `Quality (${range.min} – ${range.max})`
                    : "Quality"}
                </label>
                <span className="text-xs font-medium text-zinc-50">
                  {slot.percentages[rangeIdx] ?? DEFAULT_QUALITY}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={slot.percentages[rangeIdx] ?? DEFAULT_QUALITY}
                onChange={(e) =>
                  handlePercentageChange(rangeIdx, parseInt(e.target.value, 10))
                }
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}

      {craftedText !== undefined && (
        <div className="rounded border border-zinc-700 bg-zinc-900 p-2">
          <div className="whitespace-pre-line text-sm text-amber-400">
            {craftedText}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main component ---

interface VoraxGearModuleProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemId: string | undefined, item: Gear) => void;
  editItem?: EngineGear;
}

export const VoraxGearModule: React.FC<VoraxGearModuleProps> = ({
  isOpen,
  onClose,
  onSave,
  editItem,
}) => {
  const [selectedLimbIndex, setSelectedLimbIndex] = useState<
    number | undefined
  >(undefined);
  const [selectedBaseAffixIndex, setSelectedBaseAffixIndex] = useState<
    number | undefined
  >(undefined);
  const [prefixSlots, setPrefixSlots] = useState<VoraxAffixSlot[]>([
    createRegularSlot(),
    createRegularSlot(),
    createRegularSlot(),
  ]);
  const [suffixSlots, setSuffixSlots] = useState<VoraxAffixSlot[]>([
    createRegularSlot(),
    createRegularSlot(),
    createRegularSlot(),
  ]);
  const [customAffixText, setCustomAffixText] = useState("");

  // Pre-populate state when editing an existing item
  useEffect(() => {
    if (editItem === undefined) return;

    // Find the limb index from the item's baseGearName
    const limbIdx = ALL_VORAX_LIMBS.findIndex(
      (limb) => limb.name === editItem.baseGearName,
    );
    if (limbIdx !== -1) {
      setSelectedLimbIndex(limbIdx);

      // Try to match the base affix to the limb's base affix list
      const limb = ALL_VORAX_LIMBS[limbIdx];
      if (
        editItem.baseAffixes !== undefined &&
        editItem.baseAffixes.length > 0
      ) {
        const baseAffixText = getAffixText(editItem.baseAffixes[0]);
        const baseIdx = limb.baseAffixes.findIndex(
          (ba) => ba.affix === baseAffixText,
        );
        setSelectedBaseAffixIndex(baseIdx !== -1 ? baseIdx : undefined);
      } else {
        setSelectedBaseAffixIndex(undefined);
      }
    } else {
      setSelectedBaseAffixIndex(undefined);
    }

    // Load existing prefixes into prefix slots as read-only "existing" entries
    const existingPrefixes = (editItem.prefixes ?? []).map(
      (a): ExistingVoraxSlot => ({ type: "existing", text: getAffixText(a) }),
    );
    setPrefixSlots([
      ...existingPrefixes,
      ...Array.from({ length: 3 - existingPrefixes.length }, createRegularSlot),
    ]);

    // Load existing suffixes into suffix slots as read-only "existing" entries
    const existingSuffixes = (editItem.suffixes ?? []).map(
      (a): ExistingVoraxSlot => ({ type: "existing", text: getAffixText(a) }),
    );
    setSuffixSlots([
      ...existingSuffixes,
      ...Array.from({ length: 3 - existingSuffixes.length }, createRegularSlot),
    ]);

    // Only load custom affixes into the text area
    const customTexts = (editItem.customAffixes ?? []).map(getAffixText);
    setCustomAffixText(customTexts.length > 0 ? customTexts.join("\n") : "");
  }, [editItem]);

  const limbOptions = useMemo(
    () =>
      ALL_VORAX_LIMBS.map((limb, idx) => ({
        value: idx,
        label: i18n._(limb.name),
      })),
    [],
  );

  const selectedLimb =
    selectedLimbIndex !== undefined
      ? ALL_VORAX_LIMBS[selectedLimbIndex]
      : undefined;

  const baseAffixOptions = useMemo(() => {
    if (selectedLimb === undefined) return [];
    return selectedLimb.baseAffixes.map((ba, idx) => ({
      value: idx,
      label: ba.affix,
    }));
  }, [selectedLimb]);

  const prefixAffixes = useMemo(() => {
    if (selectedLimb === undefined) return [];
    return convertToBaseGearAffixes(selectedLimb, "prefix");
  }, [selectedLimb]);

  const suffixAffixes = useMemo(() => {
    if (selectedLimb === undefined) return [];
    return convertToBaseGearAffixes(selectedLimb, "suffix");
  }, [selectedLimb]);

  const availableLegendaryNames = useMemo(() => {
    if (selectedLimb === undefined) return [];
    const legendaryNameSet = new Set(Legendaries.map((l) => l.name));
    return selectedLimb.legendaryNames
      .filter((name) => legendaryNameSet.has(name))
      .sort();
  }, [selectedLimb]);

  const handleLimbSelect = (idx: number | undefined): void => {
    setSelectedLimbIndex(idx);
    setSelectedBaseAffixIndex(undefined);
    setPrefixSlots([
      createRegularSlot(),
      createRegularSlot(),
      createRegularSlot(),
    ]);
    setSuffixSlots([
      createRegularSlot(),
      createRegularSlot(),
      createRegularSlot(),
    ]);
    setCustomAffixText("");
  };

  const toggleSlotType = (
    section: "prefix" | "suffix",
    slotIdx: number,
  ): void => {
    const setter = section === "prefix" ? setPrefixSlots : setSuffixSlots;
    setter((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx) return slot;
        return slot.type === "regular"
          ? createLegendarySlot()
          : createRegularSlot();
      }),
    );
  };

  const updateLegendarySlot = (
    section: "prefix" | "suffix",
    slotIdx: number,
    newSlot: LegendaryVoraxSlot,
  ): void => {
    const setter = section === "prefix" ? setPrefixSlots : setSuffixSlots;
    setter((prev) => prev.map((slot, i) => (i === slotIdx ? newSlot : slot)));
  };

  const handleCorruptionToggle = (
    section: "prefix" | "suffix",
    slotIdx: number,
  ): void => {
    const setter = section === "prefix" ? setPrefixSlots : setSuffixSlots;
    setter((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx || slot.type !== "legendary") return slot;
        const newIsCorrupted = !slot.isCorrupted;
        if (slot.legendaryName !== undefined && slot.affixIndex !== undefined) {
          const legendary = Legendaries.find(
            (l) => l.name === slot.legendaryName,
          );
          if (legendary !== undefined) {
            const newAffix = getCurrentAffix(
              legendary,
              slot.affixIndex,
              newIsCorrupted,
            );
            const affStr =
              typeof newAffix === "string" ? newAffix : newAffix.choices[0];
            const rangeCount = countRanges(affStr);
            return {
              ...slot,
              isCorrupted: newIsCorrupted,
              selectedChoiceIndex: undefined,
              percentages: Array.from(
                { length: rangeCount },
                () => DEFAULT_QUALITY,
              ),
            };
          }
        }
        return { ...slot, isCorrupted: newIsCorrupted };
      }),
    );
  };

  const handleRegularAffixSelect = (
    section: "prefix" | "suffix",
    slotIdx: number,
    value: string,
  ): void => {
    const setter = section === "prefix" ? setPrefixSlots : setSuffixSlots;
    setter((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx || slot.type !== "regular") return slot;
        const affixIndex = value === "" ? undefined : parseInt(value, 10);
        return { ...slot, affixIndex, percentage: DEFAULT_QUALITY };
      }),
    );
  };

  const handleRegularSliderChange = (
    section: "prefix" | "suffix",
    slotIdx: number,
    value: string,
  ): void => {
    const setter = section === "prefix" ? setPrefixSlots : setSuffixSlots;
    setter((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx || slot.type !== "regular") return slot;
        return { ...slot, percentage: parseInt(value, 10) };
      }),
    );
  };

  const handleRegularClear = (
    section: "prefix" | "suffix",
    slotIdx: number,
  ): void => {
    const setter = section === "prefix" ? setPrefixSlots : setSuffixSlots;
    setter((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx || slot.type !== "regular") return slot;
        return createRegularSlot();
      }),
    );
  };

  const craftRegularAffix = (
    affixes: BaseGearAffix[],
    slot: RegularVoraxSlot,
  ): string | undefined => {
    if (slot.affixIndex === undefined) return undefined;
    const groups = groupAffixesByBaseName(affixes, affixes);
    const group = groups.find((g) =>
      g.originalIndices.includes(slot.affixIndex as number),
    );
    if (group === undefined) return undefined;
    const affix = getAffixForPercentage(slot.percentage, group.affixes);
    const percentageWithinTier = getPercentageWithinTier(
      slot.percentage,
      group.affixes.length,
    );
    return craft(affix, percentageWithinTier);
  };

  const craftLegendaryAffix = (
    slot: LegendaryVoraxSlot,
  ): string | undefined => {
    if (slot.legendaryName === undefined || slot.affixIndex === undefined) {
      return undefined;
    }
    const legendary = Legendaries.find((l) => l.name === slot.legendaryName);
    if (legendary === undefined) return undefined;
    const affix = getCurrentAffix(legendary, slot.affixIndex, slot.isCorrupted);
    const affixStr = getAffixString(affix, slot.selectedChoiceIndex);
    if (affixStr === undefined) return undefined;
    return (
      slot.legendaryName +
      craftMulti({ craftableAffix: affixStr }, slot.percentages)
    );
  };

  const handleSave = (): void => {
    if (selectedLimb === undefined) return;

    const baseAffixes: string[] = [];
    if (selectedBaseAffixIndex !== undefined) {
      baseAffixes.push(selectedLimb.baseAffixes[selectedBaseAffixIndex].affix);
    }

    const craftedPrefixes: string[] = [];
    for (const slot of prefixSlots) {
      if (slot.type === "existing") {
        craftedPrefixes.push(slot.text);
      } else if (slot.type === "regular") {
        const result = craftRegularAffix(prefixAffixes, slot);
        if (result !== undefined) craftedPrefixes.push(result);
      } else {
        const result = craftLegendaryAffix(slot);
        if (result !== undefined) craftedPrefixes.push(result);
      }
    }

    const craftedSuffixes: string[] = [];
    for (const slot of suffixSlots) {
      if (slot.type === "existing") {
        craftedSuffixes.push(slot.text);
      } else if (slot.type === "regular") {
        const result = craftRegularAffix(suffixAffixes, slot);
        if (result !== undefined) craftedSuffixes.push(result);
      } else {
        const result = craftLegendaryAffix(slot);
        if (result !== undefined) craftedSuffixes.push(result);
      }
    }

    const customAffixes = customAffixText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const newItem: Gear = {
      id: editItem?.id ?? generateItemId(),
      equipmentType: "Vorax Gear",
      rarity: "vorax",
      baseGearName: selectedLimb?.name,
      baseAffixes,
      prefixes: craftedPrefixes,
      suffixes: craftedSuffixes,
      customAffixes: customAffixes.length > 0 ? customAffixes : undefined,
    };

    onSave(editItem?.id, newItem);
    handleLimbSelect(undefined);
    onClose();
  };

  const getSlotState = (slot: VoraxAffixSlot): AffixSlotState =>
    slot.type === "regular"
      ? { affixIndex: slot.affixIndex, percentage: slot.percentage }
      : { affixIndex: undefined, percentage: DEFAULT_QUALITY };

  const getPrefixSlotStates = (): AffixSlotState[] =>
    prefixSlots.map(getSlotState);

  const getSuffixSlotStates = (): AffixSlotState[] =>
    suffixSlots.map(getSlotState);

  const handleClearExistingSlot = (
    section: "prefix" | "suffix",
    slotIdx: number,
  ): void => {
    const setter = section === "prefix" ? setPrefixSlots : setSuffixSlots;
    setter((prev) =>
      prev.map((s, i) => (i === slotIdx ? createRegularSlot() : s)),
    );
  };

  const renderSlot = (
    section: "prefix" | "suffix",
    slotIdx: number,
    slot: VoraxAffixSlot,
    affixes: BaseGearAffix[],
    allSlotStates: AffixSlotState[],
  ): React.ReactElement => {
    const label = section === "prefix" ? "Prefix" : "Suffix";

    if (slot.type === "existing") {
      return (
        <div
          key={slotIdx}
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-2"
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-300">
              {label} {slotIdx + 1}
            </span>
            <button
              type="button"
              onClick={() => handleClearExistingSlot(section, slotIdx)}
              className="rounded bg-red-500/80 px-2 py-0.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
            >
              <Trans>Delete</Trans>
            </button>
          </div>
          <div className="rounded border border-zinc-700 bg-zinc-900 p-2">
            <div className="whitespace-pre-line text-sm text-amber-400">
              {slot.text}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        key={slotIdx}
        className="rounded-lg border border-zinc-700 bg-zinc-800 p-2"
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-300">
            {label} {slotIdx + 1}
          </span>
          <div className="flex items-center gap-2">
            {slot.type === "legendary" && slot.legendaryName !== undefined && (
              <button
                type="button"
                onClick={() => handleCorruptionToggle(section, slotIdx)}
                className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                  slot.isCorrupted
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                }`}
              >
                {slot.isCorrupted ? "Corruption" : "Normal"}
              </button>
            )}
            <button
              type="button"
              onClick={() => toggleSlotType(section, slotIdx)}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                slot.type === "legendary"
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {slot.type === "regular" ? "Regular" : "Legendary"}
            </button>
          </div>
        </div>

        {slot.type === "regular" ? (
          <GroupedAffixSlotComponent
            slotIndex={slotIdx}
            affixType={section === "prefix" ? "Prefix" : "Suffix"}
            affixes={affixes}
            selection={{
              affixIndex: slot.affixIndex,
              percentage: slot.percentage,
            }}
            onAffixSelect={(_, value) =>
              handleRegularAffixSelect(section, slotIdx, value)
            }
            onSliderChange={(_, value) =>
              handleRegularSliderChange(section, slotIdx, value)
            }
            onClear={() => handleRegularClear(section, slotIdx)}
            hideTierInfo={false}
            allSlotStates={allSlotStates}
          />
        ) : (
          <LegendarySlotEditor
            slot={slot}
            availableLegendaryNames={availableLegendaryNames}
            onUpdate={(newSlot) =>
              updateLegendarySlot(section, slotIdx, newSlot)
            }
          />
        )}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={i18n._(
        editItem !== undefined ? "Edit Vorax Gear" : "Craft Vorax Gear",
      )}
      maxWidth="xl"
      dismissible={false}
    >
      <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-2">
        {/* Vorax Limb Selector */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-50">
            <Trans>Vorax Limb</Trans>
          </label>
          <SearchableSelect
            value={selectedLimbIndex}
            onChange={handleLimbSelect}
            options={limbOptions}
            placeholder="Select a vorax limb..."
          />
        </div>

        {selectedLimb !== undefined ? (
          <>
            {/* Base Affix */}
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-50">
                <Trans>Base Affix</Trans>
              </h3>
              <SearchableSelect
                value={selectedBaseAffixIndex}
                onChange={setSelectedBaseAffixIndex}
                options={baseAffixOptions}
                placeholder="Select base affix..."
              />
              {selectedBaseAffixIndex !== undefined && (
                <div className="mt-1 rounded border border-zinc-700 bg-zinc-900 p-2">
                  <span className="whitespace-pre-line text-sm text-amber-400">
                    {selectedLimb.baseAffixes[selectedBaseAffixIndex].affix}
                  </span>
                </div>
              )}
            </div>

            {/* Prefixes */}
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-50">
                <Trans>Prefixes (3 max)</Trans>
              </h3>
              <div className="space-y-2">
                {prefixSlots.map((slot, idx) =>
                  renderSlot(
                    "prefix",
                    idx,
                    slot,
                    prefixAffixes,
                    getPrefixSlotStates(),
                  ),
                )}
              </div>
            </div>

            {/* Suffixes */}
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-50">
                <Trans>Suffixes (3 max)</Trans>
              </h3>
              <div className="space-y-2">
                {suffixSlots.map((slot, idx) =>
                  renderSlot(
                    "suffix",
                    idx,
                    slot,
                    suffixAffixes,
                    getSuffixSlotStates(),
                  ),
                )}
              </div>
            </div>

            {/* Custom Affixes */}
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-50">
                <Trans>Custom Affixes</Trans>
              </h3>
              <textarea
                value={customAffixText}
                onChange={(e) => setCustomAffixText(e.target.value)}
                placeholder={i18n._(
                  "+10% Fire Damage\n+20 to Maximum Life\n+5% Attack Speed",
                )}
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-50 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <p className="mt-1 text-xs text-zinc-500">
                <Trans>
                  Enter raw affix text, one per line. Use this for affixes not
                  available in the dropdowns above.
                </Trans>
              </p>
            </div>
          </>
        ) : (
          <p className="py-8 text-center italic text-zinc-500">
            <Trans>Select a vorax limb to configure</Trans>
          </p>
        )}
      </div>

      <ModalActions>
        <ModalButton variant="secondary" onClick={onClose} fullWidth>
          <Trans>Cancel</Trans>
        </ModalButton>
        <ModalButton
          onClick={handleSave}
          fullWidth
          disabled={selectedLimb === undefined}
        >
          {editItem !== undefined ? (
            <Trans>Save Changes</Trans>
          ) : (
            <Trans>Save to Inventory</Trans>
          )}
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};
