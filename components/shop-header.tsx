import React from "react";
import { TextInput, View } from "react-native";
import Basket from "./basket";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ShopHeader = () => {
  return (
    <View className="flex flex-row justify-between items-center gap-4 p-3 w-full border-b border-border mb-2">
      <View
        className="flex-1 flex-row items-center gap-2 px-2 py-1 border border-border rounded-lg bg-background"
        nativeID="searchInput"
        aria-label="view for search"
        accessible={true}
      >
        <TabBarIcon name="search-outline" size={22} style={{ fontWeight: "semibold" }} />
        <TextInput
          placeholder="search..."
          accessibilityLabelledBy="searchInput"
          accessibilityLabel="search"
          className="w-[70%]"
          // accessible={true}
        />
      </View>
      <Basket />
    </View>
  );
};

export default ShopHeader;
