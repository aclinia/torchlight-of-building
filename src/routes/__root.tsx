import { I18nProvider } from "@lingui/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { useRef } from "react";
import { DisclaimerModal } from "@/src/components/modals/DisclaimerModal";
import { i18n } from "@/src/lib/i18n";

function AnalyticsOnce(): React.ReactNode {
  const hasSentRef = useRef(false);

  return (
    <Analytics
      basePath="/monitor"
      beforeSend={(event) => {
        if (event.type === "pageview") {
          if (hasSentRef.current) return null;
          hasSentRef.current = true;
        }
        return event;
      }}
    />
  );
}

export const Route = createRootRoute({ component: RootLayout });

function RootLayout(): React.ReactNode {
  return (
    <I18nProvider i18n={i18n}>
      <Outlet />
      <DisclaimerModal />
      <AnalyticsOnce />
    </I18nProvider>
  );
}
