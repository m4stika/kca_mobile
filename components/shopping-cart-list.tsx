import { useGlobalContext } from "@/context/global-provider";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "./atoms";
import CustomBottomSheet from "./custom-bottom-sheet";
import PaymentDetail from "./payment-detail";
import PaymentMethod from "./payment-method";
import ShippingDetail from "./shipping-detail";
import ShippingMethod from "./shipping-method";
import ShoppingCartFooter from "./shopping-cart-footer";
import ShoppingCartItem from "./shopping-cart-item";
import ShoppingCartNote from "./shopping-cart-notes";

const ShoppingCartList = () => {
  const { order, orderAmount } = useGlobalContext();
  const [sheetTitle, setSheetTitle] = useState("Metode Pengiriman");
  const [sheetActive, setSheetActive] = useState<"shipping" | "payment">("shipping");
  // const [snapPointItems, setSnapPointItems] = useState<string[]>(["70%"]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return orderAmount === 0 ? (
    <View className="flex-1 items-center justify-center gap-3">
      <Text className="font-pmedium">Keranjang belanja masih kosong</Text>
      <Button title="Mulai belanja" onPress={() => router.navigate("/shop")} />
    </View>
  ) : (
    <View className="flex-1 h-full">
      <FlatList
        data={order.OrderDetail.sort()}
        keyExtractor={(item) => item.kodeBarang}
        renderItem={(item) => <ShoppingCartItem orderItem={item.item} />}
        ItemSeparatorComponent={() => <View className="py-2" />}
        ListFooterComponent={() => (
          <View className="gap-4 px-2 mt-4">
            <ShippingMethod
              onPress={() => {
                setSheetActive("shipping");
                setSheetTitle("Metode Pengiriman");
                handlePresentModalPress();
              }}
            />
            <PaymentMethod
              onPress={() => {
                setSheetActive("payment");
                setSheetTitle("Metode Pembayaran");
                handlePresentModalPress();
              }}
            />
            <ShoppingCartNote />
          </View>
        )}
      />
      <ShoppingCartFooter />
      <CustomBottomSheet
        title={sheetTitle}
        ref={bottomSheetRef}
        // activeIndex={2}
        snapPointItems={["60%"]}
        content={sheetActive === "shipping" ? <ShippingDetail /> : <PaymentDetail />}
      />
    </View>
  );
};

export default ShoppingCartList;
