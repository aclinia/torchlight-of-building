import { useEffect, useState } from "react";
import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
} from "../ui/Modal";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildCode: string;
}

type CopiedType = "url" | "code" | undefined;

export const ExportModal = ({
  isOpen,
  onClose,
  buildCode,
}: ExportModalProps): React.ReactNode => {
  const [copiedType, setCopiedType] = useState<CopiedType>(undefined);
  const [codeExpanded, setCodeExpanded] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/import/${buildCode}`
      : "";

  const handleCopyUrl = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedType("url");
      setTimeout(() => setCopiedType(undefined), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleCopyCode = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(buildCode);
      setCopiedType("code");
      setTimeout(() => setCopiedType(undefined), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCopiedType(undefined);
      setCodeExpanded(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Loadout">
      <ModalDescription>
        Share your build with others using the URL below:
      </ModalDescription>

      <div className="bg-zinc-950 p-3 rounded-lg mb-4 max-h-32 overflow-auto border border-zinc-800">
        <code className="text-sm text-amber-400 break-all font-mono">
          {shareUrl}
        </code>
      </div>

      <details
        className="mb-4"
        open={codeExpanded}
        onToggle={(e) => setCodeExpanded(e.currentTarget.open)}
      >
        <summary className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
          Show raw build code
        </summary>
        <div className="mt-2 bg-zinc-950 p-3 rounded-lg max-h-32 overflow-auto border border-zinc-800">
          <code className="text-sm text-zinc-500 break-all font-mono">
            {buildCode}
          </code>
        </div>
        <button
          onClick={handleCopyCode}
          className={`mt-2 w-full px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            copiedType === "code"
              ? "bg-green-500 text-white"
              : "bg-zinc-700 hover:bg-zinc-600 text-zinc-50"
          }`}
        >
          {copiedType === "code" ? "Copied!" : "Copy Code"}
        </button>
      </details>

      <ModalActions>
        <button
          onClick={handleCopyUrl}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            copiedType === "url"
              ? "bg-green-500 text-white"
              : "bg-amber-500 hover:bg-amber-600 text-zinc-950"
          }`}
        >
          {copiedType === "url" ? "Copied!" : "Copy URL"}
        </button>
        <ModalButton onClick={onClose} variant="secondary">
          Close
        </ModalButton>
      </ModalActions>
    </Modal>
  );
};
