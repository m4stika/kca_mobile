import { useGlobalContext } from "@/context/global-provider";
import { api } from "@/utils/fetching";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useDataApi = <T>({
  queryKey,
  url,
  params,
}: {
  queryKey: string[];
  url: string;
  params?: unknown;
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

    return response.data;
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

  const refetch = () => queryClient.invalidateQueries({ queryKey });

  if (!isLogged) {
    return { data, refetch, isLoading };
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return { data, refetch, isLoading, isFetching, error };
};

export default useDataApi;
