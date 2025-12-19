import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",

        card: "var(--card)",
        "card-hover": "var(--card-hover)",

        border: "var(--border)",
        icon: "var(--icon)",
        subtitle: "var(--subtitle)",

        button: "var(--button)",
        "button-hover": "var(--button-hover)",

        pill: "var(--pill)",

        input: "var(--input-bg)",
        "input-border": "var(--input-border)",
        "input-border-hover": "var(--input-border-hover)",
        "input-border-focus": "var(--input-border-focus)",
        "input-error": "var(--input-error)",

        menu: "var(--menu)",
        "menu-hover": "var(--menu-hover)",

        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",

        success: "var(--success)",
        "success-bg": "var(--success-bg)",

        warning: "var(--warning)",
        "warning-bg": "var(--warning-bg)",

        danger: "var(--danger)",
        "danger-bg": "var(--danger-bg)",

        info: "var(--info)",
        "info-bg": "var(--info-bg)",
      },

      fontFamily: {
        elms_sans: ["var(--font-elms_sans)"],
      },

      backgroundImage: {
        bg_image: "url('../public/bg.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
