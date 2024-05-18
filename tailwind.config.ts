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
        primary: '#212121',
        secondary: '#F4F5F6',
        accent: '#FFC107',
        text: '#4D5D6C',
        title: '#333333',
        background: '#F3f3f3',
      },
    },
  },
  plugins: [],
};
export default withMT(config);
