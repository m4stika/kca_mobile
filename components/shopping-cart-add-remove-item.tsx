import { useGlobalContext } from "@/context/global-provider";
import { Order } from "@/schema/order.schema";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ShoppingCartAddRemoveItem = ({ order }: { order: Order }) => {
  const { setOrders, orders, setOrderHasChange } = useGlobalContext();
  if (!orders) return;
  const selectedOrder = orders.find((item) => item.kodeBarang === order.kodeBarang);
  if (!selectedOrder) return;

  const [qty, setQty] = useState<number>(selectedOrder.qty);

  const handleAddQty = (isAdder: boolean) => {
    if (!orders) return;
    isAdder ? setQty((old) => old + 1) : setQty((old) => old - 1);
    const itemIndex = orders.findIndex((item) => item.kodeBarang === order.kodeBarang);
    const tempOrders = orders;
    if (itemIndex >= 0) {
      tempOrders[itemIndex].qty = qty;
      setOrders(tempOrders);
      setOrderHasChange(true);
    }
  };

  const handleDelete = () => {
    const tempOrders = orders;
    if (tempOrders) {
      tempOrders?.filter((item) => item.kodeBarang !== order.kodeBarang);
      setOrders(tempOrders?.filter((item) => item.kodeBarang !== order.kodeBarang));
      setOrderHasChange(true);
    }
  };

  return (
    <View className="flex flex-row rounded-full border border-border w-28 self-end items-center justify-between px-1">
      {selectedOrder.qty === 1 ? (
        <TabBarIcon name="trash" size={20} onPress={handleDelete} />
      ) : (
        <TabBarIcon name="remove" size={20} onPress={() => handleAddQty(false)} />
      )}
      <Text>{selectedOrder.qty}</Text>
      <TabBarIcon name="add" size={20} onPress={() => handleAddQty(true)} />
    </View>
  );
};

export default ShoppingCartAddRemoveItem;
