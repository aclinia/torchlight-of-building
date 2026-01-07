interface ExistingAffixDisplayProps {
  value: string;
  onDelete: () => void;
}

export const ExistingAffixDisplay = ({
  value,
  onDelete,
}: ExistingAffixDisplayProps): React.ReactElement => {
  return (
    <div className="rounded-lg bg-zinc-800 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 whitespace-pre-line text-sm font-medium text-amber-400">
          {value}
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="ml-2 text-xs font-medium text-red-500 hover:text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
