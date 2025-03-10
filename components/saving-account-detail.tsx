import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Simpanan } from "@/schema/simpanan.schema";
import { formatCurrency } from "@/utils/format-currency";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Card, CardContent, CardHeader } from "./card";
import LabelWithValue from "./label-with-value";
import NumberWithCurrency from "./number-with-currency";

const SavingAccountDetail = () => {
  const { member } = useGlobalContext();
  const { data, refetch, isLoading } = useDataApi<Simpanan>({
    queryKey: ["saving_accounts"],
    url: `simpanan/${member?.noAnggota}`,
  });
  if (!data) return null;

  return (
    <View
      className="flex flex-col gap-2 pb-4 bg-background"
    // style={vars({ "--container-disabled": "red" })}
    >
      <View className="shadow-md justify-center px-4 bg-paper pb-3">
        <ThemedText type="subtitle">Detail Simpanan</ThemedText>
      </View>
      {/* Informasi akun */}
      <Card className="mx-2">
        <CardHeader className="border-b py-4 items-center">
          <NumberWithCurrency value={formatCurrency(data.totalSaldo)} valueClassName="text-3xl" />
        </CardHeader>
        <CardContent className="gap-4 px-4">
          <LabelWithValue title="Pokok" value={formatCurrency(data.totalPokok ?? 0)} />
          <LabelWithValue title="Wajib" value={formatCurrency(data.totalWajib ?? 0)} />
          <LabelWithValue title="Sukarela" value={formatCurrency(data.sisaSukarela ?? 0)} />
          <LabelWithValue title="Total SHU" value={formatCurrency(data.totalShu ?? 0)} />
        </CardContent>
      </Card>
    </View>
  );
};

export default SavingAccountDetail;
