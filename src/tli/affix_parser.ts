import { Affix, AffixOfType } from "./affix";
import {
  DmgModType,
  DMG_MOD_TYPES,
  CritRatingModType,
  CRIT_RATING_MOD_TYPES,
} from "./constants";

const isValidDmgModType = (value: string): value is DmgModType => {
  return DMG_MOD_TYPES.includes(value as DmgModType);
};

const isValidCritRatingModType = (
  value: string
): value is CritRatingModType => {
  return CRIT_RATING_MOD_TYPES.includes(value as CritRatingModType);
};

const parseDmgPct = (
  input: string
): AffixOfType<"DmgPct"> | undefined => {
  // Regex to parse: +9% [additional] [fire] damage
  const pattern =
    /^([+-])?(\d+(?:\.\d+)?)%\s+(?:(additional)\s+)?(?:(\w+)\s+)?damage$/i;
  const match = input.match(pattern);

  if (!match) {
    return undefined;
  }

  // Extract components
  const percentageStr = match[2];
  const hasAdditional = match[3] !== undefined;
  const damageTypeWord = match[4];

  // Convert percentage to decimal
  const value = parseFloat(percentageStr) / 100;

  // Determine addn flag
  const addn = hasAdditional;

  // Determine modType
  let modType: DmgModType = "global";
  if (damageTypeWord) {
    const lowerDamageType = damageTypeWord.toLowerCase();
    if (isValidDmgModType(lowerDamageType)) {
      modType = lowerDamageType;
    } else {
      // Invalid damage type - not a valid DmgPct affix
      return undefined;
    }
  }

  return {
    type: "DmgPct",
    value,
    modType,
    addn,
  };
};

const parseCritRatingPct = (
  input: string
): AffixOfType<"CritRatingPct"> | undefined => {
  // Regex to parse: +10% [Attack] Critical Strike Rating
  // The type word comes before "Critical Strike Rating"
  const pattern =
    /^([+-])?(\d+(?:\.\d+)?)%\s+(?:(\w+)\s+)?critical\s+strike\s+rating$/i;
  const match = input.match(pattern);

  if (!match) {
    return undefined;
  }

  // Extract components
  const percentageStr = match[2];
  const modTypeWord = match[3];

  // Convert percentage to decimal
  const value = parseFloat(percentageStr) / 100;

  // Determine modType
  let modType: CritRatingModType = "global";
  if (modTypeWord) {
    const lowerModType = modTypeWord.toLowerCase();
    if (isValidCritRatingModType(lowerModType)) {
      modType = lowerModType;
    } else {
      // Invalid mod type - not a valid CritRatingPct affix
      return undefined;
    }
  }

  return {
    type: "CritRatingPct",
    value,
    modType,
  };
};

export const parseAffix = (input: string): Affix | undefined => {
  const normalized = input.trim();

  // Try each parser in order
  const parsers = [
    parseDmgPct,
    parseCritRatingPct,
    // Add more parsers here as they're implemented
    // parseCritDmgPct,
    // etc.
  ];

  for (const parser of parsers) {
    const result = parser(normalized);
    if (result !== undefined) {
      return result;
    }
  }

  // No parser matched
  return undefined;
};
