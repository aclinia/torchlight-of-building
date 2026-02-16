import { z } from "zod";

import { EquipmentTypeSchema, GearRaritySchema } from "./common.schema";

// Normalize legacy snake_case keys to camelCase before validation
const normalizeGearInput = (data: unknown): unknown => {
  if (typeof data !== "object" || data === null) return data;
  const d = data as Record<string, unknown>;
  return {
    ...d,
    baseAffixes: d.baseAffixes ?? d.base_affixes,
    blendAffix: d.blendAffix ?? d.blend_affix,
    sweetDreamAffix: d.sweetDreamAffix ?? d.sweet_dream_affix,
    towerSequenceAffix: d.towerSequenceAffix ?? d.tower_sequence_affix,
    legendaryAffixes: d.legendaryAffixes ?? d.legendary_affixes,
    customAffixes: d.customAffixes ?? d.custom_affixes,
  };
};

// Base gear schema (without catch for type inference)
const BaseGearSchema = z.preprocess(
  normalizeGearInput,
  z.object({
    id: z.string(),
    equipmentType: EquipmentTypeSchema,
    rarity: GearRaritySchema.optional(),
    legendaryName: z.string().optional(),
    baseStats: z.string().optional(),
    baseAffixes: z.array(z.string()).optional(),
    prefixes: z.array(z.string()).optional(),
    suffixes: z.array(z.string()).optional(),
    blendAffix: z.string().optional(),
    sweetDreamAffix: z.string().optional(),
    towerSequenceAffix: z.string().optional(),
    legendaryAffixes: z.array(z.string()).optional(),
    customAffixes: z.array(z.string()).optional(),
  }),
);

export type Gear = z.infer<typeof BaseGearSchema>;

// Gear schema with catch (filters invalid items from arrays)
export const GearSchema = BaseGearSchema;

// Default empty equipped gear
const EMPTY_EQUIPPED_GEAR = {
  helmet: undefined,
  chest: undefined,
  neck: undefined,
  gloves: undefined,
  belt: undefined,
  boots: undefined,
  leftRing: undefined,
  rightRing: undefined,
  mainHand: undefined,
  offHand: undefined,
} as const;

// Equipped gear slots
export const EquippedGearSchema = z
  .object({
    helmet: GearSchema.optional().catch(undefined),
    chest: GearSchema.optional().catch(undefined),
    neck: GearSchema.optional().catch(undefined),
    gloves: GearSchema.optional().catch(undefined),
    belt: GearSchema.optional().catch(undefined),
    boots: GearSchema.optional().catch(undefined),
    leftRing: GearSchema.optional().catch(undefined),
    rightRing: GearSchema.optional().catch(undefined),
    mainHand: GearSchema.optional().catch(undefined),
    offHand: GearSchema.optional().catch(undefined),
  })
  .catch(EMPTY_EQUIPPED_GEAR);

export type EquippedGear = z.infer<typeof EquippedGearSchema>;

// GearPage schema
export const GearPageSchema = z
  .object({
    equippedGear: EquippedGearSchema,
    inventory: z.array(GearSchema).catch([]),
  })
  .catch({ equippedGear: EMPTY_EQUIPPED_GEAR, inventory: [] });

export type GearPage = z.infer<typeof GearPageSchema>;
