export const PATHS = {
  HOME: '/',
  JOIN: '/join',
  NEWS: '/news',
  newsItem: (slug: string) => `/news/${slug}`,
  EDU_PROGRAMS: '/activities', // Note: header links to /activities
  MEMBERS: '/members',
  DOCUMENTS: '/documents',
  ABOUT: '/about',
  CONTACTS: '/contacts',
} as const
