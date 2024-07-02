import { useGlobalContext } from "@/context/global-provider";
import { formatCurrency } from "@/utils/format-currency";
import { getRandomImageSource } from "@/utils/get-random-image-source";
import clsx from "clsx";
import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import NumberWithCurrency from "./number-with-currency";

const TransactionInfoCard = () => {
  const { orderSelected } = useGlobalContext();
  if (!orderSelected) return;

  // const imageSource = getRandomImageSource();
  return (
    <View className="flex flex-row min-w-80 min-h-64">
      <View className="flex flex-col border border-border rounded-lg w-full">
        {/* header */}
        <View className="flex flex-row justify-between items-center border-b border-border px-2 py-2">
          <ThemedText className="font-psemibold">Detail Produk</ThemedText>
        </View>

        {/* body */}
        <View
          className={clsx(
            orderSelected.OrderDetail.length > 1 ? "flex" : "flex-1",
            "flex flex-col gap-2 p-2 border-b border-border"
          )}
        >
          {orderSelected.OrderDetail.map((item) => (
            <View className="flex" key={item.kodeBarang}>
              <View className="flex flex-row gap-2">
                <Image source={getRandomImageSource()} className="h-14 w-14" resizeMode="cover" />
                <View className="flex">
                  <ThemedText className="text-sm font-pmedium">{item.Barang.namaBarang}</ThemedText>
                  <ThemedText className="text-xs">{`${item.qty} X Rp ${formatCurrency(
                    item.price
                  )}`}</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* footer */}
        <View
          // className={`${orderSelected.OrderDetail.length > 1 ? "flex" : "flex-1"} justify-end px-2`}
          className={`flex justify-end px-2`}
        >
          <View className="flex gap-0 py-2 justify-end">
            <ThemedText className="text-sm">Total Belanja</ThemedText>
            <NumberWithCurrency value={formatCurrency(orderSelected.amount)} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionInfoCard;
