import type { Legendary } from "../../data/legendary/types";

/**
 * Overrides for generated legendary data.
 * - Set value to `undefined` to remove the legendary from output
 * - Set value to a Legendary object to upsert (replace if exists, add if not)
 */
export const LegendaryDataOverrides: Record<string, Legendary | undefined> = {
  "Unholy Prayer": undefined,
  "Unholy Prayer (agility)": {
    baseItem: "Dazzling Lightning Ring",
    baseStat: "+4% Lightning Resistance",
    name: "Unholy Prayer (agility)",
    normalAffixes: [
      "Max Agility Blessing Stacks +1",
      "Gains 1 stack of Agility Blessing upon inflicting damage. Interval: 1 s",
    ],
    corruptionAffixes: [
      "Max Agility Blessing Stacks +1\n+10% additional damage",
      "Gains 1 stack of Agility Blessing upon inflicting damage. Interval: 0.5 s",
    ],
    equipmentSlot: "Trinket",
    equipmentType: "Ring",
  },
  "Unholy Prayer (focus)": {
    baseItem: "Dazzling Lightning Ring",
    baseStat: "+4% Lightning Resistance",
    name: "Unholy Prayer (focus)",
    normalAffixes: [
      "Max Focus Blessing Stacks +1",
      "Gains 1 stack of Focus Blessing upon inflicting damage. Interval: 1 s",
    ],
    corruptionAffixes: [
      "Max Focus Blessing Stacks +1\n+10% additional damage",
      "Gains 1 stack of Focus Blessing upon inflicting damage. Interval: 0.5 s",
    ],
    equipmentSlot: "Trinket",
    equipmentType: "Ring",
  },
  "Unholy Prayer (tenacity)": {
    baseItem: "Dazzling Lightning Ring",
    baseStat: "+4% Lightning Resistance",
    name: "Unholy Prayer (tenacity)",
    normalAffixes: [
      "Max Tenacity Blessing Stacks +1",
      "Gains 1 stack of Tenacity Blessing upon inflicting damage. Interval: 1 s",
    ],
    corruptionAffixes: [
      "Max Tenacity Blessing Stacks +1\n+10% additional damage",
      "Gains 1 stack of Tenacity Blessing upon inflicting damage. Interval: 0.5 s",
    ],
    equipmentSlot: "Trinket",
    equipmentType: "Ring",
  },
};
