import customApiError from './custom-error';

import { StatusCodes } from 'http-status-codes';

export default class UnauthenticatedError extends customApiError {
  constructor(msg: string, statusCode: number) {
    super(msg, statusCode);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
