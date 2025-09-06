export interface BlogPost {
  id: string
  slug: string
  title_fr: string
  title_en: string
  excerpt_fr?: string
  excerpt_en?: string
  content_fr: string
  content_en: string
  meta_description_fr?: string
  meta_description_en?: string
  featured_image_url?: string
  author_name: string
  author_email?: string
  status: "draft" | "published" | "archived"
  featured: boolean
  published_at?: string
  created_at: string
  updated_at: string
  categories?: BlogCategory[]
  tags?: BlogTag[]
}

export interface BlogCategory {
  id: string
  name_fr: string
  name_en: string
  slug: string
  description_fr?: string
  description_en?: string
  color: string
  created_at: string
}

export interface BlogTag {
  id: string
  name_fr: string
  name_en: string
  slug: string
  created_at: string
}

export interface BlogPostWithRelations extends BlogPost {
  blog_post_categories: {
    blog_categories: BlogCategory
  }[]
  blog_post_tags: {
    blog_tags: BlogTag
  }[]
}
