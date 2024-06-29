import { useGlobalContext } from "@/context/global-provider";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const TransactionInfoHeader = () => {
  const { theme } = useGlobalContext();
  return (
    <View className="p-4 border-b border-border">
      <TouchableOpacity onPress={() => router.navigate("/transaction")}>
        <View className="flex flex-row gap-4 items-center">
          <TabBarIcon name="chevron-back" color={theme.dark ? "#E2E8F0" : "#18181b"} />
          <ThemedText className="font-pmedium text-lg">{"Detail Pesanan"}</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionInfoHeader;
