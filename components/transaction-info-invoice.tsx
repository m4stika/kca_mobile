import { useGlobalContext } from "@/context/global-provider";
import { orderStatus } from "@/schema/order.schema";
import { formatDate } from "@/utils/date-formater";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import LabelWithValue from "./label-with-value";

const TransactionInvoiceInfo = () => {
  const { orderSelected } = useGlobalContext();
  if (!orderSelected) return;

  return (
    <View className="flex gap-2 px-2 py-2">
      <View className="flex flex-row bg-green-200 px-3 py-1 rounded-full justify-end items-center w-[60%] self-end">
        <ThemedText className="text-sm font-pmedium">
          {orderStatus[orderSelected.orderStatus]}
        </ThemedText>
      </View>
      <View className="flex gap-2 border-b border-border pb-3">
        <LabelWithValue
          title="No. Invoice"
          value={orderSelected.invoiceNo!}
          valueClassName="text-primary underline"
        />
        <LabelWithValue title="Tgl Pembelian" value={formatDate(orderSelected.transactionDate)} />
      </View>
    </View>
  );
};

export default TransactionInvoiceInfo;
