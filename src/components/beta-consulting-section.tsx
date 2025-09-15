"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useInView } from "@/src/hooks/use-in-view";
import {
  Code,
  ExternalLink,
  Lightbulb,
  Users
} from "lucide-react";
import { useTranslations } from "next-intl";

export function BetaConsultingSection() {
  const t = useTranslations("beta");
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const { ref: headerRef, isInView: isHeaderInView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { ref: servicesRef, isInView: isServicesInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isInView: isCtaInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  const services = [
    {
      icon: Users,
      title: "Formation et accompagnement",
      description: "Formation et accompagnement de vos équipes professionnelles",
      color: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      icon: Lightbulb,
      title: "Conseil en stratégie",
      description: "Accompagnement et conseil en stratégie blockchain",
      color: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      icon: Code,
      title: "Développement de solutions",
      description: "Développement de solutions IT Blockchain adaptées à vos réalités",
      color: "bg-purple-100",
      iconColor: "text-purple-700",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 relative overflow-hidden"
    >
      {/* Background decorations with animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl transition-all duration-1000 ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`} />
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`} />
        <div className={`absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/5 rounded-full blur-2xl transition-all duration-1000 delay-500 ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with Logo - Animated */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isHeaderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className={`relative group transition-all duration-800 delay-200 ${
              isHeaderInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}>
              <div className="absolute -inset-4 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <img 
                  src="/beta.png" 
                  alt="BETA Consulting Logo" 
                  className="h-20 w-auto mx-auto"
                />
              </div>
            </div>
          </div>
          
          <Badge
            variant="outline"
            className="mb-4 border-blue-500/30 text-blue-600 bg-blue-50/50"
          >
            Partenaire Technologique
          </Badge>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 text-balance leading-tight">
            BETA Consulting
          </h2>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-6">
            Blockchain Expertise & Technology Advisory
          </h3>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            BETA Consulting conseille et guide les entreprises et institutions dans leur transformation digitale via la blockchain, en offrant une expertise pointue dans les secteurs financiers, logistiques et administratifs.
          </p>
        </div>

        {/* Services Grid with staggered animation */}
        <div 
          ref={servicesRef}
          className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 hover:cursor-pointer hover:-translate-y-2 group bg-white/80 backdrop-blur-sm ${
                  isServicesInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="relative mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.color} transition-all duration-300 group-hover:scale-110`}>
                      <Icon className={`h-7 w-7 ${service.iconColor}`} />
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section with animation */}
        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-800 ${
            isCtaInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="relative p-6 sm:p-8">
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Explorez comment BETA Consulting peut transformer votre entreprise grâce à l'expertise blockchain
              </p>
              
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 px-8 py-4 text-base sm:text-lg font-semibold"
                onClick={() => window.open("https://betaconsulting-sn.com", "_blank")}
              >
                Voir plus de détails
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
