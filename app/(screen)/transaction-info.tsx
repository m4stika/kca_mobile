import { Button } from "@/components/atoms";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";

const TransactionInfo = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Informasi Transaksi",
      // className: "",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#0369A1",
        // height: 80,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);
  return (
    <View>
      <Button
        title="Back"
        containerClassName="w-32 mt-5 mx-4"
        onPress={() => router.replace("home")}
      />
    </View>
  );
};

export default TransactionInfo;
