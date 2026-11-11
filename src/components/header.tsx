"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { games } from "@/lib/games";
import { cn } from "@/lib/utils";
import LanguageSelector from "./language-selector";
import SidebarNav from "./home/mobile/sidebar-nav";

export default function Header() {
  const t = useTranslations("HomePage.nav");
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t("home") },
    ...games.map((game) => ({ href: `/${game.slug}`, label: game.name })),
  ];

  const navLinkClass = (href: string) =>
    cn(
      "flex min-h-11 items-center rounded-lg px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey/40 lg:min-h-0",
      pathname === href
        ? "bg-panel-high font-semibold text-honey"
        : "text-ink-muted hover:bg-panel hover:text-ink",
    );

  return (
    <header className="border-line-strong/40 bg-panel-lowest/90 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="focus-visible:ring-honey/40 flex items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:outline-none"
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
          <span className="text-headline-sm text-honey font-semibold tracking-tight">
            <span className="inline text-sm sm:text-xl">Board Game Helper</span>
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
        <div className="flex items-center gap-2">
          <SidebarNav navLinkClass={navLinkClass} navItems={navItems} />

          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
