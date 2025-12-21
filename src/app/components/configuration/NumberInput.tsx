"use client";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const parsed = Number(e.target.value);
    if (!Number.isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      onChange(clamped);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        className="w-20 rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-center text-zinc-50 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
      />
      <label className="text-sm text-zinc-400">{label}</label>
    </div>
  );
};
