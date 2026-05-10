import type { MetadataRoute } from 'next'

const SITE = 'https://better-wealth.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: `${SITE}/`,                                        lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/about`,                                   lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/workshops`,                               lastModified, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/workshops/paid-advertising`,              lastModified, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/workshops/entering-financial-services`,   lastModified, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/partnerships`,                            lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`,                                 lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/privacy`,                                 lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE}/cookie-policy`,                           lastModified, changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
