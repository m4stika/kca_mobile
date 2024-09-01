import { ThemedText } from "@/components/ThemedText";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ProductCard from "@/components/product-card";
import ShopHeader from "@/components/shop-header";
import ShoppingProductView from "@/components/shopping-product-view";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Product } from "@/schema/product.schema";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, RefreshControl, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SortBy, { TSortBy } from "@/components/product-sortby";
import { useEvent } from "react-native-reanimated";
import { useQueryClient } from "@tanstack/react-query";

type OrderBy = {
  id: string;
  sort: "asc" | "desc";
};

type Pagination = {
  page: number
  size: number
  searchValue?: string
  orderBy?: OrderBy
}

const getPaginationParams = (pagination: Pagination) => {
  let params = {}
  params = { ...params, page: pagination.page, size: pagination.size }
  if (pagination.searchValue) params = { ...params, searchValue: pagination.searchValue };
  if (pagination.orderBy || (pagination.orderBy && pagination.orderBy["sort"]))
    params = {
      ...params,
      orderBy: JSON.stringify({
        id: pagination.orderBy.id,
        sort: pagination.orderBy.sort,
      }),
    };

  return params;
}

const Shop = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [searchValue, setValue] = useState<string>()
  const [pagination, setPagination] = useState<Pagination>({ page: 1, size: 10, orderBy: { id: "namaBarang", sort: 'asc' } })
  const [state, setState] = useState<TSortBy>("PRODUCT-ASC")
  const [sheetActive, setSheetActive] = useState<"product" | "sortby" | "filter">("product");
  const [loadMoreState, setLoadMore] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const { setProductSelected, theme } = useGlobalContext();
  const queryClient = useQueryClient()

  const { data, paging, refetch, isLoading } = useDataApi<Product[]>({
    queryKey: ["products"],
    url: "products/search",
    // params: (searchValue && searchValue !== "") ? { size: 20, page: 1, namaBarang: searchValue } : { size: 20, page: 1 }
    params: { ...getPaginationParams(pagination) }

  });
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const Filter = () => (
    <View className="relative flex flex-row items-center justify-center bottom-8">
      <View className="absolute flex flex-row gap-4 px-4 py-1 rounded-full bg-muted  border items-center ">
        <TouchableOpacity onPress={() => {
          setSheetActive("sortby")
          handlePresentModalPress()
        }}>
          <View className="flex flex-row gap-2 items-center">
            <MaterialCommunityIcons name="sort" size={18} color={theme.colors.foreground} />
            <ThemedText type="subtitle">Sort By</ThemedText>
          </View>
        </TouchableOpacity>
        <View className="w-1 border-r border-border h-full" />
        <TouchableOpacity onPress={() => {
          setSheetActive("filter")
          handlePresentModalPress()
        }}>
          <View className="flex flex-row gap-2 items-center">
            <MaterialCommunityIcons name="filter-outline" size={18} color={theme.colors.foreground} />
            <ThemedText type="subtitle">Filter</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )

  useEffect(() => {
    if (!data) return;
    // console.log('data', { data, paging })
    if (!loadMoreState) {
      const products: Product[] = data.map((item) => ({
        ...item,
        hargaJual: Number(item.hargaJual),
        stok: Number(item.stok),
        // imageSource: item.imageSource ? item.imageSource : getRandomImageSource(),
      }));
      setProducts(products);
    } else {
      const moreProducts: Product[] = data.map((item) => ({
        ...item,
        hargaJual: Number(item.hargaJual),
        stok: Number(item.stok),
        // imageSource: item.imageSource ? item.imageSource : getRandomImageSource(),
      }));
      setProducts(oldProducts => (oldProducts ? [...oldProducts, ...moreProducts] : moreProducts))
      setLoadMore(false)
    }
  }, [data]);


  useEffect(() => {
    setPagination(oldValue => (!searchValue || searchValue === "") ? { page: 1, size: oldValue.size } : { ...oldValue, searchValue })
  }, [searchValue])

  useEffect(() => {
    if (pagination.orderBy?.id === state) return
    const itemSplit = state.split('-')
    const id = itemSplit[0] === "PRODUCT" ? "namaBarang" : "hargaJual"
    const isAscending = state.endsWith("ASC")

    queryClient.removeQueries({ queryKey: ["product"] })
    setPagination(oldValue => ({ ...oldValue, page: 1, orderBy: { id, sort: isAscending ? "asc" : "desc" } }))
  }, [state])

  useEffect(() => {
    if ((!pagination.searchValue || pagination.searchValue === "") && !pagination.orderBy) return
    // console.log('load pagination', pagination)
    const reFetchData = async () => {
      await refetch(['products'])
    }
    // reFetchData()
    onRefresh()
  }, [pagination.searchValue, pagination.orderBy])

  const loadMore = async () => {
    if (!paging || !paging.hasMore) return
    // console.log('load more', paging)
    setLoadMore(true)
    setPagination(oldValue => ({ ...oldValue, page: oldValue.page + 1 }))
    await refetch(['products'])
  }

  const onRefresh = async () => {
    setRefreshing(true);
    setLoadMore(false)
    setPagination(oldPagination => ({ ...oldPagination, page: 1 }))
    await refetch(['products'])
    setRefreshing(false);
  };

  const productOnPress = (product: Product) => {
    setSheetActive("product")
    handlePresentModalPress()
    setProductSelected(product)
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<Product>) => (
    <ProductCard product={item} key={index} onPress={productOnPress} theme={theme} />
  )

  return (
    <View className="pb-4 flex-1">
      {/* <View className="flex-1 flex-row items-center justify-between p-2"> */}
      <ShopHeader searchValue={searchValue} setValue={setValue} refetch={refetch} />
      <FlatList
        data={products}
        numColumns={2}
        initialNumToRender={8}
        // maxToRenderPerBatch={10}
        // removeClippedSubviews={true}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-1 justify-center"
        keyExtractor={(item) => item.kodeBarang}
        // getItemLayout={(data, index) => (
        //   { length: 176, offset: 176 * index, index }
        // )}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        // onEndReachedThreshold={1}
        // scrollEventThrottle={500}
        onEndReached={loadMore}
      // ListFooterComponent={() => isLoading && <ActivityIndicator />}
      // onMomentumScrollBegin={() => setState(true)}
      // onMomentumScrollEnd={() => setState(false)}
      />
      <Filter />
      {/* {!state && <Filter />} */}
      <CustomBottomSheet
        title={"Product Detail"}
        ref={bottomSheetRef}
        snapPointItems={sheetActive === "product" ? ["90%"] : ["50%"]}
        content={
          sheetActive === "product" ? <ShoppingProductView />
            : sheetActive === "sortby" ? <SortBy state={state} setState={setState} />
              : <ThemedText>Filter</ThemedText>
        }
      />
      {/* </View> */}
    </View>
  );
};

export default Shop;
