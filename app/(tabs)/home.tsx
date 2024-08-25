import { ThemedText } from "@/components/ThemedText";
import HomeCard from "@/components/home-card";
import HomeHeader from "@/components/home-header";
import PromoCard from "@/components/home-promo";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Member } from "@/schema/member.schema";
import { Order } from "@/schema/order.schema";
import { Promotion } from "@/schema/product.schema";
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
    }
  }, [data]);

  // const { data: orders } = useDataApi<Order[]>({
  //   queryKey: ["transactions"],
  //   url: `orders/by_member/${member?.noAnggota || user?.username}`,
  // });

  const { data: preOrder } = useDataApi<Order>({
    queryKey: ["pre-orders"],
    url: `orders/pre_order/${member?.noAnggota || user?.username}`,
  });

  const { data: promotions } = useDataApi<Promotion[]>({
    queryKey: ["promotion"],
    url: `anggota/promotion`,
  });

  useEffect(() => {
    if (!preOrder) return;
    if (preOrder) setOrder(preOrder);
  }, [preOrder]);

  useEffect(() => {
    if (!user) return;
    queryClient.invalidateQueries({ queryKey: ["members"] });
    // queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["pre-orders"] });
    queryClient.removeQueries({ queryKey: ["loans"] });
    queryClient.removeQueries({ queryKey: ["saving_accounts"] });
    queryClient.removeQueries({ queryKey: ["promotion"] });
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const isHorizontal = promotions && promotions.length > 1 ? true : false;

  return (
    <View className="flex gap-3 ">
      <HomeHeader user={user!} />
      <HomeCard data={data!} />
      <View className="py-0 -mb-3 pt-2 pl-2">
        <ThemedText className="font-psemibold">Promo dan Informasi</ThemedText>
      </View>

      <FlatList
        data={promotions}
        horizontal={isHorizontal}
        initialScrollIndex={0}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-1 pl-2" key={item.id}>
            {/* <TransactionCard order={item} /> */}
            {/* <ThemedText>{item.source}</ThemedText> */}
            <PromoCard data={item} />
          </View>
        )}
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
