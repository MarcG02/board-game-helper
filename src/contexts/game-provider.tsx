"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { charList, weaponList, locationList } from "@/lib/constants";

// Tipos
type Category = "Characters" | "Weapons" | "Locations";

type TGamesContext = {
  charSteps: number[];
  weaponSteps: number[];
  locationSteps: number[];
  updateStep: (category: Category, index: number, value: number) => void;
  resetAll: () => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  username?: string;
  setUsername: (event: string) => void;
};

export const GamesContext = createContext<TGamesContext | null>(null);

type GameProviderProps = {
  children: ReactNode;
};

export default function GameProvider({ children }: GameProviderProps) {
  const [isClient, setIsClient] = useState(false);

  const [activeTab, setActiveTabState] = useState("characters");

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!isClient) return;
    const stored = localStorage.getItem("cluedo-active-tab");
    if (stored) {
      setActiveTabState(stored);
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("cluedo-active-tab", activeTab);
  }, [activeTab, isClient]);

  const setActiveTab = (value: string) => {
    setActiveTabState(value);
  };

  // Know if it is mounted in the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Locale states
  const [charSteps, setCharSteps] = useState<number[]>([]);
  const [weaponSteps, setWeaponSteps] = useState<number[]>([]);
  const [locationSteps, setLocationSteps] = useState<number[]>([]);

  // Load localStorage when it is mounted
  useEffect(() => {
    if (!isClient) return;

    const loadSteps = (key: string, length: number): number[] => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length === length) {
            return parsed;
          }
        } catch {}
      }
      return Array(length).fill(0);
    };

    setCharSteps(loadSteps("charSteps", charList.length));
    setWeaponSteps(loadSteps("weaponSteps", weaponList.length));
    setLocationSteps(loadSteps("locationSteps", locationList.length));
  }, [isClient]);

  // Save data in localStorage
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("charSteps", JSON.stringify(charSteps));
  }, [charSteps, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("weaponSteps", JSON.stringify(weaponSteps));
  }, [weaponSteps, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("locationSteps", JSON.stringify(locationSteps));
  }, [locationSteps, isClient]);

  const updateStep = (category: Category, index: number, value: number) => {
    const update = (setter: React.Dispatch<React.SetStateAction<number[]>>) => {
      setter((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    };

    if (category === "Characters") update(setCharSteps);
    if (category === "Weapons") update(setWeaponSteps);
    if (category === "Locations") update(setLocationSteps);
  };

  const resetAll = () => {
    const emptyChars = Array(charList.length).fill(0);
    const emptyWeapons = Array(weaponList.length).fill(0);
    const emptyLocations = Array(locationList.length).fill(0);

    setCharSteps(emptyChars);
    setWeaponSteps(emptyWeapons);
    setLocationSteps(emptyLocations);

    localStorage.setItem("charSteps", JSON.stringify(emptyChars));
    localStorage.setItem("weaponSteps", JSON.stringify(emptyWeapons));
    localStorage.setItem("locationSteps", JSON.stringify(emptyLocations));
  };

  // Avoids the render unitl the SSR is ready
  if (!isClient) return null;

  return (
    <GamesContext.Provider
      value={{
        charSteps,
        weaponSteps,
        locationSteps,
        updateStep,
        resetAll,
        activeTab,
        setActiveTab,
        username,
        setUsername,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
