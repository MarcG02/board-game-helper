import { GamesContext } from "@/contexts/game-provider";
import { useContext } from "react";

export function useGamesContext() {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error("useGamesContext must be used within a GamesProvider");
  }

  return context;
}
