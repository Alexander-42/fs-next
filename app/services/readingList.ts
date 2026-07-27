import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "./session"
import { getBlogById } from "./blogs"

export const isInReadingList = async (
  userId: number,
  blogId: number
): Promise<boolean> => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })

  return entry !== undefined
}

export const addToReadingList = async (blogId: number): Promise<void> => {
  const currUser = await getCurrentUser()
  if (!currUser) {
    throw new Error("Not logged in")
  }

  const blogToAdd = await getBlogById(blogId)
  if (!blogToAdd) {
    throw new Error("Blog doesn't exist")
  }

  await db.insert(readingList).values({ userId: currUser.id, blogId: blogToAdd.id})
}

export const markAsRead = async (entryId: number): Promise<void> => {
  const currUser = await getCurrentUser()
  if (!currUser) {
    throw new Error("Not logged in")
  }

  const updated = await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, entryId), eq(readingList.userId, currUser.id)))
    .returning()

  if (updated.length === 0) {
    throw new Error("Reading list entry not found")
  }
}