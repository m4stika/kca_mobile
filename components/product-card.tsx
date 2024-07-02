import { useGlobalContext } from "@/context/global-provider";
import { Product } from "@/schema/product.schema";
import { formatCurrency } from "@/utils/format-currency";
import clsx from "clsx";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import ButtonAdd from "./button-add";

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => {
  const { setProductSelected } = useGlobalContext();
  return (
    <View className="flex flex-col gap-3 w-[49%] rounded-lg  items-center justify-between ">
      <View className="w-full flex">
        <TouchableOpacity
          onPress={() => {
            setProductSelected(product);
            onPress();
          }}
        >
          <View className="rounded-lg p-2">
            <Image
              // source={{ uri: "https://picsum.photos/200/300?random=5" }}
              source={product.imageSource}
              className="h-52 w-full rounded-lg"
              resizeMode="cover"
            />
            {/* <RandomImage /> */}
          </View>
        </TouchableOpacity>
        <View className="relative">
          <TouchableOpacity
            onPress={() => {
              setProductSelected(product);
              onPress();
            }}
          >
            <View className="flex flex-col p-2 justify-between">
              <View className="flex flex-row gap-1">
                <ThemedText className="text-xs font-plight">Rp</ThemedText>
                <View
                  className={clsx(
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
