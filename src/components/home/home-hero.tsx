"use client";

import { useState } from "react";
import { Dices, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { games, type Game } from "@/lib/games";

export default function HomeHero() {
  const t = useTranslations("HomePage.hero");
  const [randomGame, setRandomGame] = useState<Game | null>(null);

  const pickRandomGame = () => {
    const index = Math.floor(Math.random() * games.length);
    setRandomGame(games[index]);
  };

  return (
    <section className="bg-surface-container relative w-full overflow-hidden rounded-xl p-6 shadow-xl">
      <div className="from-surface-container-lowest/80 to-primary/5 pointer-events-none absolute inset-0 bg-linear-to-r via-transparent" />
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-secondary-container/30 text-label-sm text-secondary inline-flex items-center gap-1.5 rounded-full px-3 py-1 tracking-wider uppercase">
              <span
                className="bg-secondary h-1.5 w-1.5 animate-pulse rounded-full"
                aria-hidden="true"
              />
              {t("badge", { count: games.length })}
            </span>
            <span className="text-label-sm text-outline tracking-wider uppercase">
              {t("tableReady")}
            </span>
          </div>

          <h1 className="text-headline-xl text-on-surface font-bold tracking-tight">
            {t("title")}
          </h1>

          <p className="text-body-md text-on-surface-variant">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap items-stretch gap-3">
          <button
            type="button"
            onClick={pickRandomGame}
            className="group bg-surface-container-high hover:bg-surface-container-highest focus-visible:ring-primary/40 flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left shadow-md transition-all focus-visible:ring-2 focus-visible:outline-none"
          >
            <Dices
              className="text-primary size-6 shrink-0 transition-transform duration-500 group-hover:rotate-180"
              aria-hidden="true"
            />
            <span className="flex flex-col">
              <span className="text-label-sm text-outline tracking-wider uppercase">
                {t("randomLabel")}
              </span>
              <span className="text-headline-sm text-on-surface font-semibold">
                {randomGame
                  ? t("randomResult", { game: randomGame.name })
                  : t("randomIdle")}
              </span>
            </span>
          </button>

          <a
            href="#juegos"
            className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container focus-visible:ring-primary/40 focus-visible:ring-offset-surface-container inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Play className="size-5" aria-hidden="true" />
            {t("explore")}
          </a>
        </div>
      </div>
    </section>
  );
}
