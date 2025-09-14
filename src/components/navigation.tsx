"use client"

import { LanguageSwitcher } from "@/src/components/language-switcher"
import { Button } from "@/src/components/ui/button"
import { Link } from "@/src/i18n/navigation"
import { Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Navigation() {
  const t = useTranslations("navigation")
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/fr"

  const handleSmoothScroll = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
      }
    }
  }

  const navItems = [
    { key: "home", href: "/", sectionId: "home" },
    // { key: "about", href: "/about", sectionId: null },
    { key: "services", href: "/services", sectionId: "services" },
    // { key: "blog", href: "/blog", sectionId: "blog" },
    { key: "contact", href: "/contact", sectionId: "contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <img src="/fined-logo-dark.png" alt="" className="rounded-lg" />
            </div>
            <span className={`font-bold text-xl transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>
              AFRO Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.key}>
                {isHomePage && item.sectionId ? (
                  <button
                    onClick={() => handleSmoothScroll(item.sectionId)}
                    className={`font-medium transition-colors hover:text-accent ${
                      isScrolled ? "text-foreground" : "text-white"
                    }`}
                  >
                    {t(item.key)}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors hover:text-accent ${
                      isScrolled ? "text-foreground" : "text-white"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            {isHomePage ? (
              <Button variant="default" size="sm" onClick={() => handleSmoothScroll("contact")}>
                {t("contact")}
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link href="/contact">{t("contact")}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? "text-foreground" : "text-white"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.key}>
                  {isHomePage && item.sectionId ? (
                    <button
                      onClick={() => handleSmoothScroll(item.sectionId)}
                      className="block w-full text-left px-3 py-2 text-foreground hover:text-accent font-medium"
                    >
                      {t(item.key)}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-foreground hover:text-accent font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-3 py-2">
                {isHomePage ? (
                  <Button variant="default" size="sm" className="w-full" onClick={() => handleSmoothScroll("contact")}>
                    {t("contact")}
                  </Button>
                ) : (
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <Link href="/contact">{t("contact")}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
