"use client";

import { SlateShape, DivinityGod, Rotation } from "@/src/app/lib/save-data";
import {
  getTransformedCells,
  applyRotation,
} from "@/src/app/lib/divinity-shapes";
import { GOD_COLORS } from "@/src/app/lib/divinity-utils";

interface SlatePreviewProps {
  shape: SlateShape;
  god: DivinityGod;
  rotation?: Rotation;
  flippedH?: boolean;
  flippedV?: boolean;
  size?: "small" | "medium" | "large";
}

export const SlatePreview: React.FC<SlatePreviewProps> = ({
  shape,
  god,
  rotation = 0,
  flippedH = false,
  flippedV = false,
  size = "medium",
}) => {
  const cells = getTransformedCells(shape, rotation, flippedH, flippedV);
  const { bounds } = applyRotation(shape, rotation);

  const cellSize = size === "small" ? 8 : size === "medium" ? 12 : 16;
  const gap = 1;

  const cellSet = new Set(cells.map(([r, c]) => `${r},${c}`));

  const gridRows = [];
  for (let row = 0; row < bounds.rows; row++) {
    const rowCells = [];
    for (let col = 0; col < bounds.cols; col++) {
      const isFilled = cellSet.has(`${row},${col}`);
      rowCells.push(
        <div
          key={`${row}-${col}`}
          className={`${isFilled ? GOD_COLORS[god] : "bg-transparent"}`}
          style={{
            width: cellSize,
            height: cellSize,
            borderRadius: 2,
          }}
        />,
      );
    }
    gridRows.push(
      <div key={row} className="flex" style={{ gap }}>
        {rowCells}
      </div>,
    );
  }

  return (
    <div className="flex flex-col" style={{ gap }}>
      {gridRows}
    </div>
  );
};
