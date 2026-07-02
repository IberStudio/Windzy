
export const setTheme = (themeName: string) => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
};

export const getTheme = (): string => {
    return localStorage.getItem('theme') || 'default';
};

export const initTheme = () => {
    const saved = getTheme();
    document.documentElement.setAttribute('data-theme', saved);
};