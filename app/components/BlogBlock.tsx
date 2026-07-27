import Link from "next/link"
import type { FullBlog } from "../types"

interface BlogBlockProps {
  blog: FullBlog
}

export const BlogBlock = ({ blog }: BlogBlockProps) => {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="group block rounded-lg border border-line bg-surface p-4 transition-all hover:border-accent hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <h2 className="text-lg font-semibold text-strong underline-offset-2 group-hover:text-accent-ink group-hover:underline">
        {blog.title}
      </h2>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-foreground">
        <dt className="font-medium text-muted">ID</dt>
        <dd>{blog.id}</dd>
        <dt className="font-medium text-muted">Author</dt>
        <dd className="truncate">{blog.author}</dd>
        <dt className="font-medium text-muted">URL</dt>
        <dd className="truncate">{blog.url}</dd>
        <dt className="font-medium text-muted">Likes</dt>
        <dd>{blog.likes} likes</dd>
      </dl>
    </Link>
  )
}
