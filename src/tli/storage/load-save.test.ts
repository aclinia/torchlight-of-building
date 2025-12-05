/** biome-ignore-all lint/style/noNonNullAssertion: don't care in test */
import { expect, test } from "vitest";
import type { SaveData } from "@/src/app/lib/save-data";
import { loadSave } from "./load-save";

const createMinimalSaveData = (
  overrides: Partial<SaveData> = {},
): SaveData => ({
  equipmentPage: {},
  talentPage: {
    tree1: undefined,
    tree2: undefined,
    tree3: undefined,
    tree4: undefined,
  },
  skillPage: {
    activeSkill1: { enabled: false, supportSkills: {} },
    activeSkill2: { enabled: false, supportSkills: {} },
    activeSkill3: { enabled: false, supportSkills: {} },
    activeSkill4: { enabled: false, supportSkills: {} },
    passiveSkill1: { enabled: false, supportSkills: {} },
    passiveSkill2: { enabled: false, supportSkills: {} },
    passiveSkill3: { enabled: false, supportSkills: {} },
    passiveSkill4: { enabled: false, supportSkills: {} },
  },
  heroPage: {
    selectedHero: undefined,
    traits: {
      level1: undefined,
      level45: undefined,
      level60: undefined,
      level75: undefined,
    },
    memorySlots: {
      slot45: undefined,
      slot60: undefined,
      slot75: undefined,
    },
  },
  pactspiritPage: {
    slot1: { level: 1, rings: createEmptyRings() },
    slot2: { level: 1, rings: createEmptyRings() },
    slot3: { level: 1, rings: createEmptyRings() },
  },
  divinityPage: { placedSlates: [] },
  itemsList: [],
  heroMemoryList: [],
  divinitySlateList: [],
  prismList: [],
  inverseImageList: [],
  ...overrides,
});

const createEmptyRings = () => ({
  innerRing1: {},
  innerRing2: {},
  innerRing3: {},
  innerRing4: {},
  innerRing5: {},
  innerRing6: {},
  midRing1: {},
  midRing2: {},
  midRing3: {},
});

test("loadSave converts gear with parseable affix", () => {
  const saveData = createMinimalSaveData({
    equipmentPage: {
      mainHand: {
        id: "test-weapon",
        equipmentType: "One-Handed Sword",
        affixes: ["+10% fire damage"],
      },
    },
  });

  const loadout = loadSave(saveData);

  expect(loadout.gearPage.equippedGear.mainHand).toBeDefined();
  const mainHand = loadout.gearPage.equippedGear.mainHand!;
  expect(mainHand.equipmentType).toBe("One-Handed Sword");
  expect(mainHand.affixes).toHaveLength(1);

  const affix = mainHand.affixes[0];
  expect(affix.text).toBe("+10% fire damage");
  expect(affix.src).toBe("Gear#mainHand");
  expect(affix.mods).toBeDefined();
  expect(affix.mods).toHaveLength(1);
  expect(affix.mods![0].type).toBe("DmgPct");
  expect(affix.mods![0].src).toBe("Gear#mainHand");
});

test("loadSave handles affix that fails to parse", () => {
  const saveData = createMinimalSaveData({
    equipmentPage: {
      helmet: {
        id: "test-helmet",
        equipmentType: "Helmet (STR)",
        affixes: ["some unparseable affix text"],
      },
    },
  });

  const loadout = loadSave(saveData);

  expect(loadout.gearPage.equippedGear.helmet).toBeDefined();
  const helmet = loadout.gearPage.equippedGear.helmet!;
  expect(helmet.affixes).toHaveLength(1);

  const affix = helmet.affixes[0];
  expect(affix.text).toBe("some unparseable affix text");
  expect(affix.src).toBe("Gear#helmet");
  expect(affix.mods).toBeUndefined();
});

test("loadSave sets correct src for different gear slots", () => {
  const saveData = createMinimalSaveData({
    equipmentPage: {
      helmet: {
        id: "h",
        equipmentType: "Helmet (STR)",
        affixes: ["+5% armor"],
      },
      leftRing: {
        id: "lr",
        equipmentType: "Ring",
        affixes: ["+5% max life"],
      },
      offHand: {
        id: "oh",
        equipmentType: "Shield (STR)",
        affixes: ["+4% attack block chance"],
      },
    },
  });

  const loadout = loadSave(saveData);
  const equippedGear = loadout.gearPage.equippedGear;

  expect(equippedGear.helmet?.affixes[0].src).toBe("Gear#helmet");
  expect(equippedGear.leftRing?.affixes[0].src).toBe("Gear#leftRing");
  expect(equippedGear.offHand?.affixes[0].src).toBe("Gear#offHand");
});

test("loadSave handles empty gear page", () => {
  const saveData = createMinimalSaveData({
    equipmentPage: {},
  });

  const loadout = loadSave(saveData);

  expect(loadout.gearPage.equippedGear).toEqual({});
  expect(loadout.gearPage.inventory).toEqual([]);
});

test("loadSave converts gear in inventory", () => {
  const saveData = createMinimalSaveData({
    itemsList: [
      {
        id: "inv-sword",
        equipmentType: "One-Handed Sword",
        affixes: ["+20% cold damage"],
      },
      {
        id: "inv-helmet",
        equipmentType: "Helmet (STR)",
        affixes: ["unparseable text", "+15% lightning damage"],
      },
    ],
  });

  const loadout = loadSave(saveData);

  expect(loadout.gearPage.inventory).toHaveLength(2);

  const sword = loadout.gearPage.inventory[0];
  expect(sword.equipmentType).toBe("One-Handed Sword");
  expect(sword.affixes).toHaveLength(1);
  expect(sword.affixes[0].text).toBe("+20% cold damage");
  expect(sword.affixes[0].src).toBeUndefined();
  expect(sword.affixes[0].mods).toHaveLength(1);
  expect(sword.affixes[0].mods![0].type).toBe("DmgPct");
  expect(sword.affixes[0].mods![0].src).toBeUndefined();

  const helmet = loadout.gearPage.inventory[1];
  expect(helmet.equipmentType).toBe("Helmet (STR)");
  expect(helmet.affixes).toHaveLength(2);
  expect(helmet.affixes[0].mods).toBeUndefined();
  expect(helmet.affixes[1].mods).toHaveLength(1);
});
