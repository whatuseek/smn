/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      blue: {
        50: '#EBF5FF',
        500: '#3B82F6',
        600: '#2563EB',
      },
      yellow: {
        500: '#EAB308',
        600: '#CA8A04',
      },
      green: {
        500: '#22C55E',
        600: '#16A34A',
      },
      indigo: {
        500: '#6366F1',
        600: '#4F46E5',
      },
    },
  },
};
export const safelist = [
  {
    pattern: /(bg|text|border)-(blue|yellow|green|indigo)-(50|100|500|600)/,
    variants: ['hover', 'focus'],
  },
];
export const plugins = [];
