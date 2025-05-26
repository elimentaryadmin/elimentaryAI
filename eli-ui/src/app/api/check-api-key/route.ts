import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    // Log the status (but not the actual key) for debugging
    console.log(`API key status : ${apiKey ? "Configured" : "Not configured"}`)

    return NextResponse.json({
      hasApiKey: !!apiKey,
    })
  } catch (error) {
    console.error("Error checking API key:", error)
    return NextResponse.json({ error: "Failed to check API key status" }, { status: 500 })
  }
}

