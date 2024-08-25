import { OrderDetail } from "@/schema/order.schema";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import NumberWithCurrency from "./number-with-currency";
import ShoppingCartAddRemoveItem from "./shopping-cart-add-remove-item";

const ShoppingCartItem = ({ orderItem }: { orderItem: OrderDetail }) => {
  return (
    <View className="flex flex-row gap-2 items-center px-2 ">
      <View className="border">
        <Image
          source={{ uri: `${process.env.EXPO_PUBLIC_ASSETS_URL}/assets/products/${orderItem.Barang.fileName}` }}
          // source={orderItem.Barang.imageSource} 
          className="h-20 w-20" resizeMode="cover"
        />
      </View>
      <View className="flex flex-col flex-auto">
        <View>
          <ThemedText className="text-xs line-clamp-1" numberOfLines={1}>
            {orderItem.Barang.namaBarang}
          </ThemedText>

          <NumberWithCurrency value={formatCurrency(orderItem.price)} />
        </View>
        <ShoppingCartAddRemoveItem orderItem={orderItem} />
      </View>
    </View>
  );
};

export default ShoppingCartItem;
