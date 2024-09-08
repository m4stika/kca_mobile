import { ThemedText } from "@/components/ThemedText";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import ProductCard from "@/components/product-card";
import ShopHeader from "@/components/shop-header";
import ShoppingProductView from "@/components/shopping-product-view";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Product } from "@/schema/product.schema";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SortBy, { TSortBy } from "@/components/product-sortby";
import { RadioButton } from "@/components/atoms";
import { cn } from "@/utils/cn";

type OrderBy = {
  id: string;
  sort: "asc" | "desc";
};

type Pagination = {
  page: number
  size: number
  searchValue?: string
  orderBy?: OrderBy
  filter?: string
}

type GroupProduct = {
  groupProduct: string
}

const getPaginationParams = (pagination: Pagination) => {
  let params = {}
  params = { ...params, page: pagination.page, size: pagination.size }
  if (pagination.searchValue) params = { ...params, searchValue: pagination.searchValue };
  if (pagination.filter && pagination.filter !== "TAMPILKAN-SEMUA") params = { ...params, filter: pagination.filter };
  // if (pagination.orderBy || (pagination.orderBy && pagination.orderBy["sort"]))
  if (!pagination.orderBy) {
    params = {
      ...params,
      orderBy: JSON.stringify({
        id: "namaBarang",
        sort: "asc"
      })
    }
  } else {
    params = {
      ...params,
      orderBy: JSON.stringify({
        id: pagination.orderBy.id,
        sort: pagination.orderBy.sort,
      }),
    }
  }

  return params;
}

