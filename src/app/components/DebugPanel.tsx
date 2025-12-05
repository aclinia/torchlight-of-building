import { useState } from "react";
import type { SaveData } from "@/src/app/lib/save-data";
import type { Loadout } from "@/src/tli/core";

type DebugView = "saveData" | "loadout";

interface DebugPanelProps {
  saveData: SaveData;
  loadout: Loadout;
  debugPanelExpanded: boolean;
  setDebugPanelExpanded: (expanded: boolean) => void;
  onClose: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  saveData,
  loadout,
  debugPanelExpanded,
  setDebugPanelExpanded,
  onClose,
}) => {
  const [view, setView] = useState<DebugView>("saveData");

  const currentData = view === "saveData" ? saveData : loadout;
  const title =
    view === "saveData" ? "Debug: SaveData (Raw)" : "Debug: Loadout (Parsed)";

  const copyDebugJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(currentData, null, 2));
      alert(
        `${view === "saveData" ? "SaveData" : "Loadout"} JSON copied to clipboard!`,
      );
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t-2 border-amber-500 shadow-2xl z-50">
      {/* Panel Header */}
      <div className="bg-zinc-950 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-zinc-50">{title}</h3>
          <span className="text-xs text-zinc-500">
            {JSON.stringify(currentData).length} bytes
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setView(view === "saveData" ? "loadout" : "saveData")
            }
            className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-50 text-sm rounded transition-colors"
            title="Toggle between SaveData and Loadout views"
          >
            {view === "saveData" ? "View Parsed" : "View Raw"}
          </button>
          <button
            type="button"
            onClick={copyDebugJson}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 text-sm rounded transition-colors"
            title="Copy JSON to clipboard"
          >
            Copy JSON
          </button>
          <button
            type="button"
            onClick={() => setDebugPanelExpanded(!debugPanelExpanded)}
            className="px-3 py-1 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-50 text-sm rounded transition-colors"
          >
            {debugPanelExpanded ? "Minimize" : "Expand"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
            title="Close debug panel"
          >
            Close
          </button>
        </div>
      </div>

      {/* Panel Content */}
      {debugPanelExpanded && (
        <div className="p-4 overflow-auto" style={{ maxHeight: "400px" }}>
          <pre className="text-xs font-mono text-zinc-400 whitespace-pre-wrap break-words">
            {JSON.stringify(currentData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
