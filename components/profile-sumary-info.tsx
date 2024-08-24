import { useGlobalContext } from "@/context/global-provider";
import clsx from "clsx";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import LabelWithValue from "./label-with-value";

const ProfileSummaryInfo = ({ onPress }: { onPress: () => void }) => {
  const { user, member, theme } = useGlobalContext();
  if (!user || !member) return null;
  let prefix: string | undefined = undefined;
  if (member.namaAnggota) {
    prefix = member.namaAnggota
      .split(" ")
      .filter((str) => str.length > 2)
      .reduce((accumulator, str) => accumulator + str[0], "");
  }

  return (
    <View>
      <View
        className={clsx(
          theme.dark ? "bg-background border-y" : "bg-info",
          "flex flex-col items-center justify-center py-8"
        )}
      >
        <ThemedText
          inverseColor={true}
          className="text-[7rem] text-slate-100"
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {prefix?.substring(0, 2) || user?.username.substring(0, 2)}
        </ThemedText>
      </View>

      <View className="px-4">
        <Card className="px-0 pt-4 -mt-4">
          <CardHeader className="items-center border-b">
            <CardTitle>{member.namaAnggota.toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 gap-2">
            <LabelWithValue title="No. Anggota" value={member.noAnggota || user.username} />
            <LabelWithValue title="Anggota" value="Aktif" />
          </CardContent>
          <CardFooter className="flex-1 border-t">
            <TouchableOpacity onPress={onPress}>
              <CardDescription className="text-primary text-base">
                Lihat detail profile
              </CardDescription>
            </TouchableOpacity>
          </CardFooter>
        </Card>
      </View>
    </View>
  );
};

export default ProfileSummaryInfo;
