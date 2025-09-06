"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Link } from "@/src/i18n/navigation"
import type { BlogPost } from "@/src/types/blog"
import { ArrowRight, Calendar, User } from "lucide-react"
import { useLocale } from "next-intl"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const locale = useLocale()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getLocalizedContent = () => ({
    title: locale === "fr" ? post.title_fr : post.title_en,
    excerpt: locale === "fr" ? post.excerpt_fr : post.excerpt_en,
  })

  const { title, excerpt } = getLocalizedContent()

  return (
    <Card
      className={`group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden ${
        featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      {/* Featured Image */}
      <div
        className={`bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden ${
          featured ? "aspect-[2/1]" : "aspect-video"
        }`}
      >
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-primary/20">A</div>
          </div>
        )}
        {post.featured && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>}
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.published_at || post.created_at)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{post.author_name}</span>
          </div>
        </div>
        <h3
          className={`font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className={`text-muted-foreground mb-4 leading-relaxed ${featured ? "line-clamp-4" : "line-clamp-3"}`}>
          {excerpt}
        </p>
        <Link href={`/${locale}/blog/${post.slug}`}>
          <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group/btn">
            Lire la suite
            <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
