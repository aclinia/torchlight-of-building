# Documentation for generate_skill_data.ts

## Overview

`src/scripts/generate_skill_data.ts` is a code generation script that reads skill HTML files from the tlidb database and generates typed TypeScript files containing skill data for the application.

**Run command:** `pnpm exec tsx src/scripts/generate_skill_data.ts`

## Data Flow

```
.garbage/tlidb/skill/{category}/*.html
        ↓
   extractSkillFromTlidbHtml() - parses HTML with cheerio
        ↓
   RawSkill (intermediate format)
        ↓
   Skill-type-specific processing:
   - Active → classifyWithRegex() for kinds, activeSkillTemplates for levelOffense/levelMods
   - Support → parseSupportTargets(), skillModTemplates for levelMods
   - Magnificent/Noble → parseSkillSupportTarget() for specific skill name
   - Passive → mainStats extraction
        ↓
   src/data/skill/{type}.ts (generated TypeScript)
```

## Input Source

Reads HTML files from `.garbage/tlidb/skill/` organized by category:
- `active/` → Active skills
- `passive/` → Passive skills
- `support/` → Generic support skills
- `magnificent_support/` → Magnificent support skills (enhance specific skills)
- `noble_support/` → Noble support skills (enhance specific skills)
- `activation_medium/` → Activation medium skills

Each HTML file contains skill cards with season versions. The script prioritizes "SS10Season" (current season) data.

## Output Files

Generates TypeScript files in `src/data/skill/`:
- `active.ts` - `ActiveSkills` const array
- `passive.ts` - `PassiveSkills` const array
- `support.ts` - `SupportSkills` const array
- `support_magnificent.ts` - `MagnificentSupportSkills` const array
- `support_noble.ts` - `NobleSupportSkills` const array
- `activation_medium.ts` - `ActivationMediumSkills` const array

## Key Functions

### HTML Parsing

**`extractSkillFromTlidbHtml(file: TlidbSkillFile): RawSkill`**
- Loads HTML with cheerio
- Finds the current season card (SS10Season or first non-previousItem)
- Extracts: name, tags, description, mainStats
- If a parser is registered for this skill, also extracts `parsedLevelModValues` from progression table

### Tag Parsing

**`parseTagsFromString(tagString, skillName): SkillTag[]`**
- Handles compound tags with spaces (e.g., "Base Skill", "Spirit Magus")
- Maps edge cases like "Slash Strike" → "Slash-Strike"
- Validates all tags against `SKILL_TAGS` constant

### Support Target Parsing

**`parseSupportTargets(description, skillName): ParsedSupportTargets`**
- Parses first description line for support targeting rules
- Handles special patterns like:
  - "Supports DoT Skills and skills that can inflict Ailment"
  - "Supports Spell Skills that deal damage"
  - "Supports Attack and Spell Skills"
- Also parses "Cannot support" exclusion rules
- Returns `{ supportTargets, cannotSupportTargets }`

**`parseSkillSupportTarget(description): string`**
- For Magnificent/Noble supports, extracts the specific skill name from "Supports \<SkillName\>."

### Skill Kind Classification

Uses `classifyWithRegex()` from `skill_kind_patterns.ts` to infer what an active skill does:
- `deal_damage` - Skills that deal damage
- `dot` - Damage over time skills
- `hit_enemies` - Skills that hit enemies
- `inflict_ailment` - Skills that can apply ailments
- `summon_minions`, `summon_spirit_magus`, `summon_synthetic_troops`

### Level-Scaling Mod Parsing

For skills with registered parsers in `src/scripts/skills/index.ts`:
1. Looks up parser by skill name and category
2. Extracts progression table from HTML (levels 1-40)
3. Parser extracts numeric values per level
4. Values are combined with templates from `active_templates.ts` or `support_templates.ts`

## Template System

Templates define the mod structure without values:
- `src/tli/skills/support_templates.ts` - `skillModTemplates` for support skills
- `src/tli/skills/active_templates.ts` - `activeSkillTemplates` for active skills

Templates specify `levelMods` (general mods) and `levelOffense` (offensive stats like weapon damage %).

The generated output combines templates with parsed level values:
```ts
levelMods: [{
  template: { type: "ModType" },
  levels: { 1: 10, 2: 12, ... 40: 100 }
}]
```

## Adding New Skills with Level Scaling

1. **Add parser** in `src/scripts/skills/` that extracts values from progression table
2. **Register parser** in `src/scripts/skills/index.ts` with skill name and category
3. **Add template** in appropriate templates file with mod structure
4. **Re-run script** to regenerate data files

## Validation

The script validates:
- All tags are known (throws on unknown tags)
- All support skills have parseable support targets
- Parser output matches template expectations (array length)
- All 40 levels present in parsed data

## Test Skill

A `[Test] Simple Attack` skill is automatically added to active skills for testing purposes (see `createTestActiveSkill()`).
