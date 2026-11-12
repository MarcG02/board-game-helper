"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { games, type GameCategory } from "@/lib/games";
import { cn } from "@/lib/utils";
import GameCard from "./game-card";

type PlayerFilter = "all" | "one" | "two" | "threeFour" | "fivePlus";
type CategoryFilter = "all" | GameCategory;

const playerFilters: PlayerFilter[] = [
  "all",
  "one",
  "two",
  "threeFour",
  "fivePlus",
];

const categoryFilters: CategoryFilter[] = [
  "all",
  "deduction",
  "cards",
  "dice",
];

export default function GameLibrary() {
  const t = useTranslations("HomePage.library");
  const tPlayerFilters = useTranslations("HomePage.library.playerFilters");
  const tCategories = useTranslations("HomePage.library.categories");
  const tDescriptions = useTranslations("GameDescs");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [player, setPlayer] = useState<PlayerFilter>("all");

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return games.filter((game) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        game.name.toLowerCase().includes(normalizedQuery) ||
        tDescriptions(game.name).toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        category === "all" || game.category === category;

      const matchesPlayers =
        player === "all" ||
        (player === "one" &&
          game.minPlayers <= 1 &&
          game.maxPlayers >= 1) ||
        (player === "two" &&
          game.minPlayers <= 2 &&
          game.maxPlayers >= 2) ||
        (player === "threeFour" &&
          game.minPlayers <= 4 &&
          game.maxPlayers >= 3) ||
        (player === "fivePlus" && game.maxPlayers >= 5);

      return matchesQuery && matchesCategory && matchesPlayers;
    });
  }, [query, category, player, tDescriptions]);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setPlayer("all");
  };

  return (
    <section id="juegos" className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-headline-lg text-ink">{t("title")}</h2>
        <p className="text-body-sm text-ink-muted">{t("subtitle")}</p>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-xl bg-panel p-4 shadow-md">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchLabel")}
              className="w-full rounded-lg bg-panel-lowest py-2.5 pr-4 pl-10 text-body-md text-ink placeholder:text-ink-faint focus:ring-2 focus:ring-honey/40 focus:outline-none"
            />
          </div>
          <span className="text-label-sm text-ink-faint sm:text-right">
            {t("results", { count: filteredGames.length })}
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-label-sm uppercase tracking-wider text-ink-faint">
            {t("playersLabel")}
          </span>
          <div className="flex flex-wrap gap-2">
            {playerFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setPlayer(filter)}
                aria-pressed={player === filter}
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-3 py-1 text-label-sm transition-colors focus-visible:ring-2 focus-visible:ring-honey/40 focus-visible:outline-none sm:min-h-8",
                  player === filter
                    ? "bg-honey font-semibold text-on-honey"
                    : "bg-panel-highest text-ink-muted hover:text-ink",
                )}
              >
                {tPlayerFilters(filter)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-label-sm uppercase tracking-wider text-ink-faint">
            {t("categoryLabel")}
          </span>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCategory(filter)}
                aria-pressed={category === filter}
                className={cn(
                  "flex min-h-11 items-center rounded-full px-3 py-1 text-label-sm transition-colors focus-visible:ring-2 focus-visible:ring-honey/40 focus-visible:outline-none sm:min-h-8",
                  category === filter
                    ? "bg-honey text-on-honey"
                    : "bg-panel-low text-ink hover:bg-panel-highest",
                )}
              >
                {tCategories(filter)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl bg-panel p-8 text-center shadow-md">
          <p className="text-headline-sm text-ink">{t("emptyTitle")}</p>
          <p className="text-body-sm text-ink-muted">
            {t("emptyHint")}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 flex min-h-11 items-center rounded-lg bg-honey px-4 py-2 text-label-md font-semibold text-on-honey transition-colors hover:bg-honey-strong hover:text-on-honey-strong focus-visible:ring-2 focus-visible:ring-honey/40 focus-visible:outline-none"
          >
            {t("clearFilters")}
          </button>
        </div>
      )}
    </section>
  );
}
