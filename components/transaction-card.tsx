import { useGlobalContext } from "@/context/global-provider";
import { Order, orderStatus } from "@/schema/order.schema";
import { _formatDatetime } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { getRandomImageSource } from "@/utils/get-random-image-source";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Button } from "./atoms";
import NumberWithCurrency from "./number-with-currency";

const TransactionCard = ({ order }: { order: Order }) => {
  const { setOrderSelected } = useGlobalContext();
  // const orderDetail = order.OrderDetail
  const orderCount = order.OrderDetail.length;
  const imageSource = getRandomImageSource();
  return (
    <View className="flex flex-row min-w-80 min-h-64">
      <View className="flex flex-col border border-border rounded-lg w-full">
        {/* header */}
        <View className="flex flex-row justify-between items-center border-b border-border px-2 pb-4">
          <View className="flex gap-0 py-2">
            <ThemedText className="font-pmedium">{order.transactionType}</ThemedText>
            <ThemedText className="text-sm -my-2">
              {_formatDatetime(new Date(order.transactionDate), "dd-mm-yyyy")}
            </ThemedText>
          </View>
          <View className="bg-green-200 rounded-full px-3 py-1">
            <Text className="text-xs">{orderStatus[order.orderStatus]}</Text>
          </View>
        </View>

        {/* body */}
        <View className="flex-1 p-2 border-b border-border">
          <View className="flex flex-row gap-2">
            <Image source={imageSource} className="h-16 w-16" resizeMode="contain" />
            <View className="flex">
              <ThemedText className="text-sm font-pmedium">
                {order.OrderDetail[0].Barang.namaBarang}
              </ThemedText>
              <ThemedText className="text-xs">{`${order.OrderDetail[0].qty} barang`}</ThemedText>
            </View>
          </View>
          {orderCount > 1 && (
            <ThemedText className="italic">{`+ ${orderCount} barang lainnya`}</ThemedText>
          )}
          {/* <View></View> */}
        </View>

        {/* footer */}
        <View className="flex flex-row justify-between items-center px-2">
          <View className="flex gap-0 py-2">
            <ThemedText className="text-sm">Total Belanja</ThemedText>
            <NumberWithCurrency value={formatCurrency(order.amount)} />
            {/* <Text className="font-pmedium ">{formatCurrency(order.amount)}</Text> */}
          </View>
          <Button
            title="Detail Pesanan"
            containerClassName="py-1 bg-primary"
            textClassName="text-xs font-light"
            onPress={() => {
              setOrderSelected(order);
              router.replace("/transaction-info");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;
