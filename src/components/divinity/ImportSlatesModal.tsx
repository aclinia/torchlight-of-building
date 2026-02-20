import { useEffect, useState } from "react";
import type { DivinitySlate } from "../../lib/schemas/divinity.schema";
import { parseImportedSlates } from "../../lib/slate-import";
import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
} from "../ui/Modal";

interface ImportSlatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (slates: DivinitySlate[]) => void;
}

export const ImportSlatesModal = ({
  isOpen,
  onClose,
  onImport,
}: ImportSlatesModalProps): React.ReactNode => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [warning, setWarning] = useState<string | undefined>();

  const handleImport = (): void => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) {
      setError("Please paste slate JSON");
      return;
    }

    const { slates, errors } = parseImportedSlates(trimmed);

    if (slates.length === 0) {
      setError(errors.length > 0 ? errors.join("\n") : "No valid slates found");
      return;
    }

    onImport(slates);
    setInputValue("");
    setError(undefined);

    if (errors.length > 0) {
      setWarning(
        `Imported ${slates.length} slate(s). The following could not be imported:\n${errors.join("\n")}`,
      );
    } else {
      setWarning(undefined);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError(undefined);
      setWarning(undefined);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Divinity Slates">
      <ModalDescription>
        See the{" "}
        <a
          href="https://aclinia.github.io/torchlight-of-building/import-slates/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 underline hover:text-amber-300"
        >
          user guide
        </a>{" "}
        for instructions on how to generate slate data from in-game screenshots.
      </ModalDescription>

      <textarea
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(undefined);
        }}
        placeholder={`[{\n  "name": "Fallen Starlight",\n  "affixes": [\n    "+3% Max Life\\n+3% Max Energy Shield",\n    "+15% Critical Strike Rating"\n  ]\n}]`}
        className="h-48 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 p-3 font-mono text-sm text-zinc-50 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleImport();
          }
        }}
      />

      {error !== undefined && (
        <p className="mt-2 whitespace-pre-wrap text-sm text-red-500">{error}</p>
      )}

      {warning !== undefined && (
        <p className="mt-2 whitespace-pre-wrap text-sm text-amber-400">
          {warning}
        </p>
      )}

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
