import type { Config } from "tailwindcss"

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-emerald',
    'text-copper',
    'text-warmwhite',
    'text-eggwhite',
    'bg-copper',
    'border-copper',
    'hover:bg-copper',
    'hover:text-copper',
    'bg-eggwhite',
    'border-emerald-light',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#055231',
          light: '#077244',
          dark: '#033A22',
        },
        copper: {
          DEFAULT: '#B87333',
          light: '#D4A574',
          dark: '#8A5528',
        },
        eggwhite: '#EEF1ED',
        warmwhite: '#FAFAF8',
        'bw-black': '#0D0D0D',
        'bw-charcoal': '#141414',
        'bw-charcoal-light': '#1E1E1E',
      },
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'serif'],
        'bw-serif': ['Times New Roman', 'Times', 'serif'],
        'bw-sans': ['Atkinson Hyperlegible', 'sans-serif'],
      },
    },
  },
  plugins: [],
} as Config
