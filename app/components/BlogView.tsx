import type { FullBlog } from "../types"

interface BlogViewProps {
  blog: FullBlog
}

export const BlogView = ({ blog }: BlogViewProps) => {
  return (
    <article
      data-testid="blog-detail"
      className="rounded-lg border border-line bg-surface p-6"
    >
      <h1
        data-testid="blog-title"
        className="text-2xl font-bold tracking-tight text-strong"
      >
        {blog.title}
      </h1>
      <p data-testid="blog-author" className="mt-1 text-sm text-muted">
        By <span className="font-medium text-foreground">{blog.author}</span>
      </p>
      <a
        href={blog.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block truncate text-sm text-accent-ink underline-offset-2 hover:underline"
      >
        {blog.url}
      </a>
      <p className="mt-4 inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-ink">
        {blog.likes} likes
      </p>
    </article>
  )
}
