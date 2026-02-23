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
    },
    [deleteItem],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-semibold text-zinc-50">
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

      <div className="space-y-6">
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-50">
            <Trans>Craft New Item</Trans>
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => openEditModal()}
              className="flex-1 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-zinc-950 transition-colors hover:bg-amber-600"
            >
              <Trans>Craft Item</Trans>
            </button>
            <button
              type="button"
              onClick={() => setIsLegendaryModalOpen(true)}
              className="flex-1 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-zinc-950 transition-colors hover:bg-amber-600"
            >
              <Trans>Craft Legendary</Trans>
            </button>
            <button
              type="button"
              onClick={() => setIsVoraxModalOpen(true)}
              className="flex-1 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-zinc-950 transition-colors hover:bg-amber-600"
            >
              <Trans>Craft Vorax</Trans>
            </button>
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 font-semibold text-zinc-200 transition-colors hover:bg-zinc-700"
            >
              Import Items
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-50">
            <Trans>Inventory</Trans> ({loadout.gearPage.inventory.length}{" "}
            <Trans>items</Trans>)
          </h2>
          {loadout.gearPage.inventory.length === 0 ? (
            <p className="py-4 text-center italic text-zinc-500">
              <Trans>
                No items in inventory. Craft items above to add them here.
              </Trans>
            </p>
          ) : (
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {loadout.gearPage.inventory.map((item) => (
                <InventoryItem
                  key={item.id}
                  item={item}
                  // biome-ignore lint/style/noNonNullAssertion: inventory items always have id
                  isEquipped={isItemEquipped(item.id!)}
                  onCopy={copyItem}
                  onEdit={openEditModal}
                  onDelete={handleDeleteItem}
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
