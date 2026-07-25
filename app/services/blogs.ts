import type { BlogContent, FullBlog } from "../types"

import { eq, ilike, desc } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"


let nextId = 2
const defaultLikes = 0

export const getBlogs = async (filter?: string): Promise<FullBlog[]> => {
  const dbFilteredBlogs = await db.query.blogs.findMany({
    where: filter ? ilike(blogs.title, `${filter}`) : undefined,
    orderBy: desc(blogs.likes),
  })
  return dbFilteredBlogs
}

export const getBlogById = async (id: number): Promise<FullBlog | undefined> => {
  return await db.query.blogs.findFirst({ where: eq( blogs.id, id) })
}

interface addBlogProps {
  blogContent: BlogContent
}

export const addBlog = async ({ blogContent }: addBlogProps ): Promise<void> => {
  await db.insert(blogs).values({ ...blogContent })
}

export const increaseLikeCount = async ( id: number ): Promise<void> => {
  const blog = await getBlogById(id)
  if (!blog) {
    throw Error("Blog not found")
  }
  await db
    .update(blogs)
    .set({ likes: ++blog.likes})
    .where(eq(blogs.id, id))
}