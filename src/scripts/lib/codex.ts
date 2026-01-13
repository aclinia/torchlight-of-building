import { readFile } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";

export const readCodexHtml = async (): Promise<string> => {
  const htmlPath = join(process.cwd(), ".garbage", "codex2.html");
  return readFile(htmlPath, "utf-8");
};

export const cleanEffectText = (html: string): string => {
  // Replace <br> tags with newlines
  let text = html.replace(/<br\s*\/?>/gi, "\n");
  // Remove all other HTML tags
  text = text.replace(/<[^>]+>/g, "");
  // Fix mojibake dash: UTF-8 en-dash bytes misinterpreted as Windows-1252
  text = text.replace(/\u00e2\u20ac\u201c/g, "-");
  // Convert en-dash to hyphen
  text = text.replace(/\u2013/g, "-");
  // Decode common HTML entities
  text = text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
  // Trim each line and remove empty lines
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
};

// New Codex changes require an updated cleaning function
export const cleanEffectTextNew = (html: string): string => {
  // Use cheerio to properly parse HTML and remove tooltip spans with their data-title attributes
  // This handles: <span class="tooltip" data-title="...">text</span> -> text
  const $ = cheerio.load(html, null, false);

  // Replace tooltip spans with just their text content
  $("span.tooltip").each((_, el) => {
    $(el).replaceWith($(el).text());
  });

  // Get the cleaned HTML
  let text = $.html();

  // Replace <br> tags with newlines
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Extract values from <span class="val"> tags and replace with the content
  text = text.replace(/<span class="val">([^<]+)<\/span>/g, "$1");

  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // Fix mojibake dash: UTF-8 en-dash bytes misinterpreted as Windows-1252
  text = text.replace(/\u00e2\u20ac\u201c/g, "-");
  // Convert en-dash to hyphen
  text = text.replace(/\u2013/g, "-");

  // Decode common HTML entities
  text = text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Trim each line and remove empty lines
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
};
