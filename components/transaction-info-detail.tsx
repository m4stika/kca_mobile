import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { useGlobalContext } from "@/context/global-provider";
import { orderStatus, paymentMethod, shippingMethod } from "@/schema/order.schema";
import { formatDate } from "@/utils/date-formater";
import { formatCurrency } from "@/utils/format-currency";
import { getRandomImageSource } from "@/utils/get-random-image-source";
import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import LabelWithValue from "./label-with-value";
import NumberWithCurrency from "./number-with-currency";

const TransactionInfoDetail = () => {
  const { orderSelected } = useGlobalContext();
  if (!orderSelected) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="self-end space-y-0 py-1 px-4 text-sm font-pregular rounded-full bg-green-200 text-slate-800">
          {orderStatus[orderSelected.orderStatus]}
        </CardTitle>
        <CardContent className="py-2 border-b">
          <LabelWithValue
            title="No. Invoice"
            value={orderSelected.invoiceNo!}
            valueClassName="text-primary underline"
          />
          <LabelWithValue title="Tgl Pembelian" value={formatDate(orderSelected.transactionDate)} />
        </CardContent>
      </CardHeader>
      <CardContent className="py-1 px-2 gap-2 mb-2">
        <CardTitle className="pb-2 border-b">Detail Produk</CardTitle>
        {orderSelected.OrderDetail.map((item) => (
          <View className="flex flex-row gap-2" key={item.kodeBarang}>
            <Image
              source={{ uri: `${process.env.EXPO_PUBLIC_ASSETS_URL}/assets/products/${item.Barang.fileName}` }}
              // source={getRandomImageSource()} 
              className="h-14 w-14" resizeMode="cover"
            />
            <View className="flex">
              <ThemedText className="text-sm font-pmedium">{item.Barang.namaBarang}</ThemedText>
              <ThemedText className="text-xs">{`${item.qty} X Rp ${formatCurrency(
                item.price
              )}`}</ThemedText>
            </View>
          </View>
        ))}
      </CardContent>
      <CardFooter className="border-t ">
        {/* <View className="flex gap-0 py-2 justify-end"> */}
        <ThemedText className="text-sm">Total Belanja</ThemedText>
        <NumberWithCurrency value={formatCurrency(orderSelected.amount)} valueClassName="text-lg" />
        {/* </View> */}
        <CardTitle className="py-2 border-b w-full self-start">Informasi Lainnya</CardTitle>
        <CardContent className="py-2 gap-1">
          <LabelWithValue title="Pembayaran" value={paymentMethod[orderSelected.paymentMethod!]} />
          <LabelWithValue
            title="Pengiriman"
            value={shippingMethod[orderSelected.shippingMethod!]}
          />
          <CardTitle className="w-full self-start mt-4 text-sm">Catatan ke penjual</CardTitle>
          <CardDescription> {orderSelected.notes} </CardDescription>
        </CardContent>
      </CardFooter>
    </Card>
  );
};

export default TransactionInfoDetail;
