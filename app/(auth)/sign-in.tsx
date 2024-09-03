import { LoginImage } from "@/assets/svgs";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Input } from "@/components/atoms";
import { useGlobalContext } from "@/context/global-provider";
import { User } from "@/schema/user.schema";
import { api } from "@/utils/fetching";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserLogin = Omit<User, "fullName" | "email" | "name" | "memberId" | "NIK" | "phone">;
const SignIn = () => {
  const [formLogin, setFormLogin] = useState<UserLogin>({
    username: "1212",
    password: "1212",
  } as UserLogin);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<UserLogin>>();
  const [errorResponse, setErrorResponse] = useState<string>();
  const { setLoggedIn, setUserActive } = useGlobalContext();

  const onInputChange = (fieldName: keyof UserLogin, value: string) => {
    setFormLogin((oldValue) => ({ ...oldValue, [fieldName]: value }));
  };

  const validateForm = () => {
    let tempErrors: Partial<UserLogin> = {};
    if (!formLogin.username) {
      tempErrors = { ...tempErrors, username: "Username/member-id/phone-No is required" };
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
        // alert(response.message);
        setErrorResponse(response.message);
        setIsSubmitting(false);
      } else {
        // console.log("Login sukses", JSON.stringify(response.data, undefined, 3));
        // setFormLogin({} as UserLogin);
        // setErrors({});
        setLoggedIn(true);
        setIsSubmitting(false);
        setUserActive(response.data);
        router.replace("/home");
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <View className="items-start px-4">
          <Button type="icon" name="back" onPress={() => router.back()} />
        </View> */}
        <ThemedView className="w-full px-4 items-start min-h-[85vh]">
          <LoginImage width={140} height={100} className="mt-5" />
          <ThemedText type="title" className="text-primary mt-5 max-w-xs">
            Login Anggota
          </ThemedText>
          <Input
            title="Username / No. Anggota / Phone Number"
            // inputMode="email"
            value={formLogin.username}
            placeholder="masukkan username"
            className="mt-7"
            // inputClassName="focus-visible:border-none focus:border-none focus:ring-2 focus:ring-error"
            onChangeText={(value) => onInputChange("username", value)}
            onFocus={() => setErrorResponse(undefined)}
          />
          {errors && errors.username ? (
            <ThemedText type="error">{errors.username}</ThemedText>
          ) : null}
          <Input
            title="Password"
            value={formLogin.password}
            placeholder="Password anda"
            className="mt-7"
            onFocus={() => setErrorResponse(undefined)}
            onChangeText={(value) => onInputChange("password", value)}
          />
          {errors && errors.password ? (
            <ThemedText type="error">{errors.password}</ThemedText>
          ) : null}

          <ThemedView className="w-full flex items-center pt-7">
            {errorResponse ? <ThemedText type="error">{errorResponse}</ThemedText> : null}
            <Button
              title="Masuk"
              containerClassName="w-full"
              textClassName="text-xl"
              onPress={handleSubmit}
              isLoading={isSubmitting}
            />
          </ThemedView>
          <ThemedView className="w-full pt-5 flex-row gap-2">
            <ThemedText>Tidak memiliki akun?</ThemedText>
            <Link
              href={"/sign-up"}
              className="text-base font-psemibold text-primary dark:text-primary-dark active:text-xl"
            >
              Daftar
            </Link>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
