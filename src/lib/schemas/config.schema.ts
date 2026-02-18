import { z } from "zod";
import { type Configuration, DEFAULT_CONFIGURATION } from "@/src/tli/core";

const d = DEFAULT_CONFIGURATION;

// Configuration page schema - must match Configuration interface from core.ts
// The `satisfies z.ZodType<Configuration>` ensures schema output matches the interface
export const ConfigurationPageSchema = z
  .object({
    level: z.number().catch(d.level),
    fervorEnabled: z.boolean().catch(d.fervorEnabled),
    fervorPoints: z.number().optional().catch(d.fervorPoints),
    enemyFrostbittenEnabled: z.boolean().catch(d.enemyFrostbittenEnabled),
    enemyFrostbittenPoints: z
      .number()
      .optional()
      .catch(d.enemyFrostbittenPoints),
    crueltyBuffStacks: z.number().optional().catch(d.crueltyBuffStacks),
    numShadowHits: z.number().optional().catch(d.numShadowHits),
    manaConsumedRecently: z.number().optional().catch(d.manaConsumedRecently),
    sealedManaPct: z.number().optional().catch(d.sealedManaPct),
    sealedLifePct: z.number().optional().catch(d.sealedLifePct),
    focusBlessings: z.number().optional().catch(d.focusBlessings),
    hasFocusBlessing: z.boolean().catch(d.hasFocusBlessing),
    agilityBlessings: z.number().optional().catch(d.agilityBlessings),
    hasAgilityBlessing: z.boolean().catch(d.hasAgilityBlessing),
    tenacityBlessings: z.number().optional().catch(d.tenacityBlessings),
    hasTenacityBlessing: z.boolean().catch(d.hasTenacityBlessing),
    hasFullMana: z.boolean().catch(d.hasFullMana),
    hasLowMana: z.boolean().catch(d.hasLowMana),
    enemyParalyzed: z.boolean().catch(d.enemyParalyzed),
    enemyNumbed: z.boolean().catch(d.enemyNumbed),
    enemyNumbedStacks: z.number().optional().catch(d.enemyNumbedStacks),
    targetEnemyIsElite: z.boolean().catch(d.targetEnemyIsElite),
    targetEnemyIsNearby: z.boolean().catch(d.targetEnemyIsNearby),
    targetEnemyIsDistant: z.boolean().catch(d.targetEnemyIsDistant),
    targetEnemyIsInProximity: z.boolean().catch(d.targetEnemyIsInProximity),
    targetEnemyHasFrail: z.boolean().catch(d.targetEnemyHasFrail),
    targetEnemyHasWhimsySignal: z.boolean().catch(d.targetEnemyHasWhimsySignal),
    targetEnemyMarked: z.boolean().catch(d.targetEnemyMarked),
    targetEnemyIsCursed: z.boolean().optional().catch(d.targetEnemyIsCursed),
    numEnemiesNearby: z.number().catch(d.numEnemiesNearby),
    numEnemiesAffectedByWarcry: z.number().catch(d.numEnemiesAffectedByWarcry),
    hasBlockedRecently: z.boolean().catch(d.hasBlockedRecently),
    hasElitesNearby: z.boolean().catch(d.hasElitesNearby),
    numSecondsWithEliteNearby: z.number().catch(d.numSecondsWithEliteNearby),
    enemyHasAilment: z.boolean().catch(d.enemyHasAilment),
    hasCritRecently: z.boolean().catch(d.hasCritRecently),
    channeling: z.boolean().catch(d.channeling),
    channeledStacks: z.number().optional().catch(d.channeledStacks),
    stalkerStacks: z.number().optional().catch(d.stalkerStacks),
    sagesInsightFireActivated: z.boolean().catch(d.sagesInsightFireActivated),
    sagesInsightColdActivated: z.boolean().catch(d.sagesInsightColdActivated),
    sagesInsightLightningActivated: z
      .boolean()
      .catch(d.sagesInsightLightningActivated),
    sagesInsightErosionActivated: z
      .boolean()
      .catch(d.sagesInsightErosionActivated),
    enemyHasAffliction: z.boolean().catch(d.enemyHasAffliction),
    afflictionPts: z.number().optional().catch(d.afflictionPts),
    enemyHasDesecration: z.boolean().catch(d.enemyHasDesecration),
    enemyHasTrauma: z.boolean().catch(d.enemyHasTrauma),
    tormentStacks: z.number().catch(d.tormentStacks),
    hasBlur: z.boolean().catch(d.hasBlur),
    blurEndedRecently: z.boolean().catch(d.blurEndedRecently),
    numMindControlLinksUsed: z
      .number()
      .optional()
      .catch(d.numMindControlLinksUsed),
    hasSquidnova: z.boolean().catch(d.hasSquidnova),
    targetEnemyIsFrozen: z.boolean().catch(d.targetEnemyIsFrozen),
    targetEnemyFrozenRecently: z.boolean().catch(d.targetEnemyFrozenRecently),
    targetEnemyHasColdInfiltration: z
      .boolean()
      .catch(d.targetEnemyHasColdInfiltration),
    targetEnemyHasLightningInfiltration: z
      .boolean()
      .catch(d.targetEnemyHasLightningInfiltration),
    targetEnemyHasFireInfiltration: z
      .boolean()
      .catch(d.targetEnemyHasFireInfiltration),
    hasHitEnemyWithElementalDmgRecently: z
      .number()
      .catch(d.hasHitEnemyWithElementalDmgRecently),
    numSpellSkillsUsedRecently: z.number().catch(d.numSpellSkillsUsedRecently),
    chainLightningInstancesOnTarget: z
      .number()
      .optional()
      .catch(d.chainLightningInstancesOnTarget),
    hasUsedMobilitySkillRecently: z
      .boolean()
      .catch(d.hasUsedMobilitySkillRecently),
    hasMovedRecently: z.boolean().catch(d.hasMovedRecently),
    isMoving: z.boolean().catch(d.isMoving),
    takingDamageOverTime: z.boolean().catch(d.takingDamageOverTime),
    hasCastCurseRecently: z.boolean().catch(d.hasCastCurseRecently),
    hasAttackAggression: z.boolean().catch(d.hasAttackAggression),
    hasSpellAggression: z.boolean().catch(d.hasSpellAggression),
    numMainSpellSkillsCastRecently: z
      .number()
      .catch(d.numMainSpellSkillsCastRecently),
    numMaxMultistrikesRecently: z.number().catch(d.numMaxMultistrikesRecently),
    numBerserkingBladeBuffStacks: z
      .number()
      .optional()
      .catch(d.numBerserkingBladeBuffStacks),
    numTimesRegainedRecently: z.number().catch(d.numTimesRegainedRecently),
    currentLifePct: z.number().catch(d.currentLifePct),
    realmOfMercuryEnabled: z.boolean().catch(d.realmOfMercuryEnabled),
    numEnemiesInsideRealmOfMercury: z
      .number()
      .catch(d.numEnemiesInsideRealmOfMercury),
    baptismOfPurityEnabled: z.boolean().catch(d.baptismOfPurityEnabled),
    frostbittenHeartIsActive: z.boolean().catch(d.frostbittenHeartIsActive),
    danceOfFrostStacks: z.number().optional().catch(d.danceOfFrostStacks),
    enemyColdRes: z.number().optional().catch(d.enemyColdRes),
    enemyLightningRes: z.number().optional().catch(d.enemyLightningRes),
    enemyFireRes: z.number().optional().catch(d.enemyFireRes),
    enemyErosionRes: z.number().optional().catch(d.enemyErosionRes),
    enemyArmor: z.number().optional().catch(d.enemyArmor),
    pureHeartStacks: z.number().optional().catch(d.pureHeartStacks),
    twistedSpacetimeStacks: z
      .number()
      .optional()
      .catch(d.twistedSpacetimeStacks),
    numIcePuppetStacks: z.number().optional().catch(d.numIcePuppetStacks),
    numActiveTangles: z.number().catch(d.numActiveTangles),
    numFelineStimulant: z.number().optional().catch(d.numFelineStimulant),
    customAffixLines: z.array(z.string()).optional().catch(d.customAffixLines),
  })
  .catch(DEFAULT_CONFIGURATION) satisfies z.ZodType<Configuration>;

export type ConfigurationPage = z.infer<typeof ConfigurationPageSchema>;

// Calculations page
export const CalculationsPageSchema = z
  .object({ selectedSkillName: z.string().optional().catch(undefined) })
  .catch({ selectedSkillName: undefined });

export type CalculationsPage = z.infer<typeof CalculationsPageSchema>;
