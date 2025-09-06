import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  // Wait for the requestLocale promise to resolve
  const locale = await requestLocale;

  // If locale is undefined or not in allowed locales, throw 404
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
    // At this point, locale is guaranteed to be a string
    locale: locale,
  };
});