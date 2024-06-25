import { StatusBarStyle } from "expo-status-bar";
import { vars } from "nativewind";

export type ThemesVariant = "light" | "dark";

export const Themes = {
  light: vars({
    "--color-primary": "#000000",
    "--color-secondary": "#ffffffff",
    "--color-outstand": "#2288dd",
    "--color-outstand-secondary": "#88dd55",
  }),
  dark: vars({
    "--color-primary": "#ffffff",
    "--color-secondary": "#222",
    "--color-outstand": "#552288",
    "--color-outstand-secondary": "#3399bb",
  }),
};

type StatusBarThemeStyle = {
  [keys in ThemesVariant]: {
    style: StatusBarStyle;
    background: string;
  };
};

export const StatusBarTheme: StatusBarThemeStyle = {
  light: {
    style: "light",
    // background: "#fafafa",
    background: "#0284C7",
  },
  dark: {
    style: "dark",
    // background: "#18181b",
    background: "#38bdf8",
  },
};
