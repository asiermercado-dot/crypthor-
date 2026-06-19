import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

const BASE_URL = 'https://crypthor.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    ...articleRoutes,
  ]
}
