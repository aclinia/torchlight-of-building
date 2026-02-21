import {
  Tooltip,
  TooltipContent,
  TooltipTitle,
} from "@/src/components/ui/Tooltip";
import { useTooltip } from "@/src/hooks/useTooltip";
import type { Affix, InstalledDestiny, RingSlotState } from "@/src/tli/core";
import { isInnerRing } from "../../lib/pactspirit-utils";
import type { RingSlotKey } from "../../lib/types";

interface DestinySlotRowProps {
  displayName: string;
  subtitle: string;
  displayAffix: Affix;
  installedDestiny?: InstalledDestiny;
  className?: string;
  onAction: () => void;
  actionLabel: string;
  actionVariant: "install" | "revert";
}

export const DestinySlotRow: React.FC<DestinySlotRowProps> = ({
  displayName,
  subtitle,
  displayAffix,
  installedDestiny,
  className = "bg-zinc-800 border-zinc-700",
  onAction,
  actionLabel,
  actionVariant,
}) => {
  const { isVisible, triggerRef, triggerRect } = useTooltip();

  const hasDestiny = installedDestiny !== undefined;
  const titleText =
    hasDestiny && installedDestiny.destinyType !== undefined
      ? `${installedDestiny.destinyType}: ${displayName}`
      : displayName;

  return (
    <div className={`p-2 rounded-lg border ${className}`} ref={triggerRef}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-medium truncate ${
              hasDestiny ? "text-amber-400" : "text-zinc-200"
            }`}
          >
            {titleText}
          </div>
          <div className="text-xs text-zinc-500">{subtitle}</div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          {actionVariant === "revert" ? (
            <button
              onClick={onAction}
              className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
            >
              {actionLabel}
            </button>
          ) : (
            <button
              onClick={onAction}
              className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded text-xs"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>

      <Tooltip isVisible={isVisible} triggerRect={triggerRect}>
        <TooltipTitle>{titleText}</TooltipTitle>
        <TooltipContent>
          <div>
            {displayAffix.affixLines.map((line, lineIdx) => (
              <div
                key={lineIdx}
                className={
                  lineIdx > 0 ? "mt-1 pt-1 border-t border-zinc-800" : ""
                }
              >
                <div className="text-xs text-zinc-400">{line.text}</div>
                {line.mods === undefined && (
                  <div className="text-xs text-red-500">
                    (Mod not supported in TOB yet)
                  </div>
                )}
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

interface RingSlotProps {
  ringSlot: RingSlotKey;
  ringState: RingSlotState;
  onInstallClick: () => void;
  onRevert: () => void;
}

export const RingSlot: React.FC<RingSlotProps> = ({
  ringSlot,
  ringState,
  onInstallClick,
  onRevert,
}) => {
  const { installedDestiny } = ringState;
  const hasDestiny = installedDestiny !== undefined;
  const isInner = isInnerRing(ringSlot);

  const displayName = hasDestiny
    ? installedDestiny.destinyName
    : ringState.originalRingName;
  const displayAffix = hasDestiny
    ? installedDestiny.affix
    : ringState.originalAffix;

  return (
    <DestinySlotRow
      displayName={displayName}
      subtitle={isInner ? "Inner Ring" : "Mid Ring"}
      displayAffix={displayAffix}
      installedDestiny={ringState.installedDestiny}
      className={
        isInner
          ? "bg-zinc-800 border-zinc-700"
          : "bg-zinc-750 border-amber-700/50"
      }
      onAction={hasDestiny ? onRevert : onInstallClick}
      actionLabel={hasDestiny ? "Revert" : "Install"}
      actionVariant={hasDestiny ? "revert" : "install"}
    />
  );
};
