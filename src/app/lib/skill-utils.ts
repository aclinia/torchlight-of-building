import type {
  ActiveSkill,
  BaseSkill,
  InferredSkillKind,
  SupportSkill,
  SupportTarget,
} from "@/src/data/skill/types";

type TargetSkill = ActiveSkill | BaseSkill;

const matchesTarget = (skill: TargetSkill, target: SupportTarget): boolean => {
  if (target === "any") return true;

  // Matches Spell skills excluding Summon, Channeled, Sentry
  if (target === "spell_burst") {
    const tags = skill.tags;
    return (
      tags.includes("Spell") &&
      !tags.includes("Summon") &&
      !tags.includes("Channeled") &&
      !tags.includes("Sentry")
    );
  }

  // InferredSkillKind string - only active skills have kinds
  if (typeof target === "string") {
    if (skill.type !== "Active") return false;
    return (skill as ActiveSkill).kinds.includes(target as InferredSkillKind);
  }

  // { skillType: "active" | "passive" }
  if ("skillType" in target) {
    if (target.skillType === "active") return skill.type === "Active";
    if (target.skillType === "passive") return skill.type === "Passive";
    return false;
  }

  // { tags: SkillTag[] } - must have ALL specified tags
  if ("tags" in target) {
    return target.tags.every((tag) => skill.tags.includes(tag));
  }

  return false;
};

export const canSupport = (
  skill: TargetSkill,
  supportSkill: SupportSkill,
): boolean => {
  // cannotSupportTargets takes precedence
  if (supportSkill.cannotSupportTargets.some((t) => matchesTarget(skill, t))) {
    return false;
  }

  // Check if any supportTarget matches
  return supportSkill.supportTargets.some((t) => matchesTarget(skill, t));
};
