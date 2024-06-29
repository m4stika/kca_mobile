import { OrderDetail } from "@/schema/order.schema";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Image, Text, View } from "react-native";
import NumberWithCurrency from "./number-with-currency";
import ShoppingCartAddRemoveItem from "./shopping-cart-add-remove-item";

const ShoppingCartItem = ({ orderItem }: { orderItem: OrderDetail }) => {
  return (
    <View className="flex flex-row gap-2 items-center px-2 ">
      <View className="border">
        <Image source={orderItem.Barang.imageSource} className="h-24 w-20" resizeMode="cover" />
      </View>
      <View className="flex flex-col flex-auto">
        <View>
          <Text className="text-xs line-clamp-1" numberOfLines={1}>
            {orderItem.Barang.namaBarang}
          </Text>

          <NumberWithCurrency value={formatCurrency(orderItem.price)} />
        </View>
        <ShoppingCartAddRemoveItem orderItem={orderItem} />
      </View>
    </View>
  );
};

export default ShoppingCartItem;
