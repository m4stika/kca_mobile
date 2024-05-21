async function request<T>(url: string, config: RequestInit, params?: any): Promise<ApiResponse<T>> {
  const init: RequestInit = {
    credentials: "include",
    ...config,
  };

  const regex = /(^[/]|[/]$)/g;
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  // const urlRegex = url.replace(regex, "");
  const urlRegex = url.replace(regex, "");
  const baseUrlRegex = baseUrl?.replace(regex, "");
  let fullUrl = `${baseUrlRegex}/${urlRegex}`;

  // let fullUrl = `${baseUrl}/${urlRegex}`;
  if (params) {
    const initParams = new URLSearchParams(params);
    // fullUrl += `${urlRegex}/?${initParams}`;
    fullUrl += `/?${initParams}`;
  }

  const requestHttp = new Request(fullUrl, init);

  const response = await fetch(requestHttp);

  return response.json();
}
type ContentType = "multipart/form-data" | "application/json";
type RequestProps<T> = {
  url: string;
  data: T;
  config?: RequestInit;
  params?: any;
  contentType?: ContentType;
  getFromBuffer?: boolean;
};

export const api = {
  get: <TData>({ url, config, params }: Omit<RequestProps<TData>, "data">) => {
    const init = { method: "GET", ...config };
    return request<TData>(url, init, params);
  },

  post: <TData, TResponse>({ url, data, config, params }: RequestProps<TData>) => {
    const init: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      ...config,
    };
    return request<TResponse>(url, init, params);
  },

  put: <TData, TResponse>({ url, data, config, params }: RequestProps<TData>) => {
    const init: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      ...config,
    };
    return request<TResponse>(url, init, params);
  },

  patch: <TData, TResponse>({ url, data, config, params }: RequestProps<TData>) => {
    const init: RequestInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      ...config,
    };
    return request<TResponse>(url, init, params);
  },

  delete: <TData>(url: string, config?: RequestInit) => {
    const init = { method: "DELETE", ...config };
    return request<TData>(url, init);
  },
};
