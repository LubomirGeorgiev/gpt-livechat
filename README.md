# GPT-LIVECHAT

# Installation guide

1. `pnpm install`
2. `docker compose up -d`
3. Copy `.env.example` as `.env`
4. Create your own Github OAuth App by following this guide https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps. **Make sure the App has Email and Public Profile access permissions**.
5. Update `GITHUB_ID` and `GITHUB_SECRET` in `.env` with the values that you got from the previous step.
6. `pnpm run db:push`
7. `pnpm run dev`

## Tech Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
