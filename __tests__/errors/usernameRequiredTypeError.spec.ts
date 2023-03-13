import { UsernameRequiredTypeError } from "../../src/errors/customErrors";
import { errors } from "../../src/utils/constants";

describe('UnsupportedContentTypeError', () => {
  const defaultMsg = errors.messages.UNPROCESSABLE_ENTITY;
  const defaultStatusCode = errors.statusCodes.UNPROCESSABLE_ENTITY;

  it('error message should not be null', () => {
    const err = new UsernameRequiredTypeError();
    expect(err.message).not.toBeNull();
  });

  it('status code should not be null', () => {
    const err = new UsernameRequiredTypeError();
    expect(err.status).not.toBeNull();
  });

  it('should have default error message', () => {
    const err = new UsernameRequiredTypeError();
    expect(err.message).toEqual(defaultMsg);
  });

  it('should have default status code', () => {
    const err = new UsernameRequiredTypeError();
    expect(err.status).toEqual(defaultStatusCode);
  });

});
