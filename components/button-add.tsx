import { useGlobalContext } from "@/context/global-provider";
import { Order } from "@/schema/order.schema";
import { Product } from "@/schema/product.schema";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ButtonAdd = ({ product }: { product: Product }) => {
  const { setOrders, orders, setOrderHasChange } = useGlobalContext();
  const handleAddOrder = () => {
    const item: Order = {
      kodeBarang: product.kodeBarang,
      qty: 1,
      price: Number(product.hargaJual),
      Barang: product,
    };
    if (!orders) {
      setOrders([item]);
      setOrderHasChange(true);
      return;
    }

    // const orderContext = orders?.find((item) => item.kodeBarang === item.kodeBarang);
    const itemIndex = orders.findIndex((item) => item.kodeBarang === product.kodeBarang);
    if (itemIndex >= 0) {
      const finalOrders = orders;
      finalOrders[itemIndex].qty += 1;
      setOrders(finalOrders);
      setOrderHasChange(true);
      return;
    }

    setOrders((oldValue) => oldValue && [...oldValue, item]);
    setOrderHasChange(true);
  };
  return (
    <View className="absolute -top-6 right-2 h-8 w-8 rounded-full bg-success items-center justify-center">
      <TouchableOpacity onPress={handleAddOrder}>
        <TabBarIcon name="add" size={22} style={{ fontWeight: "semibold", color: "white" }} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAdd;
