import { api } from "./fetching";

export const logout = async () => {
  const response = await api.post({ url: "logout", data: {} });
  return response.status === "error";
};
