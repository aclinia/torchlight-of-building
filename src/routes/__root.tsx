import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "../globals.css";

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      { title: "Torchlight of Building" },
      {
        name: "description",
        content: "Torchlight Infinite character build planner",
      },
    ],
  }),
});

function RootLayout(): React.ReactNode {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <Outlet />
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}
