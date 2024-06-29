import React from "react";
import { TextInput, View, useColorScheme } from "react-native";
import Basket from "./basket";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ShopHeader = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <View className="flex flex-row justify-between items-center gap-4 p-3 w-full border-b border-border mb-2">
      <View
        className="flex-1 flex-row items-center gap-2 px-2 py-1 border border-border rounded-lg bg-background"
        nativeID="searchInput"
        aria-label="view for search"
        accessible={true}
      >
        <TabBarIcon
          name="search-outline"
          size={22}
          style={{ fontWeight: "semibold" }}
          color={theme === "dark" ? "white" : "black"}
        />
        <TextInput
          placeholder="search..."
          placeholderTextColor={theme === "dark" ? "#94a3b8" : ""}
          accessibilityLabelledBy="searchInput"
          accessibilityLabel="search"
          className="w-[70%] dark:text-foreground"
          // accessible={true}
        />
      </View>
      <Basket />
    </View>
  );
};

export default ShopHeader;
