import { Book } from '../interfaces';
import {
  CREATE_BOOK,
  GET_BOOKS,
  UPDATE_RATING,
  DELETE_BOOK,
} from '../constraints';
export default (books: any[] = [], action: any) => {
  switch (action.type) {
    case GET_BOOKS:
      return action.payload;
    case CREATE_BOOK:
      return [...books, action.payload.book];
    case UPDATE_RATING:
      return books?.map((book) => {
        if (book.id === action.payload.id) {
          book.rating = action.payload.rating;
        }
        return book;
      });
    case DELETE_BOOK:
      return books?.filter((book) => book.id !== action.payload.id);

    default:
      return books;
  }
};
