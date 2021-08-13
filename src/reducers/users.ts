import { User } from '../interfaces';
import {
  CREATE_USER,
  GET_USER,
  USER_ERROR_MESSAGE,
  USER_ERRORS,
  USER_AUTHENTICATION,
} from '../constraints';
export default (
  user: User = {
    id: '',
    uid: '',
    isAuthenticated: false,
  },
  action: any
) => {
  switch (action.type) {
    case CREATE_USER:
      user.uid = action.payload.uid;
      user.id = action.payload.id;
      return user;
    case GET_USER:
      user.uid = action.payload.uid;
      user.isAuthenticated = action.payload.isAuthenticated;
      return user;
    case USER_AUTHENTICATION:
      user.uid = action.payload.uid;
      user.isAuthenticated = action.payload.isAuthenticated;
      return user;
    default:
      return user;
  }
};
