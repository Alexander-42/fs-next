import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { BlogView } from "../../components/BlogView"
import { likeBlog } from "@/app/actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <>
      <BlogView blog={blog} />
      <form action={likeBlog}>
        <div>
          <button type="submit" name="id" value={id} >like</button>
        </div>
      </form>
    </>
  )
}

export default BlogPage