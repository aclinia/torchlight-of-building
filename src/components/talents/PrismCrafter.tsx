import { useEffect, useMemo, useState } from "react";
import {
  SearchableSelect,
  type SearchableSelectOption,
} from "@/src/components/ui/SearchableSelect";
import { i18n } from "@/src/lib/i18n";
import {
  getAreaAffixes,
  getBaseAffixes,
  getLegendaryGaugeAffixes,
  getMutationAffixes,
  getRareGaugeAffixes,
} from "@/src/lib/prism-utils";
import { generateItemId } from "@/src/lib/storage";
import {
  type CraftedPrism,
  PRISM_RARITIES,
  type PrismRarity,
} from "@/src/tli/core";

// Classify a gauge affix string into its slot type
const classifyGaugeAffix = (affix: string): "area" | "rare" | "legendary" => {
  if (affix.startsWith("The Effect Area expands to")) return "area";
  if (affix.startsWith("All Legendary Medium Talent")) return "legendary";
  if (affix.startsWith("Points can be allocated to all")) return "legendary";
  if (affix.includes("Mutated Core Talents")) return "legendary";
  return "rare";
};

interface PrismCrafterProps {
  editingPrism: CraftedPrism | undefined;
  onSave: (prism: CraftedPrism) => void;
  onCancel?: () => void;
}

