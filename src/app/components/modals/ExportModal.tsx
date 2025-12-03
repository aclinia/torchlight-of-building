"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalDescription,
  ModalActions,
  ModalButton,
} from "../ui/Modal";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildCode: string;
}

export const ExportModal = ({
  isOpen,
  onClose,
  buildCode,
}: ExportModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect -- reset state on modal open */
  useEffect(() => {
    if (isOpen) {
      setCopied(false);
    }
  }, [isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Loadout">
      <ModalDescription>
        Copy this build code to save or share your build:
      </ModalDescription>

      <div className="bg-zinc-950 p-3 rounded-lg mb-4 max-h-32 overflow-auto border border-zinc-800">
        <code className="text-sm text-amber-400 break-all font-mono">
          {buildCode}
        </code>
      </div>

      <ModalActions>
        <button
          onClick={handleCopy}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            copied
              ? "bg-green-500 text-white"
              : "bg-amber-500 hover:bg-amber-600 text-zinc-950"
          }`}
        >
          {copied ? "Copied!" : "Copy Build Code"}
        </button>
        <ModalButton onClick={onClose} variant="secondary">
          Close
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};
