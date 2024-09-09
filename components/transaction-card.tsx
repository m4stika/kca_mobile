import { useGlobalContext } from "@/context/global-provider";
import { Order, OrderStatus, orderStatus } from "@/schema/order.schema";
import { _formatDatetime } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Button } from "./atoms";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import NumberWithCurrency from "./number-with-currency";
import { api } from "@/utils/fetching";
import { cn } from "@/utils/cn";

const TransactionCard = ({ order, reFetch }: { order: Order, reFetch: () => void }) => {
  const { setOrderSelected } = useGlobalContext();
  const orderCount = order.OrderDetail.length;

  const onCancelOrder = async () => {
    const response = await api.patch<unknown, Order>({
      url: `orders/cancel`,
      data: { id: order.id }
    });
    if (response.status === "error") alert(response.message);
    else {
      if (response.data) {
        reFetch()
      }
    }
  };
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
        <View className={cn("rounded-full px-3 py-1", order.orderStatus === "ON_VERIFICATION" ? "bg-warning" : order.orderStatus === "CANCELED" ? "bg-error" : "bg-info")}>
          <ThemedText className={cn("text-xs text-background", order.orderStatus === "ON_VERIFICATION" ? "bg-warning" : order.orderStatus === "CANCELED" ? "bg-error" : "bg-info text-foreground")}>
            {orderStatus[order.orderStatus]}
          </ThemedText>
        </View>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex py-2 border-b">
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
      <CardFooter className="gap-3">
        <View className="flex-row justify-between w-full border-b pb-2">
          <View className="">
            <ThemedText className="text-sm">Total Belanja</ThemedText>
            <NumberWithCurrency value={formatCurrency(order.amount)} />
          </View>
          <Button
            title="Tampilkan Rincian"
            containerClassName="py-2 bg-backround border"
            textClassName="text-xs font-light text-primary "
            onPress={() => {
              setOrderSelected(order);
              router.push("/transaction-info");
            }}
          />
        </View>
        {(["PRE_ORDER", "ON_VERIFICATION"] as OrderStatus[]).includes(order.orderStatus) && (
          <Button
            title="Batalkan pesanan"
            containerClassName="py-2 border self-start bg-backround"
            textClassName="text-xs font-light text-error"
            onPress={onCancelOrder}
          />
        )}

      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
