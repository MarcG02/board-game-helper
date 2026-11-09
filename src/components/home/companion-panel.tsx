import {
  ChevronRight,
  Dices,
  Lightbulb,
  SearchCheck,
  Spade,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { games, type GameCategory } from "@/lib/games";

const categoryIcons: Record<GameCategory, LucideIcon> = {
  deduction: SearchCheck,
  cards: Spade,
  dice: Dices,
};

const steps = [
  { titleKey: "step1Title", descriptionKey: "step1Desc" },
  { titleKey: "step2Title", descriptionKey: "step2Desc" },
  { titleKey: "step3Title", descriptionKey: "step3Desc" },
] as const;

export default function CompanionPanel() {
  const t = useTranslations("HomePage.companion");
  const tCategories = useTranslations("HomePage.library.categories");

  return (
    <aside className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl bg-surface-container p-4 shadow-lg">
        <div className="flex flex-col gap-1">
          <h2 className="text-headline-sm text-on-surface">{t("howTitle")}</h2>
          <p className="text-body-sm text-on-surface-variant">
            {t("howSubtitle")}
          </p>
        </div>
        <ol className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <li key={step.titleKey} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-label-sm text-primary">
                {index + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-body-md font-semibold text-on-surface">
                  {t(step.titleKey)}
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  {t(step.descriptionKey)}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-surface-container p-4 shadow-lg">
        <div className="flex flex-col gap-1">
          <h2 className="text-headline-sm text-on-surface">
            {t("helpersTitle")}
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            {t("helpersSubtitle")}
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {games.map((game) => {
            const Icon = categoryIcons[game.category];
            return (
              <li key={game.slug}>
                <Link
                  href={`/${game.slug}`}
                  aria-label={`${t("open")} ${game.name}`}
                  className="flex items-center justify-between rounded-lg bg-surface-container-low p-3 transition-colors hover:bg-surface-container-high focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-4 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <span className="text-body-md font-semibold text-on-surface">
                        {game.name}
                      </span>
                      <span className="text-label-sm uppercase tracking-wider text-outline">
                        {tCategories(game.category)}
                      </span>
                    </span>
                  </span>
                  <ChevronRight
                    className="size-4 text-outline"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-headline-sm text-on-surface">{t("tipTitle")}</h2>
        </div>
        <p className="text-body-sm text-on-surface-variant">{t("tip")}</p>
      </div>
    </aside>
  );
}
