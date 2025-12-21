"use client";

interface ConfigFieldProps {
  label: string;
  description?: string;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  children: React.ReactNode;
}

export const ConfigField: React.FC<ConfigFieldProps> = ({
  label,
  description,
  enabled,
  onEnabledChange,
  children,
}) => {
  const inputId = `config-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={inputId}
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 accent-amber-500"
        />
        <label
          htmlFor={inputId}
          className="font-medium text-zinc-50 cursor-pointer"
        >
          {label}
        </label>
      </div>
      {enabled && <div>{children}</div>}
    </div>
  );
};
