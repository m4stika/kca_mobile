import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { FlatList, Text, View } from "react-native";
import ShoppingCartItem from "./shopping-cart-item";

const ShoppingCartList = () => {
  const { order } = useGlobalContext();
  return !order || order.OrderDetail.length === 0 ? (
    <View className="h-40 flex items-center justify-center">
      <Text className="font-pmedium">Kerangjang belanja masih kosong</Text>
    </View>
  ) : (
    <View className="flex">
      <FlatList
        data={order.OrderDetail.sort()}
        keyExtractor={(item) => item.kodeBarang}
        renderItem={(item) => <ShoppingCartItem orderItem={item.item} />}
        ItemSeparatorComponent={() => <View className="py-2" />}
        // ListFooterComponent={() => <ShoppingChartFooter />}
      />
    </View>
  );
};

export default ShoppingCartList;
