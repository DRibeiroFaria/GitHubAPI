import { UnsupportedAcceptError } from "../../src/errors/customErrors";
import { invalidAcceptMiddleware } from "../../src/middleware/invalidContent";

describe('invalidContentMiddleware', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('call next if content-type is "application/json"', () => {
    req.headers['accept'] = 'application/json';
    invalidAcceptMiddleware(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  it('throw an error if content-type is not "application/xml"', () => {
    req.headers['accept'] = 'application/xml';
    invalidAcceptMiddleware(req, res, next);
    expect(next).toBeCalledWith(new UnsupportedAcceptError());
  });
});