const Shop = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [searchValue, setValue] = useState<string>()
  const [pagination, setPagination] = useState<Pagination>({ page: 1, size: 14, orderBy: { id: "namaBarang", sort: 'asc' } })
  const [state, setState] = useState<TSortBy>("PRODUCT-ASC")
  const [groupProduct, setGroupProduct] = useState<string>("TAMPILKAN-SEMUA")
  const [sheetActive, setSheetActive] = useState<"product" | "sortby" | "filter">("product");
  const [loadMoreState, setLoadMore] = useState<boolean>(false)
  const [onDrag, setOnDrag] = useState<boolean>(false)
  const { setProductSelected, theme } = useGlobalContext();
  // let stopFetchMore = true;
  // const queryClient = useQueryClient()

  const { dismiss } = useBottomSheetModal();


  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const Filter = () => (
    <View className={cn("relative flex flex-row items-center justify-center bottom-8 ")}>
      <View className="absolute flex flex-row gap-4 px-4 py-1 rounded-full bg-muted  border shadow-xl items-center ">
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

  const FilterDetail = () => {
    if (!groupProducts) return null

    const radioGroups = groupProducts.map((item, index) => ({ key: item.groupProduct, value: item.groupProduct }))
    radioGroups.unshift({ key: "TAMPILKAN-SEMUA", value: "TAMPILKAN-SEMUA" })

    // const RenderGroupProduct = ({ item }: { item: GroupProduct }) => 
    return (
      <ScrollView>
        <View className="py-2 px-4">
          <RadioButton
            defaultSelection={groupProduct}
            options={radioGroups}
            onSelection={(index, value) => {
              // setState((oldValue) => ({ ...oldValue, paymentMethod: value.key as PaymentMethod }));
              dismiss();
              setGroupProduct(value.value)
            }}
          />
          {/* <ThemedText>{item.groupProduct}</ThemedText> */}
        </View>
      </ScrollView>
    )

    // return (
    //   <FlatList
    //     data={groupProducts}
    //     keyExtractor={(item, index) => `${item.groupProduct}-${index}`}
    //     renderItem={({ item }) => <RenderGroupProduct item={item} />}
    //   />
    // )
  }

  const { data, paging, refetch, isLoading } = useDataApi<Product[]>({
    queryKey: ["products"],
    url: "products/search",
    // params: (searchValue && searchValue !== "") ? { size: 20, page: 1, namaBarang: searchValue } : { size: 20, page: 1 }
    params: { ...getPaginationParams(pagination) }
  });

  const { data: groupProducts } = useDataApi<GroupProduct[]>({
    queryKey: ["groupProducts"],
    url: "products/group-product",
    // params: (searchValue && searchValue !== "") ? { size: 20, page: 1, namaBarang: searchValue } : { size: 20, page: 1 }
  });

  useEffect(() => {
    if (!data) return;
    // console.log('data', pagination)
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
    }
    setLoadMore(false)
  }, [data]);


  useEffect(() => {
    // console.log('searchValue', searchValue)
    setPagination(oldValue => (!searchValue) ? { page: 1, size: oldValue.size } : { ...oldValue, page: 1, searchValue })
  }, [searchValue])

  useEffect(() => {
    if (!groupProduct) return
    setPagination(oldValue => ({ ...oldValue, filter: groupProduct, page: 1 }))
  }, [groupProduct])

  useEffect(() => {
    if (pagination.orderBy?.id === state) return
    const itemSplit = state.split('-')
    const id = itemSplit[0] === "PRODUCT" ? "namaBarang" : "hargaJual"
    const isAscending = state.endsWith("ASC")

    setPagination(oldValue => ({ ...oldValue, page: 1, orderBy: { id, sort: isAscending ? "asc" : "desc" } }))
  }, [state])

  useEffect(() => {
    // if (!pagination.orderBy) return
    onRefresh()
  }, [pagination.searchValue, pagination.orderBy, pagination.filter])

  useEffect(() => {
    if (pagination.page !== 1) return
    onRefresh()
  }, [pagination.page])

  useEffect(() => {
    if (!loadMoreState) return
    loadMore()
  }, [loadMoreState])

  const loadMore = async () => {
    if (!paging) return
    if (!paging.hasMore) return setLoadMore(false)
    // console.log('load more', paging)
    // setLoadMore(true)
    // setPagination(oldValue => ({ ...oldValue, page: oldValue.page + 1 }))
    await refetch(['products'])
    // stopFetchMore = true
  }

  const onRefresh = async () => {
    // queryClient.removeQueries({ queryKey: ["product"] })
    setLoadMore(false)
    // setPagination(oldPagination => ({ ...oldPagination, page: 1 }))
    setRefreshing(true);
    await refetch(['products'])
    setRefreshing(false);
    // setLoadMore(true)
  };


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
      {/* <View className="flex-1 flex-row items-center justify-between p-2"> */}
      <ShopHeader searchValue={searchValue} setSearchValue={setValue} refetch={onRefresh} />
      <FlatList
        data={products}
        numColumns={2}
        initialNumToRender={8}
        // maxToRenderPerBatch={10}
        // removeClippedSubviews={true}
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
          // console.log('loadMoreState', loadMoreState)
          setPagination(oldValue => ({ ...oldValue, page: oldValue.page + 1 }))
          setLoadMore(true)
        }}
        // onScrollBeginDrag={() => {
        //   setOnDrag(true)
        //   // stopFetchMore = false;
        // }}
        // onScrollEndDrag={() => setOnDrag(false)}
        ListFooterComponent={() => loadMoreState && <FooterComponent />}
        onMomentumScrollBegin={() => setOnDrag(true)}
        onMomentumScrollEnd={() => setOnDrag(false)}
      />
      {/* <Filter /> */}
      {!onDrag && <Filter />}
      <CustomBottomSheet
        title={"Product Detail"}
        ref={bottomSheetRef}
        snapPointItems={sheetActive === "product" ? ["90%"] : sheetActive === "sortby" ? ["45%"] : ["60%"]}
        content={
          sheetActive === "product" ? <ShoppingProductView />
            : sheetActive === "sortby" ? <SortBy state={state} setState={setState} />
              : <FilterDetail />
        }
      />
      {/* </View> */}
    </View>
  );
};

export default Shop;
