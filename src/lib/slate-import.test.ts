import { describe, expect, it } from "vitest";
import { getSlateShape } from "./divinity-utils";
import { parseImportedSlates } from "./slate-import";

describe("parseImportedSlates", () => {
  it("parses legendary slates by display name", () => {
    const json = JSON.stringify([
      {
        name: "Fallen Starlight",
        affixes: ["+15% Critical Strike Rating", "+3% Max Life"],
      },
    ]);

    const { slates, errors } = parseImportedSlates(json);
    expect(errors).toEqual([]);
    expect(slates).toHaveLength(1);
    expect(slates[0].isLegendary).toBe(true);
    expect(slates[0].legendaryName).toBe("Fallen Starlight");
    expect(slates[0].shape).toBeUndefined();
    expect(getSlateShape(slates[0])).toBe("Vertical2");
    expect(slates[0].affixes).toEqual([
      "+15% Critical Strike Rating",
      "+3% Max Life",
    ]);
  });

  it("parses god slates by in-game name", () => {
    const json = JSON.stringify([
      {
        name: "Goddess of Hunting's Divinity",
        affixes: ["+40% Attack Critical Strike Rating"],
      },
    ]);

    const { slates, errors } = parseImportedSlates(json);
    expect(errors).toEqual([]);
    expect(slates).toHaveLength(1);
    expect(slates[0].god).toBe("Hunting");
    expect(slates[0].shape).toBe("O");
    expect(slates[0].isLegendary).toBeUndefined();
  });

  it("parses all god slate names", () => {
    const godNames = [
      { name: "God of Might's Divinity", expectedGod: "Might" },
      { name: "Goddess of Hunting's Divinity", expectedGod: "Hunting" },
      { name: "Goddess of Knowledge's Divinity", expectedGod: "Knowledge" },
      { name: "God of War's Divinity", expectedGod: "War" },
      { name: "Goddess of Deception's Divinity", expectedGod: "Deception" },
      { name: "God of Machines' Divinity", expectedGod: "Machines" },
    ];

    for (const { name, expectedGod } of godNames) {
      const { slates, errors } = parseImportedSlates(
        JSON.stringify([{ name, affixes: [] }]),
      );
      expect(errors).toEqual([]);
      expect(slates[0].god).toBe(expectedGod);
    }
  });

  it("parses all legendary slate names", () => {
    const legendaryNames = [
      {
        name: "Sparks of Moth Fire",
        expectedDisplayName: "Sparks of Moth Fire",
        expectedShape: "Single",
      },
      {
        name: "When Sparks Set the Prairie Ablaze",
        expectedDisplayName: "When Sparks Set the Prairie Ablaze",
        expectedShape: "Single",
      },
      {
        name: "A Corner of Divinity",
        expectedDisplayName: "A Corner of Divinity",
        expectedShape: "CornerL",
      },
      {
        name: "Fallen Starlight",
        expectedDisplayName: "Fallen Starlight",
        expectedShape: "Vertical2",
      },
      {
        name: "Pedigree of Gods",
        expectedDisplayName: "Pedigree of Gods",
        expectedShape: "Pedigree",
      },
    ];

    for (const { name, expectedDisplayName, expectedShape } of legendaryNames) {
      const { slates, errors } = parseImportedSlates(
        JSON.stringify([{ name, affixes: [] }]),
      );
      expect(errors).toEqual([]);
      expect(slates[0].legendaryName).toBe(expectedDisplayName);
      expect(slates[0].shape).toBeUndefined();
      expect(getSlateShape(slates[0])).toBe(expectedShape);
    }
  });

  it("uses imported name directly for unknown slate names", () => {
    const json = JSON.stringify([
      { name: "Unknown Slate", affixes: ["+10% damage"] },
    ]);

    const { slates, errors } = parseImportedSlates(json);
    expect(errors).toEqual([]);
    expect(slates).toHaveLength(1);
    expect(slates[0].isLegendary).toBe(true);
    expect(slates[0].legendaryName).toBe("Unknown Slate");
    expect(slates[0].shape).toBeUndefined();
    expect(getSlateShape(slates[0])).toBe("Single");
    expect(slates[0].affixes).toEqual(["+10% damage"]);
  });

  it("stores copy slate affixes as regular affixes", () => {
    const json = JSON.stringify([
      {
        name: "Sparks of Moth Fire",
        affixes: [
          "Copies the last Talent on the adjacent slate on the left to this slate. Unable to copy the Core Talent.",
        ],
      },
      {
        name: "When Sparks Set the Prairie Ablaze",
        affixes: [
          "Copies the last Talent on all adjacent slates. Unable to copy Core Talents.",
        ],
      },
    ]);

    const { slates, errors } = parseImportedSlates(json);
    expect(errors).toEqual([]);
    expect(slates).toHaveLength(2);

    // Sparks of Moth Fire - affixes stored as regular affixes
    expect(slates[0].affixes).toHaveLength(1);
    expect(slates[0].affixes[0]).toContain("Copies the last Talent");

    // When Sparks Set the Prairie Ablaze - affixes stored as regular affixes
    expect(slates[1].affixes).toHaveLength(1);
    expect(slates[1].affixes[0]).toContain("Copies the last Talent");
  });

  it("stores regular legendary slate affixes as affixes", () => {
    const json = JSON.stringify([
      { name: "Fallen Starlight", affixes: ["+15% Critical Strike Rating"] },
    ]);

    const { slates } = parseImportedSlates(json);
    expect(slates[0].affixes).toEqual(["+15% Critical Strike Rating"]);
  });

  it("handles all entries when none are invalid", () => {
    const json = JSON.stringify([
      { name: "Fallen Starlight", affixes: ["+10% damage"] },
      { name: "New Slate Type", affixes: [] },
      { name: "God of War's Divinity", affixes: ["+5% attack"] },
    ]);

    const { slates, errors } = parseImportedSlates(json);
    expect(slates).toHaveLength(3);
    expect(errors).toEqual([]);
  });

  it("handles invalid JSON", () => {
    const { slates, errors } = parseImportedSlates("not json");
    expect(slates).toHaveLength(0);
    expect(errors).toEqual(["Invalid JSON"]);
  });

  it("handles a single object (not array)", () => {
    const json = JSON.stringify({
      name: "Fallen Starlight",
      affixes: ["+10% damage"],
    });

    const { slates, errors } = parseImportedSlates(json);
    expect(errors).toEqual([]);
    expect(slates).toHaveLength(1);
  });

  it("reports error for non-object entries", () => {
    const json = JSON.stringify(["not an object"]);

    const { slates, errors } = parseImportedSlates(json);
    expect(slates).toHaveLength(0);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("not an object");
  });

  it("reports error for entries with missing name", () => {
    const json = JSON.stringify([{ affixes: [] }]);

    const { slates, errors } = parseImportedSlates(json);
    expect(slates).toHaveLength(0);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("missing or empty name");
  });

  it("generates unique ids for each slate", () => {
    const json = JSON.stringify([
      { name: "Fallen Starlight", affixes: [] },
      { name: "Fallen Starlight", affixes: [] },
    ]);

    const { slates } = parseImportedSlates(json);
    expect(slates[0].id).not.toBe(slates[1].id);
  });

  it("sets default rotation and flip values", () => {
    const json = JSON.stringify([{ name: "Fallen Starlight", affixes: [] }]);

    const { slates } = parseImportedSlates(json);
    expect(slates[0].rotation).toBe(0);
    expect(slates[0].flippedH).toBe(false);
    expect(slates[0].flippedV).toBe(false);
  });

  it("preserves newlines in affixes", () => {
    const json = JSON.stringify([
      {
        name: "A Corner of Divinity",
        affixes: [
          "+1 Physical Skill Level\nPhysical Damage can't be converted",
        ],
      },
    ]);

    const { slates } = parseImportedSlates(json);
    expect(slates[0].affixes[0]).toContain("\n");
  });
});
