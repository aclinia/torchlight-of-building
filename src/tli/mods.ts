import { DmgModType, CritRatingModType, CritDmgModType } from "./constants";

export type Mod =
  | {
      type: "Str";
      value: number;
      mod: "pct" | "flat";
      src?: string;
    }
  | {
      type: "Dex";
      value: number;
      mod: "pct" | "flat";
      src?: string;
    }
  | {
      type: "Int";
      value: number;
      mod: "pct" | "flat";
      src?: string;
    }
  | {
      type: "DmgPct";
      value: number;
      addn: boolean;
      modType: DmgModType;
      src?: string;
    }
  | {
      type: "CritRatingPct";
      value: number;
      modType: CritRatingModType;
      src?: string;
    }
  | {
      type: "CritDmgPct";
      value: number;
      addn: boolean;
      modType: CritDmgModType;
      src?: string;
    }
  | {
      type: "AspdPct";
      value: number;
      addn: boolean;
      src?: string;
    }
  | {
      type: "CastSpeedPct";
      value: number;
      addn: boolean;
      src?: string;
    }
  | {
      type: "MinionAspdPct";
      value: number;
      addn: boolean;
      src?: string;
    }
  | {
      type: "MinionCastSpeedPct";
      value: number;
      addn: boolean;
      src?: string;
    }
  | {
      type: "FervorEffPct";
      value: number;
      src?: string;
    };
