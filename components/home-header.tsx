import { User } from "@/schema/user.schema";
import { Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const HomeHeader = ({ user }: { user: User }) => (
  <View className="w-full flex-row items-center justify-between px-2 pb-4 border-b border-border">
    <View className="flex flex-row gap-2 items-center">
      <View className="items-start flex">
        <ThemedText className="p-0 text-xs font-psemibold ">{user?.name}</ThemedText>
        <ThemedText className="text-xs tracking-tighter">{user?.email}</ThemedText>
      </View>
      <View className="rounded-full bg-success/80 px-2 h-6 flex flex-row items-center justify-between gap-1">
        <TabBarIcon name="checkmark" size={12} color={"#fafafa"} />
        <Text className="text-xs text-background">Member</Text>
      </View>
    </View>
    <View>
      <TabBarIcon
        name="notifications-outline"
        size={22}
        // color={theme.dark ? "white" : "red"}
      />
    </View>
  </View>
);

export default HomeHeader;
