"use client";
import React from "react";
import GameButton from "./game-button";
import { useTranslations } from "next-intl";

export default function GameContainer() {
  const t = useTranslations("GameDescs");
  return (
    <div className="grid grid-cols-2 gap-6 rounded-md bg-gray-200 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <GameButton
        imageSrc="/Cluedo.png"
        altText="Cluedo"
        gameName="Cluedo"
        description={t("Cluedo")}
      />
      <GameButton
        imageSrc="/logoNoText.png"
        altText="Poker"
        gameName="Poker"
        description={t("Poker")}
      />
    </div>
  );
}
