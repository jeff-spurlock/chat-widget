import { createAnthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const model = anthropic('claude-3-haiku-20240307')

export async function generateResponse({input}: {input: string}){
  const { text } = await generateText({
    model,
    prompt: input
  })
  return text
}


//TODO: THIS NEEDS TO BE USED IN AN ENDPOINT INSTEAD OF THE CLIENT COMPONENT