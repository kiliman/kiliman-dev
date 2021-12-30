module.exports = {
  darkMode: 'class', // force dark mode
  content: ['app/**/*.{tsx,ts,jsx,js}', 'content/**/*.{tsx,ts,jsx,js,md,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
