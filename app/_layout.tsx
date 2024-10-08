import { GlobalProvider } from "@/context/global-provider";
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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    // "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    // "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    // "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  });
  const queryClient = new QueryClient();
  // const theme = useColorScheme();

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
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <GestureHandlerRootView
          // className={theme === "dark" ? `flex-1 dark bg-yellow-300` : "flex-1 bg-sky-200"}
          style={{
            flex: 1,
            // backgroundColor: theme === "dark" ? DarkTheme.colors.background : DefaultTheme.colors.background,
          }}
        >
          <BottomSheetModalProvider>
            {/* <SafeAreaView style={{ flex: 1, margin: 0, padding: 0 }}> */}
            {/* <View className={clsx("flex-1 m-0 p-0", Platform.OS === "android" ? "pt-10" : "pt-0")}> */}
            <View
              style={{
                flex: 1,
                margin: 0,
                padding: 0,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              }}
              className={cn("flex-1 m-0 p-0", Platform.OS === "android" ? "pt-10" : "pt-0")}
            >
              <Stack screenOptions={{ headerShown: false }} initialRouteName="/index">
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
