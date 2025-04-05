export type Response<T> = {
  message: string;
} & T;

export type SuccessResponse<T> = Response<T>;
export type ErrorResponse<T> = Response<T>;
