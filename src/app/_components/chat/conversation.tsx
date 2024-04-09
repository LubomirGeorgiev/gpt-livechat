import React from 'react';

import {userMessages, assistantMessages} from './messages';

import MessageCard from './message-card';

export default function Conversation() {
  const messages = [
    {
      role: 'user',
      message: userMessages[0],
    },
    {
      role: 'assistant',
      message: assistantMessages[0],
    },
    {
      role: 'user',
      message: userMessages[1],
    },
    {
      role: 'assistant',
      message: assistantMessages[1],
    },
  ];

  return (
    <div className='flex flex-col gap-4 px-1'>
      {messages.map(({role, message}, index) => (
        <MessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          avatar={
            role === 'assistant'
              ? 'https://i.pravatar.cc/50'
              : 'https://i.pravatar.cc/51'
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={message}
          messageClassName={role === 'user' ? 'bg-content3 text-content3-foreground' : ''}
          showFeedback={role === 'assistant'}
        />
      ))}
    </div>
  );
}
