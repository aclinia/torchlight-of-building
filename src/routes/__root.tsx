import { I18nProvider } from "@lingui/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { DisclaimerModal } from "@/src/components/modals/DisclaimerModal";
import { i18n } from "@/src/lib/i18n";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout(): React.ReactNode {
  return (
    <I18nProvider i18n={i18n}>
      <Outlet />
      <DisclaimerModal />
    </I18nProvider>
  );
}
