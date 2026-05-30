import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        'card-border': 'var(--color-card-border)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'gold-dark': 'var(--color-gold-dark)',
        white: 'var(--color-white)',
        'off-white': 'var(--color-off-white)',
        silver: 'var(--color-silver)',
        text: 'var(--color-text)',
        'text-dark': 'var(--color-text-dark)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        hero: ['var(--text-hero)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        display: ['var(--text-display)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h1: ['var(--text-h1)', { lineHeight: '1.12' }],
        h2: ['var(--text-h2)', { lineHeight: '1.18' }],
        h3: ['var(--text-h3)', { lineHeight: '1.22' }],
        h4: ['var(--text-h4)', { lineHeight: '1.28' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: '1.55' }],
        body: ['var(--text-body)', { lineHeight: '1.6' }],
        small: ['var(--text-small)', { lineHeight: '1.5' }],
        caption: ['var(--text-caption)', { lineHeight: '1.45' }],
      },
      borderRadius: {
        premium: 'var(--radius-premium)',
      },
      boxShadow: {
        premium: 'var(--shadow-premium)',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
} satisfies Config
