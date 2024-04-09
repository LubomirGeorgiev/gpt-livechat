import { Button } from '@nextui-org/react'

import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

// eslint-disable-next-line canonical/no-unused-exports
export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user?.id) {
    return redirect('/chat');
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-2xl md:text-4xl mb-6 text-center'>
        Please sign in to continue...
      </h1>
      <Button
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
        as='a'
        size='lg'
        color='success'
        radius='full'
      >
        {session ? 'Sign Out' : 'Sign In'}
      </Button>
    </main>
  );
}
