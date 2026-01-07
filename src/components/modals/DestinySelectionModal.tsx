import { useEffect, useState } from "react";
import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import type { Destiny } from "@/src/data/destiny/types";
import {
  craftDestinyAffix,
  formatDestinyOption,
  getDestiniesForRingSlot,
  hasRanges,
} from "../../lib/pactspirit-utils";
import type { InstalledDestinyResult, RingSlotKey } from "../../lib/types";
import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
} from "../ui/Modal";

interface DestinySelectionModalProps {
  isOpen: boolean;
  ringSlot: RingSlotKey;
  onClose: () => void;
  onConfirm: (destiny: InstalledDestinyResult) => void;
}

export const DestinySelectionModal = ({
  isOpen,
  ringSlot,
  onClose,
  onConfirm,
}: DestinySelectionModalProps) => {
  const [selectedDestiny, setSelectedDestiny] = useState<Destiny | undefined>();
  const [percentage, setPercentage] = useState(50);

  const availableDestinies = getDestiniesForRingSlot(ringSlot);
  const affixHasRanges = selectedDestiny
    ? hasRanges(selectedDestiny.affix)
    : false;
  const previewAffix = selectedDestiny
    ? craftDestinyAffix(selectedDestiny.affix, percentage)
    : "";

  useEffect(() => {
    if (isOpen) {
      setSelectedDestiny(undefined);
      setPercentage(50);
    }
  }, [isOpen]);

  const handleDestinySelect = (destinyName: string) => {
    const destiny = availableDestinies.find((d) => d.name === destinyName);
    setSelectedDestiny(destiny);
    setPercentage(50);
  };

  const handleConfirm = () => {
    if (!selectedDestiny) return;
    onConfirm({
      destinyName: selectedDestiny.name,
      destinyType: selectedDestiny.type,
      resolvedAffix: previewAffix,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Install Destiny"
      maxWidth="md"
    >
      <ModalDescription>
        Select a destiny to install in this{" "}
        {ringSlot.startsWith("innerRing") ? "inner" : "mid"} ring slot.
      </ModalDescription>

      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-1">Destiny</label>
        <SearchableSelect
          value={selectedDestiny?.name}
          onChange={(name) => name && handleDestinySelect(name)}
          options={availableDestinies.map((destiny) => ({
            value: destiny.name,
            label: formatDestinyOption(destiny),
          }))}
          placeholder="<Select Destiny>"
          autoFocus={isOpen}
        />
      </div>

      {selectedDestiny && affixHasRanges && (
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

      {selectedDestiny && (
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
          disabled={!selectedDestiny}
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
