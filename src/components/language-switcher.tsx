"use client"

import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

const languages = [
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    country: "France"
  },
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    country: "United States"
  }
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Remove the current locale from the pathname if it exists
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
      
      // Navigate to the new locale path
      router.push(`/${newLocale}${pathWithoutLocale}`)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled={isPending}
        >
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline font-medium">{currentLanguage.name}</span>
          <ChevronDown className="h-4 w-4 opacity-70 transition-transform data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] z-50">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center space-x-3 cursor-pointer p-3 hover:bg-accent hover:text-accent-foreground ${
              locale === language.code ? "bg-muted" : ""
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col flex-1">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-muted-foreground">{language.country}</span>
            </div>
            {locale === language.code && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
