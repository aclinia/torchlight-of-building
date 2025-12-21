"use client";

import { useCallback } from "react";
import type { ConfigurationPage } from "../../lib/save-data";
import { createEmptyConfigurationPage } from "../../lib/storage";
import {
  useBuilderActions,
  useConfigurationPage,
} from "../../stores/builderStore";
import { ConfigurationTab } from "../configuration/ConfigurationTab";

export const ConfigurationSection: React.FC = () => {
  const configPage = useConfigurationPage();
  const { updateSaveData } = useBuilderActions();

  const config = configPage ?? createEmptyConfigurationPage();

  const handleUpdate = useCallback(
    (updates: Partial<ConfigurationPage>) => {
      updateSaveData((prev) => ({
        ...prev,
        configurationPage: {
          ...(prev.configurationPage ?? createEmptyConfigurationPage()),
          ...updates,
        },
      }));
    },
    [updateSaveData],
  );

  return <ConfigurationTab config={config} onUpdate={handleUpdate} />;
};
