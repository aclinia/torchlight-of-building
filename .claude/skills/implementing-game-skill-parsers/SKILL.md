---
name: implementing-game-skill-parsers
description: Use when implementing skill data generation from HTML sources for game build planners - guides the parser-template-generation pattern for extracting level-scaling values
---

# Implementing Game Skill Parsers

## Overview

Skill data generation follows a **parser-template-generation** pattern:
1. **Template** defines structure (mod types, properties)
2. **Parser** extracts numeric values from HTML/data sources
3. **Generation script** combines templates with parsed values

**Critical:** Parser array order MUST match template array order.

**Index calculation:** If template has 2 levelOffense + 1 levelMods + 1 levelBuffMods, parser returns `[offense0, offense1, mods0, buffMods0]` and buffMods value is at `parsedValues[2+1+0] = parsedValues[3]`.

## When to Use

- Adding new skills with level-scaling properties
- Adding new property types (levelOffense, levelMods, levelBuffMods, etc.)
- Extracting values from game data HTML pages

## Project File Locations

| Purpose | File Path |
|---------|-----------|
| Active templates | `src/tli/skills/active_templates.ts` |
| Support templates | `src/tli/skills/support_templates.ts` |
| Active parsers | `src/scripts/skills/active_parsers.ts` |
| Support parsers | `src/scripts/skills/support_parsers.ts` |
| Parser registry | `src/scripts/skills/index.ts` |
| Generation script | `src/scripts/generate_skill_data.ts` |
| HTML data sources | `.garbage/tlidb/skill/{category}/{Skill_Name}.html` |

**Categories:** `active`, `support`, `passive`, `activation_medium`, `support_magnificent`, `support_noble`

## Implementation Checklist

### 1. Identify Data Source
- HTML file at `.garbage/tlidb/skill/{category}/{Skill_Name}.html`
- Find Progression /40 table - columns are: level, col0, col1, col2 (Descript)
- **Column indexing:** `values[0]` = first column after level, `values[2]` = Descript
- Input is clean text (HTML already stripped by `buildProgressionTableInput`)

### 2. Define Template (if new property type)
```typescript
// In templates file (e.g., active_templates.ts)
"Skill Name": {
  levelBuffMods: [
    { type: "DmgPct", addn: true, modType: "cold", cond: "enemy_frostbitten" },
  ],
}
```

### 3. Create Parser
```typescript
// In active_parsers.ts or support_parsers.ts
import { parseNumericValue, validateAllLevels } from "./progression_table";
import type { SupportLevelParser } from "./types";

export const skillNameParser: SupportLevelParser = (input) => {
  const { skillName, progressionTable } = input;
  const levels: Record<number, number> = {};

  for (const [levelStr, values] of Object.entries(progressionTable.values)) {
    const level = Number(levelStr);
    const text = values[2]; // Descript column (0-indexed after level)

    if (text) {
      // Match pattern like "23.5% additional Cold Damage" or "+24% additional..."
      const match = text.match(/[+]?([\d.]+)%\s+additional\s+Cold\s+Damage/i);
      if (match) {
        levels[level] = parseNumericValue(match[1], { asPercentage: true });
      }
    }
  }

  validateAllLevels(levels, skillName);
  return [levels]; // Order MUST match template array order
};
```

### 4. Register Parser
```typescript
// In index.ts
{ skillName: "Skill Name", categories: ["active"], parser: skillNameParser }
```

### 5. Update Generation Script (if new property type)
In `generate_skill_data.ts`, find the active skill processing section (~line 800) and:

```typescript
// 1. Add variable declaration
let levelNewProp: BaseActiveSkill["levelNewProp"];

// 2. Update expected count calculation
const newPropCount = template.levelNewProp?.length ?? 0;
const expectedCount = offenseCount + modsCount + newPropCount;

// 3. Build array from parsed values (after existing property handling)
if (template.levelNewProp !== undefined && newPropCount > 0) {
  levelNewProp = template.levelNewProp.map((modTemplate, i) => {
    const levels = parsedValues[offenseCount + modsCount + i];
    return { template: modTemplate, levels };
  });
}

// 4. Include in skill entry
const skillEntry: BaseActiveSkill = {
  ...baseSkill,
  ...(levelNewProp !== undefined && { levelNewProp }),
};
```

### 6. Verify Output
Run generation, then check output for levels 1, 20, 40 against source HTML.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using HTML regex on clean text | Input is already `.text().trim()` - no HTML tags |
| Wrong array order | Parser returns must match template definition order |
| Missing generation script update | New property types need handling in generation |
| Forgetting parser registration | Add to SKILL_PARSERS array |

## Data Flow

```
HTML Source → buildProgressionTableInput (strips HTML)
           → Parser (extracts values per level)
           → Template (defines mod structure)
           → Generation Script (combines template + values)
           → Output TypeScript file
```
