import { Request, Response, NextFunction } from 'express';
import authenticationError from '../errors/unauthenticated';
import User from '../models/user';

export default async function checkSuperUser(
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
    const user = await User.findOne({
      api_key: apiKey,
    });

    if (!user) {
      throw new authenticationError('Invalid Api Key', 401);
    }

    if (!user.is_superUser) {
      throw new authenticationError(
        'Oops! only super users can perform this operation',
        401
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}
