import {errors} from '../utils/constants'

/**
 * This file exports a custom 
 * HttpError 
 * using Prototype Pattern, to add extra properties to an object while maintaining its base functionality
 * that is used to create more specific error classes 
 * NotFoundError  
 * UnsupportedAcceptError
 * UsernameRequiredTypeError
 * with appropriate error status codes and messages 
 */
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    //setting the prototype for an object being created with a class constructor.
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = errors.messages.NOT_FOUND) {
      super(errors.statusCodes.NOT_FOUND, message);
      Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnsupportedAcceptError extends HttpError {
  constructor(message: string = errors.messages.NOT_ACCEPTABLE) {
      super(errors.statusCodes.NOT_ACCEPTABLE, message);
      Object.setPrototypeOf(this, UnsupportedAcceptError.prototype);
  }
}

export class UsernameRequiredTypeError extends HttpError {
  constructor(message: string = errors.messages.UNPROCESSABLE_ENTITY) {
      super(errors.statusCodes.UNPROCESSABLE_ENTITY, message);
      Object.setPrototypeOf(this, UsernameRequiredTypeError.prototype);
  }
}