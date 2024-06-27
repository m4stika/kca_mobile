import { useGlobalContext } from "@/context/global-provider";
import { shippingMethod } from "@/schema/order.schema";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ShippingMethod = ({ onPress }: { onPress: () => void }) => {
  const { order, orderCount } = useGlobalContext();
  if (orderCount === 0) return;
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center justify-between p-2 border border-border rounded-xl">
        <Text>{shippingMethod[order.shippingMethod!] || "Pilih Pengiriman"}</Text>
        <TabBarIcon name="chevron-forward" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default ShippingMethod;
