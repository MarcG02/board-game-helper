import {
  ChevronRight,
  Dices,
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
      <div className="bg-surface-container flex flex-col gap-4 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col gap-1">
          <h2 className="text-headline-sm text-on-surface">{t("howTitle")}</h2>
          <p className="text-body-sm text-on-surface-variant">
            {t("howSubtitle")}
          </p>
        </div>
        <ol className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <li key={step.titleKey} className="flex items-start gap-3">
              <span className="bg-primary/15 text-label-sm text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                {index + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-body-md text-on-surface font-semibold">
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

      <div className="bg-surface-container flex flex-col gap-4 rounded-xl p-4 shadow-lg">
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
                  className="bg-surface-container-low hover:bg-surface-container-high focus-visible:ring-primary/40 flex items-center justify-between rounded-lg p-3 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="text-primary size-4" aria-hidden="true" />
                    <span className="flex flex-col">
                      <span className="text-body-md text-on-surface font-semibold">
                        {game.name}
                      </span>
                      <span className="text-label-sm text-outline tracking-wider uppercase">
                        {tCategories(game.category)}
                      </span>
                    </span>
                  </span>
                  <ChevronRight
                    className="text-outline size-4"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
