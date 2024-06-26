'use client';

import type {TextAreaProps} from '@nextui-org/react';

import React from 'react';
import {Textarea} from '@nextui-org/react';
import { cn } from '@/app/_utils/cn';

const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({classNames = {}, ...props}, ref) => {
    return (
      <Textarea
        ref={ref}
        aria-label='Prompt'
        classNames={{
          ...classNames,
          label: cn('hidden', classNames?.label),
          input: cn('py-0', classNames?.input),
        }}
        placeholder='Enter a prompt here'
        radius='lg'
        variant='bordered'
        {...props}
      />
    );
  },
);

export default PromptInput;

PromptInput.displayName = 'PromptInput';
