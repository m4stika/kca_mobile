import { cn } from "@/utils/cn";
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
    <View className={cn("flex flex-row ", containerClassName)}>
      <ThemedText className={cn(`mr-1 font-plight`, currencyClassName)}>Rp</ThemedText>
      <ThemedText className={cn(`font-psemibold text-left`, valueClassName)}>{value}</ThemedText>
    </View>
  );
};

export default NumberWithCurrency;
