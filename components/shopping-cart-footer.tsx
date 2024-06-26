import { useGlobalContext } from "@/context/global-provider";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "./atoms";
import NumberWithCurrency from "./number-with-currency";

const ShoppingChartFooter = () => {
  const { orderAmount, order } = useGlobalContext();
  if (orderAmount === 0) return;
  const isValid = order.paymentMethod !== undefined && order.shippingMethod !== undefined;

  // console.log({ orderAmount, orderHasChanged });
  // const orderAmount = orders
  //   ? orders.reduce((accumulated, item) => (accumulated += item.price * item.qty), 0)
  //   : 0;
  const onSubmit = () => {
    alert("submit");
  };

  return (
    <View className="flex-1 justify-end">
      <View className="flex flex-row justify-end px-4 border py-2 border-border mt-3 gap-2">
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

export default ShoppingChartFooter;
