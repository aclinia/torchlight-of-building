# Calculation Engine

Entry point: `calculateOffense(loadout: Loadout, skill: Skill, configuration: Configuration): OffenseSummary`

## Flow

1. Collect mods from loadout (`collectMods`)
2. Calculate gear damage (`calculateGearDmg`) - weapon base + weapon affixes
3. Calculate flat damage (`calculateFlatDmg`) - from `FlatDmgToAtks` and `FlatDmgToAtksAndSpells` mods
4. Calculate skill hit (`calculateSkillHit`):
   - Weapon damage scaled by skill-specific multiplier
   - Flat damage scaled by `addedDmgEffPct`
   - Sum weapon + flat damage
   - Apply % modifiers based on skill tags
5. Calculate crit stats
6. Calculate attack speed
7. Compute DPS: `avgDps = avgHitWithCrit * aspd`

## Key Mechanics

**Increased vs More:**

- `addn: false` (increased): Sum all, then multiply once → `base * (1 + sum)`
- `addn: true` (more): Multiply separately → `base * (1 + m1) * (1 + m2) * ...`

**Skill Tags:**

- Skills have tags: `["Attack", "Melee", "Area"]`
- `DmgPct` with `modType: "melee"` only applies if skill has `"Melee"` tag
- `DmgPct` with `modType: "global"` always applies

**Damage Types:** 5 elements calculated separately

- `DmgModType`: global, melee, area, attack, spell, physical, cold, lightning, fire, erosion, elemental

**Stat Scaling:** `0.005` (0.5%) per point of STR/DEX/INT

**Flat Damage:**

Flat damage comes from mods like `FlatDmgToAtks` and `FlatDmgToAtksAndSpells`. Each mod has a damage type (`physical`, `cold`, `lightning`, `fire`, `erosion`) and a value range (min/max).

Order of operations:
```
skillBaseDmg = (weaponDmg × skillWeaponMult) + (flatDmg × addedDmgEffPct)
finalDmg = skillBaseDmg × (1 + incDmgPct) × moreDmgMult
```

- `addedDmgEffPct`: Skill-specific multiplier for flat damage (defined in `skill_confs.ts`)
- Example: Berserking Blade has `addedDmgEffPct: 2.1`, so flat damage is multiplied by 2.1×
- Flat damage stacks additively before % modifiers are applied
- % damage modifiers (like `+50% physical damage`) apply to the combined base

## Special Systems

**Fervor** (only when `configuration.fervor.enabled`):

- Crit rating: `fervorPoints * 0.02 * (1 + totalFervorEff)`
- Crit dmg: `CritDmgPerFervor` mods sum as "increased"

**Critical Strike:**

- Crit chance: `min(critRating / 100, 1.0)` (capped at 100%)
- Base crit dmg: `1.5` (150%, i.e., 50% extra)
- Avg dmg: `baseDmg * (1 - critChance) + baseDmg * critDmgMult * critChance`

**Attack Speed:**

- Base from `GearBaseAspd` mod
- Apply increased mods (`addn: false`), then more mods (`addn: true`)

## Adding Features

**New mod type:**

1. Define in [mod.ts](../src/tli/mod.ts)
2. Handle in [offense.ts](../src/tli/offense.ts): `filterMod(mods, "NewMod")`
3. Add parser (see [mod-parser.md](mod-parser.md))
4. Write tests in [offense.test.ts](../src/tli/offense.test.ts)

**New skill:**
Add to `offensiveSkillConfs` array in [offense.ts](../src/tli/offense.ts), type auto-updates

## Helpers

```typescript
// Find/filter mods with type narrowing
const mod = findMod(mods, "DmgPct");
const allMods = filterMod(mods, "DmgPct");
```
