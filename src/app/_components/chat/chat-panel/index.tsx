'use client'

import Conversation from '@/app/_components/chat/conversation';
import PromptInputWithBottomActions from '@/app/_components/chat/prompt-input-with-bottom-actions';
import { ScrollShadow } from '@nextui-org/react';
import { useChat } from 'ai/react';
import { type ComponentProps, useCallback, useRef, type FormEvent } from 'react';

const ChatPanel = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const formRef = useRef<HTMLFormElement>(null);

  const onKeyDown = useCallback<NonNullable<ComponentProps<typeof PromptInputWithBottomActions>['textAreaProps']['onKeyDown']>>((keyEvent) => {
    if (keyEvent.key === 'Enter' && !keyEvent.shiftKey) {
      keyEvent.preventDefault();
      if (formRef?.current) {
        formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    }
  }, []);

  const onSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    handleSubmit(submitEvent);
  }

  return (
    <div className='relative flex h-full flex-col'>
      <ScrollShadow className='flex h-full max-h-[65vh] flex-col gap-6 overflow-y-auto pb-8'>
        <Conversation messages={messages} />
      </ScrollShadow>
      <div className='mt-auto flex max-w-full flex-col gap-2'>
        <PromptInputWithBottomActions
          ref={formRef}
          onSubmit={onSubmit}
          textAreaProps={{
            value: input,
            onChange: handleInputChange,
            onKeyDown,
          }}
        />
      </div>
    </div>
  )
}

export default ChatPanel;
