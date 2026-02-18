import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";
import { program } from "commander";
import type {
  TalentNodeData,
  TalentTreeData,
  TreeName,
} from "../data/talent-tree/types";
import { ALL_TREES, isTreeName } from "../data/talent-tree/types";

// ============================================================================
// Fetching
// ============================================================================

const BASE_URL = "https://tlidb.com/en";
const TALENT_TREE_DIR = join(process.cwd(), ".garbage", "tlidb", "talent_tree");

const fetchPage = async (url: string): Promise<string> => {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

const fetchTalentTreePages = async (): Promise<void> => {
  await mkdir(TALENT_TREE_DIR, { recursive: true });

  for (let i = 0; i < ALL_TREES.length; i++) {
    const treeName = ALL_TREES[i];
    const url = `${BASE_URL}/${treeName}`;
    const filepath = join(TALENT_TREE_DIR, `${treeName}.html`);

    try {
      const html = await fetchPage(url);
      await writeFile(filepath, html);
      console.log(`[${i + 1}/${ALL_TREES.length}] Saved: ${filepath}`);
    } catch (error) {
      console.error(`Error fetching ${treeName}:`, error);
    }
  }

  console.log("Fetching complete!");
};

// ============================================================================
// Parsing
// ============================================================================

interface NodeData {
  cx: number;
  cy: number;
  gridX: number;
  gridY: number;
  type: "micro" | "medium" | "legendary";
  rawAffix: string;
  maxPoints: number;
  iconName: string;
}

const TALENT_TYPE_MAP: Record<string, "micro" | "medium" | "legendary"> = {
  "1": "micro",
  "3": "medium",
  "4": "legendary",
};

const pixelToGrid = (cx: number, cy: number): { x: number; y: number } => {
  const gridX = Math.round((cx - 96) / 128);
  const gridY = Math.round((cy - 80) / 96);
  return { x: gridX, y: gridY };
};

const decodeHtmlEntities = (text: string): string => {
  const $ = cheerio.load(`<div>${text}</div>`);
  return $("div").html() || text;
};

const parseAffix = (htmlContent: string): string => {
  const decoded = decodeHtmlEntities(htmlContent);
  const $ = cheerio.load(decoded);

  $("div.fw-bold").remove();
  const text = $.text().trim();

  if (!text) return "";

  const affix = decoded
    .replace(/<div[^>]*>.*?<\/div>/gi, "")
    .split(/<br\s*\/?>/i)
    .map((line) => cheerio.load(line).text().trim())
    .filter((line) => line.length > 0)
    .join("\n");

  return affix;
};

const parseProfessionTree = async (
  professionName: TreeName,
): Promise<TalentTreeData> => {
  const filepath = join(TALENT_TREE_DIR, `${professionName}.html`);
  const html = await readFile(filepath, "utf-8");
  const $ = cheerio.load(html, { xmlMode: false });

  const nodesData: NodeData[] = [];

  $("circle.talent_bg").each((_, circle) => {
    const $circle = $(circle);
    const cx = parseFloat($circle.attr("cx") || "0");
    const cy = parseFloat($circle.attr("cy") || "0");

    const classAttr = $circle.attr("class") || "";
    const typeMatch = classAttr.match(/talent_type(\d+)/);
    if (!typeMatch) return;

    const typeNum = typeMatch[1];
    const type = TALENT_TYPE_MAP[typeNum];
    if (!type) return;

    const imageX = cx - 32;
    const imageY = cy - 32;
    const $image = $(`image.talent[x="${imageX}"][y="${imageY}"]`);

    if ($image.length === 0) return;

    const tooltipHtml = $image.attr("data-bs-title") || "";
    const rawAffix = parseAffix(tooltipHtml);

    const href = $image.attr("xlink:href") || $image.attr("href") || "";
    const iconMatch = href.match(/\/(\w+)_64\.webp$/);
    const iconName = iconMatch ? iconMatch[1] : "";

    const textX = cx + 22;
    const $levelUpText = $(`text.level_up_time[x="${textX}"]`).filter(
      (_, el) => {
        const y = parseFloat($(el).attr("y") || "0");
        return Math.abs(y - (cy + 26)) < 5;
      },
    );

    const maxPoints = parseInt($levelUpText.text() || "0", 10);

    const { x: gridX, y: gridY } = pixelToGrid(cx, cy);

    nodesData.push({
      cx,
      cy,
      gridX,
      gridY,
      type,
      rawAffix,
      maxPoints,
      iconName,
    });
  });

  const CIRCLE_RADIUS = 32;

  const findNodeByEdge = (
    edgeX: number,
    edgeY: number,
    isRightEdge: boolean,
  ): NodeData | undefined => {
    const cx = isRightEdge ? edgeX - CIRCLE_RADIUS : edgeX + CIRCLE_RADIUS;

    return nodesData.find((node) => {
      return Math.abs(node.cx - cx) <= 5 && Math.abs(node.cy - edgeY) <= 40;
    });
  };

  const talentNodes: TalentNodeData[] = nodesData.map((node) => {
    const nodeLeftEdge = node.cx - CIRCLE_RADIUS;

    const connection = $("g.connections line")
      .filter((_, line) => {
        const $line = $(line);
        const x1 = parseFloat($line.attr("x1") || "0");
        const y1 = parseFloat($line.attr("y1") || "0");

        return Math.abs(x1 - nodeLeftEdge) <= 5 && Math.abs(y1 - node.cy) <= 40;
      })
      .first();

    let prerequisite: { x: number; y: number } | undefined;
    if (connection.length > 0) {
      const x2 = parseFloat(connection.attr("x2") || "0");
      const y2 = parseFloat(connection.attr("y2") || "0");

      const prereqNode = findNodeByEdge(x2, y2, true);
      if (prereqNode) {
        prerequisite = { x: prereqNode.gridX, y: prereqNode.gridY };
      }
    }

    return {
      nodeType: node.type,
      rawAffix: node.rawAffix,
      position: { x: node.gridX, y: node.gridY },
      ...(prerequisite && { prerequisite }),
      maxPoints: node.maxPoints,
      iconName: node.iconName,
    };
  });

  return { name: professionName, nodes: talentNodes };
};

const generateDataFile = (trees: TalentTreeData[]): string => {
  return `// This file is machine-generated. Do not modify manually.
// To regenerate, run: pnpm exec tsx src/scripts/generate-talent-tree-data.ts
import type { TalentTreeData } from "./types";

export const TalentTrees: readonly TalentTreeData[] = ${JSON.stringify(trees)};
`;
};

interface Options {
  refetch: boolean;
}

const main = async (options: Options): Promise<void> => {
  if (options.refetch) {
    console.log("Refetching talent tree pages from tlidb...\n");
    await fetchTalentTreePages();
    console.log("");
  }

  const outDir = join(process.cwd(), "src", "data", "talent-tree");

  console.log(`Parsing ${ALL_TREES.length} talent trees...\n`);

  const trees: TalentTreeData[] = [];
  let successCount = 0;

  for (let i = 0; i < ALL_TREES.length; i++) {
    const treeName = ALL_TREES[i];
    console.log(`[${i + 1}/${ALL_TREES.length}] Parsing ${treeName}...`);

    if (!isTreeName(treeName)) {
      console.error(`  Invalid tree name: ${treeName}`);
      continue;
    }

    try {
      const tree = await parseProfessionTree(treeName);
      trees.push(tree);
      console.log(`  Found ${tree.nodes.length} nodes`);
      successCount++;
    } catch (error) {
      console.error(`  Failed to parse ${treeName}:`, error);
    }
  }

  // Sort by tree name for consistent output
  trees.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`\nExtracted ${successCount}/${ALL_TREES.length} talent trees`);

  await mkdir(outDir, { recursive: true });

  const dataPath = join(outDir, "talent-trees.ts");
  await writeFile(dataPath, generateDataFile(trees), "utf-8");
  console.log(`Generated talent-trees.ts`);

  console.log("\nCode generation complete!");
  execSync("pnpm format", { stdio: "inherit" });
};

program
  .description("Generate talent tree data from cached HTML pages")
  .option("--refetch", "Refetch HTML pages from tlidb before generating")
  .action((options: Options) => {
    main(options)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error("Script failed:", error);
        process.exit(1);
      });
  })
  .parse();
