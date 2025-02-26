/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require("nativewind/preset")], // Tambahkan ini
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./themes/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        print: "hsl(var(--default))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        bankGradient: "#0179FE",
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        paper: {
          DEFAULT: "var(--paper)",
          foreground: "var(--paper-foreground)",
        },
        default: "hsl(var(--default))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          hover: "hsl(var(--success-hover))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          hover: "hsl(var(--info-hover))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          hover: "hsl(var(--warning-hover))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          hover: "hsl(var(--error-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        disabled: {
          DEFAULT: "hsl(var(--disabled))",
          foreground: "hsl(var(--disabled-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontFamily: {
        // pthin: ["Poppins-Thin", "sans-serif"],
        // pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        // pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        // pblack: ["Poppins-Black", "sans-serif"],
      },
      fontSize: {
        big: "7rem",
      },
      keyframes: {
        slideDown: {
          from: { opacity: 1, transform: "translateX(100%)" },
          to: { opacity: 0, transform: "translateX(0)" },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateX(0)" },
          to: { opacity: 1, transform: "translateX(100%)" },
        },
      },
      animation: {
        slideDown: "slideDown 900ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 900ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
      backgroundImage: {
        "bank-gradient": "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
        "gradient-mesh": "url('/icons/gradient-mesh.svg')",
        "bank-green-gradient":
          "linear-gradient(90deg, #01797A 0%, #489399 100%)",
      },
      boxShadow: {
        form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        chart:
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        profile:
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        creditCard: "8px 10px 16px 0px rgba(0, 0, 0, 0.05)",
      },
      // textShadow: {
      //   'default': '0 2px 0 #000',
      //   'md': '0 2px 2px #000',
      //   'h2': '0 0 3px #FF0000, 0 0 5px #0000FF',
      //   'h1': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
      //   '2xl': '1px 1px 5px rgb(33 34 43 / 20%)',
      //   '3xl': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
      // }
    },
  },
  plugins: [],
};
