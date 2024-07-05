import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { TextInput, View } from "react-native";
import Basket from "./basket";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ShopHeader = () => {
  const { theme } = useGlobalContext();
  return (
    <View className="flex flex-row justify-between items-center gap-4 p-3 w-full border-b mb-2">
      <View
        className="flex-1 flex-row items-center gap-2 px-2 h-12 border rounded-lg"
        nativeID="searchInput"
        aria-label="view for search"
        accessible={true}
      >
        <TabBarIcon
          name="search-outline"
          size={22}
          style={{ fontWeight: "semibold" }}
          color={theme.colors.textMuted}
        />
        <TextInput
          placeholder="search..."
          placeholderTextColor={theme.colors.textMuted}
          accessibilityLabelledBy="searchInput"
          accessibilityLabel="search"
          className="w-[70%] text-foreground"

          // accessible={true}
        />
      </View>
      <Basket />
    </View>
  );
};

export default ShopHeader;
