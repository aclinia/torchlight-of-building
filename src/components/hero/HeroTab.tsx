import { useMemo } from "react";
import type {
  HeroMemorySlot,
  HeroMemory as SaveDataHeroMemory,
} from "@/src/lib/save-data";
import { useHeroUIStore } from "@/src/stores/heroUIStore";
import type { HeroMemory, HeroPage } from "@/src/tli/core";
import { EditMemoryModal } from "./EditMemoryModal";
import { HeroSelector } from "./HeroSelector";
import { MemoryInventory } from "./MemoryInventory";
import { TraitSelector } from "./TraitSelector";

interface HeroTabProps {
  heroPage: HeroPage;
  heroMemoryList: HeroMemory[];
  saveDataMemoryList: SaveDataHeroMemory[];
  onHeroChange: (hero: string | undefined) => void;
  onTraitSelect: (
    level: 45 | 60 | 75,
    group: "a" | "b",
    traitName: string | undefined,
  ) => void;
  onMemoryEquip: (slot: HeroMemorySlot, memoryId: string | undefined) => void;
  onMemorySave: (
    memoryId: string | undefined,
    memory: SaveDataHeroMemory,
  ) => void;
  onMemoryCopy: (memoryId: string) => void;
  onMemoryDelete: (id: string) => void;
}

export const HeroTab = ({
  heroPage,
  heroMemoryList,
  saveDataMemoryList,
  onHeroChange,
  onTraitSelect,
  onMemoryEquip,
  onMemorySave,
  onMemoryCopy,
  onMemoryDelete,
}: HeroTabProps) => {
  const editingMemoryId = useHeroUIStore((s) => s.editingMemoryId);

  // Find the SaveData version of the memory being edited
  const editingMemory = useMemo(
    () =>
      editingMemoryId !== undefined
        ? saveDataMemoryList.find((m) => m.id === editingMemoryId)
        : undefined,
    [editingMemoryId, saveDataMemoryList],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Hero Selection & Traits */}
      <div className="space-y-6">
        <HeroSelector
          selectedHero={heroPage.selectedHero}
          onHeroChange={onHeroChange}
        />
        <TraitSelector
          heroPage={heroPage}
          heroMemoryList={heroMemoryList}
          onTraitSelect={onTraitSelect}
          onMemoryEquip={onMemoryEquip}
        />
      </div>

      {/* Right Column: Memory Inventory */}
      <div className="space-y-6">
        <MemoryInventory
          heroPage={heroPage}
          heroMemoryList={heroMemoryList}
          onMemoryCopy={onMemoryCopy}
          onMemoryDelete={onMemoryDelete}
        />
      </div>

      <EditMemoryModal memory={editingMemory} onSave={onMemorySave} />
    </div>
  );
};
