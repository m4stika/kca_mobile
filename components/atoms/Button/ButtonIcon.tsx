import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useThemeContextValues } from "@/themes";
import React from "react";
import { TouchableOpacity } from "react-native";
const colors = require("tailwindcss/colors");

const ButtonIcon = ({ ...rest }) => {
  const colorScheme = useThemeContextValues();
  return (
    <TouchableOpacity {...rest} className="text-error">
      {/* <IconBack width={25} height={25} className="bg-error" /> */}
      <TabBarIcon
        name="chevron-back-circle-outline"
        color={colorScheme.theme === "dark" ? "#f3f4f6" : "#09090b"}
      />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
