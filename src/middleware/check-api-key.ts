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
      throw new authenticationError('api key is missing in request header');
    }

    // validate key
    const user = await User.findOne({
      api_key: apiKey,
    });

    if (!user) {
      throw new authenticationError('Invalid Api Key');
    }

    next();
  } catch (err) {
    next(err);
  }
}
