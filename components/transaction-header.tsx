import React from "react";
import { View, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const TransactionHeader = () => {
  // const ArrOrderStatus = Object.values(orderStatus);
  const theme = useColorScheme() ?? "light";
  return (
    <View className="flex flex-row rounded-xl p-2 bg-disabled w-fit items-center justify-between">
      <ThemedText>{"Semua Status"}</ThemedText>
      <TabBarIcon
        name="chevron-down"
        size={16}
        // className={clsx(`mt-0`, color === "default" ? "text-primary" : "text-slate-100")}
        color={theme === "light" ? "black" : "white"}
      />
    </View>
  );
};

export default TransactionHeader;
