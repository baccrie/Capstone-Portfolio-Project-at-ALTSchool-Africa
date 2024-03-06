import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import genApiKey from '../utils/generate-api-key';
import bcrypt from 'bcryptjs';
import BadRequestError from '../errors/bad-request';

import signUpSchema from '../validation/user';

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = signUpSchema.validate(req.body);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const { username, email, password } = req.body;

    // check if user exists
    const checkUser = await User.findOne({
      email,
    });

    if (checkUser) {
      throw new BadRequestError('User with email already exists.');
    }

    // hash password and gen api-key
    const apiKey = genApiKey();
    const salt = await bcrypt.genSalt(12);
    const hashedPasskey = await bcrypt.hash(password, salt);

    // create new User
    const newUser = await User.create({
      username,
      email,
      password: hashedPasskey,
      api_key: apiKey,
    });

    res.status(201).json({
      status: 'success',
      msg: `welcome on board dev ${username} below is your apiKey, please keep it safe.`,
      api_key: apiKey,
    });
  } catch (err) {
    next(err);
  }
}
