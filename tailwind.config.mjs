/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A',      // Slate 900
          light: '#3B82F6',        // Blue 500
          accent: '#06B6D4',       // Cyan 500
        },
        secondary: {
          success: '#10B981',       // Emerald 500
          creative: '#8B5CF6',      // Violet 500
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
