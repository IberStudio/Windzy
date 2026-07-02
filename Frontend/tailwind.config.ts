import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        outline: 'var(--color-outline)',
        shadow: 'var(--color-shadow)',
      }
    }
  },
  plugins: [],
} satisfies Config;