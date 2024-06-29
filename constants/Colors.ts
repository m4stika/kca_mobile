/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const DefaultTheme = {
  dark: false,
  colors: {
    // react-navigation defaults
    primary: "#0284C7",
    text: "#0F172A",
    background: "#fafafa",
    foreground: "#0F172A",
    icon: "#52525b",
    tabIconDefault: "#52525b",
    tabIconSelected: "#0284C7",
    card: "#fafafa",
    border: "#e4e4e7",
    notification: "#e11d48",
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    // react-navigation defaults
    primary: "#38bdf8",
    background: "#1E293B",
    foreground: "#f3f4f6",
    icon: "#d4d4d8",
    text: "#f4f4f5",
    tabIconDefault: "#d4d4d8",
    tabIconSelected: "#38bdf8",
    card: "#1E293B",
    border: "#3f3f46",
    notification: "#fb7185",
  },
};

export const ThemeColors = {
  light: {
    // react-navigation defaults
    primary: "#0284C7",
    text: "#0F172A",
    background: "#fafafa",
    foreground: "#0F172A",
    icon: "#52525b",
    tabIconDefault: "#52525b",
    tabIconSelected: "#0284C7",
    card: "#fafafa",
    border: "#e4e4e7",
    notification: "#e11d48",
  },
  dark: {
    // react-navigation defaults
    primary: "#38bdf8",
    background: "#18181b",
    foreground: "#f3f4f6",
    icon: "#d4d4d8",
    text: "#f4f4f5",
    tabIconDefault: "#d4d4d8",
    tabIconSelected: "#38bdf8",
    card: "#18181b",
    border: "#3f3f46",
    notification: "#fb7185",
  },
};
