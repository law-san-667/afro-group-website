import { BlogCard } from "@/src/components/blog-card"
import { Footer } from "@/src/components/footer"
import { Navigation } from "@/src/components/navigation"
import { Badge } from "@/src/components/ui/badge"
import { getAllBlogPosts } from "@/src/lib/blog"

interface BlogPageProps {
  params: { locale: string }
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const posts = await getAllBlogPosts(locale)

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Actualités & Insights
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Découvrez les dernières tendances en FinTech, éducation financière et transformation digitale en Afrique
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} featured={index === 0} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl font-bold text-muted-foreground">A</div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Articles à venir</h3>
              <p className="text-muted-foreground">
                Nous préparons du contenu passionnant pour vous. Revenez bientôt !
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
