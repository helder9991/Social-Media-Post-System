import { NextFunction, Request, Response } from 'express';
import { AppError } from '../util/AppError';

export default function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      mensagem: err.message,
    });
  }
  console.log(err);

  return res.status(500).json({
    mensagem: 'Internal Server error',
  });
}
