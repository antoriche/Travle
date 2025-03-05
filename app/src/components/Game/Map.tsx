import { GameEngine } from "shared/GameEngine";
import React, { useMemo } from "react";
import PlotFigure from "../Utils/PlotFigure";
import * as Plot from "@observablehq/plot";
import { Colors } from "@/constants";

function Map({ gameEngine, showWireframe }: { gameEngine: GameEngine; showWireframe?: boolean }) {
  const map = useMemo(
    () => ({
      type: "FeatureCollection",
      features: gameEngine.map.features
        .map((f) => ({
          type: "Feature",
          geometry: f.geometry,
          properties: {
            name: f.properties.name,
            style: (() => {
              const id = `${f.id}`;
              if (gameEngine.from === id) {
                return { fill: Colors.FROM_COUNTRY, stroke: Colors.FROM_COUNTRY };
              } else if (gameEngine.to === id) {
                return { fill: Colors.TO_COUNTRY, stroke: Colors.TO_COUNTRY };
              } else if (gameEngine.guesses.map((g) => g.id).includes(id)) {
                const guess = gameEngine.guesses.find((g) => g.id === id);
                return {
                  stroke: "#00000090",
                  fill: !guess?.correct && !guess?.mostly_correct ? "#FF000020" : guess?.correct ? "#00000090" : "transparent",
                };
              } else {
                return null;
              }
            })(),
          },
        }))
        .filter((f) => f.properties.style !== null),
    }),
    [gameEngine.map, gameEngine.from, gameEngine.to, gameEngine.guesses],
  );
  return (
    <div>
      <PlotFigure
        fit
        fit_ratio={0.5}
        options={{
          marks: [
            showWireframe
              ? Plot.geo(gameEngine.map, {
                  stroke: "lightgray",
                  fill: "none",
                  strokeWidth: 0.1,
                })
              : null,
            Plot.geo(map, {
              fill: (d) => d.properties.style?.fill,
              stroke: (d) => d.properties.style?.stroke,
            }),
          ],
          axis: false,
          projection: {
            type: "mercator",
            domain: map,
          },
        }}
      />
    </div>
  );
}

export default Map;
