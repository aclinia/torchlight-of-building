import { Hyperlinks } from "./hyperlinks";

export const HyperlinkNames = Object.keys(Hyperlinks);
export type HyperlinkName = keyof typeof Hyperlinks;
