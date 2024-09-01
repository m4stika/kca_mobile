
import { useGlobalContext } from "@/context/global-provider";
import { PaymentMethod } from "@/schema/order.schema";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import { RadioButton } from "./atoms";

export type TSortBy = "PRODUCT-ASC" | "PRODUCT-DESC" | "PRICE-ASC" | "PRICE-DESC"
type SortByProps = {
  state: TSortBy
  setState: (value: TSortBy) => void
}
type DataProps = {
  key: TSortBy
  value: string
  caption: string
}
const SortBy = ({ state, setState }: SortByProps) => {
  const { dismiss } = useBottomSheetModal();
  const radioData: DataProps[] = [
    {
      key: "PRODUCT-ASC",
      value: "Nama Produk (A-Z)",
      caption: "Urutkan berdasarkan nama product A-Z",
    },
    {
      key: "PRODUCT-DESC",
      value: "Nama Produk (Z-A)",
      caption: "Urutkan berdasarkan nama produk Z-A",
    },
    {
      key: "PRICE-ASC",
      value: "Harga Termurah",
      caption: "Urutkan berdasarkan harga termurah",
    },
    {
      key: "PRICE-DESC",
      value: "Harga Termahal",
      caption: "Urutkan berdasarkan harga termahal",
    },
  ];
  return (
    <View className="h-full flex flex-col py-3 gap-2 px-3">
      <RadioButton
        defaultSelection={state}
        options={radioData}
        onSelection={(index, value) => {
          // setState((oldValue) => ({ ...oldValue, paymentMethod: value.key as PaymentMethod }));
          setState(value.key as TSortBy)
          dismiss();
        }}
      />
    </View>
  );
};

export default SortBy;
