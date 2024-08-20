import clsx from "clsx";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import ButtonIcon from "./atoms/Button/ButtonIcon";
import { cn } from "@/utils/cn";

type ButtonProps = TouchableOpacityProps & {
  containerClassName?: string;
  textClassName?: string;
  title?: string;
  // onPress: any;
  type?: string;
  name?: string;
  isLoading?: boolean;
};
//  & Record<string, string | boolean | Function>;

const Button = ({
  title,
  onPress,
  name,
  type,
  containerClassName,
  textClassName,
  isLoading = false,
  ...props
}: ButtonProps) => {
  /* const bgColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text"); */

  // const combineStyles = StyleSheet.flatten([styles.wrapper, style]);
  const defaultStyles = "bg-primary rounded-md justify-center items-center p-3";
  return type === "icon" ? (
    <ButtonIcon name={name} onPress={onPress} />
  ) : (
    <TouchableOpacity
      // style={{backgroundColor: bgColor}}
      className={cn(defaultStyles, containerClassName, isLoading ? "opacity-50" : "")}
      disabled={isLoading}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <Text className={`font-psemibold ${textClassName}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
/*
const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingVertical: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.dark,
    textAlign: 'center',
  },
});
 */
