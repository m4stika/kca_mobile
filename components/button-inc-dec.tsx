import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
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

  useEffect(() => onChange && onChange(value), [value]);

  return (
    <View className="flex-1 flex-row gap-3 items-center justify-end mr-2">
      {title && <Text>{title}</Text>}
      <View className="flex flex-row rounded-full border border-border w-28 self-end items-center justify-between px-1 py-1">
        <TabBarIcon
          name="remove"
          size={20}
          onPress={() => setValue((oldValue) => (oldValue <= 0 ? 1 : oldValue - 1))}
          className={`${value === 0 && "hidden"}`}
        />
        <Text className="flex-1 text-center">{value}</Text>
        <TabBarIcon
          name="add"
          size={20}
          onPress={() =>
            setValue((oldValue) => (maxValue && maxValue <= oldValue ? maxValue : oldValue + 1))
          }
        />
      </View>
    </View>
  );
};

export default ButtonIncDec;
