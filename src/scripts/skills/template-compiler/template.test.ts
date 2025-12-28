import { describe, expect, it } from "vitest";
import { template } from "./template";

describe("template-compiler", () => {
  describe("basic numeric captures", () => {
    it("should match integer capture", () => {
      const matcher = template("{value:int} shadow quantity");
      const result = matcher.tryMatch("50 Shadow Quantity");
      expect(result).toEqual({ value: 50 });
    });

    it("should match negative integer", () => {
      const matcher = template("{value:int} attack speed");
      const result = matcher.tryMatch("-15 Attack Speed");
      expect(result).toEqual({ value: -15 });
    });

    it("should match positive integer with sign", () => {
      const matcher = template("{value:int} shadow quantity");
      const result = matcher.tryMatch("+50 Shadow Quantity");
      expect(result).toEqual({ value: 50 });
    });

    it("should match decimal capture", () => {
      const matcher = template("{value:dec} multiplier");
      const result = matcher.tryMatch("1.5 multiplier");
      expect(result).toEqual({ value: 1.5 });
    });

    it("should match percentage capture", () => {
      const matcher = template("{value:dec%} attack speed");
      const result = matcher.tryMatch("15.5% Attack Speed");
      expect(result).toEqual({ value: 15.5 });
    });

    it("should match integer percentage", () => {
      const matcher = template("{value:int%} damage");
      const result = matcher.tryMatch("100% damage");
      expect(result).toEqual({ value: 100 });
    });
  });

  describe("multiple captures", () => {
    it("should match multiple captures", () => {
      const matcher = template("{min:int} - {max:int} physical damage");
      const result = matcher.tryMatch("10 - 50 Physical Damage");
      expect(result).toEqual({ min: 10, max: 50 });
    });

    it("should match mixed numeric types", () => {
      const matcher = template("{flat:int} to {pct:dec%} damage");
      const result = matcher.tryMatch("100 to 25.5% damage");
      expect(result).toEqual({ flat: 100, pct: 25.5 });
    });
  });

  describe("substring matching", () => {
    it("should find pattern anywhere in text", () => {
      const matcher = template("{value:int} shadow quantity");
      const result = matcher.tryMatch(
        "Adds +50 Shadow Quantity to linked skills",
      );
      expect(result).toEqual({ value: 50 });
    });

    it("should match pattern with prefix text", () => {
      const matcher = template("{value:dec%} attack speed");
      const result = matcher.tryMatch("Grants 15.5% Attack Speed while active");
      expect(result).toEqual({ value: 15.5 });
    });
  });

  describe("optional captures", () => {
    it("should match optional word when present", () => {
      const matcher = template("{value:dec%} [additional] damage");
      const result = matcher.tryMatch("10% additional damage");
      expect(result).toEqual({ value: 10, additional: "additional" });
    });

    it("should match when optional word is absent", () => {
      const matcher = template("{value:dec%} [additional] damage");
      const result = matcher.tryMatch("10% damage");
      expect(result).toEqual({ value: 10 });
    });

    it("should match optional captures in brackets", () => {
      const matcher = template("{value:dec%} [{type:int}] damage");
      const result = matcher.tryMatch("10% 5 damage");
      expect(result).toEqual({ value: 10, type: 5 });
    });

    it("should match when optional capture is absent", () => {
      const matcher = template("{value:dec%} [{extra:int}] damage");
      const result = matcher.tryMatch("10% damage");
      expect(result).toEqual({ value: 10 });
    });
  });

  describe("alternation", () => {
    it("should match alternation pattern", () => {
      const matcher = template("{value:dec%} (fire|cold|lightning) damage");

      const fireResult = matcher.tryMatch("10% fire damage");
      expect(fireResult).toBeDefined();
      expect(fireResult?.value).toBe(10);

      const coldResult = matcher.tryMatch("20% cold damage");
      expect(coldResult).toBeDefined();
      expect(coldResult?.value).toBe(20);
    });
  });

  describe("case insensitivity", () => {
    it("should match case-insensitively", () => {
      const matcher = template("{value:int} shadow quantity");

      expect(matcher.tryMatch("50 Shadow Quantity")).toEqual({ value: 50 });
      expect(matcher.tryMatch("50 SHADOW QUANTITY")).toEqual({ value: 50 });
      expect(matcher.tryMatch("50 shadow quantity")).toEqual({ value: 50 });
    });
  });

  describe("tryMatch - no match", () => {
    it("should return undefined when pattern does not match", () => {
      const matcher = template("{value:int} shadow quantity");
      const result = matcher.tryMatch("some other text");
      expect(result).toBeUndefined();
    });

    it("should return undefined for partial match", () => {
      const matcher = template("{value:int} shadow quantity");
      const result = matcher.tryMatch("50 fire damage");
      expect(result).toBeUndefined();
    });
  });

  describe("match - throws with skillName", () => {
    it("should return result when match succeeds", () => {
      const matcher = template("{value:int} shadow quantity");
      const result = matcher.match("50 Shadow Quantity", "TestSkill");
      expect(result).toEqual({ value: 50 });
    });

    it("should throw with skillName when no match", () => {
      const matcher = template("{value:int} shadow quantity");
      expect(() => matcher.match("some other text", "TestSkill")).toThrow(
        "TestSkill: no match for '{value:int} shadow quantity' in 'some other text'",
      );
    });
  });

  describe("special characters", () => {
    it("should handle escaped parentheses", () => {
      const matcher = template("stacks up to {limit:int} time\\(s\\)");
      const result = matcher.tryMatch("Stacks up to 10 time(s)");
      expect(result).toEqual({ limit: 10 });
    });

    it("should handle periods in pattern", () => {
      const matcher = template("{value:dec} sec. duration");
      const result = matcher.tryMatch("2.5 sec. duration");
      expect(result).toEqual({ value: 2.5 });
    });
  });

  describe("whitespace handling", () => {
    it("should match with flexible whitespace", () => {
      const matcher = template("{value:int} shadow quantity");
      const result = matcher.tryMatch("50  Shadow  Quantity");
      expect(result).toEqual({ value: 50 });
    });
  });

  describe("type inference", () => {
    it("should infer correct types for captures", () => {
      const matcher = template("{damage:int} - {speed:dec%}");
      const result = matcher.tryMatch("100 - 15.5%");

      // TypeScript should infer result as { damage: number; speed: number } | undefined
      if (result) {
        const damage: number = result.damage;
        const speed: number = result.speed;
        expect(typeof damage).toBe("number");
        expect(typeof speed).toBe("number");
      }
    });
  });
});
