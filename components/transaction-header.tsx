import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { OrderStatus, orderStatus } from "@/schema/order.schema";

export type TOrderStatus = "ALL" | OrderStatus
type HeaderProps = { status: TOrderStatus, setStatus: (value: TOrderStatus) => void, refetch: () => void }
const TransactionHeader = ({ status, setStatus, refetch }: HeaderProps) => {
  const { PRE_ORDER, ...orderStatusOmit } = orderStatus
  const orderStatusWithAll = { ALL: "Semua", ...orderStatusOmit }
  const { theme } = useGlobalContext();
  return (
    <View className='border rounded-xl h-12 justify-center'>
      <Picker
        mode='dropdown'
        selectedValue={status}
        onValueChange={(value) => {
          setStatus(value)
        }}
        style={{ color: theme.colors.text }}
        selectionColor={theme.colors.primary}
      >
        {Object.entries(orderStatusWithAll).map(([key, value]) =>
          <Picker.Item label={value} value={key} key={key} />
        )}
      </Picker>
    </View>
  );
};

export default TransactionHeader;
