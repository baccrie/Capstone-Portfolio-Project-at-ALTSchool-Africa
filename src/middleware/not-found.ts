import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    status: 'failed',
    msg: 'route not found....',
  });
}
