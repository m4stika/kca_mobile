import { useGlobalContext } from "@/context/global-provider";
import { Order, orderStatus } from "@/schema/order.schema";
import { _formatDatetime } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Button } from "./atoms";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import NumberWithCurrency from "./number-with-currency";

const TransactionCard = ({ order }: { order: Order }) => {
  const { setOrderSelected } = useGlobalContext();
  const orderCount = order.OrderDetail.length;
  // const imageSource = getRandomImageSource();
  return (
    <Card className="px-4 pt-4 min-w-80 min-h-64">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-center border-b pb-4">
        <View className="flex gap-0">
          <ThemedText className="font-pmedium">{order.transactionType}</ThemedText>
          <ThemedText className="text-sm -my-2">
            {_formatDatetime(new Date(order.transactionDate), "dd-mm-yyyy")}
          </ThemedText>
        </View>
        <View className="bg-green-200 rounded-full px-3 py-1">
          <ThemedText className="text-xs text-slate-800">
            {orderStatus[order.orderStatus]}
          </ThemedText>
        </View>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 py-2 border-b">
        <View className="flex flex-row gap-2">
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_ASSETS_URL}/assets/products/${order.OrderDetail[0].Barang.fileName}` }}
            // source={imageSource}
            className="h-16 w-16 rounded-md"
            resizeMode="cover"
            width={64}
            height={64}
          />
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
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex-row justify-between">
        <View className="">
          <ThemedText className="text-sm">Total Belanja</ThemedText>
          <NumberWithCurrency value={formatCurrency(order.amount)} />
        </View>
        <Button
          title="Detail Pesanan"
          containerClassName="py-2"
          textClassName="text-xs font-light"
          onPress={() => {
            setOrderSelected(order);
            router.push("/transaction-info");
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
