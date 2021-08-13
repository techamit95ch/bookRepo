import {
  CREATE_BOOK,
  GET_BOOKS,
  BOOK_ERROR_MESSAGE,
  BOOK_ERRORS,
  UPDATE_RATING,
  DELETE_BOOK,
  CREATE_USER,
  GET_USER,
  USER_ERROR_MESSAGE,
  USER_ERRORS,
} from '../constraints';
export default (
  results: any = {
    errors: null,
    errorMessage: '',
    success: false,
    isError: false,
    authState: 0,
    isAuthenticated: false,
  },
  action: any
) => {
  switch (action.type) {
    case CREATE_BOOK:
      results.success = action.payload.success;
      results.isError = action.payload.isError;
      return results;
    case UPDATE_RATING:
      results.success = action.payload.success;
      return results;
    case DELETE_BOOK:
      results.success = action.payload.success;
      return results;
    case BOOK_ERROR_MESSAGE:
      results.isError = action.payload.isError;
      results.errorMessage = action.payload.errorMessage;
      return results;
    case BOOK_ERRORS:
      results.isError = action.payload.isError;
      results.errors = action.payload.errors;
      return results;
    case 'RESULT_CREATE_USER':
      results.success = action.payload.success;
      results.isAuthenticated = action.payload.isAuthenticated;
      return results;

    case USER_ERROR_MESSAGE:
      results.errorMessage = action.payload.errorMessage;
      results.authState = action.payload?.authState;
      return results;

    case 'RESULT_USER_AUTHENTICATION':
      results.isAuthenticated = action.payload.isAuthenticated;
      results.authState = action.payload.authState;
      return results;
    case 'RESULT_GET_USER':
      results.isAuthenticated = action.payload.isAuthenticated;
      results.success = action.payload.success;
    default:
      return results;
  }
};
