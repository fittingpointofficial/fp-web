import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fp: {
          bg: '#F7F7F4',
          text: '#1A1B1D',
          primary: '#165D54',
          secondary: '#C39A5F'
        }
      },
      fontFamily: {
        heading: ['Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        premium: '0 14px 36px rgba(10, 16, 24, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
