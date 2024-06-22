import { ThemedText } from "@/components/ThemedText";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useGlobalContext } from "@/context/global-provider";
import { version as app_version } from "@/package.json";
import { useThemeContextValues } from "@/themes";
import { api } from "@/utils/fetching";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Device from "expo-device";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MemberProfile = () => {
  const { user, setLoggedIn, setUserActive } = useGlobalContext();
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
    <View className="flex gap-4">
      <View className=" flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <View className="size-16 rounded-full bg-stone-400 items-center justify-center p-2">
            <TabBarIcon name="person" color={"#f1f5f9"} />
          </View>
          <View className="flex flex-col gap-1">
            <View className="flex flex-row gap-1">
              <ThemedText className="text-sm font-psemibold">Mastika</ThemedText>
              <TouchableOpacity
                className="text-error"
                onPress={() => router.navigate("/profile-detail")}
                activeOpacity={0.7}
              >
                <TabBarIcon name="pencil-outline" size={14} style={{ fontWeight: "semibold" }} />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-1">
              <ThemedText className="text-xs">21234564545</ThemedText>
              <View className="rounded-lg w-16 bg-stone-400 items-center tracking-tighter">
                <ThemedText className="text-xs">member</ThemedText>
              </View>
            </View>
            <View className="flex flex-row gap-1">
              <ThemedText className="text-xs">mastika@gmail.com</ThemedText>
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
              color={colorScheme.theme === "dark" ? "#f3f4f6" : "#09090b"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full border-b border-border" />
    </View>
  );
};

const CustomText = ({ title, value }: { title: string; value: string }) => (
  <View className="flex flex-row items-center w-fit justify-between">
    <Text className="text-sm text-[--disabled-foreground] basis-1/3">{title}</Text>
    <Text className="text-sm font-pmedium basis-2/3 line-clamp-2 text-right" numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const ProfileDetail = () => (
  <View
    className="h-full flex flex-col py3 gap-2 bg-background"
    // style={vars({ "--container-disabled": "red" })}
  >
    <View className="basis-12  shadow-md justify-center px-4">
      <ThemedText className="font-psemibold">Detail Profil</ThemedText>
    </View>
    {/* <BottomSheetScrollView className="flex-1"> */}

    <View className="bg-paper basis-auto flex-1 p-4 gap-4">
      {/* Nama */}
      <View className="py-5 bg-background items-center justify-center rounded-lg">
        <ThemedText className="font-pmedium">{"I Ketut Mastika".toUpperCase()}</ThemedText>
      </View>

      {/* Informasi akun */}
      <View className="px-5 gap-4 pb-4 bg-background justify-center rounded-lg">
        <ThemedText className="text-sm font-psemibold border-b border-border py-4">
          {"Informasi Keanggotaan"}
        </ThemedText>
        <CustomText title="No. Anggota" value="34234223" />
        <CustomText title="Status Anggota" value="Aktif" />
      </View>

      {/* Informasi Data diri */}
      <View className="px-5 py-4 gap-4 bg-background justify-center rounded-lg font-pmedium">
        <ThemedText className="text-sm font-psemibold border-b border-border pb-4">
          {"Informasi Data Diri"}
        </ThemedText>
        <CustomText title="Email" value="mastika@gmail.com" />
        <CustomText title="No. handphone" value="087738887001" />
        <CustomText title="No. KTP" value="12334534512213" />
        <CustomText
          title="Alamat Pengiriman"
          value="Jl. Pulau Roon No. 12, denpasar - bali 80112"
        />
      </View>

      {/* Informasi Device */}
      <View className="px-5 py-4 gap-4 bg-background justify-center rounded-lg font-pmedium">
        <ThemedText className="text-sm font-psemibold border-b border-border pb-4">
          {"Informasi Perangkat"}
        </ThemedText>
        <CustomText title="Perangkat Utama" value={Device.deviceName ?? "unknown"} />
        <CustomText title="Versi Aplikasi" value={app_version} />
        <View>
          <TouchableOpacity
            className="flex flex-row items-center justify-center gap-2 text-error"
            activeOpacity={0.7}
          >
            <TabBarIcon
              name="log-out-outline"
              // color={colorScheme.theme === "dark" ? "#f3f4f6" : "#09090b"}
            />
            <ThemedText>Log-out</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    {/* </BottomSheetScrollView> */}
  </View>
);

const ProfileLessInfo = ({ handleOnPress }: { handleOnPress: () => void }) => {
  return (
    <ScrollView>
      <View className="bg-green-500 flex items-center justify-center flex-1 h-80">
        <ThemedText className="text-8xl text-background">IM</ThemedText>
      </View>
      <View className="flex flex-col gap-3 px-4 -mt-3">
        <View className="flex flex-col gap-3 py-5 px-3 items-center justify-center rounded-lg shadow-xl border border-border bg-background">
          <View className="w-full">
            <ThemedText className="font-pmedium border-b border-border text-center px-3">
              {"I Ketut Mastika".toUpperCase()}
            </ThemedText>
          </View>
          <CustomText title="No. Anggota" value="34234223" />
          <CustomText title="Anggota" value="Aktif" />
          <View className="border-t border-border w-full items-center align-bottom pt-2">
            <TouchableOpacity onPress={handleOnPress}>
              <ThemedText className="text-primary font-psemibold">Lihat detail profile</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const Profile = () => {
  // const { dismiss } = useBottomSheetModal();
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex gap-4 px-4 h-full">
        <MemberProfile />

        <ProfileLessInfo handleOnPress={handlePresentModalPress} />

        <CustomBottomSheet
          title="Informasi Profile"
          ref={bottomSheetRef}
          // activeIndex={2}
          snapPointItems={["80%"]}
          content={<ProfileDetail />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
