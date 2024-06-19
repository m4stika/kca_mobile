import { api } from "@/utils/fetching";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useDataApi = <T>({ url, params }: { url: string; params?: unknown }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();

  const fetchData = async () => {
    setIsLoading(true);
    const response = await api.get<T>({ url });
    if (response.status === "error") Alert.alert("Error", response.message);
    else setData(response.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, refetch, isLoading };
};

export default useDataApi;
