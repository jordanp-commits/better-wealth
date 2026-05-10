import type { MetadataRoute } from 'next'

const SITE = 'https://better-wealth.co.uk'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/booking-confirmation',
          '/workshops/paid-advertising/book',
          '/workshops/entering-financial-services/book',
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
