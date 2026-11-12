export type GameCategory = "deduction" | "cards" | "dice";
export type GameDifficulty = "light" | "medium" | "expert";
export type Game = {
  slug: string;
  name: string;
  image: string;
  minPlayers: number;
  maxPlayers: number;
  durationMinutes: number | null; // null = variable
  category: GameCategory;
  difficulty: GameDifficulty;
};
export const games: Game[] = [
  {
    slug: "cluedo",
    name: "Cluedo",
    image: "/Cluedo.png",
    minPlayers: 3,
    maxPlayers: 6,
    durationMinutes: 45,
    category: "deduction",
    difficulty: "medium",
  },
  {
    slug: "poker",
    name: "Poker",
    image: "/poker.png",
    minPlayers: 2,
    maxPlayers: 10,
    durationMinutes: null,
    category: "cards",
    difficulty: "medium",
  },
  {
    slug: "yahtzee",
    name: "Yahtzee",
    image: "/yahtzee.png",
    minPlayers: 1,
    maxPlayers: 8,
    durationMinutes: 30,
    category: "dice",
    difficulty: "light",
  },
];
