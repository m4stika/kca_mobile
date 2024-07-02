import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { View } from "react-native";
import { Input } from "./atoms";

const ShoppingCartNote = () => {
  const { order, setOrder, setIsLoading } = useGlobalContext();
  const [value, setValue] = React.useState(order.notes);

  // const debouncedHandler = useCallback(debounce(setValue, 200), [value]);

  const changeNote = () => {
    if (value === "") return;
    // if (value === order.notes) return;
    // setValue(noteValue);
    setOrder((oldValue) => ({ ...oldValue, notes: value }));
    setIsLoading(false);
    // setNotes((oldValue) => ({ ...oldValue, notes: value }));
  };

  return (
    <View className="px-2 items-start justify-start flex flex-col gap-2">
      <Input
        title="Catatan ke penjual"
        value={value}
        onBlur={changeNote}
        onFocus={() => setIsLoading(true)}
        // multiline
        // editable
        numberOfLines={4}
        placeholder="Catatan untuk penjual (Optional)"
        className="mt-7"
        textAlignVertical="top"
        inputClassName="h-28"
        onChangeText={(strValue) => setValue(strValue)}
      />
    </View>
  );
};

export default ShoppingCartNote;
