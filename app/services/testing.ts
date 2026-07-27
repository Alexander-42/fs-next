import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { RegistrationFormValues } from "../types";

export const deleteAllTableContents = async () => {
  await db.execute(
    sql`TRUNCATE TABLE reading_list, blogs, users RESTART IDENTITY CASCADE`
  )

}

export const createTestUser = async (userValues: RegistrationFormValues) => {
  const passwordHash = await bcrypt.hash(userValues.password, 10)
  const [createdTestUser] = await db.insert(users).values({ username: userValues.username, name: userValues.name, passwordHash }).returning({ id: users.id, name: users.name, username: users.username })
  return createdTestUser
}