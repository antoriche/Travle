import { useGameEngine } from "@/hooks/useGameEngine";
import { Button } from "antd";
import React, { useMemo } from "react";
import { generatePathForGame } from "shared/algo";
import { world } from "shared/dataset";
import PlotFigure from "../Utils/PlotFigure";
import * as Plot from "@observablehq/plot";

function NewGameForm() {
  const { setGameEngine } = useGameEngine();
  const maps = useMemo(() => {
    return [world] as const;
  }, [world]);

  return (
    <div>
      {maps.map((map) => (
        <Button>
          <PlotFigure options={{ marks: [Plot.geo(map)], width: 200, height: 100 }} />
        </Button>
      ))}
    </div>
  );
}

export default NewGameForm;
