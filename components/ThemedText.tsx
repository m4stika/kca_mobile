import { cn } from "@/utils/cn";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = Omit<TextProps, "style"> & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "error";
  textClassName?: TextProps["className"];
  inverseColor?: boolean;
};

export function ThemedText({
  // style,
  className,
  lightColor,
  darkColor,
  type = "default",
  children,
  inverseColor = false,
  ...otherProps
}: ThemedTextProps) {
  return (
    <Text
      className={cn(
        // "bg-background text-foreground",
        type === "error"
          ? "text-error font-psemibold p-3"
          : inverseColor
          ? "text-paper"
          : "text-foreground",
        className,
        type === "default"
          ? "text-base"
          : type === "defaultSemiBold"
          ? "text-base font-psemibold"
          : type === "title"
          ? "text-2xl font-pbold"
          : type === "subtitle"
          ? "text-md font-psemibold"
          : "text-base leading-7",
        className
      )}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
