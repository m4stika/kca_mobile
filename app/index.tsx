import { Redirect } from "expo-router";

export default function Index() {
  // const { isLogged, isLoading } = useGlobalContext();

  // if (isLogged && !isLoading) return <Redirect href={"/home"} />;
  return <Redirect href="/welcome" />;
}
