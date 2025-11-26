# CLAUDE.md

Next.js 16 + React 19 + TypeScript character build planner for Torchlight Infinite.

## Architecture

- **UI** ([src/app/](src/app/)) - React components, localStorage state
- **Calculation Engine** ([src/tli/offense.ts](src/tli/offense.ts)) - DPS/stat calculations
- **Mod Parser** ([src/tli/mod_parser.ts](src/tli/mod_parser.ts)) - String → typed Mod conversion
- **Data Models** ([src/tli/core.ts](src/tli/core.ts), [src/tli/mod.ts](src/tli/mod.ts)) - Type definitions
- **Gear Affixes** ([src/tli/gear_affix_data/](src/tli/gear_affix_data/)) - 5,625 typed gear affixes

## Key Conventions

**Code Style:**
- Use `const` arrow functions, not `function` declarations
- Derive types from const arrays: `const X = [...] as const; type T = (typeof X)[number]`
- No backwards compatibility for localStorage schemas

**Data Flow:**
```
RawLoadout (UI, strings) → parseMod() → Loadout (typed Mods) → calculateOffense() → Results
```

**Testing:** Use existing test files, run with `pnpm test <file>`

## Common Tasks

**Add mod type:** Define in [mod.ts](src/tli/mod.ts) → parser in [mod_parser.ts](src/tli/mod_parser.ts) → handler in [offense.ts](src/tli/offense.ts) → test

**Add skill:** Add to `offensiveSkillConfs` in [offense.ts](src/tli/offense.ts), type auto-updates

**Update talent trees:** `pnpm exec tsx src/scripts/save_all_profession_trees.ts`

**Regenerate gear affixes:** `pnpm exec tsx src/scripts/generate_gear_affix_data.ts`

## Code Generation Pattern

For large datasets (5k+ entries), use build-time code generation:
1. Script in `src/scripts/` reads JSON data
2. Groups/transforms data into TypeScript const arrays
3. Generates files with `satisfies readonly T[]` for type safety
4. Exports discriminated union from const array types
5. See [generate_gear_affix_data.ts](src/scripts/generate_gear_affix_data.ts) for reference

## Detailed Docs

See [.claude/docs/](.claude/docs/) for implementation details only when needed.
