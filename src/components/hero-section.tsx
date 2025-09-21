"use client"

import { Button } from "@/src/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export function HeroSection() {
  const t = useTranslations("hero")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("services")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToFinEd = () => {
    const finedSection = document.querySelector('[class*="fined"]') || document.getElementById("fined")
    if (finedSection) {
      finedSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToBeta = () => {
    const betaSection = document.querySelector('[class*="beta"]') || document.getElementById("beta")
    if (betaSection) {
      betaSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Africa Map */}
      <div className="absolute inset-0 z-0">
        <div style={{ backgroundColor: "#10493F" }} className="absolute inset-0" />
        <div
          className={`absolute inset-0 opacity-40 transition-all duration-1000 ${
            isLoaded ? "scale-100 opacity-40" : "scale-110 opacity-0"
          }`}
          style={{
            backgroundImage: `url('/abstract-africa-map-silhouette.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Animated geometric shapes - hide some on mobile */}
        <div
          className={`absolute top-20 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-accent/20 rounded-full animate-pulse transition-all duration-1000 ${
            isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-32 right-4 sm:right-16 w-12 sm:w-16 h-12 sm:h-16 bg-secondary/30 rounded-lg rotate-45 animate-bounce transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}
        />
        <div
          className={`hidden sm:block absolute top-1/3 right-1/4 w-12 h-12 bg-accent/25 rounded-full animate-pulse delay-1000 transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
          }`}
        />
        <div
          className={`hidden sm:block absolute top-1/4 left-1/3 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-700 transition-all duration-1000 delay-700 ${
            isLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
        <div
          className={`hidden sm:block absolute bottom-1/4 left-1/4 w-14 h-14 bg-secondary/20 rounded-lg rotate-12 animate-bounce delay-500 transition-all duration-1000 delay-900 ${
            isLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
      </div>

      {/* Content with staggered animations */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title - Better mobile sizing */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 text-balance leading-tight transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-8 opacity-0 blur-sm"
            }`}
          >
            {t("title")}
          </h1>

          {/* Subtitle - Better mobile sizing */}
          <p
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 sm:mb-8 font-medium text-balance leading-snug transition-all duration-1000 delay-200 ${
              isLoaded
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-8 opacity-0 blur-sm"
            }`}
          >
            {t("subtitle")}
          </p>

          {/* Description - Better mobile sizing */}
          <p
            className={`text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-12 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-pretty transition-all duration-1000 delay-400 ${
              isLoaded
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-8 opacity-0 blur-sm"
            }`}
          >
            {t("description")}
          </p>

          {/* CTA Buttons - Better mobile layout */}
          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-1000 delay-600 ${
              isLoaded
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            <Button
              size="lg"
              onClick={handleScrollToFinEd}
              style={{ backgroundColor: "#10493F" }}
              className="w-full sm:w-auto hover:bg-accent/90 text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25"
            >
              {t("discoverFined")}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleScrollToBeta}
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group bg-transparent transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
            >
              {t("discoverBeta")}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-1000 delay-1000 ${
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white/70 transition-colors duration-300 cursor-pointer group"
          onClick={handleScrollToAbout}
        >
          <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2 animate-pulse group-hover:bg-white/90 transition-colors duration-300" />
        </div>
      </div>

      {/* Hide floating particles on mobile */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse transition-all duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
