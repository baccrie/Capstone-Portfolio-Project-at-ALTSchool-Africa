// import { Request, Response, NextFunction } from 'express';
// import authenticationError from '../errors/unauthenticated';

// export default async function checkSuperUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     if (req.user.is_superUser) {
//       return next();
//     }

//     throw new authenticationError(
//       'Only Super Users are allowed to perform operation',
//       401
//     );
//   } catch (err) {
//     next(err);
//   }
// }
