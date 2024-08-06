import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'main-green': '#88B14B',
        'main-light-green': '#E8EFDD',
        'main-dark-green': '#81916B',
        'main-gray': '#C2C2C2',
        'main-yellow': '#FAC56C',
        'main-red': '#D61717',
        'light-green': '#F4FBE8',
        'light-yellow': '#FBF9E8',
        'light-orange': '#FFF6EF',
        'gray-90': '#666666',
        'gray-30': '#D9D9D9',
        'gray-10': '#FAFAFA',
      },
    },
    screens: {
      // max : 00px 보다 작을 때 동작
      sm: { max: '640px' },
      md: { max: '768px' }, //모바일
      lg: { max: '1024px' },
      xl: { max: '1280px' }, //태블릿
      xxl: { max: '1536px' },
    },
  },
  plugins: [],
};
export default config;
