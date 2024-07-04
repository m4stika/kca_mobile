import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Pinjaman, RincianPinjaman } from "@/schema/pinjaman.schema";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Card, CardContent, CardDescription, CardHeader } from "./card";
import LabelWithValue from "./label-with-value";
import NumberWithCurrency from "./number-with-currency";

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

  const Headers = ({ pinjaman }: { pinjaman: Pinjaman }) => {
    return (
      <Card className="p-2 rounded-none border-0">
        <CardHeader className="items-center space-y-0 p-1 bg-error rounded-full w-[70%] self-center">
          <NumberWithCurrency
            value={formatCurrency(pinjaman.nilaiPinjaman)}
            valueClassName="text-2xl text-background"
            currencyClassName="text-background"
          />
        </CardHeader>
        <CardDescription className="mt-0 text-foreground text-center border-b pb-2">
          {pinjaman.isPinjamanUang ? "Pinjaman Uang" : "Pinjaman Barang"}
        </CardDescription>
        <CardContent className="py-1">
          <LabelWithValue title="Tanggal Pinjam" value={formatDate(pinjaman.tglPinjam, false)} />
          <LabelWithValue title="Jn. Bunga" value={pinjaman.jenisBunga} />
        </CardContent>
      </Card>
    );
  };
  const Header = ({ pinjaman }: { pinjaman: Pinjaman }) => {
    return (
      <View
        className={cn(
          "flex flex-col gap-1 p-2",
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

  const Content = ({ itemDetail }: { itemDetail: RincianPinjaman }) => (
    <Card className="px-2 border-0 rounded-none pb-2">
      <CardContent className="py-0">
        <LabelWithValue
          title={formatDate(itemDetail.tglLunas, false)}
          value={formatCurrency(itemDetail.rpBayar)}
          titleClassName="italic"
          valueClassName="italic"
        />
        <ThemedText className="italic text-xs text-disabled-foreground dark:text-foreground pl-5">
          {itemDetail.keterangan}
        </ThemedText>
      </CardContent>
    </Card>
  );

  return (
    <View className="min-h-[95%] gap-4">
      <ThemedText className="font-pbold text-lg px-2">Detail Pinjaman</ThemedText>
      <BottomSheetSectionList
        className={"px-2 bg-background pt-3"}
        sections={sections}
        keyExtractor={(item, index) => item.refCode + index}
        renderItem={({ item }) => (
          <Content itemDetail={item} />
          // <View className="w-full px-4">
          //   <LabelWithValue
          //     title={formatDate(item.tglLunas, false)}
          //     value={formatCurrency(item.rpBayar)}
          //     titleClassName="italic"
          //     valueClassName="italic"
          //   />
          //   <ThemedText className="italic text-xs text-disabled-foreground dark:text-foreground pl-5">
          //     {item.keterangan}
          //   </ThemedText>
          // </View>
        )}
        // contentOffset={{ x: 10, y: 0 }}
        renderSectionHeader={({ section }) => <Headers pinjaman={section} />}
        renderSectionFooter={() => <View className="pb-4" />}
        // ItemSeparatorComponent={() => <View className="border-b" />}
        // ListHeaderComponent={() => (
        //   <View className="flex justify-center p-1">
        //     <ThemedText className="font-pbold text-lg text-foreground">Detail Pinjaman</ThemedText>
        //   </View>
        // )}
        // ListFooterComponent={() => <View className="border-b border-border" />}
        // SectionSeparatorComponent={() => <View className="pb-2" />}
      />
    </View>
  );
};

export default LoanDetail;
