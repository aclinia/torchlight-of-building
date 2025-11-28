"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (buildCode: string) => boolean;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError("Please enter a build code");
      return;
    }

    const success = onImport(trimmed);
    if (success) {
      setInputValue("");
      setError(null);
      onClose();
    } else {
      setError("Invalid build code. Please check and try again.");
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal Content */}
      <div
        className="relative bg-zinc-900 rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 border border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-zinc-50">
          Import Loadout
        </h2>

        <p className="text-sm text-zinc-400 mb-4">
          Paste a build code to load a saved build:
        </p>

        {/* Build Code Input */}
        <textarea
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(null);
          }}
          placeholder="Paste build code here..."
          className="w-full h-24 p-3 bg-zinc-800 text-zinc-50 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none font-mono text-sm placeholder:text-zinc-500"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleImport();
            }
          }}
        />

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleImport}
            className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg font-medium transition-colors"
          >
            Import
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
