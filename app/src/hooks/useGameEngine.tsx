import { GameEngine } from "shared/GameEngine";
import { create } from "zustand";

export const useGameEngine = create<{
  gameEngine: GameEngine | null;
  setGameEngine: (gameEngine: GameEngine) => void;
}>((set) => ({
  gameEngine: null,
  setGameEngine: (gameEngine) => {
    set({
      gameEngine,
    });
  },
}));
