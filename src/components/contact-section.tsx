"use client"

import type React from "react"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { useInView } from "@/src/hooks/use-in-view"
import emailjs from "@emailjs/browser"
import { AlertCircle, CheckCircle, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message: string
}

export function ContactSection() {
  const t = useTranslations("contact")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" })

  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })
  const { ref: headerRef, isInView: isHeaderInView } = useInView({ threshold: 0.3 })
  const { ref: formRef, isInView: isFormInView } = useInView({ threshold: 0.2 })
  const { ref: infoRef, isInView: isInfoInView } = useInView({ threshold: 0.2 })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: "loading", message: "" })

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id"
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id"
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key"

      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        time: new Date().toLocaleString(),
        message: formData.message,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setStatus({ type: "success", message: t("success") })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("EmailJS Error:", error)
      setStatus({ type: "error", message: t("error") })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@afrogroup-sn.com",
      href: "mailto:contact@afrogroup-sn.com",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+221 77 403 82 37",
      href: "tel:+221774038237",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Dakar, Nord Foire BCEAO 2 RA06",
      href: "#",
    },
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-background via-accent/5 to-background"
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
          <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
            Contact
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Contact Form with animation */}
          <div 
            ref={formRef}
            className={`h-fit transition-all duration-1000 delay-200 ${
              isFormInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl text-foreground">
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm">{t("name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={status.type === "loading"}
                        className="focus:ring-primary focus:border-primary border border-gray-300 transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">{t("email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={status.type === "loading"}
                        className="focus:ring-primary focus:border-primary border border-gray-300 transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm">{t("subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={status.type === "loading"}
                      className="focus:ring-primary focus:border-primary border border-gray-300 transition-all duration-300 focus:scale-105"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm">{t("message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={status.type === "loading"}
                      className="focus:ring-primary focus:border-primary resize-none border border-gray-300 transition-all duration-300 focus:scale-105"
                    />
                  </div>

                  {/* Status Messages */}
                  {status.type === "success" && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg animate-fade-in">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{status.message}</span>
                    </div>
                  )}

                  {status.type === "error" && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg animate-fade-in">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{status.message}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status.type === "loading"}
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    {status.type === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {t("send")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information with animation */}
          <div 
            ref={infoRef}
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-400 ${
              isInfoInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Informations de contact
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div 
                      key={index} 
                      className={`flex items-start space-x-3 sm:space-x-4 transition-all duration-700 hover:transform hover:scale-105 ${
                        isInfoInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${600 + index * 150}ms` }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/20 hover:scale-110">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                          {info.label}
                        </h4>
                        {info.href.startsWith("#") ? (
                          <p className="text-sm sm:text-base text-muted-foreground break-words">
                            {info.value}
                          </p>
                        ) : (
                          <a 
                            href={info.href} 
                            className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all duration-300 break-words hover:underline"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}
