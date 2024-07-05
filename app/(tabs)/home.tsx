import { ThemedText } from "@/components/ThemedText";
import HomeCard from "@/components/home-card";
import HomeHeader from "@/components/home-header";
import NumberWithCurrency from "@/components/number-with-currency";
import TransactionCard from "@/components/transaction-card";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Member } from "@/schema/member.schema";
import { Order } from "@/schema/order.schema";
import { formatCurrency2 } from "@/utils/format-currency";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, member, setMember, setOrder } = useGlobalContext();
  const { data, refetch, isLoading } = useDataApi<Member>({
    queryKey: ["members"],
    url: "anggota/find",
  });
  const queryClient = useQueryClient();

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
  const isHorizontal = orders && orders.length > 1 ? true : false;

  return (
    <View className="flex gap-3 px-2 py-3">
      <HomeHeader user={user!} />

      <HomeCard title="Saldo Voucher" color="primary">
        <NumberWithCurrency
          value={formatCurrency2(data?.saldoVoucher || 0, { precision: 0 })}
          valueClassName="text-3xl text-left -ml-2 text-background"
          currencyClassName="mr-0 text-background"
        />
      </HomeCard>
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
