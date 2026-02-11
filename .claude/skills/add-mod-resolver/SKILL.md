---
name: add-mod-resolver
description: Use when adding new push* resolver functions inside resolveModsForOffenseSkill to handle mod-based combat mechanics like tangles, debuffs, or conditional damage bonuses (project)
---

# Adding Mod Resolvers

## Overview

Mod resolvers are `push*` functions defined inside `resolveModsForOffenseSkill` in `src/tli/calcs/offense.ts`. They read from the `mods` array (and optionally `config`, `prenormMods`, `resourcePool`, `defenses`) and push new derived mods based on game mechanics. Each resolver handles one mechanic (e.g., frostbite, numbed, tangles, infiltrations).

## When to Use

- Adding a new combat mechanic that derives mods from existing mods or configuration
- Adding conditional damage bonuses based on presence of a flag mod (e.g., `IsTangle`, `WindStalker`)
- Adding enemy debuff calculations (e.g., numbed stacks, frostbite, frail)
- Adding buff/aura effect calculations with effect multipliers

## Project File Locations

| Purpose | File Path |
|---------|-----------|
| Resolver function location | `src/tli/calcs/offense.ts` (inside `resolveModsForOffenseSkill`) |
| Mod type definitions | `src/tli/mod.ts` (`ModDefinitions` interface) |
| Configuration interface & defaults | `src/tli/core.ts` (`Configuration`, `DEFAULT_CONFIGURATION`) |
| Mod helper utilities | `src/tli/calcs/mod-utils.ts` |
| Tests | `src/tli/calcs/offense.test.ts` |

## Architecture

`resolveModsForOffenseSkill` is a large function that:
1. Starts with base mods from gear, talents, skills, etc.
2. Runs a sequence of `push*` resolver functions that read and mutate the shared `mods` array
3. Returns a `DerivedOffenseCtx` with the final resolved `mods` array

Each `push*` function is a closure inside `resolveModsForOffenseSkill` that captures:
- `mods: Mod[]` — the shared mutable array of resolved mods
- `prenormMods` — mods needing per-stackable normalization
- `config: Configuration` — user-configured combat parameters
- `resourcePool` — stats, mana, blessings, etc.
- `defenses` — armor, evasion, resistances, etc.
- `loadout: Loadout` — full parsed loadout
- Helper functions: `pm()` (push mods), `normalize()` (normalize stackables), `step()` (dependency tracking)

## Available Helpers

From closure (defined in `resolveModsForOffenseSkill`):
- `pm(...ms: Mod[])` — shorthand for `mods.push(...ms)`
- `normalize(stackable, value)` — normalizes per-stackable mods and filters by condThreshold
- `step(stepName)` — registers a step for dependency tracking (only needed if other steps depend on this one)

From `src/tli/calcs/mod-utils.ts`:
- `modExists(mods, "ModType")` — returns `boolean`, checks if any mod of that type exists
- `findMod(mods, "ModType")` — returns first mod of type or `undefined`
- `filterMods(mods, "ModType")` — returns all mods of type as `ModT<T>[]`
- `sumByValue(mods)` — sums `.value` of all mods in array
- `calcEffMult(mods, "ModType")` — calculates `(1 + sum_of_inc) * product_of_addn` multiplier
- `multModValue(mod, multiplier)` — returns new mod with `.value` multiplied

## Implementation Checklist

### 1. Ensure the Trigger Mod Type Exists

Check `src/tli/mod.ts` under `ModDefinitions`. If the flag mod (e.g., `IsTangle`) doesn't exist, add it:

```typescript
// In ModDefinitions
IsTangle: object;  // flag mod, no fields
```

For mods with data:
```typescript
NumbedEffPct: { value: number };
```

### 2. Ensure Configuration Fields Exist (if needed)

If the resolver needs user-configurable values, ensure they exist in `src/tli/core.ts`. Use the `/add-configuration` skill if they don't.

### 3. Write the push* Function

Define the function inside `resolveModsForOffenseSkill`, near related resolvers. Follow these patterns:

**Simple flag-based resolver (multiplies damage by a config value):**
```typescript
const pushTangle = (): void => {
  if (!modExists(mods, "IsTangle") || config.numTangles <= 1) return;
  mods.push({
    type: "DmgPct",
    dmgModType: "global",
    addn: true,
    value: (config.numTangles - 1) * 100,
    src: "Tangle",
  });
};
```

