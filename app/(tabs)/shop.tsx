import CustomBottomSheet from "@/components/custom-bottom-sheet";
import ProductCard from "@/components/product-card";
import ShopHeader from "@/components/shop-header";
import ShoppingProductView from "@/components/shopping-product-view";
import useDataApi from "@/hooks/useDataApi";
import { Product } from "@/schema/product.schema";
import { getRandomImageSource } from "@/utils/get-random-image-source";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

const Shop = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [product, setProduct] = useState<Product[]>();
  const { data, refetch, isLoading } = useDataApi<Product[]>({
    queryKey: ["products"],
    url: "products/search",
  });
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    if (!data) return;
    const products: Product[] = data.map((item) => ({
      ...item,
      hargaJual: Number(item.hargaJual),
      stok: Number(item.stok),
      imageSource: item.imageSource ? item.imageSource : getRandomImageSource(),
    }));
    setProduct(products);
  }, [data]);

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
        data={product}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-1 justify-center"
        keyExtractor={(item) => item.kodeBarang.toString()}
        renderItem={({ item, index }) => (
          <ProductCard product={item} key={index} onPress={handlePresentModalPress} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <CustomBottomSheet
        title={"Product Detail"}
        ref={bottomSheetRef}
        snapPointItems={["90%"]}
        content={<ShoppingProductView />}
      />
      {/* </View> */}
    </View>
  );
};

export default Shop;
