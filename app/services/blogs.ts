import type { BlogContent, FullBlog } from "../types"

const blogs: FullBlog[] = [
  {
    id: 0,
    title: "Example 1",
    author: "Example author",
    url: "Example.com",
    likes: 3
  },
  {
    id: 1,
    title: "Example 2",
    author: "Example author 2",
    url: "Example2.com",
    likes: 1
  },
]

let nextId = 2
const defaultLikes = 0

export const getBlogs = (upperCaseFilter: string) => {
  const filteredBlogs = upperCaseFilter ? blogs.filter((b) => b.title.toUpperCase().includes(upperCaseFilter)) : blogs
  return [...filteredBlogs].sort((a, b) => b.likes - a.likes)
}

export const getBlogById = (id: number): FullBlog | undefined => {
  return blogs.find((b) => b.id === id)
}

interface addBlogProps {
  blogContent: BlogContent
}

export const addBlog = ({ blogContent }: addBlogProps ) => {
  blogs.push({id: nextId++, likes: defaultLikes, ...blogContent})
}

export const increaseLikeCount = ( id: number ): void => {
  const blog = getBlogById(id)
  if (!blog) {
    throw Error("Blog not found")
  }
  blog.likes++
}