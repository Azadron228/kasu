export const PATHS = {
  home: '/',
  join: '/join',
  news: '/news',
  newsItem: (slug: string) => `/news/${slug}`,
} as const
