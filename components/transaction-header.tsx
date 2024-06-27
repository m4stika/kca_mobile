import React from "react";
import { Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

const TransactionHeader = () => {
  // const ArrOrderStatus = Object.values(orderStatus);
  return (
    <View className="flex flex-row rounded-xl p-2 bg-disabled w-fit items-center justify-between">
      <Text>{"Semua Status"}</Text>
      <TabBarIcon
        name="chevron-down"
        size={16}
        // className={clsx(`mt-0`, color === "default" ? "text-primary" : "text-slate-100")}
        // color={ "black" : "white"}
      />
    </View>
  );
};

export default TransactionHeader;
