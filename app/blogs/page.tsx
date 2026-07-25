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
    <>
      <div>
        <h1>
          Blogs
        </h1>
        <h2>
          Filter blogs by title
        </h2>
        <form action={applyFilter}>
          <div>
            <label>
              Search term
            </label>
            <input type="text" name="filter" required />
            <button type="submit">Search</button>
          </div>
        </form>
        {filterApplied && 
          <div>
            <Link href="/blogs">
              View all
            </Link>
          </div>
        }
        <BlogList blogs={blogs}/>
      </div>
    </>
  )
}

interface BlogListProps {
  blogs: FullBlog[]
}

const BlogList = (
  { blogs }: BlogListProps
) => {
  return (
    <div>
      {blogs.map((b) => (
          <BlogBlock key={b.id} blog={b}/>
        ))}
    </div>
  )
}

export default BlogsPage