"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { useInView } from "@/src/hooks/use-in-view";
import {
  Bot,
  Check,
  GraduationCap,
  PencilRuler,
  Users
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function FinEdSection() {
  const t = useTranslations("fined");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  const { ref: headerRef, isInView: isHeaderInView } =
    useInView<HTMLDivElement>({ threshold: 0.3 });
  const { ref: contentRef, isInView: isContentInView } =
    useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: phoneRef, isInView: isPhoneInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });
  const { ref: pricingRef, isInView: isPricingInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const features = [
    {
      icon: GraduationCap,
      titleKey: "education",
      description:
        "Des modules interactifs et ludiques, conçus pour booster ton apprentissage et suivre tes avancées",
    },
    {
      icon: PencilRuler,
      titleKey: "tools",
      description:
        "Découvrez des outils puissants, simples et accessibles : simulateur d'investissement, suivi budgétaire et bien plus, pour booster vos compétences financières.",
    },
    {
      icon: Users,
      titleKey: "community",
      description:
        "Rejoignez une communauté interactive animée par des experts financiers, où apprendre et progresser devient une expérience collective.",
    },
    {
      icon: Bot,
      titleKey: "ai",
      description:
        "Votre coach financier personnel, propulsé par l'IA, pour vous guider, répondre à vos questions et vous aider à prendre les meilleures décisions au quotidien.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animation */}
        <div
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isHeaderInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex-col gap-4 items-center justify-center mb-2 relative mx-auto">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              {t("subtitle")}
            </Badge>
          </div>
          <div className="flex-col gap-4 items-center justify-center mb-4 relative mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary border-primary/20"
            >
              {t("secondsubtitle")}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 text-balance leading-tight">
            {t("title")}
          </h2>
          <p className="text-md sm:text-md lg:text-2xl font-semibold text-muted-foreground mb-4">
            {t("tagline")}
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mb-16 sm:mb-20">
          {/* Left Content with staggered animations */}
          <div ref={contentRef} className="space-y-6 sm:space-y-8">
            {/* Features Grid */}
            <div className="grid gap-4 sm:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className={`border-border/50 hover:border-primary/30 transition-all duration-700 group ${
                      isContentInView
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                            {t(`features.${feature.titleKey}`)}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {t(`featuresDescription.${feature.titleKey}`)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Download Buttons with animation */}
            <div
              className={`space-y-3 sm:space-y-4 pt-4 transition-all duration-800 delay-600 ${
                isContentInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-sm font-medium text-muted-foreground">
                {t("downloadText")}
              </p>
              <div className="flex flex-row gap-3 sm:gap-4">
                {/* App Store Button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center justify-start space-x-3 px-4 sm:px-6 py-3 sm:py-4 h-auto border-2 hover:bg-muted/50 group transform hover:scale-105 transition-all duration-300"
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/sn/app/fined-mobile/id6747647784",
                      "_blank"
                    )
                  }
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center group-hover:bg-black/80 transition-colors flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.13997 6.91 8.85997 6.88C10.15 6.86 11.38 7.75 12.1 7.75C12.81 7.75 14.28 6.68 15.84 6.84C16.48 6.87 18.02 7.11 19.05 8.57C18.96 8.63 17.15 9.74 17.17 11.94C17.19 14.58 19.68 15.59 19.7 15.6C19.67 15.69 19.31 16.96 18.71 19.5Z" />
                      <path d="M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground">
                      {t("downloadOn")}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">
                      App Store
                    </div>
                  </div>
                </Button>

                {/* Google Play Button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center justify-start space-x-3 px-4 sm:px-6 py-3 sm:py-4 h-auto border-2 hover:bg-muted/50 group transform hover:scale-105 transition-all duration-300"
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.lawsan.fined",
                      "_blank"
                    )
                  }
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center group-hover:from-green-500 group-hover:to-blue-600 transition-all flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground">
                      {t("availableOn")}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">
                      Google Play
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Visual with animation */}
          <div
            ref={phoneRef}
            className={`relative flex justify-center transition-all duration-1000 delay-300 ${
              isPhoneInView
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            {/* Main Phone Mockup */}
            <div className="relative w-64 sm:w-80 h-[480px] sm:h-[600px]">
              <div className="w-full h-full">
                {/* Phone Screen Content */}
                <img
                  src="/fined-phone-mockup.png"
                  alt="fined-app-mockup"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating Elements - hide on mobile with enhanced animations */}
            <div
              className={`hidden sm:block absolute -top-4 -left-4 w-16 sm:w-20 h-16 sm:h-20 bg-accent/20 rounded-full animate-pulse transition-all duration-1000 delay-700 ${
                isPhoneInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
            <div
              className={`hidden sm:block absolute -bottom-6 -right-6 w-12 sm:w-16 h-12 sm:h-16 bg-primary/20 rounded-lg rotate-12 animate-bounce transition-all duration-1000 delay-900 ${
                isPhoneInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
            <div
              className={`hidden sm:block absolute top-1/3 -right-8 w-10 sm:w-12 h-10 sm:h-12 bg-secondary/30 rounded-full animate-pulse delay-1000 transition-all duration-1000 delay-1100 ${
                isPhoneInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div
          ref={pricingRef}
          className={`mt-16 sm:mt-20 lg:mt-32 transition-all duration-1000 ${
            isPricingInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Pricing Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary border-primary/20"
            >
              {t("pricing.subtitle")}
            </Badge>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">
              {t("pricing.title")}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("pricing.description")}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={`text-sm font-medium ${
                  billingCycle === "monthly"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {t("pricing.monthlyTitle")}
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly"
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  billingCycle === "yearly" ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  billingCycle === "yearly"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {t("pricing.yearlyTitle")}
              </span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
            {/* Free Pack */}
            <Card
              className={`relative border-border/50 hover:border-primary/30 transition-all duration-700 flex flex-col h-full ${
                isPricingInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h4 className="text-md font-bold text-foreground mb-2">
                    {t("pricing.packs.free.name")}
                  </h4>
                  <div className="text-md sm:text-md font-bold text-primary mb-1">
                    {t("pricing.packs.free.price.monthly")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.packs.free.objective")}
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {Array.from({ length: 4 }, (_, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {t(`pricing.packs.free.features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => window.open("https://onelink.to/akekfv", "_blank")}
                  >
                    {t("pricing.getStarted")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Premium Pack */}
            <Card
              className={`relative border-border/50 hover:border-primary/30 transition-all duration-700 flex flex-col h-full ${
                isPricingInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {/* Most Popular Badge */}
              {/* <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span className="text-xs font-medium">{t("pricing.mostPopular")}</span>
                </Badge>
              </div> */}

              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h4 className="text-md font-bold text-foreground mb-2">
                    {t("pricing.packs.premium.name")}
                  </h4>
                  <div className="text-md sm:text-md font-bold text-primary mb-1">
                    {billingCycle === "monthly"
                      ? t("pricing.packs.premium.price.monthly.cfa")
                      : t("pricing.packs.premium.price.yearly.cfa")}
                    <span className="text-sm font-normal text-muted-foreground">
                      {billingCycle === "monthly"
                        ? t("pricing.monthly")
                        : t("pricing.yearly")}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {billingCycle === "monthly"
                      ? t("pricing.packs.premium.price.monthly.usd")
                      : t("pricing.packs.premium.price.yearly.usd")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.packs.premium.objective")}
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {Array.from({ length: 9 }, (_, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {t(`pricing.packs.premium.features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleGetStarted}>
                    {t("pricing.getStarted")}
                  </Button>
                </div>
              </CardContent>
            </Card>
 
            {/* Student Pack */}
            {/* <Card
              className={`relative border-border/50 hover:border-primary/30 transition-all duration-700 flex flex-col h-full ${
                isPricingInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h4 className="text-md font-bold text-foreground mb-2">
                    {t("pricing.packs.student.name")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.packs.student.objective")}
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {Array.from({ length: 4 }, (_, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {t(`pricing.packs.student.features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button className="w-full" onClick={handleGetStarted}>{t("pricing.askAQuote")}</Button>
                </div>
              </CardContent>
            </Card> */}

            {/* Entrepreneur Pack */}
            <Card
              className={`relative border-border/50 hover:border-primary/30 transition-all duration-700 flex flex-col h-full ${
                isPricingInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h4 className="text-md font-bold text-foreground mb-2">
                    {t("pricing.packs.entrepreneur.name")}
                  </h4>
                  <div className="text-md sm:text-md font-bold text-primary mb-1">
                    {billingCycle === "monthly"
                      ? t("pricing.packs.entrepreneur.price.monthly.cfa")
                      : t("pricing.packs.entrepreneur.price.yearly.cfa")}
                    <span className="text-sm font-normal text-muted-foreground">
                      {billingCycle === "monthly"
                        ? t("pricing.monthly")
                        : t("pricing.yearly")}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {billingCycle === "monthly"
                      ? t("pricing.packs.entrepreneur.price.monthly.usd")
                      : t("pricing.packs.entrepreneur.price.yearly.usd")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.packs.entrepreneur.objective")}
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {Array.from({ length: 4 }, (_, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {t(`pricing.packs.entrepreneur.features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button className="w-full" onClick={handleGetStarted}>
                    {t("pricing.getStarted")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* B2G Education Pack */}
            {/* <Card
              className={`relative border-border/50 hover:border-primary/30 transition-all duration-700 flex flex-col h-full ${
                isPricingInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h4 className="text-md font-bold text-foreground mb-2">
                    {t("pricing.packs.b2g.name")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.packs.b2g.objective")}
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {Array.from({ length: 4 }, (_, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {t(`pricing.packs.b2g.features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button className="w-full" onClick={handleGetStarted}>
                    {t("pricing.askAQuote")}
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
}
