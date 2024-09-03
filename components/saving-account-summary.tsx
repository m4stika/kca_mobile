import { useGlobalContext } from "@/context/global-provider";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import NumberWithCurrency from "./number-with-currency";

const SavingAccountSummary = ({ onPress }: { onPress: () => void }) => {
  const { user, member } = useGlobalContext();
  if (!user || !member || Number(member.saldoSimpanan) === 0) return null;

  return (
    <View className="px-4">
      <Card className="px-0">
        <CardHeader className="items-center border-b">
          <CardTitle className="font-psemibold text-lg">Simpanan</CardTitle>
        </CardHeader>
        <CardContent className="px-4 items-center justify-center">
          <NumberWithCurrency
            value={formatCurrency(Number(member.saldoSimpanan) || 0)}
            valueClassName="text-3xl"
          />
        </CardContent>
        <CardFooter className="flex-1 border-t pr-4">
          <TouchableOpacity onPress={onPress}>
            <CardDescription className="text-base text-primary">Lihat detail</CardDescription>
          </TouchableOpacity>
        </CardFooter>
      </Card>
    </View>
  );
};

export default SavingAccountSummary;
