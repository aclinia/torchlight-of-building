"use client";

import { useState } from "react";
import { DivinityPage, DivinitySlate } from "@/src/app/lib/save-data";
import {
  GRID_MASK,
  GRID_ROWS,
  GRID_COLS,
  DISPLAY_ROW_START,
  DISPLAY_ROW_END,
  DISPLAY_COL_START,
  DISPLAY_COL_END,
  findSlateAtCell,
  findOverlappingCells,
  findOutOfBoundsCells,
} from "@/src/app/lib/divinity-grid";
import {
  getOccupiedCells,
  getTransformedCells,
} from "@/src/app/lib/divinity-shapes";
import { DivinityGridCell } from "./DivinityGridCell";

interface DivinityGridProps {
  divinityPage: DivinityPage;
  divinitySlateList: DivinitySlate[];
  onClickPlacedSlate: (slateId: string) => void;
  onMoveSlate: (
    slateId: string,
    position: { row: number; col: number },
  ) => void;
}

export const DivinityGrid: React.FC<DivinityGridProps> = ({
  divinityPage,
  divinitySlateList,
  onClickPlacedSlate,
  onMoveSlate,
}) => {
  const [draggedSlateId, setDraggedSlateId] = useState<string | undefined>();
  const [dropTarget, setDropTarget] = useState<
    { row: number; col: number } | undefined
  >();

  const overlappingCells = findOverlappingCells(
    divinitySlateList,
    divinityPage.placedSlates,
  );
  const outOfBoundsCells = findOutOfBoundsCells(
    divinitySlateList,
    divinityPage.placedSlates,
  );
  const invalidCells = new Set([...overlappingCells, ...outOfBoundsCells]);
  const hasInvalidState = invalidCells.size > 0;

  // Build set of all cells occupied by the dragged slate at its current position
  const draggedSlateCells = new Set<string>();
  // Build set of preview cells where the slate would land
  const previewCells = new Set<string>();
  const draggedSlate = draggedSlateId
    ? divinitySlateList.find((s) => s.id === draggedSlateId)
    : undefined;

  if (draggedSlateId && draggedSlate) {
    const placement = divinityPage.placedSlates.find(
      (p) => p.slateId === draggedSlateId,
    );
    if (placement) {
      const cells = getOccupiedCells(draggedSlate, placement);
      cells.forEach(([r, c]) => draggedSlateCells.add(`${r},${c}`));
    }

    // Calculate preview position
    if (dropTarget) {
      const shapeCells = getTransformedCells(
        draggedSlate.shape,
        draggedSlate.rotation,
        draggedSlate.flippedH,
        draggedSlate.flippedV,
      );
      shapeCells.forEach(([r, c]) => {
        previewCells.add(`${r + dropTarget.row},${c + dropTarget.col}`);
      });
    }
  }

  // Check if a cell is within the valid grid bounds (for GRID_MASK lookup)
  const isInGridBounds = (row: number, col: number): boolean => {
    return row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS;
  };

  // Check if a cell is a valid placement cell (within mask)
  const isValidGridCell = (row: number, col: number): boolean => {
    if (!isInGridBounds(row, col)) return false;
    return GRID_MASK[row][col] === 1;
  };

  const getCellSlateId = (row: number, col: number): string | undefined => {
    const placed = findSlateAtCell(
      row,
      col,
      divinitySlateList,
      divinityPage.placedSlates,
    );
    return placed?.slateId;
  };

  const getSlateEdges = (
    row: number,
    col: number,
    slateId: string | undefined,
  ) => {
    if (!slateId) return undefined;
    return {
      top: getCellSlateId(row - 1, col) !== slateId,
      right: getCellSlateId(row, col + 1) !== slateId,
      bottom: getCellSlateId(row + 1, col) !== slateId,
      left: getCellSlateId(row, col - 1) !== slateId,
    };
  };

  const handleCellClick = (row: number, col: number) => {
    const placed = findSlateAtCell(
      row,
      col,
      divinitySlateList,
      divinityPage.placedSlates,
    );
    if (placed) {
      onClickPlacedSlate(placed.slateId);
    }
  };

  const handleDragStart = (slateId: string, e: React.DragEvent) => {
    // Create invisible drag image so browser doesn't show single cell
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    e.dataTransfer.setDragImage(img, 0, 0);
    e.dataTransfer.effectAllowed = "move";
    setDraggedSlateId(slateId);
  };

  const handleDragEnd = () => {
    setDraggedSlateId(undefined);
    setDropTarget(undefined);
  };

  const handleDragOver = (row: number, col: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedSlateId) {
      setDropTarget({ row, col });
    }
  };

  const handleDrop = (row: number, col: number) => {
    if (draggedSlateId) {
      onMoveSlate(draggedSlateId, { row, col });
    }
    setDraggedSlateId(undefined);
    setDropTarget(undefined);
  };

  const rows = [];
  for (let row = DISPLAY_ROW_START; row < DISPLAY_ROW_END; row++) {
    const cells = [];
    for (let col = DISPLAY_COL_START; col < DISPLAY_COL_END; col++) {
      const isValid = isValidGridCell(row, col);
      const isOutOfBounds = !isInGridBounds(row, col) || !isValid;
      const cellSlateId = getCellSlateId(row, col);
      const cellSlate = cellSlateId
        ? divinitySlateList.find((s) => s.id === cellSlateId)
        : undefined;
      const slateEdges = getSlateEdges(row, col, cellSlateId);
      const isInvalid = invalidCells.has(`${row},${col}`);
      const isDragging = draggedSlateCells.has(`${row},${col}`);
      const isPreview = previewCells.has(`${row},${col}`);

      cells.push(
        <DivinityGridCell
          key={`${row}-${col}`}
          row={row}
          col={col}
          isOutOfBounds={isOutOfBounds}
          slate={cellSlate}
          slateEdges={slateEdges}
          isInvalid={isInvalid}
          isDragging={isDragging}
          isPreview={isPreview}
          previewSlate={isPreview ? draggedSlate : undefined}
          onClick={() => handleCellClick(row, col)}
          onDragStart={
            cellSlateId ? (e) => handleDragStart(cellSlateId, e) : undefined
          }
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(row, col, e)}
          onDrop={() => handleDrop(row, col)}
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
    <div className="flex flex-col gap-2">
      <div className="inline-block rounded-lg bg-zinc-900 p-2">{rows}</div>
      {hasInvalidState && (
        <div className="flex items-center gap-2 rounded bg-red-900/50 px-3 py-2 text-sm text-red-200">
          <span className="text-red-400">⚠</span>
          <span>
            {overlappingCells.size > 0 && outOfBoundsCells.size > 0
              ? "Slates are overlapping and out of bounds"
              : overlappingCells.size > 0
                ? "Slates are overlapping"
                : "Slate is out of bounds"}
          </span>
        </div>
      )}
    </div>
  );
};
