import type { BlogContent, FullBlog } from "../types"

import { eq, ilike, desc } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async (filter?: string): Promise<FullBlog[]> => {
  const dbFilteredBlogs = await db.query.blogs.findMany({
    where: filter ? ilike(blogs.title, `%${filter}%`) : undefined,
    orderBy: desc(blogs.likes),
  })
  return dbFilteredBlogs
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: eq( blogs.id, id) })
}

export const addBlog = async (blogContent: BlogContent ) => {
  const currUser = await getCurrentUser()
  if (!currUser) {
    throw new Error("Not logged in")
  }

  const [addedBlog] = await db
    .insert(blogs)
    .values({ ...blogContent, userId: currUser.id })
    .returning()
  
  return addedBlog
}

export const increaseLikeCount = async (id: number): Promise<void> => {
  const blog = await getBlogById(id)
  if (!blog) {
    throw Error("Blog not found")
  }
  await db
    .update(blogs)
    .set({ likes: ++blog.likes})
    .where(eq(blogs.id, id))
}