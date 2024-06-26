import { WelcomeImage } from "@/assets/svgs";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/atoms";
import { useGlobalContext } from "@/context/global-provider";
import { Redirect, router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Welcome() {
  // const backgroundColor = useThemeColor({}, "background");
  // const { colorScheme } = useColorScheme();
  const { isLogged, isLoading, error } = useGlobalContext();

  if (isLogged && !isLoading) return <Redirect href={"/home"} />;

  return (
    // <Theme className="bg-background flex-1 ">
    <View className="h-full">
      {/* <ScrollView contentContainerStyle={{ height: "100%" }}> */}
      <ThemedView className="w-full min-h-[85vh] px-7">
        <WelcomeImage width={158} height={136} className="mb-6" />
        <ThemedText type="subtitle" className="mb-24 p-2 text-primary">
          Selamat Datang di KCA-Mobile
        </ThemedText>
        <Button
          title="Masuk sebagai Anggota"
          containerClassName="w-full"
          onPress={() => router.push("/sign-in")}
        />
        {error && <ThemedText type="error">{error}</ThemedText>}
      </ThemedView>
      {/* </ScrollView> */}
      {/* <StatusBar
        style={StatusBarTheme[colorScheme ?? "light"].style}
        backgroundColor={StatusBarTheme[colorScheme ?? "light"].background}
      /> */}
      {/* <StatusBar style="light" /> */}
    </View>
    // </Theme>
  );
}
