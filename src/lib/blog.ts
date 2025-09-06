import { getSupabaseClient } from "@/src/lib/supabase-server"
import type { BlogPost, BlogPostWithRelations } from "@/src/types/blog"

export async function getFeaturedBlogPosts(locale = "fr", limit = 3): Promise<BlogPost[]> {
  const supabase = await getSupabaseClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_categories (
        blog_categories (*)
      ),
      blog_post_tags (
        blog_tags (*)
      )
    `)
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching featured blog posts:", error)
    return []
  }

  return data || []
}

export async function getRecentBlogPosts(locale = "fr", limit = 6): Promise<BlogPost[]> {
  const supabase = await getSupabaseClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_categories (
        blog_categories (*)
      ),
      blog_post_tags (
        blog_tags (*)
      )
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent blog posts:", error)
    return []
  }

  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithRelations | null> {
  const supabase = await getSupabaseClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_categories (
        blog_categories (*)
      ),
      blog_post_tags (
        blog_tags (*)
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

export async function getAllBlogPosts(locale = "fr"): Promise<BlogPost[]> {
  const supabase = await getSupabaseClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_categories (
        blog_categories (*)
      ),
      blog_post_tags (
        blog_tags (*)
      )
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }

  return data || []
}
