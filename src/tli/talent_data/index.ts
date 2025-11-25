import { TalentTreeData } from "../core";
import type { TreeName } from "../talent_tree_types";

// Import all profession trees
import { WARRIOR } from "./warrior";
import { WARLORD } from "./warlord";
import { ONSLAUGHTER } from "./onslaughter";
import { THE_BRAVE } from "./the_brave";
import { MARKSMAN } from "./marksman";
import { BLADERUNNER } from "./bladerunner";
import { DRUID } from "./druid";
import { ASSASSIN } from "./assassin";
import { MAGISTER } from "./magister";
import { ARCANIST } from "./arcanist";
import { ELEMENTALIST } from "./elementalist";
import { PROPHET } from "./prophet";
import { SHADOWDANCER } from "./shadowdancer";
import { RANGER } from "./ranger";
import { SENTINEL } from "./sentinel";
import { SHADOWMASTER } from "./shadowmaster";
import { PSYCHIC } from "./psychic";
import { WARLOCK } from "./warlock";
import { LICH } from "./lich";
import { MACHINIST } from "./machinist";
import { STEEL_VANGUARD } from "./steel_vanguard";
import { ALCHEMIST } from "./alchemist";
import { ARTISAN } from "./artisan";
import { RONIN } from "./ronin";

// Import god/goddess trees
import { GOD_OF_WAR } from "./god_of_war";
import { GOD_OF_MIGHT } from "./god_of_might";
import { GOD_OF_MACHINES } from "./god_of_machines";
import { GODDESS_OF_HUNTING } from "./goddess_of_hunting";
import { GODDESS_OF_KNOWLEDGE } from "./goddess_of_knowledge";
import { GODDESS_OF_DECEPTION } from "./goddess_of_deception";

// Create mapping from TreeName to TalentTreeData
export const TALENT_TREES: Record<TreeName, TalentTreeData> = {
  Warrior: WARRIOR,
  Warlord: WARLORD,
  Onslaughter: ONSLAUGHTER,
  The_Brave: THE_BRAVE,
  Marksman: MARKSMAN,
  Bladerunner: BLADERUNNER,
  Druid: DRUID,
  Assassin: ASSASSIN,
  Magister: MAGISTER,
  Arcanist: ARCANIST,
  Elementalist: ELEMENTALIST,
  Prophet: PROPHET,
  Shadowdancer: SHADOWDANCER,
  Ranger: RANGER,
  Sentinel: SENTINEL,
  Shadowmaster: SHADOWMASTER,
  Psychic: PSYCHIC,
  Warlock: WARLOCK,
  Lich: LICH,
  Machinist: MACHINIST,
  Steel_Vanguard: STEEL_VANGUARD,
  Alchemist: ALCHEMIST,
  Artisan: ARTISAN,
  Ronin: RONIN,
  God_of_War: GOD_OF_WAR,
  God_of_Might: GOD_OF_MIGHT,
  God_of_Machines: GOD_OF_MACHINES,
  Goddess_of_Hunting: GODDESS_OF_HUNTING,
  Goddess_of_Knowledge: GODDESS_OF_KNOWLEDGE,
  Goddess_of_Deception: GODDESS_OF_DECEPTION,
};

// Helper function to get a talent tree by name
export const getTalentTree = (treeName: TreeName): TalentTreeData => {
  return TALENT_TREES[treeName];
};
