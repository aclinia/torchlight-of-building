"use client";

import { getBaseTraitForHero } from "../../lib/hero-utils";
import type {
  CraftedInverseImage,
  CraftedPrism,
  Gear,
  HeroMemorySlot,
  DivinitySlate as SaveDataDivinitySlate,
} from "../../lib/save-data";
import {
  loadSaveData,
  loadSavesIndex,
  saveSaveData,
  saveSavesIndex,
} from "../../lib/saves";
import {
  createEmptyConfigurationPage,
  createEmptyHeroPage,
  createEmptyPactspiritSlot,
  generateItemId,
} from "../../lib/storage";
import type {
  GearSlot,
  InstalledDestinyResult,
  PactspiritSlotIndex,
  RingSlotKey,
} from "../../lib/types";
import {
  type DivinitySlate as CoreDivinitySlate,
  getAffixText,
} from "../../tli/core";
import { internalStore } from "./internal";
import type { BuilderActions } from "./types";

// Convert core DivinitySlate to save-data format
const toSaveDataSlate = (slate: CoreDivinitySlate): SaveDataDivinitySlate => ({
  id: slate.id,
  god: slate.god,
  shape: slate.shape,
  rotation: slate.rotation,
  flippedH: slate.flippedH,
  flippedV: slate.flippedV,
  affixes: slate.affixes.map(getAffixText),
  metaAffixes: slate.metaAffixes,
  isLegendary: slate.isLegendary,
  legendaryName: slate.legendaryName,
});

