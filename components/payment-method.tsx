import { useGlobalContext } from "@/context/global-provider";
import { paymentMethod } from "@/schema/order.schema";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

const PaymentMethod = ({ onPress }: { onPress: () => void }) => {
  const { order } = useGlobalContext();
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center justify-between p-2 border border-border rounded-md">
        <Text>{paymentMethod[order.paymentMethod!] || "Pilih Cara Pembayaran"}</Text>
        <TabBarIcon name="chevron-forward" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default PaymentMethod;
