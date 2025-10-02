"use client"

import { Badge } from "@/src/components/ui/badge"
import { useInView } from "@/src/hooks/use-in-view"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

export function PartnersSection() {
  const t = useTranslations("partners")
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: headerRef, isInView: isHeaderInView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const { ref: sliderWrapperRef, isInView: isSliderInView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  const partners = [
    {
      name: "AIESEC",
      logo: "/partners/aiesec.png",
      description: "Organisation internationale de jeunesse",
      website: "https://aiesec.org/"
    },
    {
      name: "CESAG",
      logo: "/partners/cesag.png",
      description: "Centre d'Études Supérieures de l'Afrique de Gestion",
      website: "https://www.cesag.sn"
    },
    // {
    //   name: "CGF Bourse",
    //   logo: "/partners/cgf-bourse.png",
    //   description: "Courtage et gestion financière",
    //   website: "https://www.cgfbourse.com/"
    // },
    // {
    //   name: "EtriLabs",
    //   logo: "/partners/etrilabs.webp",
    //   description: "Laboratoire d'innovation technologique",
    //   website: "https://etrilabs.com/"
    // },
    {
      name: "Impact Hub",
      logo: "/partners/impact-hub.jpeg",
      description: "Réseau mondial d'innovation sociale",
      website: "https://cotonou.impacthub.net/"
    },
    {
      name: "KALP Studio",
      logo: "/partners/kalp.jpg",
      description: "Partenaire technologique",
      website: "https://www.kalp.studio/"
    },
    {
      name: "NEV Consulting",
      logo: "/partners/nev-consulting.png",
      description: "Cabinet de conseil en stratégie",
      website: "https://www.nevgroupe.com/"
    },
    // {
    //   name: "CIAI Vertes",
    //   logo: "/partners/ciai.png",
    //   description: "Entreprise écologique",
    //   website: "https://www.ciaivertes.bj"
    // },
  ]

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners]

  const handlePartnerClick = (website: string) => {
    if (!isDragging) {
      window.open(website, '_blank', 'noopener,noreferrer')
    }
  }

  // Desktop auto-animation
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    // Only run auto-animation on desktop and when in view
    const mediaQuery = window.matchMedia('(min-width: 640px)')
    if (!mediaQuery.matches || !isSliderInView) return

    let animationId: number
    let startTime: number | null = null
    const duration = 40000 // 40 seconds for full cycle

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      
      const elapsed = currentTime - startTime
      const progress = (elapsed % duration) / duration
      
      // Calculate translation - move from 0 to -33.33% (one third of tripled content)
      const translateX = progress * -33.33
      
      slider.style.transform = `translateX(${translateX}%)`
      
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      if (!isDragging) {
        startTime = null // Reset start time to avoid jump
        animationId = requestAnimationFrame(animate)
      }
    }

    slider.addEventListener('mouseenter', handleMouseEnter)
    slider.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      slider.removeEventListener('mouseenter', handleMouseEnter)
      slider.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDragging, isSliderInView])

  // Mobile touch/drag functionality
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true)
      setStartX(e.touches[0].pageX - container.offsetLeft)
      setScrollLeft(container.scrollLeft)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.touches[0].pageX - container.offsetLeft
      const walk = (x - startX) * 1.5
      container.scrollLeft = scrollLeft - walk
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, startX, scrollLeft])

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animation */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            isHeaderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="outline" className=" mb-4 border-primary/30 text-primary">
            {t("title")}
          </Badge>
          {/* <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
            {t("title")}
          </h2> */}
          {/* <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            {t("subtitle")}
          </p> */}
        </div>

        {/* Desktop Partners Slider */}
        <div 
          ref={sliderWrapperRef}
          className={`hidden sm:block relative overflow-hidden mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${
            isSliderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div
            ref={sliderRef}
            className="flex items-center gap-8 sm:gap-12 lg:gap-16 py-8"
            style={{ width: '300%' }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 group relative cursor-pointer"
                onClick={() => handlePartnerClick(partner.website)}
              >
                <div className="flex items-center justify-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 border border-gray-100 hover:border-primary/30">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100 transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Partners Slider - Simplified and Always Visible */}
        <div className="sm:hidden mb-8">
          <div 
            ref={containerRef}
            className="overflow-x-scroll pb-4 scrollbar-hide"
          >
            <div className="flex gap-4 px-4 w-max">
              {partners.map((partner, index) => (
                <div
                  key={partner.name}
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => handlePartnerClick(partner.website)}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center p-3 bg-white rounded-xl shadow-sm active:shadow-md transition-all duration-300 w-20 h-20 border border-gray-100 active:border-primary/30 transform active:scale-105">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs font-medium text-foreground mt-2 text-center w-20 truncate">
                      {partner.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center transition-all duration-800 delay-600 ${
            isSliderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            {t("wantToBePartner")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-1"
            >
                {t("contactUs")}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}