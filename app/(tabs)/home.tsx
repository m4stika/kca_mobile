import { ThemedText } from "@/components/ThemedText";
import HomeCard from "@/components/home-card";
import HomeHeader from "@/components/home-header";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Member } from "@/schema/member.schema";
import { formatDate } from "@/utils/date-formater";
import { formatCurrency2 } from "@/utils/format-currency";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, member, setMember } = useGlobalContext();
  const { data, refetch, isLoading } = useDataApi<Member>({ url: "anggota/find" });

  useEffect(() => {
    if (!data && member) setMember(null);
    if (data) {
      setMember(data);
    }
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  type Transaction = { id: number; transactionDate: Date; remark: string; amount: number };
  const TransactionHistory = ({ data }: { data: Transaction }) => {
    return (
      <Pressable onPress={() => router.replace("/transaction-info")}>
        <View className="w-full flex flex-col px-5 pb-3">
          <View className="flex flex-row justify-between">
            <Text className="text-sm">{formatDate(data.transactionDate)}</Text>
            <Text className=" text-right text-primary font-pmedium text-sm">
              {formatCurrency2(data.amount)}
            </Text>
          </View>
          <View>
            <Text className="text-left italic pl-3 text-foreground/40">{data.remark}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="h-full">
      <FlatList
        data={[
          {
            id: 1,
            transactionDate: new Date("2024-01-10"),
            remark: "Top-up voucher",
            amount: 50000,
          },
          {
            id: 2,
            transactionDate: new Date("2024-01-20"),
            remark: "pembelian waserda",
            amount: 200000,
          },
          {
            id: 3,
            transactionDate: new Date("2024-03-5"),
            remark: "Pembayaran Pinjaman",
            amount: 125000,
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransactionHistory data={item} key={item.id} />}
        ListHeaderComponent={() => (
          <View className="flex gap-4 px-4 w-full">
            <HomeHeader user={user!} />
            <HomeCard
              color="primary"
              title="Saldo Voucher"
              captionPrefix="Rp"
              caption={formatCurrency2(data?.saldoVoucher || 0, { precision: 0 })}
              showDetail={false}
            />

            {/* <MemberInfo /> */}
            <ThemedText type="subtitle">Transaksi Terakhir</ThemedText>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default Home;
