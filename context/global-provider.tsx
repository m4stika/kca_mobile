import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import { Member } from "@/schema/member.schema";
import { Order } from "@/schema/order.schema";
import { User } from "@/schema/user.schema";
import { StatusBarTheme } from "@/themes/theme-config";
import { api } from "@/utils/fetching";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ViewProps } from "react-native";

export default async function isAuthenticated() {
  const responseApi = await api.get<User>({
    // url: "https://api.kdabali.site/api/user/verified-user",
    url: "isAuthenticated",
  });
  // console.log("responseApi", responseApi);
  if (responseApi.status === "error") {
    return responseApi.message;
  }
  return responseApi.data;
}

// type ThemesVariant = "light" | "dark";
type ContextProps = {
  theme: Theme;
  user?: User | null;
  member?: Member | null;
  isLogged: boolean;
  isLoading: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUserActive: Dispatch<SetStateAction<User | null>>;
  setMember: Dispatch<SetStateAction<Member | null>>;
  setOrderCount: Dispatch<SetStateAction<number>>;
  error?: string;
  orderCount: number;
  orders?: Order[];
};
const GlobalContext = createContext<ContextProps>({
  theme: DefaultTheme,
  isLoading: true,
  isLogged: false,
  setLoggedIn: () => false,
  setUserActive: () => null,
  setMember: () => null,
  setOrderCount: () => 0,
  orderCount: 0,
});
export const useGlobalContext = () => useContext(GlobalContext);

/* export const resolveTheme = (colorScheme: ThemesVariant) => ({
  dark: colorScheme === "dark",
  colors: ThemeColors[colorScheme],
}); */

export function GlobalProvider({ children }: ViewProps) {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [theme, setTheme] = useState<Theme>(DefaultTheme);
  const [error, setError] = useState<string>();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    setTheme(() => (colorScheme === "dark" ? DarkTheme : DefaultTheme));
    setIsLogged(false);

    //get user active
    setIsLoading(true);
    isAuthenticated()
      .then((res) => {
        if (typeof res === "string") setError(res);
        else {
          setIsLogged(true);
          setUser(res);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme: colorScheme === "dark" ? DarkTheme : DefaultTheme,
        user,
        member,
        isLogged,
        isLoading,
        error,
        orderCount,
        setLoggedIn: setIsLogged,
        setUserActive: setUser,
        setMember: setMember,
        setOrderCount: setOrderCount,
      }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* <View className={"pb-2"}>				</View> */}
        {children}
      </ThemeProvider>
      <StatusBar
        style={StatusBarTheme[colorScheme ?? "light"].style}
        backgroundColor={StatusBarTheme[colorScheme ?? "light"].background}
      />
    </GlobalContext.Provider>
  );
}