export const createActions = (): BuilderActions => ({
  // Core actions
  setSaveData: (saveData) => {
    internalStore.setState((state) => {
      state.saveData = saveData;
      state.hasUnsavedChanges = false;
    });
  },

  loadFromSave: (saveId) => {
    const index = loadSavesIndex();
    const saveMeta = index.saves.find((s) => s.id === saveId);
    if (!saveMeta) return false;

    const data = loadSaveData(saveId);
    if (!data) return false;

    const updatedIndex = { ...index, currentSaveId: saveId };
    saveSavesIndex(updatedIndex);

    internalStore.setState((state) => {
      state.saveData = data;
      state.currentSaveId = saveId;
      state.currentSaveName = saveMeta.name;
      state.savesIndex = updatedIndex;
      state.hasUnsavedChanges = false;
    });
    return true;
  },

  save: () => {
    const { currentSaveId, saveData, savesIndex } = internalStore.getState();
    if (!currentSaveId) return false;

    const success = saveSaveData(currentSaveId, saveData);
    if (success) {
      const now = Date.now();
      const saveIndex = savesIndex.saves.findIndex(
        (s) => s.id === currentSaveId,
      );
      internalStore.setState((state) => {
        if (saveIndex >= 0) {
          state.savesIndex.saves[saveIndex].updatedAt = now;
        }
        state.hasUnsavedChanges = false;
      });
      saveSavesIndex(internalStore.getState().savesIndex);
    }
    return success;
  },

  resetUnsavedChanges: () => {
    internalStore.setState((state) => {
      state.hasUnsavedChanges = false;
    });
  },

  // Equipment actions
  addItemToInventory: (item) => {
    internalStore.setState((state) => {
      state.saveData.equipmentPage.inventory.push(item);
      state.hasUnsavedChanges = true;
    });
  },

  copyItem: (itemId) => {
    const item = internalStore
      .getState()
      .saveData.equipmentPage.inventory.find((i) => i.id === itemId);
    if (!item) return;
    const newItem: Gear = { ...item, id: generateItemId() };
    internalStore.setState((state) => {
      state.saveData.equipmentPage.inventory.push(newItem);
      state.hasUnsavedChanges = true;
    });
  },

  deleteItem: (itemId) => {
    internalStore.setState((state) => {
      state.saveData.equipmentPage.inventory =
        state.saveData.equipmentPage.inventory.filter(
          (item) => item.id !== itemId,
        );
      const slots: GearSlot[] = [
        "helmet",
        "chest",
        "neck",
        "gloves",
        "belt",
        "boots",
        "leftRing",
        "rightRing",
        "mainHand",
        "offHand",
      ];
      for (const slot of slots) {
        if (state.saveData.equipmentPage.equippedGear[slot]?.id === itemId) {
          delete state.saveData.equipmentPage.equippedGear[slot];
        }
      }
      state.hasUnsavedChanges = true;
    });
  },

  selectItemForSlot: (slot, itemId) => {
    internalStore.setState((state) => {
      if (!itemId) {
        delete state.saveData.equipmentPage.equippedGear[slot];
        state.hasUnsavedChanges = true;
        return;
      }
      const item = state.saveData.equipmentPage.inventory.find(
        (i) => i.id === itemId,
      );
      if (!item) return;
      state.saveData.equipmentPage.equippedGear[slot] = item;
      state.hasUnsavedChanges = true;
    });
  },

  isItemEquipped: (itemId) => {
    const { saveData } = internalStore.getState();
    const slots: GearSlot[] = [
      "helmet",
      "chest",
      "neck",
      "gloves",
      "belt",
      "boots",
      "leftRing",
      "rightRing",
      "mainHand",
      "offHand",
    ];
    return slots.some(
      (slot) => saveData.equipmentPage.equippedGear[slot]?.id === itemId,
    );
  },

  // Talent actions
  setTreeName: (slot, treeName) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.talentTrees[slot] = {
        name: treeName,
        allocatedNodes: [],
        selectedCoreTalents: [],
      };
      state.hasUnsavedChanges = true;
    });
  },

  clearTree: (slot) => {
    internalStore.setState((state) => {
      delete state.saveData.talentPage.talentTrees[slot];
      state.hasUnsavedChanges = true;
    });
  },

  setAllocatedNodes: (slot, nodes) => {
    internalStore.setState((state) => {
      const tree = state.saveData.talentPage.talentTrees[slot];
      if (!tree) return;
      tree.allocatedNodes = nodes;
      state.hasUnsavedChanges = true;
    });
  },

  setCoreTalents: (slot, talents) => {
    internalStore.setState((state) => {
      const tree = state.saveData.talentPage.talentTrees[slot];
      if (!tree) return;
      tree.selectedCoreTalents = talents;
      state.hasUnsavedChanges = true;
    });
  },

  addPrismToInventory: (prism) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.prismList.push(prism);
      state.hasUnsavedChanges = true;
    });
  },

  deletePrism: (prismId) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.prismList =
        state.saveData.talentPage.inventory.prismList.filter(
          (p) => p.id !== prismId,
        );
      if (
        state.saveData.talentPage.talentTrees.placedPrism?.prism.id === prismId
      ) {
        delete state.saveData.talentPage.talentTrees.placedPrism;
      }
      state.hasUnsavedChanges = true;
    });
  },

  placePrism: (prism, treeSlot, position) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.talentTrees.placedPrism = {
        prism,
        treeSlot,
        position,
      };
      state.hasUnsavedChanges = true;
    });
  },

  removePlacedPrism: () => {
    internalStore.setState((state) => {
      delete state.saveData.talentPage.talentTrees.placedPrism;
      state.hasUnsavedChanges = true;
    });
  },

  addInverseImageToInventory: (inverseImage) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.inverseImageList.push(inverseImage);
      state.hasUnsavedChanges = true;
    });
  },

  deleteInverseImage: (inverseImageId) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.inverseImageList =
        state.saveData.talentPage.inventory.inverseImageList.filter(
          (ii) => ii.id !== inverseImageId,
        );
      if (
        state.saveData.talentPage.talentTrees.placedInverseImage?.inverseImage
          .id === inverseImageId
      ) {
        delete state.saveData.talentPage.talentTrees.placedInverseImage;
      }
      state.hasUnsavedChanges = true;
    });
  },

  placeInverseImage: (inverseImage, treeSlot, position) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.inverseImageList =
        state.saveData.talentPage.inventory.inverseImageList.filter(
          (ii) => ii.id !== inverseImage.id,
        );
      state.saveData.talentPage.talentTrees.placedInverseImage = {
        inverseImage,
        treeSlot,
        position,
        reflectedAllocatedNodes: [],
      };
      state.hasUnsavedChanges = true;
    });
  },

  removePlacedInverseImage: () => {
    internalStore.setState((state) => {
      const placedInverseImage =
        state.saveData.talentPage.talentTrees.placedInverseImage;
      if (!placedInverseImage) return;
      state.saveData.talentPage.inventory.inverseImageList.push(
        placedInverseImage.inverseImage,
      );
      delete state.saveData.talentPage.talentTrees.placedInverseImage;
      state.hasUnsavedChanges = true;
    });
  },

  allocateReflectedNode: (x, y, sourceX, sourceY) => {
    internalStore.setState((state) => {
      const placedInverseImage =
        state.saveData.talentPage.talentTrees.placedInverseImage;
      if (!placedInverseImage) return;

      const existingNode = placedInverseImage.reflectedAllocatedNodes.find(
        (n) => n.x === x && n.y === y,
      );

      if (existingNode) {
        existingNode.points += 1;
      } else {
        placedInverseImage.reflectedAllocatedNodes.push({
          x,
          y,
          sourceX,
          sourceY,
          points: 1,
        });
      }
      state.hasUnsavedChanges = true;
    });
  },

  deallocateReflectedNode: (x, y) => {
    internalStore.setState((state) => {
      const placedInverseImage =
        state.saveData.talentPage.talentTrees.placedInverseImage;
      if (!placedInverseImage) return;

      const existing = placedInverseImage.reflectedAllocatedNodes.find(
        (n) => n.x === x && n.y === y,
      );
      if (!existing) return;

      if (existing.points > 1) {
        existing.points -= 1;
      } else {
        placedInverseImage.reflectedAllocatedNodes =
          placedInverseImage.reflectedAllocatedNodes.filter(
            (n) => !(n.x === x && n.y === y),
          );
      }
      state.hasUnsavedChanges = true;
    });
  },

  setReflectedAllocatedNodes: (nodes) => {
    internalStore.setState((state) => {
      const placedInverseImage =
        state.saveData.talentPage.talentTrees.placedInverseImage;
      if (!placedInverseImage) return;
      placedInverseImage.reflectedAllocatedNodes = nodes;
      state.hasUnsavedChanges = true;
    });
  },

  // Hero actions
  setHero: (hero) => {
    internalStore.setState((state) => {
      state.saveData.heroPage.selectedHero = hero;
      state.hasUnsavedChanges = true;
    });
  },

  setTrait: (level, trait) => {
    internalStore.setState((state) => {
      state.saveData.heroPage.traits[level] = trait;
      state.hasUnsavedChanges = true;
    });
  },

  addHeroMemory: (memory) => {
    internalStore.setState((state) => {
      state.saveData.heroPage.memoryInventory.push(memory);
      state.hasUnsavedChanges = true;
    });
  },

  deleteHeroMemory: (memoryId) => {
    internalStore.setState((state) => {
      state.saveData.heroPage.memoryInventory =
        state.saveData.heroPage.memoryInventory.filter(
          (m) => m.id !== memoryId,
        );
      (["slot45", "slot60", "slot75"] as HeroMemorySlot[]).forEach((slot) => {
        if (state.saveData.heroPage.memorySlots[slot]?.id === memoryId) {
          state.saveData.heroPage.memorySlots[slot] = undefined;
        }
      });
      state.hasUnsavedChanges = true;
    });
  },

  equipHeroMemory: (slot, memory) => {
    internalStore.setState((state) => {
      state.saveData.heroPage.memorySlots[slot] = memory;
      state.hasUnsavedChanges = true;
    });
  },

  copyHeroMemory: (memoryId) => {
    const memory = internalStore
      .getState()
      .saveData.heroPage.memoryInventory.find((m) => m.id === memoryId);
    if (!memory) return;
    const newMemory = { ...memory, id: generateItemId() };
    internalStore.setState((state) => {
      state.saveData.heroPage.memoryInventory.push(newMemory);
      state.hasUnsavedChanges = true;
    });
  },

  // Pactspirit actions
  setPactspirit: (slotIndex, name) => {
    internalStore.setState((state) => {
      const slotKey =
        `slot${slotIndex}` as keyof typeof state.saveData.pactspiritPage;
      state.saveData.pactspiritPage[slotKey].pactspiritName = name;
      state.hasUnsavedChanges = true;
    });
  },

  setPactspiritLevel: (slotIndex, level) => {
    internalStore.setState((state) => {
      const slotKey =
        `slot${slotIndex}` as keyof typeof state.saveData.pactspiritPage;
      state.saveData.pactspiritPage[slotKey].level = level;
      state.hasUnsavedChanges = true;
    });
  },

  setRingDestiny: (slotIndex, ringSlot, destiny) => {
    internalStore.setState((state) => {
      const slotKey =
        `slot${slotIndex}` as keyof typeof state.saveData.pactspiritPage;
      state.saveData.pactspiritPage[slotKey].rings[ringSlot] = {
        installedDestiny: destiny,
      };
      state.hasUnsavedChanges = true;
    });
  },

  updatePactspiritSlot: (slotIndex, slot) => {
    internalStore.setState((state) => {
      const slotKey =
        `slot${slotIndex}` as keyof typeof state.saveData.pactspiritPage;
      state.saveData.pactspiritPage[slotKey] = slot;
      state.hasUnsavedChanges = true;
    });
  },

  // Divinity actions
  addSlateToInventory: (slate) => {
    const saveDataSlate = toSaveDataSlate(slate);
    internalStore.setState((state) => {
      state.saveData.divinityPage.inventory.push(saveDataSlate);
      state.hasUnsavedChanges = true;
    });
  },

  deleteSlate: (slateId) => {
    internalStore.setState((state) => {
      state.saveData.divinityPage.inventory =
        state.saveData.divinityPage.inventory.filter((s) => s.id !== slateId);
      state.saveData.divinityPage.placedSlates =
        state.saveData.divinityPage.placedSlates.filter(
          (p) => p.slateId !== slateId,
        );
      state.hasUnsavedChanges = true;
    });
  },

  placeSlate: (slateId, position) => {
    internalStore.setState((state) => {
      const existing = state.saveData.divinityPage.placedSlates.find(
        (p) => p.slateId === slateId,
      );
      if (existing) {
        existing.position = position;
      } else {
        state.saveData.divinityPage.placedSlates.push({ slateId, position });
      }
      state.hasUnsavedChanges = true;
    });
  },

  removeSlate: (slateId) => {
    internalStore.setState((state) => {
      state.saveData.divinityPage.placedSlates =
        state.saveData.divinityPage.placedSlates.filter(
          (p) => p.slateId !== slateId,
        );
      state.hasUnsavedChanges = true;
    });
  },

  updateSlate: (slateId, updates) => {
    internalStore.setState((state) => {
      const slate = state.saveData.divinityPage.inventory.find(
        (s) => s.id === slateId,
      );
      if (slate) {
        Object.assign(slate, updates);
      }
      state.hasUnsavedChanges = true;
    });
  },

  // Skills actions
  setActiveSkill: (slot, skillName) => {
    internalStore.setState((state) => {
      if (skillName === undefined) {
        state.saveData.skillPage.activeSkills[slot] = undefined;
      } else {
        state.saveData.skillPage.activeSkills[slot] = {
          skillName,
          enabled: true,
          supportSkills: {},
        };
      }
      state.hasUnsavedChanges = true;
    });
  },

  setPassiveSkill: (slot, skillName) => {
    internalStore.setState((state) => {
      if (skillName === undefined) {
        state.saveData.skillPage.passiveSkills[slot] = undefined;
      } else {
        state.saveData.skillPage.passiveSkills[slot] = {
          skillName,
          enabled: true,
          supportSkills: {},
        };
      }
      state.hasUnsavedChanges = true;
    });
  },

  setSupportSkill: (skillType, skillSlot, supportSlot, supportName) => {
    internalStore.setState((state) => {
      const skillSlots =
        skillType === "active"
          ? state.saveData.skillPage.activeSkills
          : state.saveData.skillPage.passiveSkills;
      const skill = skillSlots[skillSlot];
      if (skill === undefined) return;
      skill.supportSkills[supportSlot] =
        supportName !== undefined ? { name: supportName } : undefined;
      state.hasUnsavedChanges = true;
    });
  },

  toggleSkillEnabled: (skillType, slot) => {
    internalStore.setState((state) => {
      const skillSlots =
        skillType === "active"
          ? state.saveData.skillPage.activeSkills
          : state.saveData.skillPage.passiveSkills;
      const skill = skillSlots[slot];
      if (skill === undefined) return;
      skill.enabled = !skill.enabled;
      state.hasUnsavedChanges = true;
    });
  },

  setSkillLevel: (skillType, slot, level) => {
    internalStore.setState((state) => {
      const skillSlots =
        skillType === "active"
          ? state.saveData.skillPage.activeSkills
          : state.saveData.skillPage.passiveSkills;
      const skill = skillSlots[slot];
      if (skill === undefined) return;
      skill.level = level;
      state.hasUnsavedChanges = true;
    });
  },

  setSupportSkillLevel: (skillType, skillSlot, supportSlot, level) => {
    internalStore.setState((state) => {
      const skillSlots =
        skillType === "active"
          ? state.saveData.skillPage.activeSkills
          : state.saveData.skillPage.passiveSkills;
      const skill = skillSlots[skillSlot];
      if (skill === undefined) return;
      const support = skill.supportSkills[supportSlot];
      if (support === undefined) return;
      support.level = level;
      state.hasUnsavedChanges = true;
    });
  },

  // Divinity actions (new)
  copySlate: (slateId) => {
    const slate = internalStore
      .getState()
      .saveData.divinityPage.inventory.find((s) => s.id === slateId);
    if (!slate) return;
    const newSlate = { ...slate, id: generateItemId() };
    internalStore.setState((state) => {
      state.saveData.divinityPage.inventory.push(newSlate);
      state.hasUnsavedChanges = true;
    });
  },

  // Hero actions (new)
  resetHeroPage: (hero) => {
    internalStore.setState((state) => {
      if (!hero) {
        state.saveData.heroPage = {
          ...createEmptyHeroPage(),
          memoryInventory: state.saveData.heroPage.memoryInventory,
        };
      } else {
        const baseTrait = getBaseTraitForHero(hero);
        state.saveData.heroPage = {
          selectedHero: hero,
          traits: {
            level1: baseTrait?.name,
            level45: undefined,
            level60: undefined,
            level75: undefined,
          },
          memorySlots: {
            slot45: undefined,
            slot60: undefined,
            slot75: undefined,
          },
          memoryInventory: state.saveData.heroPage.memoryInventory,
        };
      }
      state.hasUnsavedChanges = true;
    });
  },

  equipHeroMemoryById: (slot, memoryId) => {
    internalStore.setState((state) => {
      const memory = memoryId
        ? state.saveData.heroPage.memoryInventory.find((m) => m.id === memoryId)
        : undefined;
      state.saveData.heroPage.memorySlots[slot] = memory;
      state.hasUnsavedChanges = true;
    });
  },

  // Configuration actions (new)
  updateConfiguration: (updates) => {
    internalStore.setState((state) => {
      state.saveData.configurationPage = {
        ...(state.saveData.configurationPage ?? createEmptyConfigurationPage()),
        ...updates,
      };
      state.hasUnsavedChanges = true;
    });
  },

  // Pactspirit actions (new)
  resetPactspiritSlot: (slotIndex, pactspiritName) => {
    internalStore.setState((state) => {
      const slotKey =
        `slot${slotIndex}` as keyof typeof state.saveData.pactspiritPage;
      state.saveData.pactspiritPage[slotKey] = {
        ...createEmptyPactspiritSlot(),
        pactspiritName,
      };
      state.hasUnsavedChanges = true;
    });
  },

  clearRingDestiny: (slotIndex, ringSlot) => {
    internalStore.setState((state) => {
      const slotKey =
        `slot${slotIndex}` as keyof typeof state.saveData.pactspiritPage;
      state.saveData.pactspiritPage[slotKey].rings[ringSlot] = {};
      state.hasUnsavedChanges = true;
    });
  },

  installDestiny: (
    slotIndex: PactspiritSlotIndex,
    ringSlot: RingSlotKey,
    destiny: InstalledDestinyResult,
  ) => {
    internalStore.setState((state) => {
      const slotKey =
        `slot${slotIndex}` as keyof typeof state.saveData.pactspiritPage;
      state.saveData.pactspiritPage[slotKey].rings[ringSlot] = {
        installedDestiny: destiny,
      };
      state.hasUnsavedChanges = true;
    });
  },

  // Talent actions (new)
  allocateNode: (treeSlot, x, y, maxPoints) => {
    internalStore.setState((state) => {
      const tree = state.saveData.talentPage.talentTrees[treeSlot];
      if (!tree) return;
      const existing = tree.allocatedNodes.find((n) => n.x === x && n.y === y);

      if (existing) {
        if (existing.points >= maxPoints) return;
        existing.points += 1;
      } else {
        tree.allocatedNodes.push({ x, y, points: 1 });
      }
      state.hasUnsavedChanges = true;
    });
  },

  deallocateNode: (treeSlot, x, y) => {
    internalStore.setState((state) => {
      const tree = state.saveData.talentPage.talentTrees[treeSlot];
      if (!tree) return;
      const existing = tree.allocatedNodes.find((n) => n.x === x && n.y === y);
      if (!existing) return;

      if (existing.points > 1) {
        existing.points -= 1;
      } else {
        tree.allocatedNodes = tree.allocatedNodes.filter(
          (n) => !(n.x === x && n.y === y),
        );
      }
      state.hasUnsavedChanges = true;
    });
  },

  selectCoreTalent: (treeSlot, slotIndex, talentName) => {
    internalStore.setState((state) => {
      const tree = state.saveData.talentPage.talentTrees[treeSlot];
      if (!tree) return;

      const newSelected = [...(tree.selectedCoreTalents ?? [])];
      if (talentName) {
        newSelected[slotIndex] = talentName;
      } else {
        newSelected.splice(slotIndex, 1);
      }
      tree.selectedCoreTalents = newSelected.filter(Boolean);
      state.hasUnsavedChanges = true;
    });
  },

  updatePrism: (prism: CraftedPrism) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.prismList =
        state.saveData.talentPage.inventory.prismList.map((p) =>
          p.id === prism.id ? prism : p,
        );
      state.hasUnsavedChanges = true;
    });
  },

  copyPrism: (prismId) => {
    const prism = internalStore
      .getState()
      .saveData.talentPage.inventory.prismList.find((p) => p.id === prismId);
    if (!prism) return;
    const newPrism = { ...prism, id: generateItemId() };
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.prismList.push(newPrism);
      state.hasUnsavedChanges = true;
    });
  },

  returnPrismToInventory: () => {
    internalStore.setState((state) => {
      const placed = state.saveData.talentPage.talentTrees.placedPrism;
      if (!placed) return;
      state.saveData.talentPage.inventory.prismList.push(placed.prism);
      delete state.saveData.talentPage.talentTrees.placedPrism;
      state.hasUnsavedChanges = true;
    });
  },

  updateInverseImage: (inverseImage: CraftedInverseImage) => {
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.inverseImageList =
        state.saveData.talentPage.inventory.inverseImageList.map((ii) =>
          ii.id === inverseImage.id ? inverseImage : ii,
        );
      state.hasUnsavedChanges = true;
    });
  },

  copyInverseImage: (inverseImageId) => {
    const inverseImage = internalStore
      .getState()
      .saveData.talentPage.inventory.inverseImageList.find(
        (ii) => ii.id === inverseImageId,
      );
    if (!inverseImage) return;
    const newInverseImage = { ...inverseImage, id: generateItemId() };
    internalStore.setState((state) => {
      state.saveData.talentPage.inventory.inverseImageList.push(
        newInverseImage,
      );
      state.hasUnsavedChanges = true;
    });
  },

  setTreeOrClear: (treeSlot, treeName, clearCoreTalents) => {
    internalStore.setState((state) => {
      if (treeName === "") {
        delete state.saveData.talentPage.talentTrees[treeSlot];
      } else {
        state.saveData.talentPage.talentTrees[treeSlot] = {
          name: treeName,
          allocatedNodes: [],
          selectedCoreTalents: clearCoreTalents
            ? []
            : (state.saveData.talentPage.talentTrees[treeSlot]
                ?.selectedCoreTalents ?? []),
        };
      }
      state.hasUnsavedChanges = true;
    });
  },

  resetTree: (treeSlot) => {
    internalStore.setState((state) => {
      const tree = state.saveData.talentPage.talentTrees[treeSlot];
      if (!tree) return;
      tree.allocatedNodes = [];

      // Also clear reflected nodes if inverse image is placed on this tree
      const placedInverseImage =
        state.saveData.talentPage.talentTrees.placedInverseImage;
      if (placedInverseImage?.treeSlot === treeSlot) {
        placedInverseImage.reflectedAllocatedNodes = [];
      }
      state.hasUnsavedChanges = true;
    });
  },

  // Calculations actions (new)
  setCalculationsSelectedSkill: (skillName) => {
    internalStore.setState((state) => {
      if (!state.saveData.calculationsPage) {
        state.saveData.calculationsPage = { selectedSkillName: skillName };
      } else {
        state.saveData.calculationsPage.selectedSkillName = skillName;
      }
      state.hasUnsavedChanges = true;
    });
  },
});

// Create actions singleton
export const actions = createActions();
