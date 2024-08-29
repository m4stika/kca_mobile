import { useGlobalContext } from "@/context/global-provider";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { cn } from "@/utils/cn";

const Basket = () => {
  const { orderCount, theme } = useGlobalContext();
  return (
    <TouchableOpacity onPress={() => (orderCount === 0 ? null : router.navigate("/shopping-cart"))}>
      <View className="relative w-12">
        <TabBarIcon
          name="cart-outline"
          size={28}
          style={{ fontWeight: "semibold", width: 30, height: 30 }}
        />
        {orderCount > 0 && (
          <View
            className={cn(
              "absolute rounded-full bg-error -mt-2",
              orderCount > 9 ? "px-1" : "px-2"
            )}
          >
            <ThemedText className="text-background text-xs">
              {orderCount > 99 ? "99+" : orderCount}
            </ThemedText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Basket;
