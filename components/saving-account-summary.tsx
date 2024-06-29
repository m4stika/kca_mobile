import { useGlobalContext } from "@/context/global-provider";
import { formatCurrency } from "@/utils/format-currency";
import { Text, View } from "react-native";
import HomeCard from "./home-card";

const SavingAccountSummary = ({
  onPress,
  setState,
}: {
  setState: (value: "profile" | "simpanan" | "pinjaman") => void;
  onPress: () => void;
}) => {
  const { user, member } = useGlobalContext();
  if (!user || !member) return null;

  return (
    <View className="flex flex-col mt-4">
      <View className="flex flex-col gap-3 px-4">
        <View className="flex flex-col gap-3 py-5 px-3 items-center justify-center rounded-lg shadow-xl border border-border bg-background">
          {/* <View className="w-full">
            <Text className="font-pmedium border-b border-border text-center px-3">
              Informasi Simpan Pinjam
            </Text>
          </View> */}
          {/* <View className="flex flex-row items-center justify-between"> */}
          <HomeCard
            color="primary"
            containerClassName="bg-primary/80"
            // titleClassName="text-slate-100"
            // captionClassName="text-slate-100"
            title="Simpanan"
            captionPrefix="Rp"
            caption={formatCurrency(Number(member.saldoSimpanan) || 0)}
            detailCaption="Detail"
            onPress={() => {
              setState("simpanan");
              onPress();
            }}
          />
          {member.saldoPinjaman > 0 && (
            <HomeCard
              color="secondary"
              title=""
              // captionPrefix="Rp"
              // caption={formatCurrency(Number(member.saldoPinjaman) || 0)}
              containerClassName="h-40"
              caption={
                <View className="flex gap-2  pb-3 w-full">
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-disabled-foreground text-lg">Pinjaman</Text>
                    <View className="flex flex-row gap-1">
                      <Text className="text-background">Rp</Text>
                      <Text className="text-background text-2xl font-psemibold">
                        {formatCurrency(Number(member.saldoPinjaman) || 0)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-disabled-foreground text-lg">Angsuran</Text>
                    <View className="flex flex-row gap-1">
                      <Text className="text-background">Rp</Text>
                      <Text className="text-background text-2xl font-psemibold">
                        <Text>{formatCurrency(Number(member.nilaiAngsuran) || 0)}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              }
              showDetail={Number(member.saldoPinjaman) > 0}
              detailCaption="Detail"
              onPress={() => {
                setState("pinjaman");
                onPress();
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default SavingAccountSummary;
