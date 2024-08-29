import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Basket from "./basket";
import { TabBarIcon } from "./navigation/TabBarIcon";

type ShopHeaderProps = {
  searchValue: string | undefined
  setValue: (value: string) => void
  refetch: () => void
}
const ShopHeader = ({ searchValue, setValue, refetch }: ShopHeaderProps) => {
  // const [searchValue, setValue] = useState<string>()
  const { theme } = useGlobalContext();

  const onSearchHandle = () => {

  }

  return (
    <View className="flex flex-row justify-between items-center gap-4 p-3 w-full border-b mb-2">
      <View
        className="flex-1 flex-row items-center gap-2 px-2 h-12 border rounded-lg"
        nativeID="searchInput"
        aria-label="view for search"
        accessible={true}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={refetch}>
          <TabBarIcon
            name="search-outline"
            size={22}
            style={{ fontWeight: "semibold" }}
            color={theme.colors.textMuted}
          />
        </TouchableOpacity>
        <TextInput
          value={searchValue}
          onChangeText={setValue}
          placeholder="search..."
          placeholderTextColor={theme.colors.textMuted}
          accessibilityLabelledBy="searchInput"
          accessibilityLabel="search"
          className="w-[70%] text-foreground"
        // accessible={true}
        />
      </View>
      <Basket />
    </View>
  );
};

export default ShopHeader;
