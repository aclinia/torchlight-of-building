import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import { useMemo, useState } from "react";
import { Legendaries } from "@/src/data/legendary/legendaries";
import type { LegendaryAffix } from "@/src/data/legendary/types";
import type { Gear } from "@/src/lib/save-data";
import type { Affix, AffixLine, Gear as CoreGear } from "@/src/tli/core";
import { craft, craftMulti, extractRanges } from "@/src/tli/crafting/craft";
import { parseMod } from "@/src/tli/mod-parser";
import {
  formatBlendAffix,
  formatBlendOption,
  formatBlendPreview,
  getBlendAffixes,
} from "../../lib/blend-utils";
import { DEFAULT_QUALITY } from "../../lib/constants";
import { generateItemId } from "../../lib/storage";
import { Modal, ModalActions, ModalButton } from "../ui/Modal";
import { SearchableSelect } from "../ui/SearchableSelect";
import { Tooltip } from "../ui/Tooltip";
import { GearTooltipContent } from "./GearTooltipContent";
import {
  LegendaryAffixRow,
  type LegendaryAffixState,
} from "./LegendaryAffixRow";

const isChoiceType = (
  affix: LegendaryAffix,
): affix is { choiceDescriptor: string; choices: string[] } => {
  return typeof affix !== "string";
};

const getAffixString = (
  affix: LegendaryAffix,
  state: LegendaryAffixState,
): string | undefined => {
  if (typeof affix === "string") {
    return affix;
  }
  if (state.selectedChoiceIndex !== undefined) {
    return affix.choices[state.selectedChoiceIndex];
  }
  return undefined;
};

const craftAffixSingle = (affix: string, percentage: number): string => {
  return craft({ craftableAffix: affix }, percentage);
};

const craftAffixMulti = (affix: string, percentages: number[]): string => {
  return craftMulti({ craftableAffix: affix }, percentages);
};

const countRanges = (affix: string): number => {
  return extractRanges(affix).length;
};

const convertAffixStringToAffix = (affixText: string): Affix => {
  const lines = affixText.split(/\n/);
  const affixLines: AffixLine[] = lines.map((lineText) => ({
    text: lineText,
    mods: parseMod(lineText),
  }));
  return { affixLines };
};

const getAffixStringFromLegendary = (affix: LegendaryAffix): string => {
  return typeof affix === "string" ? affix : affix.choices[0];
};

interface LegendaryGearModuleProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToInventory: (item: Gear) => void;
}

