"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, increaseLikeCount } from "../services/blogs"
import { addToReadingList } from "../services/readingList"
import type { BlogContent } from "../types"
import { auth } from "@/auth" 
import { BlogCreationState, BlogCreationValidationErrors } from "../types"


export const createBlog = async (
  prevState: BlogCreationState,
  formData: FormData
): Promise<BlogCreationState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const blogContent: BlogContent = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    url: formData.get("url") as string,
  }

  let success = true

  const errors: BlogCreationValidationErrors = {}

  if (!blogContent.title || blogContent.title.length < 5) {
    errors.titleError = { "error": "Blog title must be at least 5 characters long" }
  }
  if (!blogContent.author || blogContent.author.length < 5) {
    errors.authorError = { "error": "Blog author must be at least 5 characters long" }
  }
  if (!blogContent.url || blogContent.url.length < 5) {
    errors.urlError = { "error": "Blog url must be at least 5 characters long" }
  }

  if (Object.keys(errors).length > 0) {
    success = false
    const currentErrState: BlogCreationState = { errors, values: { ...blogContent }, success}
    return currentErrState
  }

  const addedBlog = await addBlog(blogContent)
  await addToReadingList(addedBlog.id)

  const currentState = {errors, values: { ...blogContent }, success}

  revalidatePath("/blogs")
  return currentState
}

export const likeBlog = async (formData: FormData) => {
  const rawId = formData.get("id")
  if (typeof rawId !== "string" || rawId.trim() === "") {
    throw new Error("Missing blog id")
  }

  const blogId = Number(rawId)
  if (!Number.isInteger(blogId)) {
    throw new Error(`Invalid blog id: ${rawId}`)
  }

  await increaseLikeCount(blogId)
  revalidatePath("/blogs")
}

export const saveToReadingList = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const rawId = formData.get("id")
  if (typeof rawId !== "string" || rawId.trim() === "") {
    throw new Error("Missing blog id")
  }

  const blogId = Number(rawId)
  if (!Number.isInteger(blogId)) {
    throw new Error(`Invalid blog id: ${rawId}`)
  }

  await addToReadingList(blogId)
  revalidatePath(`/blogs/${blogId}`)
}

export const applyFilter = async (formData: FormData) => {
  const filter = formData.get('filter')
  if (typeof filter !== "string" || filter.trim() === "") {
    throw new Error('Search term has to be alphanumeric')
  }
  redirect(`/blogs?filter=${filter}`)
}