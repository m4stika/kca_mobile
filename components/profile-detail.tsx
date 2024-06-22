import { useGlobalContext } from "@/context/global-provider";
import { version as app_version } from "@/package.json";
import * as Device from "expo-device";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import LabelWithValue from "./label-with-value";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ProfileDetail = () => {
  const { user, member } = useGlobalContext();
  if (!member || !user) return null;

  return (
    <View
      className="h-full flex flex-col py3 gap-2"
      // style={vars({ "--container-disabled": "red" })}
    >
      <View className="basis-12 shadow-md justify-center px-4">
        <ThemedText className="font-psemibold">Detail Profil</ThemedText>
      </View>
      {/* <BottomSheetScrollView className="flex-1"> */}

      <View className="bg-paper basis-auto flex-1 p-4 gap-4">
        {/* Nama */}
        <View className="py-5 bg-background items-center justify-center rounded-lg">
          <ThemedText className="font-pmedium">{member?.namaAnggota.toUpperCase()}</ThemedText>
        </View>

        {/* Informasi akun */}
        <View className="px-5 gap-4 pb-4 bg-background justify-center rounded-lg">
          <ThemedText className="text-sm font-psemibold border-b border-border py-4">
            {"Informasi Keanggotaan"}
          </ThemedText>
          <LabelWithValue title="No. Anggota" value={member?.noAnggota!} />
          <LabelWithValue title="Status Anggota" value="Aktif" />
        </View>

        {/* Informasi Data diri */}
        <View className="px-5 py-4 gap-4 bg-background justify-center rounded-lg font-pmedium">
          <ThemedText className="text-sm font-psemibold border-b border-border pb-4">
            {"Informasi Data Diri"}
          </ThemedText>
          <LabelWithValue title="Email" value={user?.email!} />
          <LabelWithValue title="No. handphone" value={member?.telp!} />
          <LabelWithValue title="No. NIP" value={member?.nip!} />
          <LabelWithValue title="Alamat Pengiriman" value={member?.alamat!} />
        </View>

        {/* Informasi Device */}
        <View className="px-5 py-4 gap-4 bg-background justify-center rounded-lg font-pmedium">
          <ThemedText className="text-sm font-psemibold border-b border-border pb-4">
            {"Informasi Perangkat"}
          </ThemedText>
          <LabelWithValue title="Perangkat Utama" value={Device.deviceName ?? "unknown"} />
          <LabelWithValue title="Versi Aplikasi" value={app_version} />
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
};

export default ProfileDetail;
