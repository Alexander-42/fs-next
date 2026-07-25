import Link from "next/link"
import type { FullBlog } from "../types"

interface BlogBlockProps {
  blog: FullBlog
}

export const BlogBlock = ({ blog }: BlogBlockProps) => {
  return (
    <div>
      <h2>
        <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
      </h2>
      <ul>
        <li><strong>ID</strong> - {blog.id}</li>
        <li><strong>Author</strong> - {blog.author}</li>
        <li><strong>URL</strong> - {blog.url}</li>
        <li><strong>Likes</strong> - {blog.likes}</li>
      </ul>
    </div>
  )
}
