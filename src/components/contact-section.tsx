"use client"

import type React from "react"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: "loading", message: "" })

    try {
      // EmailJS configuration - user will need to set these environment variables
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
    <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
            Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{t("title")}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="h-fit">
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Envoyez-Nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={status.type === "loading"}
                        className="focus:ring-primary focus:border-primary border border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={status.type === "loading"}
                        className="focus:ring-primary focus:border-primary border border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={status.type === "loading"}
                      className="focus:ring-primary focus:border-primary border border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={status.type === "loading"}
                      className="focus:ring-primary focus:border-primary resize-none border border-gray-300"
                    />
                  </div>

                  {/* Status Messages */}
                  {status.type === "success" && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{status.message}</span>
                    </div>
                  )}

                  {status.type === "error" && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{status.message}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status.type === "loading"}
                    className="w-full bg-primary hover:bg-primary/90"
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

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Informations de contact</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.label}</h4>
                        {info.href.startsWith("#") ? (
                          <p className="text-muted-foreground">{info.value}</p>
                        ) : (
                          <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Office Hours */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Heures d'ouverture</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lundi - Vendredi</span>
                    <span className="font-medium">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samedi</span>
                    <span className="font-medium">9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimanche</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Response Promise */}
            {/* <Card className="bg-gradient-to-br from-accent/5 to-orange-secondary/5 border-accent/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Réponse rapide garantie</h4>
                <p className="text-sm text-muted-foreground">
                  Nous nous engageons à répondre à votre message dans les 24 heures ouvrables.
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  )
}
