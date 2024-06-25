import CustomBottomSheet from "@/components/custom-bottom-sheet";
import PaymentDetail from "@/components/payment-detail";
import PaymentMethod from "@/components/payment-method";
import ShippingDetail from "@/components/shipping-detail";
import ShippingMethod from "@/components/shipping-method";
import ShoppingChartFooter from "@/components/shopping-cart-footer";
import ShoppingCartHeader from "@/components/shopping-cart-header";
import ShoppingCartList from "@/components/shopping-cart-list";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";

const ShoppingCart = () => {
  const [sheetTitle, setSheetTitle] = useState("Metoda Pengiriman");
  const [sheetActive, setSheetActive] = useState<"shipping" | "payment">("shipping");
  // const [snapPointItems, setSnapPointItems] = useState<string[]>(["70%"]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  // useEffect(() => {
  //   setSnapPointItems(sheetActive === "shi" ? ["40%"] : ["80%"]);
  // }, [sheetActive]);

  return (
    <View className="flex-1 gap-4 px-2">
      <ShoppingCartHeader />
      <ShoppingCartList />
      <ShippingMethod
        onPress={() => {
          setSheetActive("shipping");
          handlePresentModalPress();
        }}
      />
      <PaymentMethod
        onPress={() => {
          setSheetActive("payment");
          handlePresentModalPress();
        }}
      />
      <ShoppingChartFooter />
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

export default ShoppingCart;
