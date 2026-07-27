import type { FullBlog } from "../types"
import { getBlogs } from "../services/blogs"
import { BlogBlock } from "../components/BlogBlock"
import { applyFilter } from "../actions/blogs"
import Link from "next/link"

const BlogsPage = async ({
  searchParams
}: {
  searchParams: Promise<{ filter?: string }>
}) => {

  const { filter } = await searchParams
  const filterApplied = filter ? true : false

  const blogs = await getBlogs(filter)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-strong">
        Blogs
      </h1>

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Filter blogs by title
        </h2>
        <form action={applyFilter} className="flex flex-wrap items-end gap-3">
          <div className="flex min-w-56 flex-1 flex-col gap-1">
            <label
              htmlFor="filter"
              className="text-xs font-medium text-muted"
            >
              Search term
            </label>
            <input
              id="filter"
              type="text"
              name="filter"
              data-testid="filter-input"
              required
              className="w-full rounded border border-line bg-background px-3 py-2 text-sm text-strong outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <button
            type="submit"
            data-testid="search-button"
            className="rounded bg-accent-fill px-4 py-2 text-sm font-medium text-accent-fill-fg transition-colors hover:bg-accent-fill-hover"
          >
            Search
          </button>
          {filterApplied && (
            <Link
              href="/blogs"
              className="px-2 py-2 text-sm font-medium text-muted underline-offset-2 hover:text-accent-ink hover:underline"
            >
              View all
            </Link>
          )}
        </form>
      </section>

      <BlogList blogs={blogs} />
    </div>
  )
}

interface BlogListProps {
  blogs: FullBlog[]
}

const BlogList = (
  { blogs }: BlogListProps
) => {
  if (blogs.length === 0) {
    return (
      <p
        data-testid="blogs-list"
        className="rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted"
      >
        No blogs found.
      </p>
    )
  }

  return (
    <ul data-testid="blogs-list" className="space-y-3">
      {blogs.map((b) => (
        <li key={b.id}>
          <BlogBlock blog={b} />
        </li>
      ))}
    </ul>
  )
}

export default BlogsPage