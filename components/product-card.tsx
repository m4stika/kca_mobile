import { useGlobalContext } from "@/context/global-provider";
import { Product } from "@/schema/product.schema";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import ButtonAdd from "./button-add";
import { cn } from "@/utils/cn";
import { ThemeProps } from "@/constants/Colors";

type DataProps = {
  product: Product
  onPress: (product: Product) => void
  theme: ThemeProps
}
const ProductCard = ({ product, onPress, theme }: DataProps) => {
  // const { setProductSelected, theme } = useGlobalContext();
  return (
    <View className="flex flex-col gap-3 w-[49%] rounded-lg  items-center justify-between ">
      <View className="w-full flex">
        <TouchableOpacity
          onPress={() => {
            // setProductSelected(product);
            onPress(product);
          }}
        >
          <View className={cn("rounded-xl p-2", theme.dark ? "bg-disabled" : "bg-background", "overflow-hidden border")}>
            <Image
              // source={{ uri: "https://picsum.photos/200/300?random=5" }}
              source={{ uri: `${process.env.EXPO_PUBLIC_ASSETS_URL}/assets/products/${product.fileName}` }}
              // source={product.imageSource}
              className="h-44 w-44 rounded-lg"
              resizeMode="contain"
              width={176}
              height={176}
            />
          </View>
        </TouchableOpacity>
        <View className="relative">
          <TouchableOpacity
            onPress={() => {
              // setProductSelected(product);
              onPress(product);
            }}
          >
            <View className="flex flex-col p-2 justify-between">
              <View className="flex flex-row gap-1">
                <ThemedText className="text-xs font-plight">Rp</ThemedText>
                <View
                  className={cn(
                    "rounded-full min-w-[50%] px-3 pb-1 flex justify-center",
                    product.stok === 0 ? "bg-disabled" : "bg-error"
                  )}
                >
                  <ThemedText
                    className={
                      product.stok === 0
                        ? "text-disabled-foreground"
                        : "text-background font-medium"
                    }
                  >
                    {formatCurrency(Number(product.hargaJual))}
                  </ThemedText>
                </View>
              </View>
              <ThemedText className="text-xs tracking-wider line-clamp-2" numberOfLines={2}>
                {product.namaBarang}
              </ThemedText>
            </View>
          </TouchableOpacity>
          <ButtonAdd product={product} />
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
