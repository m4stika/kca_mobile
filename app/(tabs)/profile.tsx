import CustomBottomSheet from "@/components/custom-bottom-sheet";
import ProfileDetail from "@/components/profile-detail";
import ProfileHeader from "@/components/profile-header";
import ProfileSummaryInfo from "@/components/profile-sumary-info";
import { useGlobalContext } from "@/context/global-provider";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, member } = useGlobalContext();
  // const { dismiss } = useBottomSheetModal();
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

  return (
    <SafeAreaView className="h-full">
      {/* <View className="flex"> */}
      <ProfileHeader />
      <ProfileSummaryInfo onPress={handlePresentModalPress} />
      <CustomBottomSheet
        title="Informasi Profile"
        ref={bottomSheetRef}
        // activeIndex={2}
        snapPointItems={["80%"]}
        content={<ProfileDetail />}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Profile;
