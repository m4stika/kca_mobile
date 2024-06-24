import { Stack } from "expo-router";

const ModalLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile-detail"
        options={{
          headerShown: false,
        }}
        // initialParams={{open, setOpen}}
      />
      <Stack.Screen name="transaction-info" options={{ headerShown: true }} />
      <Stack.Screen name="shopping-chart" options={{ headerShown: true }} />
    </Stack>
  );
};

export default ModalLayout;
