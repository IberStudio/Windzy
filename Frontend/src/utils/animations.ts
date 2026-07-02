import { useState, useEffect, useRef } from 'react';
import type { AnimationDef } from '../types/animation';

export function useSpriteFrame(animation: AnimationDef, fps = 8, loop = true) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef(0);
  const frameInterval = 1000 / fps;

  useEffect(() => {
    setCurrentFrame(0);
  }, [animation.row]);

  useEffect(() => {
    const animate = (time: number) => {
      if (time - lastTimeRef.current >= frameInterval) {
        lastTimeRef.current = time;
        setCurrentFrame((prev) => {
          const next = prev + 1;
          if (next >= animation.frameCount) {
            return loop ? 0 : prev;
          }
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameInterval, animation.frameCount, loop]);

  return currentFrame;
}