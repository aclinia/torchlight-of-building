# Mod Parser Template DSL

A declarative DSL for parsing game mod strings into typed `Mod` objects.

## Template Syntax

### Captures

Use `{name:type}` to capture a value:

```typescript
t("{value:dec%} damage"); // Captures: { value: number }
```

**Types:**
| Type | Pattern | Result |
|------|---------|--------|
| `int` | `[+-]?\d+` | `number` |
| `dec` | `[+-]?\d+(?:\.\d+)?` | `number` |
| `int%` | `[+-]?\d+%` | `number / 100` |
| `dec%` | `[+-]?\d+(?:\.\d+)?%` | `number / 100` |
| `EnumName` | `\w+` | Validated enum value |

### Optionals

Use `[content]` to make content optional:

```typescript
// Optional literal word (presence detection)
t("{value:dec%} [additional] damage");
// Captures: { value: number; additional?: true }
// Use: c.additional !== undefined

// Optional capture
t("{value:dec%} [{modType:DmgModType}] damage");
// Captures: { value: number; modType?: DmgModType }
```

### Alternations

Use `(a|b|c)` for alternation:

```typescript
t(
  "adds {value:dec%} of {from:DmgChunkType} damage (to|as) {to:DmgChunkType} damage",
);
```

To extract the matched alternative, use `.capture()`:

```typescript
t("{value:dec%} (elemental|erosion) resistance penetration").capture(
  "penType",
  (m) => m[2].toLowerCase() as "elemental" | "erosion",
);
```

Note: `m[0]` is the full match, `m[1]` is the first capture, etc. Count capture groups left-to-right.

### Escape Sequences

Use `\` to escape special characters:

```typescript
t("stacks up to {limit:int} time\\(s\\)"); // Matches "time(s)"
```

## Builder API

### `.enum(name, mapping)`

Override enum value mapping:

```typescript
t("{value:dec} {statType:StatWord}").enum("StatWord", {
  strength: "str",
  dexterity: "dex",
  intelligence: "int",
});
```

### `.capture(name, extractor)`

Add custom capture extraction:

```typescript
t("{value:dec%} (cold|fire|lightning) penetration").capture(
  "penType",
  (m) => m[2].toLowerCase() as "cold" | "fire" | "lightning",
);
```

### `.output(modType, mapper)`

Create a single-mod parser:

```typescript
t("{value:dec%} [additional] [{modType:DmgModType}] damage").output(
  "DmgPct",
  (c) => ({
    value: c.value,
    modType: c.modType ?? "global",
    addn: c.additional !== undefined,
  }),
);
```

### `.outputMany(specs)`

Create a multi-mod parser (one input -> multiple mods):

```typescript
t(
  "adds {min:int} - {max:int} {dmgType:DmgChunkType} damage to attacks and spells",
).outputMany([
  {
    type: "FlatDmgToAtks",
    mod: (c) => ({ value: { min: c.min, max: c.max }, dmgType: c.dmgType }),
  },
  {
    type: "FlatDmgToSpells",
    mod: (c) => ({ value: { min: c.min, max: c.max }, dmgType: c.dmgType }),
  },
]);
```

## Combining Parsers

### `t.multi(builders)`

Combine builders that share the same output:

```typescript
t.multi([
  t("{value:dec%} elemental resistance penetration"),
  t("{value:dec%} erosion resistance penetration"),
]).output("ResPenPct", (c) => ({ value: c.value, penType: "all" }));
```

## Adding a New Parser

1. Add template to `templates.ts`:

   ```typescript
   export const MyMod = t("{value:dec%} my mod pattern").output(
     "MyModType",
     (c) => ({ value: c.value }),
   );
   ```

2. Add to parser list in `index.ts` (order matters - more specific patterns first)

3. If using new enum, register in `enums.ts`:

   ```typescript
   registerEnum("MyEnumType", MY_ENUM_VALUES);
   ```

4. If new mod type, add to `ModDefinitions` in `mod.ts`
