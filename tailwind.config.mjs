import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          fog: '#8E9AAE',
          dusk: '#3B4355',
          night: '#1A1F29',
          paper: '#E8ECF1',
          glow: '#E8B26A',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.brand.night'),
            '--tw-prose-headings': theme('colors.brand.night'),
            '--tw-prose-links': theme('colors.brand.glow'),
            '--tw-prose-bold': theme('colors.brand.night'),
            '--tw-prose-quotes': theme('colors.brand.dusk'),
            '--tw-prose-code': theme('colors.brand.night'),
            '--tw-prose-hr': theme('colors.brand.fog / 30%'),
            '--tw-prose-invert-body': theme('colors.brand.fog'),
            '--tw-prose-invert-headings': theme('colors.brand.paper'),
            '--tw-prose-invert-links': theme('colors.brand.glow'),
            '--tw-prose-invert-bold': theme('colors.brand.paper'),
            '--tw-prose-invert-quotes': theme('colors.brand.fog'),
            '--tw-prose-invert-code': theme('colors.brand.paper'),
            '--tw-prose-invert-hr': theme('colors.brand.fog / 20%'),
            fontFamily: theme('fontFamily.serif').join(', '),
            a: { textDecoration: 'none', borderBottom: `1px solid ${theme('colors.brand.glow')}` },
            'a:hover': { color: theme('colors.brand.glow') },
            'h1, h2, h3, h4': { fontFamily: theme('fontFamily.sans').join(', '), letterSpacing: '-0.02em' },
            code: { fontWeight: '400', '&::before': { content: '""' }, '&::after': { content: '""' } },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
