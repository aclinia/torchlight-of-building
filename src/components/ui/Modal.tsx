import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
} as const;

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: ModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className={`relative bg-zinc-900 rounded-lg shadow-xl p-6 ${maxWidthClasses[maxWidth]} w-full mx-4 border border-zinc-700`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-zinc-50">{title}</h2>
        {children}
      </div>
    </div>,
    document.body,
  );
};

interface ModalDescriptionProps {
  children: React.ReactNode;
}

export const ModalDescription = ({ children }: ModalDescriptionProps) => (
  <p className="text-sm text-zinc-400 mb-4">{children}</p>
);

interface ModalActionsProps {
  children: React.ReactNode;
}

export const ModalActions = ({ children }: ModalActionsProps) => (
  <div className="flex gap-3">{children}</div>
);

interface ModalButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const ModalButton = ({
  onClick,
  variant = "primary",
  disabled = false,
  children,
  fullWidth = false,
}: ModalButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
  const widthClass = fullWidth ? "flex-1" : "";

  const variantClasses =
    variant === "primary"
      ? disabled
        ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
        : "bg-amber-500 hover:bg-amber-600 text-zinc-950"
      : "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-50";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${widthClass} ${variantClasses}`}
    >
      {children}
    </button>
  );
};
