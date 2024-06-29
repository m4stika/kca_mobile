import { useGlobalContext } from "@/context/global-provider";
import { paymentMethod, shippingMethod } from "@/schema/order.schema";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import LabelWithValue from "./label-with-value";

const TransactionInfoPaymentShipping = () => {
  const { orderSelected } = useGlobalContext();
  if (!orderSelected) return;

  return (
    <View className="flex gap-2 px-2 py-2">
      <View className="flex flex-row justify-between items-center border-b border-border px-2 py-2">
        <ThemedText className="font-psemibold">Informasi Lainnya</ThemedText>
      </View>
      <View className="flex gap-2 border-b border-border pb-3">
        {/* <Text>{orderSelected.invoiceNo}</Text> */}
        <LabelWithValue title="Pembayaran" value={paymentMethod[orderSelected.paymentMethod!]} />
        <LabelWithValue title="Pengiriman" value={shippingMethod[orderSelected.shippingMethod!]} />
      </View>
    </View>
  );
};

export default TransactionInfoPaymentShipping;
