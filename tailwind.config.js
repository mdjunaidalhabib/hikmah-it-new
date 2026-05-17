/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hikmah: {
          navy: '#071028',
          navy2: '#0B1736',
          soft: '#EAF3FF',
          soft2: '#F3F8FF',
          blue: '#2563EB',
          amber: '#F59E0B'
        }
      }
    }
  },
  plugins: []
}
