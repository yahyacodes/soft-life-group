/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F6F6F7",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A5EFF",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#7F7F7F",
          foreground: "hsl(var(--secondary-foreground))",
        },
        customColor: {
          DEFAULT: "#F7F7F7",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
    },
  },
  plugins: [],
};
