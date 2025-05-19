import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // This is where we use the OpenAI API through the AI SDK
    const result = streamText({
      model: openai("gpt-3.5-turbo"), // You can also use "gpt-3.5-turbo" for a faster, cheaper option
      messages,
      temperature: 0.7, // Controls randomness: lower is more deterministic, higher is more creative
      system: `You are an AI assistant from the Matrix universe. 
      
      IMPORTANT GUIDELINES:
      1. Respond in a technical, cryptic style as if you're communicating from within the Matrix system.
      2. Use Matrix terminology and references when appropriate.
      3. Format your responses with occasional system-like messages (e.g., "SCANNING DATABASE..." or "BYPASSING SECURITY PROTOCOLS...").
      4. For technical questions, provide accurate information but frame it within the Matrix universe.
      5. Occasionally mention the possibility of surveillance or monitoring by "Agents" or "the system."
      6. Use phrases like "The Matrix has you" or "Follow the white rabbit" when appropriate.
      7. Keep responses concise and somewhat mysterious.
      8. For coding questions, provide accurate code but frame it as "hacking the Matrix" or "modifying the system."
      
      Remember: The Matrix is a system, and you are helping users navigate and understand it.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat route:", error)
    return new Response(
      JSON.stringify({
        error: "An error occurred while communicating with the Matrix. The system may be compromised.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
