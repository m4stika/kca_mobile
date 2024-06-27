import { useGlobalContext } from "@/context/global-provider";
import { Order, orderInitialValue } from "@/schema/order.schema";
import { _formatDatetime } from "@/utils/date-formater";
import { api } from "@/utils/fetching";
import { formatCurrency } from "@/utils/format-currency";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "./atoms";
import NumberWithCurrency from "./number-with-currency";

const ShoppingCartFooter = () => {
  const { orderAmount, order, setOrder, member } = useGlobalContext();
  if (orderAmount === 0) return;
  const isValid = order.paymentMethod !== undefined && order.shippingMethod !== undefined;

  // console.log({ orderAmount, orderHasChanged });
  // const orderAmount = orders
  //   ? orders.reduce((accumulated, item) => (accumulated += item.price * item.qty), 0)
  //   : 0;
  const onSubmit = async () => {
    const { id, ...other } = order;
    const orderDetail = order.OrderDetail.map(({ Barang, ...other }) => other);

    const dataApi = {
      ...other,
      noAnggota: member?.noAnggota,
      transactionDate: _formatDatetime(new Date(other.transactionDate), "yyyy-mm-dd"),
      OrderDetail: orderDetail,
    };

    const response = await api.post<unknown, Order>({
      url: `orders`,
      data: dataApi,
    });
    if (response.status === "error") alert(response.message);
    else {
      if (response.data) {
        setOrder(orderInitialValue);
        router.navigate("/transaction");
      }
    }
  };

  return (
    // <View className="flex-1 justify-end">
    <View className="flex justify-end h-20 bottom-0">
      <View className="flex flex-row justify-end px-4  py-2 border-t border-border mt-3 gap-2">
        <View className="flex items-end px-2">
          <Text className="pr-2">Total</Text>
          <NumberWithCurrency value={formatCurrency(orderAmount)} />
        </View>
        <Button
          title="Beli"
          containerClassName="w-28 bg-success disabled:bg-disabled"
          disabled={!isValid}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default ShoppingCartFooter;
