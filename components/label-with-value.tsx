import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

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
  <ThemedView className="flex flex-row justify-around">
    <ThemedText className={`basis-1/3 text-sm text-disabled-foreground ${titleClassName}`}>
      {title}
    </ThemedText>
    <ThemedText
      className={`text-sm font-pmedium basis-2/3 line-clamp-2 text-right text-foreground ${valueClassName}`}
      numberOfLines={numberOfLine}
    >
      {value}
    </ThemedText>
  </ThemedView>
);

export default LabelWithValue;
