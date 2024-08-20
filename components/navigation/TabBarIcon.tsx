// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { useGlobalContext } from "@/context/global-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
// import  from "@expo/vector-icons/Ant"

export function TabBarIcon({
  className,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  const { theme } = useGlobalContext();
  return (
    // <Ionicons size={28} style={[{ marginBottom: -3 }, style]} className={className} {...rest} />
    <Ionicons size={28} className={className} color={theme.colors.text} {...rest} />
  );
}
