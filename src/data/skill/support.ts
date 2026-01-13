import type { BaseSupportSkill } from "./types";

export const SupportSkills = [
  {
    type: "Support",
    name: "Added Cold Damage",
    tags: ["Cold"],
    description: [
      "Supports skills that hit enemies.\nAdds 2 - 3 Cold Damage to the supported skill",
      "Adds 2 - 3 Cold Damage to the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "Adds {value} - 3 Cold Damage to the supported skill",
        levelValues: [
          2, 2, 3, 4, 5, 6, 6, 7, 9, 10, 12, 14, 16, 20, 28, 40, 48, 56, 68, 83,
          84, 85, 86, 87, 88, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
          100, 101, 102,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Added Erosion Damage",
    tags: ["Erosion"],
    description: [
      "Supports skills that hit enemies.\nAdds 2 - 2 Erosion Damage to the supported skill",
      "Adds 2 - 2 Erosion Damage to the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "Adds {value} - 2 Erosion Damage to the supported skill",
        levelValues: [
          2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 20, 25, 35, 50, 60, 70, 85,
          104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115, 116, 117, 119,
          120, 121, 122, 123, 125, 126, 127,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Added Fire Damage",
    tags: ["Fire"],
    description: [
      "Supports skills that hit enemies.\nThe supported skill adds 1 - 3 Fire Damage",
      "The supported skill adds 1 - 3 Fire Damage",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "The supported skill adds {value} - 3 Fire Damage",
        levelValues: [
          1, 2, 3, 4, 4, 5, 6, 6, 8, 9, 11, 12, 14, 18, 25, 35, 42, 49, 60, 73,
          74, 74, 75, 76, 77, 77, 78, 79, 80, 81, 81, 82, 83, 84, 85, 86, 86,
          87, 88, 89,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Added Lightning Damage",
    tags: ["Lightning"],
    description: [
      "Supports skills that hit enemies.\nThe supported skill adds 1 - 4 Lightning Damage",
      "The supported skill adds 1 - 4 Lightning Damage",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "The supported skill adds {value} - 4 Lightning Damage",
        levelValues: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 5, 6, 7, 9, 10, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13,
          13,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Added Physical Damage",
    tags: ["Physical"],
    description: [
      "Supports skills that hit enemies.\nSupported skills add 2 - 3 physical damage",
      "Supported skills add 2 - 3 physical damage",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "Supported skills add {value} - 3 physical damage",
        levelValues: [
          2, 2, 3, 4, 5, 5, 6, 7, 8, 10, 11, 13, 15, 19, 26, 38, 45, 53, 64, 78,
          79, 80, 80, 81, 82, 83, 84, 85, 85, 86, 87, 88, 89, 90, 91, 92, 93,
          93, 94, 95,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Additional Ignite",
    tags: ["Fire"],
    description: [
      "Supports skills that hit enemies.\nThe supported skill inflicts 1 additional stack(s) of Ignite\nFor each stack of Ignite an enemy has, the supported skill deals 2.7% additional Ignite Damage to the enemy, up to 10.8% .\n+15% Ignite chance for the supported skill",
      "The supported skill inflicts 1 additional stack(s) of Ignite\nFor each stack of Ignite an enemy has, the supported skill deals 2.7% additional Ignite Damage to the enemy, up to 10.8% .\n+15% Ignite chance for the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "The supported skill inflicts 1 additional stack(s) of Ignite",
      "+15% Ignite chance for the supported skill",
    ],
    templates: [
      {
        template:
          "For each stack of Ignite an enemy has, the supported skill deals 2.7% additional Ignite Damage to the enemy, up to 10.8% .",
        levelValues: [
          27, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3,
          5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 67, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4,
          7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Ailment Termination",
    tags: [],
    description: [
      "Supports skills that hit enemies.\nThe supported skill deals 6.7% additional damage for every type of Ailment on enemy (multiplies)\nThe supported skill -30% Ailment Duration",
      "The supported skill deals 6.7% additional damage for every type of Ailment on enemy (multiplies)\nThe supported skill -30% Ailment Duration",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: ["The supported skill -30% Ailment Duration"],
    templates: [
      {
        template:
          "The supported skill deals {value}% additional damage for every type of Ailment on enemy (multiplies)",
        levelValues: [
          6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1,
          8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9, 9.1, 9.2, 9.3, 9.4, 9.5,
          9.6, 9.7, 9.8, 9.9, 10, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "All In",
    tags: ["Defensive"],
    description: [
      "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n29.5% additional Evasion. It drops to 0 gradually within 4s.",
      "When casting the supported skill, gains the buff:",
    ],
    supportTargets: [{ tags: ["Defensive"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}",
        levelValues: [
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+20% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n20.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+21% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n21.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+22% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n22.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+23% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n23.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+24% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n24.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+25% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n25.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+26% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n26.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+27% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n27.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+28% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n28.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+29% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n29.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+30% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n30.3% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n30.6% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n30.9% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n31.2% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n31.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n31.8% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n32.1% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n32.4% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n32.7% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n+33% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n33.3% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n33.6% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n33.9% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n34.2% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n34.5% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n34.8% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n35.1% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n35.4% additional Evasion. It drops to 0 gradually within 4s.",
          "Supports Defensive Skills.\nWhen casting the supported skill, gains the buff:\n35.7% additional Evasion. It drops to 0 gradually within 4s.",
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Assault Command",
    tags: ["Summon", "Synthetic Troop"],
    description: [
      "Supports skills that summon Synthetic Troops.\n15.5% additional damage for Minions summoned by the supported skill\n+56 Critical Strike Rating for Minions summoned by the supported skill when having at least 40 Command",
      "15.5% additional damage for Minions summoned by the supported skill\n+56 Critical Strike Rating for Minions summoned by the supported skill when having at least 40 Command",
    ],
    supportTargets: ["summon_synthetic_troops"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+56 Critical Strike Rating for Minions summoned by the supported skill when having at least 40 Command",
    ],
    templates: [
      {
        template:
          "{value}% additional damage for Minions summoned by the supported skill",
        levelValues: [
          15.5, 15.75, 16, 16.25, 16.5, 16.75, 17, 17.25, 17.5, 17.75, 18,
          18.25, 18.5, 18.75, 19, 19.25, 19.5, 19.75, 20, 20.25, 20.5, 20.75,
          21, 21.25, 21.5, 21.75, 22, 22.25, 22.5, 22.75, 23, 23.25, 23.5,
          23.75, 24, 24.25, 24.5, 24.75, 25, 25.25,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Attack Focus",
    tags: ["Attack"],
    description: [
      "Supports Attack Skills.\nGains 2 Fervor Rating when the supported skill hits an enemy\nThe supported skill 1.65% additional damage for every 10 Fervor Rating\nFor every 10 Fervor Rating, the supported skill +3% Critical Strike Rating",
      "Gains 2 Fervor Rating when the supported skill hits an enemy\nThe supported skill 1.65% additional damage for every 10 Fervor Rating\nFor every 10 Fervor Rating, the supported skill +3% Critical Strike Rating",
    ],
    supportTargets: [{ tags: ["Attack"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Gains 2 Fervor Rating when the supported skill hits an enemy",
      "For every 10 Fervor Rating, the supported skill +3% Critical Strike Rating",
    ],
    templates: [
      {
        template:
          "The supported skill {value}% additional damage for every 10 Fervor Rating",
        levelValues: [
          1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25,
          2.3, 2.35, 2.4, 2.45, 2.5, 2.55, 2.6, 2.65, 2.7, 2.75, 2.8, 2.85, 2.9,
          2.95, 3, 3.05, 3.1, 3.15, 3.2, 3.25, 3.3, 3.35, 3.4, 3.45, 3.5, 3.55,
          3.6,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Aura Amplification",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\n5.25% Aura effect for the supported skill\n+100% Skill Area for the supported skill",
      "5.25% Aura effect for the supported skill\n+100% Skill Area for the supported skill",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+100% Skill Area for the supported skill"],
    templates: [
      {
        template: "{value}% Aura effect for the supported skill",
        levelValues: [
          5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5,
          8.75, 9, 9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11, 11.25, 11.5,
          11.75, 12, 12.25, 12.5, 12.75, 13, 13.25, 13.5, 13.75, 14, 14.25,
          14.5, 14.75, 15,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Auto-Charge",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\nThe supported skill gains 0.5 Charging Progress every second.",
      "The supported skill gains 0.5 Charging Progress every second.",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "The supported skill gains {value} Charging Progress every second.",
        levelValues: [
          0.5, 0.525, 0.55, 0.575, 0.6, 0.625, 0.65, 0.675, 0.7, 0.725, 0.75,
          0.775, 0.8, 0.825, 0.85, 0.875, 0.9, 0.925, 0.95, 0.975, 1, 1.025,
          1.05, 1.075, 1.1, 1.125, 1.15, 1.175, 1.2, 1.225, 1.25, 1.275, 1.3,
          1.325, 1.35, 1.375, 1.4, 1.425, 1.45, 1.475,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Blind",
    tags: [],
    description: [
      "Supports skills that hit enemies.\n+10% chance to Blind the target when the supported skill hits\n+5% Blinding Duration caused by the supported skill",
      "+10% chance to Blind the target when the supported skill hits\n+5% Blinding Duration caused by the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+10% chance to Blind the target when the supported skill hits",
    ],
    templates: [
      {
        template: "+{value}% Blinding Duration caused by the supported skill",
        levelValues: [
          5, 6.75, 8.5, 10.25, 12, 13.75, 15.5, 17.25, 19, 20.75, 22.5, 24.25,
          26, 27.75, 29.5, 31.25, 33, 34.75, 36.5, 38.25, 40, 41.75, 43.5,
          45.25, 47, 48.75, 50.5, 52.25, 54, 55.75, 57.5, 59.25, 61, 62.75,
          64.5, 66.25, 68, 69.75, 71.5, 73.25,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Carpet Bombardment",
    tags: ["Barrage"],
    description: [
      "Supports Barrage Skills.\n9.3% additional damage for the supported skill\nThe supported skill 8.6% damage increase per wave\n-10% Wave Interval for the supported skill",
      "9.3% additional damage for the supported skill\nThe supported skill 8.6% damage increase per wave\n-10% Wave Interval for the supported skill",
    ],
    supportTargets: [{ tags: ["Barrage"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          9.3, 9.6, 9.9, 10.2, 10.5, 10.8, 11.1, 11.4, 11.7, 12, 12.3, 12.6,
          12.9, 13.2, 13.5, 13.8, 14.1, 14.4, 14.7, 15, 15, 15, 15, 15, 15, 15,
          15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        ],
      },
      {
        template: "The supported skill {value}% damage increase per wave",
        levelValues: [
          8.6, 9.2, 9.8, 10.4, 11, 11.6, 12.2, 12.8, 13.4, 14, 14.6, 15.2, 15.8,
          16.4, 17, 17.6, 18.2, 18.8, 19.4, 20, 20.6, 20.9, 21.2, 21.5, 21.8,
          22.1, 22.4, 22.7, 23, 23.3, 23.6, 23.9, 24.2, 24.5, 24.8, 25.1, 25.4,
          25.7, 26, 26.3,
        ],
      },
      {
        template: "{value}% Wave Interval for the supported skill",
        levelValues: [
          -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, -21, -22, -23,
          -24, -25, -26, -27, -28, -29, -30, -31, -32, -33, -34, -35, -36, -37,
          -38, -39, -40, -41, -42, -43, -44, -45, -46, -47, -48, -49,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Cataclysm",
    tags: ["Persistent"],
    description: [
      "Supports skills that deal Damage Over Time or inflict Ailments.\nWhen the supported skill deals Damage Over Time, it inflicts 8 Affliction on the enemy. Effect Cooldown: 1 s\nAffliction grants an additional 26.5% effect to the supported skill",
      "When the supported skill deals Damage Over Time, it inflicts 8 Affliction on the enemy. Effect Cooldown: 1 s\nAffliction grants an additional 26.5% effect to the supported skill",
    ],
    supportTargets: ["dot", "inflict_ailment"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "When the supported skill deals Damage Over Time, it inflicts 8 Affliction on the enemy. Effect Cooldown: 1 s",
    ],
    templates: [
      {
        template:
          "Affliction grants an additional {value}% effect to the supported skill",
        levelValues: [
          26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33,
          33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40,
          40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Channel Preparation",
    tags: ["Channeled"],
    description: [
      "Supports Channeled Skills.\n+4% additional damage for the supported skill\n+1 to the Min Channeled Stacks for the supported skill",
      "+4% additional damage for the supported skill\n+1 to the Min Channeled Stacks for the supported skill",
    ],
    supportTargets: [{ tags: ["Channeled"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "+{value}% additional damage for the supported skill",
        levelValues: [
          4, 4.4, 4.8, 5.2, 5.6, 6, 6.4, 6.8, 7.2, 7.6, 8, 8.4, 8.8, 9.2, 9.6,
          10, 10.4, 10.8, 11.2, 11.6, 12, 12.4, 12.8, 13.2, 13.6, 14, 14.4,
          14.8, 15.2, 15.6, 16, 16.4, 16.8, 17.2, 17.6, 18, 18.4, 18.8, 19.2,
          19.6,
        ],
      },
      {
        template:
          "+{value} to the Min Channeled Stacks for the supported skill",
        levelValues: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Charge",
    tags: ["Mobility"],
    description: [
      "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +118% Warcry Cast Speed for the next Warcry",
      "When casting the supported skill, gains a buff",
    ],
    supportTargets: [{ tags: ["Mobility"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}",
        levelValues: [
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +80% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +82% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +84% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +86% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +88% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +90% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +92% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +94% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +96% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +98% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +100% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +102% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +104% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +106% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +108% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +110% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +112% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +114% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +116% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +118% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +120% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +122% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +124% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +126% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +128% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +130% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +132% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +134% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +136% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +138% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +140% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +142% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +144% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +146% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +148% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +150% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +152% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +154% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +156% Warcry Cast Speed for the next Warcry",
          "Support Mobility Skills.\nWhen casting the supported skill, gains a buff\nBuffs grant +158% Warcry Cast Speed for the next Warcry",
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Concentration Warcry",
    tags: ["Warcry"],
    description: [
      "Supports Warcry Skills.\n-15% Skill Area for the supported skill\n+10% Cooldown Recovery Speed for the supported skill",
      "-15% Skill Area for the supported skill\n+10% Cooldown Recovery Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Warcry"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-15% Skill Area for the supported skill"],
    templates: [
      {
        template: "+{value}% Cooldown Recovery Speed for the supported skill",
        levelValues: [
          10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
          17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5,
          24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Control Spell",
    tags: ["Spell"],
    description: [
      "Supports Spell Skills.\n-100% Critical Strike Rating for the supported skill\n+28% additional damage for the supported skill",
      "-100% Critical Strike Rating for the supported skill\n+28% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Spell"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-100% Critical Strike Rating for the supported skill"],
    templates: [
      {
        template: "+{value}% additional damage for the supported skill",
        levelValues: [
          28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5,
          35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5,
          42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Cooldown Reduction",
    tags: [],
    description: [
      "Supports any skill.\n+13% Cooldown Recovery Speed for the supported skill",
      "+13% Cooldown Recovery Speed for the supported skill",
    ],
    supportTargets: ["any"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "+{value}% Cooldown Recovery Speed for the supported skill",
        levelValues: [
          13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
          20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5,
          27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Cost Conversion",
    tags: [],
    description: [
      "Supports Active Skills.\nReplace Mana Cost from the supported skill with Life cost",
      "Replace Mana Cost from the supported skill with Life cost",
    ],
    supportTargets: [{ skillType: "active" }],
    cannotSupportTargets: [],
    fixedAffixes: ["Replace Mana Cost from the supported skill with Life cost"],
  },
  {
    type: "Support",
    name: "Critical Charge",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\nThe supported skill gains 10 Charging Progress when suffering a Severe Injury. Interval: 4s",
      "The supported skill gains 10 Charging Progress when suffering a Severe Injury. Interval: 4s",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "The supported skill gains {value} Charging Progress when suffering a Severe Injury. Interval: 4s",
        levelValues: [
          10, 10.3, 10.6, 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.7, 13, 13.3,
          13.6, 13.9, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 16, 16.2, 16.4, 16.6,
          16.8, 17, 17.2, 17.4, 17.6, 17.8, 18, 18.2, 18.4, 18.6, 18.8, 19,
          19.2, 19.4, 19.6, 19.8,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Critical Strike Damage Increase",
    tags: [],
    description: [
      "Supports skills that hit enemies.\n+26% additional damage for the supported skill when it lands a Critical Strike",
      "+26% additional damage for the supported skill when it lands a Critical Strike",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "+{value}% additional damage for the supported skill when it lands a Critical Strike",
        levelValues: [
          26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5,
          33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
          40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Critical Strike Rating Increase",
    tags: [],
    description: [
      "Supports skills that hit enemies.\n+135% Critical Strike Rating for the supported skill",
      "+135% Critical Strike Rating for the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "+{value}% Critical Strike Rating for the supported skill",
        levelValues: [
          135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200,
          205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270,
          275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 330,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Deep Wounds",
    tags: ["Physical"],
    description: [
      "Supports skills that hit enemies.\n+7% additional Trauma Damage for the supported skill\n+15% chance for the supported skill to inflict Trauma",
      "+7% additional Trauma Damage for the supported skill\n+15% chance for the supported skill to inflict Trauma",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: ["+15% chance for the supported skill to inflict Trauma"],
    templates: [
      {
        template: "+{value}% additional Trauma Damage for the supported skill",
        levelValues: [
          7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14,
          14.5, 15, 15.5, 16, 16.5, 17, 17.3, 17.6, 17.9, 18.2, 18.5, 18.8,
          19.1, 19.4, 19.7, 20, 20.3, 20.6, 20.9, 21.2, 21.5, 21.8, 22.1, 22.4,
          22.7,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Defense Form",
    tags: ["Summon", "Synthetic Troop"],
    description: [
      "Supports skills that summon Synthetic Troops.\n+10% additional Life for Minions summoned by the supported skill\n-5% additional damage taken for Minions summoned by the supported skill\n+10% chance to Weaken the enemy for every 20 Command when hit by a Minion summoned by the supported skill",
      "+10% additional Life for Minions summoned by the supported skill\n-5% additional damage taken for Minions summoned by the supported skill\n+10% chance to Weaken the enemy for every 20 Command when hit by a Minion summoned by the supported skill",
    ],
    supportTargets: ["summon_synthetic_troops"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+10% chance to Weaken the enemy for every 20 Command when hit by a Minion summoned by the supported skill",
    ],
    templates: [
      {
        template:
          "+{value}% additional Life for Minions summoned by the supported skill",
        levelValues: [
          10, 10.25, 10.5, 10.75, 11, 11.25, 11.5, 11.75, 12, 12.25, 12.5,
          12.75, 13, 13.25, 13.5, 13.75, 14, 14.25, 14.5, 14.75, 15, 15.25,
          15.5, 15.75, 16, 16.25, 16.5, 16.75, 17, 17.25, 17.5, 17.75, 18,
          18.25, 18.5, 18.75, 19, 19.25, 19.5, 19.75,
        ],
      },
      {
        template:
          "{value}% additional damage taken for Minions summoned by the supported skill",
        levelValues: [
          -5, -5.5, -6, -6.5, -7, -7.5, -8, -8.5, -9, -9.5, -10, -10.5, -11,
          -11.5, -12, -12.5, -13, -13.5, -14, -14.5, -15, -15.5, -16, -16.5,
          -17, -17.5, -18, -18.5, -19, -19.5, -20, -20.5, -21, -21.5, -22,
          -22.5, -23, -23.5, -24, -24.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Defense Layers",
    tags: ["Defensive"],
    description: [
      "Supports Defensive Skills.\nWhen casting the supported skill, Energy Shield cannot be interrupted by damage for 1 s\n3.25% Energy Shield Charge Speed while the supported skill lasts",
      "When casting the supported skill, Energy Shield cannot be interrupted by damage for 1 s\n3.25% Energy Shield Charge Speed while the supported skill lasts",
    ],
    supportTargets: [{ tags: ["Defensive"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "When casting the supported skill, Energy Shield cannot be interrupted by damage for 1 s",
    ],
    templates: [
      {
        template:
          "{value}% Energy Shield Charge Speed while the supported skill lasts",
        levelValues: [
          3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5,
          6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.4, 8.55, 8.7, 8.85, 9, 9.15, 9.3,
          9.45, 9.6, 9.75, 9.9, 10.05, 10.2, 10.35, 10.5, 10.65, 10.8, 10.95,
          11.1,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Electric Overload",
    tags: ["Lightning"],
    description: [
      "Supports skills that deal damage.\n10.25% additional Lightning Damage for the supported skill\nThe supported skill gains a buff on Critical Strike. The buff lasts 2 s.\nBuffs grant +15% additional Lightning Damage to this skill",
      "10.25% additional Lightning Damage for the supported skill\nThe supported skill gains a buff on Critical Strike. The buff lasts 2 s.",
    ],
    supportTargets: ["deal_damage"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "The supported skill gains a buff on Critical Strike. The buff lasts 2 s.",
    ],
    templates: [
      {
        template:
          "{value}% additional Lightning Damage for the supported skill",
        levelValues: [
          10.25, 10.5, 10.75, 11, 11.25, 11.5, 11.75, 12, 12.25, 12.5, 12.75,
          13, 13.25, 13.5, 13.75, 14, 14.25, 14.5, 14.75, 15, 15.25, 15.5,
          15.75, 16, 16.25, 16.5, 16.75, 17, 17.25, 17.5, 17.75, 18, 18.25,
          18.5, 18.75, 19, 19.25, 19.5, 19.75, 20,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Electric Punishment",
    tags: ["Lightning"],
    description: [
      "Supports skills that hit enemies.\nThe supported skill deals 10.5% additional damage to Numbed enemies. For every stack of Numbed the enemy has, the supported skill deals +1% additional damage",
      "The supported skill deals 10.5% additional damage to Numbed enemies. For every stack of Numbed the enemy has, the supported skill deals +1% additional damage",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "The supported skill deals {value}% additional damage to Numbed enemies. For every stack of Numbed the enemy has, the supported skill deals +1% additional damage",
        levelValues: [
          10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
          17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
          24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Elemental Duo",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports skills that summon Spirit Magus.\n+1 to Max Summonable Minions for the supported skill\n15.5% additional damage for Minions summoned by the supported skill",
      "+1 to Max Summonable Minions for the supported skill\n15.5% additional damage for Minions summoned by the supported skill",
    ],
    supportTargets: ["summon_spirit_magus"],
    cannotSupportTargets: [],
    fixedAffixes: ["+1 to Max Summonable Minions for the supported skill"],
    templates: [
      {
        template:
          "{value}% additional damage for Minions summoned by the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Elemental Fusion",
    tags: ["Fire", "Lightning", "Cold"],
    description: [
      "Supports skills that deal damage.\nThe supported skill cannot inflict Ignite, Frostbite or Numbed\n25.5% additional Elemental Damage for the supported skill",
      "The supported skill cannot inflict Ignite, Frostbite or Numbed\n25.5% additional Elemental Damage for the supported skill",
    ],
    supportTargets: ["deal_damage"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "The supported skill cannot inflict Ignite, Frostbite or Numbed",
    ],
    templates: [
      {
        template:
          "{value}% additional Elemental Damage for the supported skill",
        levelValues: [
          25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32,
          32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39,
          39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Elemental Impact",
    tags: ["Attack"],
    description: [
      "Supports Attack Skills.\nIf a hit of the supported skill deal at least 2 types of Elemental Damage, the next use of the supported skill deals 17.5% additional Elemental Damage",
      "If a hit of the supported skill deal at least 2 types of Elemental Damage, the next use of the supported skill deals 17.5% additional Elemental Damage",
    ],
    supportTargets: [{ tags: ["Attack"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "If a hit of the supported skill deal at least 2 types of Elemental Damage, the next use of the supported skill deals {value}% additional Elemental Damage",
        levelValues: [
          17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
          24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31,
          31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Emergency Avoidance",
    tags: ["Mobility"],
    description: [
      "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.5% Evasion per stack of buffs\nThe buff lasts 4s, stacking up to 4 times.",
      "Gains 1 stack of buff when you use the supported skill.\nThe buff lasts 4 s, stacking up to 4 times",
    ],
    supportTargets: [{ tags: ["Mobility"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}",
        levelValues: [
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 2.6% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 2.7% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 2.8% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 2.9% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: +3% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.1% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.2% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.3% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.4% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.5% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.6% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.7% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.8% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 3.9% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: +4% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.1% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.2% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.3% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.4% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.5% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.6% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.7% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.8% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 4.9% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: +5% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.1% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.2% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.3% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.4% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.5% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.6% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.7% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.8% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 5.9% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: +6% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 6.1% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 6.2% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 6.3% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 6.4% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
          "Support Mobility Skills.\nGains a stack of buff when you use the supported skill: 6.5% Evasion per stack of buffs \nThe buff lasts 4s, stacking up to 4 times.",
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Emergency restoration",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\n45.5% Restoration effect at Low Life for the supported skill\n+10% Restoration Effect for the supported skill at Low Mana",
      "45.5% Restoration effect at Low Life for the supported skill\n+10% Restoration Effect for the supported skill at Low Mana",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+10% Restoration Effect for the supported skill at Low Mana",
    ],
    templates: [
      {
        template:
          "{value}% Restoration effect at Low Life for the supported skill",
        levelValues: [
          45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52,
          52.5, 53, 53.5, 54, 54.5, 55, 55.5, 56, 56.5, 57, 57.5, 58, 58.5, 59,
          59.5, 60, 60.5, 61, 61.5, 62, 62.5, 63, 63.5, 64, 64.5, 65,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Enhanced Ailment",
    tags: [],
    description: [
      "Supports skills that hit enemies.\n+40% chance for the supported skill to inflict Damaging Ailments\n0.3% additional Ailment Damage for the supported skill",
      "+40% chance for the supported skill to inflict Damaging Ailments\n0.3% additional Ailment Damage for the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+40% chance for the supported skill to inflict Damaging Ailments",
    ],
    templates: [
      {
        template: "{value}% additional Ailment Damage for the supported skill",
        levelValues: [
          0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.2,
          4.5, 4.8, 5.1, 5.4, 5.7, 6, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1,
          7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1, 8.2,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Extended Duration",
    tags: ["Persistent"],
    description: [
      "Supports Duration Skills.\n+13% Duration for the supported skill",
      "+13% Duration for the supported skill",
    ],
    supportTargets: [{ tags: ["Duration"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "+{value}% Duration for the supported skill",
        levelValues: [
          13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
          20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5,
          27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Fire Explosion",
    tags: ["Fire"],
    description: [
      "Supports skills that deal damage.\n12.5% additional Fire Damage for the supported skill\n+4% additional Ignite Damage for the supported skill",
      "12.5% additional Fire Damage for the supported skill\n+4% additional Ignite Damage for the supported skill",
    ],
    supportTargets: ["deal_damage"],
    cannotSupportTargets: [],
    fixedAffixes: ["+4% additional Ignite Damage for the supported skill"],
    templates: [
      {
        template: "{value}% additional Fire Damage for the supported skill",
        levelValues: [
          12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19,
          19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26,
          26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Focus Acceleration",
    tags: ["Focus"],
    description: [
      "Supports Focus Skills.\n46.5% Focus Speed for the supported skill",
      "46.5% Focus Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Focus"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}% Focus Speed for the supported skill",
        levelValues: [
          46.5, 48, 49.5, 51, 52.5, 54, 55.5, 57, 58.5, 60, 61.5, 63, 64.5, 66,
          67.5, 69, 70.5, 72, 73.5, 75, 76.5, 77.25, 78, 78.75, 79.5, 80.25, 81,
          81.75, 82.5, 83.25, 84, 84.75, 85.5, 86.25, 87, 87.75, 88.5, 89.25,
          90, 90.75,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Focus Buff",
    tags: ["Focus"],
    description: [
      "Supports Focus Skills.\n45.5% buff effect for the supported skill\n-30% Sealed Mana Compensation for the supported skill",
      "45.5% buff effect for the supported skill\n-30% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Focus"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-30% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template: "{value}% buff effect for the supported skill",
        levelValues: [
          45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52,
          52.5, 53, 53.5, 54, 54.5, 55, 55.5, 56, 56.5, 57, 57.5, 58, 58.5, 59,
          59.5, 60, 60.5, 61, 61.5, 62, 62.5, 63, 63.5, 64, 64.5, 65,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Focused Beam",
    tags: ["Spell", "Beam"],
    description: [
      "Supports Beam Skills.\n+15% additional Beam Length for the supported Beam Skill\n15.5% additional damage for the supported skill",
      "+15% additional Beam Length for the supported Beam Skill\n15.5% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Beam"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+15% additional Beam Length for the supported Beam Skill"],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Fragile Resurrection",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\n+40% Restoration effect for the supported skill\n-20% Restoration Duration for the supported skill\n+10% additional damage taken during the supported skill's restoration effect",
      "+40% Restoration effect for the supported skill\n-20% Restoration Duration for the supported skill\n+10% additional damage taken during the supported skill's restoration effect",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+40% Restoration effect for the supported skill",
      "-20% Restoration Duration for the supported skill",
      "+10% additional damage taken during the supported skill's restoration effect",
    ],
  },
  {
    type: "Support",
    name: "Friend of Spirit Magi",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports Spirit Magus Skills.\nWhen having at least 2 type(s) of Spirit Magus at the same time, Origin of Spirit Magus provided by the supported skill 51.2% Effect\n-30% Sealed Mana Compensation for the supported skill",
      "When having at least 2 type(s) of Spirit Magus at the same time, Origin of Spirit Magus provided by the supported skill 51.2% Effect\n-30% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Spirit Magus"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-30% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template:
          "When having at least 2 type(s) of Spirit Magus at the same time, Origin of Spirit Magus provided by the supported skill {value}% Effect",
        levelValues: [
          51.2, 51.4, 51.6, 51.8, 52, 52.2, 52.4, 52.6, 52.8, 53, 53.2, 53.4,
          53.6, 53.8, 54, 54.2, 54.4, 54.6, 54.8, 55, 55.2, 55.4, 55.6, 55.8,
          56, 56.2, 56.4, 56.6, 56.8, 57, 57.2, 57.4, 57.6, 57.8, 58, 58.2,
          58.4, 58.6, 58.8, 59,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Glacial Freeze",
    tags: ["Cold"],
    description: [
      "Supports skills that deal damage.\n10.3% additional Cold Damage for the supported skill\nInflicts Frostbite when the supported skill deals Hit Cold Damage",
      "10.3% additional Cold Damage for the supported skill\nInflicts Frostbite when the supported skill deals Hit Cold Damage",
    ],
    supportTargets: ["deal_damage"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Inflicts Frostbite when the supported skill deals Hit Cold Damage",
    ],
    templates: [
      {
        template: "{value}% additional Cold Damage for the supported skill",
        levelValues: [
          10.3, 10.6, 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.7, 13, 13.3, 13.6,
          13.9, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 16, 16.3, 16.4, 16.5, 16.6,
          16.7, 16.8, 16.9, 17, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8,
          17.9, 18, 18.1, 18.2,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Gladiator's Roar",
    tags: ["Warcry"],
    description: [
      "Supports Warcry Skills.\n+40% Skill Area for the supported skill\nWhen casting the supported skill, Reverse Knocks Back nearby enemies with a Knockback Distance of 2 m\nThe effective area of this effect is affected by Skill Area bonuses",
      "+40% Skill Area for the supported skill\nWhen casting the supported skill, Reverse Knocks Back nearby enemies with a Knockback Distance of 2 m\nThe effective area of this effect is affected by Skill Area bonuses",
    ],
    supportTargets: [{ tags: ["Warcry"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "When casting the supported skill, Reverse Knocks Back nearby enemies with a Knockback Distance of 2 m",
      "The effective area of this effect is affected by Skill Area bonuses",
    ],
    templates: [
      {
        template: "+{value}% Skill Area for the supported skill",
        levelValues: [
          40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
          57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
          74, 75, 76, 77, 78, 79,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Ground Divide",
    tags: ["Terra"],
    description: [
      "Supports Terra Skills.\n+1 Max Terra Charge stacks for the supported skill\n55.5% Terra Charge Restoration Speed for the supported skill\n1.5% additional damage for the supported skill",
      "+1 Max Terra Charge stacks for the supported skill\n55.5% Terra Charge Restoration Speed for the supported skill\n1.5% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Terra"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+1 Max Terra Charge stacks for the supported skill"],
    templates: [
      {
        template:
          "{value}% Terra Charge Restoration Speed for the supported skill",
        levelValues: [
          55.5, 56, 56.5, 57, 57.5, 58, 58.5, 59, 59.5, 60, 60.5, 61, 61.5, 62,
          62.5, 63, 63.5, 64, 64.5, 65, 65.5, 66.5, 67.5, 68.5, 69.5, 70.5,
          71.5, 72.5, 73.5, 74.5, 75.5, 76.5, 77.5, 78.5, 79.5, 80.5, 81.5,
          82.5, 83.5, 84.5,
        ],
      },
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
          10, 10.5, 11, 11.5, 12.05, 12.6, 13.15, 13.7, 14.25, 14.8, 15.35,
          15.9, 16.45, 17, 17.55, 18.1, 18.65, 19.2, 19.75, 20.3, 20.85, 21.4,
          21.95,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Grudge",
    tags: ["Spell"],
    description: [
      "Supports Spell Skills.\nThe supported skill deals 10.5% additional damage to Cursed enemies\nWhen the supported skill deals damage to a Cursed target, there is a +31% chance to Paralyze it",
      "The supported skill deals 10.5% additional damage to Cursed enemies\nWhen the supported skill deals damage to a Cursed target, there is a +31% chance to Paralyze it",
    ],
    supportTargets: [{ tags: ["Spell"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "The supported skill deals {value}% additional damage to Cursed enemies",
        levelValues: [
          10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
          17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
          24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30,
        ],
      },
      {
        template:
          "When the supported skill deals damage to a Cursed target, there is a +{value}% chance to Paralyze it",
        levelValues: [
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
          48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
          65, 66, 67, 68, 69, 70,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Guard",
    tags: ["Channeled"],
    description: [
      "Supports Channeled Skills.\n15.5% additional damage for the supported skill\nEvery 5 time(s) the supported skill is used, gains a Barrier if there's no Barrier. Interval: 6 s",
      "15.5% additional damage for the supported skill\nEvery 5 time(s) the supported skill is used, gains a Barrier if there's no Barrier. Interval: 6 s",
    ],
    supportTargets: [{ tags: ["Channeled"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Every 5 time(s) the supported skill is used, gains a Barrier if there's no Barrier. Interval: 6 s",
    ],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Harvest Time",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports skills that summon Spirit Magus.\nMinions summoned by the supported skill prepare the Empower Skill every 5 s\nWhen Minions summoned by the supported skill are at Stage 2 or higher, +15% chance to use an Enhanced Skill\nWhen Minions summoned by the supported skill are at Stage 3 or higher, +15% additional Empower Duration for them\nWhen Minions summoned by the supported skill are at Stage 3 or higher and Empowered, +8% additional damage for them",
      "Minions summoned by the supported skill prepare the Empower Skill every 5 s\nWhen Minions summoned by the supported skill are at Stage 2 or higher, +15% chance to use an Enhanced Skill\nWhen Minions summoned by the supported skill are at Stage 3 or higher, +15% additional Empower Duration for them\nWhen Minions summoned by the supported skill are at Stage 3 or higher and Empowered, +8% additional damage for them",
    ],
    supportTargets: ["summon_spirit_magus"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Minions summoned by the supported skill prepare the Empower Skill every 5 s",
      "When Minions summoned by the supported skill are at Stage 2 or higher, +15% chance to use an Enhanced Skill",
      "When Minions summoned by the supported skill are at Stage 3 or higher, +15% additional Empower Duration for them",
    ],
    templates: [
      {
        template:
          "When Minions summoned by the supported skill are at Stage 3 or higher and Empowered, +{value}% additional damage for them",
        levelValues: [
          8, 8.4, 8.8, 9.2, 9.6, 10, 10.4, 10.8, 11.2, 11.6, 12, 12.4, 12.8,
          13.2, 13.6, 14, 14.4, 14.8, 15.2, 15.6, 16, 16.4, 16.8, 17.2, 17.6,
          18, 18.4, 18.8, 19.2, 19.6, 20, 20.4, 20.8, 21.2, 21.6, 22, 22.4,
          22.8, 23.2, 23.6,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Haunt",
    tags: ["Attack", "Melee", "Shadow Strike"],
    description: [
      "Supports Shadow Strike Skills.\n+2 Shadow Quantity for the supported skill\n-3% additional damage for the supported skill",
      "+2 Shadow Quantity for the supported skill\n-3% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Shadow Strike"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+2 Shadow Quantity for the supported skill"],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          -3, -2.8, -2.6, -2.4, -2.2, -2, -1.8, -1.6, -1.4, -1.2, -1, -0.8,
          -0.6, -0.4, -1, -1, 0.2, 0.4, 0.6, 0.8, 1, 1.1, 1.2, 1.3, 1.4, 1.5,
          1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "High Voltage",
    tags: ["Lightning"],
    description: [
      "Supports skills that hit enemies.\n10.3% additional Lightning Damage for the supported skill\nInflicts Numbed when the supported skill deals Hit Lightning Damage",
      "10.3% additional Lightning Damage for the supported skill\nInflicts Numbed when the supported skill deals Hit Lightning Damage",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Inflicts Numbed when the supported skill deals Hit Lightning Damage",
    ],
    templates: [
      {
        template:
          "{value}% additional Lightning Damage for the supported skill",
        levelValues: [
          10.3, 10.6, 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.7, 13, 13.3, 13.6,
          13.9, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 16, 16.3, 16.4, 16.5, 16.6,
          16.7, 16.8, 16.9, 17, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8,
          17.9, 18, 18.1, 18.2,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Hunting Tempo",
    tags: ["Attack", "Projectile"],
    description: [
      "Supports Attack Projectile Skills.\nGains 3 stacks of buffs after moving for more than 2 s. Stacks up to 3 times\nWhile this buff is in effect, 30.5% additional damage for the skill when using the supported skill\nWhile this buff is in effect, +40% Knockback Chance when using the supported skill\nWhile this buff is in effect, +15% Knockback Distance when using the supported skill\nLose 1 stack of this buff when using the supported skill",
      "Gains 3 stacks of buffs after moving for more than 2 s. Stacks up to 3 times\nWhile this buff is in effect, 30.5% additional damage for the skill when using the supported skill\nWhile this buff is in effect, +40% Knockback Chance when using the supported skill\nWhile this buff is in effect, +15% Knockback Distance when using the supported skill\nLose 1 stack of this buff when using the supported skill",
    ],
    supportTargets: [{ tags: ["Attack", "Projectile"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "While this buff is in effect, 30.5% additional damage for the skill when using the supported skill",
      "While this buff is in effect, +40% Knockback Chance when using the supported skill",
      "While this buff is in effect, +15% Knockback Distance when using the supported skill",
      "Lose 1 stack of this buff when using the supported skill",
    ],
    templates: [
      {
        template:
          "Gains 3 stacks of buffs after moving for more than {value} s. Stacks up to 3 times",
        levelValues: [
          2, 1.85, 1.7, 1.55, 1.4, 1.25, 1.1, 0.95, 0.8, 0.65, 0.5, 0.48, 0.46,
          0.44, 0.42, 0.4, 0.38, 0.36, 0.34, 0.32, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
          0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Improved Corrosion",
    tags: ["Erosion"],
    description: [
      "Supports skills that hit enemies.\n+23% chance for the supported skill to inflict 1 additional stacks of Wilt\n+15% Wilt chance for the supported skill",
      "+23% chance for the supported skill to inflict 1 additional stacks of Wilt\n+15% Wilt chance for the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: ["+15% Wilt chance for the supported skill"],
    templates: [
      {
        template:
          "+{value}% chance for the supported skill to inflict 1 additional stacks of Wilt",
        levelValues: [
          23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5,
          30, 30.5, 31, 31.5, 32, 32.5, 33, 33.3, 33.6, 33.9, 34.2, 34.5, 34.8,
          35.1, 35.4, 35.7, 36, 36.3, 36.6, 36.9, 37.2, 37.5, 37.8, 38.1, 38.4,
          38.7,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Increased Area",
    tags: ["Area"],
    description: [
      "Supports Area Skills.\n+20% Skill Area for the supported skill\n+16% additional damage for the supported skill",
      "+20% Skill Area for the supported skill\n+16% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Area"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+20% Skill Area for the supported skill"],
    templates: [
      {
        template: "+{value}% additional damage for the supported skill",
        levelValues: [
          16, 16.2, 16.4, 16.6, 16.8, 17, 17.2, 17.4, 17.6, 17.8, 18, 18.2,
          18.4, 18.6, 18.8, 19, 19.2, 19.4, 19.6, 19.8, 20, 20.2, 20.4, 20.6,
          20.8, 21, 21.2, 21.4, 21.6, 21.8, 22, 22.2, 22.4, 22.6, 22.8, 23,
          23.2, 23.4, 23.6, 23.8,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Instant restoration",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\nThe supported skill's Restoration effect becomes instant\n-20% additional Restoration Effect from the supported skill",
      "The supported skill's Restoration effect becomes instant\n-20% additional Restoration Effect from the supported skill",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["The supported skill's Restoration effect becomes instant"],
    templates: [
      {
        template:
          "{value}% additional Restoration Effect from the supported skill",
        levelValues: [
          -20, -19.5, -19, -18.5, -18, -17.5, -17, -16.5, -16, -15.5, -15,
          -14.5, -14, -13.5, -13, -12.5, -12, -11.5, -11, -10.5, -10, -9.5, -9,
          -8.5, -8, -7.5, -7, -6.5, -6, -5.5, -5, -4.5, -4, -3.5, -3, -2.5, -2,
          -1.5, -1, -0.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Iron Fortification",
    tags: ["Defensive"],
    description: [
      "Supports Defensive Skills.\n+220 Armor while the supported skill lasts\n+2% Armor Effective Rate against non-Physical Damage while the supported skill lasts",
      "+220 Armor while the supported skill lasts\n+2% Armor Effective Rate against non-Physical Damage while the supported skill lasts",
    ],
    supportTargets: [{ tags: ["Defensive"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+2% Armor Effective Rate against non-Physical Damage while the supported skill lasts",
    ],
    templates: [
      {
        template: "+{value} Armor while the supported skill lasts",
        levelValues: [
          220, 280, 340, 400, 460, 520, 580, 640, 700, 760, 820, 880, 940, 1000,
          1060, 1120, 1180, 1240, 1300, 1360, 1420, 1450, 1480, 1510, 1540,
          1570, 1600, 1630, 1660, 1690, 1720, 1750, 1780, 1810, 1840, 1870,
          1900, 1930, 1960, 1990,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Jump",
    tags: ["Projectile", "Chain", "Horizontal"],
    description: [
      "Supports Horizontal Projectile Skills or Chain Skills.\n+2 Jumps for the supported skill\n+4% additional damage for the supported skill",
      "+2 Jumps for the supported skill\n+4% additional damage for the supported skill",
    ],
    supportTargets: [
      { tags: ["Horizontal", "Projectile"] },
      { tags: ["Chain"] },
    ],
    cannotSupportTargets: [],
    fixedAffixes: ["+2 Jumps for the supported skill"],
    templates: [
      {
        template: "+{value}% additional damage for the supported skill",
        levelValues: [
          4, 4.2, 4.4, 4.6, 4.8, 5, 5.2, 5.4, 5.6, 5.8, 6, 6.2, 6.4, 6.6, 6.8,
          7, 7.2, 7.4, 7.6, 7.8, 8, 8.2, 8.4, 8.6, 8.8, 9, 9.2, 9.4, 9.6, 9.8,
          10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Lightning to Cold",
    tags: ["Lightning", "Cold"],
    description: [
      "Supports skills that hit enemies.\nConverts 50% of the supported skill's Lightning Damage to Cold Damage\n5.5% additional Lightning Damage for the supported skill",
      "Converts 50% of the supported skill's Lightning Damage to Cold Damage\n5.5% additional Lightning Damage for the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Converts 50% of the supported skill's Lightning Damage to Cold Damage",
    ],
    templates: [
      {
        template:
          "{value}% additional Lightning Damage for the supported skill",
        levelValues: [
          5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13,
          13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
          20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Lion's Roars",
    tags: ["Warcry"],
    description: [
      "Support Warcry Skills.\n+20% Warcry Cast Speed for the supported skill\n+2 Max Charges for the supported skill\n-15% Cooldown Recovery Speed for the supported skill\nGains a stack of buff when you use the supported skill. The buff lasts 5 s, stacking up to 5 times\nThis skill +10% Skill Area for each stack of buff",
      "+20% Warcry Cast Speed for the supported skill\n+2 Max Charges for the supported skill\n-15% Cooldown Recovery Speed for the supported skill\nGains a stack of buff when you use the supported skill. The buff lasts 5 s, stacking up to 5 times",
    ],
    supportTargets: [{ tags: ["Warcry"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+20% Warcry Cast Speed for the supported skill",
      "+2 Max Charges for the supported skill",
      "Gains a stack of buff when you use the supported skill. The buff lasts 5 s, stacking up to 5 times",
    ],
    templates: [
      {
        template: "{value}% Cooldown Recovery Speed for the supported skill",
        levelValues: [
          -15, -14.75, -14.5, -14.25, -14, -13.75, -13.5, -13.25, -13, -12.75,
          -12.5, -12.25, -12, -11.75, -11.5, -11.25, -11, -10.75, -10.5, -10.25,
          -10, -9.75, -9.5, -9.25, -9, -8.75, -8.5, -8.25, -8, -7.75, -7.5,
          -7.25, -7, -6.75, -6.5, -6.25, -6, -5.75, -5.5, -5.25,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Magic Dash",
    tags: ["Mobility"],
    description: [
      "Supports Mobility Skills.\n+1 Max Charges for the supported skill\nGains the following buff upon casting the supported skill: 1% Movement Speed\nThe buff lasts 2s.",
      "+1 Max Charges for the supported skill\nGains a 2 s buff after casting the supported skill",
    ],
    supportTargets: [{ tags: ["Mobility"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+1 Max Charges for the supported skill",
      "Gains a 2 s buff after casting the supported skill",
    ],
  },
  {
    type: "Support",
    name: "Maniacal Army",
    tags: ["Summon", "Synthetic Troop"],
    description: [
      "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.25% additional Damage, stacking up to 37.5% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
      "Gains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\n+1 to Max Summonable Minions for the supported skill",
    ],
    supportTargets: ["summon_synthetic_troops"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}",
        levelValues: [
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.3% additional Damage, stacking up to 31.8% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.35% additional Damage, stacking up to 32.1% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.4% additional Damage, stacking up to 32.4% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.45% additional Damage, stacking up to 32.7% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.5% additional Damage, stacking up to +33% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.55% additional Damage, stacking up to 33.3% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.6% additional Damage, stacking up to 33.6% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.65% additional Damage, stacking up to 33.9% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.7% additional Damage, stacking up to 34.2% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.75% additional Damage, stacking up to 34.5% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.8% additional Damage, stacking up to 34.8% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.85% additional Damage, stacking up to 35.1% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.9% additional Damage, stacking up to 35.4% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 5.95% additional Damage, stacking up to 35.7% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, +6% additional Damage, stacking up to +36% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.05% additional Damage, stacking up to 36.3% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.1% additional Damage, stacking up to 36.6% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.15% additional Damage, stacking up to 36.9% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.2% additional Damage, stacking up to 37.2% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.25% additional Damage, stacking up to 37.5% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.3% additional Damage, stacking up to 37.8% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.35% additional Damage, stacking up to 38.1% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.4% additional Damage, stacking up to 38.4% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.45% additional Damage, stacking up to 38.7% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.5% additional Damage, stacking up to +39% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.55% additional Damage, stacking up to 39.3% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.6% additional Damage, stacking up to 39.6% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.65% additional Damage, stacking up to 39.9% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.7% additional Damage, stacking up to 40.2% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.75% additional Damage, stacking up to 40.5% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.8% additional Damage, stacking up to 40.8% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.85% additional Damage, stacking up to 41.1% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.9% additional Damage, stacking up to 41.4% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 6.95% additional Damage, stacking up to 41.7% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, +7% additional Damage, stacking up to +42% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 7.05% additional Damage, stacking up to 42.3% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 7.1% additional Damage, stacking up to 42.6% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 7.15% additional Damage, stacking up to 42.9% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 7.2% additional Damage, stacking up to 43.2% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
          "Supports skills that summon Synthetic Troops.\n+1 to Max Summonable Minions for the supported skill\nGains a buff when Minions summoned by the supported skill land a Critical Strike. Lasts 4 s. Interval per Minion: 8 s\nWhile the buff lasts, 7.25% additional Damage, stacking up to 43.5% , for every 10 point(s) of Command the Summoner has\nWhile the buff is active, 3.5% Attack and Cast Speed for every 10 Command the summoner has, up to +21%",
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Manifold Entanglement",
    tags: ["Spell"],
    description: [
      "Supports Active Spell Skills.\nCannot support Channeled Skills, Sentry Skills or skills that summon Minions.\nCreates Tangles equal to Max Tangle Quantity when you use the supported skill\n+1% additional damage for the supported skill",
      "Creates Tangles equal to Max Tangle Quantity when you use the supported skill\n+1% additional damage for the supported skill",
    ],
    supportTargets: [{ skillType: "active", tags: ["Spell"] }],
    cannotSupportTargets: [{ tags: ["Channeled"] }],
    fixedAffixes: [
      "Creates Tangles equal to Max Tangle Quantity when you use the supported skill",
    ],
    templates: [
      {
        template: "+{value}% additional damage for the supported skill",
        levelValues: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5,
          28, 28.5, 29, 29.5, 30, 30.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Mass Effect",
    tags: ["Empower"],
    description: [
      "Supports Empower Skills.\n+1 Max Charges for the supported skill\n10.5% effect for the status provided by the skill per Charge when you use the supported skill",
      "+1 Max Charges for the supported skill\n10.5% effect for the status provided by the skill per Charge when you use the supported skill",
    ],
    supportTargets: [{ tags: ["Empower"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+1 Max Charges for the supported skill"],
    templates: [
      {
        template:
          "{value}% effect for the status provided by the skill per Charge when you use the supported skill",
        levelValues: [
          10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
          17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
          24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Mechanical Modification",
    tags: ["Summon", "Synthetic Troop"],
    description: [
      "Supports skills that summon Synthetic Troops.\n+40% Physique for Minions summoned by the supported skill\n+40% additional Skill Area for Minions summoned by the supported skill\n+131% additional damage for Minions summoned by the supported skill\n+10% additional Life for Minions summoned by the supported skill\nHalve the max number of Synthetic Troop Minions that can be summoned by you, rounding up to at least 1. This effect will take effect once",
      "+40% Physique for Minions summoned by the supported skill\n+40% additional Skill Area for Minions summoned by the supported skill\n+131% additional damage for Minions summoned by the supported skill\n+10% additional Life for Minions summoned by the supported skill\nHalve the max number of Synthetic Troop Minions that can be summoned by you, rounding up to at least 1. This effect will take effect once",
    ],
    supportTargets: ["summon_synthetic_troops"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+40% Physique for Minions summoned by the supported skill",
      "+40% additional Skill Area for Minions summoned by the supported skill",
      "Halve the max number of Synthetic Troop Minions that can be summoned by you, rounding up to at least 1. This effect will take effect once",
    ],
    templates: [
      {
        template:
          "+{value}% additional damage for Minions summoned by the supported skill",
        levelValues: [
          131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
          145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158,
          159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
        ],
      },
      {
        template:
          "+{value}% additional Life for Minions summoned by the supported skill",
        levelValues: [
          10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
          17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5,
          24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Melee Knockback",
    tags: ["Attack", "Melee"],
    description: [
      "Supports Melee Attack Skills.\n+20% Knockback Chance for the supported skill\n15.5% additional damage for the supported skill\n+40% Knockback distance for the supported skill",
      "+20% Knockback Chance for the supported skill\n15.5% additional damage for the supported skill\n+40% Knockback distance for the supported skill",
    ],
    supportTargets: [{ tags: ["Melee", "Attack"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "+{value}% Knockback Chance for the supported skill",
        levelValues: [
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
          54, 55, 56, 57, 58, 59,
        ],
      },
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
      {
        template: "+{value}% Knockback distance for the supported skill",
        levelValues: [
          40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
          57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
          74, 75, 76, 77, 78, 79,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Multifaceted Guard",
    tags: ["Spell", "Sentry"],
    description: [
      "Supports Sentry Skills.\n+1 Max Sentries that can be deployed at the same time by the supported skill\n+1% additional damage for the supported skill",
      "+1 Max Sentries that can be deployed at the same time by the supported skill\n+1% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Sentry"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+1 Max Sentries that can be deployed at the same time by the supported skill",
    ],
    templates: [
      {
        template: "+{value}% additional damage for the supported skill",
        levelValues: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Multiple Projectiles",
    tags: ["Projectile"],
    description: [
      "Supports Projectile Skills.\nProjectile Quantity of the supported skill +2\n7.4% additional damage for the supported skill",
      "Projectile Quantity of the supported skill +2\n7.4% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Projectile"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["Projectile Quantity of the supported skill +2"],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          7.4, 7.8, 8.2, 8.6, 9, 9.4, 9.8, 10.2, 10.6, 11, 11.4, 11.8, 12.2,
          12.6, 13, 13.4, 13.8, 14.2, 14.6, 15, 15.4, 15.8, 16.2, 16.6, 17,
          17.4, 17.8, 18.2, 18.6, 19, 19.4, 19.8, 20.2, 20.6, 21, 21.4, 21.8,
          22.2, 22.6, 23,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Multistrike",
    tags: ["Attack"],
    description: [
      "Supports Attack Skills. Cannot support Mobility or Channeled Skills.\n+101% chance for the supported skill to trigger Multistrike\nMultistrikes of the supported skill deal 27% increasing damage",
      "+101% chance for the supported skill to trigger Multistrike\nMultistrikes of the supported skill deal 27% increasing damage",
    ],
    supportTargets: [{ tags: ["Attack"] }],
    cannotSupportTargets: [{ tags: ["Mobility"] }, { tags: ["Channeled"] }],
    fixedAffixes: [
      "Multistrikes of the supported skill deal 27% increasing damage",
    ],
    templates: [
      {
        template:
          "+{value}% chance for the supported skill to trigger Multistrike",
        levelValues: [
          101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
          115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128,
          129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Nova Shot",
    tags: ["Projectile", "Vertical"],
    description: [
      "Supports Vertical Projectile Skills.\n17.5% additional damage for the supported skill\n-15% Skill Area for the supported skill\n+15% additional Projectile Speed for the supported skill",
      "17.5% additional damage for the supported skill\n-15% Skill Area for the supported skill\n+15% additional Projectile Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Vertical", "Projectile"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
          24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31,
          31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37,
        ],
      },
      {
        template: "{value}% Skill Area for the supported skill",
        levelValues: [
          -15, -15.5, -16, -16.5, -17, -17.5, -18, -18.5, -19, -19.5, -20,
          -20.5, -21, -21.5, -22, -22.5, -23, -23.5, -24, -24.5, -25, -25.5,
          -26, -26.5, -27, -27.5, -28, -28.5, -29, -29.5, -30, -30.5, -31,
          -31.5, -32, -32.5, -33, -33.5, -34, -34.5,
        ],
      },
      {
        template:
          "+{value}% additional Projectile Speed for the supported skill",
        levelValues: [
          15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5,
          22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5,
          29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Overload",
    tags: ["Spell"],
    description: [
      "Supports Spell Skills.\n3.05% additional damage for the supported skill for each stack of Focus Blessing, stacking up to 8 time(s)",
      "3.05% additional damage for the supported skill for each stack of Focus Blessing, stacking up to 8 time(s)",
    ],
    supportTargets: [{ tags: ["Spell"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "{value}% additional damage for the supported skill for each stack of Focus Blessing, stacking up to 8 time(s)",
        levelValues: [
          3.05, 3.1, 3.15, 3.2, 3.25, 3.3, 3.35, 3.4, 3.45, 3.5, 3.55, 3.6,
          3.65, 3.7, 3.75, 3.8, 3.85, 3.9, 3.95, 4, 4.05, 4.1, 4.15, 4.2, 4.25,
          4.3, 4.35, 4.4, 4.45, 4.5, 4.55, 4.6, 4.65, 4.7, 4.75, 4.8, 4.85, 4.9,
          4.95, 5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Pain Amplification",
    tags: ["Persistent"],
    description: [
      "Supports Persistent Skills and skills that can inflict Ailment.\n12.5% additional Damage Over Time against enemies with Max Affliction for the supported skill",
      "12.5% additional Damage Over Time against enemies with Max Affliction for the supported skill",
    ],
    supportTargets: ["dot", "inflict_ailment"],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "{value}% additional Damage Over Time against enemies with Max Affliction for the supported skill",
        levelValues: [
          12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19,
          19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26,
          26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Passivation",
    tags: ["Erosion"],
    description: [
      "Supports skills that deal damage.\nThe supported skill cannot inflict Wilt\nThe supported skill deals more damage to enemies with more Life, up to +41% additional Erosion Damage",
      "The supported skill cannot inflict Wilt\nThe supported skill deals more damage to enemies with more Life, up to +41% additional Erosion Damage",
    ],
    supportTargets: ["deal_damage"],
    cannotSupportTargets: [],
    fixedAffixes: ["The supported skill cannot inflict Wilt"],
    templates: [
      {
        template:
          "The supported skill deals more damage to enemies with more Life, up to +{value}% additional Erosion Damage",
        levelValues: [
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
          58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
          75, 76, 77, 78, 79, 80,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Periodic Burst",
    tags: ["Mobility"],
    description: [
      "Support Mobility Skills.\nGains a stack of buff when using the supported skill every 6s: 20.5 % Attack and Cast Speed after using a Mobility Skill\nThe buff lasts 2s",
      "Gains a stack of buff when using the supported skill every 6 s. The buff lasts 2s",
    ],
    supportTargets: [{ tags: ["Mobility"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Gains a stack of buff when using the supported skill every 6 s. The buff lasts 2s",
    ],
  },
  {
    type: "Support",
    name: "Physical to Fire",
    tags: ["Physical", "Fire"],
    description: [
      "Supports skills that hit enemies.\nConverts 100% of the supported skill's Physical Damage to Fire Damage\nAdds 15.5% of Physical Damage as Fire Damage to the supported skill",
      "Converts 100% of the supported skill's Physical Damage to Fire Damage\nAdds 15.5% of Physical Damage as Fire Damage to the supported skill",
    ],
    supportTargets: ["hit_enemies"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Converts 100% of the supported skill's Physical Damage to Fire Damage",
    ],
    templates: [
      {
        template:
          "Adds {value}% of Physical Damage as Fire Damage to the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Concentrated",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\nThe supported skill 25.5% Aura Effect when the character is affected by no more than 2 Auras",
      "The supported skill 25.5% Aura Effect when the character is affected by no more than 2 Auras",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "The supported skill {value}% Aura Effect when the character is affected by no more than 2 Auras",
        levelValues: [
          25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32,
          32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39,
          39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Disciplined",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\n+35% Sealed Mana Compensation for the supported skill\nThe supported skill -20.9% additional Aura Effect",
      "+35% Sealed Mana Compensation for the supported skill\nThe supported skill -20.9% additional Aura Effect",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+35% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template: "The supported skill -20.9% additional Aura Effect",
        levelValues: [
          -209, -20.8, -20.7, -20.6, -20.5, -20.4, -20.3, -20.2, -20.1, -20,
          -19.9, -19.8, -19.7, -19.6, -19.5, -19.4, -19.3, -19.2, -19.1, -19,
          -189, -18.8, -18.7, -18.6, -18.5, -18.4, -18.3, -18.2, -18.1, -18,
          -17.9, -17.8, -17.7, -17.6, -17.5, -17.4, -17.3, -17.2, -17.1, -17,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Focus Buff",
    tags: ["Focus"],
    description: [
      "Supports Focus Skills.\n45.5% buff effect for the supported skill\n-18% Sealed Mana Compensation for the supported skill",
      "45.5% buff effect for the supported skill\n-18% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Focus"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-18% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template: "{value}% buff effect for the supported skill",
        levelValues: [
          45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52,
          52.5, 53, 53.5, 54, 54.5, 55, 55.5, 56, 56.5, 57, 57.5, 58, 58.5, 59,
          59.5, 60, 60.5, 61, 61.5, 62, 62.5, 63, 63.5, 64, 64.5, 65,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Friend of Spirit Magi",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports Spirit Magus Skills.\nWhen having at least 3 type(s) of Spirit Magus at the same time, Origin of Spirit Magus provided by the supported skill +109% Effect\n-30% Sealed Mana Compensation for the supported skill",
      "When having at least 3 type(s) of Spirit Magus at the same time, Origin of Spirit Magus provided by the supported skill +109% Effect\n-30% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Spirit Magus"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-30% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template:
          "When having at least 3 type(s) of Spirit Magus at the same time, Origin of Spirit Magus provided by the supported skill +{value}% Effect",
        levelValues: [
          109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
          123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
          137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Harmony",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\nThis skill can only be installed in the fifth Support Skill Slot of each Active Skill.\nGains immunity to Elemental Ailment for 2.1 s after casting the supported skill",
      "Gains immunity to Elemental Ailment for 2.1 s after casting the supported skill",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "Gains immunity to Elemental Ailment for {value} s after casting the supported skill",
        levelValues: [
          2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4,
          3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.15, 4.2, 4.25, 4.3, 4.35, 4.4,
          4.45, 4.5, 4.55, 4.6, 4.65, 4.7, 4.75, 4.8, 4.85, 4.9, 4.95, 5, 5.05,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Malleable",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\nThe supported skill 20.5% Aura Effect if there is an Elite within 10 m. Otherwise, -15% additional Aura Effect\n-15% Sealed Mana Compensation for the supported skill",
      "The supported skill 20.5% Aura Effect if there is an Elite within 10 m. Otherwise, -15% additional Aura Effect\n-15% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-15% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template:
          "The supported skill {value}% Aura Effect if there is an Elite within 10 m. Otherwise, -15% additional Aura Effect",
        levelValues: [
          20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27,
          27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34,
          34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Protection Field",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports Spirit Magus Skills.\nTransfers 8% of damage taken to the Minions summoned by the supported skill\n-30% Sealed Mana Compensation for the supported skill\nMinions summoned by the supported skill Taunt nearby enemies every 6 s.",
      "Transfers 8% of damage taken to the Minions summoned by the supported skill\n-30% Sealed Mana Compensation for the supported skill\nMinions summoned by the supported skill Taunt nearby enemies every 6 s.",
    ],
    supportTargets: [{ tags: ["Spirit Magus"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "-30% Sealed Mana Compensation for the supported skill",
      "Minions summoned by the supported skill Taunt nearby enemies every 6 s.",
    ],
    templates: [
      {
        template:
          "Transfers {value}% of damage taken to the Minions summoned by the supported skill",
        levelValues: [
          8, 8.05, 8.1, 8.15, 8.2, 8.25, 8.3, 8.35, 8.4, 8.45, 8.5, 8.55, 8.6,
          8.65, 8.7, 8.75, 8.8, 8.85, 8.9, 8.95, 9, 9.05, 9.1, 9.15, 9.2, 9.25,
          9.3, 9.35, 9.4, 9.45, 9.5, 9.55, 9.6, 9.65, 9.7, 9.75, 9.8, 9.85, 9.9,
          9.95,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Purify",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\nThis skill can only be installed in the fifth Support Skill Slot of each Active Skill.\nGains immunity to Wilt and Trauma for 2.1 s after casting the supported skill",
      "Gains immunity to Wilt and Trauma for 2.1 s after casting the supported skill",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "Gains immunity to Wilt and Trauma for {value} s after casting the supported skill",
        levelValues: [
          2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4,
          3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.15, 4.2, 4.25, 4.3, 4.35, 4.4,
          4.45, 4.5, 4.55, 4.6, 4.65, 4.7, 4.75, 4.8, 4.85, 4.9, 4.95, 5, 5.05,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Safety in Numbers",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\n3.1% Aura Effect for each ally affected by the supported skill, stacking up to 7 time(s)\n-12% Sealed Mana Compensation for the supported skill",
      "3.1% Aura Effect for each ally affected by the supported skill, stacking up to 7 time(s)\n-12% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-12% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template:
          "{value}% Aura Effect for each ally affected by the supported skill, stacking up to 7 time(s)",
        levelValues: [
          3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.3, 4.4,
          4.5, 4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8,
          5.9, 6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Seal Conversion",
    tags: [],
    description: [
      "Supports Passive Skill.\nReplaces Sealed Mana of the supported skill with Sealed Life\n-60% additional Sealed Mana Compensation for the supported skill",
      "Replaces Sealed Mana of the supported skill with Sealed Life\n-60% additional Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ skillType: "passive" }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Replaces Sealed Mana of the supported skill with Sealed Life",
    ],
    templates: [
      {
        template:
          "{value}% additional Sealed Mana Compensation for the supported skill",
        levelValues: [
          -60, -59.5, -59, -58.5, -58, -57.5, -57, -56.5, -56, -55.5, -55,
          -54.5, -54, -53.5, -53, -52.5, -52, -51.5, -51, -50.5, -50, -49.75,
          -49.5, -49.25, -49, -48.75, -48.5, -48.25, -48, -47.75, -47.5, -47.25,
          -47, -46.75, -46.5, -46.25, -46, -45.75, -45.5, -45.25,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Selfishness",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\nThe supported skill does not take effect on other allies\n20.2% Aura effect for the supported skill\n-12% Sealed Mana Compensation for the supported skill",
      "The supported skill does not take effect on other allies\n20.2% Aura effect for the supported skill\n-12% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "The supported skill does not take effect on other allies",
      "-12% Sealed Mana Compensation for the supported skill",
    ],
    templates: [
      {
        template: "{value}% Aura effect for the supported skill",
        levelValues: [
          20.2, 20.4, 20.6, 20.8, 21, 21.2, 21.4, 21.6, 21.8, 22, 22.2, 22.4,
          22.6, 22.8, 23, 23.2, 23.4, 23.6, 23.8, 24, 24.2, 24.4, 24.6, 24.8,
          25, 25.2, 25.4, 25.6, 25.8, 26, 26.2, 26.4, 26.6, 26.8, 27, 27.2,
          27.4, 27.6, 27.8, 28,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Selfless",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\n-90% additional Aura Effect received from the supported skill.\n22.2% Aura effect for the supported skill\n-12% Sealed Mana Compensation for the supported skill",
      "-90% additional Aura Effect received from the supported skill.\n22.2% Aura effect for the supported skill\n-12% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "-90% additional Aura Effect received from the supported skill.",
      "-12% Sealed Mana Compensation for the supported skill",
    ],
    templates: [
      {
        template: "{value}% Aura effect for the supported skill",
        levelValues: [
          22.2, 22.4, 22.6, 22.8, 23, 23.2, 23.4, 23.6, 23.8, 24, 24.2, 24.4,
          24.6, 24.8, 25, 25.2, 25.4, 25.6, 25.8, 26, 26.2, 26.4, 26.6, 26.8,
          27, 27.2, 27.4, 27.6, 27.8, 28, 28.2, 28.4, 28.6, 28.8, 29, 29.2,
          29.4, 29.6, 29.8, 30,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Stand as One",
    tags: ["Aura"],
    description: [
      "Supports Aura Skills.\nThe supported skill 4.1% Aura Effect for each Aura that affects the character, stacking up to 5 time(s)",
      "The supported skill 4.1% Aura Effect for each Aura that affects the character, stacking up to 5 time(s)",
    ],
    supportTargets: [{ tags: ["Aura"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "The supported skill {value}% Aura Effect for each Aura that affects the character, stacking up to 5 time(s)",
        levelValues: [
          4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4,
          5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8,
          6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise: Superpower",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports Spirit Magus Skills.\n48.2% Origin of Spirit Magus effect for the supported skill\n-20% Sealed Mana Compensation for the supported skill",
      "48.2% Origin of Spirit Magus effect for the supported skill\n-20% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Spirit Magus"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-20% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template:
          "{value}% Origin of Spirit Magus effect for the supported skill",
        levelValues: [
          48.2, 48.4, 48.6, 48.8, 49, 49.2, 49.4, 49.6, 49.8, 50, 50.2, 50.4,
          50.6, 50.8, 51, 51.2, 51.4, 51.6, 51.8, 52, 52.2, 52.4, 52.6, 52.8,
          53, 53.2, 53.4, 53.6, 53.8, 54, 54.2, 54.4, 54.6, 54.8, 55, 55.2,
          55.4, 55.6, 55.8, 56,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precise Restrain",
    tags: [],
    description: [
      "Supports Passive Skill.\n15.5% Sealed Mana Compensation for the supported skill",
      "15.5% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ skillType: "passive" }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}% Sealed Mana Compensation for the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Precision Strike",
    tags: ["Area", "Attack", "Melee"],
    description: [
      "Supports Melee Attack Skills.\n-30% Skill Area for the supported skill\n11.5% additional Area Damage for the supported skill\n11.5% additional Ailment Damage for the supported skill\n+10% Attack Speed for the supported skill",
      "-30% Skill Area for the supported skill\n11.5% additional Area Damage for the supported skill\n11.5% additional Ailment Damage for the supported skill\n+10% Attack Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Melee", "Attack"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-30% Skill Area for the supported skill"],
    templates: [
      {
        template: "{value}% additional Area Damage for the supported skill",
        levelValues: [
          11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
          18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25,
          25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31,
        ],
      },
      {
        template: "{value}% additional Ailment Damage for the supported skill",
        levelValues: [
          11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
          18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25,
          25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31,
        ],
      },
      {
        template: "+{value}% Attack Speed for the supported skill",
        levelValues: [
          10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.2,
          12.4, 12.6, 12.8, 13, 13.2, 13.4, 13.6, 13.8, 14, 14.2, 14.4, 14.6,
          14.8, 15, 15.2, 15.4, 15.6, 15.8, 16, 16.2, 16.4, 16.6, 16.8, 17,
          17.2, 17.4, 17.6, 17.8,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Preparation",
    tags: [],
    description: [
      "Supports Active Skills. Cannot support Channeled Skills or Attack Skills.\nPrepares the supported skill every 9.9 s",
      "Prepares the supported skill every 9.9 s",
    ],
    supportTargets: [{ skillType: "active" }],
    cannotSupportTargets: [{ tags: ["Channeled"] }, { tags: ["Attack"] }],
    templates: [
      {
        template: "Prepares the supported skill every {value} s",
        levelValues: [
          9.9, 9.8, 9.7, 9.6, 9.5, 9.4, 9.3, 9.2, 9.1, 9, 8.9, 8.8, 8.7, 8.6,
          8.5, 8.4, 8.3, 8.2, 8.1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
          8, 8, 8, 8, 8, 8,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Projectile Penetration",
    tags: ["Projectile", "Horizontal"],
    description: [
      "Supports Horizontal Projectile Skills.\n+2 Horizontal Projectile Penetration(s) of the supported skill\n5.5% additional damage for the supported skill",
      "+2 Horizontal Projectile Penetration(s) of the supported skill\n5.5% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Horizontal", "Projectile"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "+{value} Horizontal Projectile Penetration(s) of the supported skill",
        levelValues: [
          2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4,
          4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        ],
      },
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13,
          13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
          20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Projectile Split",
    tags: ["Projectile", "Parabolic"],
    description: [
      "Supports Parabolic Projectile Skills.\nWhen casting the supported skill, +50% chance to +2 Split Quantity for the skill\n8.2% additional damage for the supported skill",
      "When casting the supported skill, +50% chance to +2 Split Quantity for the skill\n8.2% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Parabolic", "Projectile"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "When casting the supported skill, +50% chance to +2 Split Quantity for the skill",
    ],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          8.2, 8.4, 8.6, 8.8, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8,
          11, 11.2, 11.4, 11.6, 11.8, 12, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7,
          12.8, 12.9, 13, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9,
          14, 14.1,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Protection Field",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports Spirit Magus Skills.\nTransfers 5% of damage taken to the Minions summoned by the supported skill\n-30% Sealed Mana Compensation for the supported skill",
      "Transfers 5% of damage taken to the Minions summoned by the supported skill\n-30% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ tags: ["Spirit Magus"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-30% Sealed Mana Compensation for the supported skill"],
    templates: [
      {
        template:
          "Transfers {value}% of damage taken to the Minions summoned by the supported skill",
        levelValues: [
          5, 5.05, 5.1, 5.15, 5.2, 5.25, 5.3, 5.35, 5.4, 5.45, 5.5, 5.55, 5.6,
          5.65, 5.7, 5.75, 5.8, 5.85, 5.9, 5.95, 6, 6.05, 6.1, 6.15, 6.2, 6.25,
          6.3, 6.35, 6.4, 6.45, 6.5, 6.55, 6.6, 6.65, 6.7, 6.75, 6.8, 6.85, 6.9,
          6.95,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Psychic Burst",
    tags: ["Spell"],
    description: [
      "Supports Spell Skills or skills that can activate Spell Burst.\n+26% additional Hit Damage for skills cast by Spell Burst when Spell Burst is activated by the supported skill\n+16% Cast Speed for the supported skill",
      "+26% additional Hit Damage for skills cast by Spell Burst when Spell Burst is activated by the supported skill\n+16% Cast Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Spell"] }, "spell_burst"],
    cannotSupportTargets: [],
    fixedAffixes: ["+16% Cast Speed for the supported skill"],
    templates: [
      {
        template:
          "+{value}% additional Hit Damage for skills cast by Spell Burst when Spell Burst is activated by the supported skill",
        levelValues: [
          26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
          43, 44, 45, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51,
          51.5, 52, 52.5, 53, 53.5, 54, 54.5, 55, 55.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Psychic Surge",
    tags: ["Spell", "Mobility"],
    description: [
      "Supports Mobility Skills.\n0.5% additional Hit Damage for skills cast by Spell Burst during the next 1 Spell Burst(s) activated after casting the supported skill",
      "0.5% additional Hit Damage for skills cast by Spell Burst during the next 1 Spell Burst(s) activated after casting the supported skill",
    ],
    supportTargets: [{ tags: ["Mobility"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "{value}% additional Hit Damage for skills cast by Spell Burst during the next 1 Spell Burst(s) activated after casting the supported skill",
        levelValues: [
          0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5,
          9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5,
          16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Quick Decision",
    tags: [],
    description: [
      "Supports Attack Skills or Spell Skills.\nCannot support Mobility Skills.\n+15% additional Attack and Cast Speed for the supported skill",
      "+15% additional Attack and Cast Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Attack"] }, { tags: ["Spell"] }],
    cannotSupportTargets: [{ tags: ["Mobility"] }],
    templates: [
      {
        template:
          "+{value}% additional Attack and Cast Speed for the supported skill",
        levelValues: [
          15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5,
          22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5,
          29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Quick Mobility",
    tags: ["Mobility"],
    description: [
      "Supports Mobility Skills.\n10.5% Attack and Cast Speed for the supported skill\n20.5% Cooldown Recovery Speed for the supported skill",
      "10.5% Attack and Cast Speed for the supported skill\n20.5% Cooldown Recovery Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Mobility"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}% Attack and Cast Speed for the supported skill",
        levelValues: [
          10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
          17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24,
          24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30,
        ],
      },
      {
        template: "{value}% Cooldown Recovery Speed for the supported skill",
        levelValues: [
          20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27,
          27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34,
          34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Quick Return",
    tags: ["Attack", "Melee", "Demolisher"],
    description: [
      "Supports Melee Demolisher Skills.\n+82% Demolisher Charge Restoration Speed for the supported skill\n15.5% additional damage for the supported skill",
      "+82% Demolisher Charge Restoration Speed for the supported skill\n15.5% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Melee", "Demolisher"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "+{value}% Demolisher Charge Restoration Speed for the supported skill",
        levelValues: [
          82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
          99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
          113, 114, 115, 116, 117, 118, 119, 120, 121,
        ],
      },
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Raging Slash",
    tags: ["Attack", "Melee", "Slash-Strike"],
    description: [
      "Supports Melee Slash Strike Skills.\nThe supported skill +21% Steep Strike chance.",
      "The supported skill +21% Steep Strike chance.",
    ],
    supportTargets: [{ tags: ["Slash-Strike", "Melee"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "The supported skill +{value}% Steep Strike chance.",
        levelValues: [
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46,
          46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Recklessness",
    tags: ["Attack"],
    description: [
      "Supports Attack Skills.\n1% of current Life will be consumed when the supported skill is cast\n+5% Attack Speed for the supported skill\nAdds 5% of Missing Life as Physical Damage to the supported skill; Only has 40% effect on Minion Skills",
      "1% of current Life will be consumed when the supported skill is cast\n+5% Attack Speed for the supported skill\nAdds 5% of Missing Life as Physical Damage to the supported skill; Only has 40% effect on Minion Skills",
    ],
    supportTargets: [{ tags: ["Attack"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Adds 5% of Missing Life as Physical Damage to the supported skill; Only has 40% effect on Minion Skills",
    ],
    templates: [
      {
        template:
          "{value}% of current Life will be consumed when the supported skill is cast",
        levelValues: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        ],
      },
      {
        template: "+{value}% Attack Speed for the supported skill",
        levelValues: [
          5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5,
          13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
          20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Reclusion",
    tags: ["Defensive"],
    description: [
      "Supports Defensive Skills.\n-50% Duration for the supported skill\nGains a buff: Does not lose Deflection when you are hit while the supported skill lasts. Loses the buff after taking 1 hit(s)",
      "-50% Duration for the supported skill\nGains a buff: Does not lose Deflection when you are hit while the supported skill lasts. Loses the buff after taking 1 hit(s)",
    ],
    supportTargets: [{ tags: ["Defensive"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Gains a buff: Does not lose Deflection when you are hit while the supported skill lasts. Loses the buff after taking 1 hit(s)",
    ],
    templates: [
      {
        template: "{value}% Duration for the supported skill",
        levelValues: [
          -50, -49.5, -49, -48.5, -48, -47.5, -47, -46.5, -46, -45.5, -45,
          -44.5, -44, -43.5, -43, -42.5, -42, -41.5, -41, -40.5, -40, -39.5,
          -39, -38.5, -38, -37.5, -37, -36.5, -36, -35.5, -35, -34.5, -34,
          -33.5, -33, -32.5, -32, -31.5, -31, -30.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Recuperation",
    tags: ["Combo"],
    description: [
      "Supports Combo Skills.\n+1 Combo Points gained from Combo Starters for the supported skill\n5.5% Combo Finisher Amplification for the supported skill",
      "+1 Combo Points gained from Combo Starters for the supported skill\n5.5% Combo Finisher Amplification for the supported skill",
    ],
    supportTargets: [{ tags: ["Combo"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+1 Combo Points gained from Combo Starters for the supported skill",
    ],
    templates: [
      {
        template:
          "{value}% Combo Finisher Amplification for the supported skill",
        levelValues: [
          5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13,
          13.5, 14, 14.5, 15, 15.5, 15.8, 16.1, 16.4, 16.7, 17, 17.3, 17.6,
          17.9, 18.2, 18.5, 18.8, 19.1, 19.4, 19.7, 20, 20.3, 20.6, 20.9, 21.2,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Refracted Prism",
    tags: ["Spell", "Beam"],
    description: [
      "Supports Beam Skills.\n+2 additional refractions for the supported Beam Skill\n12.5% additional damage for the supported skill\n-10% additional Beam Length for the supported Beam Skill",
      "+2 additional refractions for the supported Beam Skill\n12.5% additional damage for the supported skill\n-10% additional Beam Length for the supported Beam Skill",
    ],
    supportTargets: [{ tags: ["Beam"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+2 additional refractions for the supported Beam Skill",
      "-10% additional Beam Length for the supported Beam Skill",
    ],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19,
          19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26,
          26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Residues",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\n+70% Restoration Duration for the supported skill\nThe Restoration Effect from supported skills cannot be removed",
      "+70% Restoration Duration for the supported skill\nThe Restoration Effect from supported skills cannot be removed",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+70% Restoration Duration for the supported skill",
      "The Restoration Effect from supported skills cannot be removed",
    ],
  },
  {
    type: "Support",
    name: "Restoration Charge",
    tags: ["Restoration"],
    description: [
      "Supports Restoration Skills.\n+1 Max Charges for the supported skill\nWhen casting the supported skill, gains 5% of the skill's Charging Progress",
      "+1 Max Charges for the supported skill\nWhen casting the supported skill, gains 5% of the skill's Charging Progress",
    ],
    supportTargets: [{ tags: ["Restoration"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+1 Max Charges for the supported skill"],
    templates: [
      {
        template:
          "When casting the supported skill, gains {value}% of the skill's Charging Progress",
        levelValues: [
          5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5,
          13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
          20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Restrain",
    tags: [],
    description: [
      "Supports Passive Skill.\n0.5% Sealed Mana Compensation for the supported skill",
      "0.5% Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ skillType: "passive" }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}% Sealed Mana Compensation for the supported skill",
        levelValues: [
          0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5,
          9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5,
          16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Savage Growth",
    tags: ["Summon", "Spirit Magus"],
    description: [
      "Supports skills that summon Spirit Magus.\n0.012% additional damage for every 1 point(s) of Growth Minions summoned by the supported skill have\nGains a buff when Minions summoned by the supported skill cast skills 8 time(s). Lasts 5 s. You will not receive another buff while the buff is active\nWhile a buff is active, Spirit Magi +150 initial Growth. The buff will reduce to +60 in 5s",
      "0.012% additional damage for every 1 point(s) of Growth Minions summoned by the supported skill have\nGains a buff when Minions summoned by the supported skill cast skills 8 time(s). Lasts 5 s. You will not receive another buff while the buff is active",
    ],
    supportTargets: ["summon_spirit_magus"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Gains a buff when Minions summoned by the supported skill cast skills 8 time(s). Lasts 5 s. You will not receive another buff while the buff is active",
    ],
    templates: [
      {
        template:
          "{value}% additional damage for every 1 point(s) of Growth Minions summoned by the supported skill have",
        levelValues: [
          0.012, 0.012, 0.013, 0.013, 0.014, 0.014, 0.014, 0.015, 0.015, 0.016,
          0.016, 0.016, 0.017, 0.017, 0.018, 0.018, 0.018, 0.019, 0.019, 0.02,
          0.02, 0.02, 0.021, 0.021, 0.022, 0.022, 0.022, 0.023, 0.023, 0.024,
          0.024, 0.024, 0.025, 0.025, 0.026, 0.026, 0.026, 0.027, 0.027, 0.028,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Scattershot Beam",
    tags: ["Spell", "Beam"],
    description: [
      "Supports Beam Skills.\n+2 additional Beams for the supported Beam Skill\n+2% additional damage for the supported skill",
      "+2 additional Beams for the supported Beam Skill\n+2% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Beam"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+2 additional Beams for the supported Beam Skill"],
    templates: [
      {
        template: "+{value}% additional damage for the supported skill",
        levelValues: [
          2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4,
          3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8,
          4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Seal Conversion",
    tags: [],
    description: [
      "Supports Passive Skill.\nReplaces Sealed Mana of the supported skill with Sealed Life\n-70% additional Sealed Mana Compensation for the supported skill",
      "Replaces Sealed Mana of the supported skill with Sealed Life\n-70% additional Sealed Mana Compensation for the supported skill",
    ],
    supportTargets: [{ skillType: "passive" }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "Replaces Sealed Mana of the supported skill with Sealed Life",
    ],
    templates: [
      {
        template:
          "{value}% additional Sealed Mana Compensation for the supported skill",
        levelValues: [
          -70, -69.75, -69.5, -69.25, -69, -68.75, -68.5, -68.25, -68, -67.75,
          -67.5, -67.25, -67, -66.75, -66.5, -66.25, -66, -65.75, -65.5, -65.25,
          -65, -64.25, -63.5, -62.75, -62, -61.25, -60.5, -59.75, -59, -58.25,
          -57.5, -56.75, -56, -55.25, -54.5, -53.75, -53, -52.25, -51.5, -50.75,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Sentry Modification",
    tags: ["Spell", "Sentry"],
    description: [
      "Supports Sentry Skills.\n+1 Sentries that can be deployed at a time by the supported skill\n15.5% additional Cast Frequency for Sentries deployed by the supported skill",
      "+1 Sentries that can be deployed at a time by the supported skill\n15.5% additional Cast Frequency for Sentries deployed by the supported skill",
    ],
    supportTargets: [{ tags: ["Sentry"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "+1 Sentries that can be deployed at a time by the supported skill",
    ],
    templates: [
      {
        template:
          "{value}% additional Cast Frequency for Sentries deployed by the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Servant Damage",
    tags: ["Summon"],
    description: [
      "Supports skills that summon Minions.\n15.5% additional damage for Minions summoned by the supported skill",
      "15.5% additional damage for Minions summoned by the supported skill",
    ],
    supportTargets: ["summon_minions"],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "{value}% additional damage for Minions summoned by the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Servant Life",
    tags: ["Summon"],
    description: [
      "Supports skills that summon Minions.\n42.5% additional Life for Minions summoned by the supported skill",
      "42.5% additional Life for Minions summoned by the supported skill",
    ],
    supportTargets: ["summon_minions"],
    cannotSupportTargets: [],
    templates: [
      {
        template:
          "{value}% additional Life for Minions summoned by the supported skill",
        levelValues: [
          42.5, 43.5, 44.5, 45.5, 46.5, 47.5, 48.5, 49.5, 50.5, 51.5, 52.5,
          53.5, 54.5, 55.5, 56.5, 57.5, 58.5, 59.5, 60.5, 61.5, 62.5, 63, 63.5,
          64, 64.5, 65, 65.5, 66, 66.5, 67, 67.5, 68, 68.5, 69, 69.5, 70, 70.5,
          71, 71.5, 72,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Shortened Duration",
    tags: ["Persistent"],
    description: [
      "Supports Persistent Skills and skills that can inflict Ailment.\n-10% Duration for the supported skill\n+20% additional Damage Over Time for the supported skill",
      "-10% Duration for the supported skill\n+20% additional Damage Over Time for the supported skill",
    ],
    supportTargets: ["dot", "inflict_ailment"],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}% Duration for the supported skill",
        levelValues: [
          -10, -9.9, -9.8, -9.7, -9.6, -9.5, -9.4, -9.3, -9.2, -9.1, -9, -8.9,
          -8.8, -8.7, -8.6, -8.5, -8.4, -8.3, -8.2, -8.1, -8, -7.9, -7.8, -7.7,
          -7.6, -7.5, -7.4, -7.3, -7.2, -7.1, -7, -6.9, -6.8, -6.7, -6.6, -6.5,
          -6.4, -6.3, -6.2, -6.1,
        ],
      },
      {
        template:
          "+{value}% additional Damage Over Time for the supported skill",
        levelValues: [
          20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5,
          27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5,
          34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Slow Projectile",
    tags: ["Projectile"],
    description: [
      "Supports Projectile Skills.\n-30% additional Projectile Speed for the supported skill\n19.5% additional damage for the supported skill",
      "-30% additional Projectile Speed for the supported skill\n19.5% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Projectile"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-30% additional Projectile Speed for the supported skill"],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26,
          26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33,
          33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Spell Concentration",
    tags: ["Spell", "Area"],
    description: [
      "Supports Area Spell Skills.\n-30% Skill Area for the supported skill\n22.5% additional damage for the supported skill",
      "-30% Skill Area for the supported skill\n22.5% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Area", "Spell"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-30% Skill Area for the supported skill"],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36,
          36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Spell Tangle",
    tags: ["Spell"],
    description: [
      "Supports Active Spell Skills.\nCannot support Channeled Skills, Sentry Skills or skills that summon Minions.\nThis skill can only be installed in the first Support Skill Slot of each Active Skill.\nThe supported skill is cast as a Spell Tangle\n15.5% additional damage for the supported skill",
      "The supported skill is cast as a Spell Tangle\n15.5% additional damage for the supported skill",
    ],
    supportTargets: [{ skillType: "active", tags: ["Spell"] }],
    cannotSupportTargets: [{ tags: ["Channeled"] }],
    fixedAffixes: ["The supported skill is cast as a Spell Tangle"],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Steamroll",
    tags: ["Attack", "Melee", "Area"],
    description: [
      "Supports Melee Attack Skills.\n+31% additional Melee Damage for the supported skill\n+31% additional Ailment Damage for the supported skill\n-15% Attack Speed for the supported skill",
      "+31% additional Melee Damage for the supported skill\n+31% additional Ailment Damage for the supported skill\n-15% Attack Speed for the supported skill",
    ],
    supportTargets: [{ tags: ["Melee", "Attack"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["-15% Attack Speed for the supported skill"],
    templates: [
      {
        template: "+{value}% additional Melee Damage for the supported skill",
        levelValues: [
          31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5,
          38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5,
          45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5,
        ],
      },
      {
        template: "+{value}% additional Ailment Damage for the supported skill",
        levelValues: [
          31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5,
          38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5,
          45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Tendonslicer",
    tags: ["Physical"],
    description: [
      "Supports skills that deal damage.\n7.5% additional Physical Damage for the supported skill\nWhen the supported skill deals damage, there is a 40% chance to inflict a debuff: +10% damage taken by the enemy from the supported skill for 2 s",
      "7.5% additional Physical Damage for the supported skill\nWhen the supported skill deals damage, there is a 40% chance to inflict a debuff: +10% damage taken by the enemy from the supported skill for 2 s",
    ],
    supportTargets: ["deal_damage"],
    cannotSupportTargets: [],
    fixedAffixes: [
      "When the supported skill deals damage, there is a 40% chance to inflict a debuff: +10% damage taken by the enemy from the supported skill for 2 s",
    ],
    templates: [
      {
        template: "{value}% additional Physical Damage for the supported skill",
        levelValues: [
          7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5,
          15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5,
          22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Terrain of Malice",
    tags: ["Curse"],
    description: [
      "Supports Curse Skills.\nThe supported Curse Skill becomes an instant-cast skill. Upon being cast, it inflicts its Curse Effect persistently on enemies within an area centered around the caster. The Duration of the area is equal to the Duration of the Curse Effect of the supported skill. CD of the supported skill is changed to 8s\n+210% additional Skill Area for the supported skill",
      "The supported Curse Skill becomes an instant-cast skill. Upon being cast, it inflicts its Curse Effect persistently on enemies within an area centered around the caster. The Duration of the area is equal to the Duration of the Curse Effect of the supported skill. CD of the supported skill is changed to 8s\n+210% additional Skill Area for the supported skill",
    ],
    supportTargets: [{ tags: ["Curse"] }],
    cannotSupportTargets: [],
    fixedAffixes: [
      "The supported Curse Skill becomes an instant-cast skill. Upon being cast, it inflicts its Curse Effect persistently on enemies within an area centered around the caster. The Duration of the area is equal to the Duration of the Curse Effect of the supported skill. CD of the supported skill is changed to 8s",
    ],
    templates: [
      {
        template: "+{value}% additional Skill Area for the supported skill",
        levelValues: [
          210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340,
          350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470, 480,
          490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Well-Fought Battle",
    tags: ["Empower"],
    description: [
      "Supports Empower Skills. Cannot support Summon Skills.\nThe supported skill 5.25% Effect every time it is cast, stacking up to 3 time(s)",
      "The supported skill 5.25% Effect every time it is cast, stacking up to 3 time(s)",
    ],
    supportTargets: [{ tags: ["Empower"] }],
    cannotSupportTargets: [{ tags: ["Summon"] }],
    templates: [
      {
        template:
          "The supported skill {value}% Effect every time it is cast, stacking up to 3 time(s)",
        levelValues: [
          5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5,
          8.75, 9, 9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11, 11.25, 11.5,
          11.75, 12, 12.25, 12.5, 12.75, 13, 13.25, 13.5, 13.75, 14, 14.25,
          14.5, 14.75, 15,
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Willpower",
    tags: [],
    description: [
      "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n+6% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
      "While standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving",
    ],
    supportTargets: [{ tags: ["Attack"] }, { tags: ["Spell"] }],
    cannotSupportTargets: [],
    templates: [
      {
        template: "{value}",
        levelValues: [
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.1% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.2% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.3% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.4% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.5% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.6% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.7% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.8% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n4.9% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n+5% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.1% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.2% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.3% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.4% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.5% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.6% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.7% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.8% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n5.9% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n+6% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.1% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.15% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.2% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.25% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.3% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.35% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.4% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.45% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.5% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.55% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.6% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.65% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.7% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.75% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.8% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.85% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.9% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n6.95% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n+7% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
          "Supports Attack and Spell Skills.\nWhile standing still, gains 1 stack of buff when using the supported skill. Stacks up to 6 time(s)\nThe buff lasts for another 0.5 s after you start moving\n7.05% additional damage for the supported skill for every stack of buffs while standing still (multiplies)",
        ],
      },
    ],
  },
  {
    type: "Support",
    name: "Wind Projectiles",
    tags: ["Projectile"],
    description: [
      "Supports Projectile Skills.\n+20% Projectile Speed for the supported skill\n15.5% additional damage for the supported skill",
      "+20% Projectile Speed for the supported skill\n15.5% additional damage for the supported skill",
    ],
    supportTargets: [{ tags: ["Projectile"] }],
    cannotSupportTargets: [],
    fixedAffixes: ["+20% Projectile Speed for the supported skill"],
    templates: [
      {
        template: "{value}% additional damage for the supported skill",
        levelValues: [
          15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
          22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
          29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        ],
      },
    ],
  },
] as const satisfies readonly BaseSupportSkill[];
