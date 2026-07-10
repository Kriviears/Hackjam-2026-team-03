/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: "#C8C8C8",
        offwhite: "#EDEDED",
        matteblack: "#050505",
        softblack: "#0A0A0A",
        royalblue: "#3A5AFF",
        bordergray: "#2A2A2A",
      },
    },
  },
  plugins: [],
}
