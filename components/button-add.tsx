import { useGlobalContext } from "@/context/global-provider";
import { Product } from "@/schema/product.schema";
import { addToOrder } from "@/utils/add-order";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { cn } from "@/utils/cn";

const ButtonAdd = ({ product }: { product: Product }) => {
  const { setOrder, order, theme } = useGlobalContext();
  /*
  const handleAddOrder = () => {
    const item: OrderDetail = {
      kodeBarang: product.kodeBarang,
      qty: 1,
      price: Number(product.hargaJual),
      Barang: product,
    };
    const itemIndex = order.OrderDetail.findIndex((item) => item.kodeBarang === product.kodeBarang);
    if (itemIndex >= 0) {
      const { OrderDetail } = order;
      OrderDetail[itemIndex].qty += 1;
      const amount = order.amount + Number(product.hargaJual);
      setOrder((oldValue) => ({
        ...oldValue,
        amount,
        OrderDetail,
      }));

      return;
    }

    setOrder(
      (oldValue) =>
        oldValue && {
          ...oldValue,
          amount: oldValue.amount + item.price,
          OrderDetail: [...oldValue.OrderDetail, item],
        }
    );
  };
   */
  return (
    <View
      className={cn(
        "absolute -top-6 right-1 h-8 w-8 rounded-full items-center justify-center ",
        product.stok === 0 ? "hidden bg-disabled" : "bg-success"
      )}
    >
      <TouchableOpacity
        onPress={() => addToOrder(setOrder, order, product, 1)}
        disabled={product.stok === 0}
      >
        <TabBarIcon
          name="add"
          size={22}
          color={product.stok === 0 ? theme.colors.icon : theme.colors.background}
          style={{
            fontWeight: "semibold",
            // color: theme.dark
            //   ? product.stok === 0
            //     ? "#94a3b8"
            //     : "#4b5563"
            //   : product.stok === 0
            //   ? "#4b5563"
            //   : "#E1E7EF",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAdd;
