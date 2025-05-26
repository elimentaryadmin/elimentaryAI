import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { encrypt } from "@/lib/encryption"

// POST handler to store API key
export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json()

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json({ error: "Invalid API key" }, { status: 400 })
    }

    // Encrypt the API key before storing
    const encryptedKey = encrypt(apiKey)

    // Store in an HTTP-only cookie that can't be accessed by JavaScript
    cookies().set({
      name: "openai_api_key",
      value: encryptedKey,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing API key:", error)
    return NextResponse.json({ error: "Failed to store API key" }, { status: 500 })
  }
}

// GET handler to check if API key exists
export async function GET() {
  try {
    const apiKeyCookie = cookies().get("openai_api_key")

    return NextResponse.json({
      hasApiKey: !!apiKeyCookie,
    })
  } catch (error) {
    console.error("Error checking API key:", error)
    return NextResponse.json({ error: "Failed to check API key" }, { status: 500 })
  }
}

