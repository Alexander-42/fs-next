"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { markAsRead } from "../services/readingList"

export const markReadingListEntryAsRead = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const rawId = formData.get("entryId")
  if (typeof rawId !== "string" || rawId.trim() === "") {
    throw new Error("Missing reading list entry id")
  }

  const entryId = Number(rawId)
  if (!Number.isInteger(entryId)) {
    throw new Error(`Invalid reading list entry id: ${rawId}`)
  }

  await markAsRead(entryId)
  revalidatePath("/me")
}
