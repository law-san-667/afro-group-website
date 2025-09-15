"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Link } from "@/src/i18n/navigation"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()
  const pathname = usePathname()

  const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/fr"

  const handleSmoothScroll = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const quickLinks = [
    { key: "home", href: "/", sectionId: "home" },
    { key: "about", href: "/about", sectionId: null },
    { key: "services", href: "/services", sectionId: "services" },
    { key: "partners", href: "/partners", sectionId: "partners" },
    { key: "contact", href: "/contact", sectionId: "contact" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  return (
    <footer style={{ backgroundColor: "#10493F" }} className=" text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
            <div className="w-15 h-15 bg-primary rounded-lg flex items-center justify-center">
              <img src="/fined-logo-dark.png" alt="" className="rounded-lg" />
            </div>
              <span className="font-bold text-xl">AFRO Group</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">{t("description")}</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">contact@afrogroup-sn.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">+221 77 403 82 37</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">Dakar, Nord Foire BCEAO 2 RA06</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  {isHomePage && link.sectionId ? (
                    <button
                      onClick={() => handleSmoothScroll(link.sectionId)}
                      className="text-primary-foreground/80 hover:text-accent transition-colors text-left"
                    >
                      {t(link.key)}
                    </button>
                  ) : (
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-primary-foreground/80 hover:text-accent transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h3 className="font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Restez informé de nos dernières actualités et innovations.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="sm" className="w-full">
                S'abonner
              </Button>
            </div>
          </div> 
          */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">© 2024 AFRO Group. {t("rights")}.</p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-primary-foreground/80 text-sm mr-2">{t("followUs")}:</span>
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-primary-foreground/60 hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
