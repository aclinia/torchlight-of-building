import { useEffect, useState } from "react";
import { ALL_BASE_GEAR } from "../../data/gear-base/all-base-gear";
import { Legendaries } from "../../data/legendary/legendaries";
import type { Gear } from "../../lib/save-data";
import { generateItemId } from "../../lib/storage";
import { EQUIPMENT_TYPES, type EquipmentType } from "../../tli/gear-data-types";
import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
} from "../ui/Modal";

interface ImportItemInput {
  name: string;
  equipmentType: string;
  equipmentSlot: string;
  affixes: string[];
}

const EQUIPMENT_TYPE_SET = new Set<string>(EQUIPMENT_TYPES);

const parseImportedItems = (
  json: string,
): { items: Gear[]; errors: string[] } => {
  const errors: string[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { items: [], errors: ["Invalid JSON"] };
  }

  const arr = Array.isArray(parsed) ? parsed : [parsed];

  const items: Gear[] = [];
  for (let i = 0; i < arr.length; i++) {
    const entry = arr[i] as ImportItemInput;

    if (typeof entry !== "object" || entry === null) {
      errors.push(`Item ${i + 1}: not an object`);
      continue;
    }

    if (typeof entry.equipmentType !== "string") {
      errors.push(
        `Item ${i + 1} (${entry.name ?? "unknown"}): missing equipmentType`,
      );
      continue;
    }

    if (!EQUIPMENT_TYPE_SET.has(entry.equipmentType)) {
      errors.push(
        `Item ${i + 1} (${entry.name ?? "unknown"}): unknown equipmentType "${entry.equipmentType}"`,
      );
      continue;
    }

    const equipmentType = entry.equipmentType as EquipmentType;
    const name = typeof entry.name === "string" ? entry.name : undefined;
    const affixes = Array.isArray(entry.affixes)
      ? entry.affixes.filter((a): a is string => typeof a === "string")
      : [];

    // Look up base stats from legendaries or base gear
    let baseStats: string | undefined;
    let baseGearName: string | undefined;
    let rarity: "legendary" | undefined;
    let legendaryName: string | undefined;

    if (name !== undefined) {
      const legendary = Legendaries.find((l) => l.name === name);
      if (legendary !== undefined) {
        baseStats =
          legendary.baseStat.length > 0 ? legendary.baseStat : undefined;
        baseGearName = legendary.baseItem;
        rarity = "legendary";
        legendaryName = name;
      } else {
        const baseGear = ALL_BASE_GEAR.find((g) => g.name === name);
        if (baseGear !== undefined) {
          baseStats = baseGear.stats.length > 0 ? baseGear.stats : undefined;
          baseGearName = name;
        }
      }
    }

    const item: Gear = {
      id: generateItemId(),
      equipmentType,
      ...(rarity !== undefined ? { rarity } : {}),
      ...(legendaryName !== undefined ? { legendaryName } : {}),
      ...(baseStats !== undefined ? { baseStats } : {}),
      ...(baseGearName !== undefined ? { baseGearName } : {}),
      ...(affixes.length > 0 ? { customAffixes: affixes } : {}),
    };

    items.push(item);
  }

  return { items, errors };
};

interface ImportItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (items: Gear[]) => void;
}

export const ImportItemsModal = ({
  isOpen,
  onClose,
  onImport,
}: ImportItemsModalProps): React.ReactNode => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | undefined>();

  const handleImport = (): void => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) {
      setError("Please paste item JSON");
      return;
    }

    const { items, errors } = parseImportedItems(trimmed);

    if (items.length === 0) {
      setError(errors.length > 0 ? errors.join("\n") : "No valid items found");
      return;
    }

    onImport(items);
    setInputValue("");
    setError(undefined);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setError(undefined);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Items">
      <ModalDescription>
        See the{" "}
        <a
          href="https://github.com/aclinia/torchlight-of-building/blob/main/docs/public/import-items.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 underline hover:text-amber-300"
        >
          user guide
        </a>{" "}
        for instructions on how to generate item descriptions from in-game
        screenshots.
      </ModalDescription>

      <textarea
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(undefined);
        }}
        placeholder={`[{\n  "name": "Ranger's Rusted Gauntlets",\n  "equipmentType": "STR Gloves",\n  "equipmentSlot": "Hands",\n  "affixes": ["+10 Strength"]\n}]`}
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
