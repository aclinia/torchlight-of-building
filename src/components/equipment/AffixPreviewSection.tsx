import type { BaseGearAffix } from "@/src/tli/gear-data-types";

interface AffixPreviewSectionProps {
  slotIndex: number;
  selectedAffix: BaseGearAffix;
  percentage: number;
  previewText: string;
  hideQualitySlider: boolean;
  showTierInfo: boolean;
  onSliderChange: (slotIndex: number, value: string) => void;
  onClear: (slotIndex: number) => void;
}

export const AffixPreviewSection = ({
  slotIndex,
  selectedAffix,
  percentage,
  previewText,
  hideQualitySlider,
  showTierInfo,
  onSliderChange,
  onClear,
}: AffixPreviewSectionProps): React.ReactElement => {
  return (
    <>
      {!hideQualitySlider && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor={`quality-slider-${slotIndex}`}
              className="text-xs text-zinc-500"
            >
              Quality
            </label>
            <span className="text-xs font-medium text-zinc-50">
              {percentage}%{showTierInfo && ` (Tier ${selectedAffix.tier})`}
            </span>
          </div>
          <input
            id={`quality-slider-${slotIndex}`}
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => onSliderChange(slotIndex, e.target.value)}
            className="w-full"
          />
        </div>
      )}

      <div className="bg-zinc-900 p-3 rounded border border-zinc-700 flex">
        <div
          className={`text-sm font-medium whitespace-pre-line flex-1 ${hideQualitySlider || !showTierInfo ? "text-purple-400" : "text-amber-400"}`}
        >
          {previewText}
        </div>
        <button
          type="button"
          onClick={() => onClear(slotIndex)}
          className="text-xs text-red-500 hover:text-red-400 font-medium"
        >
          Clear
        </button>
      </div>
    </>
  );
};
