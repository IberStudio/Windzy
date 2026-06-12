import { useEffect, useRef, useState } from "react"
import { Border } from "../components/Border"
import Button from "../components/Button"
import { icons } from "../utils/imports"

const Timer = () => {

    const border = Border("borders", "brownBorder")

    const WORK_MINUTES = 25;
    const BREAK_MINUTES = 5;

    const [minutes, setMinutes] = useState(WORK_MINUTES);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const format = (num: number) => num.toString().padStart(2, '0');

    useEffect(() => {
        if (!isRunning) return;

        intervalRef.current = setInterval(() => {
            setSeconds((prevSec) => {
                if (prevSec === 0) {
                    setMinutes((prevMin) => {
                        if (prevMin === 0) {
                            // switch mode
                            const nextIsBreak = !isBreak;
                            setIsBreak(nextIsBreak);
                            return nextIsBreak ? BREAK_MINUTES : WORK_MINUTES;
                        }
                        return prevMin - 1;
                    });
                    return 59;
                }
                return prevSec - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, isBreak]);

    function toggleStart() {
        setIsRunning((prev) => !prev);
    }

    function adjustMinutes(delta: number) {
        if (isRunning) return; 
        setMinutes((prev) => {
            const next = prev + delta;
            if (next < 0) return 0;
            if (next > 59) return 59;
            return next;
        });
    }

    function reset() {
        setIsRunning(false);
        setIsBreak(false);
        setMinutes(WORK_MINUTES);
        setSeconds(0);
    }

    return (
        <div
        className={`${border.className} h-full flex flex-col items-center justify-center gap-4`}
        style={border.style}
        >
            <p className="text-sm text-gray-700 uppercase tracking-widest">
                {isBreak ? "Break" : "Focus"}
            </p>
            <div
            className="flex flex-row justify-evenly items-center w-full"
            >
                <div
                className="flex flex-row items-center gap-2"
                >
                    <div>
                        <p 
                        className="text-7xl text-white"
                        >
                            {format(minutes)}:{format(seconds)}
                        </p>
                    </div>
                    <div
                    className="flex flex-col gap-4"
                    >
                        <Button 
                        value={{
                            name: "Up",
                            url: icons.upArrow
                        }} 
                        type="button"
                        onClick={() => adjustMinutes(1)}
                        />
                        <Button 
                        value={{
                            name: "Down",
                            url: icons.downArrow
                        }}
                        type="button"
                        onClick={() => adjustMinutes(-1)}
                        />
                    </div>
                </div>
                <div
                className="flex flex-col gap-2"
                >
                    <Button 
                    value={isRunning ? "Pause" : "Start"} 
                    type="button"
                    onClick={toggleStart}
                    />
                    <Button 
                    value="Reset" 
                    type="button"
                    onClick={reset}
                    />
                </div>
            </div>
        </div>
    )
}

export default Timer