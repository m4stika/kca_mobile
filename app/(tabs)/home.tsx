import { ThemedText } from "@/components/ThemedText";
import HomeCard from "@/components/home-card";
import HomeHeader from "@/components/home-header";
import TransactionCard from "@/components/transaction-card";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Member } from "@/schema/member.schema";
import { Order } from "@/schema/order.schema";
import { formatDate } from "@/utils/date-formater";
import { formatCurrency2 } from "@/utils/format-currency";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, member, setMember, setOrder } = useGlobalContext();
  const { data, refetch, isLoading } = useDataApi<Member>({
    queryKey: ["members"],
    url: "anggota/find",
  });
  const queryClient = useQueryClient();

  // const getOrder = async (noAnggota: string) => {
  //   const { data: preOrder } = useDataApi<Order>({
  //     queryKey: ["pre-order"],
  //     url: `orders/pre_order/${noAnggota}`,
  //   });
  //   if (preOrder) setOrder(preOrder);
  // const response = await api.get<Order>({ url: `orders/pre_order/${noAnggota}` });
  // if (response.status === "error") alert(response.message);
  // else {
  //   if (response.data) setOrder(response.data);
  // }
  // };

  useEffect(() => {
    if (!data && member) setMember(null);
    if (data) {
      setMember(data);
      // getOrder(data.noAnggota);
    }
  }, [data]);

  const { data: orders } = useDataApi<Order[]>({
    queryKey: ["transactions"],
    url: `orders/by_member/${member?.noAnggota || user?.username}`,
  });

  const { data: preOrder } = useDataApi<Order>({
    queryKey: ["pre-orders"],
    url: `orders/pre_order/${member?.noAnggota || user?.username}`,
  });

  useEffect(() => {
    if (!preOrder) return;
    if (preOrder) setOrder(preOrder);
  }, [preOrder]);

  useEffect(() => {
    if (!user) return;
    queryClient.invalidateQueries({ queryKey: ["members"] });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["pre-orders"] });
    queryClient.removeQueries({ queryKey: ["loans"] });
    queryClient.removeQueries({ queryKey: ["saving_accounts"] });
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // type Transaction = { id: number; transactionDate: Date; remark: string; amount: number };
  const TransactionHistory = ({ data }: { data: Order }) => {
    return (
      <TouchableOpacity onPress={() => router.replace("/transaction-info")}>
        <View className="w-full flex flex-col px-5 pb-3">
          <View className="flex flex-row justify-between">
            <Text className="text-sm">{formatDate(data.transactionDate)}</Text>
            <Text className=" text-right text-primary font-pmedium text-sm">
              {formatCurrency2(data.amount)}
            </Text>
          </View>
          <View>
            <Text className="text-left italic pl-3 text-foreground/40">{data.transactionType}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const isHorizontal = orders && orders.length > 1 ? true : false;

  return (
    <View className="flex gap-3 px-2 py-3">
      <HomeHeader user={user!} />
      <HomeCard
        color="success"
        title="Saldo Voucher"
        captionPrefix="Rp"
        caption={formatCurrency2(data?.saldoVoucher || 0, { precision: 0 })}
        captionClassName="-ml-2"
        showDetail={false}
      />
      <View className="py-0 -mb-3 pt-2">
        <ThemedText className="font-psemibold">Transaksi Terakhir</ThemedText>
      </View>

      <FlatList
        data={orders}
        horizontal={isHorizontal}
        // scrollEnabled
        // showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-1" key={item.id}>
            <TransactionCard order={item} />
          </View>
        )}
        // ListHeaderComponentClassName="flex flex-col w-fit"
        contentContainerClassName="flex flex-row gap-4 justify-stretch items-stretch"
        // getItemLayout={(_, index) => ({ length: innerWidth, offset: innerWidth * index, index })}
        // ListHeaderComponent={() => (
        //   <View>
        //     <HomeHeader user={user!} />
        //     <HomeCard
        //       color="primary"
        //       title="Saldo Voucher"
        //       captionPrefix="Rp"
        //       caption={formatCurrency2(data?.saldoVoucher || 0, { precision: 0 })}
        //       showDetail={false}
        //     />

        //     {/* <MemberInfo /> */}
        //     {/* <ThemedText type="subtitle">Transaksi Terakhir</ThemedText> */}
        //   </View>
        // )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default Home;
