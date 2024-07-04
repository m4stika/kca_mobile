import { DarkTheme, DefaultTheme, ThemeProps } from "@/constants/Colors";
import { Member } from "@/schema/member.schema";
import { Order, orderInitialValue } from "@/schema/order.schema";
import { Product } from "@/schema/product.schema";
import { User } from "@/schema/user.schema";
import { StatusBarTheme } from "@/themes/theme-config";
import { api } from "@/utils/fetching";
import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
// import { useColorScheme as useColorSchemeWind } from "nativewind";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ViewProps, useColorScheme } from "react-native";

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
  theme: ThemeProps;
  user?: User | null;
  member?: Member | null;
  isLogged: boolean;
  isLoading: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUserActive: Dispatch<SetStateAction<User | null>>;
  setMember: Dispatch<SetStateAction<Member | null>>;
  // setOrderCount: Dispatch<SetStateAction<number>>;
  error?: string;
  orderCount: number;
  orderAmount: number;
  // orderHasChanged: boolean;
  // setOrderHasChange: Dispatch<SetStateAction<boolean>>;
  order: Order;
  productSelected?: Product | undefined;
  setOrder: Dispatch<SetStateAction<Order>>;
  setProductSelected: Dispatch<SetStateAction<Product | undefined>>;
  orderSelected?: Order | undefined;
  setOrderSelected: Dispatch<SetStateAction<Order | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
};
const GlobalContext = createContext<ContextProps>({
  theme: DefaultTheme,
  isLoading: true,
  isLogged: false,
  setLoggedIn: () => false,
  setUserActive: () => null,
  setMember: () => null,
  // setOrderCount: () => 0,
  setOrder: () => undefined,
  orderCount: 0,
  orderAmount: 0,
  // orderHasChanged: false,
  // setOrderHasChange: () => false,
  order: orderInitialValue,
  setProductSelected: () => undefined,
  setOrderSelected: () => undefined,
  reset: () => undefined,
  setIsLoading: () => false,
});
export const useGlobalContext = () => useContext(GlobalContext);

/* export const resolveTheme = (colorScheme: ThemesVariant) => ({
  dark: colorScheme === "dark",
  colors: ThemeColors[colorScheme],
}); */

export function GlobalProvider({ children }: ViewProps) {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [orderChange, setOrderChange] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [order, setOrder] = useState<Order>(orderInitialValue);
  const [productSelected, setProductSelected] = useState<Product | undefined>();
  const [orderSelected, setOrderSelected] = useState<Order | undefined>();
  const [theme, setTheme] = useState<ThemeProps>(DefaultTheme);
  const [error, setError] = useState<string>();
  const colorScheme = useColorScheme();
  // const schemaWind = useColorSchemeWind();

  useEffect(() => {
    // setTheme(() => (colorScheme === "dark" ? DarkTheme : DefaultTheme));
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

  useEffect(() => {
    setTheme(() => (colorScheme === "dark" ? DarkTheme : DefaultTheme));
    // console.log(schemaWind.colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    if (order.OrderDetail.length === 0) {
      order.amount = 0;
    }
  }, [order]);

  const reset = () => {
    setIsLogged(false);
    setOrder(orderInitialValue);
    setProductSelected(undefined);
    setProductSelected(undefined);
    setMember(null);
    setUser(null);
  };

  return (
    <ThemeProvider value={theme}>
      <GlobalContext.Provider
        value={{
          // theme: colorScheme === "dark" ? DarkTheme : DefaultTheme,
          theme,
          user,
          member,
          isLogged,
          isLoading,
          error,
          orderCount: order.OrderDetail.length,
          order,
          orderAmount: order.amount,
          setLoggedIn: setIsLogged,
          setUserActive: setUser,
          setMember: setMember,
          setOrder: setOrder,
          productSelected,
          setProductSelected,
          orderSelected,
          setOrderSelected,
          reset,
          setIsLoading,
        }}
      >
        {children}
        <StatusBar
          style="light"
          // style={StatusBarTheme[colorScheme ?? "light"].style}
          backgroundColor={StatusBarTheme[colorScheme ?? "light"].background}
        />
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}
