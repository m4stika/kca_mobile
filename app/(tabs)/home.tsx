import { ThemedText } from "@/components/ThemedText";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useGlobalContext } from "@/context/global-provider";
import useDataApi from "@/hooks/useDataApi";
import { Member } from "@/schema/member.schema";
import { formatDate } from "@/utils/date-formater";
import { formatCurrency2 } from "@/utils/format-currency";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, member, setMember } = useGlobalContext();
  const { data, refetch, isLoading } = useDataApi<Member>({ url: "anggota/find" });

  useEffect(() => {
    if (!data && member) setMember(null);
    if (data) setMember(data);
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // console.log("data", data);

  const WelcomeUser = () => (
    <View className="w-full flex-row items-center justify-between">
      <View className="flex flex-row gap-2 items-center">
        <View className="items-start flex">
          <ThemedText className="p-0 text-xs font-psemibold ">{user?.name}</ThemedText>
          <ThemedText className="text-xs tracking-tighter">{user?.email}</ThemedText>
        </View>
        <View className="rounded-full bg-success/80 px-2 h-6 flex flex-row items-center justify-between gap-1">
          <TabBarIcon
            name="checkmark"
            size={12}
            className="mb-0 text-background"
            color={"#fafafa"}
          />
          <ThemedText className="text-xs text-disabled">Member</ThemedText>
        </View>
      </View>
      <View>
        <TabBarIcon
          name="notifications-outline"
          size={22}
          // color={theme.dark ? "white" : "red"}
        />
      </View>
    </View>
  );

  const Card = ({
    title,
    caption,
    captionPrefix,
    showDetail = true,
    color = "default",
    containerClassName,
    titleClassName,
    captionClassName,
  }: {
    title: string;
    caption: string;
    captionPrefix?: string;
    showDetail?: boolean;
    color?: "primary" | "secondary" | "success" | "warning" | "default";
    containerClassName?: string;
    titleClassName?: string;
    captionClassName?: string;
  }) => {
    const classColor =
      color === "default"
        ? "border border-border"
        : color === "primary"
        ? `bg-primary`
        : color === "secondary"
        ? `bg-secondary`
        : color === "success"
        ? `bg-success`
        : "bg-warning";
    return (
      <View
        className={`h-32 px-4 flex justify-center rounded-lg ${classColor} ${containerClassName}`}
      >
        {/* <Image source={card} className="w-full h-full rounded-xl" resizeMode="cover" /> */}
        <View className="flex flex-row justify-between size-full">
          <View className="flex flex-col justify-between px-2">
            <ThemedText
              type="subtitle"
              className={`basis-1/2 mt-2 opacity-50 font-pregular ${titleClassName}`}
            >
              {title}
            </ThemedText>
            <View className="flex-1 flex flex-row">
              {captionPrefix && (
                <ThemedText className="font-pmedium -mr-2">{captionPrefix}</ThemedText>
              )}
              <ThemedText type="title" className={`px-0 ${captionClassName}`}>
                {caption}
              </ThemedText>
            </View>
          </View>
          {showDetail && (
            <View className="flex flex-row gap-2 mt-2 h-8 items-center justify-center font-pmedium">
              <ThemedText className="text-primary text-sm">{"Lihat detail"}</ThemedText>
              <TabBarIcon
                name="chevron-forward"
                size={16}
                className="text-primary mt-0"
                // color={"white"}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  const MemberInfo = () => {
    type TData = { label: string; value: number };
    const dataInfo = [
      { label: "Tabungan", value: 2300000 },
      { label: "Pinjaman", value: 5422100 },
    ];

    const [activeItem, setActiveItem] = useState(dataInfo[0]);

    /* const viewableItemsChanged = ({ viewableItems }: TData[]) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }; */
    return (
      <View>
        <ThemedText type="subtitle" className="py-0 my-0 pb-0">
          Keanggotaan
        </ThemedText>
        <FlatList
          horizontal
          data={dataInfo}
          keyExtractor={(item) => item.label}
          renderItem={({ item, index }) => (
            <Card
              // color={index === 1 ? "success" : "secondary"}
              key={item.label}
              color={"secondary"}
              title={item.label}
              caption={formatCurrency2(item.value, { currency: "IDR", precision: 2 })}
              containerClassName={`w-80 ${index === 0 ? "bg-success" : "bg-secondary"}`}
              captionClassName="text-base"
            />
          )}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
          contentContainerClassName="gap-2"
          contentOffset={{ x: 50, y: 0 }}
          // onViewableItemsChanged={viewableItemsChanged}
          // ListHeaderComponent={() => <ThemedText>Keanggotaan</ThemedText>}
          // className="flex flex-col"
        ></FlatList>
      </View>
    );
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
    <SafeAreaView className="h-full">
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
            <WelcomeUser />
            <Card
              title="Saldo Voucher"
              captionPrefix="Rp"
              caption={formatCurrency2(data?.saldoVoucher || 0, { precision: 0 })}
            />

            {/* <Card
              title="Saldo Tabungan"
              captionPrefix="Rp"
              caption={formatCurrency2(data?.voucherAmount || 0, { precision: 0 })}
            />

            <Card
              title="Sosa Pinjaman"
              captionPrefix="Rp"
              caption={formatCurrency2(data?.voucherAmount || 0, { precision: 0 })}
            /> */}

            {/* <MemberInfo /> */}
            <ThemedText type="subtitle">Transaksi Terakhir</ThemedText>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
