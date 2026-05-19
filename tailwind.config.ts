import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        mind: {
          bg: "#EAEAF2",
          surface: "#F2F2F8",
          surface2: "#FFFFFF",
          ink: "#0D0D0F",
          muted: "#5A5A66",
          blob: "#A89CE0",
          "blob-light": "#C8C0F0",
          "blob-pale": "#E8E4FF",
          "blob-dark": "#7B6FBB",
          "blob-deep": "#5A50A0"
        }
      },
      fontFamily: {
        display: ["Bebas Neue", "Impact", "sans-serif"],
        body: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        mindSm: "0 2px 12px rgba(100,88,160,0.06)",
        mindMd: "0 8px 32px rgba(100,88,160,0.12)",
        mindLg: "0 16px 64px rgba(100,88,160,0.18)",
        blob: "0 16px 40px rgba(85,72,160,0.28)"
      }
    }
  },
  plugins: []
};

export default config;
