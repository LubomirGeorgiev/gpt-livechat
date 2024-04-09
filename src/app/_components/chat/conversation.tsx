import React, { type FunctionComponent } from 'react';

import MessageCard from './message-card';
import { useSession } from 'next-auth/react';
import type { Message } from 'ai/react';

type Props = {
  messages: Pick<Message, 'id' | 'content' | 'role'>[]
}

const Conversation: FunctionComponent<Props> = ({
  messages
}) => {
  const { data } = useSession();
  const avatar = data?.user?.image ?? undefined;

  return (
    <div className='flex flex-col gap-4 px-1'>
      {messages.map(({id, role, content}, index) => (
        <MessageCard
          key={id || index}
          // attempts={index === 1 ? 2 : 1}
          avatar={
            role === 'assistant'
              ? 'https://img6.arthub.ai/64eca2b6-b8a0.webp'
              : avatar
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={content}
          messageClassName={role === 'user' ? 'bg-content3 text-content3-foreground' : ''}
          showFeedback={role === 'assistant'}
        />
      ))}
    </div>
  );
}

export default Conversation;
