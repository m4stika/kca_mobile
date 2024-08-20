import { cn } from "@/utils/cn";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const LabelWithValue = ({
  title,
  value,
  className,
  valueClassName,
  titleClassName,
  numberOfLine = 2,
}: {
  title: string;
  value: string;
  className?: string;
  valueClassName?: string;
  titleClassName?: string;
  numberOfLine?: number;
}) => (
  <ThemedView className={cn("flex flex-row justify-around", className)}>
    <ThemedText className={cn(`basis-1/3 text-sm text-muted-foreground`, titleClassName)}>
      {title}
    </ThemedText>
    <ThemedText
      className={cn(`text-sm font-pmedium basis-2/3 line-clamp-2 text-right`, valueClassName)}
      numberOfLines={numberOfLine}
    >
      {value}
    </ThemedText>
  </ThemedView>
);

export default LabelWithValue;
