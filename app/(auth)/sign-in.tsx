import { LoginImage } from "@/assets/svgs";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Input } from "@/components/atoms";
import { useGlobalContext } from "@/context/global-provider";
import { User } from "@/schema/user.schema";
import { api } from "@/utils/fetching";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserLogin = Omit<User, "fullName" | "email" | "name">;
const SignIn = () => {
  const [formLogin, setFormLogin] = useState<UserLogin>({} as UserLogin);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<UserLogin>>();
  const [errorResponse, setErrorResponse] = useState<string>();
  const { setLoggedIn } = useGlobalContext();

  const onInputChange = (fieldName: keyof UserLogin, value: string) => {
    setFormLogin((oldValue) => ({ ...oldValue, [fieldName]: value }));
  };

  const validateForm = () => {
    let tempErrors: Partial<UserLogin> = {};
    if (!formLogin.username) {
      tempErrors = { ...tempErrors, username: "Username/Email is required" };
    }
    if (!formLogin.password) {
      tempErrors = { ...tempErrors, password: "Password is required" };
    }
    tempErrors && setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      const { username, password } = formLogin;
      const response = await api.post<UserLogin, User>({
        url: "login",
        data: { username, password },
      });

      if (response.status === "error") {
        // console.log("Error Login", response.message);
        alert(response.message);
        setErrorResponse(response.message);
        setIsSubmitting(false);
      } else {
        // console.log("Login sukses", JSON.stringify(response.data, undefined, 3));
        // setFormLogin({} as UserLogin);
        // setErrors({});
        setLoggedIn(true);
        setIsSubmitting(false);
        router.replace("/home");
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="items-start px-4">
          <Button type="icon" name="back" onPress={() => router.back()} />
        </View>
        <ThemedView className="w-full px-4 items-start min-h-[85vh]">
          <LoginImage width={140} height={100} className="mt-5" />
          <ThemedText type="title" className="text-primary dark:text-primary-dark mt-5 max-w-xs">
            Log in to KCA
          </ThemedText>
          <Input
            title="Email/member-id/phone"
            // inputMode="email"
            value={formLogin.username}
            placeholder="email/member-id/phone-number"
            className="mt-7"
            inputClassName="focus-visible:border-none focus:border-none focus:ring-2 focus:ring-error"
            onChangeText={(value) => onInputChange("username", value)}
          />
          {errors && errors.username ? (
            <ThemedText className="text-error dark:text-error-dark">{errors.username}</ThemedText>
          ) : null}
          <Input
            title="Password"
            value={formLogin.password}
            placeholder="Enter your password"
            className="mt-7"
            onChangeText={(value) => onInputChange("password", value)}
          />
          {errors && errors.password ? (
            <ThemedText className="text-error dark:text-error-dark">{errors.password}</ThemedText>
          ) : null}
          <Button
            title="Sign In"
            containerClassName="w-full mt-7"
            onPress={handleSubmit}
            isLoading={isSubmitting}
          />
          <ThemedView className="w-full pt-5 flex-row gap-2">
            <ThemedText className="cursor-pointer">Don't have acoount?</ThemedText>
            <Link
              href={"/sign-up"}
              className="text-base font-psemibold text-primary dark:text-primary-dark active:text-xl"
            >
              Sign Up
            </Link>
          </ThemedView>
          {/* {errorResponse ? (
            <ThemedText className="text-error dark:text-error-dark">{errorResponse}</ThemedText>
          ) : null} */}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
