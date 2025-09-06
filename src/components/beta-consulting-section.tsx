"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Cog,
  HeadphonesIcon,
  Lightbulb,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function BetaConsultingSection() {
  const t = useTranslations("beta");

  const services = [
    {
      icon: Lightbulb,
      titleKey: "strategy",
      description:
        "Élaboration de stratégies digitales sur mesure pour accélérer votre transformation",
      color: "bg-blue-primary/10 text-blue-primary",
    },
    {
      icon: Cog,
      titleKey: "implementation",
      description:
        "Déploiement de solutions technologiques robustes et évolutives",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Users,
      titleKey: "training",
      description:
        "Formation complète de vos équipes aux nouveaux outils et processus",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: HeadphonesIcon,
      titleKey: "support",
      description:
        "Accompagnement continu pour garantir le succès de votre transformation",
      color: "bg-accent/10 text-accent",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Audit & Analyse",
      description: "Évaluation complète de votre écosystème digital actuel",
    },
    {
      step: "02",
      title: "Stratégie",
      description: "Conception d'une roadmap personnalisée de transformation",
    },
    {
      step: "03",
      title: "Implémentation",
      description: "Déploiement progressif des solutions avec accompagnement",
    },
    {
      step: "04",
      title: "Optimisation",
      description: "Suivi continu et amélioration des performances",
    },
  ];

  const achievements = [
    { icon: Building2, value: "200+", label: "Entreprises accompagnées" },
    { icon: TrendingUp, value: "85%", label: "Amélioration moyenne ROI" },
    { icon: Shield, value: "99.9%", label: "Taux de disponibilité" },
    { icon: Zap, value: "6 mois", label: "Délai moyen de transformation" },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-primary/5 via-background to-blue-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-blue-primary/30 text-blue-primary"
          >
            {t("subtitle")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {t("title")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-border/50 hover:border-blue-primary/30 transition-all duration-300 hover:shadow-lg group"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">
                    {t(`services.${service.titleKey}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="w-full flex items-center justify-center mb-20">
          {/* Link to https://betaconsulting-sn.com */}
          <Button size="lg" className="" onClick={() => window.open("https://betaconsulting-sn.com", "_blank")}>
            {t("seeMore")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Achievements */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-blue-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-blue-primary mb-1">{achievement.value}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </div>
            )
          })}
        </div> */}

        {/* Testimonial */}
        {/* <div className="bg-gradient-to-r from-blue-primary/5 to-blue-secondary/5 rounded-2xl p-8 lg:p-12 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>
              <blockquote className="text-lg lg:text-xl text-foreground italic mb-6">
                "BETA Consulting a transformé notre approche digitale. Leur expertise nous a permis d'augmenter notre
                efficacité de 300% en seulement 6 mois."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-primary to-blue-secondary rounded-full flex items-center justify-center text-white font-bold">
                  AM
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Amadou Mbaye</div>
                  <div className="text-sm text-muted-foreground">CEO, EcoBank Sénégal</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* CTA Section */}
        {/* <div className="text-center bg-gradient-to-r from-blue-primary to-blue-secondary rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">Prêt à accélérer votre transformation digitale ?</h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Discutons de vos défis et découvrons ensemble comment BETA Consulting peut vous accompagner vers le succès.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-primary hover:bg-white/90">
              {t("cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              Télécharger notre brochure
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
