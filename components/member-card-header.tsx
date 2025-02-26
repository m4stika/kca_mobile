import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const MemberCardHeader = () => {
  return (
    <View className="">
      <TouchableOpacity onPress={() => router.navigate("/profile")}>
        <View className="flex flex-row gap-4 items-center">
          <TabBarIcon name="chevron-back" />
          <ThemedText className="font-pmedium text-lg">{"Kartu Anggota"}</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MemberCardHeader;
