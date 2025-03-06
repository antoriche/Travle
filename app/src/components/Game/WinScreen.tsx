import { useGameEngine } from "@/hooks/useGameEngine";
import { GameEngine } from "shared/GameEngine";
import { Breadcrumb, Button, Tag } from "antd";
import React from "react";
import { getCountryName } from "shared/helpers";
import { generatePathForGame } from "shared/algo";
import { useNewGameConfig } from "./NewGameForm";

function WinScreen({ gameEngine }: { gameEngine: GameEngine }) {
  const { setGameEngine } = useGameEngine();
  const newGameConfig = useNewGameConfig();
  if (!gameEngine.won) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Congrats ! 🥳</h2>
      <div>
        You found in {gameEngine.won.attempt} attemps{" "}
        {!gameEngine.won.perfect ? (
          <span>(perfect was {gameEngine.all_shortest_path[0].length - 2})</span>
        ) : (
          <span>(This is the perfect score !)</span>
        )}
      </div>
      <div style={{ padding: "1em" }}>
        {gameEngine.guesses.map((guess) => (
          <Tag key={guess.id} color={guess.correct ? "green" : guess.mostly_correct ? "orange" : "red"}>
            {guess.name}
          </Tag>
        ))}
      </div>
      <div style={{ padding: "1em" }}>
        <h3>Possible paths :</h3>
        {gameEngine.all_shortest_path.map((shortest_path) => (
          <div key={shortest_path.join("-")}>{shortest_path.map((c) => getCountryName(c, gameEngine.map)).join(" > ")}</div>
        ))}
      </div>
      <div style={{ padding: "1em" }}>
        <Button
          type="primary"
          onClick={() => {
            const path = generatePathForGame(
              newGameConfig.selectedMap.map.features.map((f) => ({
                id: `${f.id}`,
                neighbors: f.properties.border_countries,
              })),
              newGameConfig.range[0],
              newGameConfig.range[1],
            );
            setGameEngine(new GameEngine(gameEngine.map, path[0], path[path.length - 1]));
          }}
        >
          Start a new game
        </Button>
      </div>
    </div>
  );
}

export default WinScreen;
