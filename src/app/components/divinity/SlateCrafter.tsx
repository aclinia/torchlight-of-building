"use client";

import { useState, useEffect, useMemo } from "react";
import {
  DivinitySlate,
  DIVINITY_GODS,
  SLATE_SHAPES,
  DivinityGod,
  SlateShape,
  Rotation,
  ROTATIONS,
} from "@/src/app/lib/save-data";
import { generateItemId } from "@/src/app/lib/storage";
import {
  getDivinityAffixes,
  DivinityAffix,
  GOD_COLORS,
  GOD_BORDER_COLORS,
} from "@/src/app/lib/divinity-utils";
import { MAX_SLATE_AFFIXES } from "@/src/app/lib/constants";
import { SlatePreview } from "./SlatePreview";
import {
  SearchableSelect,
  SearchableSelectOption,
} from "@/src/app/components/ui/SearchableSelect";

interface SlateCrafterProps {
  editingSlate: DivinitySlate | undefined;
  isPlaced?: boolean;
  onSave: (slate: DivinitySlate) => void;
  onCancel?: () => void;
  onRemoveFromGrid?: () => void;
}

export const SlateCrafter: React.FC<SlateCrafterProps> = ({
  editingSlate,
  isPlaced = false,
  onSave,
  onCancel,
  onRemoveFromGrid,
}) => {
  const [god, setGod] = useState<DivinityGod>(editingSlate?.god ?? "Hunting");
  const [shape, setShape] = useState<SlateShape>(editingSlate?.shape ?? "O");
  const [rotation, setRotation] = useState<Rotation>(
    editingSlate?.rotation ?? 0,
  );
  const [flippedH, setFlippedH] = useState(editingSlate?.flippedH ?? false);
  const [flippedV, setFlippedV] = useState(editingSlate?.flippedV ?? false);
  const [selectedAffixes, setSelectedAffixes] = useState<DivinityAffix[]>([]);

  /* eslint-disable react-hooks/set-state-in-effect -- sync state with prop changes */
  useEffect(() => {
    if (editingSlate) {
      setGod(editingSlate.god);
      setShape(editingSlate.shape);
      setRotation(editingSlate.rotation);
      setFlippedH(editingSlate.flippedH);
      setFlippedV(editingSlate.flippedV);
      const affixes: DivinityAffix[] = editingSlate.affixes.map(
        (effect: string, i: number) => ({
          effect,
          type: editingSlate.affixTypes[i],
        }),
      );
      setSelectedAffixes(affixes);
    } else {
      setSelectedAffixes([]);
      setRotation(0);
      setFlippedH(false);
      setFlippedV(false);
    }
  }, [editingSlate]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const availableAffixes = getDivinityAffixes(god);

  const affixOptions = useMemo((): SearchableSelectOption<string>[] => {
    return availableAffixes
      .filter(
        (affix) => !selectedAffixes.some((a) => a.effect === affix.effect),
      )
      .map((affix) => ({
        value: affix.effect,
        label: affix.effect.split("\n")[0],
        sublabel: affix.type === "Legendary Medium" ? "Legendary" : "Medium",
      }));
  }, [availableAffixes, selectedAffixes]);

  const handleGodChange = (newGod: DivinityGod) => {
    setGod(newGod);
    setSelectedAffixes([]);
  };

  const handleRotate = () => {
    const currentIndex = ROTATIONS.indexOf(rotation);
    const nextIndex = (currentIndex + 1) % ROTATIONS.length;
    setRotation(ROTATIONS[nextIndex]);
  };

  const handleAddAffix = (effectValue: string | undefined) => {
    if (!effectValue) return;
    if (selectedAffixes.length >= MAX_SLATE_AFFIXES) return;
    const affix = availableAffixes.find((a) => a.effect === effectValue);
    if (!affix) return;
    if (selectedAffixes.some((a) => a.effect === affix.effect)) return;
    setSelectedAffixes([...selectedAffixes, affix]);
  };

  const handleRemoveAffix = (index: number) => {
    setSelectedAffixes(selectedAffixes.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const slate: DivinitySlate = {
      id: editingSlate?.id ?? generateItemId(),
      god,
      shape,
      rotation,
      flippedH,
      flippedV,
      affixes: selectedAffixes.map((a) => a.effect),
      affixTypes: selectedAffixes.map((a) => a.type),
    };
    onSave(slate);

    if (!editingSlate) {
      setSelectedAffixes([]);
      setRotation(0);
      setFlippedH(false);
      setFlippedV(false);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4">
      <h3 className="mb-4 text-lg font-medium text-zinc-200">
        {editingSlate ? "Edit Slate" : "Craft Slate"}
      </h3>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">God</label>
        <div className="flex flex-wrap gap-2">
          {DIVINITY_GODS.map((g) => (
            <button
              key={g}
              onClick={() => handleGodChange(g)}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                god === g
                  ? `${GOD_COLORS[g]} text-white`
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">
          Shape & Orientation
        </label>
        <div className="flex gap-4 items-start">
          <div className="flex flex-col gap-2">
            {SLATE_SHAPES.map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`flex h-12 w-12 items-center justify-center rounded border-2 transition-colors ${
                  shape === s
                    ? `${GOD_BORDER_COLORS[god]} ${GOD_COLORS[god]}`
                    : "border-zinc-600 bg-zinc-700 hover:border-zinc-500"
                }`}
              >
                <SlatePreview shape={s} god={god} size="small" />
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded border border-zinc-600 bg-zinc-900">
              <SlatePreview
                shape={shape}
                god={god}
                rotation={rotation}
                flippedH={flippedH}
                flippedV={flippedV}
                size="large"
              />
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleRotate}
                className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-600"
                title="Rotate 90°"
              >
                ↻
              </button>
              <button
                onClick={() => setFlippedH((v) => !v)}
                className={`rounded px-2 py-1 text-xs ${
                  flippedH
                    ? "bg-amber-600 text-white"
                    : "bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
                }`}
                title="Flip Horizontal"
              >
                ↔
              </button>
              <button
                onClick={() => setFlippedV((v) => !v)}
                className={`rounded px-2 py-1 text-xs ${
                  flippedV
                    ? "bg-amber-600 text-white"
                    : "bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
                }`}
                title="Flip Vertical"
              >
                ↕
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">
          Selected Affixes ({selectedAffixes.length}/{MAX_SLATE_AFFIXES})
        </label>
        <div className="mb-2 flex flex-col gap-1">
          {selectedAffixes.map((affix, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded bg-zinc-700 px-2 py-1"
            >
              <span
                className={`h-3 w-3 rounded-sm ${
                  affix.type === "Legendary Medium"
                    ? "bg-orange-500"
                    : "bg-purple-500"
                }`}
              />
              <span className="flex-1 text-sm text-zinc-200 truncate">
                {affix.effect.split("\n")[0]}
              </span>
              <button
                onClick={() => handleRemoveAffix(index)}
                className="text-zinc-400 hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
          {selectedAffixes.length === 0 && (
            <p className="text-sm text-zinc-500">No affixes selected</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">Add Affix</label>
        <SearchableSelect
          value={undefined}
          onChange={handleAddAffix}
          options={affixOptions}
          placeholder={
            selectedAffixes.length >= MAX_SLATE_AFFIXES
              ? "Max affixes reached"
              : "Search affixes..."
          }
          disabled={selectedAffixes.length >= MAX_SLATE_AFFIXES}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={selectedAffixes.length === 0}
          className="flex-1 rounded bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-500 disabled:bg-zinc-600 disabled:cursor-not-allowed"
        >
          {editingSlate ? "Update Slate" : "Save to Inventory"}
        </button>
        {isPlaced && onRemoveFromGrid && (
          <button
            onClick={onRemoveFromGrid}
            className="rounded bg-red-900 px-4 py-2 text-red-200 transition-colors hover:bg-red-800"
          >
            Remove from Grid
          </button>
        )}
        {onCancel && (
          <button
            onClick={onCancel}
            className="rounded bg-zinc-700 px-4 py-2 text-zinc-200 transition-colors hover:bg-zinc-600"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
