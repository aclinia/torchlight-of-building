import type { SaveData } from "./save-data";
import {
  generateSaveId,
  loadSavesIndex,
  type SaveMetadata,
  type SavesIndex,
  saveSaveData,
  saveSavesIndex,
} from "./saves";

export interface ImportResult {
  saveId: string;
  metadata: SaveMetadata;
}

/**
 * Imports decoded SaveData as a new save.
 * Creates a new save with "Imported Build" name and updates the saves index.
 * Returns the result with saveId and metadata, or undefined on failure.
 */
export const importBuild = (saveData: SaveData): ImportResult | undefined => {
  const now = Date.now();
  const newSaveId = generateSaveId();
  const newMetadata: SaveMetadata = {
    id: newSaveId,
    name: "Imported Build",
    createdAt: now,
    updatedAt: now,
  };

  const success = saveSaveData(newSaveId, saveData);
  if (!success) {
    return undefined;
  }

  const currentIndex = loadSavesIndex();
  const newIndex: SavesIndex = {
    currentSaveId: newSaveId,
    saves: [...currentIndex.saves, newMetadata],
  };
  saveSavesIndex(newIndex);

  return { saveId: newSaveId, metadata: newMetadata };
};
