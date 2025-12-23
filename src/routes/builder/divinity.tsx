import { createFileRoute } from "@tanstack/react-router";
import type {
  DivinitySlate,
  PlacedSlate,
  Rotation,
  SlateShape,
} from "@/src/tli/core";
import { DivinityTab } from "../../components/divinity/DivinityTab";
import { useBuilderActions, useLoadout } from "../../stores/builderStore";

export const Route = createFileRoute("/builder/divinity")({
  component: DivinityPage,
});

function DivinityPage(): React.ReactNode {
  const loadout = useLoadout();
  const {
    addSlateToInventory,
    copySlate,
    deleteSlate,
    placeSlate,
    removeSlate,
    updateSlate,
  } = useBuilderActions();

  return (
    <DivinityTab
      divinityPage={loadout.divinityPage}
      onSaveSlate={addSlateToInventory}
      onCopySlate={(slate: DivinitySlate) => copySlate(slate.id)}
      onDeleteSlate={deleteSlate}
      onPlaceSlate={(placement: PlacedSlate) =>
        placeSlate(placement.slateId, placement.position)
      }
      onMoveSlate={(slateId: string, position: { row: number; col: number }) =>
        placeSlate(slateId, position)
      }
      onUnplaceSlate={removeSlate}
      onUpdateSlateRotation={(slateId: string, rotation: Rotation) =>
        updateSlate(slateId, { rotation })
      }
      onUpdateSlateFlip={(
        slateId: string,
        flippedH: boolean,
        flippedV: boolean,
      ) => updateSlate(slateId, { flippedH, flippedV })}
      onUpdateSlateShape={(slateId: string, shape: SlateShape) =>
        updateSlate(slateId, { shape })
      }
    />
  );
}
