import { Product } from "@/schema/product.schema";
import useDataApi from "./useDataApi";
import { useEffect, useState } from "react";
import { TSortBy } from "@/components/product-sortby";

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

const useShop = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [searchValue, setSearchValue] = useState<string>()
  const [pagination, setPagination] = useState<Pagination>({ page: 1, size: 14, orderBy: { id: "namaBarang", sort: 'asc' } })
  const [sortBy, setSortBy] = useState<TSortBy>("PRODUCT-ASC")
  const [groupProduct, setGroupProduct] = useState<string>("TAMPILKAN-SEMUA")
  // const [sheetActive, setSheetActive] = useState<"product" | "sortby" | "filter">("product");
  const [loadMoreState, setLoadMore] = useState<boolean>(false)
  // const [onDrag, setOnDrag] = useState<boolean>(false)
  const { data, paging, refetch } = useDataApi<Product[]>({
    queryKey: ["products"],
    url: "products/search",
    params: { ...getPaginationParams(pagination) }
  });

  const { data: groupProducts } = useDataApi<GroupProduct[]>({
    queryKey: ["groupProducts"],
    url: "products/group-product",
  });

  const onRefresh = async () => {
    setLoadMore(false)
    setRefreshing(true);
    await refetch(['products'])
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (!paging) return
    if (!paging.hasMore) return setLoadMore(false)
    await refetch(['products'])
  }

  useEffect(() => {
    if (!data) return;
    if (!loadMoreState) {
      const products: Product[] = data.map((item) => ({
        ...item,
        hargaJual: Number(item.hargaJual),
        stok: Number(item.stok),
      }));
      setProducts(products);
    } else {
      const moreProducts: Product[] = data.map((item) => ({
        ...item,
        hargaJual: Number(item.hargaJual),
        stok: Number(item.stok),
      }));
      setProducts(oldProducts => (oldProducts ? [...oldProducts, ...moreProducts] : moreProducts))
    }
    setLoadMore(false)
  }, [data]);


  useEffect(() => {
    setPagination(oldValue => (!searchValue) ? { page: 1, size: oldValue.size } : { ...oldValue, page: 1, searchValue })
  }, [searchValue])

  useEffect(() => {
    if (!groupProduct) return
    setPagination(oldValue => ({ ...oldValue, filter: groupProduct, page: 1 }))
  }, [groupProduct])

  useEffect(() => {
    if (pagination.orderBy?.id === sortBy) return
    const itemSplit = sortBy.split('-')
    const id = itemSplit[0] === "PRODUCT" ? "namaBarang" : "hargaJual"
    const isAscending = sortBy.endsWith("ASC")

    setPagination(oldValue => ({ ...oldValue, page: 1, orderBy: { id, sort: isAscending ? "asc" : "desc" } }))
  }, [sortBy])

  useEffect(() => {
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


  return {
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
    setLoadMore,
  }
}

export default useShop
