"use client";

import { RawDivinitySlate } from "@/src/tli/core";
import { GOD_COLORS } from "@/src/app/lib/divinity-utils";

interface SlateEdges {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

interface DivinityGridCellProps {
  row: number;
  col: number;
  isValid: boolean;
  isOccupied: boolean;
  isPreview: boolean;
  isValidPlacement: boolean;
  slate: RawDivinitySlate | undefined;
  selectedSlate: RawDivinitySlate | undefined;
  slateEdges: SlateEdges | undefined;
  onClick: () => void;
  onMouseEnter: () => void;
}

export const DivinityGridCell: React.FC<DivinityGridCellProps> = ({
  isValid,
  isOccupied,
  isPreview,
  isValidPlacement,
  slate,
  selectedSlate,
  slateEdges,
  onClick,
  onMouseEnter,
}) => {
  if (!isValid) {
    return <div className="h-12 w-12" />;
  }

  const getBackgroundClass = (): string => {
    if (isPreview && selectedSlate) {
      if (isValidPlacement) {
        return `${GOD_COLORS[selectedSlate.god]} opacity-50`;
      }
      return "bg-red-500 opacity-50";
    }

    if (slate) {
      return GOD_COLORS[slate.god];
    }

    return "bg-zinc-800";
  };

  const getBorderClass = (): string => {
    if (isPreview && !isValidPlacement) {
      return "border-2 border-red-400";
    }
    if (isPreview && isValidPlacement) {
      return "border-2 border-white";
    }
    return "border border-zinc-700";
  };

  const getOutlineStyle = (): React.CSSProperties => {
    if (!slate || !slateEdges) return {};

    const borderColor = "rgba(255, 255, 255, 0.7)";
    const borderWidth = "3px";
    const style: React.CSSProperties = { boxSizing: "border-box" };

    if (slateEdges.top) style.borderTop = `${borderWidth} solid ${borderColor}`;
    if (slateEdges.right) style.borderRight = `${borderWidth} solid ${borderColor}`;
    if (slateEdges.bottom) style.borderBottom = `${borderWidth} solid ${borderColor}`;
    if (slateEdges.left) style.borderLeft = `${borderWidth} solid ${borderColor}`;

    return style;
  };

  const getCursorClass = (): string => {
    if (selectedSlate) {
      return isValidPlacement && isPreview ? "cursor-pointer" : "cursor-not-allowed";
    }
    if (slate) {
      return "cursor-pointer";
    }
    return "cursor-default";
  };

  return (
    <div
      className={`h-12 w-12 transition-colors ${getBackgroundClass()} ${getBorderClass()} ${getCursorClass()}`}
      style={getOutlineStyle()}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    />
  );
};
