import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { BlogView } from "../../components/BlogView"
import { likeBlog, saveToReadingList } from "@/app/actions/blogs"
import { getCurrentUser } from "../../services/session"
import { isInReadingList } from "../../services/readingList"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const currentUser = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const alreadySaved = currentUser
    ? await isInReadingList(currentUser.id, blog.id)
    : false

  return (
    <div className="space-y-4">
      <BlogView blog={blog} />
      <div className="flex flex-wrap gap-2">
        <form action={likeBlog}>
          <button
            type="submit"
            name="id"
            value={id}
            className="rounded bg-accent-fill px-4 py-2 text-sm font-medium text-accent-fill-fg transition-colors hover:bg-accent-fill-hover"
          >
            like
          </button>
        </form>
        {currentUser &&
          (alreadySaved ? (
            <p className="rounded border border-line px-4 py-2 text-sm font-medium text-muted">
              already in reading list
            </p>
          ) : (
            <form action={saveToReadingList}>
              <button
                type="submit"
                name="id"
                value={id}
                data-testid="add-to-reading-list-button"
                className="rounded border border-line px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-ink hover:text-accent-ink"
              >
                add to reading list
              </button>
            </form>
          ))}
      </div>
    </div>
  )
}

export default BlogPage