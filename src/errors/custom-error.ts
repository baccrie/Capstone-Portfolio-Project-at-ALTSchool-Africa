export interface CustomError extends Error {
  message: string;
  statusCode: number;
}

export default class customApiError extends Error {
  statusCode: number;
  message: any;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// const createCustomError = (message, STAUS) => {
//   return new customApiError(message, STAUS);
// };
