type Response<T> = {
  message: string;
} & T;

export type SuccessResponse<T = {}> = Response<T>;
export type ErrorResponse<T = {}> = {
  error: string;
  message: string;
} & T;

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageLimit: number;
};
