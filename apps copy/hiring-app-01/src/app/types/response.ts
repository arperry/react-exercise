type SuccessResponse<T> = {
  ok: true;
  data: T;
};

type ErrorResponse = {
  ok: false;
  data: { error: string };
};

type Response<T> = SuccessResponse<T> | ErrorResponse;

const isSuccessResponse = <T>(res: Response<T>): res is SuccessResponse<T> => {
  return res.ok;
};

const isErrorResponse = <T>(res: Response<T>): res is ErrorResponse => {
  return !res.ok;
};

export {
  Response,
  isErrorResponse,
  isSuccessResponse,
  SuccessResponse,
  ErrorResponse,
};
