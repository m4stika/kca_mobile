import ProductCard from "@/components/product-card";
import ShopHeader from "@/components/shop-header";
import useDataApi from "@/hooks/useDataApi";
import { Product } from "@/schema/product.schema";
import React, { useState } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";

const Shop = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch, isLoading } = useDataApi<Product[]>({ url: "products/search" });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="">
      {/* <View className="flex-1 flex-row items-center justify-between p-2"> */}
      <ShopHeader />
      <FlatList
        data={data}
        numColumns={2}
        // className="justify-center items-center"
        contentContainerClassName="gap-3"
        columnWrapperClassName="gap-3 justify-center"
        scrollEnabled
        keyExtractor={(item) => item.kodeBarang.toString()}
        renderItem={({ item, index }) => (
          // <View className="items-center justify-between rounded-xl">
          <ProductCard product={item} key={index} />
          // </View>
        )}
        // ListHeaderComponent={() => <ShopHeader />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Shop;
