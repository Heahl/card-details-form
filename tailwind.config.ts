import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'lg1': 'hsl(249, 99%, 64%)',
        'lg2': 'hsl(278, 94%, 30%)',
        'red': 'hsl(0, 100%, 66%)',
        'light-grayish-violet': 'hsl(270, 3%, 87%)',
        'dark-grayish-violet': 'hsl(279, 6%, 55%)',
        'very-dark-violet': 'hsl(278, 68%, 11%)',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        spaceGrotesk: ["Space Grotesk", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
