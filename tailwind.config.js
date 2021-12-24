module.exports = {
  content: ['app/**/*.{tsx,ts,jsx,js}', 'content/**/*.{tsx,ts,jsx,js,md,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
