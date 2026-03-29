import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RollingTextProps {
  words: string[];
  /** ms between word switches — default 3000 */
  interval?: number;
  className?: string;
}

/**
 * Rolling text effect — cycles through words with a per-letter
 * vertical roll animation + slight blur, inspired by the Framer
 * Marketplace "Rolling Text" component.
 */
export const RollingText = ({
  words,
  interval = 3000,
  className = '',
}: RollingTextProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const word = words[index];

  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="inline-flex"
          initial="enter"
          animate="visible"
          exit="leave"
        >
          {word.split('').map((char, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              style={{ whiteSpace: 'pre' }}
              variants={{
                enter: {
                  y: '100%',
                  opacity: 0,
                  filter: 'blur(4px)',
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.35,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                },
                leave: {
                  y: '-100%',
                  opacity: 0,
                  filter: 'blur(4px)',
                  transition: {
                    duration: 0.25,
                    delay: i * 0.02,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                },
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
