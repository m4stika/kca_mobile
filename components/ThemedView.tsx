import clsx from "clsx";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = Omit<ViewProps, "style"> & {
  lightColor?: string;
  darkColor?: string;
  containerClassName?: string;
};

export function ThemedView({
  // style,
  lightColor,
  className,
  darkColor,
  children,
  containerClassName,
  ...otherProps
}: ThemedViewProps) {
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    // <View style={{ backgroundColor }} className={`justify-center items-center`} {...otherProps}>
    <View
      className={clsx(`justify-center items-center`, className, containerClassName)}
      {...otherProps}
    >
      {children}
    </View>
  );
}
