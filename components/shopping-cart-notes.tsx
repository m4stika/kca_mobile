import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { Text, TextInput, View } from "react-native";

const ShoppingCartNote = () => {
  const { order, setOrder } = useGlobalContext();
  const [value, onChangeText] = React.useState("");

  const changeNote = () => {
    if (!value || value === "") return;
    if (value === order.notes) return;
    setOrder((oldValue) => ({ ...oldValue, notes: value }));
  };

  return (
    <View className="px-2 items-start justify-start flex flex-col gap-2">
      <Text className="">Catatan ke penjual</Text>
      <TextInput
        multiline
        editable
        numberOfLines={4}
        placeholder="isikan catatan untuk penjual (Optional)"
        onChangeText={(text) => onChangeText(text)}
        onBlur={changeNote}
        value={value}
        textAlignVertical="top"
        className="text-sm p-2 border border-border w-full focus:border-accent focus:border-2"
      />
    </View>
  );
};

export default ShoppingCartNote;
