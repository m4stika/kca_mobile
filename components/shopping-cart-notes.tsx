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

  // const onInputChange = (fieldName: keyof UserLogin, value: string) => {
  //   setFormLogin((oldValue) => ({ ...oldValue, [fieldName]: value }));
  // };

  return (
    <View className="px-2 items-start justify-start flex flex-col gap-2">
      {/* <ThemedText className="">Catatan ke penjual</ThemedText> */}
      <Input
        title="Catatan ke penjual"
        // inputMode="email"
        value={value}
        onBlur={changeNote}
        onFocus={() => setIsLoading(true)}
        multiline
        editable
        numberOfLines={4}
        placeholder="Catatan untuk penjual (Optional)"
        className="mt-7"
        textAlignVertical="top"
        inputClassName="focus-visible:border-none focus:border-none focus:ring-2 focus:ring-error h-28"
        onChangeText={(strValue) => {
          setValue(strValue);
          // setNotes(strValue);
          // setOrder((oldValue) => ({ ...oldValue, notes: strValue }));
        }}
      />
      {/* <TextInput
        multiline
        editable
        numberOfLines={4}
        placeholder="Catatan untuk penjual (Optional)"
        onChangeText={(text) => onChangeText(text)}
        onBlur={changeNote}
        value={value}
        textAlignVertical="top"
        placeholderTextColor={theme.colors.textMuted}
        className="text-sm p-2 border border-border w-full focus:border-accent focus:border-2 dark:text-foreground"
        // className="w-[70%] dark:text-foreground"
      /> */}
    </View>
  );
};

export default ShoppingCartNote;
