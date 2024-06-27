import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

const TransactionInfoHeader = () => {
  return (
    <View className="p-4 border-b border-border">
      <TouchableOpacity onPress={() => router.navigate("/transaction")}>
        <View className="flex flex-row gap-4 items-center">
          <TabBarIcon name="chevron-back" />
          <Text className="font-pmedium text-lg">{"Detail Pesanan"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionInfoHeader;
