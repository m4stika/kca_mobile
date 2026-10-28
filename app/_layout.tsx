import { GlobalProvider } from "@/context/global-provider";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import { cn } from "@/utils/cn";
import { ThemeColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: ThemeColors.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: ThemeColors.dark,
};

export const unstable_settings = {
  initialRouteName: "(auth)", // anchor
};

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const queryClient = new QueryClient();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}>
    // <GlobalProvider>
    //<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <BottomSheetModalProvider>
            <View
              style={{
                flex: 1,
                margin: 0,
                padding: 0,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              }}
              className={cn("flex-1 m-0 p-0", Platform.OS === "android" ? "pt-10" : "pt-0")}
            >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                {/* <Stack.Screen name="/search/[query]" /> */}
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="(screen)" />
              </Stack>
            </View>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </GlobalProvider>
    </QueryClientProvider>
    // </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
