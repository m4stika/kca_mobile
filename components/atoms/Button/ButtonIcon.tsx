import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useGlobalContext } from "@/context/global-provider";
import React from "react";
import { TouchableOpacity } from "react-native";
const colors = require("tailwindcss/colors");

const ButtonIcon = ({ ...rest }) => {
  // const colorScheme = useThemeContextValues();
  const { theme } = useGlobalContext();
  return (
    <TouchableOpacity {...rest} className="text-error">
      {/* <IconBack width={25} height={25} className="bg-error" /> */}
      <TabBarIcon name="chevron-back-circle-outline" />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
