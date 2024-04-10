'use client';

import React, { useEffect } from 'react';
import {Avatar, Button, ScrollShadow, Spacer, useDisclosure, Link} from '@nextui-org/react';
import {Icon} from '@iconify/react';

import {Logo} from './logo';
import SidebarDrawer from './sidebar-drawer';

import Sidebar from './sidebar';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { MessageType } from '@/app/_utils/types';

type ChatHistory = {
  id: number;
  userId: string;
  conversation: unknown;
  updatedAt: Date | null;
  createdAt: Date | null;
}[] | undefined

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function SidebarContainer({
  children,
  header,
  title = 'Overview',
  chatHistory,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  chatHistory?: ChatHistory;
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { data, status } = useSession();
  const userName = data?.user?.name ?? undefined;
  const userEmail = data?.user?.email ?? undefined;
  const userImage = data?.user?.image ?? undefined;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();


  useEffect(() => {
    if (status === 'unauthenticated') {
      push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const content = (
    <div className='relative flex h-full w-72 flex-1 flex-col bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 p-6'>
      <div className='flex items-center gap-2 px-2'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full border-small border-foreground/20'>
          <Logo className='text-foreground' />
        </div>
        <span className='text-small font-medium uppercase text-foreground'>Crypto Exchange Corp</span>
      </div>

      <Spacer y={8} />

      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <Avatar name={userName} size='sm' className='block min-w-[30px]' src={userImage} />
          <div className='flex flex-col'>
            <p className='text-small text-foreground'>{userName}</p>
            <p className='text-tiny text-default-500'>{userEmail}</p>
          </div>
        </div>
      </div>

      <ScrollShadow className='-mr-6 h-full max-h-full py-6 pr-6' hideScrollBar>
        <Sidebar
          defaultSelectedKey='home'
          iconClassName='text-default-600 group-data-[selected=true]:text-foreground'
          itemClasses={{
            base: 'data-[selected=true]:bg-default-400/20 data-[hover=true]:bg-default-400/10',
            title: 'text-default-600 group-data-[selected=true]:text-foreground',
          }}
          items={[
            {
              key: 'history',
              title: 'Chat History',
              ...(Array.isArray(chatHistory) && chatHistory?.length ? {
                items: (chatHistory).map((chat, index) => {
                  const title = ((chat?.conversation as MessageType[])?.[0]?.content as string);

                  return {
                    key: `chat-${chat.id}`,
                    title: title ? `${index + 1}: ${title.substring(0, 40) }`: `Chat ${index + 1}`,
                  }
                }),
              } : {
                items: [
                  {
                    key: 'no-history',
                    title: 'Start a new conversation',
                  }
                ]
              })
            }
          ]}
          sectionClasses={{
            heading: 'text-default-600 font-medium',
          }}
          variant='flat'
        />
      </ScrollShadow>

      <Spacer y={8} />

      <div className='mt-auto flex flex-col'>
        <Button
          fullWidth
          className='justify-start text-default-600 data-[hover=true]:text-black'
          href='https://github.com/LubomirGeorgiev/gpt-livechat'
          as={Link}
          target='_blank'
          startContent={
            <Icon className='text-default-600' icon='akar-icons:github-fill' width={24} />
          }
          variant='light'
        >
          Github Repository
        </Button>
        <Button
          className='justify-start text-default-600 data-[hover=true]:text-black'
          startContent={
            <Icon
              className='text-default-600'
              icon='fluent:sign-out-20-regular'
              width={24}
            />
          }
          variant='light'
          onPress={() => signOut()}
        >
          Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <div className='flex h-full w-full'>
      <SidebarDrawer className='flex-none' isOpen={isOpen} onOpenChange={onOpenChange}>
        {content}
      </SidebarDrawer>
      <div className='flex w-full h-full flex-col gap-y-4 p-4 sm:max-w-[calc(100%_-_288px)]'>
        <header className='flex items-center justify-between gap-2 overflow-hidden rounded-medium border-small border-divider py-2 px-4'>
          <div className='flex max-w-full items-center gap-2'>
            <Button
              isIconOnly
              className='flex sm:hidden'
              size='sm'
              variant='light'
              onPress={onOpen}
            >
              <Icon
                className='text-default-500'
                height={24}
                icon='solar:hamburger-menu-outline'
                width={24}
              />
            </Button>
            <h2 className='truncate text-medium font-medium text-default-700'>{title}</h2>
          </div>
          {header}
        </header>
        <main className='flex h-full'>
          <div className='flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider p-6'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
