import { notFound } from "next/navigation"
import { getUserWithBlogsByUsername } from "../../services/users"
import { BlogBlock } from "@/app/components/BlogBlock"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogsByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Notes</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <BlogBlock blog={blog}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage