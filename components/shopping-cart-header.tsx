import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ShoppingCartHeader = () => {
  return (
    <View className="p-4">
      <TouchableOpacity onPress={() => router.back()}>
        <View className="flex flex-row gap-4 items-center mb-5">
          <TabBarIcon name="chevron-back" />
          <Text className="font-pmedium text-lg">Keranjang</Text>
        </View>
      </TouchableOpacity>
      <View className="border-b border-border" />
    </View>
  );
};

export default ShoppingCartHeader;
