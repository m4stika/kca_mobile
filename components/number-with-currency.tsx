import clsx from "clsx";
import React from "react";
import { Text, View } from "react-native";

const NumberWithCurrency = ({
  value,
  containerClassName,
  currencyClassName,
  valueClassName,
}: {
  value: string;
  containerClassName?: string;
  currencyClassName?: string;
  valueClassName?: string;
}) => {
  return (
    <View className={clsx("flex flex-row items-start", containerClassName)}>
      <Text className={clsx("mr-1", currencyClassName)}>Rp</Text>
      <Text className={clsx("text-base font-psemibold", valueClassName)}>{value}</Text>
    </View>
  );
};

export default NumberWithCurrency;
