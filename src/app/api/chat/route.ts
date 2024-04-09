import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { env } from '@/env';
import { getServerAuthSession } from '@/server/auth';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

type MessageType = OpenAI.Chat.Completions.ChatCompletionMessageParam

// export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: MessageType[] };

  if (!messages) {
    return new Response('Bad Request', { status: 400 });
  }

  const session = await getServerAuthSession();

  if (!session?.user?.id && env.NODE_ENV !== 'development') {
    return new Response('Unauthorized', { status: 401 });
  }

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
    temperature: 1.2,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
