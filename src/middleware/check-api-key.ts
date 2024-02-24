import { Request, Response, NextFunction } from 'express';
import authenticationError from '../errors/unauthenticated';
import User, { IUser } from '../models/user';

export default async function checkApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiKey = req.headers.apikey;

    if (!apiKey) {
      throw new authenticationError(
        'api key is missing in request header',
        401
      );
    }

    // validate key
    const check = await User.findOne({
      api_key: apiKey,
    });

    if (!check) {
      throw new authenticationError('Invalid Api Key', 401);
    }
    next();
  } catch (err) {
    next(err);
  }
}
