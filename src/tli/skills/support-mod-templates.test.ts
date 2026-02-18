import { describe, expect, test } from "vitest";
import { parseSupportAffixes } from "./support-mod-templates";

describe("parseSupportAffixes", () => {
  test("parse auto-used supported skills additional damage (signed)", () => {
    const result = parseSupportAffixes([
      "Auto-used supported skills +10% additional damage",
    ]);
    expect(result).toEqual([
      [
        {
          mod: { type: "DmgPct", value: 10, dmgModType: "global", addn: true },
        },
      ],
    ]);
  });

  test("parse Overload damage per focus blessing stack", () => {
    const result = parseSupportAffixes([
      "4% additional damage for the supported skill for every stack of Focus Blessing, stacking up to 8 times",
    ]);
    expect(result).toEqual([
      [
        {
          mod: {
            type: "DmgPct",
            value: 4,
            dmgModType: "global",
            addn: true,
            per: { stackable: "focus_blessing", limit: 8 },
          },
        },
      ],
    ]);
  });

  test("parse ChainLightningWebOfLightning", () => {
    const result = parseSupportAffixes([
      "For every 1 Jump, the supported skill releases 1 additional Chain Lightning (does not target the same enemy). Each Chain Lightning can only Jump 1 time(s)",
    ]);
    expect(result).toEqual([
      [{ mod: { type: "ChainLightningWebOfLightning" } }],
    ]);
  });

  test("parse ChainLightningMerge", () => {
    const result = parseSupportAffixes([
      "Multiple Chain Lightnings released by the supported skill can target the same enemy, but will prioritize different enemies. The Shotgun Effect falloff coefficient of the supported skill is 80%",
    ]);
    expect(result).toEqual([
      [{ mod: { type: "ChainLightningMerge", shotgunFalloffCoefficient: 80 } }],
    ]);
  });

  test("parse crit buff informational text returns no mods", () => {
    const result = parseSupportAffixes([
      "The supported skill gains a buff on Critical Strike. The buff lasts 2 s.",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse auto-cast while standing still returns no mods", () => {
    const result = parseSupportAffixes([
      "Automatically and continuously cast the supported skill at the nearest enemy within 25m while standing still",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse multistrike trigger returns no mods", () => {
    const result = parseSupportAffixes([
      "Triggers the supported skill upon reaching the max Multistrike Count. Interval: 0.1s",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse multistrike chance", () => {
    const result = parseSupportAffixes([
      "+101% chance for the supported skill to trigger Multistrike",
    ]);
    expect(result).toEqual([
      [{ mod: { type: "MultistrikeChancePct", value: 101 } }],
    ]);
  });

  test("parse multistrike increasing damage", () => {
    const result = parseSupportAffixes([
      "Multistrikes of the supported skill deal 27% increasing damage",
    ]);
    expect(result).toEqual([
      [{ mod: { type: "MultistrikeIncDmgPct", value: 27 } }],
    ]);
  });

  test("parse sealed mana compensation", () => {
    const result = parseSupportAffixes([
      "0.5% Sealed Mana Compensation for the supported skill",
    ]);
    expect(result).toEqual([
      [{ mod: { type: "SealedManaCompPct", value: 0.5, addn: false } }],
    ]);
  });

  test("parse additional sealed mana compensation", () => {
    const result = parseSupportAffixes([
      "10% additional Sealed Mana Compensation for the supported skill",
    ]);
    expect(result).toEqual([
      [{ mod: { type: "SealedManaCompPct", value: 10, addn: true } }],
    ]);
  });

  test("parse negative sealed mana compensation", () => {
    const result = parseSupportAffixes([
      "-70% additional Sealed Mana Compensation for the supported skill",
    ]);
    expect(result).toEqual([
      [{ mod: { type: "SealedManaCompPct", value: -70, addn: true } }],
    ]);
  });

  test("parse projectile speed", () => {
    const result = parseSupportAffixes([
      "+20% Projectile Speed for the supported skill",
    ]);
    expect(result).toEqual([[{ mod: { type: "ProjSpdPct", value: 20 } }]]);
  });

  test("parse Overload damage per focus blessing stack with time(s)", () => {
    const result = parseSupportAffixes([
      "4% additional damage for the supported skill for each stack of Focus Blessing, stacking up to 8 time(s)",
    ]);
    expect(result).toEqual([
      [
        {
          mod: {
            type: "DmgPct",
            value: 4,
            dmgModType: "global",
            addn: true,
            per: { stackable: "focus_blessing", limit: 8 },
          },
        },
      ],
    ]);
  });

  test("parse skill effect per cast with stacking limit", () => {
    const result = parseSupportAffixes([
      "The supported skill 10% Effect every time it is cast, stacking up to 3 time(s)",
    ]);
    expect(result).toEqual([
      [
        {
          mod: {
            type: "SkillEffPct",
            value: 10,
            per: { stackable: "skill_use", limit: 3 },
          },
        },
      ],
    ]);
  });

  test("parse seal conversion", () => {
    const result = parseSupportAffixes([
      "Replaces Sealed Mana of the supported skill with Sealed Life",
    ]);
    expect(result).toEqual([[{ mod: { type: "SealConversion" } }]]);
  });

  test("parse Spell Tangle is tangle", () => {
    const result = parseSupportAffixes([
      "The supported skill is cast as a Spell Tangle",
    ]);
    expect(result).toEqual([[{ mod: { type: "IsTangle" } }]]);
  });

  test("parse max charges returns no mods", () => {
    const result = parseSupportAffixes([
      "+1 Max Charges for the supported skill",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse gains buff after casting returns no mods", () => {
    const result = parseSupportAffixes([
      "Gains a 2 s buff after casting the supported skill",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse gains stack of buff on skill use returns no mods", () => {
    const result = parseSupportAffixes([
      "Gains a stack of buff when using the supported skill every 6 s. The buff lasts 2s",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse always attempts to trigger returns no mods", () => {
    const result = parseSupportAffixes([
      "Always attempts to trigger the supported skill. Interval: 0.2s",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse auto attack while standing still returns no mods", () => {
    const result = parseSupportAffixes([
      "Automatically use the Supported Attack Skill to continuously attack the nearest enemy within 25m while standing still",
    ]);
    expect(result).toEqual([[]]);
  });

  test("parse Fervor gains fervor rating on hit", () => {
    const result = parseSupportAffixes([
      "Gains 2 Fervor Rating when the supported skill hits an enemy",
    ]);
    expect(result).toEqual([[{ mod: { type: "GainsFervor" } }]]);
  });

  test("parse Fervor crit rating per fervor rating", () => {
    const result = parseSupportAffixes([
      "For every 10 Fervor Rating, the supported skill +3% Critical Strike Rating",
    ]);
    expect(result).toEqual([
      [
        {
          mod: {
            type: "CritRatingPct",
            value: 3,
            modType: "global",
            per: { stackable: "fervor", amt: 10 },
          },
        },
      ],
    ]);
  });

  test("parse Fervor additional damage per fervor rating", () => {
    const result = parseSupportAffixes([
      "The supported skill 2.65% additional damage for every 10 Fervor Rating",
    ]);
    expect(result).toEqual([
      [
        {
          mod: {
            type: "DmgPct",
            value: 2.65,
            dmgModType: "global",
            addn: true,
            per: { stackable: "fervor", amt: 10 },
          },
        },
      ],
    ]);
  });

  test("parse SkillSupportedBy Willpower", () => {
    const result = parseSupportAffixes([
      "The supported skill is supported by Lv. 15 Willpower",
    ]);
    expect(result).toEqual([
      [
        {
          mod: {
            type: "CurrentSkillSupportedBy",
            skillName: "Willpower",
            level: 15,
          },
        },
      ],
    ]);
  });

  test("parse skill area bonus applied to steep strike damage", () => {
    const result = parseSupportAffixes([
      "27% of the bonuses and additional bonuses to Skill Area is also applied to the skill's additional Steep Strike Damage",
    ]);
    expect(result).toEqual([
      [
        {
          mod: {
            type: "SteepStrikeDmgPct",
            value: 1,
            addn: true,
            per: { stackable: "skill_area", amt: 100 / 27 },
          },
        },
      ],
    ]);
  });

  test("parse doubles berserking blade buff stack upper limit with skill area", () => {
    const result = parseSupportAffixes([
      "Doubles the skills buff stack upper limit. Each buff grants 0.45% additional Skill Area for the skill",
    ]);
    expect(result).toEqual([
      [
        { mod: { type: "DoubleBerserkingBladeUpperLimit" } },
        {
          mod: {
            type: "SkillAreaPct",
            value: 0.45,
            skillAreaModType: "global",
            addn: true,
            per: { stackable: "berserking_blade_buff" },
          },
        },
      ],
    ]);
  });
});
