import { NextResponse } from "next/server"
import { createTestUser } from "@/app/services/testing"
import { RegistrationFormValues } from "@/app/types"

const isRegistrationFormValues = (
  body: unknown
): body is RegistrationFormValues => {
  if (typeof body !== "object" || body === null) return false

  const { username, name, password } = body as Record<string, unknown>

  return (
    typeof username === "string" && username.length >= 4 &&
    typeof name === "string" &&
    typeof password === "string" && password.length >= 4
  )
}

export const POST = async (request: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  if (!request.headers.get("content-type")?.includes("application/json")){
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
    if (!isRegistrationFormValues(body)) {
      return NextResponse.json(
        { error: "Body must contain username, name and password" },
        { status: 400 },
      )
    }

    const user = await createTestUser(body)

    return Response.json(user, {status: 201})

  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

}