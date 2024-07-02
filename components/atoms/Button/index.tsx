import { ThemedText } from "@/components/ThemedText";
import { cn } from "@/utils/cn";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import ButtonIcon from "./ButtonIcon";

type ButtonProps = TouchableOpacityProps & {
  containerClassName?: string;
  textClassName?: string;
  title?: string;
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
  const defaultClassName = "bg-primary rounded-xl justify-center items-center px-3 py-4";
  return type === "icon" ? (
    <ButtonIcon name={name} onPress={onPress} />
  ) : (
    <TouchableOpacity
      className={cn(defaultClassName, containerClassName, isLoading ? "opacity-50" : "")}
      disabled={isLoading}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <ThemedText type="subtitle" inverseColor className={`${textClassName}`}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default Button;
