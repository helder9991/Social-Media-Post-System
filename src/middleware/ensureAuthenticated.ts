import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import { AppError } from '../util/AppError';

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing.', 401);

  const [, token] = authHeader.split(' ');
  const decoded = verify(token, authConfig.jwt.secret);

  const { sub } = decoded;

  if (typeof (sub) === 'string') {
    req.user = {
      id: sub,
    };
  }

  next();
}
