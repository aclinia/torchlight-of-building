import { Trans } from "@lingui/react/macro";
import { useState } from "react";
import type { CraftedPrism as SaveDataCraftedPrism } from "@/src/lib/save-data";
import type { CraftedPrism } from "@/src/tli/core";
import { Modal } from "../ui/Modal";
import { PrismCrafter } from "./PrismCrafter";
import { PrismInventory } from "./PrismInventory";

interface PrismSectionProps {
  prisms: CraftedPrism[];
  onSave: (prism: SaveDataCraftedPrism) => void;
  onUpdate: (prism: SaveDataCraftedPrism) => void;
  onCopy: (prism: CraftedPrism) => void;
  onDelete: (prismId: string) => void;
  selectedPrismId?: string;
  onSelectPrism?: (prismId: string | undefined) => void;
  hasPrismPlaced?: boolean;
  isOnGodGoddessTree?: boolean;
}

export const PrismSection: React.FC<PrismSectionProps> = ({
  prisms,
  onSave,
  onUpdate,
  onCopy,
  onDelete,
  selectedPrismId,
  onSelectPrism,
  hasPrismPlaced = false,
  isOnGodGoddessTree = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrism, setEditingPrism] = useState<CraftedPrism | undefined>(
    undefined,
  );

  const handleSave = (prism: SaveDataCraftedPrism): void => {
    if (editingPrism !== undefined) {
      onUpdate(prism);
    } else {
      onSave(prism);
    }
    setEditingPrism(undefined);
    setIsModalOpen(false);
  };

  const handleEdit = (prism: CraftedPrism): void => {
    setEditingPrism(prism);
    setIsModalOpen(true);
  };

  const handleClose = (): void => {
    setEditingPrism(undefined);
    setIsModalOpen(false);
  };

  const handleOpenCraft = (): void => {
    setEditingPrism(undefined);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-zinc-50">
          <Trans>Prisms</Trans>
        </h2>
        <button
          type="button"
          onClick={handleOpenCraft}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-600"
        >
          Craft Prism
        </button>
      </div>
      <PrismInventory
        prisms={prisms}
        onEdit={handleEdit}
        onCopy={onCopy}
        onDelete={onDelete}
        selectedPrismId={selectedPrismId}
        onSelectPrism={onSelectPrism}
        hasPrismPlaced={hasPrismPlaced}
        isOnGodGoddessTree={isOnGodGoddessTree}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingPrism !== undefined ? "Edit Prism" : "Craft Prism"}
        dismissible={false}
      >
        <PrismCrafter
          editingPrism={editingPrism}
          onSave={handleSave}
          onCancel={handleClose}
        />
      </Modal>
    </div>
  );
};
