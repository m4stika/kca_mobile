import { useGlobalContext } from "@/context/global-provider";
import { PaymentMethod } from "@/schema/order.schema";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import { RadioButton } from "./atoms";

const PaymentDetail = () => {
  const { setOrder, order, orderAmount } = useGlobalContext();
  if (orderAmount === 0) return;
  const { dismiss } = useBottomSheetModal();
  const radioData = [
    {
      key: "VOUCHER",
      value: "Saldo Voucher",
      caption: "Pembayaran otomatis dengan pemotongan saldo voucher",
    },
    {
      key: "TRANSFER",
      value: "Transfer Bank",
      caption: "Pembayaran dengan transfer bank",
    },
    {
      key: "CASH",
      value: "Tunai",
      caption: "Pembayaran dengan tunai saat barang sampai di tujuan",
    },
  ];
  return (
    <View className="h-full flex flex-col py-3 gap-2 px-3">
      <RadioButton
        defaultSelection={order.paymentMethod}
        options={radioData}
        onSelection={(index, value) => {
          setOrder((oldValue) => ({ ...oldValue, paymentMethod: value.key as PaymentMethod }));
          dismiss();
        }}
      />
    </View>
  );
};

export default PaymentDetail;
