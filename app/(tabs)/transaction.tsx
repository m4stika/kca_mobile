import CustomBottomSheet from "@/components/custom-bottom-sheet";
import ShoppingProductView from "@/components/shopping-product-view";
import TransactionCard from "@/components/transaction-card";
import TransactionHeader, { TOrderStatus } from "@/components/transaction-header";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Order } from "@/schema/order.schema";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";


const TransactionScreen = () => {
  const { member } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<TOrderStatus>("ALL")
  const [orders, setOrders] = useState<Order[]>();
  const { data, refetch, isLoading } = useDataApi<Order[]>({
    queryKey: ["transactions"],
    url: `orders/by_member/${member?.noAnggota}`,
    params: status !== "ALL" && { orderStatus: status }
  });

  // const queryClient = useQueryClient();

  useEffect(() => {
    if (!member || !status) return;
    refetch()
    // queryClient.invalidateQueries({ queryKey: ["transactions"] });
  }, [member, status]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    if (!data) return;
    const orders: Order[] = data.map((item) => ({
      ...item,
      amount: Number(item.amount),
    }));
    setOrders(orders);
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View className="p-4 flex-1 gap-2">
      {/* <View className="flex-1 flex-row items-center justify-between p-2"> */}
      <TransactionHeader status={status} setStatus={setStatus} refetch={refetch} />
      <FlatList
        data={orders}
        contentContainerClassName="gap-4"
        // columnWrapperClassName="gap-1 justify-center"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TransactionCard order={item} reFetch={refetch} />
          // <ProductCard product={item} key={index} onPress={handlePresentModalPress} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <CustomBottomSheet
        title={"Order Info"}
        ref={bottomSheetRef}
        snapPointItems={["90%"]}
        content={<ShoppingProductView />}
      />
      {/* </View> */}
    </View>
  );
};

export default TransactionScreen;
