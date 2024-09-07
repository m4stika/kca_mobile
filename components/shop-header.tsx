import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Basket from "./basket";
import { TabBarIcon } from "./navigation/TabBarIcon";

type ShopHeaderProps = {
  searchValue: string | undefined
  setSearchValue: (value: string | undefined) => void
  refetch: () => void
}
const ShopHeader = ({ searchValue, setSearchValue, refetch }: ShopHeaderProps) => {
  const [value, setValue] = React.useState<string | undefined>(searchValue)
  const { theme } = useGlobalContext();

  const onSearchHandle = () => {
    setSearchValue(value)
    // if (!value || value === "") refetch()
  }

  const onValueHandle = (strValue: string | undefined) => {
    // if (!value || value === "") setSearchValue(value)
    setValue(strValue)
  }

  return (
    <View className="flex flex-row justify-between items-center gap-3 p-3 w-full border-b mb-2 ">
      <View
        className="flex-1 flex-row items-center justify-around gap-2 h-12 border rounded-lg"
        nativeID="searchInput"
        aria-label="view for search"
        accessible={true}
      >
        <TextInput
          value={value}
          onChangeText={onValueHandle}
          placeholder="search..."
          placeholderTextColor={theme.colors.textMuted}
          accessibilityLabelledBy="searchInput"
          accessibilityLabel="search"
          className="w-[70%] text-foreground text-lg"
        // accessible={true}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={onSearchHandle}>
          <TabBarIcon
            name="search-outline"
            size={28}
            style={{ fontWeight: "semibold", alignSelf: "flex-end" }}
            color={theme.colors.textMuted}
          />
        </TouchableOpacity>
      </View>
      <Basket />
    </View>
  );
};

export default ShopHeader;
