import { expect, test } from "vitest";
import { Hyperlinks } from "@/src/data/hyperlink/hyperlinks";
import { parseMod } from "@/src/tli/mod-parser/index";

test("Blazing Sun hyperlink is parseable via parseMod", () => {
  const blazingSun = Hyperlinks["Blazing Sun"];
  const result = parseMod(blazingSun);
  expect(result).not.toBe(undefined);
});
