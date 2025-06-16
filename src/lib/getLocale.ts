import { NextRequest } from "next/server";
import { defaultLocale, locales as readonlyLocales } from "@/config";
import { Locale } from "./types";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

export function getLocale(request: NextRequest): string {
  let locale;

  const locales = [...readonlyLocales];

  if (request.cookies.has("NEXT_LOCALE")) {
    locale = request.cookies.get("NEXT_LOCALE")?.value;
    if (locale && !locales.includes(locale as Locale)) {
      locale = undefined;
    }
  }

  if (!locale) {
    const pathname = request.nextUrl.pathname;
    locale = pathname.split("/")[1];
    if (!locales.includes(locale as Locale)) locale = undefined;
  }

  if (!locale) {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const languages = new Negotiator({
      headers: negotiatorHeaders,
    }).languages();
    locale = match(languages, locales, defaultLocale);
  }

  return locale || defaultLocale;
}
