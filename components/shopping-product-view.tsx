import { useGlobalContext } from "@/context/global-provider";
import { addToOrder } from "@/utils/add-order";
import { formatCurrency } from "@/utils/format-currency";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import ButtonIncDec from "./button-inc-dec";
import { TabBarIcon } from "./navigation/TabBarIcon";
import NumberWithCurrency from "./number-with-currency";
import { cn } from "@/utils/cn";

const ShoppingProductView = () => {
  const { productSelected, setOrder, order, theme } = useGlobalContext();
  const [qty, setQty] = useState<number>(1);
  const { dismiss } = useBottomSheetModal();

  if (!productSelected) return;
  return (
    <View className="flex-1 gap-3">
      <View className="rounded-2xl w-full h-80 items-center bg-disabled overflow-hidden border">
        <Image
          source={{ uri: `${process.env.EXPO_PUBLIC_ASSETS_URL}/assets/products/${productSelected.fileName}` }}
          // source={productSelected?.imageSource}
          // className="w-[96%] h-2/5 ml-2"
          className="w-80 h-80"
          // style={{ backgroundColor: "transparent" }}
          resizeMode="contain"
        />
      </View>
      <View className="flex-1 gap-3 px-3">
        <View className="flex flex-row justify-between border-b pb-2">
          <NumberWithCurrency
            value={formatCurrency(productSelected.hargaJual)}
            valueClassName="text-3xl font-psemibold text-error"
            currencyClassName="text-error"
          />
          <View className="flex flex-row gap-2 pr-3 items-center">
            <ThemedText>Stock</ThemedText>
            <ThemedText className={cn("", productSelected.stok === 0 && "text-error")}>
              {productSelected.stok.toString()}
            </ThemedText>
          </View>
        </View>
        <ThemedText>{productSelected.namaBarang}</ThemedText>
      </View>

      <View
        className={cn(
          "flex flex-row items-center justify-between px-4 py-2 border-t",
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
            <TabBarIcon name="add" color={theme.colors.card} size={18} className="-mr-1" />
            <TabBarIcon name="cart-outline" color={theme.colors.card} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingProductView;
