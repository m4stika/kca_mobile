import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import clsx from "clsx";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";

type InputProps = TextInputProps & {
  // placeholder: string;
  // secureTextEntry: boolean;
  // autoCorrect: boolean;
  // onChangeText?: (value: string) => void;
  // value: string;
  title: string;
  containerClassName?: string;
  inputClassName?: string;
};

const Input = ({
  title,
  value,
  onChangeText,
  placeholder,
  containerClassName,
  inputClassName,
  className,
  ...otherProps
}: InputProps) => {
  const [focus, setFocus] = useState("close");
  const [showPassword, setShowPassword] = useState(false);
  const { colorScheme } = useColorScheme();
  return (
    <ThemedView className={`gap-2 items-start w-full ${className}`}>
      <ThemedText className="w-full">{title}</ThemedText>
      <ThemedView
        className={clsx(
          "w-full h-14 px-4 rounded-xl flex-row justify-between",
          focus === "close" ? "border border-border" : "border-2 border-primary",
          containerClassName
        )}
      >
        <TextInput
          onFocus={() => setFocus("open")}
          onBlur={() => setFocus("close")}
          className={clsx("flex-1 font-psemibold text-base text-foreground", inputClassName)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colorScheme === "dark" ? "#52525B" : "#d4d4d8"}
          onChangeText={onChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...otherProps}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <TabBarIcon
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              color={colorScheme === "dark" ? "#f3f4f6" : "#09090b"}
            />
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default Input;
/*
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: colors.disabled,
    paddingBottom: 0,
    fontSize: 16,
    // marginTop: 50,
    paddingHorizontal: 8,
    color: colors.text.default,
  },
}); */
