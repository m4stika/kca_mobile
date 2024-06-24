import { Product } from "@/schema/product.schema";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";
import RandomImage from "./random-images";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View className="flex flex-col gap-4 w-[48%] rounded-lg bg-orange-100 items-center justify-between">
      <View className="w-full">
        <View className="rounded-lg p-2">
          {/* <Image
            source={{ uri: "https://picsum.photos/200/300?random=5" }}
            className="h-48 w-44 rounded-lg"
            resizeMode="cover"
          /> */}
          <RandomImage />
        </View>
        <View className="relative flex flex-col p-2 justify-between">
          <View className="flex flex-row gap-1">
            <Text className="text-xs font-plight">Rp</Text>
            <View className="bg-warning/60 rounded-full min-w-[50%] px-3 flex justify-center">
              <Text className="font-medium text-background">
                {formatCurrency(Number(product.hargaJual))}
              </Text>
            </View>
          </View>
          <Text className="text-xs tracking-wider line-clamp-2" numberOfLines={2}>
            {product.namaBarang}
          </Text>
          <View className="absolute -top-6 right-2 h-8 w-8 rounded-full bg-success items-center justify-center">
            <TabBarIcon name="add" size={22} style={{ fontWeight: "semibold", color: "white" }} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
