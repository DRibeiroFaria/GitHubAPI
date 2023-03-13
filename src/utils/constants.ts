// object containing custom status codes and error messages.
export const errors = {
  statusCodes: {
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    UNPROCESSABLE_ENTITY : 422,
    INTERNAL_SERVER_ERROR: 500,

  },
  messages: {
    NOT_FOUND: 'Username not found',
    NOT_ACCEPTABLE: 'Accept not acceptable, use application/json',
    UNPROCESSABLE_ENTITY : 'Parameter username required',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  }
};
