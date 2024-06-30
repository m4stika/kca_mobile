import { Stack } from "expo-router";

const ModalLayout = () => {
  return (
    <Stack screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="profile-detail" />
      <Stack.Screen name="transaction-info" />
      <Stack.Screen name="shopping-cart" options={{ gestureEnabled: false }} />
    </Stack>
  );
};

export default ModalLayout;
