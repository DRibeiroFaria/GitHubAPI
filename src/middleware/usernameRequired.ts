import { Request, Response, NextFunction } from 'express';
import { UsernameRequiredTypeError } from '../errors/customErrors';

/**
 * This code checks if the request's query parameter contains username 
 * If not, it throws a UsenameRequiredTypeError error, otherwise continues to execute the next middleware function.
 */

export const usernameRequiredMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.username) {
    return next(new UsernameRequiredTypeError());
  }
  return next();
};
