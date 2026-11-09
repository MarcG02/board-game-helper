"use client";

import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { type Game, type GameDifficulty } from "@/lib/games";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const difficultyClasses: Record<GameDifficulty, string> = {
  light: "text-secondary",
  medium: "text-primary",
  expert: "text-tertiary",
};

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const t = useTranslations("HomePage.library");
  const tCategories = useTranslations("HomePage.library.categories");
  const tDifficulty = useTranslations("HomePage.difficulty");
  const tDescriptions = useTranslations("GameDescs");

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-surface-container shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-44 w-full overflow-hidden bg-surface-container-highest">
        <Image
          src={game.image}
          alt={game.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute top-2 right-2 rounded bg-surface-container-lowest/80 px-2 py-0.5 text-label-sm font-semibold shadow backdrop-blur-md",
            difficultyClasses[game.difficulty],
          )}
        >
          {tDifficulty(game.difficulty)}
        </span>
        <span className="absolute bottom-2 left-2 rounded bg-secondary-container/80 px-2 py-0.5 text-label-sm text-secondary-fixed">
          {tCategories(game.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <h3 className="text-headline-sm font-semibold text-on-surface transition-colors group-hover:text-primary">
            {game.name}
          </h3>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Users className="size-3" aria-hidden="true" />
              {t("players", { min: game.minPlayers, max: game.maxPlayers })}
            </span>
            <span aria-hidden="true">&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" />
              {game.durationMinutes === null
                ? t("variableDuration")
                : t("minutes", { count: game.durationMinutes })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={`${t("rules")} ${game.name}`}
                className="flex-1 rounded-lg bg-surface-container-high py-1.5 text-center text-label-md text-on-surface transition-colors hover:bg-surface-container-highest focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
              >
                {t("rules")}
              </button>
            </DialogTrigger>
            <DialogContent className="border-outline-variant/40 bg-surface-container">
              <DialogHeader>
                <DialogTitle className="text-headline-sm text-on-surface">
                  {game.name}
                </DialogTitle>
                <DialogDescription className="text-body-sm text-on-surface-variant">
                  {tDescriptions(game.name)}
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-container-highest">
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Link
            href={`/${game.slug}`}
            className="flex-1 rounded-lg bg-primary py-1.5 text-center text-label-md font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
          >
            {t("play")}
          </Link>
        </div>
      </div>
    </article>
  );
}
