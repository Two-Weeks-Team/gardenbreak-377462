import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        card: 'var(--color-card)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)'
      },
      borderRadius: {
        radius: 'var(--radius)'
      },
      boxShadow: {
        shadow: 'var(--shadow)'
      }
    }
  },
  plugins: []
} satisfies Config;
