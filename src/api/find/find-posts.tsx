import { payload } from "@/config/instance";


export default async function findPosts(query?: string) {
    const posts = await payload.find({
        collection: 'search',
        depth: 1,
        limit: 12,
        select: {
            title: true,
            slug: true,
            categories: true,
            meta: true,
        },
        pagination: false,
        ...(query
            ? {
                where: {
                    or: [
                        { title: { like: query } },
                        { 'meta.description': { like: query } },
                        { 'meta.title': { like: query } },
                        { slug: { like: query } },
                    ],
                },
            }
            : {}),
    })
    return posts
}
