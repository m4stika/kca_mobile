import { logo } from "@/assets/images";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, Input } from "@/components/atoms";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useGlobalContext } from "@/context/global-provider";
import { User } from "@/schema/user.schema";
import { api } from "@/utils/fetching";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUp = () => {
  const [formRegister, setFormRegister] = useState<User>({} as User);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<User>>();
  const [errorResponse, setErrorResponse] = useState<string>()
  const [isPhoneValid, setPhoneValid] = useState(false)
  const onInputChange = (fieldName: keyof User, value: string) => {
    if (fieldName === "phone" && isPhoneValid) setPhoneValid(false)
    setFormRegister((oldValue) => ({ ...oldValue, [fieldName]: value }));
  };

  const { theme } = useGlobalContext()

  let tempErrors: Partial<User> = {};
  const validateForm = () => {
    if (!formRegister.memberId) {
      tempErrors = { ...tempErrors, memberId: "Nomor anggota harus diisi" };
    }
    if (!formRegister.NIK) {
      tempErrors = { ...tempErrors, NIK: "NIK harus diisi" };
    }
    if (!formRegister.phone) {
      tempErrors = { ...tempErrors, phone: "No Whatsapp harus diisi" };
    }
    if (!isPhoneValid) {
      tempErrors = { ...tempErrors, phone: "No Whatsapp belum divalidasi" }
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

  const whatsappValidate = async () => {
    const result = await api.get<boolean>({ url: `isValidPhoneNumber/${formRegister.phone}` })
    if (result.status === "error") {
      setPhoneValid(false)
      Alert.alert("Invalid Phone Number", result.message, [{ text: "OK" }])
    }
    else {
      setPhoneValid(result.data)
      delete tempErrors['phone']
    }
  }

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
        <View className="flex flex-row w-full gap-2 items-end ">
          <Input
            title="Nomor Whatsapp"
            value={formRegister.phone}
            placeholder="Masukkan Nomor Whatsapp"
            className="mt-5 basis-2/3"
            keyboardType="numeric"
            onChangeText={(value) => onInputChange("phone", value)}
          />
          {!isPhoneValid ?
            <Button
              title="Validate"
              containerClassName="basis-1/3 h-14 bg-warning"
              textClassName="text-sm"
              onPress={whatsappValidate}
            />
            : <TabBarIcon name="checkmark" color={theme.colors.primary} className="self-center mt-10" />
          }
        </View>
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
