// import React from 'react';
import firebase from '../config/credential';
import 'firebase/firestore';
import 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { Book, Books } from '../interfaces';
import {
  CREATE_BOOK,
  GET_BOOKS,
  BOOK_ERROR_MESSAGE,
  BOOK_ERRORS,
  UPDATE_RATING,
  DELETE_BOOK,
} from '../constraints';
export const storeBook = (book: Book) => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const uid = await SecureStore.getItemAsync('uid');
    const id = Date.now();
    await db
      .collection('books')
      .add({
        ...book,
        uid: uid,
        // id: id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        dispatch({
          type: CREATE_BOOK,
          payload: {
            uid: uid,
            // id: id,
            success: true,
            book: {
              ...book,
              uid: uid,
              id: res?.id,
            },
            isError: false,
            errorMessage: '',
          },
        });
        dispatch({
          type: 'CREATE_AUTHOR',
          payload: book.author,
        });
        // console.log(res.id);
      })
      .catch((e) => {
        console.error(e);
        dispatch({
          type: BOOK_ERROR_MESSAGE,
          payload: {
            isError: true,
            errorMessage: e.message,
          },
        });
      });
  } catch (err: any) {
    console.error(err);

    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: err.message,
      },
    });
  }
};

export const getBooksUid = () => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const uid = await SecureStore.getItemAsync('uid');
    const BookRef = db.collection('books');
    const query = await BookRef.where('uid', '==', uid);
    query
      .get()
      .then((res) => {})
      .catch((err: any) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
};

export const getAll = () => async (dispatch: any) => {
  try {
    let books: any[] = [];
    const db = firebase.firestore();
    const uid = await SecureStore.getItemAsync('uid');
    const BookRef = db.collection('books');
    // const query = BookRef.where('uid', '==', uid);
    const query = BookRef;
    let authors: string[] = [];
    query
      .get()
      .then((res) => {
        // console.log("res, ",res);

        res.forEach(function (doc) {
          // console.log(doc.data().id);
          if (!authors.includes(doc.data().author)) {
            authors.push(doc.data().author);
          }
          books.push({
            id: doc.id,
            uid: doc.data().uid,
            author: doc.data().author,
            title: doc.data().title,
            rating: doc.data().rating,
            description: doc.data().description,
          });
          // books.push(doc.data());
        });
        dispatch({
          type: GET_BOOKS,
          payload: books,
        });
        dispatch({
          type: 'GET_AUTHORS',
          payload: authors,
        });
        // console.log('books', books);
        // console.log('authors', authors);
      })
      .catch((err: any) => {
        console.log(err.message);

        dispatch({
          type: BOOK_ERROR_MESSAGE,
          payload: {
            isError: true,
            errorMessage: err.message,
          },
        });
        console.log(err);
      });
  } catch (e: any) {
    console.log(e.message);

    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: e.message,
      },
    });
    console.log(e);
  }
};
export const updateRating = (book, rating) => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const BookRef = db.collection('books');
    const query = await BookRef.doc(book.id)
      .set({ ...book, rating: rating })
      .then((res) => {
        dispatch({
          type: UPDATE_RATING,
          payload: {
            id: book.id,
            rating: rating,
            success: true,
            book: book,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: BOOK_ERROR_MESSAGE,
          payload: {
            isError: true,
            errorMessage: err.message,
          },
        });
      });
  } catch (e: any) {
    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: e.message,
      },
    });
  }
};
export const deleteBook = (id) => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const BookRef = db.collection('books');
    const query = await BookRef.doc(id)
      .delete()
      .then((res) => {
        dispatch({
          type: DELETE_BOOK,
          payload: {
            id: id,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: BOOK_ERROR_MESSAGE,
          payload: {
            isError: true,
            errorMessage: err.message,
          },
        });
      });
  } catch (e: any) {
    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: e.message,
      },
    });
  }
};
