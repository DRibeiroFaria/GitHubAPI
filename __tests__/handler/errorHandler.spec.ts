import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../src/errors/customErrors';
import { errorHandler } from '../../src/handler/errorHandler';

describe('errorHandler', () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  it('handle HTTP errors', () => {
    const error = new HttpError(404, 'Username not found');
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: 404, message: 'Username not found' });
  });

  it('handle internal server errors', () => {
    const error = new Error('Internal Server Error');
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});