**Debuff with effect multiplier:**
```typescript
const pushNumbed = (): void => {
  if (!config.enemyNumbed) return;
  const numbedStacks = config.enemyNumbedStacks ?? 10;
  const numbedEffMult = calcEffMult(mods, "NumbedEffPct");
  const baseValPerStack = 5;
  const numbedVal = baseValPerStack * numbedEffMult * numbedStacks;
  mods.push({
    type: "DmgPct",
    value: numbedVal,
    dmgModType: "lightning",
    addn: true,
    isEnemyDebuff: true,
    src: "Numbed",
  });
};
```

**Buff with effect multiplier (e.g., aggression, mark):**
```typescript
const pushMark = (): void => {
  if (!config.targetEnemyMarked) return;
  const markEffMult = calcEffMult(mods, "MarkEffPct");
  const baseValue = 20;
  mods.push({
    type: "CritDmgPct",
    value: baseValue * markEffMult,
    addn: true,
    modType: "global",
    isEnemyDebuff: true,
    src: "Mark",
  });
};
```

**Resolver with per-stackable normalization:**
```typescript
const pushPactspirits = () => {
  const addedMaxStacks = sumByValue(filterMods(mods, "MaxPureHeartStacks"));
  const maxStacks = 5 + addedMaxStacks;
  const stacks = config.pureHeartStacks ?? maxStacks;
  normalize("pure_heart", stacks);
};
```

**Resolver with step dependencies (rare, only when other resolvers depend on this one):**
```typescript
const pushSpellAggression = (): void => {
  step("spellAggression");
  if (!config.hasSpellAggression && !modExists(mods, "HasSpellAggression")) return;
  const mult = calcEffMult(mods, "SpellAggressionEffPct");
  mods.push({
    type: "CspdPct",
    value: 7 * mult,
    addn: true,
    src: "Spell Aggression",
  });
};
```

If using `step()`, also register the step in `stepDeps` (above `resolveModsForOffenseSkill`):
```typescript
const stepDeps = createSelfReferential({
  // ... existing steps ...
  newStep: ["dependency1"],  // list steps that must run before this one
});
```

### 4. Call the Function

Add the call in the execution sequence inside `resolveModsForOffenseSkill`. Place it near related mechanics. The current call order is roughly:

```
pushStatNorms → pushDefenseNorms → pushBerserkingBlade → pushTradeoff →
pushWhimsy → pushAttackAggression → pushSpellAggression → pushMark →
pushMspd → pushInfiltrations → pushTrinity → pushNumbed → pushFrostbite →
pushChainLightning → pushFrail → pushYouga2 → pushMaxSpellBurst →
pushMindControlLinks → (torment, affliction, normalizations) →
pushPactspirits → pushTangle → pushSpellBurstChargeSpeed →
pushErika1 → pushMultistrike → return
```

### 5. Verify

```bash
pnpm test
pnpm typecheck
pnpm check
```

## Common Patterns

| Pattern | When to Use | Key Helper |
|---------|-------------|------------|
| Check flag mod exists | Mechanic only applies when a specific support/skill mod is present | `modExists(mods, "FlagMod")` |
| Check config boolean | Mechanic depends on user toggle | `if (!config.someToggle) return` |
| Effect multiplier | Buff/debuff has mods that scale its effectiveness | `calcEffMult(mods, "SomeEffPct")` |
| Config stacks with default | User can override stack count, defaults to max | `config.someStacks ?? maxStacks` |
| Normalize stackable | Mechanic involves per-stackable scaling | `normalize("stackable_name", value)` |
| `addn: true` on DmgPct | More multiplier (multiplicative with other `addn: true` mods) | — |
| `addn: false` on DmgPct | Increased multiplier (additive with other `addn: false` mods) | — |
| `isEnemyDebuff: true` | Damage increase from enemy debuff (for display grouping) | — |
| `src: "Name"` | Label for debug/display panel | — |

## DmgPct addn Field

The `addn` (additional) field on `DmgPct` controls how the damage bonus stacks:

- `addn: false` — **Increased** damage. All `addn: false` mods sum together into one multiplier: `(1 + sum)`.
- `addn: true` — **More** damage. Each `addn: true` mod is its own separate multiplier: `(1 + value1) * (1 + value2) * ...`

Most resolvers use `addn: true` because their effects are multiplicative with other damage sources.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Forgetting early return when flag/config is absent | Always guard with `if (!condition) return` |
| Using `addn: false` when the mechanic should be multiplicative | Use `addn: true` for separate "more" multipliers |
| Pushing mods without `src` | Always include `src` for debug panel visibility |
| Forgetting to add config field | Use `/add-configuration` skill first |
| Adding `step()` unnecessarily | Only use `step()` if other resolvers depend on this one running first |
| Not handling undefined config with `??` | Optional config values need fallback: `config.stacks ?? defaultMax` |
