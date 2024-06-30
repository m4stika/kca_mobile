import { api } from "./fetching";

export const logout = async () => {
  const response = await api.post({ url: "logout", data: {} });
  if ((response.statusCode = 401)) return true;
  return response.status === "error";
};
