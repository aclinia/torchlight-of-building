"use client";

import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { SaveData } from "../../lib/save-data";
import type { SavesIndex } from "../../lib/saves";
import { createEmptySaveData } from "../../lib/storage";

export interface InternalBuilderState {
  saveData: SaveData;
  hasUnsavedChanges: boolean;
  currentSaveId: string | undefined;
  currentSaveName: string | undefined;
  savesIndex: SavesIndex;
}

const initialState: InternalBuilderState = {
  saveData: createEmptySaveData(),
  hasUnsavedChanges: false,
  currentSaveId: undefined,
  currentSaveName: undefined,
  savesIndex: { currentSaveId: undefined, saves: [] },
};

export const internalStore = create(
  immer(
    persist(
      combine(initialState, () => ({})),
      {
        name: "torchlight-builder-storage",
        partialize: (state) => ({
          saveData: state.saveData,
          currentSaveId: state.currentSaveId,
        }),
      },
    ),
  ),
);
