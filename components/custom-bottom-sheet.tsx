import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { View, useColorScheme } from "react-native";

interface Props {
  title: string;
  activeIndex?: number;
  content?: React.ReactElement;
  snapPointItems?: string[];
}
type Ref = BottomSheetModal;
const CustomBottomSheet = forwardRef<Ref, Props>(
  ({ title, activeIndex = 0, snapPointItems, content }, ref) => {
    const theme = useColorScheme() ?? "light";
    // ref
    // const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => snapPointItems ?? ["25%", "50%", "80%"], [snapPointItems]);

    // callbacks
    // const handleSheetChanges = useCallback((index: number) => {
    //   console.log("handleSheetChanges", index);
    // }, []);

    // backdrop
    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
      []
    );

    // renders
    return (
      <View className="items-center">
        <BottomSheetModal
          ref={ref}
          // onChange={handleSheetChanges}
          snapPoints={snapPoints}
          index={activeIndex}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ backgroundColor: "#D1D5DB" }}
          backgroundStyle={{
            // backgroundColor: theme === "light" ? "#fafafa" : "#18181b",
            // backgroundColor: "#facc15",
            opacity: 60,
          }}
        >
          {/* <BottomSheetScrollView> */}
          {/* <BottomSheetView className="px-4 pt-0 pb-4 border border-border flex flex-row items-center gap-2">
            <TabBarIcon name="close" />
            <Text className="font-psemibold">{title}</Text>
          </BottomSheetView> */}

          <BottomSheetView className="flex-1">{content ? content : title}</BottomSheetView>
          {/* </BottomSheetScrollView> */}
        </BottomSheetModal>
      </View>
    );
  }
);

export default CustomBottomSheet;
