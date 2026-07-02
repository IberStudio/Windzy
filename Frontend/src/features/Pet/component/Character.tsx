import React, { useEffect, useState, useRef } from "react";
import SpriteAnimator, { type SpriteAnimatorProps } from "../utils/SpriteAnimation"
import { ANIMATIONS } from "../../../types/animation";
import type { CharState } from "../../../types/animation";
import { sprites, type SpriteName } from "../..";
import { usePlayer } from "../../../context/PlayerContext";

const SPEED = 1.5;
const MIN_X = 0;
const MAX_X = window.innerWidth;
const GRAVITY = 0.5; 
const GROUND_Y = 0;
const IDLE_TYPING_HOLD_MS = 1000;
const SPRITE_DISPLAY_SIZE = 32;
const DRAG_COOLDOWN_MS = 600;

const Character = ({ cn, scale, currentPet, ignoreTrue, ignoreFalse }: { cn: string, scale: number, currentPet: SpriteName, ignoreTrue: () => void, ignoreFalse: () => void }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(GROUND_Y);
    const [facingLeft, setFacingLeft] = useState(false);
    const isDragging = useRef(false);
    const [currentFrame, setCurrentFrame] = useState<SpriteAnimatorProps>({
        spriteSheet: sprites[currentPet],
        frameHeight: SPRITE_DISPLAY_SIZE,
        frameWidth: SPRITE_DISPLAY_SIZE,
        animation: ANIMATIONS.idle
    });

    const currentX = useRef(x);
    const currentY = useRef(y);

    const stateRef = useRef<CharState>('idle');

    const velocityYRef = useRef(0);
    const directionRef = useRef<1 | -1>(1);
    const moveIntervalRef = useRef<number | undefined>(undefined);
    const decisionTimeoutRef = useRef<number | undefined>(undefined);
    const typingTimerRef = useRef<number | null>(null);
    const holdTimerRef = useRef<number | null>(null);

    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const dragCooldownRef = useRef(false);
    const [isDragCooldown, setIsDragCooldown] = useState(false);
    const wasDroppedRef = useRef(false);
    const landingTimerRef = useRef<number | null>(null);
    const cooldownTimerRef = useRef<number | null>(null);

    const setDragCooldown = (val: boolean) => {
        dragCooldownRef.current = val;
        setIsDragCooldown(val);
    };

    const { isPlaying } = usePlayer();

    useEffect(() => { currentX.current = x; }, [x]);
    useEffect(() => { currentY.current = y; }, [y]);

    // ---- Dancing State ----
    useEffect(() => {
        if (isPlaying) {
            stateRef.current = 'dancing';
            stopMoving();
            setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.dance }));
        } else {
            stateRef.current = 'idle';
            setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.idle }));
            scheduleNextDecision();
        }
    }, [isPlaying]);

    const stopMoving = () => {
        if (moveIntervalRef.current !== undefined) {
            clearInterval(moveIntervalRef.current);
            moveIntervalRef.current = undefined;
        }
        if (decisionTimeoutRef.current !== undefined) {
            clearTimeout(decisionTimeoutRef.current);
            decisionTimeoutRef.current = undefined;
        }
    };

    // ---- Wandering decision loop ----
    const scheduleNextDecision = () => {
        if (dragCooldownRef.current) return;
        if (stateRef.current === 'dancing') return;
        if (stateRef.current !== 'idle' && stateRef.current !== 'walking') return;

        const items: CharState[] = ["idle", "walking"];
        const next = items[Math.floor(Math.random() * items.length)];
        stateRef.current = next;
        !isDragging.current && setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS[next] }));

        stopMoving();

        if (next === "walking") {
            directionRef.current = Math.random() < 0.5 ? 1 : -1;
            setFacingLeft(directionRef.current === -1);
            moveIntervalRef.current = window.setInterval(() => {
                if (stateRef.current !== 'walking') {
                    stopMoving();
                    return;
                }
                setX(() => {
                    let displaySize = SPRITE_DISPLAY_SIZE * scale;
                    let n = currentX.current + directionRef.current * SPEED;
                    if (n >= MAX_X - displaySize) { n = MAX_X - displaySize; directionRef.current = -1; setFacingLeft(true); }
                    else if (n <= MIN_X) { n = MIN_X; directionRef.current = 1; setFacingLeft(false); }
                    return n;
                });
            }, 16);
        }

        decisionTimeoutRef.current = window.setTimeout(scheduleNextDecision, 5000);
    };

    useEffect(() => {
        scheduleNextDecision();
        return () => stopMoving();
    }, []);

    // ---- Dragging ----
    function onMouseDown(e: React.MouseEvent) {
        if (e.button === 2) {
            console.log('right click');
            return;
        }
        if (e.button !== 0) return;
        if (dragCooldownRef.current) return;
        isDragging.current = true;
        wasDroppedRef.current = false;

        if (landingTimerRef.current) { clearTimeout(landingTimerRef.current); landingTimerRef.current = null; }
        if (cooldownTimerRef.current) { clearTimeout(cooldownTimerRef.current); cooldownTimerRef.current = null; }
        setDragCooldown(false);
        velocityYRef.current = 0;
        stopMoving();

        dragOffsetRef.current = {
            x: e.clientX - x,
            y: window.innerHeight - e.clientY - y,
        };

        setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.floating }));
    }

    function onMouseMove(e: MouseEvent) {
        if (!isDragging.current || e.button !== 0) return;

        const clamp = (val: number, min: number, max: number) =>
            Math.min(Math.max(val, min), max);

        const displaySize = SPRITE_DISPLAY_SIZE * scale;
        const newLeft = e.clientX - dragOffsetRef.current.x;
        const newTopFromBottom = window.innerHeight - e.clientY - dragOffsetRef.current.y;

        setX(() => {
            const newX = clamp(newLeft, 0, window.innerWidth - displaySize);
            currentX.current = newX;
            return newX;
        });

        setY(() => {
            const newY = clamp(newTopFromBottom, 0, window.innerHeight - displaySize);
            currentY.current = newY;
            return newY;
        });
    }

    function onMouseUp() {
        if (!isDragging.current) return;
        isDragging.current = false;

        if (currentY.current > GROUND_Y) {
            stateRef.current = 'floating';
            wasDroppedRef.current = true;
            setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.floating }));
        } else {
            if (stateRef.current !== 'dancing') {
                stateRef.current = 'idle';
                setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.floating }));
                scheduleNextDecision();
            }
        }
    }

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    // ---- Typing detection ----
    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
            if (stateRef.current === 'floating' || stateRef.current === 'dancing' || isDragging.current || dragCooldownRef.current) return;

            stateRef.current = 'typing';
            stopMoving();
            setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.typing }));

            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current);

            typingTimerRef.current = window.setTimeout(() => {
                if (!isPlaying) {
                    stateRef.current = 'idleTyping';
                    setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.idleTyping }));
                    
                    holdTimerRef.current = window.setTimeout(() => {
                        stateRef.current = 'idle';
                        scheduleNextDecision();
                    }, IDLE_TYPING_HOLD_MS);
                } else {
                    stateRef.current = 'dance';
                    setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.dance }));
                }
            }, 100);
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        };
    }, [isPlaying, isDragging]);

    // ---- Gravity loop ----
    useEffect(() => {
        const gravityInterval = setInterval(() => {
            if (stateRef.current !== 'floating') return;
            if (isDragging.current) return;

            velocityYRef.current += GRAVITY;
            const nextY = currentY.current - velocityYRef.current;

            if (nextY <= GROUND_Y) {
                velocityYRef.current = 0;
                currentY.current = GROUND_Y;
                setY(GROUND_Y);

                if (isPlaying) {
                    stateRef.current = 'dancing';
                    setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.dance }));
                } else {
                    stateRef.current = 'falling';
                    setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.falling }));
                    const applyDragCooldown = wasDroppedRef.current;
                    wasDroppedRef.current = false;
                    if (applyDragCooldown) setDragCooldown(true);
                    landingTimerRef.current = window.setTimeout(() => {
                        landingTimerRef.current = null;
                        if (isDragging.current) return;
                        stateRef.current = 'idle';
                        setCurrentFrame((prev) => ({ ...prev, animation: ANIMATIONS.idle }));
                    }, 1000);
                    cooldownTimerRef.current = window.setTimeout(() => {
                        cooldownTimerRef.current = null;
                        if (isDragging.current) return;
                        if (applyDragCooldown) setDragCooldown(false);
                        stateRef.current = 'idle';
                        scheduleNextDecision();
                    }, 1000 + (applyDragCooldown ? DRAG_COOLDOWN_MS : 0));
                }
            } else {
                currentY.current = nextY;
                setY(nextY);
            }
        }, 16);

        return () => clearInterval(gravityInterval);
    }, [isPlaying]);

    return (
        <div
            className={cn}
            onMouseDown={onMouseDown}
            onContextMenu={(e) => e.preventDefault()}
            onMouseMove={ignoreFalse}
            onMouseLeave={ignoreTrue}
            style={{
                position: 'fixed',
                left: x,
                bottom: y,
                cursor: isDragging.current ? 'grabbing' : isDragCooldown ? 'not-allowed' : 'grab',
                transform: facingLeft ? 'scaleX(1)' : 'scaleX(-1)',
            }}
        >
            <SpriteAnimator {...currentFrame} scale={scale} />
        </div>
    )
}

export default Character