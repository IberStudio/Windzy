import { useRef, useCallback } from "react";
import { icons } from "../utils/imports";
import Button from "./Button";
import { theme } from "../constants/theme";
import { useWindows } from "../context/WindowContext";

type WindowProps = { 
    id: number;
    title: string;
    cn: string;
    size?: number;
    draggable?: boolean;
    children?: React.ReactNode;
}

const Window = ({ id, title, cn, size, draggable=false, children }: WindowProps) => {

    const { windows, updatePosition, hideWindow, showWindow } = useWindows();
    const win = windows.find(w => w.id === id);

    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);

    const clamp = useCallback((x: number, y: number) => {
        const el = windowRef.current;
        if (!el) return { x, y };

        const maxX = window.innerWidth - el.offsetWidth;
        const maxY = window.innerHeight - el.offsetHeight;

        return {
            x: Math.max(0, Math.min(x, maxX)),
            y: Math.max(0, Math.min(y, maxY)),
        };
    }, []);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!draggable || !win) return;
        dragging.current = true;
        offset.current = { x: e.clientX - win.x, y: e.clientY - win.y };

        const handleMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            const rawX = e.clientX - offset.current.x;
            const rawY = e.clientY - offset.current.y;
            const { x, y } = clamp(rawX, rawY);
            updatePosition(id, x, y);
        };

        const handleUp = () => {
            dragging.current = false;
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);
    };

    if (!win) return null;

    return (
        <div
            ref={windowRef}
            className={`
                ${cn} ${win.hidden ? "hidden" : ""}
                border-4 rounded-xl ${theme.outline.border}
                `}
            style={{ position: "absolute", left: win.x, top: win.y, userSelect: "none" }}
        >
            <div
                className={`
                    flex flex-row justify-between p-2 gap-2
                    ${theme.primary.bg}
                    rounded-t-md
                    `}
                style={{ cursor: "grab" }}
                onMouseDown={onMouseDown}
            >
                <div className={`text-[#e3f3ff] flex items-center text-2xl px-3`}>
                    <h1>{title}</h1>
                </div>
                <div className="flex flex-row gap-2">
                    <Button
                        value={{ name: "Minimize", url: icons.minimize }}
                        type="button"
                        size={size}
                        color={theme.secondary.bg}
                        onClick={() => hideWindow(id)}
                        />
                    <Button
                        value={{ name: "Restore", url: icons.restore }}
                        type="button"
                        size={size}
                        color={theme.secondary.bg}
                        onClick={() => showWindow(id)}
                        />
                    <Button
                        value={{ name: "Close", url: icons.cross }}
                        type="button"
                        size={size}
                        color={theme.secondary.bg}
                        onClick={() => hideWindow(id)}
                    />
                </div>
            </div>
            <div className={`
                ${cn}
                ${theme.secondary.bg}
                rounded-b-md
                `}>
                {children}
            </div>
        </div>
    );
};

export default Window;