import { useGlobalContext } from "@/context/global-provider";
import { logout } from "@/utils/logout";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ProfileHeader = () => {
  const { reset, user, member, theme } = useGlobalContext();
  const handleLogout = async () => {
    if (await logout()) {
      reset();
      router.navigate("/welcome");
    }
  }

  return (
    <View className="flex p-4">
      <View className=" flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <View className="size-16 rounded-full bg-stone-400 items-center justify-center p-2">
            <TabBarIcon name="person" color={theme.colors.foreground} />
          </View>
          <View className="flex flex-col gap-1">
            <View className="flex flex-row gap-1">
              <ThemedText className="text-sm font-psemibold">{member?.namaAnggota}</ThemedText>
              <TouchableOpacity
                className="text-error"
                onPress={() => router.navigate("/profile-detail")}
                activeOpacity={0.7}
              >
                <TabBarIcon
                  name="pencil-outline"
                  size={14}
                  style={{ fontWeight: "semibold" }}
                  color={theme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-1">
              <ThemedText className="text-xs">{member?.noAnggota}</ThemedText>
              <View className="rounded-lg w-16 bg-stone-400 items-center tracking-tighter">
                <ThemedText className="text-xs">member</ThemedText>
              </View>
            </View>
            {user?.email &&
              <View className="flex flex-row gap-1">
                <ThemedText className="text-xs">{user?.email}</ThemedText>
                <TabBarIcon
                  name="checkmark-circle-outline"
                  size={16}
                  color={theme.colors.primary}
                  style={{ fontWeight: "semibold" }}
                />
              </View>
            }
          </View>
        </View>
        <View>
          <TouchableOpacity className="text-error" onPress={handleLogout} activeOpacity={0.7}>
            <TabBarIcon name="log-out-outline" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
