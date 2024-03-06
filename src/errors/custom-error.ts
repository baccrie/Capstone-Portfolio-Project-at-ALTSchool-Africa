export interface CustomError extends Error {
  message: string;
  statusCode: number;
}

export default class customApiError extends Error {
  statusCode!: number;
  constructor(message: string) {
    super(message);
  }
}
