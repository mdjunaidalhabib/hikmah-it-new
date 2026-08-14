/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans Bengali", "system-ui", "sans-serif"],
      },
      colors: {
        hikmah: {
          navy: '#071028',
          navy2: '#0B1736',
          soft: '#EAF3FF',
          soft2: '#F3F8FF',
          blue: '#2563EB',
          amber: '#F59E0B'
        },
        brand: {
          50: '#fff5f0',
          100: '#fee7dc',
          200: '#fdcdb4',
          300: '#fcab82',
          400: '#fb8346',
          500: '#fb6b23',
          600: '#f75605',
          700: '#c84604',
          800: '#a53903',
          900: '#872f03',
          950: '#551e02'
        }
      },
      keyframes: {
        'wa-ripple': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'page-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'wa-ripple': 'wa-ripple 2s ease-out infinite',
        'page-in': 'page-in 0.45s ease-out both',
      },
    }
  },
  plugins: []
}
