"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalDescription,
  ModalActions,
  ModalButton,
} from "../ui/Modal";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (buildCode: string) => boolean;
}

export const ImportModal = ({
  isOpen,
  onClose,
  onImport,
}: ImportModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | undefined>();

  const handleImport = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError("Please enter a build code");
      return;
    }

    const success = onImport(trimmed);
    if (success) {
      setInputValue("");
      setError(undefined);
      onClose();
    } else {
      setError("Invalid build code. Please check and try again.");
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect -- reset state on modal open */
  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError(undefined);
    }
  }, [isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Loadout">
      <ModalDescription>
        Paste a build code to load a saved build:
      </ModalDescription>

      <textarea
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(undefined);
        }}
        placeholder="Paste build code here..."
        className="w-full h-24 p-3 bg-zinc-800 text-zinc-50 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none font-mono text-sm placeholder:text-zinc-500"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleImport();
          }
        }}
      />

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      <ModalActions>
        <ModalButton onClick={handleImport} fullWidth>
          Import
        </ModalButton>
        <ModalButton onClick={onClose} variant="secondary">
          Cancel
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};
