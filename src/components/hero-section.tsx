"use client"

import { Button } from "@/src/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Africa Map */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('/abstract-africa-map-silhouette.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-secondary/30 rounded-lg rotate-45 animate-bounce" />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-accent/25 rounded-full animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-balance">{t("title")}</h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 font-medium text-balance">{t("subtitle")}</p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold group"
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold group bg-transparent"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t("learnMore")}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
