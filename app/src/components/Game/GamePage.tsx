import { useGameEngine } from "@/hooks/useGameEngine";
import { useNavigate } from "react-router";
import Game from "./Game";
import { GameEngine } from "shared/GameEngine";
import React from "react";
import { generatePathForGame, getAllShortestPaths } from "shared/algo";
import { basename } from "@/App";

export function GamePage() {
  const { gameEngine, setGameEngine } = useGameEngine();
  if (!gameEngine) {
    window.location.href = basename;
    console.error("No game engine found");
    return null;
  }

  return <Game gameEngine={gameEngine} setGameEngine={setGameEngine} />;
}

export default GamePage;
