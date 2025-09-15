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

// Loading Component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <img
                src="/fined-logo-dark.png"
                alt="AFRO Group Logo"
                className="w-10 h-10 rounded-lg"
              />
            </div>
          </div>
          {/* Rotating border */}
          <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-transparent border-t-white/30 rounded-2xl animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white animate-fade-in">
            AFRO Group
          </h2>
          <p className="text-white/80 animate-fade-in-delay">
            Chargement en cours...
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2 justify-center mt-6">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animate-bounce-delay-1"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animate-bounce-delay-2"></div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse animate-pulse-delay-1"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse animate-pulse-delay-2"></div>
      </div>
    </div>
  )
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
        <Suspense fallback={<LoadingScreen />}>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
