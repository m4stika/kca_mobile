import { card } from "@/assets/images";
import { ThemedText } from "@/components/ThemedText";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useGlobalContext } from "@/context/global-provider";
import React, { useState } from "react";
import { FlatList, Image, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    //get data
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ThemedText>{item.id}</ThemedText>}
        ListHeaderComponent={() => (
          <View className="flex gap-4">
            <View className="w-full flex-row items-center justify-between px-4">
              <View className="items-start gap-0">
                <ThemedText type="title" className="font-pregular">
                  Welcome back,
                </ThemedText>
                <ThemedText type="title">{user?.name}</ThemedText>
              </View>
              <View>
                <TabBarIcon
                  name="notifications-outline"
                  size={22}
                  // color={theme.dark ? "white" : "red"}
                />
              </View>
            </View>
            <View className="w-full h-32 px-4 relative flex justify-center items-end">
              <Image source={card} className="w-full h-full rounded-xl" resizeMode="cover" />
              <TabBarIcon
                name="chevron-forward"
                className="w-12 h-12 absolute right-3"
                color={"white"}
              />
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
