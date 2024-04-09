'use client';

import React, { type ComponentProps, forwardRef } from 'react';
import {Button, Tooltip} from '@nextui-org/react';
import {Icon} from '@iconify/react';

import PromptInput from './prompt-input';
import { cn } from '@/app/_utils/cn';

type Props = {
  textAreaProps: ComponentProps<typeof PromptInput>,
} & ComponentProps<'form'>;

const PromptInputWithBottomActions = forwardRef<HTMLFormElement, Props>(({
  textAreaProps,
  ...props
}, ref) => {
  // const ideas = [
  //   {
  //     title: 'Create a blog post about NextUI',
  //     description: 'explain it in simple terms',
  //   },
  //   {
  //     title: 'Give me 10 ideas for my next blog post',
  //     description: 'include only the best ideas',
  //   },
  //   {
  //     title: 'Compare NextUI with other UI libraries',
  //     description: 'be as objective as possible',
  //   },
  //   {
  //     title: 'Write a text message to my friend',
  //     description: 'be polite and friendly',
  //   },
  // ];

  const value = textAreaProps.value as string;

  return (
    <div className='flex w-full flex-col gap-4'>
      {/* <ScrollShadow hideScrollBar className='flex flex-nowrap gap-2' orientation='horizontal'>
        <div className='flex gap-2'>
          {ideas.map(({title, description}, index) => (
            <Button key={index} className='flex h-14 flex-col items-start gap-0' variant='flat'>
              <p>{title}</p>
              <p className='text-default-500'>{description}</p>
            </Button>
          ))}
        </div>
      </ScrollShadow> */}
      <form
        className={cn(props.className, 'flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70')}
        {...props}
        ref={ref}
      >
        <PromptInput
          classNames={{
            inputWrapper: '!bg-transparent shadow-none',
            innerWrapper: 'relative',
            input: 'pt-1 pl-2 pb-6 !pr-10 text-medium',
          }}
          maxRows={3}
          minRows={1}
          endContent={
            <div className='flex items-end gap-2'>
              <Tooltip showArrow content='Send message'>
                <Button
                  isIconOnly
                  color={!value ? 'default' : 'primary'}
                  isDisabled={!value}
                  radius='lg'
                  size='sm'
                  variant='solid'
                  type='submit'
                >
                  <Icon
                    className={cn(
                      '[&>path]:stroke-[2px]',
                      !value ? 'text-default-600' : 'text-primary-foreground',
                    )}
                    icon='solar:arrow-up-linear'
                    width={20}
                  />
                </Button>
              </Tooltip>
            </div>
          }
          radius='lg'
          variant='flat'
          {...textAreaProps}
        />
        <div className='flex w-full items-center justify-between  gap-2 overflow-scroll px-4 pb-4'>
          <div className='flex w-full gap-1 md:gap-3'>
            {/* <Button
              size='sm'
              startContent={
                <Icon className='text-default-500' icon='solar:paperclip-linear' width={18} />
              }
              variant='flat'
            >
              Attach
            </Button>
            <Button
              size='sm'
              startContent={
                <Icon className='text-default-500' icon='solar:soundwave-linear' width={18} />
              }
              variant='flat'
            >
              Voice Commands
            </Button>
            <Button
              size='sm'
              startContent={
                <Icon className='text-default-500' icon='solar:notes-linear' width={18} />
              }
              variant='flat'
            >
              Templates
            </Button> */}
          </div>
          <p className='py-1 text-tiny text-default-400'>{value.length}/2000</p>
        </div>
      </form>
    </div>
  );
})

PromptInputWithBottomActions.displayName = 'PromptInputWithBottomActions';

export default PromptInputWithBottomActions;
