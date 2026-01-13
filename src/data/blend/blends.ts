import type { Blend } from "./types";

export const Blends: readonly Blend[] = [
  {
    type: "Aromatic",
    affix:
      "[Caged Fury] -6% additional Attack Speed (multiplies) for every 1 time(s) you cast an Attack Mobility Skill in the last 2s\n+15% additional Attack Speed and +35% additional Attack Damage after using a Mobility Skill. The effect falls off to 0 within 2s",
  },
  {
    type: "Aromatic",
    affix:
      "[Comradeship] Minions gain the Belt's bonuses\n-10% additional Minion Damage",
  },
  {
    type: "Aromatic",
    affix:
      "[Divine Grace] Gains 1 stack(s) of a random Blessing every second. Interval: 1s\n+1% additional damage per stack of Blessing, up to 10%\n-1% additional damage taken per stack of Blessing, up to 10%",
  },
  {
    type: "Aromatic",
    affix:
      "[Hallowed Journey] Triggers Lv. 40 Blurry Steps, Secret Origin Unleash, and Arcane Circle after consuming a total of 5000 Mana. Interval: 2s",
  },
  {
    type: "Aromatic",
    affix:
      "[Rotted Taboo] Takes 100 Secondary Erosion Damage when casting an Erosion Skill. Interval: 0.1s\n+6 to Erosion Skill Level\nErosion Skills are guaranteed to inflict all types of Ailment on hit",
  },
  {
    type: "Core",
    affix:
      '[Affliction] +30\nWhen the Affliction inflicted per second is not 0, the Damage Over Time dealt will continuously inflicts Affliction on the target\nThe target takes 1% additional Damage Over Time for every Affliction point\nThe max Affliction is 100">Affliction inflicted per second\n+30% additional Affliction\nWhen the Affliction inflicted per second is not 0, the Damage Over Time dealt will continuously inflicts Affliction on the target\nThe target takes 1% additional Damage Over Time for every Affliction point\nThe max Affliction is 100">Affliction effect',
  },
  {
    type: "Core",
    affix:
      '[Ambition] +100% chance to gain 10 Fervor rating\n+2% Critical Strike Rating for every point of Fervor Rating you have. The Max Fervor Rating is 100.">Fervor rating on hit\nGains Fighting Will\nAccumulates Fervor Rating when you defeat enemies or hit Elite enemies while having Fervor. +2% Critical Strike Rating for every point of Fervor Rating. The Max Fervor Rating is 100 points.">Fervor when there are enemies Nearby\nWithin 6m">Nearby',
  },
  {
    type: "Core",
    affix:
      "[Arcane] Converts 100% of Mana Cost to Life Cost\n+25% additional Max Life",
  },
  {
    type: "Core",
    affix:
      "[Barrier of Radiance] Energy Shield Charge\nEnergy Shield starts to charge after the character hasn't taken any damage for 2s at the rate of 20% of Max Energy Shield per second and stops charging if the character takes damage\">Charge started recently cannot be interrupted by damage\n+50% Energy Shield Charge\nEnergy Shield starts to charge after the character hasn't taken any damage for 2s at the rate of 20% of Max Energy Shield per second and stops charging if the character takes damage\">Charge Speed",
  },
  {
    type: "Core",
    affix:
      '[Beyond Cure] Deals more Wilt\nAn Ailment that may be triggered on hit, dealing Erosion Damage per second for 1.5s based on Base Wilt Damage. Stacks up to 30 time(s)\nWilt cannot be inflicted when Base Wilt Damage is 0">Wilt Damage to enemies with more Life, up to +60% additional Wilt\nAn Ailment that may be triggered on hit, dealing Erosion Damage per second for 1.5s based on Base Wilt Damage. Stacks up to 30 time(s)\nWilt cannot be inflicted when Base Wilt Damage is 0">Wilt Damage',
  },
  {
    type: "Core",
    affix:
      '[Blunt] +30% additional Physical Damage\nEnemies +20% Injury Buffer\nDelays a portion of Hit Damage taken in the next 4s.">Injury Buffer',
  },
  {
    type: "Core",
    affix:
      '[Bunch] +1 to Max Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing Stacks\n+3% additional Spell Damage per stack of Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing owned',
  },
  {
    type: "Core",
    affix:
      '[Centralize] Gains additional Fighting Will\nAccumulates Fervor Rating when you defeat enemies or hit Elite enemies while having Fervor. +2% Critical Strike Rating for every point of Fervor Rating. The Max Fervor Rating is 100 points.">Fervor Rating equal to 25% of the current Fervor rating\n+2% Critical Strike Rating for every point of Fervor Rating you have. The Max Fervor Rating is 100.">Fervor Rating on hit. Cooldown: 0.3 s\nConsumes half of current Fervor rating\n+2% Critical Strike Rating for every point of Fervor Rating you have. The Max Fervor Rating is 100.">Fervor Rating when hit. -0.8% additional damage per 1 point consumed',
  },
  {
    type: "Core",
    affix:
      "[Co-resonance] +25% additional Sentry Damage\nAttack Speed bonus and 100% of additional bonus are also applied to Attack Sentries' Cast Frequency\nCast Speed bonus and 100% of additional bonus are also applied to Spell Sentries' Cast Frequency",
  },
  {
    type: "Core",
    affix:
      "[Cohesion] +50% additional Critical Strike Rating for the next Main Skill used every 1 s",
  },
  {
    type: "Core",
    affix:
      '[Determined] Upon taking Fatal Damage\nThe instance of damage that defeats the target">fatal damage, you have a 50% chance to keep at least 1 Life',
  },
  {
    type: "Core",
    affix:
      '[Dirty Tricks] Upon inflicting damage, +12% additional Hit Damage (multiplies) for every type of Ailment\nTrauma, Ignite, Frostbite, Freeze, Numbed, and Wilt">Ailment the enemy has\nWhen Minions deal damage, +12% additional Hit Damage (multiplies) for every type of Ailment\nTrauma, Ignite, Frostbite, Freeze, Numbed, and Wilt">Ailment the enemy has',
  },
  {
    type: "Core",
    affix: "[Elimination] Attacks eliminate enemies under 18% Life on hit",
  },
  {
    type: "Core",
    affix:
      '[Frostbitten] Inflicts Frostbite\nFrostbite is an Ailment that may be triggered on Cold Damage hits. enemies -10% Attack, Cast, and Movement Speed. Base Frostbite Rating: 10. For every 1 Frostbite Rating, +1% additional Cold Damage taken. The enemy will be Frozen once they have more than 100 Frostbite Rating.">Frostbite when dealing Hit Cold Damage\n+50% Frostbite\nFrostbite is an Ailment that may be triggered on Cold Damage hits. Frostbitten enemies -10% Attack, Cast, and Movement Speed. Base Frostbite Rating: 10. For every 1 Frostbite Rating, +1% additional Cold Damage taken. The enemy will be Frozen once they have more than 100 Frostbite Rating.">Frostbite Effect',
  },
  {
    type: "Core",
    affix:
      "[Frozen Lotus] +25% additional Cold Damage\n+25% additional Minion Cold Damage\nSkills no longer cost Mana",
  },
  {
    type: "Core",
    affix:
      '[Full Defense] +25% additional Defense\nThe sum of Armor, Evasion, and Energy Shield">Defense gained from Shield\n-1% additional Damage Taken Reduction\nDamage mitigation from each independent source can at most reduce the damage taken by 90%.">Damage Over Time taken for every 1% Block Ratio',
  },
  {
    type: "Core",
    affix:
      "[Gale] 60% of the Projectile Speed bonus is also applied to the additional bonus for Projectile Damage",
  },
  {
    type: "Core",
    affix:
      '[Hair-trigger] +2% additional damage of a skill for every 7 points of Fervor rating\n+2% Critical Strike Rating for every point of Fervor Rating you have. The Max Fervor Rating is 100.">Fervor Rating when the skill is triggered',
  },
  {
    type: "Core",
    affix:
      "[Holiness] -95% Curse effect against you\n-15% additional damage taken from Cursed enemies",
  },
  {
    type: "Core",
    affix:
      "[Impending] Every 0.25 s, +6% additional damage taken for enemies within 10 m. Stacks up to 5 times",
  },
  {
    type: "Core",
    affix:
      "[Impermanence] -90% additional Min Physical Damage, and +80% additional Max Physical Damage\n-32% additional min damage\n+32% additional Max Damage",
  },
  {
    type: "Core",
    affix:
      "[Indifference] +1% additional damage and +1% additional Minion Damage for every 5 remaining Energy, up to +50% additional damage",
  },
  {
    type: "Core",
    affix:
      '[Joined Force] Off-Hand Weapon\nThe weapon held in the Character\'s left hand is the Off-Hand Weapon">Off-Hand Weapons do not participate in Attacks while Dual Wielding\nWhen using two One-Handed Weapons, one in each hand">Dual Wielding\nAdds 60% of the damage of the Off-Hand Weapon\nThe weapon held in the Character\'s left hand is the Off-Hand Weapon">Off-Hand Weapon to the final damage of the Main-Hand Weapon\nThe weapon held in the Character\'s right hand is the Main-Hand Weapon">Main-Hand Weapon',
  },
  {
    type: "Core",
    affix:
      '[Kinetic Conversion] 100% chance to gain a Barrier\nGains a Shield equal to 20% of the sum of Max Life and Max Energy Shield, absorbing 50% of the Hit Damage taken. Cannot gain another Barrier when a Barrier is present.">Barrier for every 5 m you move\nRefreshes Barrier\nGains a Shield equal to 20% of the sum of Max Life and Max Energy Shield, absorbing 50% of the Hit Damage taken. Cannot gain another Barrier when a Barrier is present.">Barrier when gaining Barrier\nGains a Shield equal to 20% of the sum of Max Life and Max Energy Shield, absorbing 50% of the Hit Damage taken. Cannot gain another Barrier when a Barrier is present.">Barrier\n-40% additional Barrier\nGains a Shield equal to 20% of the sum of Max Life and Max Energy Shield, absorbing 50% of the Hit Damage taken. Cannot gain another Barrier when a Barrier is present.">Barrier Shield',
  },
  {
    type: "Core",
    affix:
      "[Last Stand] Block Ratio is set to 0%\nFor every +3% Attack or Spell Block Chance, +2% additional damage, up to +90%",
  },
  {
    type: "Core",
    affix:
      "[Mana] 20% of damage is taken from before life\n+12% additional Max Mana",
  },
  {
    type: "Core",
    affix:
      '[Master Escapist] +1 Max Deflection\nReduces additional damage taken by 8% for every stack of Deflection, up to 3 stack(s). When hit, consumes all stacks of Deflection">Deflection stacks\nGains 1 stacks of Deflection\nReduces additional damage taken by 8% for every stack of Deflection, up to 3 stack(s). When hit, consumes all stacks of Deflection">Deflection on Evasion',
  },
  {
    type: "Core",
    affix:
      '[Mighty Guard] +2 Minion Skill Level\n+ 4 Command\nEvery point of Command will grant Synthetic Troop Minions +3% additional damage and a bigger Tracking Area.\nThe lowest Command is -100 while the highest is 100. When Command is not 0, 13 point(s) will be returned (reduced/granted) every second until it becomes 0. For every 10 Command increased, +7 additional points will be returned.\nSynthetic Troop Minions\' Duration will not reduce when Command is a positive value.">Command per second\n+40 initial Growth\nSpirit Magi grow into the next Stage for every 100 Growth. They start at Stage 1 and can grow until they reach Stage 5. For every 8 Growth they have, Spirit Magi gain +1% Physique, +5% additional Skill Area, and a bonus every stage:\nAt Stage 2, +30% chance for them to use Enhanced Skill chance.\nAt Stage 3, their Enhanced Skills become stronger.\nAt Stage 4, their Empower Skills become stronger.\nAt Stage 5, they +25% additional damage, +10% additional Skill Area, and gain increased Movement Speed and Tracking Area.\nThe max Growth is 1000.">Growth for Spirit Magi',
  },
  {
    type: "Core",
    affix:
      '[No Loose Ends] +50% additional Attack Damage at Low Life\nWhen current Life is under 35% of Max Life">Low Life\nYour Max Energy Shield is fixed at 0',
  },
  {
    type: "Core",
    affix:
      "[Panacea] Restoration Skills: +100% Restoration Effect\nRestoration Effect from Restoration Skills cannot be removed",
  },
  {
    type: "Core",
    affix:
      '[Peculiar Vibe] You can apply 1 additional Tangle\nGenerated by the player, it can attach to an enemy and periodically trigger a specified Spell Skill">Tangle(s) to enemies\n-30% additional Tangle Skill Area',
  },
  {
    type: "Core",
    affix:
      '[Perception] +100% chance to gain 1 stacks of Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing on hit\n+1 to Max Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing Stacks',
  },
  {
    type: "Core",
    affix:
      '[Plague] +20% Movement Speed when defeating Wilt\nAn Ailment that may be triggered on hit, dealing Erosion Damage per second for 1.5s based on Base Wilt Damage. Stacks up to 30 time(s)\nWilt cannot be inflicted when Base Wilt Damage is 0">Wilted enemies recently\n+15% additional Wilt\nAn Ailment that may be triggered on hit, dealing Erosion Damage per second for 1.5s based on Base Wilt Damage. Stacks up to 30 time(s)\nWilt cannot be inflicted when Base Wilt Damage is 0">Wilt Damage',
  },
  {
    type: "Core",
    affix:
      '[Poisoned Relief] +25% Injury Buffer\nDelays a portion of Hit Damage taken in the next 4s.">Injury Buffer\n-15% additional damage taken at Low Life\nWhen current Life is under 35% of Max Life">Low Life',
  },
  {
    type: "Core",
    affix:
      '[Queer Angle] You and Minions deal Lucky\nPerforms a random check or random roll twice and picks the result that benefits you the most">Lucky Damage against Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed enemies',
  },
  {
    type: "Core",
    affix:
      "[Quick Ritual] Min Channeled Stacks +1\n+20% additional Channeled Skill damage",
  },
  {
    type: "Core",
    affix:
      "[Quick Wits] +25% additional Spell Damage when the Energy Shield is not low\n-20% additional damage taken at Low Energy Shield",
  },
  {
    type: "Core",
    affix:
      "[Rally] Synthetic Troop Minions summoned at a time +1\n+25% additional Minion Damage",
  },
  {
    type: "Core",
    affix:
      '[Rebirth] Converts 50% of Life Regain\nBased on the Missing Life (including Sealed Life), restores a portion of Life on hit. This effect has a 0.5s interval.">Life Regain and Energy Shield Regain to Restoration Over Time\n-50% additional Regain Interval',
  },
  {
    type: "Core",
    affix:
      "[Reflection] +6% additional damage for each type of Aura you are affected by\nMinions +6% additional damage for each type of Aura they are affected by",
  },
  {
    type: "Core",
    affix:
      '[Resolve] +4% additional Armor per stack of Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing owned',
  },
  {
    type: "Core",
    affix:
      '[Rock] Converts 5% of Physical Damage taken to Fire Damage for every stack of Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing you have',
  },
  {
    type: "Core",
    affix:
      '[Sacrifice] Changes the base effect of Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing to: +8% additional damage',
  },
  {
    type: "Core",
    affix:
      "[Sentry] Max Quantity +1\n+100% additional Cast Speed for Sentry Skills",
  },
  {
    type: "Core",
    affix:
      "[Shell] +35% additional Max Energy Shield\nYour Max Life is set to 100",
  },
  {
    type: "Core",
    affix:
      '[Shrink Back] Gains Barrier\nGains a Shield equal to 20% of the sum of Max Life and Max Energy Shield, absorbing 50% of the Hit Damage taken. Cannot gain another Barrier when a Barrier is present.">Barrier every 1s\n+50% Barrier\nGains a Shield equal to 20% of the sum of Max Life and Max Energy Shield, absorbing 50% of the Hit Damage taken. Cannot gain another Barrier when a Barrier is present.">Barrier Shield',
  },
  {
    type: "Core",
    affix:
      '[Source] +50% Sealed Mana\nA portion of Mana is reserved to maintain persistent effects such as auras">Sealed Mana Compensation for Spirit Magus Skills\n+30% additional Origin of Spirit Magus\nBuff effect gained after Activating a Spirit Magus summoning skill.">Origin of Spirit Magus Effect\nSpirit Magi +30% additional Empower Skill Effect',
  },
  {
    type: "Core",
    affix:
      '[Starfire] +1 Ignite\nAn Ailment that may be triggered on hit, dealing Fire Damage per second for 4s based on Base Ignite Damage. Unable to stack\nIgnite cannot be inflicted when Base Ignite Damage is 0">Ignite limit\nWhen Ignite is inflicted, it spreads to enemies within 10m. Interval: 0.3s',
  },
  {
    type: "Core",
    affix:
      "[Steady Accumulation] +40% additional Hit Damage\nAdditional -30% Skill Effect Duration",
  },
  {
    type: "Core",
    affix:
      '[Subtle Impact] Blur\nGains 100 points of Blur Rating.\nOnce 100 points of Blur Rating is gained, 10 Blur Rating is lost per second. Blur is lost once Blur Rating drops to 0.\n+0.3% Evasion and +0.2% chance to avoid damage for every point of Blur Rating you have.\nMax Blur Rating is 100">Blur gains an additional effect: +25% additional Damage Over Time',
  },
  {
    type: "Core",
    affix:
      "[Transition] 50% chance for this skill to deal +16% additional damage when casting a skill\n25% chance for this skill to deal +32% additional damage when casting a skill\n10% chance for this skill to deal +80% additional damage when casting a skill",
  },
  {
    type: "Core",
    affix:
      '[Well Matched] Deals up to +25% additional Attack Damage to enemies in Proximity\nWithin 4m">proximity, and this damage reduces as the distance from the enemy grows\n-15% additional damage taken from enemies in Proximity\nWithin 4m">proximity, and this damage reduces as the distance from the enemy grows',
  },
  {
    type: "Medium",
    affix:
      '[] Multistrike\nChance to perform an additional attack when using Attack Skills. If the chance exceeds 100%, one additional attack will be performed with every 100% of the chance.\n+20% Attack Speed during Multistrikes.\nMultistrikes consume skill resources as normal and will be interrupted if there are insufficient resources. Moving or using other non-instant skills will interrupt Multistrike.\nMobility, Channeled Skills, and Sentry skills cannot Multistrike">Multistrikes deal 16% increasing damage',
  },
  {
    type: "Medium",
    affix:
      '[] -4% to the Max Life and Energy Shield thresholds for inflicting Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed\nInflicts 1 additional stack(s) of Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed',
  },
  {
    type: "Medium",
    affix:
      '[] +1 Jump\nUpon hitting a target, a horizontal Projectile or Chain Skill jumps to another target nearby">Jumps',
  },
  {
    type: "Medium",
    affix:
      '[] +1 Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst',
  },
  { type: "Medium", affix: "[] +1 Minion Skill Level" },
  { type: "Medium", affix: "[] +1 to All Skills' Levels" },
  { type: "Medium", affix: "[] +1 to Attack Skill Level" },
  {
    type: "Medium",
    affix:
      '[] +1 to Max Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing Stacks',
  },
  {
    type: "Medium",
    affix:
      '[] +1 to Max Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing Stacks',
  },
  {
    type: "Medium",
    affix:
      '[] +1 to Max Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing Stacks',
  },
  { type: "Medium", affix: "[] +1 to Max Channeled Stacks" },
  { type: "Medium", affix: "[] +1% Attack Speed per 40 Dexterity" },
  {
    type: "Medium",
    affix:
      '[] +1% Movement Speed per 10 Fervor rating\n+2% Critical Strike Rating for every point of Fervor Rating you have. The Max Fervor Rating is 100.">Fervor Rating',
  },
  {
    type: "Medium",
    affix: "[] +10% additional Base Damage for Two-Handed Weapons",
  },
  {
    type: "Medium",
    affix:
      "[] +10% additional damage against Freeze\nWhen a unit's Frostbite Rating exceeds 100, it becomes Frozen\nFrozen non-Legendary bosses will be Frost-Sealed periodically and cannot act. The Frost-Seal duration is 2s, and the Frost-Seal Interval is 3 for the same unit\nFrost-Seal ends when Frostbite ends\">Frozen enemies",
  },
  {
    type: "Medium",
    affix:
      '[] +100% chance to gain Blur\nGains 100 points of Blur Rating.\nOnce 100 points of Blur Rating is gained, 10 Blur Rating is lost per second. Blur is lost once Blur Rating drops to 0.\n+0.3% Evasion and +0.2% chance to avoid damage for every point of Blur Rating you have.\nMax Blur Rating is 100">Blur on defeat',
  },
  {
    type: "Medium",
    affix:
      '[] +12% Steep Strike\nSlash Strike Skills are cast in Sweep Slash form by default. When casting the skill, there is a chance that it will be cast in Steep Strike form. Some skills gain Steep Strike attempts at specific times. When there are Steep Strike attempts, the skill will be cast in Steep Strike form and consume 1 Steep Strike attempt.">Steep Strike chance.',
  },
  {
    type: "Medium",
    affix:
      "[] +12% additional Max Damage\n+12% additional Max Damage for Minions",
  },
  {
    type: "Medium",
    affix:
      "[] +12% additional Sentry Damage if Sentry Skill is not used in the last 1 s",
  },
  {
    type: "Medium",
    affix:
      "[] +15% Life Regeneration Speed\n-15% additional Energy Shield Charge\nEnergy Shield starts to charge after the character hasn't taken any damage for 2s at the rate of 20% of Max Energy Shield per second and stops charging if the character takes damage\">Charge Interval",
  },
  {
    type: "Medium",
    affix:
      "[] +20% chance to Blind\nTarget's damage has a 20% chance to miss before addressed\">Blind the target on hit\n+25% Critical Strike Damage Mitigation against Blind\nTarget's damage has a 20% chance to miss before addressed\">Blinded enemies",
  },
  {
    type: "Medium",
    affix:
      '[] +40% Defense\nThe sum of Armor, Evasion, and Energy Shield">Defense gained from Chest Armor',
  },
  {
    type: "Medium",
    affix:
      '[] +5% Block Ratio\nBy default, Blocking absorbs 30% damage. Increase Block Ratio to increase the damage absorption ratio.">Block Ratio\nRestores 1% Missing Life and Energy Shield when Blocking',
  },
  {
    type: "Medium",
    affix:
      '[] +8% Barrier\nGains a Shield equal to 20% of the sum of Max Life and Max Energy Shield, absorbing 50% of the Hit Damage taken. Cannot gain another Barrier when a Barrier is present.">Barrier Absorption Rate',
  },
  {
    type: "Medium",
    affix:
      '[] +8% additional Deterioration\nLasts for 1s. When the duration ends, deals True Damage equal to 60% of the Hit Erosion Damage dealt. Stacks up to 99 times. Each stack is calculated independently">Deterioration Damage\n+5% additional Deterioration\nLasts for 1s. When the duration ends, deals True Damage equal to 60% of the Hit Erosion Damage dealt. Stacks up to 99 times. Each stack is calculated independently">Deterioration Duration',
  },
  {
    type: "Medium",
    affix:
      "[] +8% Armor DMG Mitigation Penetration\n+8% Armor DMG Mitigation Penetration for Minions",
  },
  {
    type: "Medium",
    affix:
      '[] 120% of the increase/decrease on Knockback\nForced to move back by a short distance">Knockback distance is also applied to damage bonus',
  },
  { type: "Medium", affix: "[] 8% of damage is taken from Mana before life" },
  {
    type: "Medium",
    affix:
      '[] 8% of damage taken is Damage Transfer\nTransfers a part of the Hit Damage and Secondary Damage taken to other units.\nUp to 90% of the damage can be transferred.">transferred to a random Minion\n-80% additional damage taken by Spirit Magi',
  },
  {
    type: "Medium",
    affix:
      '[] Converts 6% of Physical Damage taken to random Elemental\nFire, Cold, and Lightning">Elemental Damage',
  },
  {
    type: "Medium",
    affix: "[] Critical Strikes eliminate enemies under 8% Life",
  },
  {
    type: "Medium",
    affix:
      '[] Gains 1 stack(s) of Focus Blessing when Reaping\nDeals a certain amount of True Damage to the target, equivalent to the damage from all DoT effects over a certain period of time">Reaping',
  },
  {
    type: "Medium",
    affix:
      "[] Immediately starts Energy Shield Charge\nEnergy Shield starts to charge after the character hasn't taken any damage for 2s at the rate of 20% of Max Energy Shield per second and stops charging if the character takes damage\">Charge upon entering Low Energy Shield status",
  },
  {
    type: "Medium",
    affix:
      '[] Immune to Ignite\nAn Ailment that may be triggered on hit, dealing Fire Damage per second for 4s based on Base Ignite Damage. Unable to stack\nIgnite cannot be inflicted when Base Ignite Damage is 0">Ignite\nMinions are immune to Fire Damage',
  },
  { type: "Medium", affix: "[] Restores 3% of Life on defeat" },
  {
    type: "Medium",
    affix:
      '[] Upon inflicting damage, +15% damage for every type of Ailment\nTrauma, Ignite, Frostbite, Freeze, Numbed, and Wilt">Ailment the enemy has\nWhen Minions deal damage, +15% damage for every type of Ailment\nTrauma, Ignite, Frostbite, Freeze, Numbed, and Wilt">Ailment the enemy has',
  },
];
