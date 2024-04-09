'use client'

import {ScrollShadow, Tab, Tabs} from '@nextui-org/react';
import SidebarContainer from '../_components/chat/sidebar-with-gradient-background';
import Conversation from '../_components/chat/conversation';
import PromptInputWithBottomActions from '../_components/chat/prompt-input-with-bottom-actions';

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
        <div className='relative flex h-full flex-col'>
          <ScrollShadow className='flex h-full max-h-[60vh] flex-col gap-6 overflow-y-auto pb-8'>
            <Conversation />
          </ScrollShadow>
          <div className='mt-auto flex max-w-full flex-col gap-2'>
            <PromptInputWithBottomActions />
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default ChatPage;
