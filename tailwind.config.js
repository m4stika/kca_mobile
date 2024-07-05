/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./themes/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
        light: {
          background: "#fafafa",
          foreground: "#0F172A",
          icon: "#0284C7",
          text: "#0284C7",
          tabIconDefault: "#0284C7",
          tabIconSelected: "#0284C7",
          paper: {
            DEFAULT: "#f3f4f6",
            foreground: "#0F172A",
          },

          muted: {
            DEFAULT: "#f1f5f9",
            foreground: "#65758b",
          },

          card: {
            DEFAULT: "#fafafa",
            foreground: "#0F172A",
          },

          border: "#e4e4e7",
          input: "#E2E8F0",
          primary: {
            DEFAULT: "#0284C7",
            hover: "#0369A1",
            foreground: "#F8FAFC",
          },

          secondary: {
            DEFAULT: "#C026D3",
            hover: "#a21caf",
          },
          success: {
            DEFAULT: "#059669",
            hover: "#047857",
          },
          warning: {
            DEFAULT: "#ca8a04",
            hover: "#a16207",
          },
          error: {
            DEFAULT: "#e11d48",
            hover: "#be123c",
          },
          disabled: {
            DEFAULT: "#D1D5DB",
            foreground: "#9CA3AF",
          },
          accent: {
            DEFAULT: "#D4D4D8",
            foreground: "#0EA5E9",
          },
        },

        dark: {
          background: "#18181b",
          foreground: "#f3f4f6",
          icon: "#f3f4f6",
          paper: {
            DEFAULT: "#09090b",
            foreground: "#94a3b8",
          },

          muted: {
            DEFAULT: "#0F172A",
            foreground: "#94a3b8",
          },
          card: {
            DEFAULT: "#0F172A",
            foreground: "#E1E7EF",
          },

          border: "#3f3f46",
          input: "#1D283A",
          primary: {
            DEFAULT: "#38bdf8",
            hover: "#0ea5e9",
            foreground: "#020205",
          },
          secondary: {
            DEFAULT: "#e879f9",
            hover: "#d946ef",
          },
          success: {
            DEFAULT: "#34d399",
            hover: "#10b981",
          },
          warning: {
            DEFAULT: "#facc15",
            hover: "#eab308",
          },
          error: {
            DEFAULT: "#fb7185",
            hover: "#f43f5e",
          },
          disabled: {
            DEFAULT: "#52525B",
            foreground: "#4b5563",
          },
          accent: {
            DEFAULT: "#09090B",
            foreground: "#3abff8",
          },
        },
 */
        border: "var(--border)",
        print: "hsl(var(--default))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
    },
  },
  plugins: [],
};
