import { useGlobalContext } from "@/context/global-provider";
import { api } from "@/utils/fetching";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

const useDataApi = <T>({
  queryKey,
  url,
  params,
}: {
  queryKey: QueryKey;
  url: string;
  params?: unknown;
}) => {
  const { isLogged } = useGlobalContext();

  const fetchData = async () => {
    const response = await api.get<T>({ url, params });
    if (response.status === "error") {
      // alert(response.message);
      throw new Error(response.message);
    }

    return { data: response.data, paging: response.paging }
  };


  const { data, isLoading, isFetching, error } = useQuery({
    queryKey,
    queryFn: fetchData,
    staleTime: 60000,
    gcTime: 1000 * 1800,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();

  const refetch = (key?: QueryKey) => queryClient.invalidateQueries({ queryKey: key ? key : queryKey });

  if (!isLogged) {
    return { data: data?.data, paging: data?.paging, refetch, isLoading };
  }

  return { data: data?.data, paging: data?.paging, refetch, isLoading, isFetching, error };
};

export default useDataApi;