export const LegendaryGearModule: React.FC<LegendaryGearModuleProps> = ({
  isOpen,
  onClose,
  onSaveToInventory,
}) => {
  const [selectedLegendaryIndex, setSelectedLegendaryIndex] = useState<
    number | undefined
  >(undefined);
  const [affixStates, setAffixStates] = useState<LegendaryAffixState[]>([]);
  const [selectedBlendIndex, setSelectedBlendIndex] = useState<
    number | undefined
  >(undefined);

  const blendAffixes = useMemo(() => getBlendAffixes(), []);

  const sortedLegendaries = useMemo(() => {
    return [...Legendaries].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const legendaryOptions = useMemo(() => {
    return sortedLegendaries.map((legendary, idx) => ({
      value: idx,
      label: i18n._(legendary.name),
      sublabel: i18n._(legendary.equipmentType),
    }));
  }, [sortedLegendaries]);

  const selectedLegendary =
    selectedLegendaryIndex !== undefined
      ? sortedLegendaries[selectedLegendaryIndex]
      : undefined;

  const isBelt = selectedLegendary?.equipmentType === "Belt";

  const blendOptions = useMemo(() => {
    return blendAffixes.map((blend, idx) => ({
      value: idx,
      label: formatBlendOption(blend),
    }));
  }, [blendAffixes]);

  const handleLegendarySelect = (index: number | undefined) => {
    setSelectedLegendaryIndex(index);
    setSelectedBlendIndex(undefined);
    if (index !== undefined) {
      const legendary = sortedLegendaries[index];
      setAffixStates(
        legendary.normalAffixes.map((affix) => {
          const affixStr = typeof affix === "string" ? affix : affix.choices[0];
          const rangeCount = countRanges(affixStr);
          return {
            isCorrupted: false,
            percentages: Array.from(
              { length: rangeCount },
              () => DEFAULT_QUALITY,
            ),
          };
        }),
      );
    } else {
      setAffixStates([]);
    }
  };

  const handleToggleCorruption = (index: number) => {
    if (selectedLegendary === undefined) return;
    setAffixStates((prev) =>
      prev.map((state, i) => {
        if (i !== index) return state;
        const newIsCorrupted = !state.isCorrupted;
        const newAffix = newIsCorrupted
          ? selectedLegendary.corruptionAffixes[i]
          : selectedLegendary.normalAffixes[i];
        const affixStr =
          typeof newAffix === "string" ? newAffix : newAffix.choices[0];
        const rangeCount = countRanges(affixStr);
        return {
          ...state,
          isCorrupted: newIsCorrupted,
          selectedChoiceIndex: undefined,
          percentages: Array.from(
            { length: rangeCount },
            () => DEFAULT_QUALITY,
          ),
        };
      }),
    );
  };

  const handlePercentageChange = (
    affixIndex: number,
    rangeIndex: number,
    percentage: number,
  ) => {
    setAffixStates((prev) =>
      prev.map((state, i) => {
        if (i !== affixIndex) return state;
        const newPercentages = [...state.percentages];
        newPercentages[rangeIndex] = percentage;
        return { ...state, percentages: newPercentages };
      }),
    );
  };

  const handleChoiceSelect = (
    index: number,
    choiceIndex: number | undefined,
  ) => {
    if (selectedLegendary === undefined) return;
    setAffixStates((prev) =>
      prev.map((state, i) => {
        if (i !== index) return state;
        if (choiceIndex === undefined) {
          return { ...state, selectedChoiceIndex: undefined, percentages: [] };
        }
        const affix = state.isCorrupted
          ? selectedLegendary.corruptionAffixes[i]
          : selectedLegendary.normalAffixes[i];
        const affixStr =
          typeof affix === "string" ? affix : affix.choices[choiceIndex];
        const rangeCount = countRanges(affixStr);
        return {
          ...state,
          selectedChoiceIndex: choiceIndex,
          percentages: Array.from(
            { length: rangeCount },
            () => DEFAULT_QUALITY,
          ),
        };
      }),
    );
  };

  const hasUnselectedChoices =
    selectedLegendary !== undefined &&
    affixStates.some((state, i) => {
      const affix = state.isCorrupted
        ? selectedLegendary.corruptionAffixes[i]
        : selectedLegendary.normalAffixes[i];
      return isChoiceType(affix) && state.selectedChoiceIndex === undefined;
    });

  const handleSaveToInventory = () => {
    if (selectedLegendary === undefined) return;

    const legendaryAffixes: string[] = [];
    for (let i = 0; i < affixStates.length; i++) {
      const state = affixStates[i];
      const affix = state.isCorrupted
        ? selectedLegendary.corruptionAffixes[i]
        : selectedLegendary.normalAffixes[i];
      const affixString = getAffixString(affix, state);
      if (affixString === undefined) {
        console.error(`Unselected choice at index ${i}, cannot save item`);
        return;
      }
      legendaryAffixes.push(craftAffixMulti(affixString, state.percentages));
    }

    const blendAffix =
      isBelt && selectedBlendIndex !== undefined
        ? formatBlendAffix(blendAffixes[selectedBlendIndex])
        : undefined;

    const newItem: Gear = {
      id: generateItemId(),
      equipmentType: selectedLegendary.equipmentType,
      legendaryAffixes,
      blendAffix,
      rarity: "legendary",
      baseStats:
        selectedLegendary.baseStat !== ""
          ? selectedLegendary.baseStat
          : undefined,
      baseGearName:
        selectedLegendary.baseStat !== ""
          ? selectedLegendary.baseItem
          : undefined,
      legendaryName: selectedLegendary.name,
    };

    onSaveToInventory(newItem);

    setSelectedLegendaryIndex(undefined);
    setAffixStates([]);
    setSelectedBlendIndex(undefined);
    onClose();
  };

  const createGearPreview = (index: number): CoreGear => {
    const legendary = sortedLegendaries[index];

    const legendaryAffixes: Affix[] = legendary.normalAffixes.map((affix) => {
      const affixString = getAffixStringFromLegendary(affix);
      const crafted = craftAffixSingle(affixString, DEFAULT_QUALITY);
      return convertAffixStringToAffix(crafted);
    });

    return {
      equipmentType: legendary.equipmentType,
      rarity: "legendary",
      legendaryName: legendary.name,
      legendaryAffixes,
    };
  };

  const renderLegendaryTooltip = (
    option: { value: number; label: string },
    triggerRect: DOMRect,
  ): React.ReactNode => {
    const gearPreview = createGearPreview(option.value);
    return (
      <Tooltip isVisible={true} triggerRect={triggerRect} variant="legendary">
        <GearTooltipContent item={gearPreview} />
      </Tooltip>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={i18n._("Add Legendary")}
      maxWidth="xl"
      dismissible={false}
    >
      <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-2">
        {/* Legendary Selector */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-50">
            <Trans>Select Legendary</Trans>
          </label>
          <SearchableSelect
            value={selectedLegendaryIndex}
            onChange={handleLegendarySelect}
            options={legendaryOptions}
            placeholder="Select a legendary..."
            renderOptionTooltip={renderLegendaryTooltip}
          />
        </div>

        {selectedLegendary !== undefined ? (
          <>
            {/* Base Stat Display */}
            {selectedLegendary.baseStat !== "" && (
              <div>
                <h3 className="mb-1 text-sm font-medium text-zinc-50">
                  Base Stat
                </h3>
                <div className="rounded border border-zinc-700 bg-zinc-900 p-2">
                  <span className="whitespace-pre-line text-amber-400">
                    {selectedLegendary.baseStat}
                  </span>
                </div>
              </div>
            )}

            {/* Blending Section (Belts Only) */}
            {isBelt && (
              <div>
                <h3 className="mb-1 text-sm font-medium text-zinc-50">
                  Blending (1 max)
                </h3>
                <SearchableSelect
                  value={selectedBlendIndex}
                  onChange={setSelectedBlendIndex}
                  options={blendOptions}
                  placeholder="Select a blend..."
                />
                {selectedBlendIndex !== undefined && (
                  <div className="mt-1 rounded border border-zinc-700 bg-zinc-900 p-2">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-amber-400">
                      {formatBlendPreview(blendAffixes[selectedBlendIndex])}
                    </pre>
                    <button
                      type="button"
                      onClick={() => setSelectedBlendIndex(undefined)}
                      className="mt-1 text-xs text-zinc-400 hover:text-zinc-200"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Affixes Section */}
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-50">Affixes</h3>
              <div className="space-y-2">
                {selectedLegendary.normalAffixes.map((normalAffix, index) => (
                  <LegendaryAffixRow
                    key={index}
                    index={index}
                    normalAffix={normalAffix}
                    corruptionAffix={selectedLegendary.corruptionAffixes[index]}
                    state={affixStates[index]}
                    onToggleCorruption={handleToggleCorruption}
                    onPercentageChange={handlePercentageChange}
                    onChoiceSelect={handleChoiceSelect}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="py-8 text-center italic text-zinc-500">
            Select a legendary to configure
          </p>
        )}
      </div>

      <ModalActions>
        <ModalButton variant="secondary" onClick={onClose} fullWidth>
          <Trans>Cancel</Trans>
        </ModalButton>
        <ModalButton
          onClick={handleSaveToInventory}
          fullWidth
          disabled={selectedLegendary === undefined || hasUnselectedChoices}
        >
          <Trans>Save to Inventory</Trans>
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};
