declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "*.png";
declare module "*.jpg";

type Paging = {
  totalRows: number;
  totalPages: number;
  rowPerPage: number;
  page: number;
  previous: number;
  next: number;
  hasMore: boolean;
  summary?: unknown;
};

type ErrorResponse = {
  status: "error";
  statusCode: number;
  errorType: "error" | "schema" | "unknown";
  message: string;
  issues?: unknown;
  tokenExpired: boolean;
};

type SuccessResponse = {
  status: "success";
  statusCode: number;
  data: T;
  paging?: Paging;
};

type ApiResponse<T> =
  | {
    status: "success";
    statusCode: number;
    data: T;
    paging?: Paging;
  }
  | ErrorResponse;
