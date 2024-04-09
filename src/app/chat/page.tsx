'use client'

import { Tab, Tabs} from '@nextui-org/react';
import SidebarContainer from '../_components/chat/sidebar-with-gradient-background';
import ChatPanel from '../_components/chat/chat-panel';

const ChatPage = () => {
  return (
    <div className='h-dvh w-dvw overflow-hidden'>
      <SidebarContainer
        header={
          <Tabs className='justify-center' size='sm'>
            <Tab key='creative' title='Creative' />
            <Tab key='technical' title='Technical' />
            <Tab key='precise' title='Precise' />
          </Tabs>
        }
        title='Crypto Exchange GPT'
      >
        <ChatPanel />
      </SidebarContainer>
    </div>
  );
};

export default ChatPage;
