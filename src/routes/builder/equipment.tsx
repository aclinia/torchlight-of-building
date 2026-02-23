import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { EditGearModal } from "../../components/equipment/EditGearModal";
import { EquipmentSlotDropdown } from "../../components/equipment/EquipmentSlotDropdown";
import { ImportItemsModal } from "../../components/equipment/ImportItemsModal";
import { InventoryItem } from "../../components/equipment/InventoryItem";
import { LegendaryGearModule } from "../../components/equipment/LegendaryGearModule";
import { VoraxGearModule } from "../../components/equipment/VoraxGearModule";
import { GEAR_SLOTS } from "../../lib/constants";
import { getCompatibleItems } from "../../lib/equipment-utils";
import type { Gear as SaveDataGear } from "../../lib/save-data";
import type { GearSlot } from "../../lib/types";
import { useBuilderActions, useLoadout } from "../../stores/builderStore";
import { useEquipmentUIStore } from "../../stores/equipmentUIStore";

export const Route = createFileRoute("/builder/equipment")({
  component: EquipmentPage,
});

function EquipmentPage(): React.ReactNode {
  // Parsed loadout (for reads)
  const loadout = useLoadout();
  const {
    addItemToInventory,
    copyItem,
    deleteItem,
    selectItemForSlot,
    isItemEquipped,
    updateItem,
  } = useBuilderActions();

  // Import items modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Vorax crafting modal state
  const [isVoraxModalOpen, setIsVoraxModalOpen] = useState(false);

  // Legendary crafting modal state
  const [isLegendaryModalOpen, setIsLegendaryModalOpen] = useState(false);

  // Selected inventory item
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    undefined,
  );

  const handleImportItems = useCallback(
    (items: SaveDataGear[]) => {
      for (const item of items) {
        addItemToInventory(item);
      }
    },
    [addItemToInventory],
  );

  // Edit modal state
  const isEditModalOpen = useEquipmentUIStore((state) => state.isEditModalOpen);
  const editModalItemId = useEquipmentUIStore((state) => state.editModalItemId);
  const openEditModal = useEquipmentUIStore((state) => state.openEditModal);
  const closeEditModal = useEquipmentUIStore((state) => state.closeEditModal);

  const editingItem = useMemo(
    () =>
      editModalItemId !== undefined
        ? loadout.gearPage.inventory.find((i) => i.id === editModalItemId)
        : undefined,
    [editModalItemId, loadout.gearPage.inventory],
  );

  // Handler for gear modal save - handles both create and edit
  const handleGearModalSave = useCallback(
    (itemId: string | undefined, item: SaveDataGear) => {
      if (itemId === undefined) {
        addItemToInventory(item);
      } else {
        updateItem(itemId, item);
      }
    },
    [addItemToInventory, updateItem],
  );

  const handleSelectItemForSlot = useCallback(
    (slot: GearSlot, itemId: string | null) => {
      selectItemForSlot(slot, itemId ?? undefined);
    },
    [selectItemForSlot],
  );

  const handleDeleteItem = useCallback(
    (itemId: string) => {
      deleteItem(itemId);
      if (selectedItemId === itemId) {
        setSelectedItemId(undefined);
      }
    },
    [deleteItem, selectedItemId],
  );

  const handleSelectItem = useCallback((itemId: string) => {
    setSelectedItemId((prev) => (prev === itemId ? undefined : itemId));
  }, []);

  const selectedItem = useMemo(
    () =>
      selectedItemId !== undefined
        ? loadout.gearPage.inventory.find((i) => i.id === selectedItemId)
        : undefined,
    [selectedItemId, loadout.gearPage.inventory],
  );

  // Clear selection if the selected item no longer exists
  const effectiveSelectedId =
    selectedItem !== undefined ? selectedItemId : undefined;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <h2 className="mb-2 text-base font-semibold text-zinc-50">
          <Trans>Equipment Slots</Trans>
        </h2>
        <div className="space-y-1">
          {GEAR_SLOTS.map(({ key, label }) => (
            <EquipmentSlotDropdown
              key={key}
              slot={key}
              label={i18n._(label)}
              selectedItemId={loadout.gearPage.equippedGear[key]?.id ?? null}
              compatibleItems={getCompatibleItems(
                loadout.gearPage.inventory,
                key,
              )}
              onSelectItem={handleSelectItemForSlot}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <h2 className="mb-2 text-base font-semibold text-zinc-50">
            <Trans>Craft New Item</Trans>
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => openEditModal()}
              className="flex-1 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-600"
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setIsLegendaryModalOpen(true)}
              className="flex-1 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-600"
            >
              Legendary
            </button>
            <button
              type="button"
              onClick={() => setIsVoraxModalOpen(true)}
              className="flex-1 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-600"
            >
              Vorax
            </button>
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
            >
              Import
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-50">
              <Trans>Inventory</Trans> ({loadout.gearPage.inventory.length}{" "}
              <Trans>items</Trans>)
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={
                  effectiveSelectedId === undefined ||
                  selectedItem?.rarity === "legendary"
                }
                onClick={() => {
                  if (effectiveSelectedId !== undefined) {
                    openEditModal(effectiveSelectedId);
                  }
                }}
                className="rounded bg-zinc-600 px-2 py-1 text-xs text-zinc-50 transition-colors hover:bg-zinc-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={effectiveSelectedId === undefined}
                onClick={() => {
                  if (effectiveSelectedId !== undefined) {
                    copyItem(effectiveSelectedId);
                  }
                }}
                className="rounded bg-amber-500 px-2 py-1 text-xs text-zinc-950 transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Copy
              </button>
              <button
                type="button"
                disabled={effectiveSelectedId === undefined}
                onClick={() => {
                  if (effectiveSelectedId !== undefined) {
                    handleDeleteItem(effectiveSelectedId);
                  }
                }}
                className="rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete
              </button>
            </div>
          </div>
          {loadout.gearPage.inventory.length === 0 ? (
            <p className="py-4 text-center italic text-zinc-500">
              <Trans>
                No items in inventory. Craft items above to add them here.
              </Trans>
            </p>
          ) : (
            <div className="max-h-96 space-y-1 overflow-y-auto">
              {loadout.gearPage.inventory.map((item) => (
                <InventoryItem
                  key={item.id}
                  item={item}
                  // biome-ignore lint/style/noNonNullAssertion: inventory items always have id
                  isEquipped={isItemEquipped(item.id!)}
                  // biome-ignore lint/style/noNonNullAssertion: inventory items always have id
                  isSelected={effectiveSelectedId === item.id!}
                  onSelect={handleSelectItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <EditGearModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        item={editingItem}
        onSave={handleGearModalSave}
      />

      <ImportItemsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportItems}
      />

      <LegendaryGearModule
        isOpen={isLegendaryModalOpen}
        onClose={() => setIsLegendaryModalOpen(false)}
        onSaveToInventory={addItemToInventory}
      />

      <VoraxGearModule
        isOpen={isVoraxModalOpen}
        onClose={() => setIsVoraxModalOpen(false)}
        onSaveToInventory={addItemToInventory}
      />
    </div>
  );
}
