import { useGlobalContext } from "@/context/global-provider";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ButtonIncDec = ({
  title,
  maxValue,
  onChange,
}: {
  title?: string;
  maxValue?: number;
  onChange?: (value: number) => void;
}) => {
  const [value, setValue] = useState<number>(1);
  const { theme } = useGlobalContext();

  useEffect(() => onChange && onChange(value), [value]);

  return (
    <View className="flex-1 flex-row gap-3 items-center justify-end mr-2">
      {title && <ThemedText>{title}</ThemedText>}
      <View className="flex flex-row rounded-full border border-border w-28 self-end items-center justify-between px-1 py-1">
        <TabBarIcon
          name="remove"
          size={20}
          onPress={() => setValue((oldValue) => (oldValue <= 0 ? 1 : oldValue - 1))}
          className={`${value === 0 && "hidden"}`}
          color={theme.dark ? "#E2E8F0" : "#18181b"}
        />
        <ThemedText className="flex-1 text-center">{value}</ThemedText>
        <TabBarIcon
          name="add"
          size={20}
          color={theme.dark ? "#E2E8F0" : "#18181b"}
          onPress={() =>
            setValue((oldValue) => (maxValue && maxValue <= oldValue ? maxValue : oldValue + 1))
          }
        />
      </View>
    </View>
  );
};

export default ButtonIncDec;
