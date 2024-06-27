import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Simpanan } from "@/schema/simpanan.schema";
import { formatCurrency } from "@/utils/format-currency";
import { Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import LabelWithValue from "./label-with-value";

const SavingAccountDetail = () => {
  const { member } = useGlobalContext();
  const { data, refetch, isLoading } = useDataApi<Simpanan>({
    queryKey: ["saving_accounts"],
    url: `simpanan/${member?.noAnggota}`,
  });
  if (!data) return null;

  return (
    <View className="h-full flex flex-col py3 gap-2">
      <View className="basis-12 shadow-md justify-center px-4">
        <ThemedText className="font-psemibold">Detail Simpanan</ThemedText>
      </View>

      <View className="bg-paper basis-auto flex-1 p-4 gap-4">
        {/* Nama */}
        {/* <View className="py-5 bg-background items-center justify-center rounded-lg">
          <ThemedText className="font-pmedium text-primary">{"SIMPANAN"}</ThemedText>
        </View> */}

        {/* Informasi simpanan */}
        <View className="px-5 gap-4 py-4 bg-background justify-center rounded-lg">
          {/*  <ThemedText className="text-sm font-psemibold border-b border-border py-4">
            {"Informasi Simpanan"}
          </ThemedText> */}
          <View className="bg-primary/70 rounded-full flex flex-row text-background py-3 gap-1 justify-center">
            <Text className="text-background">Rp</Text>
            <Text className="text-2xl text-background font-pbold">
              {formatCurrency(data.totalSaldo)}
            </Text>
          </View>
          <LabelWithValue title="Pokok" value={formatCurrency(data.totalPokok ?? 0)} />
          <LabelWithValue title="Wajib" value={formatCurrency(data.totalWajib ?? 0)} />
          <LabelWithValue title="Sukarela" value={formatCurrency(data.sisaSukarela ?? 0)} />
          <View className="border-t border-border" />
          {/* <LabelWithValue
            title="T O T A L"
            value={formatCurrency(data.totalSaldo ?? 0)}
            valueClassName="font-psemibold text-lg text-primary"
          /> */}
        </View>
      </View>
    </View>
  );
};

export default SavingAccountDetail;
