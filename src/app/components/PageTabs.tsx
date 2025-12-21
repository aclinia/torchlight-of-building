import type { ActivePage } from "../lib/types";

interface PageTabsProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export const PageTabs: React.FC<PageTabsProps> = ({
  activePage,
  setActivePage,
}) => {
  return (
    <div className="mb-8 flex gap-4 border-b border-zinc-800">
      <button
        type="button"
        onClick={() => setActivePage("equipment")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "equipment"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Equipment
      </button>
      <button
        type="button"
        onClick={() => setActivePage("talents")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "talents"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Talents
      </button>
      <button
        type="button"
        onClick={() => setActivePage("skills")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "skills"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Skills
      </button>
      <button
        type="button"
        onClick={() => setActivePage("hero")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "hero"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Hero
      </button>
      <button
        type="button"
        onClick={() => setActivePage("pactspirit")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "pactspirit"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Pactspirit
      </button>
      <button
        type="button"
        onClick={() => setActivePage("divinity")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "divinity"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Divinity
      </button>
      <button
        type="button"
        onClick={() => setActivePage("configuration")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "configuration"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Configuration
      </button>
      <button
        type="button"
        onClick={() => setActivePage("calculations")}
        className={`px-6 py-3 font-medium transition-colors ${
          activePage === "calculations"
            ? "border-b-2 border-amber-500 text-amber-500"
            : "text-zinc-400 hover:text-zinc-50"
        }`}
      >
        Calculations
      </button>
    </div>
  );
};
