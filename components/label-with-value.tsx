import { Text, View } from "react-native";

const LabelWithValue = ({ title, value }: { title: string; value: string }) => (
  <View className="flex flex-row items-center w-fit justify-between">
    <Text className="text-sm text-[--disabled-foreground] basis-1/3">{title}</Text>
    <Text
      className="text-sm font-pmedium basis-2/3 line-clamp-2 text-right text-foreground"
      numberOfLines={2}
    >
      {value}
    </Text>
  </View>
);

export default LabelWithValue;
