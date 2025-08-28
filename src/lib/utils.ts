import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function yahtzeeCalculation(faceName: string, matchingFaces: number) {
  const multipliers: Record<string, number> = {
    A: 6,
    K: 5,
    Q: 4,
    J: 3,
    R: 2,
    N: 1,
  };
  const key = faceName.charAt(0) as keyof typeof multipliers;

  const multiplier = multipliers[key] ?? 0;

  return matchingFaces * multiplier;
}
