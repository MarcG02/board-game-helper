import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
});

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
