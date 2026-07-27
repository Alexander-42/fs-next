"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { BlogCreationState } from "@/app/types"
import { useRouter } from "next/navigation"
import { useNotification } from "@/app/components/NotificationContext"

const NewBlogPage = () => {
  const initialState: BlogCreationState = { errors: {}, values: {title: "", url: "", author: ""}, success: false}
  const [state, formAction] = useActionState(createBlog, initialState)
  const router = useRouter()
  const { showNotification } = useNotification()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  const inputClass =
    "w-full rounded border border-line bg-background px-3 py-2 text-sm text-strong outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
  const labelClass =
    "flex flex-col gap-1 text-sm font-medium text-foreground"
  const errorClass = "mt-1 text-sm text-red-500"

  return (
    <div className="mx-auto max-w-md rounded-lg border border-line bg-surface p-6">
      <h2 className="text-xl font-bold tracking-tight text-strong">
        Create a new blog
      </h2>
      <form action={formAction} className="mt-5 space-y-4">
        <div>
          <label className={labelClass}>
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values.title}
              required
              className={inputClass}
            />
          </label>
          {state.errors.titleError && (
            <p className={errorClass}>{state.errors.titleError.error}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values.author}
              required
              className={inputClass}
            />
          </label>
          {state.errors.authorError && (
            <p className={errorClass}>{state.errors.authorError.error}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>
            URL
            <input
              type="text"
              name="url"
              defaultValue={state.values.url}
              required
              className={inputClass}
            />
          </label>
          {state.errors.urlError && (
            <p className={errorClass}>{state.errors.urlError.error}</p>
          )}
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full rounded bg-accent-fill px-4 py-2 text-sm font-medium text-accent-fill-fg transition-colors hover:bg-accent-fill-hover"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlogPage