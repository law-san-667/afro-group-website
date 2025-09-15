"use client"

import { Badge } from "@/src/components/ui/badge"
import { useTranslations } from "next-intl"

export function PartnersSection() {
  const t = useTranslations()

  const partners = [
    {
      name: "AIESEC",
      logo: "/partners/aiesec.png",
      description: "Organisation internationale de jeunesse"
    },
    {
      name: "CESAG",
      logo: "/partners/cesag.png",
      description: "Centre d'Études Supérieures de l'Afrique de Gestion"
    },
    {
      name: "CGF Bourse",
      logo: "/partners/cgf-bourse.png",
      description: "Courtage et gestion financière"
    },
    {
      name: "EtriLabs",
      logo: "/partners/etrilabs.webp",
      description: "Laboratoire d'innovation technologique"
    },
    {
      name: "Impact Hub",
      logo: "/partners/impact-hub.jpeg",
      description: "Réseau mondial d'innovation sociale"
    },
    {
      name: "KALP",
      logo: "/partners/kalp.jpg",
      description: "Partenaire technologique"
    },
    {
      name: "NEV Consulting",
      logo: "/partners/nev-consulting.png",
      description: "Cabinet de conseil en stratégie"
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Partenaires
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
            Ils nous font confiance
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Nos partenaires de confiance qui nous accompagnent dans notre mission de transformation digitale de l'Afrique.
          </p>
        </div>

        {/* Partners Grid - Better mobile layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="group relative flex items-center justify-center p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:cursor-pointer transition-all duration-300 hover:-translate-y-1 w-full aspect-square max-w-[120px] sm:max-w-none"
              title={partner.description}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                loading="lazy"
              />
              
              {/* Tooltip on hover - hide on mobile */}
              <div className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                {partner.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            Vous souhaitez devenir partenaire ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}