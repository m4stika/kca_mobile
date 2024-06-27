import { useGlobalContext } from "@/context/global-provider";
import { ShippingMethod } from "@/schema/order.schema";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { RadioButton } from "./atoms";

const ShippingDetail = () => {
  const { setOrder, order, orderAmount } = useGlobalContext();
  const { dismiss } = useBottomSheetModal();
  if (orderAmount === 0) return;
  const radioData = [
    {
      key: "TAKE_AWAY",
      value: "Ambil Langsung",
      caption:
        "Lebih hemat dengan datang langsung ke Koperasi KCA untuk mengambil barang belanjaan",
    },
    {
      key: "DELIVERED",
      value: "Diantar",
      caption:
        "Biaya pengantaran akan ditagihkan pada saat barang sampai ditujuan, siapkan uang tunai untuk biaya pengantaran",
    },
  ];
  return (
    <View className="h-full flex flex-col py-3 gap-2 px-3">
      <RadioButton
        defaultSelection={order.shippingMethod}
        options={radioData}
        onSelection={(key, value) => {
          setOrder((oldValue) => ({ ...oldValue, shippingMethod: value.key as ShippingMethod }));
          dismiss();
        }}
      />
    </View>
  );
};

export default ShippingDetail;
