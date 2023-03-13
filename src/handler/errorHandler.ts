import { Request, Response, NextFunction } from 'express';
import { HttpError } from "../errors/customErrors";

/**
 * The code exports a function called 'errorHandler' that handles errors in requests. 
 * It checks if the error passed to it is an instance of HttpError, if so, sends back the status and message from the error. 
 * If not, it sends a generic "Internal Server Error" response with a 500 status code.
 */

export const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


