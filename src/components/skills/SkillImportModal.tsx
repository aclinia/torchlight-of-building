import { useEffect, useState } from "react";
import type { SkillPage } from "@/src/lib/save-data";
import { type ImportedSkill, importSkills } from "@/src/lib/skill-import";
import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
} from "../ui/Modal";

interface SkillImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkillPage: SkillPage;
  onImport: (skillPage: SkillPage) => void;
}

export const SkillImportModal = ({
  isOpen,
  onClose,
  currentSkillPage,
  onImport,
}: SkillImportModalProps): React.ReactNode => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [warnings, setWarnings] = useState<string[]>([]);

  const handleImport = (): void => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) {
      setError("Please enter skill JSON");
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      setError("Invalid JSON. Please check your input.");
      return;
    }

    if (!Array.isArray(parsed)) {
      setError("Expected a JSON array of skill entries.");
      return;
    }

    const result = importSkills(parsed as ImportedSkill[], currentSkillPage);
    setWarnings(result.warnings);
    onImport(result.skillPage);
    setInputValue("");
    setError(undefined);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError(undefined);
      setWarnings([]);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Skills">
      <ModalDescription>
        See the{" "}
        <a
          href="https://github.com/aclinia/torchlight-of-building/blob/main/docs/public/import-skills.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 underline hover:text-amber-300"
        >
          user guide
        </a>{" "}
        for instructions on how to generate skill data from in-game screenshots.
      </ModalDescription>

      <textarea
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(undefined);
        }}
        placeholder={
          '[\n  { "skillType": "active", "slot": 1, "name": "Berserking Blade",\n    "supports": [{ "slot": 1, "name": "Activation Medium: Still Attack" }, ...] },\n  { "skillType": "passive", "slot": 1, "name": "Precise: Cruelty",\n    "supports": [{ "slot": 1, "name": "Aura Amplificat..." }] }\n]'
        }
        className="w-full h-32 p-3 bg-zinc-800 text-zinc-50 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none font-mono text-sm placeholder:text-zinc-500"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleImport();
          }
        }}
      />

      {error !== undefined && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      {warnings.length > 0 && (
        <div className="mt-2 space-y-1">
          {warnings.map((w) => (
            <p key={w} className="text-sm text-amber-400">
              {w}
            </p>
          ))}
        </div>
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
