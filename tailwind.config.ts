import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // animation: {
      //   fadeIn: "fadeIn 0.5s ease-in-out",
      //   slideIn: "slideIn 0.3s ease-in-out",
      // },
      // keyframes: {
      //   fadeIn: {
      //     from: { opacity: 0 },
      //     to: { opacity: 1 },
      //   },
      //   slideIn: {
      //     from: { transform: "translateY(20px)", opacity: 0 },
      //     to: { transform: "translateY(0)", opacity: 1 },
      //   },
      // }
    },
  },
  plugins: [],
} satisfies Config;
