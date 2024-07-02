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
      <ThemedText className={`text-foreground mr-1 font-plight ${currencyClassName}`}>
        Rp
      </ThemedText>
      <ThemedText className={`text-foreground text-base font-psemibold", ${valueClassName}`}>
        {value}
      </ThemedText>
    </View>
  );
};

export default NumberWithCurrency;
