import { createContext, useContext, useEffect, useState } from "react";
import { loadings } from "../utils/imports";

const LoadingContext = createContext({
    isLoading: false,
    setIsLoading: (_: boolean) => {}
});

export const LoadingProvider = ({ children, onMouseEnter, onMouseLeave }: { children: React.ReactNode, onMouseEnter: () => void, onMouseLeave: () => void }) => {

    const [isLoading, setIsLoading] = useState(false)

    const [dots, setDots] = useState<boolean[]>(Array(8).fill(false));
    const [current, setCurrent] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setDots(prev => {
        const next = [...prev];

        next[current] = true;

        if (current >= next.length - 1) {
            return Array(8).fill(false);
        }

        return next;
        });

        setCurrent(prev => (prev >= 7 ? 0 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
    }, [current]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && (
            <div 
            className="bg-black/50 w-90 h-full absolute z-50 top-0 left-0 flex justify-center items-center pointer-events-auto"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            >
                {dots.map((active, i) => (
                <img
                    key={i}
                    className="w-4 [image-rendering:pixelated]"
                    src={active ? loadings.filledLoading : loadings.emptyLoading}
                    alt="Loading"
                />
                ))}
            </div>
            )}
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const ctx =  useContext(LoadingContext);
    if (!ctx) throw new Error ("useLoading must be used within LoadingProvider");
    return ctx
};