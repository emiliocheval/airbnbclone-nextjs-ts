import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default font for body
        heading: ['Open Sans', 'sans-serif'], // Font for headings
      },
      colors: {
        background: "var(--background)",
        foregrounda: "var(--foreground)",
        'custom-turquoise': '#068488', // Add the custom turquoise color
      },
    },
  },
  plugins: [],
};

export default config;
