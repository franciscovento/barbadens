import type { Config } from 'tailwindcss';
const withMT = require('@material-tailwind/react/utils/withMT');
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        'app-primary': '#212121',
        'app-secondary': '#F4F5F6',
        'app-accent': '#016FD0',
        'app-text': '#4D5D6C',
        'app-title': '#333333',
        'app-background': '#F3f3f3',
      },
      height: {
        'app-screen': 'calc(100vh_-_4rem)',
      },
      animation: {
        zoomIn: 'zoomIn 0.3s ease-out both',
      },
      keyframes: {
        zoomIn: {
          '0%': { scale: '0.5', opacity: '0' },
          '90%': { scale: '1.05', opacity: '1' },
          '100%': { opacity: '1', scale: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default withMT(config);
