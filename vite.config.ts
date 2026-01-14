import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 3000 },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Catch warnings related to dynamic-import-vars plugin
        if (
          warning.plugin === "vite:dynamic-import-vars" ||
          warning.code === "DYNAMIC_IMPORT_VARIABLE"
        ) {
          throw new Error(`Invalid dynamic import path: ${warning.message}`);
        }
        // Other warnings are displayed normally
        warn(warning);
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    nitro(),
    react({
      plugins: [
        [
          "@lingui/swc-plugin",
          {
            runtimeModules: {
              i18n: ["@lingui/core", "i18n"],
              trans: ["@lingui/react", "Trans"],
            },
          },
        ],
      ],
    }),
    lingui(),
    tailwindcss(),
  ],
});
