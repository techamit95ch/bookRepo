import { combineReducers } from 'redux';

import books from './books';
import user from './users';
import results from './results';
import authors from './authors';
export const reducers = combineReducers({ user, books, authors, results });
// export const reducers = combineReducers({ user, books, authors });
