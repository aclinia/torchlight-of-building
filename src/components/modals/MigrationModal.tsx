import { useEffect, useState } from "react";
import { Modal, ModalActions, ModalButton } from "@/src/components/ui/Modal";

const OLD_DOMAIN = "tpob.vercel.app";
const NEW_SITE_URL = "https://tlipob.com";

export const MigrationModal = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOldDomain = window.location.hostname === OLD_DOMAIN;
      if (isOldDomain) {
        setIsOpen(true);
      }
    }
  }, []);

  const handleGoToNewSite = (): void => {
    window.location.href = NEW_SITE_URL + window.location.pathname;
  };

  const handleStayHere = (): void => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleStayHere}
      title="We've Moved!"
      maxWidth="md"
    >
      <div className="space-y-4 text-zinc-300">
        <p>
          This site has moved to a new domain:{" "}
          <a
            href={NEW_SITE_URL}
            className="text-amber-400 font-medium hover:text-amber-300 underline"
          >
            tlipob.com
          </a>
        </p>
        <p>
          Please update your bookmarks. This old URL (tpob.vercel.app) may stop
          working in the future.
        </p>
        <p className="text-zinc-400 text-sm">
          If you have saved builds, export them first and import them into the
          new site.
        </p>
      </div>
      <div className="mt-6">
        <ModalActions>
          <ModalButton onClick={handleGoToNewSite} fullWidth>
            Go to tlipob.com
          </ModalButton>
          <ModalButton onClick={handleStayHere} variant="secondary" fullWidth>
            Stay here for now
          </ModalButton>
        </ModalActions>
      </div>
    </Modal>
  );
};
