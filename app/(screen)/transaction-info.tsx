import TransactionInfoDetail from "@/components/transaction-info-detail";
import TransactionInfoHeader from "@/components/transaction-info-header";
import { useGlobalContext } from "@/context/global-provider";
import { useNavigation } from "expo-router";
import React from "react";
import { View } from "react-native";

const TransactionInfo = () => {
  const { orderSelected } = useGlobalContext();
  if (!orderSelected) return;

  const navigation = useNavigation();
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
  });
  // useLayoutEffect(() => {
  //   setOptions({ gestureEnabled: false });
  // }, [setOptions]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: "Informasi Transaksi",
  //     // className: "",
  //     headerTitleStyle: {
  //       fontSize: 20,
  //       fontWeight: "bold",
  //       color: "white",
  //     },
  //     headerStyle: {
  //       backgroundColor: "#0369A1",
  //       // height: 80,
  //       borderBottomColor: "transparent",
  //       shadowColor: "transparent",
  //     },
  //   });
  // }, []);

  return (
    <View>
      <TransactionInfoHeader />
      {/* <TransactionCard /> */}
      {/* <TransactionInvoiceInfo /> */}
      <TransactionInfoDetail />
      {/* <TransactionInfoPaymentShipping /> */}
    </View>
  );
};

export default TransactionInfo;
