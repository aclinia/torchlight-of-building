import { createFileRoute, redirect } from "@tanstack/react-router";
import { decodeBuildCode } from "../lib/build-code";
import { importBuild } from "../lib/import-utils";

export const Route = createFileRoute("/import/$code")({
  component: ImportPage,
  beforeLoad: ({ params }) => {
    const decoded = decodeBuildCode(params.code);
    if (decoded === null) {
      throw redirect({ to: "/", search: { importError: "invalid" } });
    }

    const result = importBuild(decoded);
    if (result === undefined) {
      throw redirect({ to: "/", search: { importError: "save_failed" } });
    }

    throw redirect({ to: "/builder", search: { id: result.saveId } });
  },
});

function ImportPage(): React.ReactNode {
  // This component will never render because beforeLoad always redirects
  return null;
}
