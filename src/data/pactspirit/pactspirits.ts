import type { Pactspirit } from "./types";

export const Pactspirits = [
  {
    type: "Persistent",
    rarity: "Legendary",
    name: "Abyssal King Soul",
    innerRing1: {
      name: "Reaping Cooldown I",
      affix: "+5% Reaping Cooldown Recovery Speed",
    },
    innerRing2: {
      name: "Reaping Cooldown I",
      affix: "+5% Reaping Cooldown Recovery Speed",
    },
    innerRing3: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing4: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: {
      name: "Reaping Cooldown II",
      affix: "+10% Reaping Cooldown Recovery Speed",
    },
    midRing2: { name: "Damage Over Time II", affix: "+24% Damage Over Time" },
    midRing3: { name: "Damage Affliction II", affix: "+20% Affliction Effect" },
    affix1:
      "35% chance for Damage Over Time to spread to targets in Proximity\n+25% additional Reaping Cooldown Recovery Speed",
    affix2:
      "35% chance for Damage Over Time to spread to targets in Proximity\n+25% additional Reaping Cooldown Recovery Speed\n+2% additional damage",
    affix3:
      "35% chance for Damage Over Time to spread to targets in Proximity\n+25% additional Reaping Cooldown Recovery Speed\n+10% Movement Speed if you have caused Reaping recently\n+2% additional damage",
    affix4:
      "35% chance for Damage Over Time to spread to targets in Proximity\n+25% additional Reaping Cooldown Recovery Speed\n+10% Movement Speed if you have caused Reaping recently\n+4% additional damage",
    affix5:
      "35% chance for Damage Over Time to spread to targets in Proximity\n+25% additional Reaping Cooldown Recovery Speed\n+20% Movement Speed if you have caused Reaping recently\n+4% additional damage",
    affix6:
      "50% chance for Damage Over Time to spread to targets in Proximity\n+35% additional Reaping Cooldown Recovery Speed\n+20% Movement Speed if you have caused Reaping recently\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Legendary",
    name: "Anthem",
    innerRing1: { name: "Max Life I", affix: "+4% Max Life" },
    innerRing2: { name: "Max Life I", affix: "+4% Max Life" },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: {
      name: "XP Balance I",
      affix:
        "-10% XP falloff caused by the level difference between the player and the map",
    },
    innerRing6: {
      name: "XP Balance I",
      affix:
        "-10% XP falloff caused by the level difference between the player and the map",
    },
    midRing1: { name: "Max Life II", affix: "+8% Max Life" },
    midRing2: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing3: {
      name: "XP Balance II",
      affix:
        "-20% XP falloff caused by the level difference between the player and the map",
    },
    affix1: "+10% additional Life\nRegenerates 0.6% Life per second",
    affix2:
      "+10% additional Life\nRegenerates 0.6% Life per second\n-2% additional damage taken",
    affix3:
      "+10% additional Life\nRegenerates 0.6% Life per second\nRegenerates 1% Life per second\n-2% additional damage taken",
    affix4:
      "+10% additional Life\nRegenerates 0.6% Life per second\nRegenerates 1% Life per second\n-4% additional damage taken",
    affix5:
      "+10% additional Life\nRegenerates 0.6% Life per second\nRegenerates 2% Life per second\n-4% additional damage taken",
    affix6:
      "+14% additional Life\nRegenerates 0.9% Life per second\nRegenerates 2% Life per second\n-4% additional damage taken",
  },
  {
    type: "Persistent",
    rarity: "Magic",
    name: "Awooawoo - Amber",
    innerRing1: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing2: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing3: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing4: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.8% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n1.8% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n3.6% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n3.6% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Awooawoo - Blue Sky",
    innerRing1: { name: "Damage I", affix: "+12% damage\n+12% Minion Damage" },
    innerRing2: { name: "Damage I", affix: "+12% damage\n+12% Minion Damage" },
    innerRing3: {
      name: "Erosion Resistance I",
      affix: "+6% Erosion Resistance",
    },
    innerRing4: {
      name: "Erosion Resistance I",
      affix: "+6% Erosion Resistance",
    },
    innerRing5: {
      name: "Crowd Control Effects II",
      affix: "+5% crowd control effects",
    },
    innerRing6: {
      name: "Crowd Control Effects II",
      affix: "+5% crowd control effects",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 0.4% additional damage to them\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 0.4% additional damage to them\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 0.8% additional damage to them\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 0.8% additional damage to them\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Awooawoo - Drizzle",
    innerRing1: {
      name: "Projectile Damage I",
      affix: "+14% Projectile Damage",
    },
    innerRing2: {
      name: "Projectile Damage I",
      affix: "+14% Projectile Damage",
    },
    innerRing3: { name: "Projectile Speed I", affix: "+6% Projectile Speed" },
    innerRing4: { name: "Projectile Speed I", affix: "+6% Projectile Speed" },
    innerRing5: {
      name: "Multistrike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing6: {
      name: "Multistrike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n17.5 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n17.5 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+35 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+35 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Awooawoo - Violet",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Attack Damage dealt to Nearby enemies\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+3% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
  },
  {
    type: "Cold",
    rarity: "Magic",
    name: "Awooawoo - White Mist",
    innerRing1: { name: "Cold Damage I", affix: "+14% Cold Damage" },
    innerRing2: { name: "Cold Damage I", affix: "+14% Cold Damage" },
    innerRing3: { name: "Cold Penetration I", affix: "+2.5% Cold Penetration" },
    innerRing4: { name: "Cold Penetration I", affix: "+2.5% Cold Penetration" },
    innerRing5: { name: "Frozen Time I", affix: "+7% Frostbite Duration" },
    innerRing6: { name: "Frozen Time I", affix: "+7% Frostbite Duration" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Cold Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Cold Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Cold Damage\n+2% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Cold Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+3% additional Cold Damage\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Azure Gunslinger",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing2: {
      name: "Attack Critical Strike II",
      affix: "+44% Attack Critical Strike Rating",
    },
    midRing3: { name: "Attack Speed II", affix: "+8% Attack Speed" },
    affix1: "Gains 1 stack of Pure Heart when using an Attack Mobility Skill",
    affix2:
      "Gains 1 stack of Pure Heart when using an Attack Mobility Skill\nWhen gaining Pure Heart, there is a 50% chance to gain 1 additional stack of Pure Heart",
    affix3:
      "Gains 1 stack of Pure Heart when using an Attack Mobility Skill\nWhen gaining Pure Heart, there is a 50% chance to gain 1 additional stack of Pure Heart\n-4% additional damage taken when Pure Heart is active",
    affix4:
      "Gains 1 stack of Pure Heart when using an Attack Mobility Skill\nWhen gaining Pure Heart, there is a 100% chance to gain 1 additional stack of Pure Heart\n-4% additional damage taken when Pure Heart is active",
    affix5:
      "Gains 1 stack of Pure Heart when using an Attack Mobility Skill\nWhen gaining Pure Heart, there is a 100% chance to gain 1 additional stack of Pure Heart\n-8% additional damage taken when Pure Heart is active",
    affix6:
      "Gains 1 stack of Pure Heart when using an Attack Mobility Skill\nWhen gaining Pure Heart, there is a 100% chance to gain 1 additional stack of Pure Heart\n-8% additional damage taken when Pure Heart is active\n+1 Max Pure Heart Stacks\n+100% Pure Heart Duration",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Backup Power",
    innerRing1: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing2: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing3: { name: "Lightning Damage I", affix: "+12% Lightning Damage" },
    innerRing4: { name: "Lightning Damage I", affix: "+12% Lightning Damage" },
    innerRing5: { name: "Movement Speed I", affix: "+3% Movement Speed" },
    innerRing6: { name: "Movement Speed I", affix: "+3% Movement Speed" },
    midRing1: {
      name: "Attack and Cast Speed II",
      affix: "+8% Attack and Cast Speed",
    },
    midRing2: { name: "Lightning Damage II", affix: "+24% Lightning Damage" },
    midRing3: { name: "Movement Speed II", affix: "+6% Movement Speed" },
    affix1: "+35% Numbed Effect",
    affix2:
      "+35% Numbed Effect\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.2 s",
    affix3:
      "+35% Numbed Effect\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.2 s\n+15% Movement Speed if you have inflicted Numbed recently",
    affix4:
      "+35% Numbed Effect\nWhen inflicting Numbed, restores 3% Missing Life and Energy Shield. Interval: 0.2 s\n+15% Movement Speed if you have inflicted Numbed recently",
    affix5:
      "+35% Numbed Effect\nWhen inflicting Numbed, restores 3% Missing Life and Energy Shield. Interval: 0.2 s\n+30% Movement Speed if you have inflicted Numbed recently",
    affix6:
      "+45% Numbed Effect\nWhen inflicting Numbed, restores 3% Missing Life and Energy Shield. Interval: 0.2 s\n+30% Movement Speed if you have inflicted Numbed recently",
  },
  {
    type: "Erosion",
    rarity: "Rare",
    name: "Benign Bug - Ghost Light Yellow",
    innerRing1: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing2: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing3: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing4: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing5: {
      name: "Erosion Penetration I",
      affix: "+2.5% Erosion Resistance Penetration",
    },
    innerRing6: {
      name: "Erosion Penetration I",
      affix: "+2.5% Erosion Resistance Penetration",
    },
    midRing1: { name: "Erosion Damage II", affix: "+28% Erosion Damage" },
    midRing2: { name: "Erosion Damage II", affix: "+28% Erosion Damage" },
    midRing3: {
      name: "Erosion Penetration II",
      affix: "+5% Erosion Resistance Penetration",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+14% Erosion Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+14% Erosion Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+28% Erosion Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+28% Erosion Damage\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Benign Bug - Tolerant Green",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing2: {
      name: "Attack Critical Strike II",
      affix: "+44% Attack Critical Strike Rating",
    },
    midRing3: { name: "Attack Speed II", affix: "+8% Attack Speed" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+14% Attack Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+14% Attack Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+28% Attack Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+28% Attack Damage\n+4% additional damage",
  },
  {
    type: "Lightning",
    rarity: "Legendary",
    name: "Bitter Thunder",
    innerRing1: { name: "Lightning Damage I", affix: "+14% Lightning Damage" },
    innerRing2: { name: "Lightning Damage I", affix: "+14% Lightning Damage" },
    innerRing3: {
      name: "Lightning Penetration I",
      affix: "+2.5% Lightning Penetration",
    },
    innerRing4: {
      name: "Lightning Penetration I",
      affix: "+2.5% Lightning Penetration",
    },
    innerRing5: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing6: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    midRing1: { name: "Lightning Damage II", affix: "+28% Lightning Damage" },
    midRing2: {
      name: "Lightning Penetration II",
      affix: "+5% Lightning Penetration",
    },
    midRing3: {
      name: "Attack and Cast Speed II",
      affix: "+8% Attack and Cast Speed",
    },
    affix1:
      "Bestows the surging power of lightning to the pact holder, granting + 14% additional Lightning Damage and + 15% additional Max Damage for 5s.\nCooldown: 10s.",
    affix2:
      "Bestows the surging power of lightning to the pact holder, granting + 14% additional Lightning Damage and + 15% additional Max Damage for 5s.\nCooldown: 10s.\n+6% additional Lightning Damage",
    affix3:
      "Bestows the surging power of lightning to the pact holder, granting + 14% additional Lightning Damage and + 15% additional Max Damage for 5s.\nCooldown: 10s.\n+6% additional Lightning Damage\n+2% additional damage",
    affix4:
      "Bestows the surging power of lightning to the pact holder, granting + 14% additional Lightning Damage and + 15% additional Max Damage for 5s.\nCooldown: 10s.\n+12% additional Lightning Damage\n+2% additional damage",
    affix5:
      "Bestows the surging power of lightning to the pact holder, granting + 14% additional Lightning Damage and + 15% additional Max Damage for 5s.\nCooldown: 10s.\n+12% additional Lightning Damage\n+4% additional damage",
    affix6:
      "Bestows the surging power of lightning to the pact holder, granting + 19% additional Lightning Damage and + 20% additional Max Damage for 5s.\nCooldown: 10s.\n+12% additional Lightning Damage\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Captain Kitty of the Furious Sea",
    innerRing1: {
      name: "Warcry Duration I",
      affix: "+7.5% Warcry Skill Effect Duration",
    },
    innerRing2: {
      name: "Warcry Duration I",
      affix: "+7.5% Warcry Skill Effect Duration",
    },
    innerRing3: {
      name: "Warcry Cooldown I",
      affix: "+5.5% Warcry Cooldown Recovery Speed",
    },
    innerRing4: {
      name: "Warcry Cooldown I",
      affix: "+5.5% Warcry Cooldown Recovery Speed",
    },
    innerRing5: { name: "Warcry Effect I", affix: "+3% Warcry Effect" },
    innerRing6: { name: "Warcry Effect I", affix: "+3% Warcry Effect" },
    midRing1: {
      name: "Warcry Duration II",
      affix: "+15% Warcry Skill Effect Duration",
    },
    midRing2: {
      name: "Warcry Cooldown II",
      affix: "+11% Warcry Cooldown Recovery Speed",
    },
    midRing3: { name: "Warcry Effect II", affix: "+6% Warcry Effect" },
    affix1: "Immediately casts Warcry. +20% additional Warcry Skill Effect",
    affix2:
      "Immediately casts Warcry. +20% additional Warcry Skill Effect\n+11% Warcry Cooldown Recovery Speed",
    affix3:
      "Immediately casts Warcry. +20% additional Warcry Skill Effect\n+11% Warcry Cooldown Recovery Speed\n+1 Max Warcry Skill Charges",
    affix4:
      "Immediately casts Warcry. +20% additional Warcry Skill Effect\n+22% Warcry Cooldown Recovery Speed\n+1 Max Warcry Skill Charges",
    affix5:
      "Immediately casts Warcry. +20% additional Warcry Skill Effect\n+22% Warcry Cooldown Recovery Speed\n+2 Max Warcry Skill Charges",
    affix6:
      "Immediately casts Warcry. +25% additional Warcry Skill Effect\n+22% Warcry Cooldown Recovery Speed\n+2 Max Warcry Skill Charges",
  },
  {
    type: "Summon",
    rarity: "Rare",
    name: "Cloudgatherer - Sparkle",
    innerRing1: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing3: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing4: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: { name: "Servant Damage II", affix: "+30% Minion Damage" },
    midRing2: {
      name: "Servant Speed II",
      affix: "+8% Minion Attack and Cast Speed",
    },
    midRing3: { name: "Servant Life II", affix: "+8% Minion Max Life" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+40 Critical Strike Rating for recently summoned Minions\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+40 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+80 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+80 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
  },
  {
    type: "Spell",
    rarity: "Rare",
    name: "Cloudgatherer - Violet",
    innerRing1: { name: "Elemental Damage I", affix: "+12% Elemental Damage" },
    innerRing2: { name: "Elemental Damage I", affix: "+12% Elemental Damage" },
    innerRing3: {
      name: "Elemental Penetration I",
      affix: "Damage Penetrates 2% Elemental Resistance",
    },
    innerRing4: {
      name: "Elemental Penetration I",
      affix: "Damage Penetrates 2% Elemental Resistance",
    },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: { name: "Elemental Damage II", affix: "+24% Elemental Damage" },
    midRing2: {
      name: "Elemental Penetration II",
      affix: "Damage Penetrates 4% Elemental Resistance",
    },
    midRing3: { name: "Cast Speed II", affix: "+8% Cast Speed" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n0.8% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n0.8% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n1.6% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n1.6% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
  },
  {
    type: "Persistent",
    rarity: "Legendary",
    name: "Crossroad Walker",
    innerRing1: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing2: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing3: { name: "Ailment Damage I", affix: "+12% Ailment Damage" },
    innerRing4: { name: "Ailment Damage I", affix: "+12% Ailment Damage" },
    innerRing5: { name: "Ailment Duration I", affix: "+6% Ailment Duration" },
    innerRing6: { name: "Ailment Duration I", affix: "+6% Ailment Duration" },
    midRing1: {
      name: "Ailment Chance II",
      affix: "+7% chance to cause Ailments",
    },
    midRing2: { name: "Ailment Damage II", affix: "+24% Ailment Damage" },
    midRing3: { name: "Ailment Duration II", affix: "+12% Ailment Duration" },
    affix1:
      "+13% additional Ailment Damage against Cursed enemies\n11.5% Curse effect",
    affix2:
      "+13% additional Ailment Damage against Cursed enemies\n11.5% Curse effect\n+2% additional damage",
    affix3:
      "+13% additional Ailment Damage against Cursed enemies\n11.5% Curse effect\n+10% curse effect\n+2% additional damage",
    affix4:
      "+13% additional Ailment Damage against Cursed enemies\n11.5% Curse effect\n+10% curse effect\n+4% additional damage",
    affix5:
      "+13% additional Ailment Damage against Cursed enemies\n11.5% Curse effect\n+20% curse effect\n+4% additional damage",
    affix6:
      "+18% additional Ailment Damage against Cursed enemies\n+15% Curse effect\n+20% curse effect\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Dragon Plant - Kale",
    innerRing1: {
      name: "Movement Speed I",
      affix: "+4% Movement Speed while channeling",
    },
    innerRing2: {
      name: "Movement Speed I",
      affix: "+4% Movement Speed while channeling",
    },
    innerRing3: {
      name: "Channeled Damage I",
      affix: "+14% damage for Channeled Skills",
    },
    innerRing4: {
      name: "Channeled Damage I",
      affix: "+14% damage for Channeled Skills",
    },
    innerRing5: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing6: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    midRing1: {
      name: "Movement Speed II",
      affix: "+8% Movement Speed while channeling",
    },
    midRing2: {
      name: "Channeled Damage II",
      affix: "+28% damage for Channeled Skills",
    },
    midRing3: {
      name: "Attack and Cast Speed II",
      affix: "+8% Attack and Cast Speed",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\nAt max channeled stacks, +2% additional damage for Channeled Skills for 4 s\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\nAt max channeled stacks, +2% additional damage for Channeled Skills for 4 s\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\nAt max channeled stacks, +4% additional damage for Channeled Skills for 4 s\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\nAt max channeled stacks, +4% additional damage for Channeled Skills for 4 s\n+4% additional damage",
  },
  {
    type: "Summon",
    rarity: "Rare",
    name: "Dragon Plant - Onion",
    innerRing1: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing3: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing4: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing5: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing6: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    midRing1: { name: "Servant Damage II", affix: "+28% Minion Damage" },
    midRing2: { name: "Servant Damage II", affix: "+28% Minion Damage" },
    midRing3: {
      name: "Servant Speed II",
      affix: "+8% Minion Attack and Cast Speed",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+3% Movement Speed when a Spirit Magus is nearby\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+3% Movement Speed when a Spirit Magus is nearby\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+6% Movement Speed when a Spirit Magus is nearby\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+6% Movement Speed when a Spirit Magus is nearby\n+4% additional Minion Damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Dragon Plant - Truffle",
    innerRing1: {
      name: "Knockback Distance I",
      affix: "+12% Knockback distance",
    },
    innerRing2: {
      name: "Knockback Distance I",
      affix: "+12% Knockback distance",
    },
    innerRing3: { name: "Projectile Speed I", affix: "+7% Projectile Speed" },
    innerRing4: { name: "Projectile Speed I", affix: "+7% Projectile Speed" },
    innerRing5: {
      name: "Projectile Damage I",
      affix: "+10% Projectile Damage",
    },
    innerRing6: {
      name: "Projectile Damage I",
      affix: "+10% Projectile Damage",
    },
    midRing1: {
      name: "Knockback Distance II",
      affix: "+24% Knockback distance",
    },
    midRing2: { name: "Projectile Speed II", affix: "+14% Projectile Speed" },
    midRing3: { name: "Projectile Damage II", affix: "+20% Projectile Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Attack and Cast Speed when no enemies are in proximity\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Attack and Cast Speed when no enemies are in proximity\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+4% additional Attack and Cast Speed when no enemies are in proximity\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+4% additional Attack and Cast Speed when no enemies are in proximity\n+4% additional damage",
  },
  {
    type: "Summon",
    rarity: "Legendary",
    name: "Drapion Lady",
    innerRing1: {
      name: "Servant Buff I",
      affix: "+7% Origin of Spirit Magus effect",
    },
    innerRing2: {
      name: "Servant Buff I",
      affix: "+7% Origin of Spirit Magus effect",
    },
    innerRing3: {
      name: "Servant Cooldown I",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +5%",
    },
    innerRing4: {
      name: "Servant Cooldown I",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +5%",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: {
      name: "Servant Buff II",
      affix: "+14% Origin of Spirit Magus effect",
    },
    midRing2: {
      name: "Servant Cooldown II",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +10%",
    },
    midRing3: { name: "Servant Life II", affix: "+8% Minion Max Life" },
    affix1:
      "+40% Origin of Spirit Magus effect\n+5% additional Spirit Magus Skill Damage",
    affix2:
      "+40% Origin of Spirit Magus effect\n+5% additional Spirit Magus Skill Damage\n+2% additional Minion Damage",
    affix3:
      "+40% Origin of Spirit Magus effect\n+5% additional Spirit Magus Skill Damage\n+4% additional Spirit Magus Skill Damage\n+2% additional Minion Damage",
    affix4:
      "+40% Origin of Spirit Magus effect\n+5% additional Spirit Magus Skill Damage\n+4% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix5:
      "+40% Origin of Spirit Magus effect\n+5% additional Spirit Magus Skill Damage\n+8% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix6:
      "+55% Origin of Spirit Magus effect\n+7% additional Spirit Magus Skill Damage\n+8% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
  },
  {
    type: "Spell",
    rarity: "Legendary",
    name: "Dreamweaver",
    innerRing1: { name: "Elemental Damage I", affix: "+12% Elemental Damage" },
    innerRing2: { name: "Elemental Damage I", affix: "+12% Elemental Damage" },
    innerRing3: {
      name: "Elemental Penetration I",
      affix: "Damage Penetrates 2% Elemental Resistance",
    },
    innerRing4: {
      name: "Elemental Penetration I",
      affix: "Damage Penetrates 2% Elemental Resistance",
    },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: { name: "Elemental Damage II", affix: "+24% Elemental Damage" },
    midRing2: {
      name: "Elemental Penetration II",
      affix: "Damage Penetrates 4% Elemental Resistance",
    },
    midRing3: { name: "Cast Speed II", affix: "+8% Cast Speed" },
    affix1:
      "+14% additional Elemental Damage dealt by Spell Skills\n+1% Elemental Resistance Penetration when hitting an enemy with Elemental Damage, stacking up to 4 times",
    affix2:
      "+14% additional Elemental Damage dealt by Spell Skills\n+1% Elemental Resistance Penetration when hitting an enemy with Elemental Damage, stacking up to 4 times\n+2% additional damage",
    affix3:
      "+14% additional Elemental Damage dealt by Spell Skills\n+1% Elemental Resistance Penetration when hitting an enemy with Elemental Damage, stacking up to 4 times\n1.5% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+2% additional damage",
    affix4:
      "+14% additional Elemental Damage dealt by Spell Skills\n+1% Elemental Resistance Penetration when hitting an enemy with Elemental Damage, stacking up to 4 times\n1.5% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
    affix5:
      "+14% additional Elemental Damage dealt by Spell Skills\n+1% Elemental Resistance Penetration when hitting an enemy with Elemental Damage, stacking up to 4 times\n+3% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
    affix6:
      "+19% additional Elemental Damage dealt by Spell Skills\n1.2% Elemental Resistance Penetration when hitting an enemy with Elemental Damage, stacking up to 4 times\n+3% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Magic",
    name: "Explorer Otter - Mudstone",
    innerRing1: { name: "Max Life I", affix: "+4% Max Life" },
    innerRing2: { name: "Max Life I", affix: "+4% Max Life" },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: {
      name: "XP Balance I",
      affix:
        "-10% XP falloff caused by the level difference between the player and the map",
    },
    innerRing6: {
      name: "XP Balance I",
      affix:
        "-10% XP falloff caused by the level difference between the player and the map",
    },
    midRing1: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing2: { name: "", affix: "" },
    midRing3: { name: "", affix: "" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\nRegenerates 0.3% Life per second\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\nRegenerates 0.3% Life per second\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\nRegenerates 0.6% Life per second\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\nRegenerates 0.6% Life per second\n-4% additional damage taken",
  },
  {
    type: "Summon",
    rarity: "Magic",
    name: "Explorer Otter - Olive",
    innerRing1: {
      name: "Servant Buff I",
      affix: "+7% Origin of Spirit Magus effect",
    },
    innerRing2: {
      name: "Servant Buff I",
      affix: "+7% Origin of Spirit Magus effect",
    },
    innerRing3: {
      name: "Servant Cooldown I",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +5%",
    },
    innerRing4: {
      name: "Servant Cooldown I",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +5%",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+1% additional Spirit Magus Skill Damage\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+1% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+2% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
  },
  {
    type: "Survival",
    rarity: "Magic",
    name: "Explorer Otter - Quicksand",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Damage Avoidance I",
      affix: "+1.5% chance to avoid damage",
    },
    innerRing4: {
      name: "Damage Avoidance I",
      affix: "+1.5% chance to avoid damage",
    },
    innerRing5: { name: "XP Protection I", affix: "-10% XP lost upon death" },
    innerRing6: { name: "XP Protection I", affix: "-10% XP lost upon death" },
    midRing1: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing2: { name: "", affix: "" },
    midRing3: { name: "", affix: "" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\n2.5% Movement Speed\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\n2.5% Movement Speed\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\n+5% Movement Speed\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\n+5% Movement Speed\n-4% additional damage taken",
  },
  {
    type: "Survival",
    rarity: "Magic",
    name: "Explorer Otter - Rock",
    innerRing1: { name: "Max Energy Shield I", affix: "+4% Max Energy Shield" },
    innerRing2: { name: "Max Energy Shield I", affix: "+4% Max Energy Shield" },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing2: { name: "", affix: "" },
    midRing3: { name: "", affix: "" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\n+2% Energy Shield Charge Speed\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\n+2% Energy Shield Charge Speed\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\n+4% Energy Shield Charge Speed\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\n+4% Energy Shield Charge Speed\n-4% additional damage taken",
  },
  {
    type: "Summon",
    rarity: "Magic",
    name: "Feasting Samurai - Garlic",
    innerRing1: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing3: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing4: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing5: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing6: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.5% Movement Speed when a Spirit Magus is nearby\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n1.5% Movement Speed when a Spirit Magus is nearby\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+3% Movement Speed when a Spirit Magus is nearby\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+3% Movement Speed when a Spirit Magus is nearby\n+4% additional Minion Damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Feasting Samurai - Honey",
    innerRing1: {
      name: "Knockback Distance I",
      affix: "+12% Knockback distance",
    },
    innerRing2: {
      name: "Knockback Distance I",
      affix: "+12% Knockback distance",
    },
    innerRing3: { name: "Projectile Speed I", affix: "+7% Projectile Speed" },
    innerRing4: { name: "Projectile Speed I", affix: "+7% Projectile Speed" },
    innerRing5: {
      name: "Projectile Damage I",
      affix: "+10% Projectile Damage",
    },
    innerRing6: {
      name: "Projectile Damage I",
      affix: "+10% Projectile Damage",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+1% additional Attack and Cast Speed when no enemies are in proximity\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+1% additional Attack and Cast Speed when no enemies are in proximity\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Attack and Cast Speed when no enemies are in proximity\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+2% additional Attack and Cast Speed when no enemies are in proximity\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Feasting Samurai - Orange",
    innerRing1: {
      name: "Movement Speed I",
      affix: "+4% Movement Speed while channeling",
    },
    innerRing2: {
      name: "Movement Speed I",
      affix: "+4% Movement Speed while channeling",
    },
    innerRing3: {
      name: "Channeled Damage I",
      affix: "+14% damage for Channeled Skills",
    },
    innerRing4: {
      name: "Channeled Damage I",
      affix: "+14% damage for Channeled Skills",
    },
    innerRing5: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing6: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\nAt max channeled stacks, +1% additional damage for Channeled Skills for 4 s\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\nAt max channeled stacks, +1% additional damage for Channeled Skills for 4 s\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\nAt max channeled stacks, +2% additional damage for Channeled Skills for 4 s\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\nAt max channeled stacks, +2% additional damage for Channeled Skills for 4 s\n+4% additional damage",
  },
  {
    type: "Persistent",
    rarity: "Legendary",
    name: "Fire Swordsman",
    innerRing1: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing2: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing3: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing4: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: { name: "Damage Over Time II", affix: "+24% Damage Over Time" },
    midRing2: {
      name: "Ailment Chance II",
      affix: "+7% chance to cause Ailments",
    },
    midRing3: { name: "Damage Affliction II", affix: "+20% Affliction Effect" },
    affix1:
      "Reaps 0.8 s of Damage Over Time when inflicting an Ailment. The effect has a 6 s cooldown against the same target\n+4% Reaping Duration for each recent Reaping, stacks up to 4 times",
    affix2:
      "Reaps 0.8 s of Damage Over Time when inflicting an Ailment. The effect has a 6 s cooldown against the same target\n+4% Reaping Duration for each recent Reaping, stacks up to 4 times\n+2% additional damage",
    affix3:
      "Reaps 0.8 s of Damage Over Time when inflicting an Ailment. The effect has a 6 s cooldown against the same target\n+4% Reaping Duration for each recent Reaping, stacks up to 4 times\n+7% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+2% additional damage",
    affix4:
      "Reaps 0.8 s of Damage Over Time when inflicting an Ailment. The effect has a 6 s cooldown against the same target\n+4% Reaping Duration for each recent Reaping, stacks up to 4 times\n+7% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
    affix5:
      "Reaps 0.8 s of Damage Over Time when inflicting an Ailment. The effect has a 6 s cooldown against the same target\n+4% Reaping Duration for each recent Reaping, stacks up to 4 times\n+14% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
    affix6:
      "Reaps 1 s of Damage Over Time when inflicting an Ailment. The effect has a 6 s cooldown against the same target\n+6% Reaping Duration for each recent Reaping, stacks up to 4 times\n+14% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
  },
  {
    type: "Persistent",
    rarity: "Legendary",
    name: "Firewing",
    innerRing1: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing2: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing3: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing4: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: { name: "Damage Over Time II", affix: "+24% Damage Over Time" },
    midRing2: {
      name: "Skill Duration II",
      affix: "+10% Skill Effect Duration",
    },
    midRing3: { name: "Damage Affliction II", affix: "+20% Affliction Effect" },
    affix1:
      "+80% Affliction effect at Full Life.\n10.5 Affliction inflicted per second on Full Life.",
    affix2:
      "+80% Affliction effect at Full Life.\n10.5 Affliction inflicted per second on Full Life.\n+2% additional damage",
    affix3:
      "+80% Affliction effect at Full Life.\n10.5 Affliction inflicted per second on Full Life.\n+15 Affliction inflicted per second at Full Life.\n+2% additional damage",
    affix4:
      "+80% Affliction effect at Full Life.\n10.5 Affliction inflicted per second on Full Life.\n+15 Affliction inflicted per second at Full Life.\n+4% additional damage",
    affix5:
      "+80% Affliction effect at Full Life.\n10.5 Affliction inflicted per second on Full Life.\n+30 Affliction inflicted per second at Full Life.\n+4% additional damage",
    affix6:
      "+105% Affliction effect at Full Life.\n+14 Affliction inflicted per second on Full Life.\n+30 Affliction inflicted per second at Full Life.\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "First Mate of the Furious Sea - Rock",
    innerRing1: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing2: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing3: { name: "Lightning Damage I", affix: "+12% Lightning Damage" },
    innerRing4: { name: "Lightning Damage I", affix: "+12% Lightning Damage" },
    innerRing5: { name: "Movement Speed I", affix: "+3% Movement Speed" },
    innerRing6: { name: "Movement Speed I", affix: "+3% Movement Speed" },
    midRing1: {
      name: "Attack and Cast Speed II",
      affix: "+8% Attack and Cast Speed",
    },
    midRing2: { name: "Lightning Damage II", affix: "+24% Lightning Damage" },
    midRing3: { name: "Movement Speed II", affix: "+6% Movement Speed" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.4 s\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.4 s\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.4 s\n7.5% Movement Speed if you have inflicted Numbed recently\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.4 s\n7.5% Movement Speed if you have inflicted Numbed recently\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "First Mate of the Furious Sea - Sky",
    innerRing1: {
      name: "Warcry Duration I",
      affix: "+7.5% Warcry Skill Effect Duration",
    },
    innerRing2: {
      name: "Warcry Duration I",
      affix: "+7.5% Warcry Skill Effect Duration",
    },
    innerRing3: {
      name: "Warcry Cooldown I",
      affix: "+5.5% Warcry Cooldown Recovery Speed",
    },
    innerRing4: {
      name: "Warcry Cooldown I",
      affix: "+5.5% Warcry Cooldown Recovery Speed",
    },
    innerRing5: { name: "Warcry Effect I", affix: "+3% Warcry Effect" },
    innerRing6: { name: "Warcry Effect I", affix: "+3% Warcry Effect" },
    midRing1: {
      name: "Warcry Duration II",
      affix: "+15% Warcry Skill Effect Duration",
    },
    midRing2: {
      name: "Warcry Cooldown II",
      affix: "+11% Warcry Cooldown Recovery Speed",
    },
    midRing3: { name: "Warcry Effect II", affix: "+6% Warcry Effect" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n5.5% Warcry Cooldown Recovery Speed\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n5.5% Warcry Cooldown Recovery Speed\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+11% Warcry Cooldown Recovery Speed\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+11% Warcry Cooldown Recovery Speed\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Flower Whisperer",
    innerRing1: {
      name: "Projectile Damage I",
      affix: "+14% Projectile Damage",
    },
    innerRing2: {
      name: "Projectile Damage I",
      affix: "+14% Projectile Damage",
    },
    innerRing3: { name: "Projectile Speed I", affix: "+6% Projectile Speed" },
    innerRing4: { name: "Projectile Speed I", affix: "+6% Projectile Speed" },
    innerRing5: {
      name: "Multistrike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing6: {
      name: "Multistrike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    midRing1: { name: "Projectile Damage II", affix: "+30% Projectile Damage" },
    midRing2: { name: "Projectile Speed II", affix: "+12% Projectile Speed" },
    midRing3: {
      name: "Multistrike II",
      affix: "+45% Attack Critical Strike Rating",
    },
    affix1:
      "+16% additional Projectile Skill Critical Strike Damage against Distant enemies\n+40 Attack Projectile Skill Critical Strike Rating against Distant enemies",
    affix2:
      "+16% additional Projectile Skill Critical Strike Damage against Distant enemies\n+40 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+2% additional damage",
    affix3:
      "+16% additional Projectile Skill Critical Strike Damage against Distant enemies\n+40 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+70 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+2% additional damage",
    affix4:
      "+16% additional Projectile Skill Critical Strike Damage against Distant enemies\n+40 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+70 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
    affix5:
      "+16% additional Projectile Skill Critical Strike Damage against Distant enemies\n+40 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+140 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
    affix6:
      "+21% additional Projectile Skill Critical Strike Damage against Distant enemies\n+55 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+140 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Fog Scorpion",
    innerRing1: {
      name: "Double Damage I",
      affix: "Attack Skills: a +2% chance to deal Double Damage",
    },
    innerRing2: {
      name: "Double Damage I",
      affix: "Attack Skills: a +2% chance to deal Double Damage",
    },
    innerRing3: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing4: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing5: { name: "Multistrike I", affix: "+8% chance to Multistrike" },
    innerRing6: { name: "Multistrike I", affix: "+8% chance to Multistrike" },
    midRing1: {
      name: "Double Damage II",
      affix: "Attack Skills: a +4% chance to deal Double Damage",
    },
    midRing2: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing3: { name: "Multistrike II", affix: "+16% chance to Multistrike" },
    affix1:
      "+20% additional Attack Speed when only 1 enemies are Nearby\n+9% Movement Speed when at least 2 enemies are Nearby",
    affix2:
      "+20% additional Attack Speed when only 1 enemies are Nearby\n+9% Movement Speed when at least 2 enemies are Nearby\n+2% additional damage",
    affix3:
      "+20% additional Attack Speed when only 1 enemies are Nearby\n+9% Movement Speed when at least 2 enemies are Nearby\n+15% Movement Speed when at least 2 enemies are Nearby\n+2% additional damage",
    affix4:
      "+20% additional Attack Speed when only 1 enemies are Nearby\n+9% Movement Speed when at least 2 enemies are Nearby\n+15% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
    affix5:
      "+20% additional Attack Speed when only 1 enemies are Nearby\n+9% Movement Speed when at least 2 enemies are Nearby\n+30% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
    affix6:
      "+27% additional Attack Speed when only 1 enemies are Nearby\n+12% Movement Speed when at least 2 enemies are Nearby\n+30% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
  },
  {
    type: "Persistent",
    rarity: "Rare",
    name: "Greedy Chestnut - Emerald",
    innerRing1: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing2: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing3: { name: "Ailment Damage I", affix: "+12% Ailment Damage" },
    innerRing4: { name: "Ailment Damage I", affix: "+12% Ailment Damage" },
    innerRing5: { name: "Ailment Duration I", affix: "+6% Ailment Duration" },
    innerRing6: { name: "Ailment Duration I", affix: "+6% Ailment Duration" },
    midRing1: {
      name: "Ailment Chance II",
      affix: "+7% chance to cause Ailments",
    },
    midRing2: { name: "Ailment Damage II", affix: "+24% Ailment Damage" },
    midRing3: { name: "Ailment Duration II", affix: "+12% Ailment Duration" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+5% curse effect\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+5% curse effect\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+10% curse effect\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+10% curse effect\n+4% additional damage",
  },
  {
    type: "Persistent",
    rarity: "Rare",
    name: "Greedy Chestnut - Lotus Leaf",
    innerRing1: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing2: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing3: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing4: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: { name: "Damage Over Time II", affix: "+24% Damage Over Time" },
    midRing2: {
      name: "Ailment Chance II",
      affix: "+7% chance to cause Ailments",
    },
    midRing3: { name: "Damage Affliction II", affix: "+20% Affliction Effect" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n3.5% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n3.5% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+7% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+7% Reaping Duration for each Reap dealt, stacking up to 4 times.\n+4% additional damage",
  },
  {
    type: "Summon",
    rarity: "Rare",
    name: "Greedy Chestnut - Lotus Root",
    innerRing1: {
      name: "Servant Buff I",
      affix: "+7% Origin of Spirit Magus effect",
    },
    innerRing2: {
      name: "Servant Buff I",
      affix: "+7% Origin of Spirit Magus effect",
    },
    innerRing3: {
      name: "Servant Cooldown I",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +5%",
    },
    innerRing4: {
      name: "Servant Cooldown I",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +5%",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: {
      name: "Servant Buff II",
      affix: "+14% Origin of Spirit Magus effect",
    },
    midRing2: {
      name: "Servant Cooldown II",
      affix: "Spirit Magi's Skill Cooldown Recovery Speed +10%",
    },
    midRing3: { name: "Servant Life II", affix: "+8% Minion Max Life" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Spirit Magus Skill Damage\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+4% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+4% additional Spirit Magus Skill Damage\n+4% additional Minion Damage",
  },
  {
    type: "Persistent",
    rarity: "Rare",
    name: "Greedy Chestnut - Radiance",
    innerRing1: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing2: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing3: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing4: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: { name: "Damage Over Time II", affix: "+24% Damage Over Time" },
    midRing2: {
      name: "Skill Duration II",
      affix: "+10% Skill Effect Duration",
    },
    midRing3: { name: "Damage Affliction II", affix: "+20% Affliction Effect" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+8 Affliction inflicted per second at Full Life.\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+8 Affliction inflicted per second at Full Life.\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+16 Affliction inflicted per second at Full Life.\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+16 Affliction inflicted per second at Full Life.\n+4% additional damage",
  },
  {
    type: "Lightning",
    rarity: "Magic",
    name: "Happy Chonky - Electrify",
    innerRing1: { name: "Lightning Damage I", affix: "+14% Lightning Damage" },
    innerRing2: { name: "Lightning Damage I", affix: "+14% Lightning Damage" },
    innerRing3: {
      name: "Lightning Penetration I",
      affix: "+2.5% Lightning Penetration",
    },
    innerRing4: {
      name: "Lightning Penetration I",
      affix: "+2.5% Lightning Penetration",
    },
    innerRing5: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing6: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Lightning Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Lightning Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Lightning Damage\n+2% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Lightning Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+3% additional Lightning Damage\n+4% additional damage",
  },
  {
    type: "Fire",
    rarity: "Magic",
    name: "Happy Chonky - Ember",
    innerRing1: { name: "Fire Damage I", affix: "+14% Fire Damage" },
    innerRing2: { name: "Fire Damage I", affix: "+14% Fire Damage" },
    innerRing3: { name: "Fire Penetration I", affix: "+2.5% Fire Penetration" },
    innerRing4: { name: "Fire Penetration I", affix: "+2.5% Fire Penetration" },
    innerRing5: { name: "Fire Area I", affix: "+14% Fire Skill Area" },
    innerRing6: { name: "Fire Area I", affix: "+14% Fire Skill Area" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Fire Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.5% additional Fire Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Fire Damage\n+2% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Fire Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+3% additional Fire Damage\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Rare",
    name: "Hell Cavalry",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Damage Mitigation I",
      affix: "-1.5% additional damage taken",
    },
    innerRing4: {
      name: "Damage Mitigation I",
      affix: "-1.5% additional damage taken",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: {
      name: "Elemental Resistance II",
      affix: "+5% Elemental Resistance",
    },
    midRing2: {
      name: "Damage Mitigation II",
      affix: "-3% additional damage taken",
    },
    midRing3: { name: "XP Bonus II", affix: "+6% XP earned" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\n-2% additional damage taken\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\n-2% additional damage taken\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\n-4% additional damage taken\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\n-4% additional damage taken\n-4% additional damage taken",
  },
  {
    type: "Cold",
    rarity: "Rare",
    name: "Hell Cavalry - Crushed Ice",
    innerRing1: { name: "Cold Damage I", affix: "+14% Cold Damage" },
    innerRing2: { name: "Cold Damage I", affix: "+14% Cold Damage" },
    innerRing3: { name: "Cold Penetration I", affix: "+2.5% Cold Penetration" },
    innerRing4: { name: "Cold Penetration I", affix: "+2.5% Cold Penetration" },
    innerRing5: { name: "Frozen Time I", affix: "+7% Frostbite Duration" },
    innerRing6: { name: "Frozen Time I", affix: "+7% Frostbite Duration" },
    midRing1: { name: "Cold Damage II", affix: "+28% Cold Damage" },
    midRing2: { name: "Cold Penetration II", affix: "+5% Cold Penetration" },
    midRing3: { name: "Frozen Time II", affix: "+14% Frostbite Duration" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Cold Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Cold Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+6% additional Cold Damage\n+2% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+6% additional Cold Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+6% additional Cold Damage\n+4% additional damage",
  },
  {
    type: "Spell",
    rarity: "Rare",
    name: "Hell Cavalry - Glow",
    innerRing1: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing2: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing3: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing4: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing5: {
      name: "Critical Strike Damage I",
      affix: "+10% Critical Strike Damage",
    },
    innerRing6: {
      name: "Critical Strike Damage I",
      affix: "+10% Critical Strike Damage",
    },
    midRing1: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing2: { name: "Spell Damage II", affix: "+24% Spell Damage" },
    midRing3: {
      name: "Critical Strike Damage II",
      affix: "+20% Critical Strike Damage",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n4.5% Critical Strike Damage per Ailment on enemies, up to +9%\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n4.5% Critical Strike Damage per Ailment on enemies, up to +9%\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+9% Critical Strike Damage per Ailment on enemies, up to +18%\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+9% Critical Strike Damage per Ailment on enemies, up to +18%\n+4% additional damage",
  },
  {
    type: "Lightning",
    rarity: "Rare",
    name: "Hell Cavalry - Muffled Thunder",
    innerRing1: { name: "Lightning Damage I", affix: "+14% Lightning Damage" },
    innerRing2: { name: "Lightning Damage I", affix: "+14% Lightning Damage" },
    innerRing3: {
      name: "Lightning Penetration I",
      affix: "+2.5% Lightning Penetration",
    },
    innerRing4: {
      name: "Lightning Penetration I",
      affix: "+2.5% Lightning Penetration",
    },
    innerRing5: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing6: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    midRing1: { name: "Lightning Damage II", affix: "+28% Lightning Damage" },
    midRing2: {
      name: "Lightning Penetration II",
      affix: "+5% Lightning Penetration",
    },
    midRing3: {
      name: "Attack and Cast Speed II",
      affix: "+8% Attack and Cast Speed",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Lightning Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Lightning Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+6% additional Lightning Damage\n+2% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+6% additional Lightning Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+6% additional Lightning Damage\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Hell Cavalry - Twilight",
    innerRing1: { name: "Damage I", affix: "+12% damage\n+12% Minion Damage" },
    innerRing2: { name: "Damage I", affix: "+12% damage\n+12% Minion Damage" },
    innerRing3: {
      name: "Erosion Resistance I",
      affix: "+6% Erosion Resistance",
    },
    innerRing4: {
      name: "Erosion Resistance I",
      affix: "+6% Erosion Resistance",
    },
    innerRing5: {
      name: "Crowd Control Effects II",
      affix: "+5% crowd control effects",
    },
    innerRing6: {
      name: "Crowd Control Effects II",
      affix: "+5% crowd control effects",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: {
      name: "Erosion Resistance II",
      affix: "+12% Erosion Resistance",
    },
    midRing3: {
      name: "Crowd Control Effects II",
      affix: "+10% crowd control effects",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 0.8% additional damage to them\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 0.8% additional damage to them\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 1.6% additional damage to them\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\nFor every type of crowd control effect the enemy has, you and your Minions deal 1.6% additional damage to them\n+4% additional damage",
  },
  {
    type: "Cold",
    rarity: "Legendary",
    name: "Ice Puppet",
    innerRing1: { name: "Cold Damage I", affix: "+14% Cold Damage" },
    innerRing2: { name: "Cold Damage I", affix: "+14% Cold Damage" },
    innerRing3: { name: "Cold Penetration I", affix: "+2.5% Cold Penetration" },
    innerRing4: { name: "Cold Penetration I", affix: "+2.5% Cold Penetration" },
    innerRing5: { name: "Frozen Time I", affix: "+7% Frostbite Duration" },
    innerRing6: { name: "Frozen Time I", affix: "+7% Frostbite Duration" },
    midRing1: { name: "Cold Damage II", affix: "+28% Cold Damage" },
    midRing2: { name: "Cold Penetration II", affix: "+5% Cold Penetration" },
    midRing3: { name: "Frozen Time II", affix: "+14% Frostbite Duration" },
    affix1:
      "Focus energy to create an ice prison Near yourself and the Pact Holder, which debuffs Frostbitten enemies inside every second and makes them take +10% additional Cold Damage, up to 4 stacks, for 6s.\nCooldown: 10s",
    affix2:
      "Focus energy to create an ice prison Near yourself and the Pact Holder, which debuffs Frostbitten enemies inside every second and makes them take +10% additional Cold Damage, up to 4 stacks, for 6s.\nCooldown: 10s\n+6% additional Cold Damage",
    affix3:
      "Focus energy to create an ice prison Near yourself and the Pact Holder, which debuffs Frostbitten enemies inside every second and makes them take +10% additional Cold Damage, up to 4 stacks, for 6s.\nCooldown: 10s\n+6% additional Cold Damage\n+2% additional damage",
    affix4:
      "Focus energy to create an ice prison Near yourself and the Pact Holder, which debuffs Frostbitten enemies inside every second and makes them take +10% additional Cold Damage, up to 4 stacks, for 6s.\nCooldown: 10s\n+12% additional Cold Damage\n+2% additional damage",
    affix5:
      "Focus energy to create an ice prison Near yourself and the Pact Holder, which debuffs Frostbitten enemies inside every second and makes them take +10% additional Cold Damage, up to 4 stacks, for 6s.\nCooldown: 10s\n+12% additional Cold Damage\n+4% additional damage",
    affix6:
      "Focus energy to create an ice prison Near yourself and the Pact Holder, which debuffs Frostbitten enemies inside every second and makes them take +13% additional Cold Damage, up to 4 stacks, for 6s.\nCooldown: 10s\n+12% additional Cold Damage\n+4% additional damage",
  },
  {
    type: "Persistent",
    rarity: "Magic",
    name: "Idling Weasel - Abyss",
    innerRing1: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing2: {
      name: "Ailment Chance I",
      affix: "+3.5% chance to cause Ailments",
    },
    innerRing3: { name: "Ailment Damage I", affix: "+12% Ailment Damage" },
    innerRing4: { name: "Ailment Damage I", affix: "+12% Ailment Damage" },
    innerRing5: { name: "Ailment Duration I", affix: "+6% Ailment Duration" },
    innerRing6: { name: "Ailment Duration I", affix: "+6% Ailment Duration" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n2.5% curse effect\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n2.5% curse effect\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+5% curse effect\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+5% curse effect\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Idling Weasel - Sandstone",
    innerRing1: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing2: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing3: { name: "Lightning Damage I", affix: "+12% Lightning Damage" },
    innerRing4: { name: "Lightning Damage I", affix: "+12% Lightning Damage" },
    innerRing5: { name: "Movement Speed I", affix: "+3% Movement Speed" },
    innerRing6: { name: "Movement Speed I", affix: "+3% Movement Speed" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.8 s\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.8 s\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.8 s\n3.75% Movement Speed if you have inflicted Numbed recently\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\nWhen inflicting Numbed, restores 1.5% Missing Life and Energy Shield. Interval: 0.8 s\n3.75% Movement Speed if you have inflicted Numbed recently\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Idling Weasel - Shallow sea",
    innerRing1: {
      name: "Double Damage I",
      affix: "Attack Skills: a +2% chance to deal Double Damage",
    },
    innerRing2: {
      name: "Double Damage I",
      affix: "Attack Skills: a +2% chance to deal Double Damage",
    },
    innerRing3: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing4: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing5: { name: "Multistrike I", affix: "+8% chance to Multistrike" },
    innerRing6: { name: "Multistrike I", affix: "+8% chance to Multistrike" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+4% Movement Speed when at least 2 enemies are Nearby\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+4% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+8% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+8% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
  },
  {
    type: "Spell",
    rarity: "Magic",
    name: "Idling Weasel - Sprouts",
    innerRing1: { name: "Elemental Damage I", affix: "+12% Elemental Damage" },
    innerRing2: { name: "Elemental Damage I", affix: "+12% Elemental Damage" },
    innerRing3: {
      name: "Elemental Penetration I",
      affix: "Damage Penetrates 2% Elemental Resistance",
    },
    innerRing4: {
      name: "Elemental Penetration I",
      affix: "Damage Penetrates 2% Elemental Resistance",
    },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n0.4% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n0.4% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n0.8% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n0.8% Elemental Resistance Penetration every time you hit an enemy with Elemental Damage recently. Stacks up to 4 times\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Iron Lion",
    innerRing1: {
      name: "Knockback Distance I",
      affix: "+12% Knockback distance",
    },
    innerRing2: {
      name: "Knockback Distance I",
      affix: "+12% Knockback distance",
    },
    innerRing3: { name: "Projectile Speed I", affix: "+7% Projectile Speed" },
    innerRing4: { name: "Projectile Speed I", affix: "+7% Projectile Speed" },
    innerRing5: {
      name: "Projectile Damage I",
      affix: "+10% Projectile Damage",
    },
    innerRing6: {
      name: "Projectile Damage I",
      affix: "+10% Projectile Damage",
    },
    midRing1: {
      name: "Knockback Distance II",
      affix: "+24% Knockback distance",
    },
    midRing2: { name: "Projectile Speed II", affix: "+14% Projectile Speed" },
    midRing3: { name: "Projectile Damage II", affix: "+20% Projectile Damage" },
    affix1: "Projectile Quantity +2",
    affix2:
      "Projectile Quantity +2\n+4% additional Attack and Cast Speed when no enemies are in proximity",
    affix3:
      "Projectile Quantity +2\n+4% additional Attack and Cast Speed when no enemies are in proximity\n+24% Knockback distance",
    affix4:
      "Projectile Quantity +2\n+8% additional Attack and Cast Speed when no enemies are in proximity\n+24% Knockback distance",
    affix5:
      "Projectile Quantity +2\n+8% additional Attack and Cast Speed when no enemies are in proximity\n+48% Knockback distance",
    affix6:
      "Projectile Quantity +2\n+8% additional Attack and Cast Speed when no enemies are in proximity\n+48% Knockback distance\n+14% Projectile Speed",
  },
  {
    type: "Survival",
    rarity: "Legendary",
    name: "Knight of Pale Blue",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Damage Mitigation I",
      affix: "-1.5% additional damage taken",
    },
    innerRing4: {
      name: "Damage Mitigation I",
      affix: "-1.5% additional damage taken",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: {
      name: "Elemental Resistance II",
      affix: "+5% Elemental Resistance",
    },
    midRing2: {
      name: "Damage Mitigation II",
      affix: "-3% additional damage taken",
    },
    midRing3: { name: "XP Bonus II", affix: "+6% XP earned" },
    affix1:
      "-40% additional Physical Damage taken when there are only 1 enemies Nearby\n-3% additional damage taken",
    affix2:
      "-40% additional Physical Damage taken when there are only 1 enemies Nearby\n-3% additional damage taken\n-2% additional damage taken",
    affix3:
      "-40% additional Physical Damage taken when there are only 1 enemies Nearby\n-3% additional damage taken\n-4% additional damage taken\n-2% additional damage taken",
    affix4:
      "-40% additional Physical Damage taken when there are only 1 enemies Nearby\n-3% additional damage taken\n-4% additional damage taken\n-4% additional damage taken",
    affix5:
      "-40% additional Physical Damage taken when there are only 1 enemies Nearby\n-3% additional damage taken\n-8% additional damage taken\n-4% additional damage taken",
    affix6:
      "-55% additional Physical Damage taken when there are only 1 enemies Nearby\n-4% additional damage taken\n-8% additional damage taken\n-4% additional damage taken",
  },
  {
    type: "Summon",
    rarity: "Rare",
    name: "Letice - Amethyst",
    innerRing1: {
      name: "Spirit Magus Seal Removed I",
      affix: "+10% Sealed Mana Compensation for Spirit Magus Skills",
    },
    innerRing2: {
      name: "Spirit Magus Seal Removed I",
      affix: "+10% Sealed Mana Compensation for Spirit Magus Skills",
    },
    innerRing3: { name: "Damage I", affix: "+10% damage\n+10% Minion Damage" },
    innerRing4: { name: "Damage I", affix: "+10% damage\n+10% Minion Damage" },
    innerRing5: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing6: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    midRing1: {
      name: "Spirit Magus Seal Removed II",
      affix: "+20% Sealed Mana Compensation for Spirit Magus Skills",
    },
    midRing2: { name: "Damage II", affix: "+20% damage\n+20% Minion Damage" },
    midRing3: {
      name: "Skill Duration II",
      affix: "+10% Skill Effect Duration",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+28% Spirit Magus Skill Damage\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+28% Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+56% Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+56% Spirit Magus Skill Damage\n+4% additional Minion Damage",
  },
  {
    type: "Persistent",
    rarity: "Rare",
    name: "Letice - Flame",
    innerRing1: {
      name: "Reaping Cooldown I",
      affix: "+5% Reaping Cooldown Recovery Speed",
    },
    innerRing2: {
      name: "Reaping Cooldown I",
      affix: "+5% Reaping Cooldown Recovery Speed",
    },
    innerRing3: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing4: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: {
      name: "Reaping Cooldown II",
      affix: "+10% Reaping Cooldown Recovery Speed",
    },
    midRing2: { name: "Damage Over Time II", affix: "+24% Damage Over Time" },
    midRing3: { name: "Damage Affliction II", affix: "+20% Affliction Effect" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+5% Movement Speed if you have caused Reaping recently\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+5% Movement Speed if you have caused Reaping recently\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+10% Movement Speed if you have caused Reaping recently\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+10% Movement Speed if you have caused Reaping recently\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Letice - Withered Leaf",
    innerRing1: { name: "Damage I", affix: "+10% damage" },
    innerRing2: { name: "Damage I", affix: "+10% damage" },
    innerRing3: { name: "Attack Block I", affix: "+6% Attack Block Chance" },
    innerRing4: { name: "Attack Block I", affix: "+6% Attack Block Chance" },
    innerRing5: { name: "Spell Block I", affix: "+6% Spell Block Chance" },
    innerRing6: { name: "Spell Block I", affix: "+6% Spell Block Chance" },
    midRing1: { name: "Damage II", affix: "+20% damage" },
    midRing2: { name: "Attack Block II", affix: "+12% Attack Block Chance" },
    midRing3: { name: "Spell Block II", affix: "+12% Spell Block Chance" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.5% Block Ratio when there is a Boss Nearby\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n1.5% Block Ratio when there is a Boss Nearby\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+3% Block Ratio when there is a Boss Nearby\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+3% Block Ratio when there is a Boss Nearby\n+4% additional damage",
  },
  {
    type: "Spell",
    rarity: "Magic",
    name: "Luluri - Amethyst",
    innerRing1: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing2: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing3: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing4: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing5: {
      name: "Critical Strike Damage I",
      affix: "+10% Critical Strike Damage",
    },
    innerRing6: {
      name: "Critical Strike Damage I",
      affix: "+10% Critical Strike Damage",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+2% Critical Strike Damage per Ailment on enemies, up to +4%\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+2% Critical Strike Damage per Ailment on enemies, up to +4%\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+4% Critical Strike Damage per Ailment on enemies, up to +8%\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+4% Critical Strike Damage per Ailment on enemies, up to +8%\n+4% additional damage",
  },
  {
    type: "Persistent",
    rarity: "Magic",
    name: "Luluri - Golden Leaf",
    innerRing1: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing2: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing3: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing4: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+4 Affliction inflicted per second at Full Life.\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+4 Affliction inflicted per second at Full Life.\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+8 Affliction inflicted per second at Full Life.\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+8 Affliction inflicted per second at Full Life.\n+4% additional damage",
  },
  {
    type: "Spell",
    rarity: "Magic",
    name: "Luluri - Maple",
    innerRing1: {
      name: "Double Spell I",
      affix: "+2% chance for Spells to deal Double Damage",
    },
    innerRing2: {
      name: "Double Spell I",
      affix: "+2% chance for Spells to deal Double Damage",
    },
    innerRing3: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing4: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n1.5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n1.5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+3% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+3% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Luluri - Shallow Sea",
    innerRing1: {
      name: "Warcry Duration I",
      affix: "+7.5% Warcry Skill Effect Duration",
    },
    innerRing2: {
      name: "Warcry Duration I",
      affix: "+7.5% Warcry Skill Effect Duration",
    },
    innerRing3: {
      name: "Warcry Cooldown I",
      affix: "+5.5% Warcry Cooldown Recovery Speed",
    },
    innerRing4: {
      name: "Warcry Cooldown I",
      affix: "+5.5% Warcry Cooldown Recovery Speed",
    },
    innerRing5: { name: "Warcry Effect I", affix: "+3% Warcry Effect" },
    innerRing6: { name: "Warcry Effect I", affix: "+3% Warcry Effect" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n2.75% Warcry Cooldown Recovery Speed\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n2.75% Warcry Cooldown Recovery Speed\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n5.5% Warcry Cooldown Recovery Speed\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n5.5% Warcry Cooldown Recovery Speed\n+4% additional damage",
  },
  {
    type: "Spell",
    rarity: "Magic",
    name: "Lumidrake - Aurora",
    innerRing1: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing2: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing3: {
      name: "Spell Critical Strike I",
      affix: "+22% Spell Critical Strike Rating",
    },
    innerRing4: {
      name: "Spell Critical Strike I",
      affix: "+22% Spell Critical Strike Rating",
    },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+7% Spell Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+7% Spell Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+14% Spell Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+14% Spell Damage\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Lumidrake - Fluorescence",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+7% Attack Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+7% Attack Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+14% Attack Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+14% Attack Damage\n+4% additional damage",
  },
  {
    type: "Summon",
    rarity: "Legendary",
    name: "Mechanical Throne",
    innerRing1: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing3: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing4: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: { name: "Servant Damage II", affix: "+30% Minion Damage" },
    midRing2: {
      name: "Servant Speed II",
      affix: "+8% Minion Attack and Cast Speed",
    },
    midRing3: { name: "Servant Life II", affix: "+8% Minion Max Life" },
    affix1:
      "+14% chance for Synthetic Troop Minions to deal Double Damage\n+6% Minion Attack and Cast Speed for 4 s when your Synthetic Troop Minions deal Double Damage",
    affix2:
      "+14% chance for Synthetic Troop Minions to deal Double Damage\n+6% Minion Attack and Cast Speed for 4 s when your Synthetic Troop Minions deal Double Damage\n+2% additional Minion Damage",
    affix3:
      "+14% chance for Synthetic Troop Minions to deal Double Damage\n+6% Minion Attack and Cast Speed for 4 s when your Synthetic Troop Minions deal Double Damage\n+10% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+2% additional Minion Damage",
    affix4:
      "+14% chance for Synthetic Troop Minions to deal Double Damage\n+6% Minion Attack and Cast Speed for 4 s when your Synthetic Troop Minions deal Double Damage\n+10% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
    affix5:
      "+14% chance for Synthetic Troop Minions to deal Double Damage\n+6% Minion Attack and Cast Speed for 4 s when your Synthetic Troop Minions deal Double Damage\n+20% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
    affix6:
      "+19% chance for Synthetic Troop Minions to deal Double Damage\n+8% Minion Attack and Cast Speed for 4 s when your Synthetic Troop Minions deal Double Damage\n+20% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
  },
  {
    type: "Fire",
    rarity: "Legendary",
    name: "Melting Flames",
    innerRing1: { name: "Fire Damage I", affix: "+14% Fire Damage" },
    innerRing2: { name: "Fire Damage I", affix: "+14% Fire Damage" },
    innerRing3: { name: "Fire Penetration I", affix: "+2.5% Fire Penetration" },
    innerRing4: { name: "Fire Penetration I", affix: "+2.5% Fire Penetration" },
    innerRing5: { name: "Fire Area I", affix: "+14% Fire Skill Area" },
    innerRing6: { name: "Fire Area I", affix: "+14% Fire Skill Area" },
    midRing1: { name: "Fire Damage II", affix: "+28% Fire Damage" },
    midRing2: { name: "Fire Penetration II", affix: "+5% Fire Penetration" },
    midRing3: { name: "Fire Area II", affix: "+28% Fire Skill Area" },
    affix1:
      "Covers targets within a 5m radius with flames and debuffs enemies within the area.\nDebuff: + 26% additional Fire Damage taken by the enemy for 3s.\nCooldown: 5 s.",
    affix2:
      "Covers targets within a 5m radius with flames and debuffs enemies within the area.\nDebuff: + 26% additional Fire Damage taken by the enemy for 3s.\nCooldown: 5 s.\n+6% additional Fire Damage",
    affix3:
      "Covers targets within a 5m radius with flames and debuffs enemies within the area.\nDebuff: + 26% additional Fire Damage taken by the enemy for 3s.\nCooldown: 5 s.\n+6% additional Fire Damage\n+2% additional damage",
    affix4:
      "Covers targets within a 5m radius with flames and debuffs enemies within the area.\nDebuff: + 26% additional Fire Damage taken by the enemy for 3s.\nCooldown: 5 s.\n+12% additional Fire Damage\n+2% additional damage",
    affix5:
      "Covers targets within a 5m radius with flames and debuffs enemies within the area.\nDebuff: + 26% additional Fire Damage taken by the enemy for 3s.\nCooldown: 5 s.\n+12% additional Fire Damage\n+4% additional damage",
    affix6:
      "Covers targets within a 5m radius with flames and debuffs enemies within the area.\nDebuff: + 35% additional Fire Damage taken by the enemy for 3s.\nCooldown: 5 s.\n+12% additional Fire Damage\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Rare",
    name: "Plaintive Ball of Thread",
    innerRing1: { name: "Max Life I", affix: "+4% Max Life" },
    innerRing2: { name: "Max Life I", affix: "+4% Max Life" },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: {
      name: "XP Balance I",
      affix:
        "-10% XP falloff caused by the level difference between the player and the map",
    },
    innerRing6: {
      name: "XP Balance I",
      affix:
        "-10% XP falloff caused by the level difference between the player and the map",
    },
    midRing1: { name: "Max Life II", affix: "+8% Max Life" },
    midRing2: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing3: {
      name: "XP Balance II",
      affix:
        "-20% XP falloff caused by the level difference between the player and the map",
    },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\nRegenerates 0.6% Life per second\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\nRegenerates 0.6% Life per second\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\nRegenerates 1.2% Life per second\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\nRegenerates 1.2% Life per second\n-4% additional damage taken",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Plaintive Ball of Thread - Violet",
    innerRing1: {
      name: "Double Damage I",
      affix: "Attack Skills: a +2% chance to deal Double Damage",
    },
    innerRing2: {
      name: "Double Damage I",
      affix: "Attack Skills: a +2% chance to deal Double Damage",
    },
    innerRing3: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing4: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing5: { name: "Multistrike I", affix: "+8% chance to Multistrike" },
    innerRing6: { name: "Multistrike I", affix: "+8% chance to Multistrike" },
    midRing1: {
      name: "Double Damage II",
      affix: "Attack Skills: a +4% chance to deal Double Damage",
    },
    midRing2: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing3: { name: "Multistrike II", affix: "+16% chance to Multistrike" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n7.5% Movement Speed when at least 2 enemies are Nearby\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n7.5% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+15% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+15% Movement Speed when at least 2 enemies are Nearby\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Poisoned Omen",
    innerRing1: { name: "Damage I", affix: "+10% damage" },
    innerRing2: { name: "Damage I", affix: "+10% damage" },
    innerRing3: {
      name: "Cursed Enemy Weakening I",
      affix: "-2% additional damage taken from Cursed enemies",
    },
    innerRing4: {
      name: "Cursed Enemy Weakening I",
      affix: "-2% additional damage taken from Cursed enemies",
    },
    innerRing5: { name: "Curse Effect I", affix: "+1.5% curse effect" },
    innerRing6: { name: "Curse Effect I", affix: "+1.5% curse effect" },
    midRing1: { name: "Damage II", affix: "+20% damage" },
    midRing2: {
      name: "Cursed Enemy Weakening II",
      affix: "-4% additional damage taken from Cursed enemies",
    },
    midRing3: { name: "Curse Effect II", affix: "+3% curse effect" },
    affix1:
      "You can cast 1 additional Curses\n+4% Movement Speed if you have cast a Curse Skill recently",
    affix2:
      "You can cast 1 additional Curses\n+4% Movement Speed if you have cast a Curse Skill recently\n+2% additional damage",
    affix3:
      "You can cast 1 additional Curses\n+4% Movement Speed if you have cast a Curse Skill recently\n+8% additional damage against Cursed enemies\n+2% additional damage",
    affix4:
      "You can cast 1 additional Curses\n+4% Movement Speed if you have cast a Curse Skill recently\n+8% additional damage against Cursed enemies\n+4% additional damage",
    affix5:
      "You can cast 1 additional Curses\n+4% Movement Speed if you have cast a Curse Skill recently\n+16% additional damage against Cursed enemies\n+4% additional damage",
    affix6:
      "You can cast 1 additional Curses\n6.5% Movement Speed if you have cast a Curse Skill recently\n+16% additional damage against Cursed enemies\n+4% additional damage",
  },
  {
    type: "Erosion",
    rarity: "Legendary",
    name: "Portrait of a Fallen Saintess",
    innerRing1: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing2: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing3: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing4: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing5: {
      name: "Erosion Penetration I",
      affix: "+2.5% Erosion Resistance Penetration",
    },
    innerRing6: {
      name: "Erosion Penetration I",
      affix: "+2.5% Erosion Resistance Penetration",
    },
    midRing1: { name: "Erosion Damage II", affix: "+28% Erosion Damage" },
    midRing2: { name: "Erosion Damage II", affix: "+28% Erosion Damage" },
    midRing3: {
      name: "Erosion Penetration II",
      affix: "+5% Erosion Resistance Penetration",
    },
    affix1: "Gains 1 stack of Repentance when gaining any Blessing",
    affix2:
      "Gains 1 stack of Repentance when gaining any Blessing\n+1 Max Repentance Stacks",
    affix3:
      "Gains 1 stack of Repentance when gaining any Blessing\n+1 Max Repentance Stacks\n+1% Erosion Resistance per stack of Repentance",
    affix4:
      "Gains 1 stack of Repentance when gaining any Blessing\n+2 Max Repentance Stacks\n+1% Erosion Resistance per stack of Repentance",
    affix5:
      "Gains 1 stack of Repentance when gaining any Blessing\n+2 Max Repentance Stacks\n+3% Erosion Resistance per stack of Repentance",
    affix6:
      "Gains 1 stack of Repentance when gaining any Blessing\n+3 Max Repentance Stacks\n+3% Erosion Resistance per stack of Repentance",
  },
  {
    type: "Survival",
    rarity: "Legendary",
    name: "Preserver of Eternity",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Damage Avoidance I",
      affix: "+1.5% chance to avoid damage",
    },
    innerRing4: {
      name: "Damage Avoidance I",
      affix: "+1.5% chance to avoid damage",
    },
    innerRing5: { name: "XP Protection I", affix: "-10% XP lost upon death" },
    innerRing6: { name: "XP Protection I", affix: "-10% XP lost upon death" },
    midRing1: {
      name: "Elemental Resistance II",
      affix: "+5% Elemental Resistance",
    },
    midRing2: {
      name: "Damage Avoidance II",
      affix: "+3% chance to avoid damage",
    },
    midRing3: { name: "XP Protection II", affix: "-20% XP lost upon death" },
    affix1:
      "+30% Movement Speed if you haven't been hit recently\n+6% Movement Speed",
    affix2:
      "+30% Movement Speed if you haven't been hit recently\n+6% Movement Speed\n-2% additional damage taken",
    affix3:
      "+30% Movement Speed if you haven't been hit recently\n+6% Movement Speed\n+10% Movement Speed\n-2% additional damage taken",
    affix4:
      "+30% Movement Speed if you haven't been hit recently\n+6% Movement Speed\n+10% Movement Speed\n-4% additional damage taken",
    affix5:
      "+30% Movement Speed if you haven't been hit recently\n+6% Movement Speed\n+20% Movement Speed\n-4% additional damage taken",
    affix6:
      "+40% Movement Speed if you haven't been hit recently\n+8% Movement Speed\n+20% Movement Speed\n-4% additional damage taken",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Raging Sands of Eternal Night",
    innerRing1: { name: "Damage I", affix: "+10% damage" },
    innerRing2: { name: "Damage I", affix: "+10% damage" },
    innerRing3: { name: "Attack Block I", affix: "+6% Attack Block Chance" },
    innerRing4: { name: "Attack Block I", affix: "+6% Attack Block Chance" },
    innerRing5: { name: "Spell Block I", affix: "+6% Spell Block Chance" },
    innerRing6: { name: "Spell Block I", affix: "+6% Spell Block Chance" },
    midRing1: { name: "Damage II", affix: "+20% damage" },
    midRing2: { name: "Attack Block II", affix: "+12% Attack Block Chance" },
    midRing3: { name: "Spell Block II", affix: "+12% Spell Block Chance" },
    affix1:
      "Attacks eliminate enemies under 15% Life on hit if you have Blocked recently",
    affix2:
      "Attacks eliminate enemies under 15% Life on hit if you have Blocked recently\n+2% additional damage",
    affix3:
      "Attacks eliminate enemies under 15% Life on hit if you have Blocked recently\n+3% Block Ratio when there is a Boss Nearby\n+2% additional damage",
    affix4:
      "Attacks eliminate enemies under 15% Life on hit if you have Blocked recently\n+3% Block Ratio when there is a Boss Nearby\n+4% additional damage",
    affix5:
      "Attacks eliminate enemies under 15% Life on hit if you have Blocked recently\n+6% Block Ratio when there is a Boss Nearby\n+4% additional damage",
    affix6:
      "Attacks eliminate enemies under 20% Life on hit if you have Blocked recently\n+6% Block Ratio when there is a Boss Nearby\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Red Umbrella",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing2: {
      name: "Attack Critical Strike II",
      affix: "+45% Attack Critical Strike Rating",
    },
    midRing3: { name: "Attack Speed II", affix: "+8% Attack Speed" },
    affix1:
      "+19% chance for Attacks to inflict Paralysis on hit\n+10% additional Attack Damage dealt to Nearby enemies",
    affix2:
      "+19% chance for Attacks to inflict Paralysis on hit\n+10% additional Attack Damage dealt to Nearby enemies\n+2% additional damage",
    affix3:
      "+19% chance for Attacks to inflict Paralysis on hit\n+10% additional Attack Damage dealt to Nearby enemies\n+6% additional Attack Damage dealt to Nearby enemies\n+2% additional damage",
    affix4:
      "+19% chance for Attacks to inflict Paralysis on hit\n+10% additional Attack Damage dealt to Nearby enemies\n+6% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
    affix5:
      "+19% chance for Attacks to inflict Paralysis on hit\n+10% additional Attack Damage dealt to Nearby enemies\n+12% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
    affix6:
      "+26% chance for Attacks to inflict Paralysis on hit\n+14% additional Attack Damage dealt to Nearby enemies\n+12% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
  },
  {
    type: "Summon",
    rarity: "Legendary",
    name: "Scale of Original Sin",
    innerRing1: {
      name: "Spirit Magus Seal Removed I",
      affix: "+10% Sealed Mana Compensation for Spirit Magus Skills",
    },
    innerRing2: {
      name: "Spirit Magus Seal Removed I",
      affix: "+10% Sealed Mana Compensation for Spirit Magus Skills",
    },
    innerRing3: { name: "Damage I", affix: "+10% damage\n+10% Minion Damage" },
    innerRing4: { name: "Damage I", affix: "+10% damage\n+10% Minion Damage" },
    innerRing5: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing6: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    midRing1: {
      name: "Spirit Magus Seal Removed II",
      affix: "+20% Sealed Mana Compensation for Spirit Magus Skills",
    },
    midRing2: { name: "Damage II", affix: "+20% damage\n+20% Minion Damage" },
    midRing3: {
      name: "Skill Duration II",
      affix: "+10% Skill Effect Duration",
    },
    affix1:
      "+40% additional Spirit Magus Ultimate Damage and Ailment Damage dealt by Ultimate when any two of Strength, Dexterity, and Intelligence are equal",
    affix2:
      "+40% additional Spirit Magus Ultimate Damage and Ailment Damage dealt by Ultimate when any two of Strength, Dexterity, and Intelligence are equal\n+2% additional Minion Damage",
    affix3:
      "+40% additional Spirit Magus Ultimate Damage and Ailment Damage dealt by Ultimate when any two of Strength, Dexterity, and Intelligence are equal\n+1 Spirit Magus Skill Level\n+2% additional Minion Damage",
    affix4:
      "+40% additional Spirit Magus Ultimate Damage and Ailment Damage dealt by Ultimate when any two of Strength, Dexterity, and Intelligence are equal\n+1 Spirit Magus Skill Level\n+4% additional Minion Damage",
    affix5:
      "+40% additional Spirit Magus Ultimate Damage and Ailment Damage dealt by Ultimate when any two of Strength, Dexterity, and Intelligence are equal\n+2 Spirit Magus Skill Level\n+4% additional Minion Damage",
    affix6:
      "+53% additional Spirit Magus Ultimate Damage and Ailment Damage dealt by Ultimate when any two of Strength, Dexterity, and Intelligence are equal\n+2 Spirit Magus Skill Level\n+4% additional Minion Damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Shocket - Green Leaf",
    innerRing1: { name: "Damage I", affix: "+10% damage" },
    innerRing2: { name: "Damage I", affix: "+10% damage" },
    innerRing3: { name: "Attack Block I", affix: "+6% Attack Block Chance" },
    innerRing4: { name: "Attack Block I", affix: "+6% Attack Block Chance" },
    innerRing5: { name: "Spell Block I", affix: "+6% Spell Block Chance" },
    innerRing6: { name: "Spell Block I", affix: "+6% Spell Block Chance" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n0.8% Block Ratio when there is a Boss Nearby\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n0.8% Block Ratio when there is a Boss Nearby\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n1.6% Block Ratio when there is a Boss Nearby\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n1.6% Block Ratio when there is a Boss Nearby\n+4% additional damage",
  },
  {
    type: "Summon",
    rarity: "Magic",
    name: "Shocket - Pale",
    innerRing1: {
      name: "Spirit Magus Seal Removed I",
      affix: "+10% Sealed Mana Compensation for Spirit Magus Skills",
    },
    innerRing2: {
      name: "Spirit Magus Seal Removed I",
      affix: "+10% Sealed Mana Compensation for Spirit Magus Skills",
    },
    innerRing3: { name: "Damage I", affix: "+10% damage\n+10% Minion Damage" },
    innerRing4: { name: "Damage I", affix: "+10% damage\n+10% Minion Damage" },
    innerRing5: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    innerRing6: {
      name: "Skill Duration I",
      affix: "+5% Skill Effect Duration",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+14% Spirit Magus Skill Damage\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+14% Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+28% Spirit Magus Skill Damage\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+28% Spirit Magus Skill Damage\n+4% additional Minion Damage",
  },
  {
    type: "Persistent",
    rarity: "Magic",
    name: "Shocket - Violet",
    innerRing1: {
      name: "Reaping Cooldown I",
      affix: "+5% Reaping Cooldown Recovery Speed",
    },
    innerRing2: {
      name: "Reaping Cooldown I",
      affix: "+5% Reaping Cooldown Recovery Speed",
    },
    innerRing3: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing4: { name: "Damage Over Time I", affix: "+12% Damage Over Time" },
    innerRing5: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    innerRing6: {
      name: "Damage Affliction I",
      affix: "+10% Affliction Effect",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n2.5% Movement Speed if you have caused Reaping recently\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n2.5% Movement Speed if you have caused Reaping recently\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+5% Movement Speed if you have caused Reaping recently\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+5% Movement Speed if you have caused Reaping recently\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Shro-Shroom - Boletus",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing2: {
      name: "Attack Critical Strike II",
      affix: "+44% Attack Critical Strike Rating",
    },
    midRing3: { name: "Attack Speed II", affix: "+8% Attack Speed" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+14% Elemental Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+14% Elemental Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+28% Elemental Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+28% Elemental Damage\n+4% additional damage",
  },
  {
    type: "Spell",
    rarity: "Rare",
    name: "Shro-Shroom - Oyster Mushroom",
    innerRing1: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing2: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing3: {
      name: "Spell Critical Strike I",
      affix: "+22% Spell Critical Strike Rating",
    },
    innerRing4: {
      name: "Spell Critical Strike I",
      affix: "+22% Spell Critical Strike Rating",
    },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: { name: "Spell Damage II", affix: "+24% Spell Damage" },
    midRing2: {
      name: "Spell Critical Strike II",
      affix: "+45% Spell Critical Strike Rating",
    },
    midRing3: { name: "Cast Speed II", affix: "+8% Cast Speed" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+14% Spell Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+14% Spell Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+28% Spell Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+28% Spell Damage\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Magic",
    name: "Spiny Snail - Cloudless Sky",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Damage Mitigation I",
      affix: "-1.5% additional damage taken",
    },
    innerRing4: {
      name: "Damage Mitigation I",
      affix: "-1.5% additional damage taken",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing2: { name: "", affix: "" },
    midRing3: { name: "", affix: "" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\n-1% additional damage taken\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\n-1% additional damage taken\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\n-2% additional damage taken\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\n-2% additional damage taken\n-4% additional damage taken",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Spiny Snail - Flame",
    innerRing1: { name: "Damage I", affix: "+10% damage" },
    innerRing2: { name: "Damage I", affix: "+10% damage" },
    innerRing3: {
      name: "Cursed Enemy Weakening I",
      affix: "-2% additional damage taken from Cursed enemies",
    },
    innerRing4: {
      name: "Cursed Enemy Weakening I",
      affix: "-2% additional damage taken from Cursed enemies",
    },
    innerRing5: { name: "Curse Effect I", affix: "+1.5% curse effect" },
    innerRing6: { name: "Curse Effect I", affix: "+1.5% curse effect" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage against Cursed enemies\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage against Cursed enemies\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+4% additional damage against Cursed enemies\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+4% additional damage against Cursed enemies\n+4% additional damage",
  },
  {
    type: "Summon",
    rarity: "Magic",
    name: "Spiny Snail - Flower",
    innerRing1: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing3: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing4: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n2.5% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n2.5% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+5% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+5% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
  },
  {
    type: "Survival",
    rarity: "Magic",
    name: "Spiny Snail - Green",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing2: { name: "", affix: "" },
    midRing3: { name: "", affix: "" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\nConverts 1% of Physical Damage taken to random Elemental Damage\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\nConverts 1% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\nConverts 2% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\nConverts 2% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
  },
  {
    type: "Summon",
    rarity: "Magic",
    name: "Spiny Snail - Iris",
    innerRing1: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing3: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing4: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+20 Critical Strike Rating for recently summoned Minions\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+20 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+40 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+40 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
  },
  {
    type: "Survival",
    rarity: "Legendary",
    name: "Spirit Bless",
    innerRing1: { name: "Max Energy Shield I", affix: "+4% Max Energy Shield" },
    innerRing2: { name: "Max Energy Shield I", affix: "+4% Max Energy Shield" },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: { name: "Max Energy Shield II", affix: "+8% Max Energy Shield" },
    midRing2: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing3: { name: "XP Bonus II", affix: "+6% XP earned" },
    affix1: "+10% additional Max Energy Shield\n+6% Energy Shield Charge Speed",
    affix2:
      "+10% additional Max Energy Shield\n+6% Energy Shield Charge Speed\n-2% additional damage taken",
    affix3:
      "+10% additional Max Energy Shield\n+6% Energy Shield Charge Speed\n+8% Energy Shield Charge Speed\n-2% additional damage taken",
    affix4:
      "+10% additional Max Energy Shield\n+6% Energy Shield Charge Speed\n+8% Energy Shield Charge Speed\n-4% additional damage taken",
    affix5:
      "+10% additional Max Energy Shield\n+6% Energy Shield Charge Speed\n+16% Energy Shield Charge Speed\n-4% additional damage taken",
    affix6:
      "+14% additional Max Energy Shield\n+8% Energy Shield Charge Speed\n+16% Energy Shield Charge Speed\n-4% additional damage taken",
  },
  {
    type: "Summon",
    rarity: "Legendary",
    name: "Sprite of Silent Vale",
    innerRing1: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing3: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing4: { name: "Servant Damage I", affix: "+14% Minion Damage" },
    innerRing5: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing6: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    midRing1: { name: "Servant Damage II", affix: "+28% Minion Damage" },
    midRing2: { name: "Servant Damage II", affix: "+28% Minion Damage" },
    midRing3: {
      name: "Servant Speed II",
      affix: "+8% Minion Attack and Cast Speed",
    },
    affix1: "+60 initial Growth for Spirit Magi",
    affix2:
      "+60 initial Growth for Spirit Magi\n+6% Movement Speed when a Spirit Magus is nearby",
    affix3:
      "+60 initial Growth for Spirit Magi\n+6% Movement Speed when a Spirit Magus is nearby\nFor every 20 Growth a Spirit Magus has, it deals +1% additional damage, up to +5% additional damage",
    affix4:
      "+60 initial Growth for Spirit Magi\n+12% Movement Speed when a Spirit Magus is nearby\nFor every 20 Growth a Spirit Magus has, it deals +1% additional damage, up to +5% additional damage",
    affix5:
      "+60 initial Growth for Spirit Magi\n+12% Movement Speed when a Spirit Magus is nearby\nFor every 20 Growth a Spirit Magus has, it deals +1% additional damage, up to +10% additional damage",
    affix6:
      "+75 initial Growth for Spirit Magi\n+12% Movement Speed when a Spirit Magus is nearby\nFor every 20 Growth a Spirit Magus has, it deals +1% additional damage, up to +10% additional damage",
  },
  {
    type: "Attack",
    rarity: "Magic",
    name: "Sprouting Grass - Black Porcelain",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+7% Elemental Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+7% Elemental Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+14% Elemental Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+14% Elemental Damage\n+4% additional damage",
  },
  {
    type: "Erosion",
    rarity: "Magic",
    name: "Sprouting Grass - Green Porcelain",
    innerRing1: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing2: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing3: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing4: { name: "Erosion Damage I", affix: "+14% Erosion Damage" },
    innerRing5: {
      name: "Erosion Penetration I",
      affix: "+2.5% Erosion Resistance Penetration",
    },
    innerRing6: {
      name: "Erosion Penetration I",
      affix: "+2.5% Erosion Resistance Penetration",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing3: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+7% Erosion Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+7% Erosion Damage\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+14% Erosion Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+14% Erosion Damage\n+4% additional damage",
  },
  {
    type: "Spell",
    rarity: "Legendary",
    name: "Squiddle",
    innerRing1: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing2: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing3: {
      name: "Spell Critical Strike I",
      affix: "+22% Spell Critical Strike Rating",
    },
    innerRing4: {
      name: "Spell Critical Strike I",
      affix: "+22% Spell Critical Strike Rating",
    },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: { name: "Spell Damage II", affix: "+24% Spell Damage" },
    midRing2: {
      name: "Spell Critical Strike II",
      affix: "+45% Spell Critical Strike Rating",
    },
    midRing3: { name: "Cast Speed II", affix: "+8% Cast Speed" },
    affix1:
      "Activating Spell Burst with at least 6 stack(s) of Max Spell Burst grants 1 stack of Squidnova",
    affix2:
      "Activating Spell Burst with at least 6 stack(s) of Max Spell Burst grants 1 stack of Squidnova\n+25% Squidnova Effect",
    affix3:
      "Activating Spell Burst with at least 6 stack(s) of Max Spell Burst grants 1 stack of Squidnova\n+25% Squidnova Effect\n+4% additional Spell Damage when having Squidnova",
    affix4:
      "Activating Spell Burst with at least 6 stack(s) of Max Spell Burst grants 1 stack of Squidnova\n+50% Squidnova Effect\n+4% additional Spell Damage when having Squidnova",
    affix5:
      "Activating Spell Burst with at least 6 stack(s) of Max Spell Burst grants 1 stack of Squidnova\n+50% Squidnova Effect\n+8% additional Spell Damage when having Squidnova",
    affix6:
      "Activating Spell Burst with at least 6 stack(s) of Max Spell Burst grants 1 stack of Squidnova\n+50% Squidnova Effect\n+8% additional Spell Damage when having Squidnova\n+1 to Max Spell Burst when having Squidnova",
  },
  {
    type: "Spell",
    rarity: "Legendary",
    name: "Starcatcher",
    innerRing1: {
      name: "Double Spell I",
      affix: "+2% chance for Spells to deal Double Damage",
    },
    innerRing2: {
      name: "Double Spell I",
      affix: "+2% chance for Spells to deal Double Damage",
    },
    innerRing3: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing4: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: {
      name: "Double Spell II",
      affix: "+4% chance for Spells to deal Double Damage",
    },
    midRing2: { name: "Spell Damage II", affix: "+24% Spell Damage" },
    midRing3: { name: "Cast Speed II", affix: "+8% Cast Speed" },
    affix1:
      "+6% additional Cast Speed per second when an Elite is Nearby, up to +18%\n+3% Movement Speed when an Elite is Nearby, up to +9%",
    affix2:
      "+6% additional Cast Speed per second when an Elite is Nearby, up to +18%\n+3% Movement Speed when an Elite is Nearby, up to +9%\n+2% additional damage",
    affix3:
      "+6% additional Cast Speed per second when an Elite is Nearby, up to +18%\n+3% Movement Speed when an Elite is Nearby, up to +9%\n+5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+2% additional damage",
    affix4:
      "+6% additional Cast Speed per second when an Elite is Nearby, up to +18%\n+3% Movement Speed when an Elite is Nearby, up to +9%\n+5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
    affix5:
      "+6% additional Cast Speed per second when an Elite is Nearby, up to +18%\n+3% Movement Speed when an Elite is Nearby, up to +9%\n+10% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
    affix6:
      "+8% additional Cast Speed per second when an Elite is Nearby, up to +24%\n+4% Movement Speed when an Elite is Nearby, up to +12%\n+10% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Swaying Bonnie",
    innerRing1: {
      name: "Movement Speed I",
      affix: "+4% Movement Speed while channeling",
    },
    innerRing2: {
      name: "Movement Speed I",
      affix: "+4% Movement Speed while channeling",
    },
    innerRing3: {
      name: "Channeled Damage I",
      affix: "+14% damage for Channeled Skills",
    },
    innerRing4: {
      name: "Channeled Damage I",
      affix: "+14% damage for Channeled Skills",
    },
    innerRing5: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    innerRing6: {
      name: "Attack and Cast Speed I",
      affix: "+4% Attack and Cast Speed",
    },
    midRing1: {
      name: "Movement Speed II",
      affix: "+8% Movement Speed while channeling",
    },
    midRing2: {
      name: "Channeled Damage II",
      affix: "+28% damage for Channeled Skills",
    },
    midRing3: {
      name: "Attack and Cast Speed II",
      affix: "+8% Attack and Cast Speed",
    },
    affix1: "Max Channeled Stacks +2",
    affix2:
      "Max Channeled Stacks +2\nAt max channeled stacks, +4% additional damage for Channeled Skills for 4 s",
    affix3:
      "Max Channeled Stacks +2\nAt max channeled stacks, +4% additional damage for Channeled Skills for 4 s\nFor every 4 channeled stacks, inflicts Weaken on enemies within 10 m",
    affix4:
      "Max Channeled Stacks +2\nAt max channeled stacks, +8% additional damage for Channeled Skills for 4 s\nFor every 4 channeled stacks, inflicts Weaken on enemies within 10 m",
    affix5:
      "Max Channeled Stacks +2\nAt max channeled stacks, +8% additional damage for Channeled Skills for 4 s\nFor every 4 channeled stacks, inflicts Weaken on enemies within 20 m",
    affix6:
      "Max Channeled Stacks +2\nAt max channeled stacks, +12% additional damage for Channeled Skills for 4 s\nFor every 4 channeled stacks, inflicts Weaken on enemies within 20 m",
  },
  {
    type: "Spell",
    rarity: "Legendary",
    name: "The Bone worm's Daughter",
    innerRing1: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing2: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing3: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing4: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing5: {
      name: "Critical Strike Damage I",
      affix: "+10% Critical Strike Damage",
    },
    innerRing6: {
      name: "Critical Strike Damage I",
      affix: "+10% Critical Strike Damage",
    },
    midRing1: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing2: { name: "Spell Damage II", affix: "+24% Spell Damage" },
    midRing3: {
      name: "Critical Strike Damage II",
      affix: "+20% Critical Strike Damage",
    },
    affix1:
      "+50 Spell Critical Strike Rating per Ailment on enemies, up to +100\n+6% Critical Strike Damage per Ailment on enemies, up to +12%",
    affix2:
      "+50 Spell Critical Strike Rating per Ailment on enemies, up to +100\n+6% Critical Strike Damage per Ailment on enemies, up to +12%\n+2% additional damage",
    affix3:
      "+50 Spell Critical Strike Rating per Ailment on enemies, up to +100\n+6% Critical Strike Damage per Ailment on enemies, up to +12%\n+9% Critical Strike Damage per Ailment on enemies, up to +18%\n+2% additional damage",
    affix4:
      "+50 Spell Critical Strike Rating per Ailment on enemies, up to +100\n+6% Critical Strike Damage per Ailment on enemies, up to +12%\n+9% Critical Strike Damage per Ailment on enemies, up to +18%\n+4% additional damage",
    affix5:
      "+50 Spell Critical Strike Rating per Ailment on enemies, up to +100\n+6% Critical Strike Damage per Ailment on enemies, up to +12%\n+18% Critical Strike Damage per Ailment on enemies, up to +36%\n+4% additional damage",
    affix6:
      "+70 Spell Critical Strike Rating per Ailment on enemies, up to +140\n+7% Critical Strike Damage per Ailment on enemies, up to +14%\n+18% Critical Strike Damage per Ailment on enemies, up to +36%\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Rare",
    name: "Traveling Lizard - Flower",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Damage Avoidance I",
      affix: "+1.5% chance to avoid damage",
    },
    innerRing4: {
      name: "Damage Avoidance I",
      affix: "+1.5% chance to avoid damage",
    },
    innerRing5: { name: "XP Protection I", affix: "-10% XP lost upon death" },
    innerRing6: { name: "XP Protection I", affix: "-10% XP lost upon death" },
    midRing1: {
      name: "Elemental Resistance II",
      affix: "+5% Elemental Resistance",
    },
    midRing2: {
      name: "Damage Avoidance II",
      affix: "+3% chance to avoid damage",
    },
    midRing3: { name: "XP Protection II", affix: "-20% XP lost upon death" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\n+5% Movement Speed\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\n+5% Movement Speed\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\n+10% Movement Speed\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\n+10% Movement Speed\n-4% additional damage taken",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Traveling Lizard - Green Leaf",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing2: {
      name: "Attack Critical Strike II",
      affix: "+45% Attack Critical Strike Rating",
    },
    midRing3: { name: "Attack Speed II", affix: "+8% Attack Speed" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Attack Damage dealt to Nearby enemies\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+6% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+6% additional Attack Damage dealt to Nearby enemies\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Rare",
    name: "Traveling Lizard - Ocean",
    innerRing1: { name: "Max Energy Shield I", affix: "+4% Max Energy Shield" },
    innerRing2: { name: "Max Energy Shield I", affix: "+4% Max Energy Shield" },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: { name: "Max Energy Shield II", affix: "+8% Max Energy Shield" },
    midRing2: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing3: { name: "XP Bonus II", affix: "+6% XP earned" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\n+4% Energy Shield Charge Speed\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\n+4% Energy Shield Charge Speed\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\n+8% Energy Shield Charge Speed\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\n+8% Energy Shield Charge Speed\n-4% additional damage taken",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Traveling Lizard - Violet",
    innerRing1: {
      name: "Projectile Damage I",
      affix: "+14% Projectile Damage",
    },
    innerRing2: {
      name: "Projectile Damage I",
      affix: "+14% Projectile Damage",
    },
    innerRing3: { name: "Projectile Speed I", affix: "+6% Projectile Speed" },
    innerRing4: { name: "Projectile Speed I", affix: "+6% Projectile Speed" },
    innerRing5: {
      name: "Multistrike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing6: {
      name: "Multistrike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    midRing1: { name: "Projectile Damage II", affix: "+30% Projectile Damage" },
    midRing2: { name: "Projectile Speed II", affix: "+12% Projectile Speed" },
    midRing3: {
      name: "Multistrike II",
      affix: "+45% Attack Critical Strike Rating",
    },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+35 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+35 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+70 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+70 Attack Projectile Skill Critical Strike Rating against Distant enemies\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Valkyrie's Night Patrol",
    innerRing1: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing2: { name: "Attack Damage I", affix: "+12% Attack Damage" },
    innerRing3: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing4: {
      name: "Attack Critical Strike I",
      affix: "+22% Attack Critical Strike Rating",
    },
    innerRing5: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    innerRing6: { name: "Attack Speed I", affix: "+4% Attack Speed" },
    midRing1: { name: "Attack Damage II", affix: "+24% Attack Damage" },
    midRing2: {
      name: "Attack Critical Strike II",
      affix: "+44% Attack Critical Strike Rating",
    },
    midRing3: { name: "Attack Speed II", affix: "+8% Attack Speed" },
    affix1: "Gains 1 stack of Valkyrie's Hymn for every 2% Max Mana consumed",
    affix2:
      "Gains 1 stack of Valkyrie's Hymn for every 2% Max Mana consumed\n+1 Max Valkyrie's Hymn Stacks",
    affix3:
      "Gains 1 stack of Valkyrie's Hymn for every 2% Max Mana consumed\n+1 Max Valkyrie's Hymn Stacks\n+4% Elemental Damage for every stack of Valkyrie's Hymn",
    affix4:
      "Gains 1 stack of Valkyrie's Hymn for every 2% Max Mana consumed\n+2 Max Valkyrie's Hymn Stacks\n+4% Elemental Damage for every stack of Valkyrie's Hymn",
    affix5:
      "Gains 1 stack of Valkyrie's Hymn for every 2% Max Mana consumed\n+2 Max Valkyrie's Hymn Stacks\n+8% Elemental Damage for every stack of Valkyrie's Hymn",
    affix6:
      "Gains 1 stack of Valkyrie's Hymn for every 2% Max Mana consumed\n+2 Max Valkyrie's Hymn Stacks\n+8% Elemental Damage for every stack of Valkyrie's Hymn\nUpon reaching Max Valkyrie's Hymn Stacks, +10% Elemental Resistance Penetration",
  },
  {
    type: "Survival",
    rarity: "Legendary",
    name: "Warbler of Plum Blossoms",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: {
      name: "Elemental Resistance II",
      affix: "+5% Elemental Resistance",
    },
    midRing2: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing3: { name: "XP Bonus II", affix: "+6% XP earned" },
    affix1:
      "+10% Elemental Resistance\nConverts 2% of Physical Damage taken to random Elemental Damage",
    affix2:
      "+10% Elemental Resistance\nConverts 2% of Physical Damage taken to random Elemental Damage\n-2% additional damage taken",
    affix3:
      "+10% Elemental Resistance\nConverts 2% of Physical Damage taken to random Elemental Damage\nConverts 4% of Physical Damage taken to random Elemental Damage\n-2% additional damage taken",
    affix4:
      "+10% Elemental Resistance\nConverts 2% of Physical Damage taken to random Elemental Damage\nConverts 4% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
    affix5:
      "+10% Elemental Resistance\nConverts 2% of Physical Damage taken to random Elemental Damage\nConverts 8% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
    affix6:
      "+14% Elemental Resistance\nConverts 3% of Physical Damage taken to random Elemental Damage\nConverts 8% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
  },
  {
    type: "Summon",
    rarity: "Legendary",
    name: "Whisperwind Leaves",
    innerRing1: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing3: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing4: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: { name: "Servant Damage II", affix: "+30% Minion Damage" },
    midRing2: {
      name: "Servant Speed II",
      affix: "+8% Minion Attack and Cast Speed",
    },
    midRing3: { name: "Servant Life II", affix: "+8% Minion Max Life" },
    affix1:
      "+22% additional damage for recently summoned Minions\n+50 Critical Strike Rating for recently summoned Minions",
    affix2:
      "+22% additional damage for recently summoned Minions\n+50 Critical Strike Rating for recently summoned Minions\n+2% additional Minion Damage",
    affix3:
      "+22% additional damage for recently summoned Minions\n+50 Critical Strike Rating for recently summoned Minions\n+80 Critical Strike Rating for recently summoned Minions\n+2% additional Minion Damage",
    affix4:
      "+22% additional damage for recently summoned Minions\n+50 Critical Strike Rating for recently summoned Minions\n+80 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
    affix5:
      "+22% additional damage for recently summoned Minions\n+50 Critical Strike Rating for recently summoned Minions\n+160 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
    affix6:
      "+30% additional damage for recently summoned Minions\n+60 Critical Strike Rating for recently summoned Minions\n+160 Critical Strike Rating for recently summoned Minions\n+4% additional Minion Damage",
  },
  {
    type: "Summon",
    rarity: "Rare",
    name: "Winter Darer",
    innerRing1: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing2: { name: "Servant Damage I", affix: "+15% Minion Damage" },
    innerRing3: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing4: {
      name: "Servant Speed I",
      affix: "+4% Minion Attack and Cast Speed",
    },
    innerRing5: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    innerRing6: { name: "Servant Life I", affix: "+4% Minion Max Life" },
    midRing1: { name: "Servant Damage II", affix: "+30% Minion Damage" },
    midRing2: {
      name: "Servant Speed II",
      affix: "+8% Minion Attack and Cast Speed",
    },
    midRing3: { name: "Servant Life II", affix: "+8% Minion Max Life" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional Minion Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+5% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+2% additional Minion Damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+5% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+10% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+10% Minion Attack and Cast Speed for 4 s when your Synthetic Troops deal Double Damage\n+4% additional Minion Damage",
  },
  {
    type: "Fire",
    rarity: "Rare",
    name: "Winter Darer - Lava",
    innerRing1: { name: "Fire Damage I", affix: "+14% Fire Damage" },
    innerRing2: { name: "Fire Damage I", affix: "+14% Fire Damage" },
    innerRing3: { name: "Fire Penetration I", affix: "+2.5% Fire Penetration" },
    innerRing4: { name: "Fire Penetration I", affix: "+2.5% Fire Penetration" },
    innerRing5: { name: "Fire Area I", affix: "+14% Fire Skill Area" },
    innerRing6: { name: "Fire Area I", affix: "+14% Fire Skill Area" },
    midRing1: { name: "Fire Damage II", affix: "+28% Fire Damage" },
    midRing2: { name: "Fire Penetration II", affix: "+5% Fire Penetration" },
    midRing3: { name: "Fire Area II", affix: "+28% Fire Skill Area" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Fire Damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+3% additional Fire Damage\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+6% additional Fire Damage\n+2% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+6% additional Fire Damage\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+6% additional Fire Damage\n+4% additional damage",
  },
  {
    type: "Survival",
    rarity: "Rare",
    name: "Winter Darer - Rock",
    innerRing1: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing2: {
      name: "Elemental Resistance I",
      affix: "+2.5% Elemental Resistance",
    },
    innerRing3: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing4: {
      name: "Mana Restoration I",
      affix: "+15% Mana Regeneration Speed",
    },
    innerRing5: { name: "XP Bonus I", affix: "+3% XP earned" },
    innerRing6: { name: "XP Bonus I", affix: "+3% XP earned" },
    midRing1: {
      name: "Elemental Resistance II",
      affix: "+5% Elemental Resistance",
    },
    midRing2: {
      name: "Mana Restoration II",
      affix: "+30% Mana Regeneration Speed",
    },
    midRing3: { name: "XP Bonus II", affix: "+6% XP earned" },
    affix1: "-5% additional damage taken",
    affix2: "-5% additional damage taken\n-2% additional damage taken",
    affix3:
      "-5% additional damage taken\nConverts 2% of Physical Damage taken to random Elemental Damage\n-2% additional damage taken",
    affix4:
      "-5% additional damage taken\nConverts 2% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
    affix5:
      "-5% additional damage taken\nConverts 4% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
    affix6:
      "-6% additional damage taken\nConverts 4% of Physical Damage taken to random Elemental Damage\n-4% additional damage taken",
  },
  {
    type: "Spell",
    rarity: "Rare",
    name: "Winter Darer - Shallow Sea",
    innerRing1: {
      name: "Double Spell I",
      affix: "+2% chance for Spells to deal Double Damage",
    },
    innerRing2: {
      name: "Double Spell I",
      affix: "+2% chance for Spells to deal Double Damage",
    },
    innerRing3: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing4: { name: "Spell Damage I", affix: "+12% Spell Damage" },
    innerRing5: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    innerRing6: { name: "Cast Speed I", affix: "+4% Cast Speed" },
    midRing1: {
      name: "Double Spell II",
      affix: "+4% chance for Spells to deal Double Damage",
    },
    midRing2: { name: "Spell Damage II", affix: "+24% Spell Damage" },
    midRing3: { name: "Cast Speed II", affix: "+8% Cast Speed" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n2.5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n2.5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+5% Movement Speed per second when an Elite is nearby, up to +3 stack(s)\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Rare",
    name: "Winter Darer - Sky",
    innerRing1: { name: "Damage I", affix: "+10% damage" },
    innerRing2: { name: "Damage I", affix: "+10% damage" },
    innerRing3: {
      name: "Cursed Enemy Weakening I",
      affix: "-2% additional damage taken from Cursed enemies",
    },
    innerRing4: {
      name: "Cursed Enemy Weakening I",
      affix: "-2% additional damage taken from Cursed enemies",
    },
    innerRing5: { name: "Curse Effect I", affix: "+1.5% curse effect" },
    innerRing6: { name: "Curse Effect I", affix: "+1.5% curse effect" },
    midRing1: { name: "Damage II", affix: "+20% damage" },
    midRing2: {
      name: "Cursed Enemy Weakening II",
      affix: "-4% additional damage taken from Cursed enemies",
    },
    midRing3: { name: "Curse Effect II", affix: "+3% curse effect" },
    affix1: "+5% additional damage; +5% additional Minion Damage",
    affix2:
      "+5% additional damage; +5% additional Minion Damage\n+2% additional damage",
    affix3:
      "+5% additional damage; +5% additional Minion Damage\n+4% additional damage against Cursed enemies\n+2% additional damage",
    affix4:
      "+5% additional damage; +5% additional Minion Damage\n+4% additional damage against Cursed enemies\n+4% additional damage",
    affix5:
      "+5% additional damage; +5% additional Minion Damage\n+8% additional damage against Cursed enemies\n+4% additional damage",
    affix6:
      "+7% additional damage; +7% additional Minion Damage\n+8% additional damage against Cursed enemies\n+4% additional damage",
  },
  {
    type: "Attack",
    rarity: "Legendary",
    name: "Witch Antelope of Lust",
    innerRing1: { name: "Damage I", affix: "+12% damage\n+12% Minion Damage" },
    innerRing2: { name: "Damage I", affix: "+12% damage\n+12% Minion Damage" },
    innerRing3: {
      name: "Erosion Resistance I",
      affix: "+6% Erosion Resistance",
    },
    innerRing4: {
      name: "Erosion Resistance I",
      affix: "+6% Erosion Resistance",
    },
    innerRing5: {
      name: "Crowd Control Effects II",
      affix: "+5% crowd control effects",
    },
    innerRing6: {
      name: "Crowd Control Effects II",
      affix: "+5% crowd control effects",
    },
    midRing1: { name: "Damage II", affix: "+24% damage\n+24% Minion Damage" },
    midRing2: {
      name: "Erosion Resistance II",
      affix: "+12% Erosion Resistance",
    },
    midRing3: {
      name: "Crowd Control Effects II",
      affix: "+10% crowd control effects",
    },
    affix1:
      "Inflicts Paralysis or Weaken on enemies within 10m in turn. Cooldown: 5 s",
    affix2:
      "Inflicts Paralysis or Weaken on enemies within 10m in turn. Cooldown: 5 s\n+2% additional damage",
    affix3:
      "Inflicts Paralysis or Weaken on enemies within 10m in turn. Cooldown: 5 s\nFor every type of crowd control effect the enemy has, you and your Minions deal 1.5% additional damage to them\n+2% additional damage",
    affix4:
      "Inflicts Paralysis or Weaken on enemies within 10m in turn. Cooldown: 5 s\nFor every type of crowd control effect the enemy has, you and your Minions deal 1.5% additional damage to them\n+4% additional damage",
    affix5:
      "Inflicts Paralysis or Weaken on enemies within 10m in turn. Cooldown: 5 s\nFor every type of crowd control effect the enemy has, you and your Minions deal +3% additional damage to them\n+4% additional damage",
    affix6:
      "Inflicts Paralysis or Weaken on enemies within 10m in turn. Cooldown: 4 s\nFor every type of crowd control effect the enemy has, you and your Minions deal +3% additional damage to them\n+4% additional damage",
  },
] as const satisfies readonly Pactspirit[];
