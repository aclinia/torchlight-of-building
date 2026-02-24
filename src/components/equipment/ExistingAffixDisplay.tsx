interface ExistingAffixDisplayProps {
  value: string;
  onDelete: () => void;
}

export const ExistingAffixDisplay = ({
  value,
  onDelete,
}: ExistingAffixDisplayProps): React.ReactElement => {
  return (
    <div className="rounded border border-zinc-700 bg-zinc-900 p-2">
      <div className="flex">
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
