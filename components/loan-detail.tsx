import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Pinjaman } from "@/schema/pinjaman.schema";
import { formatDate } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import { Text, View } from "react-native";
import LabelWithValue from "./label-with-value";

const LoanDetail = () => {
  const { member } = useGlobalContext();
  const { data, refetch, isLoading } = useDataApi<Pinjaman[]>({
    queryKey: ["loans"],
    url: `pinjaman/byAnggota/${member?.noAnggota}`,
  });
  if (!data) return null;

  const sections = data.map((item) => ({
    ...item,
    data: item.RincianPinjaman.map((rincian) => ({ ...rincian })),
  }));

  const Header = ({ pinjaman }: { pinjaman: Pinjaman }) => {
    return (
      <View
        className={clsx(
          "flex flex-col gap-1 p-2 ",
          pinjaman.isPinjamanUang ? "bg-sky-100" : "bg-rose-100"
        )}
      >
        <View className="flex justify-center items-center gap-0">
          <View className="bg-error rounded-full px-3 flex flex-row text-background pb-1 gap-1">
            <Text className="text-background">Rp</Text>
            <Text className="text-xl text-background">
              {formatCurrency(pinjaman.nilaiPinjaman)}
            </Text>
          </View>
          <Text className="italic font-pmedium">
            {pinjaman.isPinjamanUang ? "Pinjaman Uang" : "Pinjaman Barang"}
          </Text>
        </View>
        <LabelWithValue title="Tanggal Pinjam" value={formatDate(pinjaman.tglPinjam, false)} />
        <LabelWithValue title="Jn. Bunga" value={pinjaman.jenisBunga} />
      </View>
    );
  };

  return (
    <BottomSheetSectionList
      className={"px-2"}
      sections={sections}
      keyExtractor={(item, index) => item.refCode + index}
      renderItem={({ item }) => (
        <View className="w-full px-4">
          <LabelWithValue
            title={formatDate(item.tglLunas, false)}
            value={formatCurrency(item.rpBayar)}
            titleClassName="italic"
            valueClassName="italic"
          />
          <Text className="italic text-xs text-disabled-foreground pl-5">{item.keterangan}</Text>
        </View>
      )}
      // contentOffset={{ x: 10, y: 0 }}
      renderSectionHeader={({ section }) => <Header pinjaman={section} />}
      renderSectionFooter={() => <View className="pb-4" />}
      // ItemSeparatorComponent={() => <View className="border-b" />}
      ListHeaderComponent={() => (
        <View className="flex justify-center p-1">
          <Text className="font-pbold text-lg">Detail Pinjaman</Text>
        </View>
      )}
      ListFooterComponent={() => <View className="border-b border-border" />}
      // SectionSeparatorComponent={() => <View className="border-b" />}
    />

    /*
    <View className="h-full flex flex-col py3 gap-2">
      <View className="basis-12 shadow-md justify-center px-4">
        <ThemedText className="font-psemibold">Detail Pinjaman</ThemedText>
      </View>

      <View className="bg-paper basis-auto flex-1 p-4 gap-4">
        <View className="px-5 gap-4 py-4 bg-background justify-center rounded-lg">
          <LabelWithValue title="Pokok" value={formatCurrency(data.totalPokok ?? 0)} />
          <LabelWithValue title="Wajib" value={formatCurrency(data.totalWajib ?? 0)} />
          <LabelWithValue title="Sukarela" value={formatCurrency(data.sisaSukarela ?? 0)} />
          <View className="border-t border-border" />
          <LabelWithValue
            title="T O T A L"
            value={formatCurrency(data.totalSaldo ?? 0)}
            valueClassName="font-psemibold text-lg text-primary"
          />
        </View>
      </View>
    </View>
		 */
  );
};

export default LoanDetail;
