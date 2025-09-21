"use client"

import { Button } from "@/src/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, useTransition } from "react"

const languages = [
	{
		code: "fr",
		name: "Français",
		flag: "🇫🇷",
		country: "France",
	},
	{
		code: "en",
		name: "English",
		flag: "🇬🇧",
		country: "United Kingdom",
	},
]

interface LanguageSwitcherProps {
	isScrolled?: boolean
}

export function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
	const locale = useLocale()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

	const handleLanguageChange = (newLocale: string) => {
		if (newLocale === locale) {
			setIsOpen(false)
			return
		}

		startTransition(() => {
			// Get the pathname without locale
			const segments = pathname.split('/').filter(Boolean)
			const hasLocaleInPath = segments.length > 0 && languages.some(lang => lang.code === segments[0])

			// Remove current locale if it exists
			const pathWithoutLocale = hasLocaleInPath ? '/' + segments.slice(1).join('/') : pathname

			// Create new URL with the new locale
			let newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
			
			// Ensure we don't have double slashes
			newPath = newPath.replace(/\/+/g, '/')
			
			// Store the new locale in a cookie for persistence
			document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=lax`
			
			// Use window.location.href for a full page refresh with the new locale
			window.location.href = newPath
		})
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	// Close dropdown on escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen])

	return (
		<div className="relative" ref={dropdownRef}>
			<Button
				variant="ghost"
				size="sm"
				className={`flex items-center space-x-2 ${
					isScrolled
						? "text-foreground hover:bg-muted hover:text-accent hover:bg-accent/10"
						: "text-white hover:bg-white/10"
				}`}
				disabled={isPending}
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label="Select language"
			>
				<span className="text-lg">{currentLanguage.flag}</span>
				<span className="hidden sm:inline font-medium">{currentLanguage.name}</span>
				<ChevronDown className={`h-4 w-4 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
			</Button>

			{isOpen && (
				<div 
					className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-[100] py-1"
					role="listbox"
					aria-label="Language options"
				>
					{languages.map((language) => (
						<button
							key={language.code}
							onClick={() => handleLanguageChange(language.code)}
							disabled={isPending}
							role="option"
							aria-selected={locale === language.code}
							className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors ${
								locale === language.code ? "bg-muted" : ""
							} ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
						>
							<span className="text-lg">{language.flag}</span>
							<div className="flex flex-col flex-1">
								<span className="font-medium text-sm">{language.name}</span>
								<span className="text-xs text-muted-foreground">{language.country}</span>
							</div>
							{locale === language.code && (
								<div className="w-2 h-2 bg-primary rounded-full" />
							)}
							{isPending && (
								<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
							)}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
