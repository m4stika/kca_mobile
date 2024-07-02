import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useGlobalContext } from "@/context/global-provider";
import { cn } from "@/utils/cn";
import React, { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type InputProps = TextInputProps & {
  title?: string;
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
  numberOfLines = 1,
  onFocus,
  onBlur,
  ...otherProps
}: InputProps) => {
  const { theme } = useGlobalContext();
  const [focus, setFocus] = useState<"open" | "close">("close");
  const [showPassword, setShowPassword] = useState(false);

  // const colorScheme = useColorScheme();
  return (
    <ThemedView className={`gap-2 items-start w-full ${className}`}>
      {title && <ThemedText className="w-full">{title}</ThemedText>}
      <View
        className={cn(
          numberOfLines === 1 && "h-14",
          "w-full px-4 rounded-xl flex-row justify-between border border-border",
          focus === "close" ? "border" : "border-2 border-primary",
          containerClassName
        )}
      >
        <TextInput
          onFocus={(e) => {
            setFocus("open");
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setFocus("close");
            onBlur && onBlur(e);
          }}
          className={cn("flex-1 font-psemibold text-base text-foreground", inputClassName)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          onChangeText={onChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...otherProps}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <TabBarIcon name={showPassword ? "eye-outline" : "eye-off-outline"} />
          </TouchableOpacity>
        )}
      </View>
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
