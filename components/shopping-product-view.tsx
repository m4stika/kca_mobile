import { useGlobalContext } from "@/context/global-provider";
import { addToOrder } from "@/utils/add-order";
import { formatCurrency } from "@/utils/format-currency";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ButtonIncDec from "./button-inc-dec";
import { TabBarIcon } from "./navigation/TabBarIcon";
import NumberWithCurrency from "./number-with-currency";

const ShoppingProductView = () => {
  const { productSelected, setOrder, order } = useGlobalContext();
  const [qty, setQty] = useState<number>(1);
  const { dismiss } = useBottomSheetModal();

  if (!productSelected) return;
  return (
    <View className="flex-1 gap-3">
      <Image source={productSelected?.imageSource} className="w-full h-2/5" resizeMode="cover" />
      <View className="flex-1 gap-3 px-3">
        <View className="flex flex-row justify-between border-b border-border">
          <NumberWithCurrency
            value={formatCurrency(productSelected.hargaJual)}
            valueClassName="text-3xl font-psemibold text-error"
            currencyClassName="text-error"
          />
          <View className="flex flex-row gap-2 pr-3">
            <Text>Stock</Text>
            <Text className={clsx("font-pmedium", productSelected.stok === 0 && "text-error")}>
              {productSelected.stok.toString()}
            </Text>
          </View>
        </View>
        <Text>{productSelected.namaBarang}</Text>
      </View>

      <View
        className={clsx(
          "flex flex-row items-center justify-between px-4 py-2 border-t border-border",
          productSelected.stok === 0 && "pointer-events-none"
        )}
      >
        <ButtonIncDec
          title="Jumlah"
          onChange={(value) => setQty(value)}
          maxValue={productSelected.stok}
        />
        <TouchableOpacity
          onPress={() => {
            addToOrder(setOrder, order, productSelected, qty);
            dismiss();
          }}
          disabled={productSelected.stok === 0}
        >
          <View className="flex flex-row rounded-full w-16 justify-end py-1 px-2 bg-success gap-0">
            <TabBarIcon name="add" color={"white"} size={18} className="-mr-1" />
            <TabBarIcon name="cart-outline" color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingProductView;
