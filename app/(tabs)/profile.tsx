import CustomBottomSheet from "@/components/custom-bottom-sheet";
import LoanDetail from "@/components/loan-detail";
import ProfileDetail from "@/components/profile-detail";
import ProfileHeader from "@/components/profile-header";
import ProfileSummaryInfo from "@/components/profile-sumary-info";
import SavingAccountDetail from "@/components/saving-account-detail";
import SavingAccountSummary from "@/components/saving-account-summary";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

const Profile = () => {
  const [sheetActive, setSheetActive] = useState<"profile" | "simpanan" | "pinjaman">("profile");
  const [snapPointItems, setSnapPointItems] = useState<string[]>(["80%"]);
  // const navigation = useNavigation();
  // navigation.addListener("beforeRemove", (e) => {
  //   e.preventDefault();
  // });

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    setSnapPointItems(sheetActive === "simpanan" ? ["40%"] : ["80%"]);
  }, [sheetActive]);

  return (
    <View className="h-full">
      <ProfileHeader />
      <ScrollView>
        <View className="flex gap-3 h-full">
          <ProfileSummaryInfo
            onPress={() => {
              setSheetActive("profile");
              handlePresentModalPress();
            }}
          />
          <SavingAccountSummary
            setState={setSheetActive}
            onPress={() => {
              // setSheetActive("simpanan");
              handlePresentModalPress();
            }}
          />
          <CustomBottomSheet
            title="Informasi Profile"
            ref={bottomSheetRef}
            // activeIndex={2}
            snapPointItems={snapPointItems}
            content={
              sheetActive === "profile" ? (
                <ProfileDetail />
              ) : sheetActive === "simpanan" ? (
                <SavingAccountDetail />
              ) : (
                <LoanDetail />
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
