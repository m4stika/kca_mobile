import { Tabs, router } from "expo-router";
import React from "react";

import { Button } from "@/components/atoms";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Colors = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarActiveTintColor: Colors.colors.primary,
        // tabBarLabelStyle: { color: "white" },
        headerShown: false,
        // tabBarStyle: { padding: 0 },
        // tabBarShowLabel: false,
      }}
      // initialRouteName="profile"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: "Store",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "bag-handle" : "bag-handle-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          // headerShown: true,
          headerLeft: (props) => <Button type="icon" name="back" onPress={() => router.back()} />,
          // headerLeftLabelVisible: true,
          title: "Transaksi",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "reader" : "reader-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? (colorScheme === "dark" ? "person-outline" : "person") : "person-outline"
              }
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
