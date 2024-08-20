import { useGlobalContext } from "@/context/global-provider";
import { User } from "@/schema/user.schema";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { logo } from "@/assets/images";
import Constants from "expo-constants";

const HomeHeader = ({ user }: { user: User }) => {
  const { theme } = useGlobalContext();
  // const theme = useColorScheme() ?? "light";
  return (
    <View className="w-full h-1/3 flex-row justify-between  px-2 border-b bg-primary">
      <View className="w-full flex flex-row items-center justify-between h-32 ">
        <View className="flex flex-row gap-2 ">
          <View className="size-16 rounded-full bg-stone-100 items-center justify-center p-2">
            <Image source={logo} className="w-16 h-16 " resizeMode="cover" />
            {/* <TabBarIcon name="person" color={"#f1f5f9"} /> */}
          </View>
          <View className="items-start flex">
            <ThemedText type="title" className="p-0 font-psemibold text-background">{Constants.expoConfig?.description}</ThemedText>
            <ThemedText className="text-sm text-background">{user?.name}</ThemedText>
          </View>
          {/* <View className="rounded-full bg-success px-2 h-6 flex flex-row items-center justify-between gap-1"> */}
          {/*   <TabBarIcon name="checkmark" size={12} color={theme.colors.background} /> */}
          {/*   <ThemedText className="text-xs text-background">Member</ThemedText> */}
          {/* </View> */}
        </View>
        <View className="">
          <TabBarIcon name="notifications-outline" size={22} color={theme.colors.background} />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
