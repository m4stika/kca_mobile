import ProductCard from "@/components/product-card";
import ShopHeader from "@/components/shop-header";
import useDataApi from "@/hooks/useDataApi";
import { Product } from "@/schema/product.schema";
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

const Shop = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch, isLoading } = useDataApi<Product[]>({ url: "products/search" });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View className="pb-4 flex-1">
      {/* <View className="flex-1 flex-row items-center justify-between p-2"> */}
      <ShopHeader />
      <FlatList
        data={data}
        numColumns={2}
        // className="justify-center items-center"
        contentContainerClassName="gap-3"
        columnWrapperClassName="gap-3 justify-center"
        keyExtractor={(item) => item.kodeBarang.toString()}
        renderItem={({ item, index }) => <ProductCard product={item} key={index} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {/* </View> */}
    </View>
  );
};

export default Shop;
