import { useGameEngine } from "@/hooks/useGameEngine";
import { Button, Radio, Slider } from "antd";
import React, { useMemo, useState } from "react";
import { generatePathForGame } from "shared/algo";
import { world, usa, france } from "shared/dataset";
import PlotFigure from "../Utils/PlotFigure";
import * as Plot from "@observablehq/plot";
import { Colors } from "@/constants";
import { GameEngine } from "shared/GameEngine";
import { useNavigate } from "react-router";

function NewGameForm({ style }: { style?: React.CSSProperties }) {
  const { setGameEngine } = useGameEngine();
  const navigate = useNavigate();
  const maps = useMemo(
    () =>
      [
        {
          name: "World",
          map: world,
        },
        {
          name: "USA",
          map: usa,
        },
        {
          name: "France",
          map: france,
        },
      ] as const,
    [world],
  );

  const [selectedMap, setSelectedMap] = React.useState(maps[0]);
  const [range, setRange] = useState([3, 8]);

  return (
    <div style={{ width: 500, ...style }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "1em", gap: "1em" }}>
        <div style={{ width: "100%" }}>
          <span style={{ marginRight: "0.5em" }}>Map:</span>
          <Radio.Group value={selectedMap} onChange={(e) => setSelectedMap(e.target.value)}>
            {maps.map((map) => (
              <Radio.Button value={map} key={map.name}>
                {map.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div style={{ width: "100%" }}>
          Between {range[0]} and {range[1]} countries / territories
          <Slider
            style={{
              width: "100%",
              margin: "1em 0",
            }}
            range
            value={range}
            onChange={(value) => setRange(value)}
            min={1}
            max={15}
          />
        </div>
        <Button
          type="primary"
          onClick={() => {
            const path = generatePathForGame(
              selectedMap.map.features.map((f) => ({
                id: `${f.id}`,
                neighbors: f.properties.border_countries,
              })),
              range[0],
              range[1],
            );
            setGameEngine(new GameEngine(selectedMap.map, path[0], path[path.length - 1]));
            navigate("/game");
          }}
        >
          Start new game
        </Button>
      </div>
    </div>
  );
}

export default NewGameForm;
