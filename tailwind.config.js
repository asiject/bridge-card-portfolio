/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bridge: {
          light: '#FFFEFA',
          'light-accent': '#F7F4EA',
          deep: '#22211F',
          'deep-accent': '#0F0E0D',
          purple: '#667eea',
          violet: '#764ba2',
        },
      },
      animation: {
        'card-flip': 'cardFlip 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
    },
  },
  plugins: [],
}
