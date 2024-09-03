import { logo } from "@/assets/images";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Input } from "@/components/atoms";
import { User } from "@/schema/user.schema";
import { api } from "@/utils/fetching";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";

const SignUp = () => {
  const [formRegister, setFormRegister] = useState<User>({} as User);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<User>>();
  const [errorResponse, setErrorResponse] = useState<string>()
  const onInputChange = (fieldName: keyof User, value: string) => {
    setFormRegister((oldValue) => ({ ...oldValue, [fieldName]: value }));
  };

  const validateForm = () => {
    let tempErrors: Partial<User> = {};
    if (!formRegister.memberId) {
      tempErrors = { ...tempErrors, memberId: "Nomor anggota harus diisi" };
    }
    if (!formRegister.NIK) {
      tempErrors = { ...tempErrors, NIK: "NIK harus diisi" };
    }
    if (!formRegister.phone) {
      tempErrors = { ...tempErrors, phone: "No Whatsapp harus diisi" };
    }

    if (!formRegister.username) {
      tempErrors = { ...tempErrors, username: "username harus diisi" };
    }
    if (!formRegister.password) {
      tempErrors = { ...tempErrors, password: "Password harus diisi" };
    }
    tempErrors && setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    setErrorResponse(undefined)
    if (validateForm()) {
      setIsSubmitting(true);
      const { memberId, NIK, username, phone, password } = formRegister;
      const response = await api.post<Omit<User, "fullName" | "name" | "email">, User>({
        url: "register",
        data: { memberId, NIK, phone, password, username },
      });

      if (response.status === "error") {
        // console.log("Error Register", response.message);
        // alert(response.message);
        setErrorResponse(response.message);
        setIsSubmitting(false);
      } else {
        // console.log("Register sukses", JSON.stringify(response.data, undefined, 3));
        setFormRegister({} as User);
        setErrors({});
        setIsSubmitting(false);
        router.navigate("/sign-in")
      }
    }
  };

  return (
    <ScrollView>
      {/* <View className="items-start px-4"> */}
      {/*    <Button type="icon" name="back" onPress={() => router.back()} /> */}
      {/*  </View>  */}
      <View className="w-full px-4 items-center min-h-[85vh]">
        <View className="w-16 h-16 mt-2 rounded-full border items-center justify-center p-2">
          <Image source={logo} className="w-16 h-16" resizeMode="cover" />
        </View>
        {/* <logo width={140} height={100} className="mt-5" /> */}
        <ThemedText type="subtitle" className="text-primary dark:text-primary-dark max-w-xs">
          Pendaftaran Penggunaan Mobile
        </ThemedText>
        <Input
          title="Nomor Induk Kependudukan (NIK)"
          value={formRegister.NIK}
          placeholder="Masukkan nomor induk kependudukan"
          className="mt-5"
          keyboardType="numeric"
          onChangeText={(value) => onInputChange("NIK", value)}
        />
        {errors && errors.NIK ? (
          <ThemedText className="text-error dark:text-error-dark">{errors.NIK}</ThemedText>
        ) : null}
        <Input
          title="Nomor Anggota"
          value={formRegister.memberId}
          placeholder="Masukkan No anggota"
          className="mt-5"
          onChangeText={(value) => onInputChange("memberId", value)}
        />
        {errors && errors.memberId ? (
          <ThemedText className="text-error dark:text-error-dark">{errors.memberId}</ThemedText>
        ) : null}
        <Input
          title="Nomor Whatsapp"
          value={formRegister.phone}
          placeholder="Masukkan Nomor Whatsapp"
          className="mt-5"
          keyboardType="numeric"
          onChangeText={(value) => onInputChange("phone", value)}
        />
        {errors && errors.phone ? (
          <ThemedText className="text-error dark:text-error-dark">{errors.phone}</ThemedText>
        ) : null}
        <Input
          title="Username"
          value={formRegister.username}
          placeholder="Masukkan username"
          className="mt-5"
          onChangeText={(value) => onInputChange("username", value)}
        />
        {errors && errors.username ? (
          <ThemedText className="text-error dark:text-error-dark">{errors.username}</ThemedText>
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
          textClassName="text-xl"
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
        <View>
          <ThemedText type="error">{errorResponse}</ThemedText>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
