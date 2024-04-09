'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react'

import { NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import { useRouter } from 'next/navigation';


export function Providers({ children, session }: { children: React.ReactNode, session?: Session | null }) {
  const router = useRouter();

  return (
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute='class' enableSystem={true}>
        <SessionProvider
          session={session}
          refetchOnWindowFocus={false}
          refetchInterval={0}
          refetchWhenOffline={false}
        >
          {children}
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
