"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, increaseLikeCount } from "../services/blogs"
import type { BlogContent } from "../types"

export const createBlog = async (formData: FormData) => {
  const blogContent: BlogContent = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    url: formData.get("url") as string,
  }

  addBlog({ blogContent })
  revalidatePath("/blogs")
  redirect("/blogs")
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

  increaseLikeCount(blogId)
  revalidatePath("/blogs")
}

export const applyFilter = async (formData: FormData) => {
  const rawFilter = formData.get('rawFilter')
  if (typeof rawFilter !== "string" || rawFilter.trim() === "") {
    throw new Error('Search term has to be alphanumeric')
  }
  redirect(`/blogs?filter=${rawFilter}`)
}