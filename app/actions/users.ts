"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { RegistrationValidationErrors, RegistrationState } from "@/app/types"
import { getUserWithBlogsByUsername } from "../services/users"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../services/session"
import { updateUserTokenByUserId } from "../services/users"
import { redirect } from "next/navigation"

export const registerUser = async (
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> => {

  const errors: RegistrationValidationErrors = {}
  let success = true

  const username = (formData.get("username") as string)?.trim()
  if (!username || username.length < 4) {
    errors.usernameError = { "error": "Username must be at least 4 characters long" }
  }
  const dbUser = await getUserWithBlogsByUsername(username)
  if (dbUser) {
    errors.usernameExistsError = { "error": "Username already taken"}
  }
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  if (!password || password.length < 4) {
    errors.passwordError = { "error": "Password must be at least 4 characters long" }
  }
  const passwordConfirm = formData.get("passwordConfirm") as string
  if (!passwordConfirm || passwordConfirm !== password) {
    errors.passwordConfirmError = { "error": "Passwords do not match"}
  }

  if (Object.keys(errors).length > 0) {
    success = false
    const currentErrState: RegistrationState = { errors, values: { username, name, password }, success}
    return currentErrState
  }

  const currentState: RegistrationState = { errors, values: { username, name, password}, success}

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  revalidatePath("/login")
  return currentState
}

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const token = crypto.randomUUID()

  await updateUserTokenByUserId(user.id, token)
  return token
}