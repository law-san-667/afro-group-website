"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Link } from "@/src/i18n/navigation"
import type { BlogPost } from "@/src/types/blog"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface BlogTeaserSectionProps {
  posts: BlogPost[]
}

export function BlogTeaserSection({ posts }: BlogTeaserSectionProps) {
  const t = useTranslations("blog")
  const locale = useLocale()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getLocalizedContent = (post: BlogPost) => ({
    title: locale === "fr" ? post.title_fr : post.title_en,
    excerpt: locale === "fr" ? post.excerpt_fr : post.excerpt_en,
  })

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Blog
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{t("title")}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("subtitle")}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => {
              const { title, excerpt } = getLocalizedContent(post)
              return (
                <Card
                  key={post.id}
                  className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden"
                >
                  {/* Featured Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
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
                    {post.featured && (
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
                    )}
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
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {title}
                    </h3>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{excerpt}</p>
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group/btn">
                        {t("readMore")}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Articles à venir</h3>
            <p className="text-muted-foreground">Nous préparons du contenu passionnant pour vous. Revenez bientôt !</p>
          </div>
        )}

        {/* View All Button */}
        {posts.length > 0 && (
          <div className="text-center">
            <Link href={`/${locale}/blog`}>
              <Button size="lg" variant="outline" className="group bg-transparent">
                {t("viewAll")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
