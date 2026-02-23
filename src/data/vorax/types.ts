export interface VoraxLimbData {
  name: string;
  legendaryNames: string[];
  craftableAffixes: {
    craftableAffix: string;
    tier: string;
    affixType: "Basic" | "Advanced" | "Ultimate";
  }[];
  baseAffixes: { affix: string; tier: string }[];
}
