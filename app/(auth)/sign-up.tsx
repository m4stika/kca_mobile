import { RegisterImage } from "@/assets/svgs";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Input } from "@/components/atoms";
import { User } from "@/schema/user.schema";
import { api } from "@/utils/fetching";
import { Link } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [formRegister, setFormRegister] = useState<User>({} as User);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<User>>();
  const onInputChange = (fieldName: keyof User, value: string) => {
    setFormRegister((oldValue) => ({ ...oldValue, [fieldName]: value }));
  };

  const validateForm = () => {
    let tempErrors: Partial<User> = {};
    if (!formRegister.fullName) {
      tempErrors = { ...tempErrors, fullName: "FullName required" };
    }
    if (!formRegister.email) {
      tempErrors = { ...tempErrors, email: "Email is required" };
    }
    if (!formRegister.password) {
      tempErrors = { ...tempErrors, password: "Password is required" };
    }
    tempErrors && setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      const { fullName, email, password } = formRegister;
      const response = await api.post<Omit<User, "fullName">, User>({
        url: "register",
        data: { name: fullName, email, password, username: email },
      });

      if (response.status === "error") {
        // console.log("Error Register", response.message);
        alert(response.message);
        // setErrorResponse(response.message);
        setIsSubmitting(false);
      } else {
        console.log("Register sukses", JSON.stringify(response.data, undefined, 3));
        setFormRegister({} as User);
        setErrors({});
        setIsSubmitting(false);
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
          <RegisterImage width={140} height={100} className="mt-5" />
          <ThemedText type="title" className="text-primary dark:text-primary-dark mt-5 max-w-xs">
            Anggota Baru
          </ThemedText>
          <Input
            title="Nama Lengkap"
            value={formRegister.fullName}
            placeholder="Masukkan nama lengkap"
            className="mt-5"
            onChangeText={(value) => onInputChange("fullName", value)}
          />
          {errors && errors.fullName ? (
            <ThemedText className="text-error dark:text-error-dark">{errors.fullName}</ThemedText>
          ) : null}
          <Input
            title="Email"
            value={formRegister.email}
            placeholder="Masukkan alamat email"
            className="mt-5"
            onChangeText={(value) => onInputChange("email", value)}
          />
          {errors && errors.email ? (
            <ThemedText className="text-error dark:text-error-dark">{errors.email}</ThemedText>
          ) : null}
          <Input
            title="Password"
            value={formRegister.password}
            placeholder="Masukkan password"
            className="mt-5"
            onChangeText={(value) => onInputChange("password", value)}
          />
          {errors && errors.password ? (
            <ThemedText className="text-error dark:text-error-dark">{errors.password}</ThemedText>
          ) : null}
          <Button
            title="Daftar"
            containerClassName="w-full mt-7"
            onPress={handleSubmit}
            isLoading={isSubmitting}
          />
          <ThemedView className="w-full pt-5 flex-row gap-2">
            <ThemedText>Sudah punya akun?</ThemedText>
            <Link
              href={"/sign-in"}
              className="text-base font-psemibold text-primary dark:text-primary-dark"
            >
              Masuk
            </Link>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
