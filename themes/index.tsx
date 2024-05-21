import { ThemeColors } from "@/constants/Colors";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { createContext, useCallback, useContext, useState } from "react";
import { ViewProps } from "react-native";
import { ThemesVariant } from "./theme-config";
// import resolveConfig from "tailwindcss/resolveConfig";

// const tailwindConfig = require("@/tailwind.config");

/* export const resolveTheme = (colorScheme: ThemesVariant) => {
  const config = resolveConfig(tailwindConfig);
  const colors = config.theme.accentColor[colorScheme];
  // const colors = ThemeColors[colorScheme];
  // console.log(colorScheme, JSON.stringify(colors, undefined, 3));
  return {
    dark: colorScheme === "dark",
    colors,
  };
}; */

export const resolveTheme = (colorScheme: ThemesVariant) => ({
  dark: colorScheme === "dark",
  colors: ThemeColors[colorScheme],
});

type ThemeContextValues = {
  theme: ThemesVariant;
};

const ThemeProviderValues = createContext<ThemeContextValues>({
  theme: "light",
});

export function useThemeContextValues() {
  return useContext(ThemeProviderValues);
}

type ThemeContextActions = {
  handleThemeSwitch: (newTheme: ThemesVariant) => void;
};

const ThemeProviderActions = createContext<ThemeContextActions>({} as ThemeContextActions);

export function useThemeContextActions() {
  return useContext(ThemeProviderActions);
}

export const ThemeContext = createContext<{
  colorScheme: "light" | "dark" | undefined;
  setColorScheme?: (scheme: any) => void;
}>({
  colorScheme: "light",
});

export function useTheme() {
  return useContext(ThemeContext);
}

type ThemeProps = ViewProps;

export function Provider(props: ThemeProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ThemesVariant>(colorScheme as ThemesVariant);

  const handleThemeSwitch = useCallback((newTheme: ThemesVariant) => {
    // setTheme(colorScheme as ThemesVariant);
    setTheme(newTheme);
  }, []);

  // console.log(colorScheme);

  return (
    <ThemeProviderValues.Provider value={{ theme: colorScheme as ThemesVariant }}>
      <ThemeProviderActions.Provider value={{ handleThemeSwitch }}>
        <ThemeProvider value={resolveTheme((colorScheme as ThemesVariant) ?? "light")}>
          {props.children}
        </ThemeProvider>
        {/* <StatusBar
          style={StatusBarTheme[theme].style}
          backgroundColor={StatusBarTheme[theme].background}
        /> */}
        {/* <View className={`flex-1 ${className})`}>	</View> */}
      </ThemeProviderActions.Provider>
    </ThemeProviderValues.Provider>
  );
}
