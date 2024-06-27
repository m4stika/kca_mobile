import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Option = Record<"value" | "key", string> & Record<string, string>;
type InputProps = {
  onSelection: (key: unknown, item: Option) => void;
  options: Option[];
  defaultSelection?: unknown;
};

export default function RadioButton({ onSelection, options, defaultSelection }: InputProps) {
  // instead of giving each list item an isSelected prop just keep
  // track of the selected index
  // const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelection || 0);
  const [selectedKey, setSelectedKey] = useState<unknown>(defaultSelection);
  // whenever selectedIndex changes call onSelection
  useEffect(() => {
    if (!selectedKey) return;
    const itemSelected = options.find((item) => item.key === selectedKey);
    itemSelected && onSelection(selectedKey, itemSelected);
  }, [selectedKey]);

  return (
    <View className="flex gap-4">
      {options.map((item, index) => {
        return (
          <TouchableOpacity onPress={() => setSelectedKey(item.key)} key={`${item.key}${index}`}>
            <View className="flex flex-row gap-3">
              <View className="flex items-start justify-start w-8">
                {item.key == selectedKey && (
                  <TabBarIcon
                    name="checkmark-sharp"
                    color={"#0284C7"}
                    // size={32}
                    style={{ fontWeight: "semibold" }}
                  />
                )}
              </View>
              <View className="flex flex-1 flex-col">
                {/* {
                index == selectedIndex ? (
                  <TabBarIcon name="checkmark" selectionColor={"#0F172A"} color={"#0284C7"} />
                )
                : (
                  <TabBarIcon name="radio-button-off" color={"#65758b"} />
                )
              } */}
                <Text className="text-lg font-psemibold">{item.value}</Text>
                {item["caption"] && (
                  <Text className="text-sm font-pregular bg-disabled p-2">{item["caption"]}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {},
  rowItem: {
    // width: '50%',
    paddingVertical: 10,
    marginVertical: 10,
  },
});
