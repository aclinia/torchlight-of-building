import { Pactspirits } from "./pactspirits";

export interface PactspiritRingDetails {
  name: string;
  affix: string;
}

export interface Pactspirit {
  type: string;
  rarity: string;
  name: string;
  innerRing1: PactspiritRingDetails;
  innerRing2: PactspiritRingDetails;
  innerRing3: PactspiritRingDetails;
  innerRing4: PactspiritRingDetails;
  innerRing5: PactspiritRingDetails;
  innerRing6: PactspiritRingDetails;
  midRing1: PactspiritRingDetails;
  midRing2: PactspiritRingDetails;
  midRing3: PactspiritRingDetails;
  affix1: string;
  affix2: string;
  affix3: string;
  affix4: string;
  affix5: string;
  affix6: string;
}
