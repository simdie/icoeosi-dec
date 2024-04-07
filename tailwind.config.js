/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        red: '0 0 15px #a3e635',
        purple: '0 0 15px #c084fc',
        purple2: '0 0 15px rgb(90, 30, 99)',
      },
      backgroundColor: {
        purple: 'rgb(50, 30, 99)',
      },
      textColor: {
        preserve: 'black ',
      },


    },
  },
  plugins: [],
}

