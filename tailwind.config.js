const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      // Keep other default font families if needed
      serif: ['ui-serif', 'Georgia' /* other serif fonts */],
      mono: ['ui-monospace', 'SFMono-Regular' /* other mono fonts */],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
