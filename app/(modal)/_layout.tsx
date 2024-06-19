import { Stack } from "expo-router";

const ModalLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="profile-detail"
        options={{
          headerShown: false,
          presentation: "containedModal",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="transaction-info"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
};

export default ModalLayout;
