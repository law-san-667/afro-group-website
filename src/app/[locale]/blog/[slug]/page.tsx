import NotFound from "@/src/app/not-found"
import { Footer } from "@/src/components/footer"
import { Navigation } from "@/src/components/navigation"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Link } from "@/src/i18n/navigation"
import { getBlogPostBySlug, getRecentBlogPosts } from "@/src/lib/blog"
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react"

interface BlogPostPageProps {
  params: { locale: string; slug: string }
}

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(slug)
  const recentPosts = await getRecentBlogPosts(locale, 3)

  if (!post) {
    return NotFound()
  }

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
    content: locale === "fr" ? post.content_fr : post.content_en,
  })

  const { title, content } = getLocalizedContent()

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Article Header */}
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href={`/${locale}/blog`}>
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Retour au blog
              </Button>
            </Link>

            {/* Article Meta */}
            <div className="mb-8">
              {post.featured && <Badge className="mb-4 bg-accent text-accent-foreground">Article vedette</Badge>}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{title}</h1>
              <div className="flex items-center space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.published_at || post.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{post.author_name}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.featured_image_url && (
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden mb-12">
                <img
                  src={post.featured_image_url || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">{content}</div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Articles récents</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recentPosts.slice(0, 3).map((relatedPost) => {
                  const relatedTitle = locale === "fr" ? relatedPost.title_fr : relatedPost.title_en
                  const relatedExcerpt = locale === "fr" ? relatedPost.excerpt_fr : relatedPost.excerpt_en

                  return (
                    <Card key={relatedPost.id} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{relatedExcerpt}</p>
                        <Link href={`/${locale}/blog/${relatedPost.slug}`}>
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-primary group/btn">
                            Lire la suite
                            <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
