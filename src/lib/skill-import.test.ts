import { describe, expect, it } from "vitest";
import type { SkillPage } from "./save-data";
import { type ImportedSkill, importSkills } from "./skill-import";

const EMPTY_SKILL_PAGE: SkillPage = {
  activeSkills: {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
  },
  passiveSkills: { 1: undefined, 2: undefined, 3: undefined, 4: undefined },
};

describe("importSkills", () => {
  it("should import a valid active skill", () => {
    const input: ImportedSkill[] = [
      { skillType: "active", slot: 1, name: "Flame Slash" },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toEqual([]);
    expect(result.skillPage.activeSkills[1]).toEqual({
      skillName: "Flame Slash",
      enabled: true,
      level: 20,
      supportSkills: {},
    });
    // Other slots remain unchanged
    expect(result.skillPage.activeSkills[2]).toBeUndefined();
  });

  it("should import a valid passive skill", () => {
    const input: ImportedSkill[] = [
      { skillType: "passive", slot: 2, name: "Acuteness Focus" },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toEqual([]);
    expect(result.skillPage.passiveSkills[2]).toEqual({
      skillName: "Acuteness Focus",
      enabled: true,
      level: 20,
      supportSkills: {},
    });
  });

  it("should warn and skip unknown skills", () => {
    const input: ImportedSkill[] = [
      { skillType: "active", slot: 1, name: "Nonexistent Skill" },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain("Unknown active skill");
    expect(result.skillPage.activeSkills[1]).toBeUndefined();
  });

  it("should handle ellipsis prefix matching with ...", () => {
    const input: ImportedSkill[] = [
      { skillType: "active", slot: 1, name: "Flame Sl..." },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toEqual([]);
    expect(result.skillPage.activeSkills[1]?.skillName).toBe("Flame Slash");
  });

  it("should handle ellipsis prefix matching with \u2026", () => {
    const input: ImportedSkill[] = [
      { skillType: "active", slot: 1, name: "Flame Sl\u2026" },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toEqual([]);
    expect(result.skillPage.activeSkills[1]?.skillName).toBe("Flame Slash");
  });

  it("should import regular support skills", () => {
    const input: ImportedSkill[] = [
      {
        skillType: "active",
        slot: 1,
        name: "Flame Slash",
        supports: [{ slot: 1, name: "Added Cold Damage" }],
      },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toEqual([]);
    const skill = result.skillPage.activeSkills[1];
    expect(skill?.supportSkills[1]).toEqual({
      skillType: "support",
      name: "Added Cold Damage",
      level: 20,
    });
  });

  it("should warn on unknown support skills", () => {
    const input: ImportedSkill[] = [
      {
        skillType: "active",
        slot: 1,
        name: "Flame Slash",
        supports: [{ slot: 1, name: "Fake Support" }],
      },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain("Unknown support skill");
  });

  it("should warn on invalid slot numbers", () => {
    const input: ImportedSkill[] = [
      { skillType: "active", slot: 0, name: "Flame Slash" },
      { skillType: "active", slot: 6, name: "Flame Slash" },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toHaveLength(2);
  });

  it("should not mutate the original skill page", () => {
    const original: SkillPage = JSON.parse(JSON.stringify(EMPTY_SKILL_PAGE));
    const input: ImportedSkill[] = [
      { skillType: "active", slot: 1, name: "Flame Slash" },
    ];
    importSkills(input, original);

    expect(original).toEqual(EMPTY_SKILL_PAGE);
  });

  it("should import magnificent support skills with defaults", () => {
    const input: ImportedSkill[] = [
      {
        skillType: "passive",
        slot: 1,
        name: "Acuteness Focus",
        supports: [
          { slot: 3, name: "Acuteness Focus: Piercing Agony (Magnificent)" },
        ],
      },
    ];
    const result = importSkills(input, EMPTY_SKILL_PAGE);

    expect(result.warnings).toEqual([]);
    const skill = result.skillPage.passiveSkills[1];
    expect(skill?.supportSkills[3]?.skillType).toBe("magnificent_support");
    expect(skill?.supportSkills[3]?.name).toBe(
      "Acuteness Focus: Piercing Agony (Magnificent)",
    );
  });

  it("should preserve existing slots not mentioned in import", () => {
    const existing: SkillPage = {
      ...EMPTY_SKILL_PAGE,
      activeSkills: {
        ...EMPTY_SKILL_PAGE.activeSkills,
        2: {
          skillName: "Compound Potion",
          enabled: true,
          level: 15,
          supportSkills: {},
        },
      },
    };
    const input: ImportedSkill[] = [
      { skillType: "active", slot: 1, name: "Flame Slash" },
    ];
    const result = importSkills(input, existing);

    expect(result.skillPage.activeSkills[1]?.skillName).toBe("Flame Slash");
    // Slot 2 should be preserved
    expect(result.skillPage.activeSkills[2]?.skillName).toBe("Compound Potion");
    expect(result.skillPage.activeSkills[2]?.level).toBe(15);
  });
});
