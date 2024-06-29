import clsx from "clsx";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

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
      <ThemedText className={clsx("mr-1", currencyClassName)}>Rp</ThemedText>
      <ThemedText className={clsx("text-base font-psemibold", valueClassName)}>{value}</ThemedText>
    </View>
  );
};

export default NumberWithCurrency;
