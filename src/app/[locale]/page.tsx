import { BetaConsultingSection } from "@/src/components/beta-consulting-section"
import { ContactSection } from "@/src/components/contact-section"
import { FinEdSection } from "@/src/components/fined-section"
import { Footer } from "@/src/components/footer"
import { HeroSection } from "@/src/components/hero-section"
import { Navigation } from "@/src/components/navigation"
import { PartnersSection } from "@/src/components/partners-section"
import { getRecentBlogPosts } from "@/src/lib/blog"

interface HomePageProps {
  params: { locale: string }
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const recentPosts = await getRecentBlogPosts(locale, 3)

  return (
    <div className="min-h-screen">
      <Navigation />
      <section id="home">
        <HeroSection />
      </section>
      <section id="services">
        <section className="fined">
        <FinEdSection />
        </section>
        <section className="beta">
          <BetaConsultingSection />
        </section>
      </section>
      <section id="partners">
        <PartnersSection />
      </section>
      {/* <section id="blog">
        <BlogTeaserSection posts={recentPosts} />
      </section> */}
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  )
}
