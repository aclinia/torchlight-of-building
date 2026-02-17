import type { SupportMod } from "../core";
import type { Mod } from "../mod";
import { spec, t } from "../mod-parser";

const GLOBAL = "global" as const;

/**
 * Willpower parser - handles full text blob for Willpower skill
 * Extracts:
 * - MaxWillpowerStacks from "Stacks up to N time(s)"
 * - DmgPct with per: { stackable: "willpower" } from the damage line
 */
const parseWillpowerBlob = (input: string): Mod[] | undefined => {
  const normalized = input.toLowerCase();

  // Check if this is a Willpower description
  if (!normalized.includes("for every stack of buffs while standing still")) {
    return undefined;
  }

  const mods: Mod[] = [];

  // Extract max stacks: "Stacks up to N time(s)"
  const stacksMatch = normalized.match(/stacks up to (\d+) time\(s\)/);
  if (stacksMatch !== null) {
    mods.push({
      type: "MaxWillpowerStacks",
      value: parseInt(stacksMatch[1], 10),
    });
  }

  // Extract damage per stack: "+X% additional damage for the supported skill for every stack of buffs while standing still"
  const dmgMatch = normalized.match(
    /\+?([\d.]+)%?\s*additional damage for the supported skill for every stack of buffs while standing still/,
  );
  if (dmgMatch !== null) {
    mods.push({
      type: "DmgPct",
      value: parseFloat(dmgMatch[1]),
      dmgModType: GLOBAL,
      addn: true,
      per: { stackable: "willpower" },
    });
  }

  return mods.length > 0 ? mods : undefined;
};

