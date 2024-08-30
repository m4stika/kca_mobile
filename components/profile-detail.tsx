import { useGlobalContext } from "@/context/global-provider";
import { version as app_version } from "@/package.json";
import { logout } from "@/utils/logout";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import LabelWithValue from "./label-with-value";
import { TabBarIcon } from "./navigation/TabBarIcon";
import Constants from "expo-constants";

const ProfileDetail = () => {
  const { user, member, reset } = useGlobalContext();
  const { dismiss } = useBottomSheetModal();
  if (!member || !user) return null;

  const handleLogout = async () => {
    if (await logout()) {
      reset();
      dismiss();
      router.navigate("/welcome");
    }
  };

  return (
    <View
      className="h-full flex flex-col gap-2 pb-4 bg-background"
    // style={vars({ "--container-disabled": "red" })}
    >
      <View className="shadow-md justify-center px-4 bg-paper pb-3">
        <ThemedText type="subtitle">Detail Profil</ThemedText>
      </View>
      <ScrollView>
        <View className="flex-1 py-4 px-2 gap-4">
          {/* Nama */}
          <Card className="items-center py-6">
            <CardTitle className="">{member?.namaAnggota.toUpperCase()}</CardTitle>
          </Card>

          {/* Informasi akun */}
          <Card>
            <CardHeader className="border-b py-4">
              <CardTitle className="text-base">Informasi Anggota</CardTitle>
            </CardHeader>
            <CardContent className="gap-4 px-4">
              <LabelWithValue title="No. Anggota" value={member?.noAnggota!} />
              <LabelWithValue title="Status Anggota" value="Aktif" />
            </CardContent>
          </Card>

          {/* Informasi Data diri */}
          <Card>
            <CardHeader className="border-b py-4">
              <CardTitle className="text-base">Informasi Data Diri</CardTitle>
            </CardHeader>
            <CardContent className="gap-4 px-4">
              <LabelWithValue title="Email" value={user?.email!} />
              <LabelWithValue title="No. handphone" value={member?.telp!} />
              <LabelWithValue title="No. NIP" value={member?.nip!} />
              <LabelWithValue title="Alamat" value={member?.alamat!} />
            </CardContent>
          </Card>

          {/* Informasi Device */}
          <Card>
            <CardHeader className="border-b py-4">
              <CardTitle className="text-base">Informasi Perangkat</CardTitle>
            </CardHeader>
            <CardContent className="gap-4 px-4">
              <LabelWithValue title="Perangkat Utama" value={Constants.deviceName ?? "unknown"} />
              <LabelWithValue title="Versi Aplikasi" value={Constants.expoConfig?.version ?? app_version} />
            </CardContent>
            <CardFooter className="items-center border-t">
              <TouchableOpacity
                className="flex flex-row items-center justify-center gap-2 text-error"
                activeOpacity={0.7}
                onPress={handleLogout}
              >
                <TabBarIcon name="log-out-outline" />
                <ThemedText>Log-out</ThemedText>
              </TouchableOpacity>
            </CardFooter>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileDetail;
