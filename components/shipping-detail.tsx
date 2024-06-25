import { View } from "react-native";
import { ThemedText } from "./ThemedText";

const ShippingDetail = () => {
  return (
    <View className="h-full flex flex-col py-3 gap-2 px-3">
      <View className="shadow-md justify-center p-2 border-b border-border">
        <ThemedText className="text-lg font-psemibold">Ambil Langsung</ThemedText>
        <ThemedText className="font-pregular pl-4 bg-muted" numberOfLines={3}>
          Lebih hemat dengan datang langsung ke Koperasi KCA untuk mengambil barang belanjaan
        </ThemedText>
      </View>
      <View className="shadow-md justify-center p-2 border-b border-border">
        <ThemedText className="text-lg font-psemibold">Diantar</ThemedText>
        <ThemedText className="font-pregular pl-4 bg-muted">
          Biaya pengantaran akan ditagihkan pada saat barang sampai ditujuan, siapkan uang tunai
          untuk biaya pengantaran
        </ThemedText>
      </View>
    </View>
  );
};

export default ShippingDetail;
