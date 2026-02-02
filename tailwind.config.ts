import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Better Wealth Brand Colors
        emerald: {
          DEFAULT: '#055231',
          50: '#E8F5EF',
          100: '#D1EBDF',
          200: '#A3D7BF',
          300: '#75C39F',
          400: '#47AF7F',
          500: '#055231',
          600: '#044226',
          700: '#03311B',
          800: '#022110',
          900: '#011008',
          dark: '#033A22',
          light: '#077244',
        },
        copper: {
          DEFAULT: '#B87333',
          50: '#F9F3ED',
          100: '#F3E7DB',
          200: '#E7CFB7',
          300: '#DBB793',
          400: '#CF9F6F',
          500: '#B87333',
          600: '#935C29',
          700: '#6E451F',
          800: '#4A2E14',
          900: '#25170A',
          light: '#D4A574',
          dark: '#8A5528',
        },
        eggwhite: {
          DEFAULT: '#EEF1ED',
          dark: '#E5E8E4',
        },
        warmwhite: {
          DEFAULT: '#FAFAF8',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
