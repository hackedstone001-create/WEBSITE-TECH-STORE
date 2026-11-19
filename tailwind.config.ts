import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Inter Tight',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Inter Tight',
          'Space Grotesk',
          'Inter',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        // Official Tech Store Brand Colour Tokens
        brand: {
          black: '#08080B',        // Primary Black
          darkSurface: '#111116',   // Dark Surface
          secondaryDark: '#19151F', // Secondary Dark
          purple: '#8138F5',        // Primary Purple
          brightPurple: '#A855F7',  // Bright Purple
          lightPurple: '#C4A2FF',   // Light Purple
          white: '#FFFFFF',         // White
          lightBg: '#F5F5F7',       // Light Background
          lightCard: '#FFFFFF',     // Light Card
          primaryText: '#17151D',   // Primary Text
          secondaryText: '#77717E', // Secondary Text
          border: '#E8E5ED',        // Border
          success: '#16A36A',       // Success
          error: '#DC4545',         // Error
        },
        // Dark Theme Surfaces
        dark: {
          950: '#08080B',
          900: '#111116',
          850: '#15131C',
          800: '#19151F',
          700: '#231E2C',
          600: '#342D40',
        },
        // Purple Accent Scales
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C4A2FF', // Light Purple
          500: '#A855F7', // Bright Purple
          600: '#8138F5', // Primary Purple
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
          DEFAULT: '#8138F5',
        },
        // Light Theme Surfaces
        light: {
          bg: '#F5F5F7',
          card: '#FFFFFF',
          border: '#E8E5ED',
          text: '#17151D',
          muted: '#77717E',
        },
        // Compatibility Aliases mapped to official brand tokens
        background: '#08080B',
        secondary: '#111116',
        card: '#19151F',
        border: '#E8E5ED',
        primary: {
          DEFAULT: '#8138F5',
          hover: '#6D28D9',
          light: '#A855F7',
        },
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 12px -2px rgba(23, 21, 29, 0.05), 0 2px 6px -1px rgba(23, 21, 29, 0.03)',
        'card-hover': '0 20px 30px -10px rgba(129, 56, 245, 0.12), 0 8px 12px -4px rgba(23, 21, 29, 0.04)',
        'glow-purple': '0 0 35px -5px rgba(129, 56, 245, 0.45)',
        'glow-purple-sm': '0 0 18px -2px rgba(129, 56, 245, 0.35)',
        'hero-tile': '0 25px 50px -12px rgba(8, 8, 11, 0.7), 0 0 30px rgba(129, 56, 245, 0.25)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(129, 56, 245, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.7))' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
