import { useGlobalContext } from "@/context/global-provider";
import { Text, TouchableOpacity, View } from "react-native";
import LabelWithValue from "./label-with-value";

const ProfileSummaryInfo = ({ onPress }: { onPress: () => void }) => {
  const { user, member } = useGlobalContext();
  if (!user || !member) return null;
  let prefix: string | undefined = undefined;
  if (member.namaAnggota) {
    prefix = member.namaAnggota
      .split(" ")
      .filter((str) => str.length > 2)
      .reduce((accumulator, str) => accumulator + str[0], "");
  }
  return (
    <View className="flex flex-col">
      <View className="bg-green-500 flex flex-col items-center justify-center py-8">
        <Text className="text-big text-gray-100" adjustsFontSizeToFit={true} numberOfLines={1}>
          {prefix?.substring(0, 2) || user?.username.substring(0, 2)}
        </Text>
      </View>
      <View className="flex flex-col gap-3 px-4 -mt-4">
        <View className="flex flex-col gap-3 py-5 px-3 items-center justify-center rounded-lg shadow-xl border border-border bg-background">
          <View className="w-full">
            <Text className="font-pmedium border-b border-border text-center px-3">
              {member.namaAnggota.toUpperCase()}
            </Text>
          </View>
          <LabelWithValue title="No. Anggota" value={member.noAnggota || user.username} />
          <LabelWithValue title="Anggota" value="Aktif" />
          <View className="border-t border-border w-full items-center align-bottom pt-2">
            <TouchableOpacity onPress={onPress}>
              <Text className="text-primary font-psemibold text-sm mt-2">Lihat detail profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileSummaryInfo;
