import { ThemedText } from "@/components/ThemedText";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import ProductCard from "@/components/product-card";
import ShopHeader from "@/components/shop-header";
import ShoppingProductView from "@/components/shopping-product-view";
import { useGlobalContext } from "@/context/global-provider";
import { Product } from "@/schema/product.schema";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl, View } from "react-native";
import SortBy from "@/components/product-sortby";
import useShop from "@/hooks/use-shop";
import FilterButton from "@/components/product-filter-button";
import ProductFilter from "@/components/product-filter";

const Shop = () => {
  const [onDrag, setOnDrag] = useState<boolean>(false)
  const { setProductSelected, theme } = useGlobalContext();
  const [sheetActive, setSheetActive] = useState<"product" | "sortby" | "filter">("product");
  const { dismiss } = useBottomSheetModal();

  const {
    products,
    paging,
    groupProducts,
    groupProduct,
    setGroupProduct,
    setPagination,
    onRefresh,
    searchValue,
    setSearchValue,
    sortBy,
    setSortBy,
    refreshing,
    loadMoreState,
    setLoadMore
  } = useShop()


  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const productOnPress = (product: Product) => {
    setSheetActive("product")
    handlePresentModalPress()
    setProductSelected(product)
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<Product>) => (
    <ProductCard product={item} key={index} onPress={productOnPress} theme={theme} />
  )

  const FooterComponent = () => (
    <ThemedText type="subtitle" className="text-center p-2">Loading more...</ThemedText>
  )

  return (
    <View className="pb-4 flex-1">
      <ShopHeader searchValue={searchValue} setSearchValue={setSearchValue} refetch={onRefresh} />
      <FlatList
        data={products}
        numColumns={2}
        initialNumToRender={8}
        contentContainerClassName="gap-3 px-2"
        columnWrapperClassName="gap-3 justify-center"
        keyExtractor={(item) => item.kodeBarang}
        // getItemLayout={(data, index) => (
        //   { length: 176, offset: 176 * index, index }
        // )}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setPagination(oldValue => ({ ...oldValue, page: 1 }))} />}
        onEndReachedThreshold={1}
        scrollEventThrottle={0.5}
        onEndReached={() => {
          if (!paging?.hasMore) return
          setPagination(oldValue => ({ ...oldValue, page: oldValue.page + 1 }))
          setLoadMore(true)
        }}
        ListFooterComponent={() => loadMoreState && <FooterComponent />}
        onMomentumScrollBegin={() => setOnDrag(true)}
        onMomentumScrollEnd={() => setOnDrag(false)}
      />
      {!onDrag && <FilterButton setSheetActive={setSheetActive} handlePresentModalPress={handlePresentModalPress} />}
      <CustomBottomSheet
        title={"Product Detail"}
        ref={bottomSheetRef}
        snapPointItems={sheetActive === "product" ? ["90%"] : sheetActive === "sortby" ? ["45%"] : ["60%"]}
        content={
          sheetActive === "product" ? <ShoppingProductView />
            : sheetActive === "sortby" ? <SortBy state={sortBy} setState={setSortBy} />
              : <ProductFilter groupProducts={groupProducts!} groupProduct={groupProduct} setGroupProduct={setGroupProduct} dismiss={dismiss} />
        }
      />
    </View>
  );
};

export default Shop;
