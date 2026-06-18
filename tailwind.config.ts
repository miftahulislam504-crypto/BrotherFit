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
        // ── Existing warm palette (unchanged) ──
        primary: {
          DEFAULT: '#2C1810',
          light: '#4A2C20',
        },
        accent: {
          DEFAULT: '#C89B6D',
          light: '#E8C9A0',
        },
        bg:      '#F8F6F2',
        surface: '#FFFFFF',
        text:    '#1A1A1A',
        muted:   '#9A8C82',
        border:  '#EDE8E1',
        error:   '#DC2626',
        success: '#16A34A',

        // ── New dark palette (hero + lifestyle sections) ──
        dark: {
          bg:      '#0A0F1F',
          surface: '#111827',
          accent:  '#1D4ED8',
          muted:   '#94A3B8',
          border:  '#1E293B',
        },
      },
      fontFamily: {
        display: ['var(--font-satoshi)', 'var(--font-cormorant)', 'Georgia', 'serif'],
        serif:   ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      borderRadius: {
        xl:  '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        soft:   '0 2px 12px rgba(0,0,0,0.06)',
        card:   '0 4px 24px rgba(0,0,0,0.08)',
        sticky: '0 -2px 16px rgba(0,0,0,0.06)',
        glow:   '0 0 32px rgba(200,155,109,0.25)',
        'glow-blue': '0 0 40px rgba(29,78,216,0.3)',
      },
      height: {
        header:       '100px',
        'bottom-nav': '64px',
      },
      screens: {
        xs: '375px',
      },
      animation: {
        'marquee':       'marquee 30s linear infinite',
        'marquee-slow':  'marquee 50s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
        'fade-up':       'fadeUp 0.6s ease-out forwards',
        'mesh-shift':    'meshShift 12s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-12px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.8', transform: 'scale(1.05)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        meshShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
