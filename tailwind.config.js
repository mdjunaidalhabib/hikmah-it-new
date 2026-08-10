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
        }
      },
      keyframes: {
        'wa-ripple': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        'wa-ripple': 'wa-ripple 2s ease-out infinite',
      },
    }
  },
  plugins: []
}
