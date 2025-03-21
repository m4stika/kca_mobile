import { useGlobalContext } from "@/context/global-provider";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import LabelWithValue from "./label-with-value";

const LoanSummary = ({ onPress }: { onPress: () => void }) => {
  const { user, member } = useGlobalContext();
  if (!user || !member) return null;

  if (Number(member.saldoPinjaman) === 0) return null;

  return (
    <View className="px-4">
      <Card className="px-0">
        <CardHeader className="items-center border-b">
          <CardTitle className="font-psemibold text-lg">Pinjaman dan Angsuran</CardTitle>
        </CardHeader>
        <CardContent className="p-4 gap-2">
          <LabelWithValue
            title="Pinjaman"
            value={formatCurrency(Number(member.saldoPinjaman) || 0)}
            valueClassName="text-xl font-psemibold"
            titleClassName="text-lg"
          />
          <LabelWithValue
            title="Angsuran"
            value={formatCurrency(Number(member.nilaiAngsuran) || 0)}
            valueClassName="text-base font-psemibold"
            titleClassName="text-lg"
          />
        </CardContent>
        <CardContent className="p-4 gap-2 border-t">
          <LabelWithValue
            title="Pokok terbayar"
            value={formatCurrency(Number(member.pokokTerbayar) || 0)}
            valueClassName="text-base font-psemibold"
            titleClassName="text-sm"
          />
          <LabelWithValue
            title="Sisa Pokok"
            value={formatCurrency(Number(member.sisaPokok) || 0)}
            valueClassName="text-xl font-psemibold text-error"
            titleClassName="text-lg text-error"
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

export default LoanSummary;