export const PrismCrafter: React.FC<PrismCrafterProps> = ({
  editingPrism,
  onSave,
  onCancel,
}) => {
  const [rarity, setRarity] = useState<PrismRarity>(
    editingPrism?.rarity ?? "rare",
  );
  const [baseAffix, setBaseAffix] = useState<string | undefined>(
    editingPrism?.baseAffix,
  );
  const [areaAffix, setAreaAffix] = useState<string | undefined>(undefined);
  const [rareAffix, setRareAffix] = useState<string | undefined>(undefined);
  const [legendaryAffix, setLegendaryAffix] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (editingPrism !== undefined) {
      setRarity(editingPrism.rarity);
      setBaseAffix(editingPrism.baseAffix);

      // Decompose gaugeAffixes into slots
      let area: string | undefined;
      let rare: string | undefined;
      let legendary: string | undefined;
      for (const affix of editingPrism.gaugeAffixes) {
        const kind = classifyGaugeAffix(affix);
        if (kind === "area" && area === undefined) area = affix;
        else if (kind === "rare" && rare === undefined) rare = affix;
        else if (kind === "legendary" && legendary === undefined)
          legendary = affix;
      }
      setAreaAffix(area);
      setRareAffix(rare);
      setLegendaryAffix(legendary);
    } else {
      setBaseAffix(undefined);
      setAreaAffix(undefined);
      setRareAffix(undefined);
      setLegendaryAffix(undefined);
    }
  }, [editingPrism]);

  const baseAffixOptions = useMemo((): SearchableSelectOption<string>[] => {
    return getBaseAffixes(rarity).map((affix) => {
      let label = affix.affix;
      if (rarity === "rare") {
        const delimiterIndex = affix.affix.indexOf("Advanced Talent Panel:\n");
        if (delimiterIndex !== -1) {
          label = affix.affix.slice(
            delimiterIndex + "Advanced Talent Panel:\n".length,
          );
        }
      } else {
        const match = affix.affix.match(/with\s+(.+)$/);
        if (match !== null) {
          label = match[1];
        }
      }
      return { value: affix.affix, label: label.replaceAll("\n", " / ") };
    });
  }, [rarity]);

  const areaAffixOptions = useMemo((): SearchableSelectOption<string>[] => {
    return getAreaAffixes().map((affix) => ({
      value: affix.affix,
      label: affix.affix,
    }));
  }, []);

  const rareGaugeOptions = useMemo((): SearchableSelectOption<string>[] => {
    return getRareGaugeAffixes().map((affix) => ({
      value: affix.affix,
      label: affix.affix.split("\n")[0],
      sublabel: "Rare",
    }));
  }, []);

  const legendaryGaugeOptions =
    useMemo((): SearchableSelectOption<string>[] => {
      const gaugeAffixes = getLegendaryGaugeAffixes().map((affix) => ({
        value: affix.affix,
        label: affix.affix.split("\n")[0],
        sublabel: "Legendary Gauge",
      }));

      const mutationAffixes = getMutationAffixes().map((affix) => ({
        value: affix.affix,
        label: affix.affix.split("\n").at(-1) ?? affix.affix,
        sublabel: "Mutation",
      }));

      return [...gaugeAffixes, ...mutationAffixes];
    }, []);

  const handleRarityChange = (newRarity: PrismRarity): void => {
    if (newRarity === rarity) return;
    setRarity(newRarity);
    setBaseAffix(undefined);
    if (newRarity === "rare") {
      setLegendaryAffix(undefined);
    }
  };

  const handleSave = (): void => {
    if (baseAffix === undefined) return;

    // Compose gaugeAffixes from the individual slots
    const gaugeAffixes: string[] = [];
    if (areaAffix !== undefined) gaugeAffixes.push(areaAffix);
    if (rareAffix !== undefined) gaugeAffixes.push(rareAffix);
    if (legendaryAffix !== undefined) gaugeAffixes.push(legendaryAffix);

    const prism: CraftedPrism = {
      id: editingPrism?.id ?? generateItemId(),
      rarity,
      baseAffix,
      gaugeAffixes,
      areaAffix,
      rareAffix,
      legendaryAffix,
    };
    onSave(prism);

    if (editingPrism === undefined) {
      setAreaAffix(undefined);
      setRareAffix(undefined);
      setLegendaryAffix(undefined);
      setBaseAffix(undefined);
    }
  };

  const canSave = baseAffix !== undefined;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4">
      <h3 className="mb-4 text-lg font-medium text-zinc-200">
        {editingPrism !== undefined
          ? i18n._("Edit Prism")
          : i18n._("Craft Prism")}
      </h3>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">Rarity</label>
        <div className="flex gap-2">
          {PRISM_RARITIES.map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => handleRarityChange(r)}
              className={`rounded px-3 py-1 text-sm capitalize transition-colors ${
                rarity === r
                  ? r === "legendary"
                    ? "bg-orange-600 text-white"
                    : "bg-purple-600 text-white"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">Base Affix</label>
        <SearchableSelect
          value={baseAffix}
          onChange={setBaseAffix}
          options={baseAffixOptions}
          placeholder="Select base affix..."
        />
        {baseAffix !== undefined && (
          <div className="mt-2 rounded bg-zinc-900 p-2 text-xs text-zinc-300 whitespace-pre-line">
            {baseAffix}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">
          Area Expansion (optional)
        </label>
        <SearchableSelect
          value={areaAffix}
          onChange={setAreaAffix}
          options={areaAffixOptions}
          placeholder="Select area expansion..."
        />
        {areaAffix !== undefined && (
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-zinc-400">{areaAffix}</span>
            <button
              type="button"
              onClick={() => setAreaAffix(undefined)}
              className="text-xs text-zinc-500 hover:text-red-400"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-zinc-400">
          Rare Gauge Affix (optional)
        </label>
        <SearchableSelect
          value={rareAffix}
          onChange={setRareAffix}
          options={rareGaugeOptions}
          placeholder="Search rare gauge affixes..."
        />
        {rareAffix !== undefined && (
          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-purple-500" />
            <span className="text-xs text-zinc-300 truncate flex-1">
              {rareAffix.split("\n")[0]}
            </span>
            <button
              type="button"
              onClick={() => setRareAffix(undefined)}
              className="text-xs text-zinc-500 hover:text-red-400"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {rarity === "legendary" && (
        <div className="mb-4">
          <label className="mb-2 block text-sm text-zinc-400">
            Legendary / Mutation Affix (optional)
          </label>
          <SearchableSelect
            value={legendaryAffix}
            onChange={setLegendaryAffix}
            options={legendaryGaugeOptions}
            placeholder="Search legendary / mutation affixes..."
          />
          {legendaryAffix !== undefined && (
            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-orange-500" />
              <span className="text-xs text-zinc-300 truncate flex-1">
                {legendaryAffix.split("\n").at(-1)}
              </span>
              <button
                type="button"
                onClick={() => setLegendaryAffix(undefined)}
                className="text-xs text-zinc-500 hover:text-red-400"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="flex-1 rounded bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-zinc-600"
        >
          {editingPrism !== undefined ? "Update Prism" : "Save to Inventory"}
        </button>
        {onCancel !== undefined && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-zinc-700 px-4 py-2 text-zinc-200 transition-colors hover:bg-zinc-600"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
