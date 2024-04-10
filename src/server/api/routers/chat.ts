import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';

export const chatRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  myChats: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.chatHistory.findMany({
      where: (chatHistory, { eq }) => eq(chatHistory.userId, ctx.session.user.id),
    })
  })
});
