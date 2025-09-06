import { Analytics } from "@vercel/analytics/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AFRO Group - Innovation Technologique pour l'Afrique",
  description:
    "Solutions technologiques avancées pour démocratiser l'accès aux services financiers et éducatifs en Afrique",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback="Loading...">
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
