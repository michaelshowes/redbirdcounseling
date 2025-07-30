'use client';

import { useEffect } from 'react';

import { motion, stagger, useAnimate } from 'motion/react';

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  hasPeriod = false
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  hasPeriod?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none'
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2)
      }
    );
  }, [animate, duration, filter, wordsArray]);

  const renderWords = () => {
    return (
      <motion.span ref={scope}>
        {wordsArray.map((word, idx) => {
          const isLastWord = idx === wordsArray.length - 1;
          return (
            <motion.span
              key={word + idx}
              className='text-neutral-800 opacity-0'
              style={{
                filter: filter ? 'blur(10px)' : 'none'
              }}
            >
              {word}
              {isLastWord ? '' : ' '}
            </motion.span>
          );
        })}
        {hasPeriod && (
          <motion.span
            key='period'
            className='text-redbird opacity-0'
            style={{
              filter: filter ? 'blur(10px)' : 'none'
            }}
          >
            .
          </motion.span>
        )}
      </motion.span>
    );
  };

  return <span className={className}>{renderWords()}</span>;
};
