# Mod Parser

Converts strings → typed Mods: `parseMod(input: string): Mod[] | undefined`

## Architecture

The parser uses a **template-based** system defined in `src/tli/mod_parser/templates.ts`:

```typescript
// Template matching flow
parseMod(input) {
  const normalized = input.trim().toLowerCase();
  for (const parser of allParsers) {
    const result = parser.parse(normalized);
    if (result !== undefined) return result;
  }
  return undefined; // unrecognized
}
```

## Template Syntax

```typescript
import { t, spec } from "./template";

// Simple template
t("{value:dec%} all stats").output("StatPct", (c) => ({
  value: c.value,
  statModType: "all" as const,
})),

// With optional parts
t("{value:dec%} [additional] [{modType:DmgModType}] damage").output("DmgPct", (c) => ({
  value: c.value,
  dmgModType: c.modType ?? "global",
  addn: c.additional !== undefined,
})),

// Multi-output
t("{value:dec%} attack and cast speed").outputMany([
  spec("AspdPct", (c) => ({ value: c.value, addn: false })),
  spec("CspdPct", (c) => ({ value: c.value, addn: false })),
]),
```

**Capture types:**
- `{name:int}` - Integer
- `{name:dec}` - Decimal
- `{name:dec%}` - Percentage as number (e.g., "96%" → 96)
- `{name:EnumType}` - Enum lookup

**Optional syntax:**
- `[keyword]` - Optional literal, sets `c.keyword?: true`
- `[{name:Type}]` - Optional capture

## Key Files

| Purpose | File |
|---------|------|
| Mod type definitions | `src/tli/mod.ts` |
| Parser templates | `src/tli/mod_parser/templates.ts` |
| Enum mappings | `src/tli/mod_parser/enums.ts` |
| Tests | `src/tli/mod_parser.test.ts` |

## Adding New Parser

See the **`adding-mod-parsers`** skill for detailed implementation guide.

Quick steps:
1. Check/add mod type in `mod.ts`
2. Add template in `templates.ts`
3. Add enum mapping in `enums.ts` (if needed)
4. Update handler in `calcs/offense.ts` (if needed)
5. Add tests

## Template Ordering

**IMPORTANT:** Specific patterns must come before generic ones:

```typescript
// Good order
t("{value:dec%} all stats"),           // Specific
t("{value:dec%} {statModType:StatWord}"), // Generic
```

## Testing

```bash
pnpm test src/tli/mod_parser.test.ts
```
