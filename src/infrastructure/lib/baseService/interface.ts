export interface IResponse<T> {
  data: T | null;
  status: number;
  message: string | string[];
}
