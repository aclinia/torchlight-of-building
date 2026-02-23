import { useState } from "react";
import type { CraftedInverseImage } from "@/src/tli/core";
import { Modal } from "../ui/Modal";
import { InverseImageCrafter } from "./InverseImageCrafter";
import { InverseImageInventory } from "./InverseImageInventory";

interface InverseImageSectionProps {
  inverseImages: CraftedInverseImage[];
  onSave: (inverseImage: CraftedInverseImage) => void;
  onUpdate: (inverseImage: CraftedInverseImage) => void;
  onCopy: (inverseImage: CraftedInverseImage) => void;
  onDelete: (inverseImageId: string) => void;
  selectedInverseImageId?: string;
  onSelectInverseImage?: (inverseImageId: string | undefined) => void;
  hasInverseImagePlaced?: boolean;
  hasPrismPlaced?: boolean;
  isOnGodGoddessTree?: boolean;
  treeHasPoints?: boolean;
}

export const InverseImageSection: React.FC<InverseImageSectionProps> = ({
  inverseImages,
  onSave,
  onUpdate,
  onCopy,
  onDelete,
  selectedInverseImageId,
  onSelectInverseImage,
  hasInverseImagePlaced = false,
  hasPrismPlaced = false,
  isOnGodGoddessTree = false,
  treeHasPoints = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInverseImage, setEditingInverseImage] = useState<
    CraftedInverseImage | undefined
  >(undefined);

  const handleSave = (inverseImage: CraftedInverseImage): void => {
    if (editingInverseImage !== undefined) {
      onUpdate(inverseImage);
    } else {
      onSave(inverseImage);
    }
    setEditingInverseImage(undefined);
    setIsModalOpen(false);
  };

  const handleEdit = (inverseImage: CraftedInverseImage): void => {
    setEditingInverseImage(inverseImage);
    setIsModalOpen(true);
  };

  const handleClose = (): void => {
    setEditingInverseImage(undefined);
    setIsModalOpen(false);
  };

  const handleOpenCraft = (): void => {
    setEditingInverseImage(undefined);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-zinc-50">Inverse Images</h2>
        <button
          type="button"
          onClick={handleOpenCraft}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-600"
        >
          Craft Inverse Image
        </button>
      </div>
      <InverseImageInventory
        inverseImages={inverseImages}
        onEdit={handleEdit}
        onCopy={onCopy}
        onDelete={onDelete}
        selectedInverseImageId={selectedInverseImageId}
        onSelectInverseImage={onSelectInverseImage}
        hasInverseImagePlaced={hasInverseImagePlaced}
        hasPrismPlaced={hasPrismPlaced}
        isOnGodGoddessTree={isOnGodGoddessTree}
        treeHasPoints={treeHasPoints}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={
          editingInverseImage !== undefined
            ? "Edit Inverse Image"
            : "Craft Inverse Image"
        }
        dismissible={false}
      >
        <InverseImageCrafter
          editingInverseImage={editingInverseImage}
          onSave={handleSave}
          onCancel={handleClose}
        />
      </Modal>
    </div>
  );
};
