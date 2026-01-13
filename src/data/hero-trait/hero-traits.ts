import type { BaseHeroTrait } from "./types";

export const HeroTraits = [
  {
    hero: "Escapist Bing: Blast Nova (#1)",
    name: "Blast Nova",
    level: 1,
    affix:
      "When using a Non-channeling Projectile Skill, throw 1 bomb instead\nThe bomb automatically detonates 1 s after landing, firing Projectiles in all directions\nThere can be up to 10 undetonated bombs at the same time. Exceeding the limit will detonate the bomb that landed first\nBomb throwing speed is 1.5 time(s) per second\nFor every +100% Attack Speed, +1 bombs thrown upon using an Attack Projectile Skill.\nFor every +100% Cast Speed, +1 bombs thrown upon using a Spell Projectile Skill.\nThe amount less than +100% has a chance to grant +1 bombs thrown upon using an Attack or Spell Projectile Skill.\n+1% additional Attack Bomb Damage for every +1% additional Attack Speed\n+1% additional Spell Bomb Damage for every +1% additional Cast Speed\n+30% additional Bomb Damage\nProjectile Quantity +2\nReduces Max Spell Burst Stacks to 1/2\n-40% additional Sentry Damage",
  },
  {
    hero: "Escapist Bing: Blast Nova (#1)",
    name: "Dangerous Runaway",
    level: 45,
    affix:
      "+1 Bomb Quantity when throwing bombs next time after moving at least (20/17/14/11/8) m\n+1% Movement Speed for every 4 m of movement made recently, up to +15%",
  },
  {
    hero: "Escapist Bing: Blast Nova (#1)",
    name: "Firepower Coverage",
    level: 45,
    affix:
      'Projectile Quantity (+2/+2/+3/+3/+4)\n+50% Projectile Size\nChanges Projectile Size\nIn general, 100% of Projectile Size is applied to the size of Projectiles\nFor Projectiles affected by Skill Area Bonuses, 25% of the increase or decrease in Projectile Size is applied to the additional Skill Area of Projectiles\nFor Projectiles that have subsequent Area Effects, 25% of the increase or decrease in Projectile Size is also applied to the additional Skill Area of the subsequent effects\nSubsequent effects: Effects caused by Projectile after they are fired, such as explosions">Projectile Size\n(+10/+14/+18/+22/+26)% additional Bomb Damage',
  },
  {
    hero: "Escapist Bing: Blast Nova (#1)",
    name: "Blast Barrage",
    level: 60,
    affix:
      'Bombs explode immediately after landing\n+20% additional Projectile Speed\n(+22/+28/+34/+41/+48)% additional Bomb Damage when there are no enemies Nearby\nWithin 6m">nearby',
  },
  {
    hero: "Escapist Bing: Blast Nova (#1)",
    name: "Phantom Delivery",
    level: 60,
    affix:
      "Doubles the bombs thrown.\nBombs have a (40/37/34/31/28)% chance to become duds that deal (-95/-95/-95/-95/-90)% additional damage",
  },
  {
    hero: "Escapist Bing: Blast Nova (#1)",
    name: "Frenzy Hound",
    level: 75,
    affix:
      "Bombs do not automatically explode when the upper limit is not reached\nClick the Trait Skill to manually detonate all bombs on the ground\n(+4/4.8/5.5/6.3/+7)% additional damage for every bomb on the battlefield when the bombs detonate, up to (+48/57.6/+66/75.6/+84)% additional damage.",
  },
  {
    hero: "Escapist Bing: Blast Nova (#1)",
    name: "Radiation Effect",
    level: 75,
    affix:
      'When the bombs detonate, for every +1% Projectile Speed, deals (0.35/0.42/0.48/0.53/0.6)% additional damage to enemies in Proximity\nWithin 4m">proximity to them, up to an additional (+35/+42/+48/+53/+60)%',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Creative Genius",
    level: 1,
    affix:
      '+1 Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst\nGains 2 Inspiration Machines that can be powered by Whimsy Essence and Ingenuity Essence respectively. Starts with 0 Whimsy Essence and Ingenuity Essence with an upper limit of 100. Restores 20 Whimsy Essence per second\nWhen Whimsy Essence reaches 100, dealing Spell Damage to an enemy causes Inspiration Machines to use a Whimsy Explosion\nFires a projectile that creates an energy explosion on hit, consuming 100 Whimsy Essence while restoring 25 Ingenuity Essence">Whimsy Explosion, inflicting Whimsy Signal\n+20% additional Spell Damage taken for 5s">Whimsy Signal on affected enemies\nWhen Ingenuity Essence reaches 100, clicking the Trait Skill causes Inspiration Machines to use Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload\nBing\'s ingenious ideas allow him to possess more Traits. In addition to Base Traits, an additional Trait can be selected at each level threshold.',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Inspiration Overflow",
    level: 45,
    affix:
      'Instantly restores 5 Whimsy Essence when consuming Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst Charge, and restores 6 additional Whimsy Essence for every 3 stacks of Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst Charge consumed. Interval: 1s\n(+10/+15/+20/+25/+30)% additional Hit Damage for skills cast by Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst\nInstantly restores 80 Ingenuity Essence after entering a stage or reviving',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Over-Shield Module",
    level: 45,
    affix:
      '- (60/62.5/65/67.5/70)% additional damage taken when casting Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload for 1s',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Super Sonic Protocol",
    level: 45,
    affix:
      '(+80/+85/+90/+95/+100)% Movement Speed when casting Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload. The bonus falls off to 0 within 4s',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Auto-Ingenuity Program",
    level: 60,
    affix:
      'When Ingenuity Essence reaches 100, triggers Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload\n-10% Whimsy Essence Recovery Speed\nWhen Ingenuity Essence reaches 100, triggers Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload\n-5% Whimsy Essence Recovery Speed\nWhen Ingenuity Essence reaches 100, triggers Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload\nWhen Ingenuity Essence reaches 100, triggers Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload\n+5% Whimsy Essence Recovery Speed\nWhen Ingenuity Essence reaches 100, triggers Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload\n+10% Whimsy Essence Recovery Speed',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Ingenious Chaos Principle",
    level: 60,
    affix:
      '(+4/+6/+8/+10/+12)% Ingenuity Essence restoration per Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Law of Ingenuity",
    level: 60,
    affix:
      'Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload has a (20/25/30/35/40)% chance to not consume Ingenuity Essence',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Mind Domain",
    level: 60,
    affix:
      'Whimsy Explosion\nFires a projectile that creates an energy explosion on hit, consuming 100 Whimsy Essence while restoring 25 Ingenuity Essence">Whimsy Explosion spawns an energy field. Gains 1 stack of Whimsy\n+5% additional Spell Damage (multiplies) for 10s">Whimsy for every 0.5s staying in the energy field. Stacks up to (4/5/6/7/8) time(s)',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Trouble Maker",
    level: 60,
    affix:
      'Loses (20/15/15/10/10)% Max Life and Energy Shield when Whimsy Explosion\nFires a projectile that creates an energy explosion on hit, consuming 100 Whimsy Essence while restoring 25 Ingenuity Essence">Whimsy Explosion hits yourself\nEffect of Whimsy Signal\n+20% additional Spell Damage taken for 5s">Whimsy Signal enhanced to: (+60/+60/+75/+75/+90)% additional Spell Damage taken',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Brainstorm",
    level: 75,
    affix:
      'After a 1s delay, Whimsy Explosion\nFires a projectile that creates an energy explosion on hit, consuming 100 Whimsy Essence while restoring 25 Ingenuity Essence">Whimsy Explosion creates an additional Energy Explosion that eliminates enemies with less than (15/15/18/18/21)% Life within 12m\nRestores (5/6/6/7/7) additional Whimsy Essence for each enemy affected by Whimsy Signal\n+20% additional Spell Damage taken for 5s">Whimsy Signal defeated',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Contingency Inspiration Delivery",
    level: 75,
    affix:
      'Summons 3 Contingency Inspiration Machine\nYour Main Skill is automatically cast, and the Base Cast Frequency is equal to 100% of Cast Speed. Unable to move for 5s">Contingency Inspiration Machines when casting Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload. Their Skill Interval: (0.9/0.8/0.7/0.6/0.5) s',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Flash of Brilliance",
    level: 75,
    affix:
      'Casting a Main Skill has a (20/25/25/30/30)% chance to trigger Whimsy Explosion\nFires a projectile that creates an energy explosion on hit, consuming 100 Whimsy Essence while restoring 25 Ingenuity Essence">Whimsy Explosion without consuming Whimsy Essence. Interval: (3.5/3.5/3/3/2.5) s',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Hyper-Resonance Hypothesis",
    level: 75,
    affix:
      'When casting Ingenuity Overload\nTriggers your Main Skill once immediately (this skill must be able to activate Spell Burst). +200% additional Max Spell Burst for the skill this time and immediately charges it to the max. Consumes 100 Ingenuity Essence">Ingenuity Overload, gains Buff Effect: (+15/+19/+23/+27/+31)% additional Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst Charge Speed for 10s',
  },
  {
    hero: "Escapist Bing: Creative Genius (#2)",
    name: "Multi-Coupling Equation",
    level: 75,
    affix:
      'For every 2 Empower or Defensive Skill(s) affecting you, +1 Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst. Stacks up to 1 time(s)\nFor every 2 Empower or Defensive Skill(s) affecting you, +1 Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst. Stacks up to 1 time(s)\n+15% Empower and Defensive Skill Effect Duration\nFor every 2 Empower or Defensive Skill(s) affecting you, +1 Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst. Stacks up to 2 time(s)\n+15% Empower and Defensive Skill Effect Duration\nFor every 2 Empower or Defensive Skill(s) affecting you, +1 Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst. Stacks up to 2 time(s)\n+30% Empower and Defensive Skill Effect Duration\nFor every 2 Empower or Defensive Skill(s) affecting you, +1 Max Spell Burst\nAutomatically uses a Spell Skill a certain number of times.\nWhen Spell Burst is fully charged, the next Spell Skill used will activate Spell Burst, which will consume all stacks charged and automatically use the Spell Skill the same number of times.\nSkills that have a cooldown, Triggered Skills, Sentry Skills, Channeled Skills, and Combo Skills cannot activate Spell Burst.">Spell Burst. Stacks up to 3 time(s)\n+30% Empower and Defensive Skill Effect Duration',
  },
  {
    hero: "Divineshot Carino: Ranger of Glory (#1)",
    name: "Ranger of Glory",
    level: 1,
    affix:
      'Projectile Skills consume ammo\n+35% additional Projectile Damage when consuming ammo\n+6 initial magazine capacity\nClick the Trait Skill to Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload the magazine. Base Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reloading time is 0.6 s\nProjectile Skills are unavailable while Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reloading\n150% of the max bonus to Attack Speed or Cast Speed is also applied to Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reload Speed\nWhile Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reloading, +45% Movement Speed\nAlways auto-Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reloading ammo; Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reloading can be interrupted.',
  },
  {
    hero: "Divineshot Carino: Ranger of Glory (#1)",
    name: "Ammo Expert",
    level: 45,
    affix:
      '+2 Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">Special Ammo slot(s)\n+30% chance to Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">special ammo\n(+15/+23/+31/+39/+47)% additional damage dealt by this Projectile Skill if a Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">Special Ammo is consumed\n50% chance to gain Magic Shot\nWhile Magic Shot is active, each Projectile Skill used or triggered consumes 3 ammo. When multiple special ammo is consumed, Projectile Skills will gain corresponding effects of the Support Skills. As long as magic shot is on, reloading is instant.">Magic Shot for 4 s when consuming a Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">Special Ammo. Interval: 8 s.',
  },
  {
    hero: "Divineshot Carino: Ranger of Glory (#1)",
    name: "Crushing Gale Trigger",
    level: 60,
    affix:
      '(15/19/23/27/31)% of the increase/decrease on Attack and Cast Speed is also applied to Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload chance of Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">special ammo\nReload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reload Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">Special Ammo slots in order',
  },
  {
    hero: "Divineshot Carino: Ranger of Glory (#1)",
    name: "Landslide",
    level: 60,
    affix:
      'While Magic Shot\nWhile Magic Shot is active, each Projectile Skill used or triggered consumes 3 ammo. When multiple special ammo is consumed, Projectile Skills will gain corresponding effects of the Support Skills. As long as magic shot is on, reloading is instant.">Magic Shot is active, using or triggering Projectile Skills consume all ammo in the magazine\n(+5/+8/+11/+14/+17)% additional damage for every Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">Special Ammo consumed',
  },
  {
    hero: "Divineshot Carino: Ranger of Glory (#1)",
    name: "Never Stopping",
    level: 75,
    affix:
      'While Magic Shot\nWhile Magic Shot is active, each Projectile Skill used or triggered consumes 3 ammo. When multiple special ammo is consumed, Projectile Skills will gain corresponding effects of the Support Skills. As long as magic shot is on, reloading is instant.">Magic Shot is active, for every Special Ammo consumed, extends Magic Shot\nWhile Magic Shot is active, each Projectile Skill used or triggered consumes 3 ammo. When multiple special ammo is consumed, Projectile Skills will gain corresponding effects of the Support Skills. As long as magic shot is on, reloading is instant.">Magic Shot\'s Duration by (0.04/0.05/0.06/0.08/0.1) s',
  },
  {
    hero: "Divineshot Carino: Ranger of Glory (#1)",
    name: "Well Prepared",
    level: 75,
    affix:
      '+1 Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">Special Ammo slot(s). These slots can be installed with Projectile exclusive Noble Support Skills\n(+15/+20/+25/+30/+35)% additional damage dealt by this Projectile Skill if a Special Ammo\nAdds a Support Skill to the bottom left corner of the Hero Trait menu. There is a chance to reload the special ammo of the added Support Skill.\nThe special ammo will be successfully consumed and effects of the added Support Skill will be granted if the added Support Skill is not on the skill panel and able to support Projectile Skills.">Special Ammo is consumed',
  },
  {
    hero: "Divineshot Carino: Lethal Flash (#2)",
    name: "Lethal Flash",
    level: 1,
    affix:
      "Projectile Skills consume ammo\n+6 initial magazine capacity\nAlways auto-reload ammo, reloading 2 ammo each time. Reload Time: 0.6 s\nProjectile Skills can be cast while reloading, but will interrupt the reloading process\nProjectile Quantity +2\nProjectile Skills have the Shotgun Effect\nMultiple effects from the same skill can hit the same enemy. The first effect hit deals 100% damage, and subsequent effects hit deal less damage. This effect also applies to Ailment Damage dealt by skills.\nMost skills' subsequent on hit damage is 36%\nSpecial Skills' Shotgun Effect can be found in the Skill Stone's description.\">Shotgun Effect",
  },
  {
    hero: "Divineshot Carino: Lethal Flash (#2)",
    name: "Dart Shot",
    level: 45,
    affix:
      "When casting a Projectile Skill, for every ammo consumed, - (20/20/25/25/30)% current cooldown for Mobility Skills\n(+15/+20/+25/+30/+35)% additional damage for 4 s after using Mobility Skills",
  },
  {
    hero: "Divineshot Carino: Lethal Flash (#2)",
    name: "Shadow Magazine",
    level: 45,
    affix:
      '(-0.2/-0.25/-0.3/-0.35/-0.4) s Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reloading time\n25% chance for Projectile Skills to not consume ammo',
  },
  {
    hero: "Divineshot Carino: Lethal Flash (#2)",
    name: "Evil Ouroboros",
    level: 60,
    affix:
      "Normal Projectiles will return after reaching their max range and will hit enemies on their path again\n-50% Projectile Range\n(-70/-64/-58/-52/-46)% additional Returning Projectile Damage",
  },
  {
    hero: "Divineshot Carino: Lethal Flash (#2)",
    name: "Lethal Interval",
    level: 60,
    affix:
      "For every ammo consumed recently, -3 ° Projectile Spreading Angle\nHorizontal Projectiles cannot Penetrate but have (+1/+1/+2/+2/+3) Jump(s)\n(+10/+16/+22/+28/+34)% additional damage dealt by Projectile Skills",
  },
  {
    hero: "Divineshot Carino: Lethal Flash (#2)",
    name: "Desperate Measure",
    level: 75,
    affix:
      "Your Projectile Skills will consume all ammo\nWhen casting a Projectile Skill, the skill (+9/+10/+11/+12/+13)% additional damage for every 1 ammo it consumes. Stacks up to 8 times",
  },
  {
    hero: "Divineshot Carino: Lethal Flash (#2)",
    name: "Malice Charge",
    level: 75,
    affix:
      "Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading\">Reloads all ammo when using Mobility Skills\nFor every ammo consumed recently, (0.6/+1/1.4/1.8/2.2)% base damage coefficient for subsequent Projectiles of Shotgun Effect\nMultiple effects from the same skill can hit the same enemy. The first effect hit deals 100% damage, and subsequent effects hit deal less damage. This effect also applies to Ailment Damage dealt by skills.\nMost skills' subsequent on hit damage is 36%\nSpecial Skills' Shotgun Effect can be found in the Skill Stone's description.\">Shotgun Effect. Stacks up to 10 time(s)",
  },
  {
    hero: "Divineshot Carino: Zealot of War (#3)",
    name: "Zealot of War",
    level: 1,
    affix:
      'Projectile Skills consume ammo\n+6 initial Magazine Capacity\nBase Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reloading time is 0.8 s\nProjectile Quantity +2\nFor every +1 Projectile Quantity or +1 Split Quantity, +3 Magazine Capacity (excludes the Projectile Quantity and Split Quantity provided by the skill itself and linked Support Skills)\n+20% additional damage',
  },
  {
    hero: "Divineshot Carino: Zealot of War (#3)",
    name: "Incinerated Glory",
    level: 45,
    affix:
      'Allows Blank Firing\nProjectile Skills can be used without ammo.\nNo ammo benefits are applied when Blank Firing.">Blank Firing\nWhile having ammo, for every ammo consumed, gains 1 stack of Heat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up\nBlank Firing\nProjectile Skills can be used without ammo.\nNo ammo benefits are applied when Blank Firing.">During Blank Firing, gains Overheated\nForced to reload after being in Overheated for a period of time">Overheated when casting a Projectile Skill\nHeat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up: For every stack of Heat Up, (1.6/+2/2.3/2.6/+3)% additional Projectile Skill Damage and 0.1 Projectile Max Deviation Angle\nHorizontal and Parabolic Projectiles will deviate from the shooting direction, and the max deviation angle is determined by the Projectile Max Deviation Angle\nWithin 0.5s after stopping shooting, the Deviation Angle returns to normal within 2s">Projectile Max Deviation Angle\nForced to Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload once Overheated\nForced to reload after being in Overheated for a period of time">Overheated has been active for 10 s\nAfter Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reloading, loses all stacks of Heat Up and Overheated',
  },
  {
    hero: "Divineshot Carino: Zealot of War (#3)",
    name: "Ceasefire",
    level: 60,
    affix:
      'Starts with max stacks of Heat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up but does not Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload ammo at the beginning\nWhile active, Overheated can last without forcing reload\nStarts with max stacks of Heat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up but does not Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload ammo at the beginning\nWhile active, Overheated can last without forcing reload\n+5% additional damage\nStarts with max stacks of Heat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up but does not Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload ammo at the beginning\nWhile active, Overheated can last without forcing reload\n+10% additional damage\nStarts with max stacks of Heat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up but does not Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload ammo at the beginning\nWhile active, Overheated can last without forcing reload\n+16% additional damage\nStarts with max stacks of Heat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up but does not Reload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">reload ammo at the beginning\nWhile active, Overheated can last without forcing reload\n+21% additional damage',
  },
  {
    hero: "Divineshot Carino: Zealot of War (#3)",
    name: "Extreme Heat",
    level: 60,
    affix:
      'At Max Heat Up Stacks, enter Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red instead of Overheated\nForced to reload after being in Overheated for a period of time">Overheated\nReload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reload immediately when Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red ends\nExtends the duration of Burning Red by 3 s and restores 3% Max Life and Energy Shield when defeating an Elite\nAt Max Heat Up Stacks, enter Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red instead of Overheated\nForced to reload after being in Overheated for a period of time">Overheated\nReload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reload immediately when Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red ends\nExtends the duration of Burning Red by 4 s and restores 3% Max Life and Energy Shield when defeating an Elite\n+5% additional damage\nAt Max Heat Up Stacks, enter Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red instead of Overheated\nForced to reload after being in Overheated for a period of time">Overheated\nReload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reload immediately when Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red ends\nExtends the duration of Burning Red by 5 s and restores 3% Max Life and Energy Shield when defeating an Elite\n+5% additional damage\nAt Max Heat Up Stacks, enter Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red instead of Overheated\nForced to reload after being in Overheated for a period of time">Overheated\nReload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reload immediately when Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red ends\nExtends the duration of Burning Red by 5 s and restores 3% Max Life and Energy Shield when defeating an Elite\n+10% additional damage\nAt Max Heat Up Stacks, enter Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red instead of Overheated\nForced to reload after being in Overheated for a period of time">Overheated\nReload\nSpends some time to fully reload the magazine. Unable to use Projectile Skills while reloading">Reload immediately when Burning Red\nBurning Red lasts for 10s. No longer gains Overheated or reloads while this is active\nGains 200% Heat Up effect bonuses but cannot trigger Empower, Curse, or Warcry skills.\nForced to reload after this effect ends">Burning Red ends\nExtends the duration of Burning Red by 5 s and restores 3% Max Life and Energy Shield when defeating an Elite\n+16% additional damage',
  },
  {
    hero: "Divineshot Carino: Zealot of War (#3)",
    name: "Endless Frenzy",
    level: 75,
    affix:
      'For every +1% Knockback distance, (0.2/0.3/0.4/0.5/0.6)% additional damage and -0.1 Projectile Max Deviation Angle\nHorizontal and Parabolic Projectiles will deviate from the shooting direction, and the max deviation angle is determined by the Projectile Max Deviation Angle\nWithin 0.5s after stopping shooting, the Deviation Angle returns to normal within 2s">Projectile Max Deviation Angle. Stacks up to 100 time(s)',
  },
  {
    hero: "Divineshot Carino: Zealot of War (#3)",
    name: "Eternal Flames",
    level: 75,
    affix:
      'Heat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up gains an additional effect: For every stack of Heat Up, 0.6% additional Attack and Cast Speed\nHeat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up gains an additional effect: For every stack of Heat Up, 0.6% additional Attack and Cast Speed\n+5% additional damage\nHeat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up gains an additional effect: For every stack of Heat Up, 0.6% additional Attack and Cast Speed\n+10% additional damage\nHeat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up gains an additional effect: For every stack of Heat Up, 0.6% additional Attack and Cast Speed\n+16% additional damage\nHeat Up\nAdditionally increases Projectiles Damage based on Heat Up stacks and increases the Projectile Max Deviation Angle">Heat Up gains an additional effect: For every stack of Heat Up, 0.6% additional Attack and Cast Speed\n+21% additional damage',
  },
  {
    hero: "Cateye Erika: Wind Stalker (#1)",
    name: "Wind Stalker",
    level: 1,
    affix:
      '+20% Movement Speed\nGains 1 stack of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s">Stalker for every 1 m of movement\nYour Multistrike Count\nRecords the current attack\'s number of attacks during Multistrike when a Multistrike is triggered. The next attack\'s count during Multistrike +1 for each attack made">Multistrike Count will not be interrupted during Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s">Stalker',
  },
  {
    hero: "Cateye Erika: Wind Stalker (#1)",
    name: "Have Fun",
    level: 45,
    affix:
      "The Main Skill is supported by Lv. 10 Multistrike\n(+2/+6/+12/+18/+24)% additional Attack Speed",
  },
  {
    hero: "Cateye Erika: Wind Stalker (#1)",
    name: "Interest",
    level: 45,
    affix:
      "(20/24/28/32/36)% of the increase/decrease on Movement Speed is also applied to additional Attack Damage, up to (+30/+36/+42/+48/+54)% additional Attack Damage",
  },
  {
    hero: "Cateye Erika: Wind Stalker (#1)",
    name: "Cat's Scratch",
    level: 60,
    affix:
      "(+27/+34/+41/+48/+55)% Additional Multistrike Damage Increment\nGains additional bonuses for damage increased with each strike for this time's attack based on the current Multistrike Count\">additional Multistrike damage increment for 4 s when the Max Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count is reached",
  },
  {
    hero: "Cateye Erika: Wind Stalker (#1)",
    name: "Cat's Vision",
    level: 60,
    affix:
      'At Max Multistrike Count\nRecords the current attack\'s number of attacks during Multistrike when a Multistrike is triggered. The next attack\'s count during Multistrike +1 for each attack made">Multistrike Count, +1 to Max Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s">Stalker Stacks, up to +3 , until Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s">Stalker ends\n(-4/+2/+8/+14/+20)% additional damage',
  },
  {
    hero: "Cateye Erika: Wind Stalker (#1)",
    name: "Cat Dive",
    level: 75,
    affix:
      "During Multistrike\nChance to perform an additional attack when using Attack Skills. If the chance exceeds 100%, one additional attack will be performed with every 100% of the chance.\n+20% Attack Speed during Multistrikes.\nMultistrikes consume skill resources as normal and will be interrupted if there are insufficient resources. Moving or using other non-instant skills will interrupt Multistrike.\nMobility, Channeled Skills, and Sentry skills cannot Multistrike\">Multistrike, there is a (0.24/0.27/0.3/0.33/0.36)% chance for this attack to deal damage equal to the Max Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count for every +1% Movement Speed you have",
  },
  {
    hero: "Cateye Erika: Wind Stalker (#1)",
    name: "Cat's Punches",
    level: 75,
    affix:
      "At Max Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count, gains 1 stack of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n+1 to the initial Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count for every 3 stack(s) of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n-18% additional damage\nAt Max Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count, gains 1 stack of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n+1 to the initial Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count for every 3 stack(s) of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n-12% additional damage\nAt Max Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count, gains 1 stack of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n+1 to the initial Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count for every 3 stack(s) of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n-6% additional damage\nAt Max Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count, gains 1 stack of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n+1 to the initial Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count for every 3 stack(s) of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\nAt Max Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count, gains 1 stack of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n+1 to the initial Multistrike Count\nRecords the current attack's number of attacks during Multistrike when a Multistrike is triggered. The next attack's count during Multistrike +1 for each attack made\">Multistrike Count for every 3 stack(s) of Stalker\n+13% additional damage during Multistrike for every stack of Stalker\nInitial max stacks: 3. Lasts for 4s\">Stalker\n+6% additional damage",
  },
  {
    hero: "Cateye Erika: Lightning Shadow (#2)",
    name: "Lightning Shadow",
    level: 1,
    affix:
      'Start moving or click a Trait Skill to gain 1 Electrify\nFor every stack of Electrify, Feline Figure inflicts 1 stack of Numbed on enemies within the area">Electrify stack for every 3 m of movement made within the next 1 s, up to 3 stack(s). Lasts for 10 s. Electrify\nFor every stack of Electrify, Feline Figure inflicts 1 stack of Numbed on enemies within the area">Electrify is affected by Skill Effect Duration\nClick the Trait Skill again to reset the effect\nWhen Electrify\nFor every stack of Electrify, Feline Figure inflicts 1 stack of Numbed on enemies within the area">Electrify is owned, triggers Feline Figure\nInflicts Numbed stacks equal to the number of Electrify stacks on enemies within the area\nSkill Tags: Spell, Lightning">Feline Figure on up to 3 enemy(ies) within 10 m. Cooldown: 0.4 s. Can only be triggered once on each enemy\nFor every 1 stack(s) of Electrify\nFor every stack of Electrify, Feline Figure inflicts 1 stack of Numbed on enemies within the area">Electrify, Feline Figure\nInflicts Numbed stacks equal to the number of Electrify stacks on enemies within the area\nSkill Tags: Spell, Lightning">Feline Figure inflicts 1 stack(s) of Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed on enemies within the area\n+18% additional Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed Effect',
  },
  {
    hero: "Cateye Erika: Lightning Shadow (#2)",
    name: "Dazzling Lightning",
    level: 45,
    affix:
      '(+2/+2/+3/+3/+4) to Max Electrify\nFor every stack of Electrify, Feline Figure inflicts 1 stack of Numbed on enemies within the area">Electrify Stacks\n(+3/+5/+5/+7/+7)% Movement Speed for every stack of Electrify\nFor every stack of Electrify, Feline Figure inflicts 1 stack of Numbed on enemies within the area">Electrify',
  },
  {
    hero: "Cateye Erika: Lightning Shadow (#2)",
    name: "Electroplated Motif",
    level: 45,
    affix:
      'The Duration of the Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed inflicted by Feline Figure\nInflicts Numbed stacks equal to the number of Electrify stacks on enemies within the area\nSkill Tags: Spell, Lightning">Feline Figure is doubled\n(+20/+25/+30/+35/+40)% additional Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed Effect',
  },
  {
    hero: "Cateye Erika: Lightning Shadow (#2)",
    name: "Wild Lightning",
    level: 60,
    affix:
      '0.4% additional Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed Effect for every +1% Movement Speed, up to (+80/+90/+100/+110/+120)%',
  },
  {
    hero: "Cateye Erika: Lightning Shadow (#2)",
    name: "Charging Equation",
    level: 75,
    affix:
      'Feline Figure\nInflicts Numbed stacks equal to the number of Electrify stacks on enemies within the area\nSkill Tags: Spell, Lightning">Feline Figure is triggered when inflicting Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed on enemies. Cooldown for each enemy: 1 s\nWhen Feline Figure\nInflicts Numbed stacks equal to the number of Electrify stacks on enemies within the area\nSkill Tags: Spell, Lightning">Feline Figure inflicts Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed, for every stack of Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed enemies have, (+3/3.5/+4/4.5/+5)% additional Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed Effect for Erika. Stacks up to 10 time(s). This is refreshed when Feline Figure\nInflicts Numbed stacks equal to the number of Electrify stacks on enemies within the area\nSkill Tags: Spell, Lightning">Feline Figure is cast again',
  },
  {
    hero: "Cateye Erika: Lightning Shadow (#2)",
    name: "Swift as Lightning",
    level: 75,
    affix:
      'For every 4 stack(s) of Numbed\nAn Elemental Ailment that has a chance to be inflicted when Lightning Damage hits its target.\nWhen hitting a Numbed enemy, Lightning Damage inflicts 1 stack of Numbed for every 10% of the sum of Max Energy Shield and Life dealt by Lightning Damage. This threshold can be lowered or raised, but the minimum is 1%.\nThe default duration of Numbed is 2s, and the duration of each stack is calculated independently.\nMax Numbed stacks: 10. Each stack of Numbed increases the Lightning Damage taken by an additional +5%.">Numbed inflicted on the enemy, +2% Movement Speed, (+1/1.5/+2/2.5/+3)% additional damage, and (+3/+4/+5/+6/+7)% Feline Figure\nInflicts Numbed stacks equal to the number of Electrify stacks on enemies within the area\nSkill Tags: Spell, Lightning">Feline Figure Area. Stacks up to 10 time(s). Lasts for 10 s',
  },
  {
    hero: "Cateye Erika: Vendetta's Sting (#3)",
    name: "Vendetta's Sting",
    level: 1,
    affix:
      'Replace the skill in the third slot with Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">VendettaGains Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive after casting Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta\n100% of the bonuses to Skill Area is also applied to Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta, up to 300%',
  },
  {
    hero: "Cateye Erika: Vendetta's Sting (#3)",
    name: "Twinblade Onslaught",
    level: 45,
    affix:
      'No Attack Speed additional bonus is granted while Dual Wielding\nWhen using two One-Handed Weapons, one in each hand">Dual Wielding. Instead, (+25/+30/+35/+40/+45)% additional Attack Damage\nNo Attack Block Chance bonus is granted while Dual Wielding\nWhen using two One-Handed Weapons, one in each hand">Dual Wielding. Instead, converts 50% of Life Regain and Shield Regain to Restoration Over Time',
  },
  {
    hero: "Cateye Erika: Vendetta's Sting (#3)",
    name: "Leisurely Stroll",
    level: 60,
    affix:
      'Main Skills cannot be supported by Activation MediumVendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta has no Cooldown when you have Quickness\nAdditionally increases Attack Speed, Cast Speed, Movement Speed, and Mobility Skill Cooldown Recovery Time by 8%">Hasten\n-80% additional damage for manually used Main Skills while Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive is active\nMain Skills cannot be supported by Activation MediumWhen having Quickness\nAdditionally increases Attack Speed, Cast Speed, Movement Speed, and Mobility Skill Cooldown Recovery Time by 8%">Hasten, Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta has no Cooldown and gains +5% additional Attack Speed\n-80% additional damage for manually used Main Skills while Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive is active\nMain Skills cannot be supported by Activation MediumWhen having Quickness\nAdditionally increases Attack Speed, Cast Speed, Movement Speed, and Mobility Skill Cooldown Recovery Time by 8%">Hasten, Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta has no Cooldown and gains +10% additional Attack Speed\n-80% additional damage for manually used Main Skills while Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive is active\nMain Skills cannot be supported by Activation MediumWhen having Quickness\nAdditionally increases Attack Speed, Cast Speed, Movement Speed, and Mobility Skill Cooldown Recovery Time by 8%">Hasten, Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta has no Cooldown and gains +15% additional Attack Speed\n-80% additional damage for manually used Main Skills while Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive is active\nMain Skills cannot be supported by Activation MediumWhen having Quickness\nAdditionally increases Attack Speed, Cast Speed, Movement Speed, and Mobility Skill Cooldown Recovery Time by 8%">Hasten, Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta has no Cooldown and gains +20% additional Attack Speed\n-80% additional damage for manually used Main Skills while Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive is active',
  },
  {
    hero: "Cateye Erika: Vendetta's Sting (#3)",
    name: "Swift Stalk",
    level: 60,
    affix:
      'Replace Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta with Endless Vendetta\nTargets a random enemy within a 15m radius to repeatedly cast Vendetta. Starts with -30% additional Attack Speed, +5% additional Attack Speed per repeat cast. Repeat limit: 30 time(s). Cooldown: 10s">Endless VendettaSkills triggered by Vendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta deal (+30/+45/+60/+75/+90)% additional damage to Elite\nElite monsters include rare monsters and bosses">Elites while Endless Vendetta\nTargets a random enemy within a 15m radius to repeatedly cast Vendetta. Starts with -30% additional Attack Speed, +5% additional Attack Speed per repeat cast. Repeat limit: 30 time(s). Cooldown: 10s">Endless Vendetta is active\n+333% additional Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive Duration. +99% Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive Effect',
  },
  {
    hero: "Cateye Erika: Vendetta's Sting (#3)",
    name: "Feline Fury",
    level: 75,
    affix:
      '+200 Attack Critical Strike Rating when Dual Wielding\nWhen using two One-Handed Weapons, one in each hand">Dual Wielding the same type of weapons\n+20% additional damage for Critical Strikes when Dual Wielding\nWhen using two One-Handed Weapons, one in each hand">Dual Wielding different types of weapons\nVendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta has a 1% chance to trigger Main Melee Attack Skill 1 additional time for every (5/4/3/2.5/2)% Effective\nThe portion that doesn\'t exceed the fixed upper limit">Effective Critical Strike Chance\nVendetta\nTeleports to a random enemy within 8m, then triggers the Main Skill 1 time and +40% additional damage for the triggered skill. Cooldown: 3s">Vendetta has a 1% chance to trigger Main Melee Attack Skill 1 additional time for every 0.5% Excess\nThe portion that exceeds the fixed upper limit">Excess Critical Strike Chance, up to 100%',
  },
  {
    hero: "Cateye Erika: Vendetta's Sting (#3)",
    name: "Mortal Gambit",
    level: 75,
    affix:
      'Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive gains an additional base effect: Within 5 m, damage taken increases the closer you are to the enemy, up to +5% additional damage taken at 2 m\n+40% Incisive\n+10% additional Attack Damage\nWithin 5m, damage dealt increases the closer you are to the enemy, up to +20% additional Attack Damage at 2m\nLasts for 3s">Incisive Effect for each stack of Agility Blessing, stacking up to (6/7/8/9/10) time(s)',
  },
  {
    hero: "Frostfire Gemma: Ice-Fire Fusion (#1)",
    name: "Ice-Fire Fusion",
    level: 1,
    affix:
      "Enters Frostfire Rampage after casting Fire or Cold Skills 5 time(s)\n+20% additional Fire Damage and Cold Damage during Frostfire Rampage\nFrostfire Rampage lasts for 5 s and has a cooldown of 10 s",
  },
  {
    hero: "Frostfire Gemma: Ice-Fire Fusion (#1)",
    name: "Ice-Fire Embrace",
    level: 45,
    affix:
      "(+10/+13/+16/+19/+22)% additional Cold Damage if you have dealt Fire Damage recently\n(+10/+13/+16/+19/+22)% additional Fire Damage if you have dealt Cold Damage recently\n+10% Fire and Cold Resistance",
  },
  {
    hero: "Frostfire Gemma: Ice-Fire Fusion (#1)",
    name: "Ice-Fire Radiance",
    level: 60,
    affix:
      "-50% Frostfire Rampage\n+50% Fusion Energy effect for 5s during which Fusion Energy won't deplete. Loses all Fusion Energy when the Duration ends. Cooldown: 11s.\">Frostfire Rampage Duration\nRegenerates 10% Life and Mana per second when entering Frostfire Rampage. The effect gradually falls off to 0 within 3 s.\n(+60/+70/+80/+90/+100)% additional Fire Damage and Cold Damage when Frostfire Rampage ends. The effect gradually falls off to 0 within 3 s",
  },
  {
    hero: "Frostfire Gemma: Ice-Fire Fusion (#1)",
    name: "Restless Ice-Fire",
    level: 60,
    affix:
      "(+12/+15/+18/+21/+24)% Elemental Penetration and +20% Movement Speed during Frostfire Rampage\n(+20/+30/+40/+50/+60)% Frostfire Rampage Cooldown Recovery Speed",
  },
  {
    hero: "Frostfire Gemma: Ice-Fire Fusion (#1)",
    name: "Bone-piercing Heat",
    level: 75,
    affix: "Adds (30/36/42/48/54)% of Cold Damage as Fire Damage",
  },
  {
    hero: "Frostfire Gemma: Ice-Fire Fusion (#1)",
    name: "Ice to Blaze",
    level: 75,
    affix:
      'Converts 99% of Cold Damage to Fire Damage\nThe Fire Resistance of Frostbite\nFrostbite is an Ailment that may be triggered on Cold Damage hits. Frostbitten enemies -10% Attack, Cast, and Movement Speed. Base Frostbite Rating: 10. For every 1 Frostbite Rating, +1% additional Cold Damage taken. The enemy will be Frozen once they have more than 100 Frostbite Rating.">Frostbitten enemies is fixed at (15/10/5/0/-5)%',
  },
  {
    hero: "Frostfire Gemma: Frostbitten Heart (#2)",
    name: "Frostbitten Heart",
    level: 1,
    affix:
      'When dealing Cold Damage, casts Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse. Interval: 4 s\nInflicts Frostbite\nFrostbite is an Ailment that may be triggered on Cold Damage hits. Frostbitten enemies -10% Attack, Cast, and Movement Speed. Base Frostbite Rating: 10. For every 1 Frostbite Rating, +1% additional Cold Damage taken. The enemy will be Frozen once they have more than 100 Frostbite Rating.">Frostbite when Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse hits an enemy\n+20% additional Cold Damage for 6 s when Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse hits an enemy',
  },
  {
    hero: "Frostfire Gemma: Frostbitten Heart (#2)",
    name: "Deepfreeze",
    level: 45,
    affix:
      'Frostbite\nEnemies are inflicted with a fixed amount of Frostbite Rating when they are Frostbitten. This can be increased by raising Max Frostbite Rating. The Max Frostbite Rating is 100.">Frostbite Rating can exceed its upper limit, up to (150/150/200/200/200)\n(+65/+90/+110/+130/+150)% Frostbite\nFrostbite is an Ailment that may be triggered on Cold Damage hits. Frostbitten enemies -10% Attack, Cast, and Movement Speed. Base Frostbite Rating: 10. For every 1 Frostbite Rating, +1% additional Cold Damage taken. The enemy will be Frozen once they have more than 100 Frostbite Rating.">Frostbite Effect',
  },
  {
    hero: "Frostfire Gemma: Frostbitten Heart (#2)",
    name: "Dance of Frost",
    level: 60,
    affix:
      '-2 s Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse Interval\n(+8/+10/+12/+15/+18)% additional Cold Damage taken by the enemy for each time it has been hit with Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse recently. Lasts for 8 seconds and stacks up to 4 times',
  },
  {
    hero: "Frostfire Gemma: Frostbitten Heart (#2)",
    name: "Glacial Night",
    level: 60,
    affix:
      'Enemies gain Condensed Frost\n+0.25% additional Cold Damage taken for each point of Frostbite Rating exceeding 100, up to +25%\n-10% additional Attack and Cast Speed to enemies (not affected by Condensed Frost)">Condensed Frost\nEnemies gain Condensed Frost\n+0.25% additional Cold Damage taken for each point of Frostbite Rating exceeding 100, up to +25%\n-10% additional Attack and Cast Speed to enemies (not affected by Condensed Frost)">Condensed Frost\n+25% Condensed Frost Effect\nEnemies gain Condensed Frost\n+0.25% additional Cold Damage taken for each point of Frostbite Rating exceeding 100, up to +25%\n-10% additional Attack and Cast Speed to enemies (not affected by Condensed Frost)">Condensed Frost\n+50% Condensed Frost Effect\nEnemies gain Condensed Frost\n+0.25% additional Cold Damage taken for each point of Frostbite Rating exceeding 100, up to +25%\n-10% additional Attack and Cast Speed to enemies (not affected by Condensed Frost)">Condensed Frost\n+75% Condensed Frost Effect\nEnemies gain Condensed Frost\n+0.25% additional Cold Damage taken for each point of Frostbite Rating exceeding 100, up to +25%\n-10% additional Attack and Cast Speed to enemies (not affected by Condensed Frost)">Condensed Frost\n+100% Condensed Frost Effect',
  },
  {
    hero: "Frostfire Gemma: Frostbitten Heart (#2)",
    name: "Blooming Frost Flower",
    level: 75,
    affix:
      'Upon inflicting Frostbite, additionally casts Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse at the Frostbitten target once. Interval: 2s for the same target\n(+35/+45/+55/+65/+75) to Max Frostbite\nEnemies are inflicted with a fixed amount of Frostbite Rating when they are Frostbitten. This can be increased by raising Max Frostbite Rating. The Max Frostbite Rating is 100.">Frostbite Rating',
  },
  {
    hero: "Frostfire Gemma: Frostbitten Heart (#2)",
    name: "Frigid Infusion",
    level: 75,
    affix:
      '(-20/-25/-35/-40/-45)% Cold Resistance for 6 s when Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse hits an enemy\n+100% additional Cold Pulse\nA Cold Energy Pulse spreads from the target, dealing Cold Spell Damage. Base Interval: 4s.\nSkill Tags: Spell, Cold, Elemental, Area">Cold Pulse Skill Area',
  },
  {
    hero: "Frostfire Gemma: Flame of Pleasure (#3)",
    name: "Flame of Pleasure",
    level: 1,
    affix:
      'Click the Trait Skill to unleash Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory.\nPurgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory has an initial radius of 8 m, lasts for 5 s, and has a cooldown of 8 s\nPurgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory\'s upper limit becomes 1 . Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory follows the player while it is active\nAttempts to auto-cast Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory when you are not in Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory and enemies are present within 15m. Interval: 1s\n+45% additional damage taken by enemies within the range of Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory',
  },
  {
    hero: "Frostfire Gemma: Flame of Pleasure (#3)",
    name: "Groaning Echo",
    level: 45,
    affix:
      '+1 Max Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory Charges\n(+1/1.25/1.5/1.75/+2) s Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory Duration\n(+40/+55/+70/+85/+100)% Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory Skill Area',
  },
  {
    hero: "Frostfire Gemma: Flame of Pleasure (#3)",
    name: "Flames of Desire",
    level: 60,
    affix:
      'Eliminates enemies with less than (6/7/8/9/10)% Life within the range of Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory\nRestores (1/1.25/1.5/1.75/2)% of Max Life and Energy Shield when defeating enemies within the range of Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory',
  },
  {
    hero: "Frostfire Gemma: Flame of Pleasure (#3)",
    name: "Infernal Damnation",
    level: 60,
    affix:
      'For every second Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory is active, (+6/+7/+8/+9/+10)% additional damage until Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory is lost or a new Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory is cast',
  },
  {
    hero: "Frostfire Gemma: Flame of Pleasure (#3)",
    name: "Banquet of Bliss",
    level: 75,
    affix:
      '-30% additional damage taken by enemies within (4/3/2/1/1) m\nEnemies within range of Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory are cursed by Lv. (10/15/20/30/40) Scorch\nCurse Skill. Increases additional Fire Damage taken and chance to be Ignited">Scorch\nYou can cast 1 additional Curses',
  },
  {
    hero: "Frostfire Gemma: Flame of Pleasure (#3)",
    name: "Dress Licker",
    level: 75,
    affix:
      'Converts 20% of Physical Damage taken to Fire Damage\nConverts 100% of Physical Damage taken by enemies within the range of Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory to Fire Damage\n(+30/+35/+40/+45/+50)% additional Fire Damage taken by enemies within the range of Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory\n+30% additional Fire Damage against enemies within the range of Purgatory\nAdditionally increases the damage taken by enemies within the area of Purgatory">Purgatory',
  },
  {
    hero: "The Forsaken Iris: Growing Breeze (#1)",
    name: "Growing Breeze",
    level: 1,
    affix:
      'Spirit Magus Skills can be equipped to Active Skill slotsWhen a Spirit Magus Skill is set as an Active Skill, casting the Active Skill is considered as casting the Trait Skill as well\nGrants 4 stack(s) of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment to all Spirit Magi when using Trait Skills. Cooldown: 5 s\nWithin 1 s of Spirit Magi gaining Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment, if there are no enemies within 5 m, +70% Movement Speed\nWhen a Spirit Magus casts a skill, +30% chance for it to lose 1 stack of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment\nFor every stack of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment a Spirit Magus has, when it uses a skill, +8% chance for it to lose a stack of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment\nNourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment: When using a skill, +30% additional damage dealt by this skill. Lasts 15 s and stacks up to 10 time(s).\n100% of your Empower Skill Effect bonus is also applied to Spirit Magi\'s Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment',
  },
  {
    hero: "The Forsaken Iris: Growing Breeze (#1)",
    name: "Embrace the World",
    level: 45,
    affix:
      'For every 1% Fire, Cold, or Lightning Resistance, +1% chance for the corresponding Spirit Magi to use an Enhanced Skill\nChance to change the skill into a stronger Enhanced Skill when Spirit Magus uses a Base Skill. The chance can be increased, and at 100%, Spirit Magi will no longer use Base Skills and always use Enhanced Skills">Enhanced Skill, up to (+28/+36/+44/+52/+60)%',
  },
  {
    hero: "The Forsaken Iris: Growing Breeze (#1)",
    name: "Struggle Free",
    level: 45,
    affix:
      "+100% Sealed Mana\nA portion of Mana is reserved to maintain persistent effects such as auras\">Sealed Mana Compensation for Spirit Magus Skills\nSpirit Magi's Skill Cooldown Recovery Speed (+50/+65/+80/+95/+110)%",
  },
  {
    hero: "The Forsaken Iris: Growing Breeze (#1)",
    name: "Amazing Friends",
    level: 60,
    affix:
      '-20% chance for Spirit Magi to use an Enhanced Skill\nChance to change the skill into a stronger Enhanced Skill when Spirit Magus uses a Base Skill. The chance can be increased, and at 100%, Spirit Magi will no longer use Base Skills and always use Enhanced Skills">Enhanced Skill\nAfter gaining a total of (40/35/30/24/18) stacks of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment, Spirit Magi enter Full Bloom\nSpirit Magi grow into their ultimate form, which unlocks their Ultimate that has an initial cooldown of 8s.\n50% of the Attack Speed bonus and additional bonus to Spirit Magi is also applied to additional Spirit Magi Attack Damage.\n50% of the Cast Speed bonus and additional bonus to Spirit Magi is also applied to additional Spirit Magi Spell Damage.">Full Bloom for 12 s\nWhen a Spirit Magus casts the Ultimate while having Full Bloom\nSpirit Magi grow into their ultimate form, which unlocks their Ultimate that has an initial cooldown of 8s.\n50% of the Attack Speed bonus and additional bonus to Spirit Magi is also applied to additional Spirit Magi Attack Damage.\n50% of the Cast Speed bonus and additional bonus to Spirit Magi is also applied to additional Spirit Magi Spell Damage.">Full Bloom, (+10/+11/+12/+13/+14)% additional Ultimate Cooldown Recovery Speed for every stack of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment',
  },
  {
    hero: "The Forsaken Iris: Growing Breeze (#1)",
    name: "Socialite",
    level: 60,
    affix:
      '+1 to Max Spirit Magi In Map\nMax Summonable Spirit Magi of Spirit Magus Skills +1\nWhen a Spirit Magus casts a skill, (+15/+12/+8/+4/+2)% chance for it to lose 1 stack of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment',
  },
  {
    hero: "The Forsaken Iris: Growing Breeze (#1)",
    name: "Grow With It",
    level: 75,
    affix:
      'Always attempts to auto-trigger the Trait Skill, Growing Breeze\nWhen a Spirit Magus casts a skill, for every +1 skill level of the corresponding skil, the Spirit Magus gains -4% chance to lose 1 stack of Nourishment\nWhen using a skill, +30% additional damage dealt by this skill. Lasts 15s and stacks up to 10 time(s). Effect of Nourishment enjoys Empower Skill Effect bonuses.">Nourishment, up to (-20/-24/-28/-36/-40)%',
  },
  {
    hero: "The Forsaken Iris: Growing Breeze (#1)",
    name: "Run With the Wind",
    level: 75,
    affix:
      'Changes the Base Trait to Holding a Trait Skill or Spirit Magus Skill to use Windrider\nA Spell Channeled Skill with a base channel interval of 0.2s and can be channeled up to 5 stack(s).\nAt max channeled stacks, loses all channeled stacks and grants 2 stack(s) of Nourishment to Spirit Magi within 12m">Windrider\nAllows movement while channeling Windrider\nA Spell Channeled Skill with a base channel interval of 0.2s and can be channeled up to 5 stack(s).\nAt max channeled stacks, loses all channeled stacks and grants 2 stack(s) of Nourishment to Spirit Magi within 12m">Windrider\n(+30/+20/+15/+10/+5)% additional damage taken while channeling Windrider\nA Spell Channeled Skill with a base channel interval of 0.2s and can be channeled up to 5 stack(s).\nAt max channeled stacks, loses all channeled stacks and grants 2 stack(s) of Nourishment to Spirit Magi within 12m">Windrider',
  },
  {
    hero: "The Forsaken Iris: Vigilant Breeze (#2)",
    name: "Vigilant Breeze",
    level: 1,
    affix:
      "Spirit Magus Skills can be equipped to Active Skill slotsWhen a Spirit Magus Skill is set as an Active Skill, casting the Active Skill is considered as casting the Trait Skill as well\nMerges with Spirit Magi\nWhen casting the Trait Skill, selects Spirit Magi according to the Skill Slot order.\nWhen casting a Spirit Magus Skill in the Active Skill Slot, selects Spirit Magi corresponding to the skill.\nAmong Spirit Magi summoned by the same skill, prioritizes selecting the Spirit Magus with the highest Life that is not Reconjuring.\nCooldown: 3s\">Merges with Spirit Magi after casting the Trait Skill, entering the Vigilant\nAllows you to control Spirit Magi and attack enemies with Spirit Magus Skills.\nYou take all damage from enemies in place of the Spirit Magi under your control.\nAll skills except for the second skill are switched with Spirit Magus Skills, and the Ultimate of Merged Spirit Magi is unlocked.\nOnly skills that don't have an attacking or casting action can be installed as the second skill.\nWhen controlling a Spirit Magus, Iris' Movement Speed is applied instead.\">Vigilant state. Merged Spirit Magi gain 5 stack(s) of Breeze\n+16% additional damage dealt by Merged Spirit Magi\">Breeze. Casting the Trait Skill again will remove the Vigilant\nAllows you to control Spirit Magi and attack enemies with Spirit Magus Skills.\nYou take all damage from enemies in place of the Spirit Magi under your control.\nAll skills except for the second skill are switched with Spirit Magus Skills, and the Ultimate of Merged Spirit Magi is unlocked.\nOnly skills that don't have an attacking or casting action can be installed as the second skill.\nWhen controlling a Spirit Magus, Iris' Movement Speed is applied instead.\">Vigilant state\nDuring Vigilant\nAllows you to control Spirit Magi and attack enemies with Spirit Magus Skills.\nYou take all damage from enemies in place of the Spirit Magi under your control.\nAll skills except for the second skill are switched with Spirit Magus Skills, and the Ultimate of Merged Spirit Magi is unlocked.\nOnly skills that don't have an attacking or casting action can be installed as the second skill.\nWhen controlling a Spirit Magus, Iris' Movement Speed is applied instead.\">Vigilant, Merged Spirit Magi consume 20% of Max Life per second when not Reconjuring\nWhile in the Vigilant\nAllows you to control Spirit Magi and attack enemies with Spirit Magus Skills.\nYou take all damage from enemies in place of the Spirit Magi under your control.\nAll skills except for the second skill are switched with Spirit Magus Skills, and the Ultimate of Merged Spirit Magi is unlocked.\nOnly skills that don't have an attacking or casting action can be installed as the second skill.\nWhen controlling a Spirit Magus, Iris' Movement Speed is applied instead.\">Vigilant state, Merged Spirit Magi gain 1 stack of Breeze\n+16% additional damage dealt by Merged Spirit Magi\">Breeze every 1 s when not Reconjuring, up to 10 stack(s)\nWhen Reconjuring or not Merged, Spirit Magi lose 2 stack(s) of Breeze\n+16% additional damage dealt by Merged Spirit Magi\">Breeze every 1 s",
  },
  {
    hero: "The Forsaken Iris: Vigilant Breeze (#2)",
    name: "Breeze's Whisper",
    level: 45,
    affix:
      '+30% chance for Spirit Magi to use an Enhanced Skill\nChance to change the skill into a stronger Enhanced Skill when Spirit Magus uses a Base Skill. The chance can be increased, and at 100%, Spirit Magi will no longer use Base Skills and always use Enhanced Skills">Enhanced Skill\nWhenever a Merged Spirit Magus casts an Enhanced Skill, restores (2.5/3/3.5/4/5)% of Max Life and +1 to Max Breeze\n+16% additional damage dealt by Merged Spirit Magi">Breeze Stacks. Interval: (0.9/0.5/0.2/0.1/0.03) s\nUp to (+4/+5/+6/+7/+8) to Max Breeze\n+16% additional damage dealt by Merged Spirit Magi">Breeze Stacks, lasting until Reconjuring',
  },
  {
    hero: "The Forsaken Iris: Vigilant Breeze (#2)",
    name: "Whirlwind Tango",
    level: 45,
    affix:
      'The Ultimate of Merged Spirit Magi has no cooldown\nEvery time a Merged Spirit Magus casts its Ultimate, it consumes (15/14/13/12/11)% of Max Life and gains (2/3/3/4/4) stack(s) of Breeze\n+16% additional damage dealt by Merged Spirit Magi">Breeze\n-40% additional Spirit Magus Skill Damage',
  },
  {
    hero: "The Forsaken Iris: Vigilant Breeze (#2)",
    name: "Happiest Reunion",
    level: 60,
    affix:
      "+1 to Max Spirit Magi In Map\nWhile in the Vigilant\nAllows you to control Spirit Magi and attack enemies with Spirit Magus Skills.\nYou take all damage from enemies in place of the Spirit Magi under your control.\nAll skills except for the second skill are switched with Spirit Magus Skills, and the Ultimate of Merged Spirit Magi is unlocked.\nOnly skills that don't have an attacking or casting action can be installed as the second skill.\nWhen controlling a Spirit Magus, Iris' Movement Speed is applied instead.\">Vigilant state, all Spirit Magi are considered Merged Spirit Magi\nWhile in the Vigilant\nAllows you to control Spirit Magi and attack enemies with Spirit Magus Skills.\nYou take all damage from enemies in place of the Spirit Magi under your control.\nAll skills except for the second skill are switched with Spirit Magus Skills, and the Ultimate of Merged Spirit Magi is unlocked.\nOnly skills that don't have an attacking or casting action can be installed as the second skill.\nWhen controlling a Spirit Magus, Iris' Movement Speed is applied instead.\">Vigilant state, for every Spirit Magus there is, (+1/+2/+3/+4/+5)% additional damage (multiplies) for Merged Spirit Magi. (+8/+7/+7/+6/+6)% to the amount of Max Life they consume per second when not Reconjuring",
  },
  {
    hero: "The Forsaken Iris: Vigilant Breeze (#2)",
    name: "Warmest Vigilance",
    level: 60,
    affix:
      '+1 to the Max Breeze\n+16% additional damage dealt by Merged Spirit Magi">Breeze Stacks for every (5/4.5/4.1/3.8/3.5)% Max Life consumed by Merged Spirit Magi, up to (+15/+17/+19/+21/+23)\nMerged Spirit Magi gain 1 stack of Breeze\n+16% additional damage dealt by Merged Spirit Magi">Breeze when defeating an enemy',
  },
  {
    hero: "The Forsaken Iris: Vigilant Breeze (#2)",
    name: "Merging Stream",
    level: 75,
    affix:
      'Iris is not affected by Origin of Spirit Magus Effects, and all basic Origin of Spirit Magus Effects will be applied to all Spirit Magi\nFor every 2 Growth\nSpirit Magi grow into the next Stage for every 100 Growth. They start at Stage 1 and can grow until they reach Stage 5. For every 8 Growth they have, Spirit Magi gain +1% Physique, +5% additional Skill Area, and a bonus every stage:\nAt Stage 2, +30% chance for them to use Enhanced Skill chance.\nAt Stage 3, their Enhanced Skills become stronger.\nAt Stage 4, their Empower Skills become stronger.\nAt Stage 5, they +25% additional damage, +10% additional Skill Area, and gain increased Movement Speed and Tracking Area.\nThe max Growth is 1000.">Growth a Spirit Magus has, it (0.1/0.15/0.2/0.25/0.3)% additional Origin of Spirit Magus Effect received',
  },
  {
    hero: "The Forsaken Iris: Vigilant Breeze (#2)",
    name: "Nurturing Breeze",
    level: 75,
    affix:
      "While in Vigilant\nAllows you to control Spirit Magi and attack enemies with Spirit Magus Skills.\nYou take all damage from enemies in place of the Spirit Magi under your control.\nAll skills except for the second skill are switched with Spirit Magus Skills, and the Ultimate of Merged Spirit Magi is unlocked.\nOnly skills that don't have an attacking or casting action can be installed as the second skill.\nWhen controlling a Spirit Magus, Iris' Movement Speed is applied instead.\">Vigilant, Iris (-20/-24/-28/-32/-36)% additional damage taken\n(50/60/70/80/100)% of the bonus and additional bonus to Life Regeneration Speed and Life Regeneration Per Second is also applied to Merged Spirit Magi\n(100/120/140/160/200)% of the bonus and additional bonus to Life Regain, Shield Regain, Life Regain Interval, and Shield Regain Interval is also applied to Merged Spirit Magi",
  },
  {
    hero: "Commander Moto: Order Calling (#1)",
    name: "Order Calling",
    level: 1,
    affix:
      'Within 4 s after a Summon Skill is cast, all your Minions will gain Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload. Cooldown: 12 s\nOverload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload grants +60% additional damage\nThe Effect and Duration of Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload are refreshed when a Minion that already has Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload gains Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload again',
  },
  {
    hero: "Commander Moto: Order Calling (#1)",
    name: "All In",
    level: 45,
    affix:
      '(+120/+155/+190/+225/+270)% additional Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload Effect when a Minion gains Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload for the first time',
  },
  {
    hero: "Commander Moto: Order Calling (#1)",
    name: "Veteran",
    level: 45,
    affix:
      '(+80/+105/+130/+155/+180)% additional Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload Duration\nMinions +20% Attack and Cast Speed when they have Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload',
  },
  {
    hero: "Commander Moto: Order Calling (#1)",
    name: "Last Stand",
    level: 60,
    affix:
      'Minions won\'t be defeated when they have Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload\n-100% Life Restoration Speed for Minions when they have Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload\nMinions deal additional damage based on their Missing Life when they have Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload, up to (+25/+32/+40/+50/+60)% additional damage',
  },
  {
    hero: "Commander Moto: Order Calling (#1)",
    name: "Tough as Nails",
    level: 60,
    affix:
      '(+9/+11/+13/+15/+18)% Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload Effect for every 5 Command owned\nMinions with Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload regenerate 1% Max Life per second for every 5 Command\nEvery point of Command will grant Synthetic Troop Minions +3% additional damage and a bigger Tracking Area.\nThe lowest Command is -100 while the highest is 100. When Command is not 0, 13 point(s) will be returned (reduced/granted) every second until it becomes 0. For every 10 Command increased, +7 additional points will be returned.\nSynthetic Troop Minions\' Duration will not reduce when Command is a positive value.">Command owned',
  },
  {
    hero: "Commander Moto: Order Calling (#1)",
    name: "Charge Forward",
    level: 75,
    affix:
      'For every +5% Max Life a Minion has, +1% Physique and (+2/+3/+4/+5/+6)% Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload Effect received',
  },
  {
    hero: "Commander Moto: Order Calling (#1)",
    name: "Go for Broke",
    level: 75,
    affix:
      'For every 5% Life lost by a Synthetic Troop Minion in the last second, (+10/+11/+12/+14/+15)% Overload\nProvides buffs for your Minions\nBonuses that apply to Empower Skill Effects are also applied to Overload Effect\nBonuses that apply to Skill Effect Duration are also applied to Overload Duration">Overload Effect received. Stacks up to 20 time(s)',
  },
  {
    hero: "Commander Moto: Charge Calling (#2)",
    name: "Charge Calling",
    level: 1,
    affix:
      'Allows you to click the Trait Skill to gain Charge Calling for 6 s. Cooldown: 6 s\nDuring Charge Calling, Synthetic Troop Minions summoned at a time +1 . All Synthetic Troop Minions will activate Self-Destruct Protocol and Charge at the enemy in the next 1 s, self-destructing upon colliding with an enemy or being defeated to deal Physical Attack Damage to enemies within the area\n+20% additional Self-Destruct Damage triggered by Self-Destruct Protocol\nSynthetic Troop Minions are immediately defeated 1s after activation. The base multiplier for Minions to self-destruct is 115%.\nSkill Tags: Attack, Melee, Physical, Area, Strength, Dexterity, Intelligence">Self-Destruct Protocol',
  },
  {
    hero: "Commander Moto: Charge Calling (#2)",
    name: "Unstoppable Wave",
    level: 45,
    affix:
      '+30% chance for a Synthetic Troop Minion to drop 1 Mechanical Part When it initiates Self-Destruct Protocol\nSynthetic Troop Minions are immediately defeated 1s after activation. The base multiplier for Minions to self-destruct is 115%.\nSkill Tags: Attack, Melee, Physical, Area, Strength, Dexterity, Intelligence">Self-Destruct Protocol. Mechanical Parts last 1 s\nPlayer will automatically pick up Nearby\nWithin 6m">nearby Mechanical Parts\n(+3/3.5/+4/4.5/+5)% additional Minion Damage for each Mechanical Part picked up recently. Stacks up to 10 time(s)\nGains a Skill Slot, in which a Support Skill or Activation Medium Support Skill can be installed to support Trait Skill Charge Calling',
  },
  {
    hero: "Commander Moto: Charge Calling (#2)",
    name: "Guerilla Tactics",
    level: 60,
    affix:
      '+50% Mechanical Part Pick-Up Radius\n+2% additional Self-Destruct Protocol\nSynthetic Troop Minions are immediately defeated 1s after activation. The base multiplier for Minions to self-destruct is 115%.\nSkill Tags: Attack, Melee, Physical, Area, Strength, Dexterity, Intelligence">Self-Destruct Protocol Charge Speed and +3% additional Self-Destruct Protocol Damage for each Mechanical Part collected recently. Stacks up to (10/12/15/18/20) time(s)',
  },
  {
    hero: "Commander Moto: Charge Calling (#2)",
    name: "Heroic Sacrifice",
    level: 60,
    affix:
      'For every (+70/+60/+50/+45/+40) Max Life or Energy Shield a Synthetic Troop Minion has, Self-Destruct triggered by Self-Destruct Protocol\nSynthetic Troop Minions are immediately defeated 1s after activation. The base multiplier for Minions to self-destruct is 115%.\nSkill Tags: Attack, Melee, Physical, Area, Strength, Dexterity, Intelligence">Self-Destruct Protocol deals +1% additional damage',
  },
  {
    hero: "Commander Moto: Charge Calling (#2)",
    name: "Essential Speed",
    level: 75,
    affix:
      "(25/30/35/40/45)% of the bonus and additional bonus to Minion Attack Speed is also applied to the bonus and additional bonus of Self-Destruct Protocol Damage",
  },
  {
    hero: "Commander Moto: Charge Calling (#2)",
    name: "Fuel War with War",
    level: 75,
    affix:
      "Triggers the Main Summon Skill on the closest enemy within 20m every (0.2/0.18/0.15/0.12/0.1) s\n-30% Movement Speed",
  },
  {
    hero: "Berserker Rehan: Anger (#1)",
    name: "Anger",
    level: 1,
    affix:
      'When not in the Berserk state, each Melee Attack Skill generates 10 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage\nWhen not in the Berserk state, each stack of Melee Attack Skill channeled generates 5 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage\n0.22% additional damage and 0.1% Movement Speed for every 1 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage you have\nEnter Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk automatically at Max Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage\nWhile Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active, 15 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage is consumed per second\nAttacks trigger Burst\nWhen triggered, deals powerful area explosion damage equal to 340% of Weapon Damage to enemies within 3 m. While Dual Wielding, the Base Damage is the average damage of both weapons.\nFor every +1 to Skill Level, Burst +10% additional damage (multiplies)\nSkill Tags: Attack, Melee, Physical, Triggered, Area, Strength, Dexterity">Burst once on hit while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active. Cooldown: 0.3 s\n2.9% additional Burst\nWhen triggered, deals powerful area explosion damage equal to 340% of Weapon Damage to enemies within 3 m. While Dual Wielding, the Base Damage is the average damage of both weapons.\nFor every +1 to Skill Level, Burst +10% additional damage (multiplies)\nSkill Tags: Attack, Melee, Physical, Triggered, Area, Strength, Dexterity">Burst Damage per 1 levels',
  },
  {
    hero: "Berserker Rehan: Anger (#1)",
    name: "Frenzy Furious",
    level: 45,
    affix:
      '(0.3/0.5/0.7/0.9/1.1)% Critical Strike Rating for every 1 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage\nWhen Burst lands a Critical Strike, generates 3 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage. Interval: 0.03 s',
  },
  {
    hero: "Berserker Rehan: Anger (#1)",
    name: "Righteous Fury",
    level: 45,
    affix:
      'Generates (18/23/28/33/40) Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage per second instead of consuming Rage while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active\nWhen triggering Burst, consumes (8/7/6/5/4) Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage',
  },
  {
    hero: "Berserker Rehan: Anger (#1)",
    name: "Tunnel Vision",
    level: 60,
    affix:
      '-80% additional damage for non-Burst\nWhen triggered, deals powerful area explosion damage equal to 340% of Weapon Damage to enemies within 3 m. While Dual Wielding, the Base Damage is the average damage of both weapons.\nFor every +1 to Skill Level, Burst +10% additional damage (multiplies)\nSkill Tags: Attack, Melee, Physical, Triggered, Area, Strength, Dexterity">Burst skills\n(+66/+77/+88/+99/+110)% additional Burst\nWhen triggered, deals powerful area explosion damage equal to 340% of Weapon Damage to enemies within 3 m. While Dual Wielding, the Base Damage is the average damage of both weapons.\nFor every +1 to Skill Level, Burst +10% additional damage (multiplies)\nSkill Tags: Attack, Melee, Physical, Triggered, Area, Strength, Dexterity">Burst Damage',
  },
  {
    hero: "Berserker Rehan: Anger (#1)",
    name: "Rampaging",
    level: 75,
    affix:
      "(70/80/90/100/110)% of the bonus and additional bonus to Attack Speed is also applied to Burst's Cooldown Recovery Speed",
  },
  {
    hero: "Berserker Rehan: Anger (#1)",
    name: "Uncontrolled Anger",
    level: 75,
    affix:
      '+200% additional Burst\nWhen triggered, deals powerful area explosion damage equal to 340% of Weapon Damage to enemies within 3 m. While Dual Wielding, the Base Damage is the average damage of both weapons.\nFor every +1 to Skill Level, Burst +10% additional damage (multiplies)\nSkill Tags: Attack, Melee, Physical, Triggered, Area, Strength, Dexterity">Burst Area\nFor every +2% Skill Area, +1% additional Burst Damage, up to (+40/+51/+63/+76/+90)%',
  },
  {
    hero: "Berserker Rehan: Seething Silhouette (#2)",
    name: "Seething Silhouette",
    level: 1,
    affix:
      'When not in the Berserk state, each Melee Attack Skill generates 10 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage\n+1% Attack Speed for every 5 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage\nEnter Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk automatically at Max Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage\n+20% Movement Speed while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active\nGains bonuses twice the Max Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active\nWhile Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active, 10 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage is consumed per second\nCasting Melee Attack Skills no longer generates Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage and consumes 10 points of Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage instead while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active. The mode ends when Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage runs out\n+45% Skill Area while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active\n+20% additional damage while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active',
  },
  {
    hero: "Berserker Rehan: Seething Silhouette (#2)",
    name: "Fury's Onslaught",
    level: 45,
    affix:
      'Own Seething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit\nWhen a Melee Main Skill is used while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active, Seething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit appears and automatically attacks for (1/1.5/2/2/2) s. Using the Melee Main Skill again will refresh the Seething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit\'s duration\nRage will no longer be naturally consumed while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active. The Rage consumed by Melee Attack Skills will be halved. (+20/+27/+34/+41/+48)% additional damage dealt by the player',
  },
  {
    hero: "Berserker Rehan: Seething Silhouette (#2)",
    name: "Ritual of Offering",
    level: 45,
    affix:
      'Own Seething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit\nSeething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit will always exist and attack automatically while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active\nYou are Disarm\nCannot perform Attack Skills">Disarmed while Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active\n(+20/+25/+30/+35/+40)% additional Seething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit Damage\nWhile Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk is active, takes Secondary Physical Damage equal to 1% of current Life every 0.2 s. This damage is not affected by bonuses\n-30% Movement Speed',
  },
  {
    hero: "Berserker Rehan: Seething Silhouette (#2)",
    name: "Growing Anger",
    level: 60,
    affix:
      'Gains (9/10/11/12/13) additional Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage when Seething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit uses a skill. The Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage gained is doubled when Seething Spirit\nAn ancestor spirit that casts your Non-Mobility and Non-Channeled Main Melee Attack Skills when it appears">Seething Spirit deals Double Damage. Interval: 0.03s',
  },
  {
    hero: "Berserker Rehan: Seething Silhouette (#2)",
    name: "Hysteria",
    level: 60,
    affix:
      'Generates 1 points of Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage when taking damage equal to 3% of the sum of Max Life and Max Energy Shield\nGenerate 1 Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage for every 3% Max Life consumed\n(0.3/0.4/0.5/0.6/0.7)% additional Attack Damage for every 1% Missing Life',
  },
  {
    hero: "Berserker Rehan: Seething Silhouette (#2)",
    name: "Rage Infusion",
    level: 75,
    affix:
      '+5% additional damage per 25 points of Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage gained recently. Stacks up to (6/7/8/9/10) times\nYou will no longer be Disarmed after Berserk\nGains bonuses twice the Max Rage while Berserk is active\nBerserk expires when you run out of Rage">Berserk has been active for 5s. +40% Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage gained',
  },
  {
    hero: "Berserker Rehan: Seething Silhouette (#2)",
    name: "Split Form",
    level: 75,
    affix:
      'Life Regain no longer requires a hit to activate\n(+5/+10/+15/+20/+25)% additional Max Life\n(+1/+1/+2/+2/+2)% Rage\nA Berserker exclusive energy that has a default upper limit of 100\nUpon reaching max Rage, Berserker enters Berserk">Rage gained for every 40 Max Life',
  },
  {
    hero: "Lightbringer Rosa: High Court Chariot (#1)",
    name: "High Court Chariot",
    level: 1,
    affix:
      '+30% Attack and Spell Block Chance\nRestores 4 Murderous Intent\nThe base upper limit of Murderous Intent is 100">Murderous Intent per second\nRestores 10 Murderous Intent\nThe base upper limit of Murderous Intent is 100">Murderous Intent when Blocking\nWhen having at least 15 Murderous Intent, you can cast the Trait Skill and consume 15 Murderous Intent\nThe base upper limit of Murderous Intent is 100">Murderous Intent to create a Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain centered around you and pull enemies within 8 m inside\nWhile inside the Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain, +20% additional damage',
  },
  {
    hero: "Lightbringer Rosa: High Court Chariot (#1)",
    name: "Unbreakable Stand",
    level: 45,
    affix:
      '(+7/+8/+9/9.5/+10)% additional damage for Enemy Count\nEach Normal or Magic monster counts as 1 monster\nEach Rare monster counts as 2 monsters\nEach Boss counts as 5 monsters">each enemy in the Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain, up to +100%',
  },
  {
    hero: "Lightbringer Rosa: High Court Chariot (#1)",
    name: "Whirlwind Advance",
    level: 45,
    affix:
      '(+20/+30/+40/+40/+50)% Movement Speed for (4/5/6/8/8) s after entering or leaving the Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain\nRestores (4/5/6/7/8) Murderous Intent upon defeating an enemy in the Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain',
  },
  {
    hero: "Lightbringer Rosa: High Court Chariot (#1)",
    name: "Divine Intervention",
    level: 60,
    affix:
      'For every 1 Murderous Intent\nThe base upper limit of Murderous Intent is 100">Murderous Intent you currently have, (0.3/0.37/0.44/0.51/0.58)% additional damage dealt to enemies in the Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain and +1% Murderous Intent\nThe base upper limit of Murderous Intent is 100">Murderous Intent restoration\nGains a Skill Slot, in which a Support Skill or Activation Medium Support Skill can be installed to support Trait Skill Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain',
  },
  {
    hero: "Lightbringer Rosa: High Court Chariot (#1)",
    name: "Invulnerability",
    level: 60,
    affix:
      'While inside the Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain, (+7/+9/+11/+13/+15)% Block Ratio\nBy default, Blocking absorbs 30% damage. Increase Block Ratio to increase the damage absorption ratio.">Block Ratio and Block Ratio Upper Limit\nThe Block Ratio\'s upper limit is 60% by default and can be increased to a maximum of 80%">Block Ratio Upper Limit\n(+1/+1/+2/+2/+2)% Murderous Intent\nThe base upper limit of Murderous Intent is 100">Murderous Intent restoration for every 1% Block Ratio\nBy default, Blocking absorbs 30% damage. Increase Block Ratio to increase the damage absorption ratio.">Block Ratio\nGains a Skill Slot, in which a Support Skill or Activation Medium Support Skill can be installed to support Trait Skill Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain',
  },
  {
    hero: "Lightbringer Rosa: High Court Chariot (#1)",
    name: "Desperation",
    level: 75,
    affix:
      'Trait Skills can be continuously channeled. During this time, the Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain moves with the player, and no Murderous Intent\nThe base upper limit of Murderous Intent is 100">Murderous Intent is consumed while channeling. Max channeled stacks: 2\n引导层数达到上限时，失去所有引导层数，重新释放一次Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">圣光领域，对Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">圣光领域内的所有单位施加No Guard\n额外 +10% 受到的伤害\n失去的引导层数会提高卸甲效果，初始 2 层提高 100% 卸甲效果；后续每额外失去 1 层，卸甲效果对应提高 100%">卸甲，No Guard\n额外 +10% 受到的伤害\n失去的引导层数会提高卸甲效果，初始 2 层提高 100% 卸甲效果；后续每额外失去 1 层，卸甲效果对应提高 100%">卸甲持续 8 秒\nFor every 1% Block Ratio, (2.4/2.5/2.6/2.8/2.8)% additional No Guard\n额外 +10% 受到的伤害\n失去的引导层数会提高卸甲效果，初始 2 层提高 100% 卸甲效果；后续每额外失去 1 层，卸甲效果对应提高 100%">No Guard Effect for enemies and (-0.67/-0.8/-1/-1/-1.2)% additional No Guard\n额外 +10% 受到的伤害\n失去的引导层数会提高卸甲效果，初始 2 层提高 100% 卸甲效果；后续每额外失去 1 层，卸甲效果对应提高 100%">No Guard Effect on you\n-30% Holy Domain\nThe Holy Domain automatically closes 1s after you leave the Holy Domain\nThe Holy Domain has a radius of 5m. Not affected by Skill Area bonuses">Holy Domain radius',
  },
  {
    hero: "Lightbringer Rosa: High Court Chariot (#1)",
    name: "Improvision",
    level: 75,
    affix:
      "When Blocking in the Holy Domain, +20% additional damage for 10s, up to (+40/+50/+60/+70/+80)%",
  },
  {
    hero: "Lightbringer Rosa: Unsullied Blade (#2)",
    name: "Unsullied Blade",
    level: 1,
    affix:
      'Gains Mystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury\nWhile Mystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury is active, using non-Channeled Attack Skills grants Mercury Pts\nUpon reaching max Mercury Pts, Mystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury becomes Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury. Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury consumes 30 Mercury Pts every second. When Mercury Pt is 0, Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury becomes Mystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury again\nMana can only be consumed by Mystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury. At the same time, Mana can only be restored by Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury\nBonus and additional bonus to Spell Damage and also apply to Attack Damage',
  },
  {
    hero: "Lightbringer Rosa: Unsullied Blade (#2)",
    name: "Baptism of Purity",
    level: 45,
    affix:
      '+20% additional Max Mana\nInside Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury, selects the enemy with the highest rarity that took damage from you recently and records (12/20/28/36/44)% of the non-Channeled Attack Elemental Hit Damage dealt to this enemy. Every 0.5 s, it casts Mercury Baptism\nDeals True Damage based on the damage recorded by Realm of Mercury to all enemies within it once and clears the record">Mercury Baptism on all enemies within it and gains (5/5/6/6/7) Mercury Pts\nMercury Baptism\nDeals True Damage based on the damage recorded by Realm of Mercury to all enemies within it once and clears the record">Mercury Baptism inflicts an Infiltration Effect of the same type as the highest recorded damage. If the highest recorded damage type is Fire, it inflicts Fire Infiltration\nAdditionally increases Fire Damage taken by 13%. Reduces Skill Area by 8%">Fire Infiltration. If the highest recorded damage type is Lightning, it inflicts Lightning Infiltration\nAdditionally increases Lightning Damage taken by 13%. Reduces Attack Speed by 5%">Lightning Infiltration. If the highest recorded damage type is Cold, it inflicts Cold Infiltration\nAdditionally increases Cold Damage taken by 13%. Reduces Movement Speed by 5%">Cold Infiltration',
  },
  {
    hero: "Lightbringer Rosa: Unsullied Blade (#2)",
    name: "Boundless Sanctuary",
    level: 60,
    affix:
      'For every (150/130/110/100/90) Max Mana you have, +10% Area for Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury, up to (+60/+70/+80/+90/+100)%\nFor Enemy Count\nEach Normal or Magic monster counts as 1 monster\nEach Rare monster counts as 2 monsters\nEach Boss counts as 5 monsters">every enemy inside Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury, (+6/+7/+8/+9/+10)% additional Elemental Damage, up to (+60/+70/+80/+90/+100)% additional damage\nGains (3/3/4/4/4) Mercury Pts upon defeating an enemy within Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury',
  },
  {
    hero: "Lightbringer Rosa: Unsullied Blade (#2)",
    name: "Cleanse Filth",
    level: 60,
    affix:
      'While Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury is in effect, 25% of damage is taken from Mana before Life\nFor every 1000 Max Mana you have, (+2/2.5/+3/3.5/+4)% additional Elemental Damage, up to (+40/+50/+60/+70/+80)%',
  },
  {
    hero: "Lightbringer Rosa: Unsullied Blade (#2)",
    name: "Born to Cleanse",
    level: 75,
    affix:
      '- 30% additional Mana restoration for Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury\nMystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury gains an additional effect: +25% additional Elemental Damage\nMystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury still exists when it becomes Realm of Mercury\nFor every 10% Unsealed Max Mana you have, +2% additional Attack Speed and +2% additional Elemental Damage\nRestores 16% of Unsealed Max Mana when using a non-Channeled Attack Skill. This effect does not apply to Burst.">Realm of Mercury and retains 40% effect\nWhile Mystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury is active, (+20/+27/+34/+41/+48)% additional damage for Weapons',
  },
  {
    hero: "Lightbringer Rosa: Unsullied Blade (#2)",
    name: "Utmost Devotion",
    level: 75,
    affix:
      'Mana can be consumed via methods other than Mystic Mercury\nAttempts to consume 10% of Unsealed Max Mana when using a non-Channeled Attack Skill. If the Mana is consumed successfully, grants 10 Mercury Pts. When there is insufficient Mana, consumes 1% of Unsealed Max Mana and grants 5 Mercury. This effect does not apply to Burst.">Mystic Mercury. Gains 10% Mercury Pts for every (3000/2900/2800/2700/2600) Mana consumed\nThe cost is fixed at 0 when Mana is lower than 10%\nFor every 1000 Max Mana you have, +10% Max Mercury Pts, up to (+200/+250/+300/+350/+400)%\n(0.08/0.08/0.1/0.1/0.1)% additional Elemental Damage for every Mercury Pt you have',
  },
  {
    hero: "Tide Whisper Selena: Sing with the Tide",
    name: "Sing with the Tide",
    level: 1,
    affix:
      'Click the Trait Slot to switch between Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard and Loud Song\nIn the Loud Song state, -20% additional Attack and Cast Speed, -20% additional Movement Speed, and +50% additional Tide Effect">Loud Song\nIn the Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard state, it is possible to move while casting Spell Channeled Skills, and -20% additional Channeled Skill Damage\nIn the Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard state, the Main Skill is auto channeled while moving\nIn the Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard state, all non-Instant Skill\nSkills that don\'t have an attacking or casting action">instant and non-Mobility Skills will channel Bard Song\nBase channeling Interval: 0.8s.\nWhen the corresponding skill is a Spell Skill, it is affected by Cast Speed bonuses and additional bonuses.\nWhen the corresponding skill is an Attack Skill, it is affected by Weapon Attack Speed, Attack Speed bonuses, and additional bonuses.\nMax channeled stacks: 4. Loses all channeled stacks after reaching max stacks and casts a bubble. This bubble bursts upon making contact with an enemy, using the corresponding skill once at the location">Bard Song instead. Bard Song\nBase channeling Interval: 0.8s.\nWhen the corresponding skill is a Spell Skill, it is affected by Cast Speed bonuses and additional bonuses.\nWhen the corresponding skill is an Attack Skill, it is affected by Weapon Attack Speed, Attack Speed bonuses, and additional bonuses.\nMax channeled stacks: 4. Loses all channeled stacks after reaching max stacks and casts a bubble. This bubble bursts upon making contact with an enemy, using the corresponding skill once at the location">Bard Song loses all channeled stacks after reaching max stacks and casts a bubble. This bubble bursts upon making contact with an enemy or reaching the maximum distance, using the corresponding skill once at the location.\nThe bubble leaves a Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide where it bursts and at the feet of enemies it collides with, lasting for 6 s\nIn the Loud Song\nIn the Loud Song state, -20% additional Attack and Cast Speed, -20% additional Movement Speed, and +50% additional Tide Effect">Loud Song state, -20% additional Attack and Cast Speed, -20% additional Movement Speed, and +50% additional Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Effect\nWhen contacting a Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide, gains the following Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Effect: Ignore physical collisions with enemies and +15% additional damage for 4 s',
  },
  {
    hero: "Tide Whisper Selena: Sing with the Tide",
    name: "Undersea Ballad",
    level: 45,
    affix:
      'Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide\'s area is no longer affected by Skill Area\n100% of the increase/decrease on Skill Area is also applied to Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Effect, up to (+90/+100/+110/+120/+130)%',
  },
  {
    hero: "Tide Whisper Selena: Sing with the Tide",
    name: "Wave Aria",
    level: 45,
    affix:
      'Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide grants an additional effect: (+10/+13/+16/+19/+22)% additional damage against enemies on the Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide\nIn the Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard state, the bubble no longer leaves a Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide; instead, you will leave a Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide along your path and at the feet of enemies you collide with. Lasts for 4 s',
  },
  {
    hero: "Tide Whisper Selena: Sing with the Tide",
    name: "Idyll of the Tide",
    level: 60,
    affix:
      'Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide grants the following additional effects: For every 1 m moved in the Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide, (+1/1.3/1.6/1.9/2.2)% additional damage while in the Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide. Stacks up to 15 time(s) and lasts until Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide is completely lost\nAfter losing all Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tides, automatically switch to Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard',
  },
  {
    hero: "Tide Whisper Selena: Sing with the Tide",
    name: "Sea Foam Nocturne",
    level: 60,
    affix:
      'For every +1 max or min Channeled Stacks, (+12/+14/+16/+18/+20)% bubble flying speed and (+16/+18/+20/+22/+24)% additional Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Effect. Stacks up to 5 time(s)\nMin Channeled Stacks takes effect twice on Bard Song\nBase channeling Interval: 0.8s.\nWhen the corresponding skill is a Spell Skill, it is affected by Cast Speed bonuses and additional bonuses.\nWhen the corresponding skill is an Attack Skill, it is affected by Weapon Attack Speed, Attack Speed bonuses, and additional bonuses.\nMax channeled stacks: 4. Loses all channeled stacks after reaching max stacks and casts a bubble. This bubble bursts upon making contact with an enemy, using the corresponding skill once at the location">Bard Song',
  },
  {
    hero: "Tide Whisper Selena: Sing with the Tide",
    name: "Chantey of Sinking",
    level: 75,
    affix:
      'For every 1 s in the Loud Song\nIn the Loud Song state, -20% additional Attack and Cast Speed, -20% additional Movement Speed, and +50% additional Tide Effect">Loud Song state, (+25/+35/+45/+55/+65)% Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Area and (+25/+35/+45/+55/+65)% Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Effect. Stacks up to 2 time(s) and lasts until all Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tides are lost or you exit the Loud Song\nIn the Loud Song state, -20% additional Attack and Cast Speed, -20% additional Movement Speed, and +50% additional Tide Effect">Loud Song state',
  },
  {
    hero: "Tide Whisper Selena: Sing with the Tide",
    name: "Murmurs of the Distant Tide",
    level: 75,
    affix:
      'In the Bard\nIn the Bard state, Attack Channeled Skills and Attack Mobility Skills cannot be used\nIn the Bard state, it is possible to move while casting Spell Channeled Skills\nIn the Bard state, the Main Skill is auto channeled while moving\nIn the Bard state, all non-instant and non-Mobility Skills will channel Bard Song instead">Bard state, (-50/-50/-50/-50/-40)% Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Duration and (+60/+70/+80/+90/+100)% additional Tide\nWhile on the Tide, ignore physical collisions with enemies and +15% additional damage\nUp to 3 Tide(s) can be placed at the same time\n50% of the increase/decrease on Skill Area is also applied to Tide Area\n100% of the Skill Effect Duration bonus is also applied to the Tide Duration bonus">Tide Effect',
  },
  {
    hero: "Oracle Thea: Incarnation of The Gods (#1)",
    name: "Incarnation of the Gods",
    level: 1,
    affix:
      'Gain a Divine Blessing every 2s in the following order: Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing - Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing - Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing\nClick the Trait Skill to use Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm on the closest enemy for 8 s. Cooldown: 8 s\nDeals +7% additional damage to Full Life\nWhen current Life is above 95% of Max Life">Full-Life enemies for every stack of Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing. Stacks up to 20 times.\n+7% additional damage against enemies at Low Life\nWhen current Life is under 35% of Max Life">Low-Life for every stack of Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing. Stacks up to 20 times.\nConverts all Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing to Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing when outside the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm\nConverts all Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing to Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing when within the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm',
  },
  {
    hero: "Oracle Thea: Incarnation of The Gods (#1)",
    name: "Divinity",
    level: 45,
    affix:
      '(+10/+12/+14/+16/+19)% additional damage (multiplies) each time a Blessing reaches its max stacks\nThe increase/decrease of max Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing stacks is also applied to Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing when you\'re outside of the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm.\nThe increase/decrease of max Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing stacks is also applied to Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing when you\'re within the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm.\nGains a Skill Slot, in which a Support Skill or Activation Medium Support Skill can be installed to support Trait Skill Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm',
  },
  {
    hero: "Oracle Thea: Incarnation of The Gods (#1)",
    name: "Divine Realm Power",
    level: 60,
    affix:
      '(+20/+26/+32/+38/+45)% additional damage to enemies in the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm\n+1% Movement Speed for 30 s upon defeating an enemy in the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm. Stacks up to 20 time(s)\nWhen there are no enemies in the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm, refreshes the cooldown of Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm',
  },
  {
    hero: "Oracle Thea: Incarnation of The Gods (#1)",
    name: "Might Flow",
    level: 60,
    affix:
      '0.75% additional Attack and Cast Speed for every stack of any Blessing owned when outside the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm, up to an additional +15%\n(0.5/0.8/1.1/1.4/1.7)% additional damage for every stack of any Blessing owned when outside the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm, up to an additional (+10/+16/+22/+28/+34)%\n(-1/-1.2/-1.4/-1.6/-1.8)% additional damage taken for every stack of any blessing owned while within area of Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm, up to (-20/-24/-28/-32/-38)%',
  },
  {
    hero: "Oracle Thea: Incarnation of The Gods (#1)",
    name: "Divine Spirit",
    level: 75,
    affix:
      '-70% Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm skill radius\n(1.7/1.5/1.3/1.1/0.8)% additional damage taken for every 4% of Missing Life when outside the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm\nWhen dealing damage outside the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm, enemies with a higher percentage of Life than you will be considered Full Life\nWhen current Life is above 95% of Max Life">Full-Life enemies',
  },
  {
    hero: "Oracle Thea: Incarnation of The Gods (#1)",
    name: "Incarnation",
    level: 75,
    affix:
      'The Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm will follow you\nFor (1/1/2/2/2) s after inflicting damage to an enemy for the first time, this enemy is deemed to be at Low Life\nWhen current Life is under 35% of Max Life">Low Life\nWhen casting a Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm, for every 1 stack(s) of Blessings, (+1/1.25/1.5/1.75/+2)% additional damage dealt inside the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm until the Divine Realm\nConverts all Tenacity Blessings to Agility Blessings and deals additional damage to Full Life enemies when outside the Divine Realm\nConverts all Agility Blessings to Tenacity Blessings and deals additional damage to Low Life enemies when within the Divine Realm">Divine Realm ends',
  },
  {
    hero: "Oracle Thea: Wisdom of The Gods (#2)",
    name: "Wisdom of The Gods",
    level: 1,
    affix:
      'Gain a Divine Blessing every 2s in the following order: Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing - Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing - Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing\nClick the Trait Skill to cast Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon\nDivine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon: Consumes all Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessings to grant self Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon. Cooldown: 15 s\n+6% additional damage for each stack of Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing that Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon consumes. Lasts for 10 s. Stacks up to 8 time(s)',
  },
  {
    hero: "Oracle Thea: Wisdom of The Gods (#2)",
    name: "Finale Prophecy",
    level: 45,
    affix:
      '0.8 to the radius of Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon for each stack of blessing consumed by Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon\nFor Enemy Count\nEach Normal or Magic monster counts as 1 monster\nEach Rare monster counts as 2 monsters\nEach Boss counts as 5 monsters">each enemy within range of Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon, (+3/3.7/4.4/5.1/+6)% additional damage after granting Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon. Lasts for 10 s. Stacks up to 10 time(s)',
  },
  {
    hero: "Oracle Thea: Wisdom of The Gods (#2)",
    name: "Predicted Harvest",
    level: 45,
    affix:
      'Automatically try to use Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon when Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing is at max stacks\n(30/35/40/45/50)% chance to gain an additional stack of Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing when Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Tenacity Blessing, Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Agility Blessing or Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing is gained',
  },
  {
    hero: "Oracle Thea: Wisdom of The Gods (#2)",
    name: "Predicted Hope",
    level: 60,
    affix:
      'Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon will now consume all Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing and Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing stacks\n(+2/2.3/2.6/2.9/3.2)% additional All Damage for each stack of Blessing that Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon consumes. Lasts for 10 s. Stacks up to 20 time(s)',
  },
  {
    hero: "Oracle Thea: Wisdom of The Gods (#2)",
    name: "Predicted Reincarnation",
    level: 60,
    affix:
      '(+3/+4/+5/+6/+7)% additional Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon Cooldown Recovery Speed for every stack of Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing consumed by Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon\n(+20/+24/+28/+32/+36)% additional damage if Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon consumes max stacks of Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing. Lasts for 10 s',
  },
  {
    hero: "Oracle Thea: Wisdom of The Gods (#2)",
    name: "Farewell Prophecy",
    level: 75,
    affix:
      '(+4/4.5/+5/5.5/+6)% Double Damage Chance for each stack of Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing that Divine Punishment\nConsumes Tenacity Blessing, Agility Blessing, and Focus Blessing to send down Divine Punishment and gain Explosion for a short time.\nSkill Tags: Spell, Physical, Area">God\'s Boon consumes. Lasts for 10 s. Stacks up to 10 time(s)\nFor every 1% overflown Double Damage Chance, there is a 1% chance to deal Quadruple Damage instead',
  },
  {
    hero: "Oracle Thea: Wisdom of The Gods (#2)",
    name: "Predicted Justice",
    level: 75,
    affix:
      'The biggest max stack bonus of Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing or Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing is also applied to the max stack bonus of Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing\n(-25/-22.5/-20/-17.5/-15)% additional Cooldown Recovery Speed',
  },
  {
    hero: "Oracle Thea: Blasphemer (#3)",
    name: "Blasphemer",
    level: 1,
    affix:
      'Gain a Divine Blessing every 2s in the following order: Focus Blessing\nEvery stack of Focus Blessing grants +5% additional damage. Initial max stacks: 4">Focus Blessing - Agility Blessing\nEvery stack of Agility Blessing grants +4% Attack and Cast Speed and +2% additional damage. Initial max stacks: 4">Agility Blessing - Tenacity Blessing\nEvery stack of Tenacity Blessing grants an additional 4% damage reduction (multiplies). Initial max stacks: 4.">Tenacity Blessing\nClick the Trait Skill to inflict Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration on the enemy with the highest rarity within 15m. Cooldown: 5s. Inflicts one-third of the max stacks each time (rounded up)\nConverts the effects of affixes that increase Max Blessing\nIncludes Focus Blessing, Tenacity Blessing, and Agility Blessing">Blessings Stacks into effects that reduce Max Blessing\nIncludes Focus Blessing, Tenacity Blessing, and Agility Blessing">Blessings Stacks and increase Max Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration Stacks. Increases Max Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration Stacks by up to 4 for each type of Blessing\nIncludes Focus Blessing, Tenacity Blessing, and Agility Blessing">Blessings\nTriggers the Trait Skill and ignores its cooldown when gaining any Blessing\nIncludes Focus Blessing, Tenacity Blessing, and Agility Blessing">Blessing. Interval: 0.3s',
  },
  {
    hero: "Oracle Thea: Blasphemer (#3)",
    name: "Unholy Baptism",
    level: 45,
    affix:
      '(+5/+10/+15/+20/+25)% additional Erosion Damage\nEnemies within 6m of a Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecrated target have a (10/20/20/30/30)% chance to explode when defeated, dealing True Damage equal to 125% of their Max Life to enemies within a (3/4/4/5/5) m radius',
  },
  {
    hero: "Oracle Thea: Blasphemer (#3)",
    name: "Disgraced Minister",
    level: 60,
    affix:
      'Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration only affects Elite\nElite monsters include rare monsters and bosses">Elites\nWhen there are no other enemies within 6m of the Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecrated target, the target gains Sacrificial Pawn\n-10% additional damage dealt and +10% additional Erosion Damage taken. This is considered a Crowd Control Effect">Sacrificial Pawn\n(+10/+15/+20/+25/+30)% Erosion Resistance\n(+3/+4/+4/+5/+5)% Max Resistance\nBy default, the Max Resistance is 60%. This limit can be increased.">Max Erosion Resistance',
  },
  {
    hero: "Oracle Thea: Blasphemer (#3)",
    name: "Tarnished Sage",
    level: 60,
    affix:
      'Up to 2 Elite\nElite monsters include rare monsters and bosses">Elites within 6m of a Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecrated target will also be inflicted with Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration\nInstantly restores (5/6/7/8/9)% of Max Life, Energy Shield, and Mana when defeating a Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecrated target.\n+ (20/30/40/50/60)% Attack and Cast Speed when dealing damage to a Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecrated target. Lasts for 5s. This effect cannot stack',
  },
  {
    hero: "Oracle Thea: Blasphemer (#3)",
    name: "Extreme Desecration",
    level: 75,
    affix:
      'If the Max Blessing\nIncludes Focus Blessing, Tenacity Blessing, and Agility Blessing">Blessings Stacks are further increased when the max stacks of all Blessing\nIncludes Focus Blessing, Tenacity Blessing, and Agility Blessing">Blessings are 0, converts the effects of their affixes into effects that increase Max Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration Stacks. Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration stacks up to 25 times\nDesecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration gains an additional base effect: (0.2/0.25/0.3/0.35/0.4)% additional Erosion Damage taken for every 5% of Life the target loses',
  },
  {
    hero: "Oracle Thea: Blasphemer (#3)",
    name: "Onset of Depravity",
    level: 75,
    affix:
      'When inflicting Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration on an Elite\nElite monsters include rare monsters and bosses">Elite for the first time, deals True Damage equal to (3/6/9/12/15)% of their Max Life. (30/40/50/60/70)% of the max Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecration stacks is also applied to this value to deal True Damage equal to up to 25% of their Max Life\nWhen a Desecration\n+15% additional Erosion Damage taken (multiplies) for each stack of Desecration. Initial max stacks: 3. Lasts for 5s. Can only affect 1 target">Desecrated target is under a Crowd Control Effects\nFrostbite, Freeze, Paralysis, Knockback, Weaken, Slow, Taunt, and Blinding">crowd control effect, the target gains Mountain of Sins\nReduces Erosion Resistance by 10%">Mountain of Sins',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Illusion (#1)",
    name: "Spacetime Illusion",
    level: 1,
    affix:
      'Own Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion\nThe Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion uses your Main Skill once every 1.5 s. The Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion\'s castings are considered your castings\nWhile having Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion, click the Trait Skill to recall Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Illusion (#1)",
    name: "Me and Myself",
    level: 45,
    affix:
      '+60% Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion Cast Frequency\nFor every +5% Cooldown Recovery Speed or 2.5% additional Cooldown Recovery Speed, (+5/+7/+9/+11/+13)% Spacetime Illusion Cast Frequency',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Illusion (#1)",
    name: "Eeeendless Mana",
    level: 60,
    affix:
      'Seals 25% Max Mana. Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion no longer has Cast Frequency limitations\n(+1/1.15/1.3/1.45/1.6)% additional Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion Damage for every +4% Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion Cast Frequency',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Illusion (#1)",
    name: "Make it Quick",
    level: 60,
    affix:
      'Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion no longer has casting actions and is only limited by cast frequency.\n对于施法速度加成的 (50/55/60/65/70)% 同样作用于Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">时空幻象的额外伤害',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Illusion (#1)",
    name: "I'm an Illusion",
    level: 75,
    affix:
      'Unable to cast the Main Skill\n+1 Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion upper limit\n(-5/-1/+3/+7/+11)% additional Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion Damage\n-30% Movement Speed',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Illusion (#1)",
    name: "I'm Out of Mana",
    level: 75,
    affix:
      'Casting of Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion will consume your Mana, equal to the Mana Cost of your Main Skill\n(+5/6.3/7.5/8.8/+10)% additional damage for you and Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion for each time Spacetime Illusion\nSpacetime Illusion can only use Spell Skills and cannot use any Channeled and Summon Skills.\nOnly 1 Spacetime Illusion may exist at a time. After reaching the summoning limit, click on the Trait Slot to call back the Spacetime Illusion">Spacetime Illusion consumed Mana recently. Stacks up to 10 time(s)',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Elapse (#2)",
    name: "Spacetime Elapse",
    level: 1,
    affix:
      'Clicking the Trait Skill or dealing Damage Over Time to an enemy casts Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime. Interval: 2 s. Lasts for 6 s\nWhile Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime is active, cast Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime again to move it and extend its Duration by 2\nRecords 30% of Damage Over Time, Reaping Damage, and Reap Purification Damage dealt to enemies while Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime is active\nAfter moving, Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime inflicts Spacetime Turbulence\nDeals True Damage equal to the shared damage every second for 2s">Turbulence on enemies within, having them share the damage it records equally and clearing the records',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Elapse (#2)",
    name: "Spacetime Speed-up",
    level: 45,
    affix:
      'Reduces the casting interval of Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime by 1 s on defeat\nFor every 1 s Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime lasts, (+5/6.5/+8/9.5/+11)% to all recorded damage for Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime. Stacks up to 5 time(s)',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Elapse (#2)",
    name: "Spacetime Upheaval",
    level: 45,
    affix:
      '(+30/+37/+44/+51/+58)% additional Damage Over Time while Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime lasts\nTwisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime only inflicts Spacetime Turbulence\nDeals True Damage equal to the shared damage every second for 2s">Spacetime Turbulence on Elite\nElite monsters include rare monsters and bosses">Elites within its area. Records are not cleared when there are no Elite\nElite monsters include rare monsters and bosses">Elites within its area',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Elapse (#2)",
    name: "Spacetime Cutting",
    level: 60,
    affix:
      'Gains a stack of Torment\nEach stack of Torment additionally increases Damage Over Time dealt by 5% for 4s. Stacks up to 3 times">Torment when dealing Damage Over Time\n(-10/-14/-18/-21/-24)% additional damage taken while Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime lasts',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Elapse (#2)",
    name: "Spacetime Expansion",
    level: 75,
    affix:
      '(+50/+62/+74/+86/+98)% additional Duration for Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime and Spacetime Turbulence\nDeals True Damage equal to the shared damage every second for 2s">Spacetime Turbulence\nEnemies with Spacetime Turbulence\nDeals True Damage equal to the shared damage every second for 2s">Spacetime Turbulence are deemed as being within Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime',
  },
  {
    hero: "Spacetime Witness Youga: Spacetime Elapse (#2)",
    name: "Spacetime Pause",
    level: 75,
    affix:
      '(-40/-43/-46/-49/-50)% additional Spacetime Turbulence\nDeals True Damage equal to the shared damage every second for 2s">Spacetime Turbulence Duration\n(+60/+70/+80/+90/+100)% to all recorded damage for Twisted Spacetime\nRecords the Damage Over Time you deal to enemies while Twisted Spacetime is active\nAfter moving the Twisted Spacetime, enemies within its area will be inflicted with Spacetime Turbulence that deals True Damage">Twisted Spacetime',
  },
] as const satisfies readonly BaseHeroTrait[];
