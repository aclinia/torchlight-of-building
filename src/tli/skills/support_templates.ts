import type { SupportSkillName } from "@/src/data/skill";
import type { Mod } from "../mod";

export type ModWithoutValue = Mod extends infer M
  ? M extends Mod
    ? Omit<M, "value">
    : never
  : never;

export type SkillModTemplate = {
  levelMods?: ModWithoutValue[];
};

export const skillModTemplates: Partial<
  Record<SupportSkillName, SkillModTemplate>
> = {
  Willpower: {
    levelMods: [
      { type: "MaxWillpowerStacks" },
      {
        type: "DmgPct",
        modType: "global",
        addn: false,
        per: { stackable: "willpower" },
      },
    ],
  },
  Haunt: {
    levelMods: [
      { type: "ShadowQuant" },
      { type: "DmgPct", modType: "global", addn: true },
    ],
  },
  Steamroll: {
    levelMods: [
      { type: "AspdPct", addn: false },
      { type: "DmgPct", modType: "melee", addn: true },
      { type: "DmgPct", modType: "ailment", addn: true },
    ],
  },
  "Quick Decision": {
    levelMods: [{ type: "AspdAndCspdPct", addn: true }],
  },
  "Critical Strike Damage Increase": {
    levelMods: [{ type: "CritDmgPct", addn: true, modType: "global" }],
  },
  "Critical Strike Rating Increase": {
    levelMods: [{ type: "CritRatingPct", modType: "global" }],
  },
  "Enhanced Ailment": {
    levelMods: [{ type: "DmgPct", modType: "ailment", addn: true }],
  },
  "Well-Fought Battle": {
    levelMods: [{ type: "SkillEffPct", per: { stackable: "skill_use" } }],
  },
  "Mass Effect": {
    levelMods: [
      { type: "SkillEffPct", per: { stackable: "skill_charges_on_use" } },
    ],
  },
};
