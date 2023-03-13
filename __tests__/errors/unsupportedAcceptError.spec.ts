import { UnsupportedAcceptError } from "../../src/errors/customErrors";
import { errors } from "../../src/utils/constants";

describe('UnsupportedContentTypeError', () => {
  const defaultMsg = errors.messages.NOT_ACCEPTABLE;
  const defaultStatusCode = errors.statusCodes.NOT_ACCEPTABLE;

  it('error message should not be null', () => {
    const err = new UnsupportedAcceptError();
    expect(err.message).not.toBeNull();
  });

  it('status code should not be null', () => {
    const err = new UnsupportedAcceptError();
    expect(err.status).not.toBeNull();
  });

  it('should have default error message', () => {
    const err = new UnsupportedAcceptError();
    expect(err.message).toEqual(defaultMsg);
  });

  it('should have default status code', () => {
    const err = new UnsupportedAcceptError();
    expect(err.status).toEqual(defaultStatusCode);
  });

});
