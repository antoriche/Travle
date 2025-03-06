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
import { create } from "zustand";
import { FeatureCollection, Geometry } from "geojson";

type MapConfig = {
  name: string;
  map: FeatureCollection<Geometry, { name: string; border_countries: string[] }>;
  max: number;
};

const MAPS = [
  {
    name: "World",
    map: world,
    max: 15,
  },
  {
    name: "USA",
    map: usa,
    max: 10,
  },
  {
    name: "France",
    map: france,
    max: 11,
  },
] as const;

export const useNewGameConfig = create<{
  selectedMap: MapConfig;
  setSelectedMap: (map: MapConfig) => void;
  range: [number, number];
  setRange: (range: [number, number]) => void;
}>((set) => ({
  selectedMap: MAPS[0],
  setSelectedMap: (map) => set({ selectedMap: map }),
  range: [3, 8],
  setRange: (range) => set({ range }),
}));

function NewGameForm({ style }: { style?: React.CSSProperties }) {
  const { setGameEngine } = useGameEngine();
  const navigate = useNavigate();

  const { selectedMap, setSelectedMap, range, setRange } = useNewGameConfig();

  return (
    <div style={{ width: 500, ...style }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "1em", gap: "1em" }}>
        <div style={{ width: "100%" }}>
          <span style={{ marginRight: "0.5em" }}>Map:</span>
          <Radio.Group
            value={selectedMap}
            onChange={(e) => {
              setRange([range[0], Math.min(range[1], e.target.value.max)]);
              setSelectedMap(e.target.value);
            }}
          >
            {MAPS.map((map) => (
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
            onChange={(value) => setRange(value as [number, number])}
            min={1}
            max={selectedMap.max}
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
