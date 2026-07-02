export interface AnimationDef {
  row: number;
  frameCount: number;
}

export const ANIMATIONS: Record<string, AnimationDef> = {
  idle:   { row: 0, frameCount: 5 },
  walking: { row: 1, frameCount: 4 },
  sit:   { row: 2, frameCount: 3 },
  idleTyping: { row: 3, frameCount: 1 },
  typing: { row: 4, frameCount: 2 },
  floating: { row: 5, frameCount: 5 },
  falling: { row: 6, frameCount: 4 },
  dance: { row: 7, frameCount:  8 },
};

export type CharState = keyof typeof ANIMATIONS;