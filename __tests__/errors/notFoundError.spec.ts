import { NotFoundError } from "../../src/errors/customErrors";
import { errors } from "../../src/utils/constants";

describe('NotFoundError', () => {
  const defaultMsg = errors.messages.NOT_FOUND;
  const defaultStatusCode = errors.statusCodes.NOT_FOUND;

  it('error message should not be null', () => {
    const err = new NotFoundError();
    expect(err.message).not.toBeNull();
  });

  it('status code should not be null', () => {
    const err = new NotFoundError();
    expect(err.status).not.toBeNull();
  });

  it('should have default error message', () => {
    const err = new NotFoundError();
    expect(err.message).toEqual(defaultMsg);
  });

  it('should have default status code', () => {
    const err = new NotFoundError();
    expect(err.status).toEqual(defaultStatusCode);
  });

});
