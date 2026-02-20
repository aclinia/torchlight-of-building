import { useState } from "react";
import { findGridCenter } from "@/src/lib/divinity-grid";
import type { DivinitySlate as SaveDataSlate } from "@/src/lib/schemas/divinity.schema";
import type {
  DivinityPage,
  DivinitySlate,
  PlacedSlate,
  Rotation,
  SlateShape,
} from "@/src/tli/core";
import { DivinityGrid } from "./DivinityGrid";
import { ImportSlatesModal } from "./ImportSlatesModal";
import { LegendarySlateCrafter } from "./LegendarySlateCrafter";
import { SlateCrafter } from "./SlateCrafter";
import { SlateInventory } from "./SlateInventory";

interface DivinityTabProps {
  divinityPage: DivinityPage;
  onSaveSlate: (slate: DivinitySlate) => void;
  onCopySlate: (slate: DivinitySlate) => void;
  onDeleteSlate: (slateId: string) => void;
  onPlaceSlate: (placement: PlacedSlate) => void;
  onMoveSlate: (
    slateId: string,
    position: { row: number; col: number },
  ) => void;
  onUnplaceSlate: (slateId: string) => void;
  onUpdateSlateRotation: (slateId: string, rotation: Rotation) => void;
  onUpdateSlateFlip: (
    slateId: string,
    flippedH: boolean,
    flippedV: boolean,
  ) => void;
  onUpdateSlateShape: (slateId: string, shape: SlateShape) => void;
  onImportSlates: (slates: SaveDataSlate[]) => void;
}

export const DivinityTab: React.FC<DivinityTabProps> = ({
  divinityPage,
  onSaveSlate,
  onCopySlate,
  onDeleteSlate,
  onPlaceSlate,
  onMoveSlate,
  onUnplaceSlate,
  onUpdateSlateRotation,
  onUpdateSlateFlip,
  onUpdateSlateShape,
  onImportSlates,
}) => {
  const placedSlateIds = divinityPage.placedSlates.map((p) => p.slateId);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handlePlaceSlate = (slateId: string) => {
    const center = findGridCenter();
    const placement: PlacedSlate = { slateId, position: center };
    onPlaceSlate(placement);
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-zinc-200">Divinity Grid</h3>
        <DivinityGrid
          divinityPage={divinityPage}
          onMoveSlate={onMoveSlate}
          onUnplaceSlate={onUnplaceSlate}
          onUpdateSlateRotation={onUpdateSlateRotation}
          onUpdateSlateFlip={onUpdateSlateFlip}
          onUpdateSlateShape={onUpdateSlateShape}
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 font-semibold text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            Import Slates
          </button>
        </div>

        <SlateCrafter onSave={onSaveSlate} />

        <LegendarySlateCrafter onSave={onSaveSlate} />

        <SlateInventory
          slates={divinityPage.inventory}
          placedSlateIds={placedSlateIds}
          onPlace={handlePlaceSlate}
          onCopy={onCopySlate}
          onDelete={onDeleteSlate}
        />
      </div>

      <ImportSlatesModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={onImportSlates}
      />
    </div>
  );
};
