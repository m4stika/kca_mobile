import { useGlobalContext } from "@/context/global-provider";
import { useThemeContextValues } from "@/themes";
import { api } from "@/utils/fetching";
import { router } from "expo-router";
import { Alert, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ProfileHeader = () => {
  const { user, member, setLoggedIn, setUserActive } = useGlobalContext();
  const handleLogout = async () => {
    const response = await api.post({ url: "logout", data: {} });
    if (response.status === "error") Alert.alert("Error", response.message);
    else {
      setLoggedIn(false);
      setUserActive(null);
      router.replace("/welcome");
    }
  };

  const colorScheme = useThemeContextValues();
  return (
    <View className="flex gap-4 px-4">
      <View className=" flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <View className="size-16 rounded-full bg-stone-400 items-center justify-center p-2">
            <TabBarIcon name="person" color={"#f1f5f9"} />
          </View>
          <View className="flex flex-col gap-1">
            <View className="flex flex-row gap-1">
              <ThemedText className="text-sm font-psemibold">{member?.namaAnggota}</ThemedText>
              <TouchableOpacity
                className="text-error"
                onPress={() => router.navigate("/profile-detail")}
                activeOpacity={0.7}
              >
                <TabBarIcon name="pencil-outline" size={14} style={{ fontWeight: "semibold" }} />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-1">
              <ThemedText className="text-xs">{member?.noAnggota}</ThemedText>
              <View className="rounded-lg w-16 bg-stone-400 items-center tracking-tighter">
                <ThemedText className="text-xs">member</ThemedText>
              </View>
            </View>
            <View className="flex flex-row gap-1">
              <ThemedText className="text-xs">{user?.email}</ThemedText>
              <TabBarIcon
                name="checkmark-circle-outline"
                size={14}
                style={{ fontWeight: "semibold", color: "green" }}
              />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity className="text-error" onPress={handleLogout} activeOpacity={0.7}>
            <TabBarIcon
              name="log-out-outline"
              // className="text-[--paper-foreground]"
              color={colorScheme.theme === "dark" ? "#f3f4f6" : "#09090b"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full border-b border-border" />
    </View>
  );
};

export default ProfileHeader;
