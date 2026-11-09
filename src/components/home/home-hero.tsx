"use client";

import { useEffect, useState } from "react";
import { Dices, Play, RotateCcw, Timer } from "lucide-react";
import { useTranslations } from "next-intl";
import { games, type Game } from "@/lib/games";

const INITIAL_SECONDS = 90;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function HomeHero() {
  const t = useTranslations("HomePage.hero");
  const [randomGame, setRandomGame] = useState<Game | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsRunning(false);
    }
  }, [secondsLeft]);

  const pickRandomGame = () => {
    const index = Math.floor(Math.random() * games.length);
    setRandomGame(games[index]);
  };

  const toggleTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(INITIAL_SECONDS);
      setIsRunning(true);
      return;
    }
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(INITIAL_SECONDS);
  };

  return (
    <section className="relative w-full overflow-hidden rounded-xl bg-surface-container p-6 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-container-lowest/80 via-transparent to-primary/5" />
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/30 px-3 py-1 text-label-sm uppercase tracking-wider text-secondary">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary"
                aria-hidden="true"
              />
              {t("badge", { count: games.length })}
            </span>
            <span className="text-label-sm uppercase tracking-wider text-outline">
              {t("tableReady")}
            </span>
          </div>

          <h1 className="text-headline-xl font-bold tracking-tight text-on-surface">
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
            className="group flex items-center gap-3 rounded-lg bg-surface-container-high px-4 py-3 text-left shadow-md transition-all hover:bg-surface-container-highest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Dices
              className="size-6 shrink-0 text-primary transition-transform duration-500 group-hover:rotate-180"
              aria-hidden="true"
            />
            <span className="flex flex-col">
              <span className="text-label-sm uppercase tracking-wider text-outline">
                {t("randomLabel")}
              </span>
              <span className="text-headline-sm font-semibold text-on-surface">
                {randomGame
                  ? t("randomResult", { game: randomGame.name })
                  : t("randomIdle")}
              </span>
            </span>
          </button>

          <div className="flex items-center gap-3 rounded-lg bg-surface-container-high px-4 py-3 shadow-md">
            <button
              type="button"
              onClick={toggleTimer}
              aria-label={isRunning ? t("timerPause") : t("timerStart")}
              className="flex items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Timer className="size-6 shrink-0 text-secondary" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-label-sm uppercase tracking-wider text-outline">
                  {t("timerLabel")}
                </span>
                <span className="text-label-lg font-semibold text-on-surface">
                  {secondsLeft === 0 ? t("timerDone") : formatTime(secondsLeft)}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={resetTimer}
              aria-label={t("timerReset")}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <a
            href="#juegos"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-on-primary shadow-lg transition-colors hover:bg-primary-container hover:text-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container"
          >
            <Play className="size-5" aria-hidden="true" />
            {t("explore")}
          </a>
        </div>
      </div>
    </section>
  );
}
