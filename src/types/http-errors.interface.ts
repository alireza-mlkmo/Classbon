interface Problem {
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

interface BadRequestError extends Problem {}
interface UnAuthorizedError extends Problem {} //403
interface ValidationError extends Problem {} //400
interface NotFoundError extends Problem {} //404
interface UnHandledExeption extends Problem {} //500
interface NetworkError extends Problem {}

type ApiError =
  | BadRequestError
  | NetworkError
  | NotFoundError
  | UnHandledExeption
  | UnAuthorizedError
  | ValidationError;


export type {
  Problem,
  BadRequestError,
  UnAuthorizedError,
  ValidationError,
  NotFoundError,
  UnHandledExeption,
  NetworkError,
  ApiError
};
