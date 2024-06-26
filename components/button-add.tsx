import { useGlobalContext } from "@/context/global-provider";
import { OrderDetail } from "@/schema/order.schema";
import { Product } from "@/schema/product.schema";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ButtonAdd = ({ product }: { product: Product }) => {
  const { setOrder, order } = useGlobalContext();
  const handleAddOrder = () => {
    const item: OrderDetail = {
      kodeBarang: product.kodeBarang,
      qty: 1,
      price: Number(product.hargaJual),
      Barang: product,
    };

    /* if (order.OrderDetail) {
      setOrder({
        ...orderInitialValue,
        orderAmount: Number(product.hargaJual),
        OrderDetail: [item],
      });
      // setOrderHasChange(true);
      return;
    } */

    // const itemSelected = order.OrderDetail.find((item) => item.kodeBarang === product.kodeBarang);
    const itemIndex = order.OrderDetail.findIndex((item) => item.kodeBarang === product.kodeBarang);
    if (itemIndex >= 0) {
      // const finalOrder = order;
      const { OrderDetail } = order;
      OrderDetail[itemIndex].qty += 1;
      const orderAmount = order.orderAmount + Number(product.hargaJual);
      setOrder((oldValue) => ({
        ...oldValue,
        orderAmount,
        OrderDetail,
      }));

      // finalOrder.OrderDetail[itemIndex].qty += 1;
      // finalOrder.orderAmount += finalOrder.OrderDetail[itemIndex].price;
      // setOrder(finalOrder);
      return;
    }

    setOrder(
      (oldValue) =>
        oldValue && {
          ...oldValue,
          orderAmount: oldValue.orderAmount + item.price,
          OrderDetail: [...oldValue.OrderDetail, item],
        }
    );
    // setOrderHasChange(true);
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
