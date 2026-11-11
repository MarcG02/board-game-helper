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
  light: "text-baize",
  medium: "text-honey",
  expert: "text-ember",
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
    <article className="group bg-panel flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="bg-panel-highest relative h-44 w-full overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "bg-panel-lowest/80 text-label-sm absolute top-2 right-2 rounded px-2 py-0.5 font-semibold shadow backdrop-blur-md",
            difficultyClasses[game.difficulty],
          )}
        >
          {tDifficulty(game.difficulty)}
        </span>
        <span className="bg-baize-strong/80 text-label-sm text-baize-soft absolute bottom-2 left-2 rounded px-2 py-0.5">
          {tCategories(game.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <h3 className="text-headline-sm text-ink group-hover:text-honey font-semibold transition-colors">
            {game.name}
          </h3>
          <p className="text-label-sm text-ink-muted mt-1 flex flex-wrap items-center gap-2">
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
                className="bg-panel-high text-label-md text-ink hover:bg-panel-highest focus-visible:ring-honey/40 flex-1 rounded-lg py-1.5 text-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                {t("rules")}
              </button>
            </DialogTrigger>
            <DialogContent className="border-line-strong/40 bg-panel">
              <DialogHeader>
                <DialogTitle className="text-headline-sm text-ink">
                  {game.name}
                </DialogTitle>
                <DialogDescription className="text-body-sm text-ink-muted">
                  {tDescriptions(game.name)}
                </DialogDescription>
              </DialogHeader>
              <div className="bg-panel-highest relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Link
            href={`/${game.slug}`}
            className="bg-honey text-label-md text-on-honey hover:bg-honey-strong hover:text-on-honey-strong focus-visible:ring-honey/40 flex-1 rounded-lg py-1.5 text-center font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            {t("play")}
          </Link>
        </div>
      </div>
    </article>
  );
}
