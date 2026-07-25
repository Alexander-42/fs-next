import type { FullBlog } from "../types"

interface BlogViewProps {
  blog: FullBlog
}

export const BlogView = ({ blog }: BlogViewProps) => {
  return (
    <article>
      <h2>{blog.title}</h2>
      <p>By {blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>
    </article>
  )
}