const allSupportParsers = [
  // Signed version (e.g., "Auto-used supported skills +10% additional damage")
  t("auto-used supported skills {value:+int%} additional damage").output(
    (c) => ({ type: "DmgPct", value: c.value, dmgModType: GLOBAL, addn: true }),
  ),
  // Unsigned version (e.g., "Auto-used supported skills 10% additional damage")
  t("auto-used supported skills {value:int%} additional damage").output(
    (c) => ({ type: "DmgPct", value: c.value, dmgModType: GLOBAL, addn: true }),
  ),
  t("manually used supported skills {value:int%} additional damage").output(
    (c) => ({ type: "DmgPct", value: c.value, dmgModType: GLOBAL, addn: true }),
  ),
  t(
    "{value:int%} additional damage for minions summoned by the supported skill",
  ).output((c) => ({ type: "MinionDmgPct", value: c.value, addn: true })),
  // Signed version (e.g., "+19.8% additional damage for the supported skill")
  t("{value:+dec%} additional damage for the supported skill").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: GLOBAL,
    addn: true,
  })),
  // Unsigned version (e.g., "0.8% additional damage for the supported skill")
  t("{value:dec%} additional damage for the supported skill").output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: GLOBAL,
    addn: true,
  })),
  t("{value:+dec%} additional melee damage for the supported skill").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "melee",
      addn: true,
    }),
  ),
  t(
    "{value:dec%} additional {dmgType:DmgModType} damage for the supported skill",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: c.dmgType,
    addn: true,
  })),
  t("{value:+dec%} additional ailment damage for the supported skill").output(
    (c) => ({
      type: "DmgPct",
      value: c.value,
      dmgModType: "ailment",
      addn: true,
    }),
  ),
  t(
    "{value:dec%} [additional] damage over time for the supported skill",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "damage_over_time",
    addn: c.additional !== undefined,
  })),
  t(
    "the supported skill deals more damage to enemies with more life, up to {value:+int%} additional erosion damage",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: "erosion",
    addn: true,
  })),
  t(
    "the supported skill deals {value:dec%} additional damage to cursed enemies",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: GLOBAL,
    addn: true,
    cond: "enemy_is_cursed",
  })),
  t(
    "{value:+dec%} additional damage for the supported skill when it lands a critical strike",
  ).output((c) => ({
    type: "CritDmgPct",
    value: c.value,
    addn: true,
    modType: GLOBAL,
  })),
  t("{value:+dec%} attack speed for the supported skill").output((c) => ({
    type: "AspdPct",
    value: c.value,
    addn: false,
  })),
  t("{value:+dec%} cast speed for the supported skill").output((c) => ({
    type: "CspdPct",
    value: c.value,
    addn: false,
  })),
  t(
    "{value:+dec%} additional hit damage for skills cast by spell burst when spell burst is activated by the supported skill",
  ).output((c) => ({
    type: "SpellBurstAdditionalDmgPct",
    value: c.value,
    addn: true,
  })),
  t(
    "{value:+dec%} additional attack and cast speed for the supported skill",
  ).outputMany([
    spec((c) => ({ type: "AspdPct", value: c.value, addn: true })),
    spec((c) => ({ type: "CspdPct", value: c.value, addn: true })),
  ]),
  t("{value:+dec%} critical strike rating for the supported skill").output(
    (c) => ({ type: "CritRatingPct", value: c.value, modType: GLOBAL }),
  ),
  t("{value:+dec%} skill area for the supported skill").output((c) => ({
    type: "SkillAreaPct",
    value: c.value,
    skillAreaModType: GLOBAL,
  })),
  t("{value:dec%} aura effect for the supported skill").output((c) => ({
    type: "AuraEffPct",
    value: c.value,
  })),
  t("{value:dec%} buff effect for the supported skill").output((c) => ({
    type: "FocusBuffEffPct",
    value: c.value,
  })),
  t("{value:+dec%} duration for the supported skill").output((c) => ({
    type: "SkillEffDurationPct",
    value: c.value,
  })),
  t(
    "the supported skill {value:dec%} effect every time it is cast, [stacking] up to {limit:int} time(s)",
  ).output((c) => ({
    type: "SkillEffPct",
    value: c.value,
    per: { stackable: "skill_use", limit: c.limit },
  })),
  t(
    "{value:dec%} effect for the status provided by the skill per charge when you use the supported skill",
  ).output((c) => ({
    type: "SkillEffPct",
    value: c.value,
    per: { stackable: "skill_charges_on_use" },
  })),
  t("{value:+int} shadow quantity for the supported skill").output((c) => ({
    type: "ShadowQuant",
    value: c.value,
  })),
  t("{value:+int} jumps for the supported skill").output((c) => ({
    type: "Jump",
    value: c.value,
  })),
  t("stacks up to {value:int} time(s)").output((c) => ({
    type: "MaxWillpowerStacks",
    value: c.value,
  })),
  t(
    "when the supported skill deals damage over time, it inflicts {value:int} affliction on the enemy. effect cooldown: {_:int} s",
  ).output((c) => ({ type: "AfflictionInflictedPerSec", value: c.value })),
  t("it inflicts {value:int} affliction on the enemy").output((c) => ({
    type: "AfflictionInflictedPerSec",
    value: c.value,
  })),
  t(
    "affliction grants an additional {value:dec%} effect to the supported skill",
  ).output((c) => ({
    type: "AfflictionEffectPct",
    value: c.value,
    addn: true,
    cond: "enemy_at_max_affliction",
  })),
  t("{value:int%} chance to paralyze it").output((c) => ({
    type: "InflictParalysisPct",
    value: c.value,
    cond: "enemy_is_cursed",
  })),
  t(
    "when the supported skill deals damage to a cursed target, there is a {value:+dec%} chance to paralyze it",
  ).output((c) => ({
    type: "InflictParalysisPct",
    value: c.value,
    cond: "enemy_is_cursed",
  })),
  t("the supported skill cannot inflict wilt").output(() => ({
    type: "CannotInflictWilt",
  })),
  t(
    "every {_:int} time(s) the supported skill is used, gains a barrier if there's no barrier. interval: {_:int} s",
  ).output(() => ({ type: "GeneratesBarrier" })),
  t("gains a barrier if there's no barrier").output(() => ({
    type: "GeneratesBarrier",
  })),
  t("{value:+dec%} projectile speed for the supported skill").output((c) => ({
    type: "ProjSpdPct",
    value: c.value,
  })),
  t("{value:int%} projectile size for the supported skill").output((c) => ({
    type: "ProjSizePct",
    value: c.value,
  })),
  t("{value:int%} additional ignite duration for the supported skill").output(
    (c) => ({ type: "IgniteDurationPct", value: c.value }),
  ),
  t("{value:int%} additional duration for the supported skill").output((c) => ({
    type: "SkillEffDurationPct",
    value: c.value,
  })),
  t(
    "+{value:dec%} additional damage for this skill for every link less than maximum links",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: GLOBAL,
    addn: true,
    per: { stackable: "unused_mind_control_link" },
  })),
  t(
    "converts {value:int%} of the supported skill's {from:DmgChunkType} damage to {to:DmgChunkType} damage",
  ).output((c) => ({
    type: "ConvertDmgPct",
    value: c.value,
    from: c.from,
    to: c.to,
  })),
  t(
    "{value:dec%} additional damage for the supported skill for every stack of focus blessing, stacking up to {limit:int} times",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: GLOBAL,
    addn: true,
    per: { stackable: "focus_blessing", limit: c.limit },
  })),
  t(
    "{value:dec%} additional damage for the supported skill for each stack of focus blessing, stacking up to {limit:int} time(s)",
  ).output((c) => ({
    type: "DmgPct",
    value: c.value,
    dmgModType: GLOBAL,
    addn: true,
    per: { stackable: "focus_blessing", limit: c.limit },
  })),
  t(
    "for every 1 jump, the supported skill releases 1 additional chain lightning (does not target the same enemy). each chain lightning can only jump 1 time(s)",
  ).output(() => ({ type: "ChainLightningWebOfLightning" })),
  t(
    "multiple chain lightnings released by the supported skill can target the same enemy, but will prioritize different enemies. the shotgun effect falloff coefficient of the supported skill is {value:int}%",
  ).output((c) => ({
    type: "ChainLightningMerge",
    shotgunFalloffCoefficient: c.value,
  })),
  // Recognized but produces no mods (informational text)
  t(
    "the supported skill gains a buff on critical strike. the buff lasts {_:int} s.",
  ).outputNone(),
  t(
    "automatically and continuously cast the supported skill at the nearest enemy within {_:int}m while standing still",
  ).outputNone(),
  t(
    "triggers the supported skill upon reaching the max multistrike count. interval: {_:dec}s",
  ).outputNone(),
  t(
    "{value:+int%} chance for the supported skill to trigger multistrike",
  ).output((c) => ({ type: "MultistrikeChancePct", value: c.value })),
  t(
    "multistrikes of the supported skill deal {value:int%} increasing damage",
  ).output((c) => ({ type: "MultistrikeIncDmgPct", value: c.value })),
  // Signed version (e.g., "-70% additional Sealed Mana Compensation...")
  t(
    "{value:+dec%} [additional] sealed mana compensation for the supported skill",
  ).output((c) => ({
    type: "SealedManaCompPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  // Unsigned version (e.g., "0.5% Sealed Mana Compensation...")
  t(
    "{value:dec%} [additional] sealed mana compensation for the supported skill",
  ).output((c) => ({
    type: "SealedManaCompPct",
    value: c.value,
    addn: c.additional !== undefined,
  })),
  t("replaces sealed mana of the supported skill with sealed life").output(
    "SealConversion",
  ),
  t("the supported skill is cast as a spell tangle").output(() => ({
    type: "IsTangle",
  })),
  t("{_:+int} max charges for the supported skill").outputNone(),
  t("gains a {_:int} s buff after casting the supported skill").outputNone(),
  t(
    "gains a stack of buff when using the supported skill every {_:int} s. the buff lasts {_:int}s",
  ).outputNone(),
  t(
    "the supported skill is supported by lv. {level:int} {skillName:words}",
  ).output((c) => ({
    type: "CurrentSkillSupportedBy",
    skillName: c.skillName,
    level: c.level,
  })),
  t(
    "always attempts to trigger the supported skill. interval: {_:dec}s",
  ).outputNone(),
  t(
    "automatically use the supported attack skill to continuously attack the nearest enemy within {_:int}m while standing still",
  ).outputNone(),
];

const parseSupportAffix = (text: string): SupportMod[] | undefined => {
  const normalized = text.trim().toLowerCase();

  // Try blob parsers first (for skills with Descript columns like Willpower)
  const willpowerMods = parseWillpowerBlob(normalized);
  if (willpowerMods !== undefined) {
    return willpowerMods.map((mod) => ({ mod }));
  }

  // Try template-based parsers
  for (const parser of allSupportParsers) {
    const mods = parser.parse(normalized);
    if (mods !== undefined) {
      return mods.map((mod) => ({ mod }));
    }
  }
  return undefined;
};

export const parseSupportAffixes = (
  affixes: string[],
): (SupportMod[] | undefined)[] => {
  return affixes.map((text) => parseSupportAffix(text));
};
