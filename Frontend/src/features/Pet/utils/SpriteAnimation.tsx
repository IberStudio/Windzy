import React from 'react';
import { useSpriteFrame } from '../../../utils/animations';
import type { AnimationDef } from '../../../types/animation';

export interface SpriteAnimatorProps {
  spriteSheet: string;
  frameWidth: number;
  frameHeight: number;
  animation: AnimationDef;
  fps?: number;
  loop?: boolean;
  scale?: number;
}

const SpriteAnimator: React.FC<SpriteAnimatorProps> = ({
  spriteSheet,
  frameWidth,
  frameHeight,
  animation,
  fps = 8,
  loop = true,
  scale = 1,
}) => {
  const currentFrame = useSpriteFrame(animation, fps, loop);

  const bgX = -(currentFrame * frameWidth);
  const bgY = -(animation.row * frameHeight);

  return (
    <div style={{ width: frameWidth * scale, height: frameHeight * scale, }}>
      <div
        style={{
          width: frameWidth,
          height: frameHeight,
          backgroundImage: `url(${spriteSheet})`,
          backgroundPosition: `${bgX}px ${bgY}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
};

export default SpriteAnimator;