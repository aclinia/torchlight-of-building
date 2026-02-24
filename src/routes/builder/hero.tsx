import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { HeroTab } from "../../components/hero/HeroTab";
import type { HeroMemory, HeroMemorySlot } from "../../lib/save-data";
import { useBuilderActions, useLoadout } from "../../stores/builderStore";
import { useSaveDataRaw } from "../../stores/builderStore/raw-access";

export const Route = createFileRoute("/builder/hero")({ component: HeroPage });

function HeroPage(): React.ReactNode {
  const loadout = useLoadout();
  const saveData = useSaveDataRaw("export");
  const {
    resetHeroPage,
    setTrait,
    equipHeroMemoryById,
    addHeroMemory,
    updateHeroMemory,
    copyHeroMemory,
    deleteHeroMemory,
  } = useBuilderActions();

  const handleMemorySave = useCallback(
    (memoryId: string | undefined, memory: HeroMemory): void => {
      if (memoryId === undefined) {
        addHeroMemory(memory);
      } else {
        updateHeroMemory(memoryId, memory);
      }
    },
    [addHeroMemory, updateHeroMemory],
  );

  return (
    <HeroTab
      heroPage={loadout.heroPage}
      heroMemoryList={loadout.heroPage.memoryInventory}
      saveDataMemoryList={saveData.heroPage.memoryInventory}
      onHeroChange={resetHeroPage}
      onTraitSelect={(
        level: 45 | 60 | 75,
        group: "a" | "b",
        traitName: string | undefined,
      ): void => {
        const key =
          group === "a"
            ? (`level${level}` as "level45" | "level60" | "level75")
            : (`level${level}b` as "level45b" | "level60b" | "level75b");
        setTrait(key, traitName);
      }}
      onMemoryEquip={(
        slot: HeroMemorySlot,
        memoryId: string | undefined,
      ): void => equipHeroMemoryById(slot, memoryId)}
      onMemorySave={handleMemorySave}
      onMemoryCopy={copyHeroMemory}
      onMemoryDelete={deleteHeroMemory}
    />
  );
}
