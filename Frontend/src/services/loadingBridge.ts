type SetIsLoading = (value: boolean) => void;

const setters = new Map<string, Set<SetIsLoading>>();

export const registerLoadingSetter = (key: string, fn: SetIsLoading | null) => {
    if (fn) {
        if (!setters.has(key)) setters.set(key, new Set());
        setters.get(key)!.add(fn);
    }
};

export const unregisterLoadingSetter = (key: string, fn: SetIsLoading) => {
    setters.get(key)?.delete(fn);
    if (setters.get(key)?.size === 0) setters.delete(key);
};

export const triggerLoading = (key: string, value: boolean) => {
    setters.get(key)?.forEach(fn => fn(value));
};