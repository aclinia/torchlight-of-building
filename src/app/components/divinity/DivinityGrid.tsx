"use client";

import { useState } from "react";
import {
  RawDivinityPage,
  RawDivinitySlate,
} from "@/src/tli/core";
import {
  GRID_MASK,
  GRID_ROWS,
  GRID_COLS,
  buildOccupiedCellsSet,
  canPlaceSlate,
  findSlateAtCell,
} from "@/src/app/lib/divinity-grid";
import { getTransformedCells } from "@/src/app/lib/divinity-shapes";
import { DivinityGridCell } from "./DivinityGridCell";

interface DivinityGridProps {
  divinityPage: RawDivinityPage;
  divinitySlateList: RawDivinitySlate[];
  selectedSlate: RawDivinitySlate | undefined;
  onPlaceAtPosition: (position: { row: number; col: number }) => void;
  onClickPlacedSlate: (slateId: string) => void;
}

export const DivinityGrid: React.FC<DivinityGridProps> = ({
  divinityPage,
  divinitySlateList,
  selectedSlate,
  onPlaceAtPosition,
  onClickPlacedSlate,
}) => {
  const [hoverPosition, setHoverPosition] = useState<{ row: number; col: number } | undefined>();

  const occupiedCells = buildOccupiedCellsSet(divinitySlateList, divinityPage.placedSlates);

  const getPreviewCells = (): Set<string> => {
    if (!selectedSlate || !hoverPosition) return new Set();

    const cells = getTransformedCells(
      selectedSlate.shape,
      selectedSlate.rotation,
      selectedSlate.flippedH,
      selectedSlate.flippedV,
    );

    return new Set(
      cells.map(([r, c]) => `${r + hoverPosition.row},${c + hoverPosition.col}`),
    );
  };

  const isValidPlacement = (): boolean => {
    if (!selectedSlate || !hoverPosition) return false;

    return canPlaceSlate(
      selectedSlate.shape,
      hoverPosition,
      selectedSlate.rotation,
      selectedSlate.flippedH,
      selectedSlate.flippedV,
      occupiedCells,
    );
  };

  const getCellSlateId = (row: number, col: number): string | undefined => {
    const placed = findSlateAtCell(row, col, divinitySlateList, divinityPage.placedSlates);
    return placed?.slateId;
  };

  const getSlateEdges = (row: number, col: number, slateId: string | undefined) => {
    if (!slateId) return undefined;
    return {
      top: getCellSlateId(row - 1, col) !== slateId,
      right: getCellSlateId(row, col + 1) !== slateId,
      bottom: getCellSlateId(row + 1, col) !== slateId,
      left: getCellSlateId(row, col - 1) !== slateId,
    };
  };

  const previewCells = getPreviewCells();
  const validPlacement = isValidPlacement();

  const handleCellClick = (row: number, col: number) => {
    if (selectedSlate && validPlacement && hoverPosition?.row === row && hoverPosition?.col === col) {
      onPlaceAtPosition({ row, col });
    } else {
      const placed = findSlateAtCell(row, col, divinitySlateList, divinityPage.placedSlates);
      if (placed) {
        onClickPlacedSlate(placed.slateId);
      }
    }
  };

  const handleCellHover = (row: number, col: number) => {
    if (selectedSlate) {
      setHoverPosition({ row, col });
    }
  };

  const handleMouseLeave = () => {
    setHoverPosition(undefined);
  };

  const rows = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const cells = [];
    for (let col = 0; col < GRID_COLS; col++) {
      const isValid = GRID_MASK[row][col] === 1;
      const isOccupied = occupiedCells.has(`${row},${col}`);
      const isPreview = previewCells.has(`${row},${col}`);
      const cellSlateId = getCellSlateId(row, col);
      const cellSlate = cellSlateId ? divinitySlateList.find((s) => s.id === cellSlateId) : undefined;
      const slateEdges = getSlateEdges(row, col, cellSlateId);

      cells.push(
        <DivinityGridCell
          key={`${row}-${col}`}
          row={row}
          col={col}
          isValid={isValid}
          isOccupied={isOccupied}
          isPreview={isPreview}
          isValidPlacement={validPlacement}
          slate={cellSlate}
          selectedSlate={selectedSlate}
          slateEdges={slateEdges}
          onClick={() => handleCellClick(row, col)}
          onMouseEnter={() => handleCellHover(row, col)}
        />,
      );
    }
    rows.push(
      <div key={row} className="flex">
        {cells}
      </div>,
    );
  }

  return (
    <div
      className="inline-block rounded-lg bg-zinc-900 p-2"
      onMouseLeave={handleMouseLeave}
    >
      {rows}
    </div>
  );
};
