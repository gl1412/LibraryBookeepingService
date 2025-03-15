// filepath: tailwind.config.js
import relumeTailwind from "@relume_io/relume-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [relumeTailwind]
}