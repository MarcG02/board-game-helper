"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { games } from "@/lib/games";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("HomePage.nav");
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t("home") },
    ...games.map((game) => ({ href: `/${game.slug}`, label: game.name })),
  ];

  const navLinkClass = (href: string) =>
    cn(
      "flex min-h-11 items-center rounded-lg px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:min-h-0",
      pathname === href
        ? "bg-surface-container-high font-semibold text-primary"
        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/40 bg-surface-container-lowest/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <span className="relative h-10 w-10 shrink-0">
            <Image
              src="/logoNoText.png"
              alt="Board Game Helper"
              fill
              sizes="40px"
              className="rounded-lg object-contain"
            />
          </span>
          <span className="text-headline-sm font-semibold tracking-tight text-primary">
            Board Game Helper
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={navLinkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="hidden items-center gap-1.5 rounded-full bg-secondary-container/20 px-3 py-1.5 text-label-sm uppercase tracking-wider text-secondary sm:inline-flex">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {t("helpers", { count: games.length })}
        </span>
      </div>

      <nav className="overflow-x-auto border-t border-outline-variant/30 px-4 py-2 lg:hidden">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(navLinkClass(item.href), "shrink-0")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
