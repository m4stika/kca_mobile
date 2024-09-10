
import { useGlobalContext } from "@/context/global-provider";
import { Order, OrderStatus, orderStatus } from "@/schema/order.schema";
import { _formatDatetime } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Button } from "./atoms";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import NumberWithCurrency from "./number-with-currency";
import { api } from "@/utils/fetching";
import { cn } from "@/utils/cn";
import { Pinjaman } from "@/schema/pinjaman.schema";
import LabelWithValue from "./label-with-value";

const TransactionLoanCard = ({ pinjaman, reFetch }: { pinjaman: Pinjaman, reFetch: () => void }) => {
  const { setLoanSelected } = useGlobalContext();
  const detailCount = pinjaman.RincianPinjaman.length;

  const onCancelOrder = async () => {
    const response = await api.patch<unknown, Order>({
      url: `pinjaman/cancel`,
      data: { refCode: pinjaman.refCode }
    });
    if (response.status === "error") alert(response.message);
    else {
      if (response.data) {
        reFetch()
      }
    }
  };
  // const imageSource = getRandomImageSource();
  return (
    <Card className="px-4 pt-4 min-w-80 min-h-64">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-center border-b pb-4">
        <View className="flex gap-0">
          <ThemedText className="font-pmedium">{`Pinjaman`}</ThemedText>
          <ThemedText className="text-sm -my-2">
            {_formatDatetime(new Date(pinjaman.tglPinjam), "dd-mm-yyyy")}
          </ThemedText>
        </View>
        <View className={cn("rounded-full px-3 py-1", pinjaman.verificationStatus === "ON_VERIFICATION" ? "bg-warning" : pinjaman.verificationStatus === "CANCELED" ? "bg-error" : "bg-info")}>
          <ThemedText className={cn("text-xs text-background", pinjaman.verificationStatus === "ON_VERIFICATION" ? "bg-warning" : pinjaman.verificationStatus === "CANCELED" ? "bg-error" : "bg-info text-foreground")}>
            {orderStatus[pinjaman.verificationStatus]}
          </ThemedText>
        </View>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 p-2 border-b">
        <LabelWithValue
          title="Pinjaman"
          value={formatCurrency(Number(pinjaman.nilaiPinjaman) || 0)}
        />
        <LabelWithValue
          title="Angsuran"
          value={formatCurrency(Number(pinjaman.RincianPinjaman[0].rpPinjaman) || 0)}
        />
        <LabelWithValue
          title={`Bunga (${pinjaman.persenBunga} %) ${pinjaman.jenisBunga}`}
          value={formatCurrency(Number(pinjaman.RincianPinjaman[0].rpBunga) || 0)}
          valueClassName="basis-1/2"
          titleClassName="basis-1/2"
        />
      </CardContent>

      {/* Footer */}
      <CardFooter className="gap-3">
        <View className="flex-row justify-between w-full border-b pb-2">
          <View className="">
            <ThemedText className="text-sm">Total Angsuran</ThemedText>
            <NumberWithCurrency value={formatCurrency(Number(pinjaman.RincianPinjaman[0].rpPinjaman) + Number(pinjaman.RincianPinjaman[0].rpBunga))} />
          </View>
          <Button
            title="Tampilkan Rincian"
            containerClassName="py-2 bg-backround border"
            textClassName="text-xs font-light text-primary "
            onPress={() => {
              setLoanSelected(pinjaman)
              router.push("/transaction-loan-info");
            }}
          />
        </View>
        {(["ON_VERIFICATION"] as OrderStatus[]).includes(pinjaman.verificationStatus) && (
          <Button
            title="Batalkan Pinjaman"
            containerClassName="py-2 border self-start bg-backround"
            textClassName="text-xs font-light text-error"
            onPress={onCancelOrder}
          />
        )}

      </CardFooter>
    </Card>
  );
};

export default TransactionLoanCard;
