import type {
  LegendaryAffix,
  LegendaryAffixChoice,
} from "@/src/data/legendary/types";
import {
  craftMulti,
  extractRanges,
  type RangeDescriptor,
} from "@/src/tli/crafting/craft";

export interface LegendaryAffixState {
  isCorrupted: boolean;
  percentages: number[];
  selectedChoiceIndex?: number;
}

interface LegendaryAffixRowProps {
  index: number;
  normalAffix: LegendaryAffix;
  corruptionAffix: LegendaryAffix;
  state: LegendaryAffixState;
  onToggleCorruption: (index: number) => void;
  onPercentageChange: (
    affixIndex: number,
    rangeIndex: number,
    percentage: number,
  ) => void;
  onChoiceSelect: (index: number, choiceIndex: number | undefined) => void;
}

const RANGE_PATTERN = /\((-?\d+)-(-?\d+)\)/;

const hasRange = (affix: string): boolean => {
  return RANGE_PATTERN.test(affix);
};

const craftAffix = (affix: string, percentages: number[]): string => {
  return craftMulti({ craftableAffix: affix }, percentages);
};

const isChoiceType = (affix: LegendaryAffix): affix is LegendaryAffixChoice => {
  return typeof affix !== "string";
};

const formatRangeLabel = (range: RangeDescriptor): string => {
  return `${range.min} – ${range.max}`;
};

export const LegendaryAffixRow: React.FC<LegendaryAffixRowProps> = ({
  index,
  normalAffix,
  corruptionAffix,
  state,
  onToggleCorruption,
  onPercentageChange,
  onChoiceSelect,
}) => {
  const currentAffix = state.isCorrupted ? corruptionAffix : normalAffix;

  const isChoice = isChoiceType(currentAffix);
  const selectedChoice =
    isChoice && state.selectedChoiceIndex !== undefined
      ? currentAffix.choices[state.selectedChoiceIndex]
      : undefined;
  const displayAffix = isChoice ? selectedChoice : currentAffix;
  const showSlider =
    displayAffix !== undefined ? hasRange(displayAffix) : false;
  const ranges = displayAffix !== undefined ? extractRanges(displayAffix) : [];
  const craftedText =
    displayAffix !== undefined
      ? craftAffix(displayAffix, state.percentages)
      : undefined;

  return (
    <div className="bg-zinc-800 p-2 rounded-lg">
      {/* Toggle Button */}
      <div className="flex items-center gap-2 mb-1">
        <button
          type="button"
          onClick={() => onToggleCorruption(index)}
          className={`
            px-3 py-1 rounded text-xs font-medium transition-colors
            ${
              state.isCorrupted
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            }
          `}
        >
          {state.isCorrupted ? "Corruption" : "Normal"}
        </button>
      </div>

      {/* Choice Selector (for choice-type affixes) */}
      {isChoice && (
        <div className="mb-1">
          <div className="text-xs text-zinc-400 mb-1 italic">
            {currentAffix.choiceDescriptor}
          </div>
          <select
            value={state.selectedChoiceIndex ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              onChoiceSelect(
                index,
                value === "" ? undefined : parseInt(value, 10),
              );
            }}
            className="w-full bg-zinc-700 text-zinc-50 text-sm rounded px-2 py-1.5 border border-zinc-600 focus:border-amber-500 focus:outline-none"
          >
            <option value="">Select an option...</option>
            {currentAffix.choices.map((choice, choiceIdx) => (
              <option key={choiceIdx} value={choiceIdx}>
                {choice}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quality Sliders (one per range in the affix) */}
      {showSlider && (
        <div className="mb-1 space-y-1">
          {ranges.map((range, rangeIdx) => (
            <div key={rangeIdx}>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-zinc-500">
                  {ranges.length > 1
                    ? `Quality (${formatRangeLabel(range)})`
                    : "Quality"}
                </label>
                <span className="text-xs font-medium text-zinc-50">
                  {state.percentages[rangeIdx] ?? 50}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.percentages[rangeIdx] ?? 50}
                onChange={(e) =>
                  onPercentageChange(
                    index,
                    rangeIdx,
                    parseInt(e.target.value, 10),
                  )
                }
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Crafted Preview */}
      {craftedText !== undefined ? (
        <div className="bg-zinc-900 p-2 rounded border border-zinc-700">
          <div className="text-sm text-amber-400">{craftedText}</div>
        </div>
      ) : (
        <div className="bg-zinc-900 p-2 rounded border border-zinc-700">
          <div className="text-sm text-zinc-500 italic">
            Select an option above
          </div>
        </div>
      )}
    </div>
  );
};
