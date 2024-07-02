import { useGlobalContext } from "@/context/global-provider";
import { formatCurrency } from "@/utils/format-currency";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
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
          <HomeCard
            color="success"
            containerClassName="bg-primary/80"
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
              color="error"
              title=""
              containerClassName="h-40"
              caption={
                <View className="flex gap-2 pb-3 w-full">
                  <View className="flex flex-row items-center justify-between">
                    <ThemedText className="text-disabled text-lg">Pinjaman</ThemedText>
                    <View className="flex flex-row gap-1">
                      <ThemedText className="text-background">Rp</ThemedText>
                      <ThemedText className="text-background text-2xl font-psemibold">
                        {formatCurrency(Number(member.saldoPinjaman) || 0)}
                      </ThemedText>
                    </View>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <ThemedText className="text-disabled text-lg">Angsuran</ThemedText>
                    <View className="flex flex-row gap-1">
                      <ThemedText className="text-background">Rp</ThemedText>
                      <ThemedText className="text-2xl font-psemibold text-background">
                        {formatCurrency(Number(member.nilaiAngsuran) || 0)}
                      </ThemedText>
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
