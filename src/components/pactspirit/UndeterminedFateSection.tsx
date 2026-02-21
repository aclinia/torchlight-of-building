import { useEffect, useState } from "react";
import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import type { Destiny } from "@/src/data/destiny/types";
import {
  craftDestinyAffix,
  formatDestinyOption,
  getDestiniesForUndeterminedSlot,
  hasRanges,
} from "../../lib/pactspirit-utils";
import type { InstalledDestinyResult } from "../../lib/types";
import type { PactspiritSlot, UndeterminedFateSlotState } from "../../tli/core";
import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
} from "../ui/Modal";
import { DestinySlotRow } from "./RingSlot";

interface UndeterminedFateSectionProps {
  slot: PactspiritSlot;
  onInstallUndeterminedFate: (numMicro: number, numMedium: number) => void;
  onRemoveUndeterminedFate: () => void;
  onInstallFateDestiny: (
    slotType: "micro" | "medium",
    slotIdx: number,
    destiny: InstalledDestinyResult,
  ) => void;
  onClearFateDestiny: (slotType: "micro" | "medium", slotIdx: number) => void;
}

const FateSlotRow: React.FC<{
  fateSlot: UndeterminedFateSlotState;
  label: string;
  onInstallClick: () => void;
  onRevert: () => void;
}> = ({ fateSlot, label, onInstallClick, onRevert }) => {
  const { installedDestiny } = fateSlot;
  const hasDestiny = installedDestiny !== undefined;
  const displayName = hasDestiny ? installedDestiny.destinyName : label;
  const displayAffix = hasDestiny
    ? installedDestiny.affix
    : fateSlot.defaultAffix;
  const slotTypeLabel =
    fateSlot.slotType === "micro" ? "Micro Slot" : "Medium Slot";

  return (
    <DestinySlotRow
      displayName={displayName}
      subtitle={slotTypeLabel}
      displayAffix={displayAffix}
      installedDestiny={fateSlot.installedDestiny}
      onAction={hasDestiny ? onRevert : onInstallClick}
      actionLabel={hasDestiny ? "Revert" : "Install"}
      actionVariant={hasDestiny ? "revert" : "install"}
    />
  );
};

