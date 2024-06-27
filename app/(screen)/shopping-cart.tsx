import ShoppingCartHeader from "@/components/shopping-cart-header";
import ShoppingCartList from "@/components/shopping-cart-list";
import React from "react";
import { View } from "react-native";

const ShoppingCart = () => {
  // const [sheetTitle, setSheetTitle] = useState("Metode Pengiriman");
  // const [sheetActive, setSheetActive] = useState<"shipping" | "payment">("shipping");
  // // const [snapPointItems, setSnapPointItems] = useState<string[]>(["70%"]);
  // const bottomSheetRef = useRef<BottomSheetModal>(null);

  // // callbacks
  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetRef.current?.present();
  // }, []);

  return (
    <View className="flex-1 px-2 gap-4">
      <ShoppingCartHeader />
      <ShoppingCartList />
      {/* <ShippingMethod
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
      <ShoppingCartFooter />
      <CustomBottomSheet
        title={sheetTitle}
        ref={bottomSheetRef}
        // activeIndex={2}
        snapPointItems={["60%"]}
        content={sheetActive === "shipping" ? <ShippingDetail /> : <PaymentDetail />}
      /> */}
    </View>
  );
};

export default ShoppingCart;
