import { frostSpikeParser, iceBondParser } from "./active_parsers";
import {
  criticalStrikeDamageIncreaseParser,
  criticalStrikeRatingIncreaseParser,
  enhancedAilmentParser,
  hauntParser,
  quickDecisionParser,
  steamrollParser,
  willpowerParser,
} from "./support_parsers";
import type { SkillCategory, SkillParserEntry } from "./types";

export const SKILL_PARSERS: SkillParserEntry[] = [
  {
    skillName: "Willpower",
    categories: ["support"],
    parser: willpowerParser,
  },
  {
    skillName: "Haunt",
    categories: ["support"],
    parser: hauntParser,
  },
  {
    skillName: "Steamroll",
    categories: ["support"],
    parser: steamrollParser,
  },
  {
    skillName: "Quick Decision",
    categories: ["support"],
    parser: quickDecisionParser,
  },
  {
    skillName: "Critical Strike Damage Increase",
    categories: ["support"],
    parser: criticalStrikeDamageIncreaseParser,
  },
  {
    skillName: "Critical Strike Rating Increase",
    categories: ["support"],
    parser: criticalStrikeRatingIncreaseParser,
  },
  {
    skillName: "Enhanced Ailment",
    categories: ["support"],
    parser: enhancedAilmentParser,
  },
  {
    skillName: "Frost Spike",
    categories: ["active"],
    parser: frostSpikeParser,
  },
  {
    skillName: "Ice Bond",
    categories: ["active"],
    parser: iceBondParser,
  },
];

export const getParserForSkill = (
  skillName: string,
  category: SkillCategory,
): SkillParserEntry | undefined => {
  return SKILL_PARSERS.find(
    (entry) =>
      entry.skillName === skillName && entry.categories.includes(category),
  );
};
