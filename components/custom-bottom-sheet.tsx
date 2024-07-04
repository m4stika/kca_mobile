import { useGlobalContext } from "@/context/global-provider";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { View } from "react-native";

interface Props {
  title: string;
  activeIndex?: number;
  content?: React.ReactElement;
  snapPointItems?: string[];
}
type Ref = BottomSheetModal;
const CustomBottomSheet = forwardRef<Ref, Props>(
  ({ title, activeIndex = 0, snapPointItems, content }, ref) => {
    const { theme } = useGlobalContext();
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
      <View className="items-center ">
        <BottomSheetModal
          ref={ref}
          // onChange={handleSheetChanges}
          snapPoints={snapPoints}
          index={activeIndex}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ backgroundColor: theme.colors.textMuted }}
          backgroundStyle={{ backgroundColor: theme.colors.card }}
        >
          <BottomSheetView className="flex-1 px-2 bg-paper">
            {content ? content : title}
          </BottomSheetView>
          {/* </BottomSheetScrollView> */}
        </BottomSheetModal>
      </View>
    );
  }
);

export default CustomBottomSheet;
