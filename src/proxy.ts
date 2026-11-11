import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

// next-intl resolves the active locale on the server from this request header.
// Its own proxy sets it; this custom proxy must do the same.
const LOCALE_HEADER = "X-NEXT-INTL-LOCALE";
const LOCALE_COOKIE = "NEXT_LOCALE";

// The user's persisted choice wins. On a first visit there's no cookie yet, so
// Spanish is the default regardless of the browser language.
function getPreferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  return (
    routing.locales.find((locale) => locale === cookieLocale) ??
    routing.defaultLocale
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLocale = routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // Request already carries a locale prefix: tell next-intl which one it is.
  if (pathLocale) {
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, pathLocale);
    return NextResponse.next({ request: { headers } });
  }

  // No locale in the path: redirect to the persisted choice or Spanish.
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, { path: "/", sameSite: "lax" });

  return response;
}

export const config = {
  matcher: [
    // Skip internal paths (_next), API routes and static assets.
    "/((?!api|assets|.*\\..*|_next).*)",
  ],
};
