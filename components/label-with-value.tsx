import { Text, View } from "react-native";

const LabelWithValue = ({
  title,
  value,
  valueClassName,
  titleClassName,
}: {
  title: string;
  value: string;
  valueClassName?: string;
  titleClassName?: string;
}) => (
  <View className="flex flex-row items-center justify-around">
    <Text className={`text-sm text-[--disabled-foreground] basis-1/3 ${titleClassName}`}>
      {title}
    </Text>
    <Text
      className={`text-sm font-pmedium basis-2/3 line-clamp-2 text-right text-foreground ${valueClassName}`}
      numberOfLines={2}
    >
      {value}
    </Text>
  </View>
);

export default LabelWithValue;
