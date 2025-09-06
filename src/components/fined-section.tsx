"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { ArrowRight, PencilRuler, Wallet, GraduationCap, Users } from "lucide-react"
import { useTranslations } from "next-intl"

export function FinEdSection() {
  const t = useTranslations("fined")

  const features = [
    {
      icon: GraduationCap,
      titleKey: "education",
      description: "Modules d'apprentissage interactifs avec gamification et suivi de progression personnalisé",
    },
    {
      icon: Wallet,
      titleKey: "wallet",
      description: "Gestionnaire de portefeuille numérique pour un meilleur suivi sur vos finances",
    },
    {
      icon: PencilRuler,
      titleKey: "tools",
      description: "Des outils pour aller plus loin dans votre éducation financière tels qu'un simulateur d'investissement",
    },
    {
      icon: Users,
      titleKey: "community",
      description: "Communauté d'apprentissage encadrée par des experts financiers",
    },
  ]

  const stats = [
    { value: "95%", label: "Taux de satisfaction" },
    { value: "50K+", label: "Utilisateurs actifs" },
    { value: "85%", label: "Amélioration financière" },
    { value: "24/7", label: "Support disponible" },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t("subtitle")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{t("title")}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors group">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{t(`features.${feature.titleKey}`)}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div> */}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group">
                {t("cta")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Voir la démo
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Phone Mockup */}
            <div className="relative mx-auto w-80 h-[600px]">
              <div className="w-full h-full">
                {/* Phone Screen Content */}
                <img src="/fined-phone-mockup.png" alt="fined-app-mockup" className="w-full h-full object-contain"  />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/20 rounded-full animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary/20 rounded-lg rotate-12 animate-bounce" />
            <div className="absolute top-1/3 -right-8 w-12 h-12 bg-secondary/30 rounded-full animate-pulse delay-1000" />
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Prêt à transformer votre relation avec l'argent ?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'Africains qui ont déjà amélioré leur littératie financière avec FinEd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Commencer gratuitement
            </Button>
            <Button variant="outline" size="lg">
              Planifier une démo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
