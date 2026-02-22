import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type FilterAffixType,
  getBaseGear,
  getFilteredAffixes,
  isGroupableAffixType,
} from "@/src/lib/affix-utils";
import {
  formatBlendAffix,
  formatBlendOption,
  formatBlendPreview,
  getBlendAffixes,
} from "@/src/lib/blend-utils";
import {
  DEFAULT_QUALITY,
  SLOT_TO_VALID_EQUIPMENT_TYPES,
} from "@/src/lib/constants";
import type { Gear as SaveDataGear } from "@/src/lib/save-data";
import { generateItemId } from "@/src/lib/storage";
import type { AffixSlotState } from "@/src/lib/types";
import { type Gear, getAffixText } from "@/src/tli/core";
import { craft } from "@/src/tli/crafting/craft";
import type {
  BaseGear,
  BaseGearAffix,
  EquipmentType,
} from "@/src/tli/gear-data-types";
import { Modal, ModalActions, ModalButton } from "../ui/Modal";
import { SearchableSelect } from "../ui/SearchableSelect";
import { AffixSlotComponent } from "./AffixSlotComponent";
import { ExistingAffixDisplay } from "./ExistingAffixDisplay";
import { GroupedAffixSlotComponent } from "./GroupedAffixSlotComponent";

interface EditableAffixSlot {
  type: "existing" | "new";
  value: string | undefined;
  affixIndex: number | undefined;
  percentage: number;
}

const createExistingSlot = (value: string): EditableAffixSlot => ({
  type: "existing",
  value,
  affixIndex: undefined,
  percentage: DEFAULT_QUALITY,
});

const createNewSlot = (): EditableAffixSlot => ({
  type: "new",
  value: undefined,
  affixIndex: undefined,
  percentage: DEFAULT_QUALITY,
});

// Helper to get display label from BaseStats
const getBaseStatsLabel = (
  baseStats: NonNullable<Gear["baseStats"]>,
): string => {
  if (baseStats.name !== undefined) return baseStats.name;
  return baseStats.baseStatLines.map((l) => l.text).join("\n");
};

interface EditGearModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Gear | undefined; // undefined = creation mode
  onSave: (itemId: string | undefined, updatedItem: SaveDataGear) => void;
}

