export const PATHS = {
  HOME: '/',
  JOIN: '/join',
  NEWS: '/news',
  newsItem: (slug: string) => `/news/${slug}`,
  EDU_PROGRAMS: '/edu-programs',
} as const
