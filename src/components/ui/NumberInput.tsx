import { useEffect, useRef, useState } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/**
 * Number input that properly handles negative number typing.
 * Uses internal string state to allow intermediate values like "-" while typing.
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  className,
}) => {
  // Track raw string to allow typing "-" without it being rejected
  const [inputValue, setInputValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input with external value changes (but not during active editing)
  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setInputValue(String(value));
    }
  }, [value]);

  const clamp = (n: number): number => {
    let result = n;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value;
    setInputValue(raw);

    // Allow empty or just "-" for intermediate typing
    if (raw === "" || raw === "-") {
      return;
    }

    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) {
      onChange(clamp(parsed));
    }
  };

  const handleBlur = (): void => {
    // On blur, finalize the value
    const parsed = Number(inputValue);
    if (Number.isNaN(parsed) || inputValue === "" || inputValue === "-") {
      // Reset to current value if invalid
      setInputValue(String(value));
    } else {
      const clamped = clamp(parsed);
      setInputValue(String(clamped));
      if (clamped !== value) {
        onChange(clamped);
      }
    }
  };

  const increment = (): void => {
    const newValue = clamp(value + step);
    onChange(newValue);
    setInputValue(String(newValue));
  };

  const decrement = (): void => {
    const newValue = clamp(value - step);
    onChange(newValue);
    setInputValue(String(newValue));
  };

  return (
    <div className="flex items-center">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          className ??
          "w-20 rounded-l border border-r-0 border-zinc-700 bg-zinc-900 px-2 py-1 text-center text-sm text-zinc-50 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        }
      />
      <div className="flex flex-col">
        <button
          type="button"
          onClick={increment}
          className="flex h-[14px] w-5 items-center justify-center rounded-tr border border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
        >
          <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor">
            <path d="M4 2L7 5H1L4 2Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={decrement}
          className="flex h-[14px] w-5 items-center justify-center rounded-br border border-t-0 border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
        >
          <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor">
            <path d="M4 6L1 3H7L4 6Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
