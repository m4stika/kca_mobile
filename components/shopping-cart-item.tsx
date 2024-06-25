import { unsplash1 } from "@/assets/images";
import { Order } from "@/schema/order.schema";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Image, Text, View } from "react-native";
import NumberWithCurrency from "./number-with-currency";
import ShoppingCartAddRemoveItem from "./shopping-cart-add-remove-item";

const ShoppingCartItem = ({ order }: { order: Order }) => {
  return (
    <View className="flex flex-row gap-2 items-center px-2">
      <View className="border">
        <Image source={unsplash1} className="h-24 w-20" resizeMode="cover" />
      </View>
      <View className="flex flex-col flex-auto">
        <View>
          <Text className="text-xs line-clamp-1" numberOfLines={1}>
            {order.Barang.namaBarang}
          </Text>

          <NumberWithCurrency value={formatCurrency(order.price)} />
        </View>
        <ShoppingCartAddRemoveItem order={order} />
      </View>
    </View>
  );
};

export default ShoppingCartItem;
