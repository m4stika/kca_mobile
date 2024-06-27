import { useGlobalContext } from "@/context/global-provider";
import { OrderDetail } from "@/schema/order.schema";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ShoppingCartAddRemoveItem = ({ orderItem }: { orderItem: OrderDetail }) => {
  const { setOrder, order } = useGlobalContext();
  if (order.OrderDetail.length === 0) return;
  const selectedItem = order.OrderDetail.find((item) => item.kodeBarang === orderItem.kodeBarang);
  if (!selectedItem) return;

  const [qty, setQty] = useState<number>(selectedItem.qty);

  const handleAddQty = (isAdder: boolean) => {
    const tempQty = isAdder ? qty + 1 : qty - 1;
    setQty(tempQty);

    const itemIndex = order.OrderDetail.findIndex(
      (item) => item.kodeBarang === orderItem.kodeBarang
    );

    // const tempOrder = order;
    if (itemIndex >= 0) {
      const { OrderDetail } = order;
      OrderDetail[itemIndex].qty = tempQty;
      let amount = order.amount;
      if (isAdder) {
        amount += Number(orderItem.price);
      } else {
        amount -= Number(orderItem.price);
      }

      setOrder((oldValue) => ({
        ...oldValue,
        amount,
        OrderDetail,
      }));
      // setOrderHasChange(true);
    }
  };

  const handleDelete = () => {
    if (order) {
      const itemFilter = order.OrderDetail.filter(
        (item) => item.kodeBarang !== orderItem.kodeBarang
      );
      order.amount -= Number(orderItem.price);
      setOrder({ ...order, OrderDetail: itemFilter });
      // setOrder(tempOrders.OrderDetail.filter((item) => item.kodeBarang !== order.kodeBarang));
      // setOrderHasChange(true);
    }
  };

  return (
    <View className="flex flex-row rounded-full border border-border w-28 self-end items-center justify-between px-1">
      {selectedItem.qty === 1 ? (
        <TabBarIcon name="trash" size={20} onPress={handleDelete} />
      ) : (
        <TabBarIcon name="remove" size={20} onPress={() => handleAddQty(false)} />
      )}
      <Text>{selectedItem.qty}</Text>
      <TabBarIcon name="add" size={20} onPress={() => handleAddQty(true)} />
    </View>
  );
};

export default ShoppingCartAddRemoveItem;
