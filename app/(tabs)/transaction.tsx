import CustomBottomSheet from "@/components/custom-bottom-sheet";
import ShoppingProductView from "@/components/shopping-product-view";
import TransactionCard from "@/components/transaction-card";
import TransactionHeader, { TOrderStatus } from "@/components/transaction-header";
import TransactionLoanCard from "@/components/transaction-loan-card";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Order } from "@/schema/order.schema";
import { Pinjaman } from "@/schema/pinjaman.schema";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

type PinjamanWithID = Pinjaman & { id: string, type: "Pinjaman" | "Order" }
type OrderWithType = Order & { type: "Pinjaman" | "Order" }

const TransactionScreen = () => {
  const { member } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<TOrderStatus>("ALL")
  const [orders, setOrders] = useState<(OrderWithType | PinjamanWithID)[]>();
  const { data, refetch } = useDataApi<Order[]>({
    queryKey: ["transactions"],
    url: `orders/by_member/${member?.noAnggota}`,
    params: status !== "ALL" && { orderStatus: status }
  });

  const { data: dataLoan, refetch: refetchPinjaman } = useDataApi<PinjamanWithID[]>({
    queryKey: ["loans"],
    url: `pinjaman/onProgress/${member?.noAnggota}`,
  });

  useEffect(() => {
    if (!member || !status) return;
    refetch()
    refetchPinjaman()
  }, [member, status]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetRef.current?.present();
  // }, []);

  useEffect(() => {
    // if (!data) return;
    if (data) {
      const orders: OrderWithType[] = data.map((item) => ({
        ...item,
        type: "Order",
        amount: Number(item.amount),
      }));
      setOrders(orders);
    }
    if (dataLoan) {
      const tempData: PinjamanWithID[] = dataLoan.map(loan => {
        return {
          ...loan,
          id: loan.refCode,
          type: "Pinjaman",
          nilaiPinjaman: Number(loan.nilaiPinjaman),
          persenBunga: Number(loan.persenBunga),
          biayaAdmin: Number(loan.biayaAdmin)
        }

      })
      setOrders(oldValue => (oldValue ? [...oldValue, ...tempData] : tempData))
    }
  }, [data, dataLoan]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View className="p-4 flex-1 gap-2">
      <TransactionHeader status={status} setStatus={setStatus} refetch={refetch} />
      <FlatList
        data={orders}
        contentContainerClassName="gap-4"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return item.type === "Order" ? <TransactionCard order={item as Order} reFetch={refetch} /> : <TransactionLoanCard pinjaman={item as Pinjaman} reFetch={refetchPinjaman} />
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <CustomBottomSheet
        title={"Order Info"}
        ref={bottomSheetRef}
        snapPointItems={["90%"]}
        content={<ShoppingProductView />}
      />
    </View>
  );
};

export default TransactionScreen;
