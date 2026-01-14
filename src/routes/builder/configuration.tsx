import { createFileRoute } from "@tanstack/react-router";
import { ConfigurationTab } from "../../components/configuration/ConfigurationTab";
import { createEmptyConfigurationPage } from "../../lib/storage";
import {
  useBuilderActions,
  useConfigurationPage,
  useLoadout,
} from "../../stores/builderStore";

export const Route = createFileRoute("/builder/configuration")({
  component: ConfigurationPage_,
});

function ConfigurationPage_(): React.ReactNode {
  const configPage = useConfigurationPage();
  const loadout = useLoadout();
  const { updateConfiguration } = useBuilderActions();

  const config = configPage ?? createEmptyConfigurationPage();

  return (
    <ConfigurationTab
      config={config}
      onUpdate={updateConfiguration}
      loadout={loadout}
    />
  );
}
