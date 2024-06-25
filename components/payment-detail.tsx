import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

const PaymentDetail = () => {
  return (
    <View className="h-full flex flex-col gap-2 px-3">
      <View className="shadow-md justify-center p-2 border-b border-border">
        <ThemedText className="text-lg font-psemibold">Saldo Voucher</ThemedText>
        <ThemedText className="font-pregular pl-4 bg-muted" numberOfLines={3}>
          Pembayaran otomatis dengan pemotongan saldo voucher
        </ThemedText>
      </View>
      <View className="shadow-md justify-center p-2 border-b border-border">
        <ThemedText className="text-lg font-psemibold">Transfer Bank</ThemedText>
        <ThemedText className="font-pregular pl-4 bg-muted">
          Pembayaran dengan transfer bank
        </ThemedText>
      </View>
      <View className="shadow-md justify-center p-2 border-b border-border">
        <ThemedText className="text-lg font-psemibold">Tunai</ThemedText>
        <ThemedText className="font-pregular pl-4 bg-muted">
          Pembayaran dengan tunai saat barang sampai di tujuan
        </ThemedText>
      </View>
    </View>
  );
};

export default PaymentDetail;
