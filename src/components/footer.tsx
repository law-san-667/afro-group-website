"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Link } from "@/src/i18n/navigation"
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M20.52 3.48C18.24 1.2 15.24 0 12 0 5.37 0 .01 5.37.01 12c0 2.1.55 4.16 1.6 5.98L0 24l6.21-1.63C8.07 23.44 10.01 24 12 24c6.63 0 12-5.37 12-12 0-3.24-1.2-6.24-3.48-8.52zM12 22.1c-1.91 0-3.73-.56-5.29-1.61l-.38-.24-3.69.97.99-3.6-.25-.37C2.33 15.7 1.9 13.87 1.9 12 1.9 6.36 6.36 1.9 12 1.9c2.68 0 5.2 1.04 7.09 2.93S22.02 9.24 22.02 11.92C22 17.56 17.44 22.1 12 22.1zm5.472-7.718c-.297-.149-1.758-.867-2.03-.967-.273-.1-.472-.149-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.009-.372-.011-.571-.011s-.521.074-.794.372c-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.123-.272-.198-.57-.347z"
      />
    </svg>
  )
}

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
    { icon: WhatsAppIcon, href: "http://wa.me/221774038237", label: "WhatsApp" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/afrogroup-services/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/fined.mobile?igsh=MWpuZW84YXRneGVhbw%3D%3D&utm_source=qr ", label: "Instagram" },
  ]

  return (
    <>
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
    {/* Floating WhatsApp Button */}
    <a
      href="http://wa.me/221774038237"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/70"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
    </>
  )
}
