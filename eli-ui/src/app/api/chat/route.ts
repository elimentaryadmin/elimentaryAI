import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"
import https from "https"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Create a rate limiter that allows 20 requests per minute
const limiter = rateLimit({
  uniqueTokenPerInterval: 500,
  interval: 60 * 1000,
  limit: 20,
})

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable certificate validation
})

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous"

 function errorHandler(error: unknown) {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

  try {
    // Apply rate limiting
    await limiter.check(5, ip)

    const { messages } = await req.json()

    // Get API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY
  
    // Verify that the OpenAI API key is configured
    if (!apiKey) {
      console.error("OpenAI API key is not configured")
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    try {
      const result = streamText({
        model: openai("gpt-3.5-turbo"),
        system: "You are a helpful AI assistant that provides concise and accurate information.",
        messages,
        maxTokens: 1000,
      })

      return result.toDataStreamResponse({
  getErrorMessage: errorHandler,
})
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json({ error: openaiError.message || "Error communicating with OpenAI" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Chat API error:", error)

    // Handle rate limiting errors
    if (error.statusCode === 429) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    return NextResponse.json(
      { error: error.message || "An error occurred while processing your request" },
      { status: 500 },
    )
  }
}

