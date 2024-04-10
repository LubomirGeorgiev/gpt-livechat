import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { env } from '@/env';
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { chatHistory } from '@/server/db/schema';
import { type MessageType } from '@/app/_utils/types';
import { and, eq } from 'drizzle-orm';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// export const runtime = 'edge';

// eslint-disable-next-line canonical/no-unused-exports
export async function POST(req: Request) {
  const { messages, sessionStartedDate } = await req.json() as { messages: MessageType[], sessionStartedDate: string };
  const sessionStartedDateParsed = new Date(sessionStartedDate)

  if (!messages) {
    return new Response('Bad Request', { status: 400 });
  }

  const session = await getServerAuthSession();
  const userID = session?.user?.id;

  if (!userID && env.NODE_ENV !== 'development') {
    return new Response('Unauthorized', { status: 401 });
  }

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    ...(userID && {
      onCompletion: async (completion) => {
        const newMessages = [
          ...messages,
          {
            role: 'assistant',
            content: completion
          },
        ]

        // First find by userID and sessionStartedDate
        const existingChatHistory = await db.query.chatHistory.findFirst({
          where: and(eq(chatHistory.userId, userID), eq(chatHistory.sessionStartedDate, sessionStartedDateParsed))
        })

        if (existingChatHistory?.id) {
          await db.update(chatHistory).set({
            conversation: newMessages,
          }).where(eq(chatHistory.id, existingChatHistory.id))
        } else {
          await db.insert(chatHistory).values({
            conversation: newMessages,
            userId: userID,
            sessionStartedDate: sessionStartedDateParsed,
          })
        }

      },
    }),
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
