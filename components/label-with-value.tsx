import { Text, View } from "react-native";

const LabelWithValue = ({
  title,
  value,
  valueClassName,
  titleClassName,
  numberOfLine = 2,
}: {
  title: string;
  value: string;
  valueClassName?: string;
  titleClassName?: string;
  numberOfLine?: number;
}) => (
  <View className="flex flex-row items-center justify-around">
    <Text
      className={`text-sm text-[--disabled-foreground] dark:text-foreground basis-1/3 ${titleClassName}`}
    >
      {title}
    </Text>
    <Text
      className={`text-sm font-pmedium basis-2/3 line-clamp-2 text-right text-foreground ${valueClassName}`}
      numberOfLines={numberOfLine}
    >
      {value}
    </Text>
  </View>
);

export default LabelWithValue;