export const EditGearModal = ({
  isOpen,
  onClose,
  item,
  onSave,
}: EditGearModalProps): React.ReactElement | null => {
  // Local state for editable affixes
  const [customAffixText, setCustomAffixText] = useState("");
  const [baseStats, setBaseStats] = useState<EditableAffixSlot>(
    createNewSlot(),
  );
  const [baseAffixes, setBaseAffixes] = useState<EditableAffixSlot[]>([]);
  const [sweetDreamAffix, setSweetDreamAffix] = useState<EditableAffixSlot>(
    createNewSlot(),
  );
  const [towerSequenceAffix, setTowerSequenceAffix] =
    useState<EditableAffixSlot>(createNewSlot());
  const [blendAffix, setBlendAffix] = useState<EditableAffixSlot>(
    createNewSlot(),
  );
  const [prefixes, setPrefixes] = useState<EditableAffixSlot[]>([]);
  const [suffixes, setSuffixes] = useState<EditableAffixSlot[]>([]);

  // Equipment type state for creation mode
  const [selectedEquipmentType, setSelectedEquipmentType] = useState<
    EquipmentType | undefined
  >(undefined);

  // Derive mode and equipment type
  const mode = item === undefined ? "create" : "edit";
  const equipmentType = item?.equipmentType ?? selectedEquipmentType;

  const prefixAffixes = useMemo(
    () => (equipmentType ? getFilteredAffixes(equipmentType, "Prefix") : []),
    [equipmentType],
  );

  const suffixAffixes = useMemo(
    () => (equipmentType ? getFilteredAffixes(equipmentType, "Suffix") : []),
    [equipmentType],
  );

  const baseGearOptions = useMemo(
    () => (equipmentType ? getBaseGear(equipmentType) : []),
    [equipmentType],
  );

  const baseAffixOptions = useMemo(
    () =>
      equipmentType ? getFilteredAffixes(equipmentType, "Base Affix") : [],
    [equipmentType],
  );

  const sweetDreamAffixes = useMemo(
    () =>
      equipmentType
        ? getFilteredAffixes(equipmentType, "Sweet Dream Affix")
        : [],
    [equipmentType],
  );

  const towerSequenceAffixes = useMemo(
    () =>
      equipmentType ? getFilteredAffixes(equipmentType, "Tower Sequence") : [],
    [equipmentType],
  );

  const blendAffixes = useMemo(
    () => (equipmentType === "Belt" ? getBlendAffixes() : []),
    [equipmentType],
  );

  const isBelt = equipmentType === "Belt";

  // Initialize state from item when modal opens
  useEffect(() => {
    if (isOpen) {
      if (item !== undefined) {
        // Edit mode: initialize from existing item
        // Custom affixes
        if (item.customAffixes !== undefined) {
          setCustomAffixText(
            item.customAffixes.map((a) => getAffixText(a)).join("\n"),
          );
        } else {
          setCustomAffixText("");
        }
        // Base Stats
        if (item.baseStats !== undefined) {
          setBaseStats(createExistingSlot(getBaseStatsLabel(item.baseStats)));
        } else {
          setBaseStats(createNewSlot());
        }

        // Base Affixes (2 max)
        const initialBaseAffixes: EditableAffixSlot[] = [];
        if (item.baseAffixes !== undefined) {
          for (const affix of item.baseAffixes) {
            initialBaseAffixes.push(createExistingSlot(getAffixText(affix)));
          }
        }
        // Pad to 2 slots
        while (initialBaseAffixes.length < 2) {
          initialBaseAffixes.push(createNewSlot());
        }
        setBaseAffixes(initialBaseAffixes);

        // Sweet Dream Affix
        if (item.sweetDreamAffix !== undefined) {
          setSweetDreamAffix(
            createExistingSlot(getAffixText(item.sweetDreamAffix)),
          );
        } else {
          setSweetDreamAffix(createNewSlot());
        }

        // Tower Sequence Affix
        if (item.towerSequenceAffix !== undefined) {
          setTowerSequenceAffix(
            createExistingSlot(getAffixText(item.towerSequenceAffix)),
          );
        } else {
          setTowerSequenceAffix(createNewSlot());
        }

        // Blend Affix (belt only)
        if (item.blendAffix !== undefined) {
          setBlendAffix(createExistingSlot(getAffixText(item.blendAffix)));
        } else {
          setBlendAffix(createNewSlot());
        }

        // Prefixes (3 max)
        const initialPrefixes: EditableAffixSlot[] = [];
        if (item.prefixes !== undefined) {
          for (const affix of item.prefixes) {
            initialPrefixes.push(createExistingSlot(getAffixText(affix)));
          }
        }
        while (initialPrefixes.length < 3) {
          initialPrefixes.push(createNewSlot());
        }
        setPrefixes(initialPrefixes);

        // Suffixes (3 max)
        const initialSuffixes: EditableAffixSlot[] = [];
        if (item.suffixes !== undefined) {
          for (const affix of item.suffixes) {
            initialSuffixes.push(createExistingSlot(getAffixText(affix)));
          }
        }
        while (initialSuffixes.length < 3) {
          initialSuffixes.push(createNewSlot());
        }
        setSuffixes(initialSuffixes);
      } else {
        // Creation mode: reset everything
        setCustomAffixText("");
        setSelectedEquipmentType(undefined);
        setBaseStats(createNewSlot());
        setBaseAffixes([createNewSlot(), createNewSlot()]);
        setSweetDreamAffix(createNewSlot());
        setTowerSequenceAffix(createNewSlot());
        setBlendAffix(createNewSlot());
        setPrefixes([createNewSlot(), createNewSlot(), createNewSlot()]);
        setSuffixes([createNewSlot(), createNewSlot(), createNewSlot()]);
      }
    }
  }, [isOpen, item]);

  // Handlers for deleting existing affixes
  const handleDeleteBaseStats = useCallback(() => {
    setBaseStats(createNewSlot());
  }, []);

  const handleDeleteBaseAffix = useCallback((index: number) => {
    setBaseAffixes((prev) => {
      // Remove the slot and shift remaining up, add empty slot at end
      const updated = [...prev];
      updated.splice(index, 1);
      updated.push(createNewSlot());
      return updated;
    });
  }, []);

  const handleDeleteSweetDream = useCallback(() => {
    setSweetDreamAffix(createNewSlot());
  }, []);

  const handleDeleteTowerSequence = useCallback(() => {
    setTowerSequenceAffix(createNewSlot());
  }, []);

  const handleDeleteBlend = useCallback(() => {
    setBlendAffix(createNewSlot());
  }, []);

  const handleDeletePrefix = useCallback((index: number) => {
    setPrefixes((prev) => {
      // Remove the slot and shift remaining up, add empty slot at end
      const updated = [...prev];
      updated.splice(index, 1);
      updated.push(createNewSlot());
      return updated;
    });
  }, []);

  const handleDeleteSuffix = useCallback((index: number) => {
    setSuffixes((prev) => {
      // Remove the slot and shift remaining up, add empty slot at end
      const updated = [...prev];
      updated.splice(index, 1);
      updated.push(createNewSlot());
      return updated;
    });
  }, []);

  // Handlers for selecting new affixes
  const handleBaseStatsSelect = useCallback((_: number, value: string) => {
    const affixIndex = value === "" ? undefined : parseInt(value, 10);
    setBaseStats((prev) => ({ ...prev, type: "new", affixIndex }));
  }, []);

  const handleBaseAffixSelect = useCallback(
    (slotIndex: number, value: string) => {
      const affixIndex = value === "" ? undefined : parseInt(value, 10);
      setBaseAffixes((prev) => {
        const updated = [...prev];
        updated[slotIndex] = { ...updated[slotIndex], type: "new", affixIndex };
        return updated;
      });
    },
    [],
  );

  const handleBaseAffixSliderChange = useCallback(
    (slotIndex: number, value: string) => {
      const percentage = parseInt(value, 10);
      setBaseAffixes((prev) => {
        const updated = [...prev];
        updated[slotIndex] = { ...updated[slotIndex], percentage };
        return updated;
      });
    },
    [],
  );

  const handleClearBaseAffix = useCallback((slotIndex: number) => {
    setBaseAffixes((prev) => {
      // Remove the slot and shift remaining up, add empty slot at end
      const updated = [...prev];
      updated.splice(slotIndex, 1);
      updated.push(createNewSlot());
      return updated;
    });
  }, []);

  const handleSweetDreamSelect = useCallback((_: number, value: string) => {
    const affixIndex = value === "" ? undefined : parseInt(value, 10);
    setSweetDreamAffix((prev) => ({ ...prev, type: "new", affixIndex }));
  }, []);

  const handleSweetDreamSliderChange = useCallback(
    (_: number, value: string) => {
      const percentage = parseInt(value, 10);
      setSweetDreamAffix((prev) => ({ ...prev, percentage }));
    },
    [],
  );

  const handleClearSweetDream = useCallback(() => {
    setSweetDreamAffix(createNewSlot());
  }, []);

  const handleTowerSequenceSelect = useCallback((_: number, value: string) => {
    const affixIndex = value === "" ? undefined : parseInt(value, 10);
    setTowerSequenceAffix((prev) => ({ ...prev, type: "new", affixIndex }));
  }, []);

  const handleClearTowerSequence = useCallback(() => {
    setTowerSequenceAffix(createNewSlot());
  }, []);

  const handleBlendSelect = useCallback((_: number, value: string) => {
    const affixIndex = value === "" ? undefined : parseInt(value, 10);
    setBlendAffix((prev) => ({ ...prev, type: "new", affixIndex }));
  }, []);

  const handleClearBlend = useCallback(() => {
    setBlendAffix(createNewSlot());
  }, []);

  const handlePrefixSelect = useCallback((slotIndex: number, value: string) => {
    const affixIndex = value === "" ? undefined : parseInt(value, 10);
    setPrefixes((prev) => {
      const updated = [...prev];
      updated[slotIndex] = { ...updated[slotIndex], type: "new", affixIndex };
      return updated;
    });
  }, []);

  const handlePrefixSliderChange = useCallback(
    (slotIndex: number, value: string) => {
      const percentage = parseInt(value, 10);
      setPrefixes((prev) => {
        const updated = [...prev];
        updated[slotIndex] = { ...updated[slotIndex], percentage };
        return updated;
      });
    },
    [],
  );

  const handleClearPrefix = useCallback((slotIndex: number) => {
    setPrefixes((prev) => {
      // Remove the slot and shift remaining up, add empty slot at end
      const updated = [...prev];
      updated.splice(slotIndex, 1);
      updated.push(createNewSlot());
      return updated;
    });
  }, []);

  const handleSuffixSelect = useCallback((slotIndex: number, value: string) => {
    const affixIndex = value === "" ? undefined : parseInt(value, 10);
    setSuffixes((prev) => {
      const updated = [...prev];
      updated[slotIndex] = { ...updated[slotIndex], type: "new", affixIndex };
      return updated;
    });
  }, []);

  const handleSuffixSliderChange = useCallback(
    (slotIndex: number, value: string) => {
      const percentage = parseInt(value, 10);
      setSuffixes((prev) => {
        const updated = [...prev];
        updated[slotIndex] = { ...updated[slotIndex], percentage };
        return updated;
      });
    },
    [],
  );

  const handleClearSuffix = useCallback((slotIndex: number) => {
    setSuffixes((prev) => {
      // Remove the slot and shift remaining up, add empty slot at end
      const updated = [...prev];
      updated.splice(slotIndex, 1);
      updated.push(createNewSlot());
      return updated;
    });
  }, []);

  // Build and save the item
  const handleSave = useCallback(() => {
    // Guard: need equipment type for both modes
    if (equipmentType === undefined) return;

    // Build base stats
    let newBaseStats: string | undefined;
    let newBaseGearName: string | undefined;
    if (baseStats.type === "existing" && baseStats.value !== undefined) {
      // Find matching base gear by name to get the stats text
      const matchingGear = baseGearOptions.find(
        (g) => g.name === baseStats.value,
      );
      if (matchingGear !== undefined) {
        newBaseStats = matchingGear.stats;
        newBaseGearName = matchingGear.name;
      }
    } else if (baseStats.type === "new" && baseStats.affixIndex !== undefined) {
      const selected = baseGearOptions[baseStats.affixIndex];
      newBaseStats = selected.stats;
      newBaseGearName = selected.name;
    }

    // Build base affixes
    const newBaseAffixes: string[] = [];
    for (const slot of baseAffixes) {
      if (slot.type === "existing" && slot.value !== undefined) {
        newBaseAffixes.push(slot.value);
      } else if (slot.type === "new" && slot.affixIndex !== undefined) {
        newBaseAffixes.push(
          craft(baseAffixOptions[slot.affixIndex], slot.percentage),
        );
      }
    }

    // Build sweet dream affix
    let newSweetDreamAffix: string | undefined;
    if (
      sweetDreamAffix.type === "existing" &&
      sweetDreamAffix.value !== undefined
    ) {
      newSweetDreamAffix = sweetDreamAffix.value;
    } else if (
      sweetDreamAffix.type === "new" &&
      sweetDreamAffix.affixIndex !== undefined
    ) {
      newSweetDreamAffix = craft(
        sweetDreamAffixes[sweetDreamAffix.affixIndex],
        sweetDreamAffix.percentage,
      );
    }

    // Build tower sequence affix
    let newTowerSequenceAffix: string | undefined;
    if (
      towerSequenceAffix.type === "existing" &&
      towerSequenceAffix.value !== undefined
    ) {
      newTowerSequenceAffix = towerSequenceAffix.value;
    } else if (
      towerSequenceAffix.type === "new" &&
      towerSequenceAffix.affixIndex !== undefined
    ) {
      newTowerSequenceAffix =
        towerSequenceAffixes[towerSequenceAffix.affixIndex].craftableAffix;
    }

    // Build blend affix (belt only)
    let newBlendAffix: string | undefined;
    if (isBelt) {
      if (blendAffix.type === "existing" && blendAffix.value !== undefined) {
        newBlendAffix = blendAffix.value;
      } else if (
        blendAffix.type === "new" &&
        blendAffix.affixIndex !== undefined
      ) {
        newBlendAffix = formatBlendAffix(blendAffixes[blendAffix.affixIndex]);
      }
    }

    // Build prefixes
    const newPrefixes: string[] = [];
    for (const slot of prefixes) {
      if (slot.type === "existing" && slot.value !== undefined) {
        newPrefixes.push(slot.value);
      } else if (slot.type === "new" && slot.affixIndex !== undefined) {
        newPrefixes.push(
          craft(prefixAffixes[slot.affixIndex], slot.percentage),
        );
      }
    }

    // Build suffixes
    const newSuffixes: string[] = [];
    for (const slot of suffixes) {
      if (slot.type === "existing" && slot.value !== undefined) {
        newSuffixes.push(slot.value);
      } else if (slot.type === "new" && slot.affixIndex !== undefined) {
        newSuffixes.push(
          craft(suffixAffixes[slot.affixIndex], slot.percentage),
        );
      }
    }

    // Parse custom affixes from textarea
    const customAffixes = customAffixText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    if (mode === "create") {
      // Creation mode: generate new ID
      const newItem: SaveDataGear = {
        id: generateItemId(),
        equipmentType,
        baseStats: newBaseStats,
        baseGearName: newBaseGearName,
        baseAffixes: newBaseAffixes.length > 0 ? newBaseAffixes : undefined,
        sweetDreamAffix: newSweetDreamAffix,
        towerSequenceAffix: newTowerSequenceAffix,
        blendAffix: newBlendAffix,
        prefixes: newPrefixes.length > 0 ? newPrefixes : undefined,
        suffixes: newSuffixes.length > 0 ? newSuffixes : undefined,
        customAffixes: customAffixes.length > 0 ? customAffixes : undefined,
      };
      onSave(undefined, newItem);
    } else if (item !== undefined && item.id !== undefined) {
      // Edit mode: preserve existing item properties
      const updatedItem: SaveDataGear = {
        id: item.id,
        equipmentType,
        rarity: item.rarity === "rare" ? undefined : item.rarity,
        legendaryName: item.legendaryName,
        baseStats: newBaseStats,
        baseGearName: newBaseGearName,
        baseAffixes: newBaseAffixes.length > 0 ? newBaseAffixes : undefined,
        sweetDreamAffix: newSweetDreamAffix,
        towerSequenceAffix: newTowerSequenceAffix,
        blendAffix: newBlendAffix,
        prefixes: newPrefixes.length > 0 ? newPrefixes : undefined,
        suffixes: newSuffixes.length > 0 ? newSuffixes : undefined,
        customAffixes: customAffixes.length > 0 ? customAffixes : undefined,
      };
      onSave(item.id, updatedItem);
    }
    onClose();
  }, [
    mode,
    item,
    equipmentType,
    customAffixText,
    baseStats,
    baseGearOptions,
    baseAffixes,
    baseAffixOptions,
    sweetDreamAffix,
    sweetDreamAffixes,
    towerSequenceAffix,
    towerSequenceAffixes,
    blendAffix,
    blendAffixes,
    isBelt,
    prefixes,
    prefixAffixes,
    suffixes,
    suffixAffixes,
    onSave,
    onClose,
  ]);

  const toAffixSlotStates = (slots: EditableAffixSlot[]): AffixSlotState[] => {
    return slots.map((slot) => ({
      affixIndex: slot.affixIndex,
      percentage: slot.percentage,
    }));
  };

  // Equipment type options for creation mode
  const allEquipmentTypes = useMemo(() => {
    const types = new Set<EquipmentType>();
    for (const slotTypes of Object.values(SLOT_TO_VALID_EQUIPMENT_TYPES)) {
      for (const type of slotTypes) {
        types.add(type);
      }
    }
    return Array.from(types).sort();
  }, []);

  const equipmentTypeOptions = useMemo(
    () =>
      allEquipmentTypes
        .filter((type) => type !== "Vorax Gear")
        .map((type) => ({ value: type, label: i18n._(type) })),
    [allEquipmentTypes],
  );

  const handleEquipmentTypeChange = useCallback(
    (value: EquipmentType | undefined) => {
      setSelectedEquipmentType(value);
    },
    [],
  );

  const renderAffixSlot = (
    slot: EditableAffixSlot,
    slotIndex: number,
    affixType: FilterAffixType,
    affixes: BaseGearAffix[],
    onSelect: (slotIndex: number, value: string) => void,
    onSliderChange: (slotIndex: number, value: string) => void,
    onClear: (slotIndex: number) => void,
    onDeleteExisting: () => void,
    options?: {
      hideQualitySlider?: boolean;
      formatOption?: (affix: BaseGearAffix) => string;
      formatCraftedText?: (affix: BaseGearAffix) => string;
      allSlotStates?: AffixSlotState[];
    },
  ): React.ReactElement => {
    if (slot.type === "existing" && slot.value !== undefined) {
      return (
        <ExistingAffixDisplay
          key={slotIndex}
          value={slot.value}
          onDelete={onDeleteExisting}
        />
      );
    }

    // Use GroupedAffixSlotComponent for Prefix, Suffix, Base Affix
    if (isGroupableAffixType(affixType)) {
      return (
        <GroupedAffixSlotComponent
          key={slotIndex}
          slotIndex={slotIndex}
          affixType={affixType}
          affixes={affixes}
          selection={{
            affixIndex: slot.affixIndex,
            percentage: slot.percentage,
          }}
          onAffixSelect={onSelect}
          onSliderChange={onSliderChange}
          onClear={onClear}
          hideTierInfo={false}
          formatCraftedText={options?.formatCraftedText}
          allSlotStates={options?.allSlotStates}
        />
      );
    }

    // Use AffixSlotComponent for Base Stats, Sweet Dream, Tower Sequence, Blend
    return (
      <AffixSlotComponent
        key={slotIndex}
        slotIndex={slotIndex}
        affixType={affixType}
        affixes={affixes}
        selection={{ affixIndex: slot.affixIndex, percentage: slot.percentage }}
        onAffixSelect={onSelect}
        onSliderChange={onSliderChange}
        onClear={onClear}
        hideQualitySlider={options?.hideQualitySlider}
        hideTierInfo={true}
        formatOption={options?.formatOption}
        formatCraftedText={options?.formatCraftedText}
      />
    );
  };

  const modalTitle =
    mode === "create"
      ? i18n._("Craft New Item")
      : i18n._("Edit {equipmentType}", { equipmentType });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="xl"
      dismissible={false}
    >
      <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-2">
        {/* Equipment Type Selector (creation mode only) */}
        {mode === "create" && (
          <div>
            <label
              htmlFor="equipment-type-select"
              className="mb-2 block text-sm font-medium text-zinc-50"
            >
              <Trans>Equipment Type</Trans>
            </label>
            <SearchableSelect
              value={selectedEquipmentType}
              onChange={handleEquipmentTypeChange}
              options={equipmentTypeOptions}
              placeholder={i18n._("Select equipment type...")}
            />
          </div>
        )}

        {/* Affix sections - only show when equipment type is selected */}
        {equipmentType !== undefined && (
          <>
            {/* Base Stats Section */}
            {baseGearOptions.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                  <Trans>Base Stats (1 max)</Trans>
                </h3>
                {baseStats.type === "existing" &&
                baseStats.value !== undefined ? (
                  <ExistingAffixDisplay
                    value={baseStats.value}
                    onDelete={handleDeleteBaseStats}
                  />
                ) : (
                  <div className="rounded-lg bg-zinc-800 p-4">
                    <SearchableSelect
                      value={baseStats.affixIndex ?? undefined}
                      onChange={(value) =>
                        handleBaseStatsSelect(0, value?.toString() ?? "")
                      }
                      options={baseGearOptions.map(
                        (gear: BaseGear, idx: number) => ({
                          value: idx,
                          label: `${gear.name} — ${gear.stats.replace(/\n/g, "/")}`,
                        }),
                      )}
                      placeholder={`<Select Base Stats>`}
                    />
                    {baseStats.affixIndex !== undefined &&
                      baseGearOptions[baseStats.affixIndex] !== undefined && (
                        <div className="mt-3 space-y-1">
                          <p className="text-sm font-medium text-amber-400">
                            {baseGearOptions[baseStats.affixIndex].name}
                          </p>
                          <p className="whitespace-pre-wrap text-sm text-zinc-300">
                            {baseGearOptions[baseStats.affixIndex].stats}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleDeleteBaseStats()}
                            className="mt-2 text-xs text-zinc-500 hover:text-red-400"
                          >
                            <Trans>Clear</Trans>
                          </button>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Base Affixes Section */}
            {baseAffixOptions.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                  <Trans>Base Affixes (2 max)</Trans>
                </h3>
                <div className="space-y-4">
                  {baseAffixes.map((slot, index) =>
                    renderAffixSlot(
                      slot,
                      index,
                      "Base Affix",
                      baseAffixOptions,
                      handleBaseAffixSelect,
                      handleBaseAffixSliderChange,
                      handleClearBaseAffix,
                      () => handleDeleteBaseAffix(index),
                      { allSlotStates: toAffixSlotStates(baseAffixes) },
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Sweet Dream Affix Section */}
            {sweetDreamAffixes.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                  <Trans>Sweet Dream Affix (1 max)</Trans>
                </h3>
                {renderAffixSlot(
                  sweetDreamAffix,
                  0,
                  "Sweet Dream Affix",
                  sweetDreamAffixes,
                  handleSweetDreamSelect,
                  handleSweetDreamSliderChange,
                  handleClearSweetDream,
                  handleDeleteSweetDream,
                  {},
                )}
              </div>
            )}

            {/* Tower Sequence Affix Section */}
            {towerSequenceAffixes.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                  <Trans>Tower Sequence (1 max)</Trans>
                </h3>
                {renderAffixSlot(
                  towerSequenceAffix,
                  0,
                  "Tower Sequence",
                  towerSequenceAffixes,
                  handleTowerSequenceSelect,
                  () => {},
                  handleClearTowerSequence,
                  handleDeleteTowerSequence,
                  { hideQualitySlider: true },
                )}
              </div>
            )}

            {/* Blending Affix Section (Belts Only) */}
            {isBelt && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                  <Trans>Blending (1 max)</Trans>
                </h3>
                {renderAffixSlot(
                  blendAffix,
                  0,
                  "Blend",
                  blendAffixes.map((blend) => ({
                    craftableAffix: blend.affix,
                    tier: "0",
                    equipmentSlot: "Trinket",
                    equipmentType: "Belt",
                    affixType: "Prefix",
                    craftingPool: "",
                  })) as BaseGearAffix[],
                  handleBlendSelect,
                  () => {},
                  handleClearBlend,
                  handleDeleteBlend,
                  {
                    hideQualitySlider: true,
                    formatOption: (affix) => {
                      const blend = blendAffixes.find(
                        (b) => b.affix === affix.craftableAffix,
                      );
                      return blend
                        ? formatBlendOption(blend)
                        : affix.craftableAffix;
                    },
                    formatCraftedText: (affix) => {
                      const blend = blendAffixes.find(
                        (b) => b.affix === affix.craftableAffix,
                      );
                      return blend
                        ? formatBlendPreview(blend)
                        : affix.craftableAffix;
                    },
                  },
                )}
              </div>
            )}

            {/* Prefixes Section */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                <Trans>Prefixes (3 max)</Trans>
              </h3>
              <div className="space-y-4">
                {prefixes.map((slot, index) =>
                  renderAffixSlot(
                    slot,
                    index,
                    "Prefix",
                    prefixAffixes,
                    handlePrefixSelect,
                    handlePrefixSliderChange,
                    handleClearPrefix,
                    () => handleDeletePrefix(index),
                    { allSlotStates: toAffixSlotStates(prefixes) },
                  ),
                )}
              </div>
            </div>

            {/* Suffixes Section */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                <Trans>Suffixes (3 max)</Trans>
              </h3>
              <div className="space-y-4">
                {suffixes.map((slot, index) =>
                  renderAffixSlot(
                    slot,
                    index,
                    "Suffix",
                    suffixAffixes,
                    handleSuffixSelect,
                    handleSuffixSliderChange,
                    handleClearSuffix,
                    () => handleDeleteSuffix(index),
                    { allSlotStates: toAffixSlotStates(suffixes) },
                  ),
                )}
              </div>
            </div>

            {/* Custom Affixes Section */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                <Trans>Custom Affixes</Trans>
              </h3>
              <textarea
                value={customAffixText}
                onChange={(e) => setCustomAffixText(e.target.value)}
                placeholder={i18n._(
                  "+10% Fire Damage\n+20 to Maximum Life\n+5% Attack Speed",
                )}
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-50 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <p className="mt-1 text-xs text-zinc-500">
                <Trans>
                  Enter raw affix text, one per line. Use this for affixes not
                  available in the dropdowns above.
                </Trans>
              </p>
            </div>
          </>
        )}

        {/* Message when no equipment type selected in creation mode */}
        {mode === "create" && equipmentType === undefined && (
          <p className="py-8 text-center italic text-zinc-500">
            <Trans>Select an equipment type to begin crafting</Trans>
          </p>
        )}
      </div>

      <ModalActions>
        <ModalButton variant="secondary" onClick={onClose} fullWidth>
          <Trans>Cancel</Trans>
        </ModalButton>
        <ModalButton
          onClick={handleSave}
          fullWidth
          disabled={equipmentType === undefined}
        >
          {mode === "create" ? (
            <Trans>Save to Inventory</Trans>
          ) : (
            <Trans>Save</Trans>
          )}
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};
