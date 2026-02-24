import type {
  LegendaryAffix,
  LegendaryAffixChoice,
} from "@/src/data/legendary/types";
import { extractRanges, type RangeDescriptor } from "@/src/tli/crafting/craft";

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

  return (
    <div className="rounded-lg bg-zinc-800 p-2">
      {/* Toggle Button */}
      <div className="mb-1 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleCorruption(index)}
          className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
            state.isCorrupted
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
          }`}
        >
          {state.isCorrupted ? "Corruption" : "Normal"}
        </button>
      </div>

      {/* Choice Selector (for choice-type affixes) */}
      {isChoice && (
        <div className="mb-1">
          <div className="mb-1 text-xs italic text-zinc-400">
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
            className="w-full rounded border border-zinc-600 bg-zinc-700 px-2 py-1.5 text-sm text-zinc-50 focus:border-amber-500 focus:outline-none"
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
        <div className="space-y-1">
          {ranges.map((range, rangeIdx) => (
            <div key={rangeIdx}>
              <div className="mb-1 flex items-center justify-between">
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
    </div>
  );
};
