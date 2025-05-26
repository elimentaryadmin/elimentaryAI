import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/encryption"

export async function POST() {
  try {
    // Get API key from environment variable or from cookie
    let apiKey = process.env.OPENAI_API_KEY

    // If no environment variable, try to get from cookie
    if (!apiKey) {
      const apiKeyCookie = cookies().get("openai_api_key")
      if (apiKeyCookie) {
        apiKey = decrypt(apiKeyCookie.value)
      }
    }

    // Verify that the OpenAI API key is configured
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    // Test the connection with a simple request
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo", {
        apiKey: apiKey,
      }),
      prompt: "Say 'Connection successful!' in one short sentence.",
      maxTokens: 20,
    })

    return NextResponse.json({
      success: true,
      message: "OpenAI API connection successful!",
      response: text,
    })
  } catch (error: any) {
    console.error("Test connection error:", error)

    // Handle OpenAI API errors
    if (error.status === 401) {
      return NextResponse.json({ error: "Invalid API key. Please check your OpenAI API key." }, { status: 401 })
    }

    return NextResponse.json(
      { error: error.message || "An error occurred while testing the connection" },
      { status: 500 },
    )
  }
}