const FateDestinyModal: React.FC<{
  isOpen: boolean;
  slotType: "micro" | "medium";
  onClose: () => void;
  onConfirm: (destiny: InstalledDestinyResult) => void;
}> = ({ isOpen, slotType, onClose, onConfirm }) => {
  const [selectedDestiny, setSelectedDestiny] = useState<Destiny | undefined>();
  const [percentage, setPercentage] = useState(50);

  const availableDestinies = getDestiniesForUndeterminedSlot(slotType);
  const affixHasRanges =
    selectedDestiny !== undefined ? hasRanges(selectedDestiny.affix) : false;
  const previewAffix =
    selectedDestiny !== undefined
      ? craftDestinyAffix(selectedDestiny.affix, percentage)
      : "";

  useEffect(() => {
    if (isOpen) {
      setSelectedDestiny(undefined);
      setPercentage(50);
    }
  }, [isOpen]);

  const handleDestinySelect = (destinyName: string): void => {
    const destiny = availableDestinies.find((d) => d.name === destinyName);
    setSelectedDestiny(destiny);
    setPercentage(50);
  };

  const handleConfirm = (): void => {
    if (selectedDestiny === undefined) return;
    onConfirm({
      destinyName: selectedDestiny.name,
      destinyType: selectedDestiny.type,
      resolvedAffix: previewAffix,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Install Fate" maxWidth="md">
      <ModalDescription>
        Select a {slotType === "micro" ? "micro" : "medium"} fate to install.
      </ModalDescription>

      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-1">Fate</label>
        <SearchableSelect
          value={selectedDestiny?.name}
          onChange={(name) =>
            name !== undefined && handleDestinySelect(name as string)
          }
          options={availableDestinies.map((destiny) => ({
            value: destiny.name,
            label: formatDestinyOption(destiny),
          }))}
          placeholder="<Select Fate>"
          autoFocus={isOpen}
        />
      </div>

      {selectedDestiny !== undefined && affixHasRanges && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-zinc-400">Roll Quality</label>
            <span className="text-sm font-medium text-zinc-50">
              {percentage}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
      )}

      {selectedDestiny !== undefined && (
        <div className="mb-4 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
          <div className="text-sm font-medium text-amber-400 mb-1">
            {formatDestinyOption(selectedDestiny)}
          </div>
          <div className="text-xs text-zinc-400 whitespace-pre-line">
            {previewAffix}
          </div>
        </div>
      )}

      <ModalActions>
        <ModalButton
          onClick={handleConfirm}
          disabled={selectedDestiny === undefined}
          fullWidth
        >
          Confirm
        </ModalButton>
        <ModalButton onClick={onClose} variant="secondary">
          Cancel
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};

const ConfigureModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (numMicro: number, numMedium: number) => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [numMicro, setNumMicro] = useState(0);
  const [numMedium, setNumMedium] = useState(0);
  const total = numMicro + numMedium;

  useEffect(() => {
    if (isOpen) {
      setNumMicro(0);
      setNumMedium(0);
    }
  }, [isOpen]);

  const handleConfirm = (): void => {
    if (total === 0 || total > 5) return;
    onConfirm(numMicro, numMedium);
    onClose();
  };

  const adjustMicro = (delta: number): void => {
    const next = numMicro + delta;
    if (next < 0 || next + numMedium > 5) return;
    setNumMicro(next);
  };

  const adjustMedium = (delta: number): void => {
    const next = numMedium + delta;
    if (next < 0 || numMicro + next > 5) return;
    setNumMedium(next);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Undetermined Fate"
      maxWidth="sm"
    >
      <ModalDescription>
        Choose how many micro and medium sub-slots to create (total max 5).
      </ModalDescription>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-300">Micro Slots</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustMicro(-1)}
              disabled={numMicro <= 0}
              className="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              -
            </button>
            <span className="text-sm font-medium text-zinc-50 w-4 text-center">
              {numMicro}
            </span>
            <button
              onClick={() => adjustMicro(1)}
              disabled={total >= 5}
              className="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-300">Medium Slots</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustMedium(-1)}
              disabled={numMedium <= 0}
              className="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              -
            </button>
            <span className="text-sm font-medium text-zinc-50 w-4 text-center">
              {numMedium}
            </span>
            <button
              onClick={() => adjustMedium(1)}
              disabled={total >= 5}
              className="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-xs text-zinc-500 text-center">
          Total: {total} / 5
        </div>
      </div>

      <ModalActions>
        <ModalButton
          onClick={handleConfirm}
          disabled={total === 0 || total > 5}
          fullWidth
        >
          Confirm
        </ModalButton>
        <ModalButton onClick={onClose} variant="secondary">
          Cancel
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};

export const UndeterminedFateSection: React.FC<
  UndeterminedFateSectionProps
> = ({
  slot,
  onInstallUndeterminedFate,
  onRemoveUndeterminedFate,
  onInstallFateDestiny,
  onClearFateDestiny,
}) => {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [destinyModalOpen, setDestinyModalOpen] = useState(false);
  const [activeSlotType, setActiveSlotType] = useState<
    "micro" | "medium" | undefined
  >();
  const [activeSlotIdx, setActiveSlotIdx] = useState<number>(0);

  const handleInstallClick = (
    slotType: "micro" | "medium",
    slotIdx: number,
  ): void => {
    setActiveSlotType(slotType);
    setActiveSlotIdx(slotIdx);
    setDestinyModalOpen(true);
  };

  const handleConfirmDestiny = (destiny: InstalledDestinyResult): void => {
    if (activeSlotType !== undefined) {
      onInstallFateDestiny(activeSlotType, activeSlotIdx, destiny);
    }
    setDestinyModalOpen(false);
    setActiveSlotType(undefined);
  };

  const { undeterminedFate } = slot;

  if (undeterminedFate === undefined) {
    // Not configured — show default affix and configure button
    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-zinc-400 mb-2">
          Undetermined Fate
        </h4>
        <DestinySlotRow
          displayName="Default Effect"
          subtitle="Undetermined Fate"
          displayAffix={slot.defaultUndeterminedAffix}
          onAction={() => setConfigModalOpen(true)}
          actionLabel="Configure"
          actionVariant="install"
        />
        <ConfigureModal
          isOpen={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          onConfirm={onInstallUndeterminedFate}
        />
      </div>
    );
  }

  // Configured — show sub-slots
  const microSlots = undeterminedFate.slots.filter(
    (s) => s.slotType === "micro",
  );
  const mediumSlots = undeterminedFate.slots.filter(
    (s) => s.slotType === "medium",
  );

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-zinc-400">
          Undetermined Fate ({microSlots.length} Micro, {mediumSlots.length}{" "}
          Medium)
        </h4>
        <button
          onClick={onRemoveUndeterminedFate}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
        >
          Remove
        </button>
      </div>
      <div className="space-y-2">
        {microSlots.map((fateSlot, i) => (
          <FateSlotRow
            key={`micro-${i}`}
            fateSlot={fateSlot}
            label={`Micro Slot ${i + 1}`}
            onInstallClick={() => handleInstallClick("micro", i)}
            onRevert={() => onClearFateDestiny("micro", i)}
          />
        ))}
        {mediumSlots.map((fateSlot, i) => (
          <FateSlotRow
            key={`medium-${i}`}
            fateSlot={fateSlot}
            label={`Medium Slot ${i + 1}`}
            onInstallClick={() => handleInstallClick("medium", i)}
            onRevert={() => onClearFateDestiny("medium", i)}
          />
        ))}
      </div>

      {activeSlotType !== undefined && (
        <FateDestinyModal
          isOpen={destinyModalOpen}
          slotType={activeSlotType}
          onClose={() => {
            setDestinyModalOpen(false);
            setActiveSlotType(undefined);
          }}
          onConfirm={handleConfirmDestiny}
        />
      )}
    </div>
  );
};
