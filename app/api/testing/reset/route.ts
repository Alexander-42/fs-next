import { NextResponse } from "next/server"
import { deleteAllTableContents } from "@/app/services/testing"


export const DELETE = async (request: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }
  await deleteAllTableContents()
  return Response.json({status: 200})
}