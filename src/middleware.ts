import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "fr",
});

export default function middleware(request: NextRequest) {
  // Check for authentication on payment pages
  if (request.nextUrl.pathname.match(/^\/[a-z]{2}\/payment\/\d+\/[my]$/)) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");
    
    // If no auth cookies, redirect to login page
    if (!accessToken || !refreshToken) {
      const loginUrl = new URL(request.nextUrl.pathname + "/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

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
    "/(en|fr)/:path*",
    "/(en|fr)/payment/:path*"
    // Add any additional routes you want to match here
  ],
};