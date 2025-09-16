"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useInView } from "@/src/hooks/use-in-view";
import { Code, ExternalLink, Lightbulb, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export function BetaConsultingSection() {
  const t = useTranslations("beta");
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });
  const { ref: headerRef, isInView: isHeaderInView } =
    useInView<HTMLDivElement>({ threshold: 0.3 });
  const { ref: servicesRef, isInView: isServicesInView } =
    useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isInView: isCtaInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  const services = [
    {
      icon: Users,
      titleKey: "training",
      description:
        "Formation et accompagnement de vos équipes professionnelles",
      color: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      icon: Lightbulb,
      titleKey: "strategy",
      description: "Accompagnement et conseil en stratégie blockchain",
      color: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      icon: Code,
      titleKey: "implementation",
      description:
        "Développement de solutions IT Blockchain adaptées à vos réalités",
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
        <div
          className={`absolute top-10 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl transition-all duration-1000 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
        <div
          className={`absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/5 rounded-full blur-2xl transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with Logo - Enhanced Animation */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isHeaderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div
              className={`relative group transition-all duration-1200 ease-out delay-200 ${
                isHeaderInView
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 -rotate-12"
              }`}
            >
              {/* Animated Background Glow */}
              <div
                className={`absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 blur-xl transition-all duration-1000 ${
                  isHeaderInView
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75"
                } group-hover:blur-2xl group-hover:scale-110`}
              />

              {/* Main Logo Container */}
              <div
                className={`relative bg-white rounded-2xl border border-gray-100 p-1 shadow-lg transition-all duration-800 delay-300 ${
                  isHeaderInView ? "shadow-xl scale-100" : "shadow-sm scale-90"
                } group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-105`}
              >
                <div className="relative overflow-hidden rounded-xl">
                  {/* Logo Image with Enhanced Animation */}
                  <img
                    src="/beta.png"
                    alt="BETA Consulting Logo"
                    className={`h-32 w-auto mx-auto transition-all duration-1000 delay-500 ${
                      isHeaderInView
                        ? "opacity-100 scale-100 rotate-0 brightness-100"
                        : "opacity-0 scale-75 rotate-6 brightness-125"
                    } group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110`}
                  />
                </div>
              </div>

              {/* Floating Particles Animation */}
              <div
                className={`absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full transition-all duration-1000 delay-700 ${
                  isHeaderInView ? "opacity-70 animate-float" : "opacity-0"
                }`}
              />
              <div
                className={`absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full transition-all duration-1000 delay-900 ${
                  isHeaderInView
                    ? "opacity-60 animate-float-delayed"
                    : "opacity-0"
                }`}
              />
              <div
                className={`absolute top-1/3 -right-3 w-1.5 h-1.5 bg-green-400 rounded-full transition-all duration-1000 delay-1100 ${
                  isHeaderInView ? "opacity-50 animate-float-slow" : "opacity-0"
                }`}
              />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 text-balance leading-tight">
            BETA Consulting
          </h2>

          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-6">
            Blockchain Expertise & Technology Advisory
          </h3>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("description")}
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
                <CardHeader className="pb-6">
                  {/* Icon and Title on the same line */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.color} transition-all duration-300 group-hover:scale-110 flex-shrink-0`}
                    >
                      <Icon className={`h-7 w-7 ${service.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                      {t(`servicesDescription.${service.titleKey}`)}
                      {/* {t(`services.${service.titleKey}`)} */}
                    </CardTitle>
                  </div>
                </CardHeader>
                {/* <CardContent>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {t(`servicesDescription.${service.titleKey}`)}
                  </p>
                </CardContent> */}
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
                {t("footer")}
              </p>

              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 px-8 py-4 text-base sm:text-lg font-semibold"
                onClick={() =>
                  window.open("https://betaconsulting-sn.com", "_blank")
                }
              >
                {t("seeMore")}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-180deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 1s;
        }

        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
}
