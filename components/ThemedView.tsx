import { cn } from "@/utils/cn";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = Omit<ViewProps, "style"> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  // style,
  lightColor,
  className,
  darkColor,
  children,
  ...otherProps
}: ThemedViewProps) {
  return (
    <View className={cn(`justify-center items-center`, className)} {...otherProps}>
      {children}
    </View>
  );
}
