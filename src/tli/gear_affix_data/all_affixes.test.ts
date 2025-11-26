import { expect, test, describe } from "vitest";
import { BOOTS_DEX_BASE_AFFIX_AFFIXES } from "./boots_dex_base_affix";
import { ALL_GEAR_AFFIXES } from "./all_affixes";
import type { BaseGearAffix } from "./types";

describe("BaseGearAffix type system", () => {
  test("BOOTS_DEX_BASE_AFFIX_AFFIXES has correct structure", () => {
    const firstAffix = BOOTS_DEX_BASE_AFFIX_AFFIXES[0];
    expect(firstAffix).toHaveProperty("equipmentSlot");
    expect(firstAffix).toHaveProperty("equipmentType");
    expect(firstAffix).toHaveProperty("affixType");
    expect(firstAffix).toHaveProperty("craftingPool");
    expect(firstAffix).toHaveProperty("tier");
    expect(firstAffix).toHaveProperty("template");
    expect(firstAffix).toHaveProperty("valueRanges");
    expect(firstAffix).toHaveProperty("rawAffix");
  });

  test("ALL_GEAR_AFFIXES contains all 5625 affixes", () => {
    expect(ALL_GEAR_AFFIXES.length).toBe(5625);
  });

  test("ALL_GEAR_AFFIXES has affixes from different equipment types", () => {
    const equipmentTypes = new Set(
      ALL_GEAR_AFFIXES.map((affix) => affix.equipmentType),
    );
    expect(equipmentTypes.size).toBeGreaterThan(30); // Should have 38 unique equipment types
  });

  test("ALL_GEAR_AFFIXES has affixes from different affix types", () => {
    const affixTypes = new Set(
      ALL_GEAR_AFFIXES.map((affix) => affix.affixType),
    );
    expect(affixTypes.size).toBe(7); // Base Affix, Prefix, Suffix, Base Stats, Sweet Dream Affix, Tower Sequence, Corrosion Base
  });

  test("type narrowing works with discriminated union", () => {
    const affix: BaseGearAffix = BOOTS_DEX_BASE_AFFIX_AFFIXES[0];

    // Type narrowing by equipmentType
    if (affix.equipmentType === "Boots (DEX)") {
      expect(affix.equipmentSlot).toBe("Boots");
    }
  });

  test("can filter affixes by equipment type", () => {
    const bootsAffixes = ALL_GEAR_AFFIXES.filter(
      (affix) => affix.equipmentSlot === "Boots",
    );
    expect(bootsAffixes.length).toBeGreaterThan(0);
  });

  test("can filter affixes by affix type", () => {
    const prefixAffixes = ALL_GEAR_AFFIXES.filter(
      (affix) => affix.affixType === "Prefix",
    );
    expect(prefixAffixes.length).toBeGreaterThan(0);
  });

  test("all affixes have valid templates", () => {
    for (const affix of ALL_GEAR_AFFIXES) {
      // Some affixes in the source data have empty strings (placeholders)
      // Just verify that template is defined
      expect(affix.template).toBeDefined();

      // For non-empty templates, verify placeholder count matches value ranges
      if (affix.template.length > 0) {
        const placeholderCount = (affix.template.match(/\{\d+\}/g) || [])
          .length;
        expect(placeholderCount).toBe(affix.valueRanges.length);
      }
    }
  });

  test("all affixes have no remaining backticks in template", () => {
    for (const affix of ALL_GEAR_AFFIXES) {
      expect(affix.template).not.toContain("`");
    }
  });
});
