import { Swords } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SiteFooter() {
  const t = useTranslations("HomePage.footer");

  return (
    <footer className="mt-10 w-full border-t border-line-strong/40 bg-panel-lowest">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-ink-muted sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <Swords className="size-5 text-honey" aria-hidden="true" />
          <span className="text-body-sm">{t("tagline")}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-label-sm uppercase tracking-wider">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-baize"
              aria-hidden="true"
            />
            {t("ready")}
          </span>
          <span className="text-label-sm text-ink-faint">{t("version")}</span>
        </div>
      </div>
    </footer>
  );
}
