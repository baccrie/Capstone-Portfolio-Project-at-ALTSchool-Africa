import customApiError, { CustomError } from '../errors/custom-error';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof customApiError) {
    return res.status(error.statusCode).json({
      status: 'failed',
      msg: error.message,
    });
  }

  console.log(error);
  res.status(500).json({
    status: 'failed',
    msg: 'Oops an error occured!!',
  });
}
