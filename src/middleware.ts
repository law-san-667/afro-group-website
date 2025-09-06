import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "fr",
});

export default function middleware(request: NextRequest) {
  // Redirect /cgu to /<locale>/cgu
  if (request.nextUrl.pathname === "/cgu") {
    // You can detect the user's preferred locale here, or use default
    const preferredLocale =
      request.cookies.get("NEXT_LOCALE")?.value ||
      request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ||
      "fr";
    const locale = (locales as readonly string[]).includes(preferredLocale) ? preferredLocale as "fr" | "en"  : "fr";
    return NextResponse.redirect(new URL(`/${locale}/cgu`, request.url));
  }
  if (request.nextUrl.pathname === "/blog") {
    // You can detect the user's preferred locale here, or use default
    const preferredLocale =
      request.cookies.get("NEXT_LOCALE")?.value ||
      request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ||
      "fr";
    const locale = (locales as readonly string[]).includes(preferredLocale) ? preferredLocale as "fr" | "en" : "fr";
    return NextResponse.redirect(new URL(`/${locale}/blog`, request.url));
  }

  // Let next-intl handle all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/cgu",
    "/blog/:path*",
    "/(en|fr)/:path*"
    // Add any additional routes you want to match here
  ],
};