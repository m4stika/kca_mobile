import { useGlobalContext } from "@/context/global-provider";
import { api } from "@/utils/fetching";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

const useDataApi = <T>({
  queryKey,
  url,
  params,
  // pagination = false
}: {
  queryKey: QueryKey;
  url: string;
  params?: unknown;
  // pagination?: boolean
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState<T>();
  const { isLogged } = useGlobalContext();

  const fetchData = async () => {
    // setIsLoading(true);
    const response = await api.get<T>({ url, params });
    if (response.status === "error") {
      // alert(response.message);
      throw new Error(response.message);
    }

    // return (pagination && pagination === true) ? { data: response.data, paging: response.paging } : response.data;
    return { data: response.data, paging: response.paging }
  };

  // if (!isLogged) router.navigate("/sign-in");

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey,
    queryFn: fetchData,
    // initialData: customerList,
    // initialData: () => queryClient.getQueryData([contractTypeQueryKey]),
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

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return { data: data?.data, paging: data?.paging, refetch, isLoading, isFetching, error };
};

export default useDataApi;
