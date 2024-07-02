import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Pinjaman } from "@/schema/pinjaman.schema";
import { formatDate } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
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
          "flex flex-col gap-1 p-2 dark:bg-background",
          pinjaman.isPinjamanUang ? "bg-sky-100" : "bg-rose-100"
        )}
      >
        <View className="flex justify-center items-center gap-0">
          <View className="bg-error rounded-full px-3 flex flex-row text-background pb-1 gap-1">
            <ThemedText className="text-background">Rp</ThemedText>
            <ThemedText className="text-xl text-background">
              {formatCurrency(pinjaman.nilaiPinjaman)}
            </ThemedText>
          </View>
          <ThemedText className="italic font-pmedium text-foreground">
            {pinjaman.isPinjamanUang ? "Pinjaman Uang" : "Pinjaman Barang"}
          </ThemedText>
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
          <ThemedText className="italic text-xs text-disabled-foreground dark:text-foreground pl-5">
            {item.keterangan}
          </ThemedText>
        </View>
      )}
      // contentOffset={{ x: 10, y: 0 }}
      renderSectionHeader={({ section }) => <Header pinjaman={section} />}
      renderSectionFooter={() => <View className="pb-4" />}
      // ItemSeparatorComponent={() => <View className="border-b" />}
      ListHeaderComponent={() => (
        <View className="flex justify-center p-1">
          <ThemedText className="font-pbold text-lg text-foreground">Detail Pinjaman</ThemedText>
        </View>
      )}
      ListFooterComponent={() => <View className="border-b border-border" />}
      // SectionSeparatorComponent={() => <View className="border-b" />}
    />
  );
};

export default LoanDetail;
