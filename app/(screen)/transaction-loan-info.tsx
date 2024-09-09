import TransactionInfoHeader from "@/components/transaction-info-header";
import TransactionLoanDetail from "@/components/transaction-loan-detail";
import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { View } from "react-native";

const TransactionLoanInfo = () => {
  const { loanSelected } = useGlobalContext();
  if (!loanSelected) return;
  return (
    <View className="pb-4">
      {/* <TransactionInfoHeader /> */}
      <TransactionLoanDetail pinjaman={loanSelected} />
    </View>
  );
};

export default TransactionLoanInfo;
