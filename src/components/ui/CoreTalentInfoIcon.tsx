import { useRef, useState } from "react";
import { CoreTalentMods } from "@/src/data/core_talent/core_talent_mods";
import type { CoreTalentName } from "@/src/data/core_talent/types";
import { ModNotImplementedIcon } from "./ModNotImplementedIcon";

const TOOLTIP_WIDTH = 280;
const VIEWPORT_PADDING = 8;

interface CoreTalentInfoIconProps {
  talentName: CoreTalentName;
}

export const CoreTalentInfoIcon: React.FC<CoreTalentInfoIconProps> = ({
  talentName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOnLeft, setShowOnLeft] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);

  const talentMods = CoreTalentMods[talentName];

  const handleMouseEnter = (): void => {
    if (iconRef.current !== null) {
      const rect = iconRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right - VIEWPORT_PADDING;
      setShowOnLeft(spaceOnRight < TOOLTIP_WIDTH);
    }
    setIsHovered(true);
  };

  return (
    <span
      ref={iconRef}
      className="relative ml-1 inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-cyan-500 cursor-help"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      {isHovered && (
        <div
          className={`absolute top-0 z-50 rounded bg-zinc-800 border border-zinc-600 p-2 shadow-lg ${
            showOnLeft ? "right-4" : "left-4"
          }`}
          style={{ width: TOOLTIP_WIDTH }}
        >
          <div className="font-semibold text-amber-400 text-xs mb-2">
            {talentName}
          </div>
          <ul className="space-y-1">
            {talentMods.affixLines.map((line, idx) => (
              <li key={idx} className="text-xs text-zinc-300 flex items-center">
                <span>{line.text}</span>
                {line.mods === undefined && <ModNotImplementedIcon />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
};
