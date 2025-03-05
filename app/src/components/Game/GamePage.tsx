import { useGameEngine } from "@/hooks/useGameEngine";
import { useNavigate } from "react-router";
import Game from "./Game";
import { GameEngine } from "shared/GameEngine";
import { world } from "shared/dataset";
import React from "react";
import { generatePathForGame, getAllShortestPaths } from "shared/algo";

export function GamePage() {
  const { gameEngine, setGameEngine } = useGameEngine();
  const navigate = useNavigate();
  if (!gameEngine) {
    //navigate("/");
    const path = generatePathForGame(
      world.features.map((f) => ({
        id: `${f.id}`,
        neighbors: f.properties.border_countries ?? [],
      })),
      3,
      8,
    );
    const newGameEngine = new GameEngine(world, path[0], path[path.length - 1]);
    setGameEngine(newGameEngine);
    return null;
  }

  return <Game gameEngine={gameEngine} setGameEngine={setGameEngine} />;
}

export default GamePage;
