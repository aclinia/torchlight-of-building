# Import Items Guide

Import your in-game gear into the build planner using AI-assisted screenshot parsing.

## Steps

### 1. Take in-game screenshots

Open your inventory in Torchlight Infinite and hover over each piece of gear to show its tooltip. Take a screenshot of each item you want to import.

Make sure the **detailed view is not enabled** - you want the standard tooltip view.

![Example gear screenshot](assets/gear-example-1.png)

### 2. Upload screenshots to an AI chatbot

Upload your screenshots to [Claude](https://claude.ai) or [ChatGPT](https://chatgpt.com) with the following prompt:

````text
I've attached in-game screenshots of gear from the game Torchlight Infinite.
I'd like you to parse the affix text for the focused gear, which can be found in the rectangular gray tooltip near the center of the screen.
I'd like the following information from each item:
* Name, which can be found right below the gear tooltip picture, and above the level requirement, which itself reads as "Require Lv <number>"
* Equipment type and slot, which can be found on the line below level requirement
  * The type is outside the parentheses, and the slot is inside
  * example: "INT Helmet(Helmet)" would have type "INT Helmet" and slot "Helmet"
* Affixes, which are white or blue text with colored bullet points to their left. Only parse the left-aligned text with bullet points
   * do not parse center-aligned text without bullet points or the gold flavor text at the bottom
   * affixes may also contain newlines
Affixes may appear in both the upper and lower sections of the tooltip, separated by a divider line. Parse affixes from both sections. Also include any affixes that appear in colored text (yellow, red, cyan/blue) as long as they have a colored bullet point to their left.
Use the following json structure: `{name: string, equipmentType: string, equipmentSlot: string, affixes: string[]}`
For example:

```
{
  "name": "Ranger's Rusted Gauntlets",
  "equipmentType": "STR Gloves",
  "equipmentSlot": "Hands",
  "affixes": [
    "+10 Strength",
    "+30% Skill Area\n+30% Minion Skill Area"
  ]
}
```
````

### 3. Import into the build planner

1. Go to the **Equipment** tab
2. Click the **Import Items** button
3. Paste the JSON output from the AI chatbot
4. Click **Import**

The items will be added to your inventory and can be equipped from there.
