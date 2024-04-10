'use client'

import { useState } from 'react';
import { Tab, Tabs} from '@nextui-org/react';
import SidebarContainer from '../_components/chat/sidebar-with-gradient-background';
import ChatPanel from '../_components/chat/chat-panel';
import { api } from '@/trpc/react';

const ChatPage = () => {
  const { data: chatHistory, refetch } = api.chat.myChats.useQuery();

  const [sessionStartedDate] = useState(new Date());

  return (
    <div className='h-dvh w-dvw overflow-hidden'>
      <SidebarContainer
        chatHistory={chatHistory}
        header={
          <Tabs className='justify-center' size='sm'>
            <Tab key='creative' title='Creative' />
            <Tab key='technical' title='Technical' />
            <Tab key='precise' title='Precise' />
          </Tabs>
        }
        title='Crypto Exchange GPT'
      >
        <ChatPanel refetchChatHistory={refetch} sessionStartedDate={sessionStartedDate} />
      </SidebarContainer>
    </div>
  );
};

// eslint-disable-next-line canonical/no-unused-exports
export default ChatPage;
