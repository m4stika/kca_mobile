import { useGlobalContext } from "@/context/global-provider";
import { formatCurrency } from "@/utils/format-currency";
import { getRandomImageSource } from "@/utils/get-random-image-source";
import React from "react";
import { Image, Text, View } from "react-native";
import NumberWithCurrency from "./number-with-currency";

const TransactionInfoCard = () => {
  const { orderSelected } = useGlobalContext();
  // const orderDetail = order.OrderDetail
  if (!orderSelected) return;

  // const imageSource = getRandomImageSource();
  return (
    <View className="flex flex-row min-w-80 min-h-64">
      <View className="flex flex-col border border-border rounded-lg w-full">
        {/* header */}
        <View className="flex flex-row justify-between items-center border-b border-border px-2 py-2">
          <Text className="font-psemibold">Detail Produk</Text>
        </View>

        {/* body */}
        <View className="flex flex-col gap-2 p-2 border-b border-border">
          {orderSelected.OrderDetail.map((item) => (
            <View className="flex" key={item.kodeBarang}>
              <View className="flex flex-row gap-2">
                <Image source={getRandomImageSource()} className="h-14 w-14" resizeMode="cover" />
                <View className="flex">
                  <Text className="text-sm font-pmedium">{item.Barang.namaBarang}</Text>
                  <Text className="text-xs">{`${item.qty} X Rp ${formatCurrency(
                    item.price
                  )}`}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* footer */}
        <View className="flex flex-row justify-between items-center px-2">
          <View className="flex gap-0 py-2">
            <Text className="text-sm">Total Belanja</Text>
            <NumberWithCurrency value={formatCurrency(orderSelected.amount)} />
            {/* <Text className="font-pmedium ">{formatCurrency(order.amount)}</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionInfoCard;
