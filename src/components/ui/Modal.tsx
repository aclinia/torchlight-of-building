import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  dismissible?: boolean;
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
  dismissible = true,
}: ModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen && dismissible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, dismissible, handleKeyDown]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={dismissible ? onClose : undefined}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className={`relative bg-zinc-900 rounded-lg shadow-xl p-4 ${maxWidthClasses[maxWidth]} w-full mx-4 border border-zinc-700`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-zinc-50">{title}</h2>
          {!dismissible && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
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
