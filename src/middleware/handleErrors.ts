import { NextFunction, Request, Response } from 'express';
import { AppError } from '../util/AppError';
import { deleteImageFromS3 } from '../util/deleteImageFromS3';

export default function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response {
  if (req.file) {
    deleteImageFromS3(req.file.key)
  }


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
