import { UsernameRequiredTypeError } from "../../src/errors/customErrors";
import { usernameRequiredMiddleware } from "../../src/middleware/usernameRequired";

describe('usernameRequired', () => {
  let req: any;
  let res: any;
  let next: any;
  
  it('should call next if username exists in request query', () => {
    req = {
        query: {
            username: 'testUser',
        },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    usernameRequiredMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  
  it('should throw UsernameRequiredTypeError error if username is not present in request query', () => {
    req = {
      query: {},
    } as any;
    res = {} as any;
    next = jest.fn();
    
    usernameRequiredMiddleware(req, res, next)
    expect(next).toBeCalledWith(new UsernameRequiredTypeError());
  });
});