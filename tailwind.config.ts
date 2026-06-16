import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C1810',
          light: '#4A2C20',
        },
        accent: {
          DEFAULT: '#C89B6D',
          light: '#E8C9A0',
        },
        bg: '#F8F6F2',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        muted: '#9A8C82',
        border: '#EDE8E1',
        error: '#DC2626',
        success: '#16A34A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0,0,0,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.08)',
        sticky: '0 -2px 16px rgba(0,0,0,0.06)',
      },
      height: {
        header: '56px',
        'bottom-nav': '64px',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};

export default config;
