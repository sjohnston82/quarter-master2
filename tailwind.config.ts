import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        // calypso: "#3A6592",
        // frost: "#F4F4F4",
        // "copper-rust": "#824A4D",
        // "breaker-bay": "#6A9CA7",
        mango: "#fb8905",
        snow: "#f2f6f9",
        schooner: "#8a8683",
        woodsmoke: "#141416",
        buttonblue: "#6F01FE",
      },
      fontFamily: {
        Evogria: ["Evogria"],
        ALoveofThunder: ["ALoveofThunder"],
      },
      listStyleImage: {
        forkSpoon: 'url("/img/fork-spoon.webp")',
        forkSpoonSmall: 'url("/img/fork-spoon-small.webp")',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("flowbite/plugin"),
  ],
} satisfies Config;
