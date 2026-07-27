import { getUserWithBlogsByToken } from "@/app/services/users"

const unauthorized = () =>
  Response.json(
    { error: "Unauthorized" },
    { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
  )

export const GET = async (request: Request) => {
  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Bearer ")) {
    return unauthorized()
  }

  const token = authorization.slice("Bearer ".length).trim()
  if (!token) {
    return unauthorized()
  }

  const user = await getUserWithBlogsByToken(token)
  if (!user) {
    return unauthorized()
  }

  return Response.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: user.blogs,
  })
}
