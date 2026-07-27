import { db } from "@/db"
import { users, readingList } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserWithBlogsByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}

export const getUserWithBlogsByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  })
}

export const getUserWithReadingListByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { readingList: { with: { blog: true } } }
  })
}

export const updateUserTokenByUserId = async (userId: number, token: string) => {
  await db
    .update(users)
    .set({ token: token})
    .where(eq(users.id, userId))
}