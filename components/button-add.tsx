import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "./navigation/TabBarIcon";

const ButtonAdd = () => {
  const { setOrderCount } = useGlobalContext();
  return (
    <View className="absolute -top-6 right-2 h-8 w-8 rounded-full bg-success items-center justify-center">
      <TouchableOpacity onPress={() => setOrderCount((oldValue) => oldValue + 1)}>
        <TabBarIcon name="add" size={22} style={{ fontWeight: "semibold", color: "white" }} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAdd;
