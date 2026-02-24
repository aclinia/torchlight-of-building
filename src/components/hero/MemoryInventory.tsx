import { useHeroUIStore } from "@/src/stores/heroUIStore";
import type { HeroMemory, HeroPage } from "@/src/tli/core";
import { HeroMemoryItem } from "./HeroMemoryItem";

interface MemoryInventoryProps {
  heroPage: HeroPage;
  heroMemoryList: HeroMemory[];
  onMemoryCopy: (memoryId: string) => void;
  onMemoryDelete: (id: string) => void;
}

export const MemoryInventory = ({
  heroPage,
  heroMemoryList,
  onMemoryCopy,
  onMemoryDelete,
}: MemoryInventoryProps) => {
  const openModal = useHeroUIStore((s) => s.openMemoryModal);

  const isMemoryEquipped = (memoryId: string): boolean => {
    return (
      heroPage.memorySlots.slot45?.id === memoryId ||
      heroPage.memorySlots.slot60?.id === memoryId ||
      heroPage.memorySlots.slot75?.id === memoryId
    );
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-zinc-50">
          Memory Inventory ({heroMemoryList.length} items)
        </h2>
        <button
          type="button"
          onClick={() => openModal()}
          className="px-3 py-1.5 bg-amber-500 text-zinc-950 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
        >
          Craft Memory
        </button>
      </div>
      {heroMemoryList.length === 0 ? (
        <p className="text-zinc-500 italic text-center py-4">
          No memories in inventory. Click "Craft Memory" to add one.
        </p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {heroMemoryList.map((memory) => (
            <HeroMemoryItem
              key={memory.id}
              memory={memory}
              isEquipped={isMemoryEquipped(memory.id)}
              onEdit={(memoryId) => openModal(memoryId)}
              onCopy={onMemoryCopy}
              onDelete={onMemoryDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
