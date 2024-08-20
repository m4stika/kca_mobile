import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const LoanHeader = () => {
  return (
    <View className="p-4 border-b">
      <TouchableOpacity onPress={() => router.navigate("/home")}>
        <View className="flex flex-row gap-4 items-center">
          <TabBarIcon name="chevron-back" />
          <ThemedText className="font-pmedium text-lg">{"Simulasi Pinjaman"}</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoanHeader;
