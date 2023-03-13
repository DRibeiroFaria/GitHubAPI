import { Request, Response, NextFunction } from 'express';
import { UnsupportedAcceptError } from '../errors/customErrors';

/**
 * This code checks if the request's Content-Type header is JSON. 
 * If not, it throws a UnsupportedContentTypeError error, otherwise continues to execute the next middleware function.
 */

export const invalidAcceptMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.accept !== 'application/json') {
    return next(new UnsupportedAcceptError());
  }
  return next();
};
