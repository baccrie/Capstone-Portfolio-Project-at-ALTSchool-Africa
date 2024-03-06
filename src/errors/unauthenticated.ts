import customApiError from './custom-error';

import { StatusCodes } from 'http-status-codes';

export default class UnauthenticatedError extends customApiError {
  statusCode: StatusCodes;

  constructor(msg: string) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
