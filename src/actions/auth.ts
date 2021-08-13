import firebase from '../config/credential';
import 'firebase/firestore';
import 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { User } from '../interfaces';
import {
  CREATE_USER,
  GET_USER,
  USER_ERROR_MESSAGE,
  USER_ERRORS,
  USER_AUTHENTICATION,
} from '../constraints';
export const storeUser = (user: User) => async (dispatch: any) => {
  try {
    // console.log(user);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(String(user.email), String(user.password))
      .then(async (result) => {
        const db = firebase.firestore();
        await db
          .collection('users')
          .add({
            ...user,
            uid: result?.user?.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(async (res) => {
            await SecureStore.setItemAsync('email', String(user.email));
            await SecureStore.setItemAsync('password', String(user.password));
            await SecureStore.setItemAsync('uid', String(result?.user?.uid));
            await SecureStore.setItemAsync('id', String(res?.id));
            await dispatch({
              type: CREATE_USER,
              payload: {
                uid: result?.user?.uid,
                id: res?.id,
                success: true,
                isAuthenticated: true,
              },
            });
            await dispatch({
              type: 'RESULT_CREATE_USER',
              payload: {
                uid: result?.user?.uid,
                id: res?.id,
                success: true,
                isAuthenticated: true,
              },
            });
            console.log(res.id);
          })
          .catch(async (e) => {
            await dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: e.message,
              },
            });
          });
      })
      .catch(async (error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            // console.log(`Email address ${user.email} already in use.`);
            await dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: `Email address ${user.email} already in use.`,
              },
            });
            break;
          case 'auth/invalid-email':
            console.log(`Email address ${user.email} is invalid.`);
            await dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: `Email address ${user.email} is invalid.`,
              },
            });
            break;
          case 'auth/operation-not-allowed':
            console.log(`Error during sign up.`);
            await dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: `Error during sign up.`,
              },
            });
            break;
          case 'auth/weak-password':
            console.log(
              'Password is not strong enough. Add additional characters including special characters and numbers.'
            );
            await dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage:
                  'Password is not strong enough. Add additional characters including special characters and numbers.',
              },
            });
            break;
          default:
            console.log(error.message);
            await dispatch({
              type: USER_ERRORS,
              payload: {
                error: error.message,
              },
            });
            break;
        }
      });
  } catch (error: any) {
    console.error(error);
    await dispatch({
      type: USER_ERROR_MESSAGE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
};

export const login = (user: User) => async (dispatch: any) => {
  try {
    const email = await user.email;
    const password = await user.password;
    await firebase
      .auth()
      .signInWithEmailAndPassword(String(email), String(password))
      .then(async (success) => {
        await SecureStore.setItemAsync('email', String(email));
        await SecureStore.setItemAsync('password', String(password));
        await SecureStore.setItemAsync('uid', String(success?.user?.uid));
        await dispatch({
          type: GET_USER,
          payload: {
            uid: success?.user?.uid,
            success: true,
            isAuthenticated: true,
          },
        });
        await dispatch({
          type: 'RESULT_GET_USER',
          payload: {
            uid: success?.user?.uid,
            success: true,
            isAuthenticated: true,
          },
        });
      })
      .catch(async (error: any) => {
        console.log(error);

        await dispatch({
          type: USER_ERROR_MESSAGE,
          payload: {
            errorMessage: error.message,
          },
        });
      });
  } catch (e: any) {
    console.log(e);

    await dispatch({
      type: USER_ERROR_MESSAGE,
      payload: {
        errorMessage: e.message,
      },
    });
  }
};

export const isAuthenticated = () => async (dispatch: any) => {
  try {
    const email = await SecureStore.getItemAsync('email');
    const password = await SecureStore.getItemAsync('password');
    const uid = await SecureStore.getItemAsync('uid');
    const id = await SecureStore.getItemAsync('id');
    // console.log(email, password, uid, id);
    if (!email || !password || !uid) {
      dispatch({
        type: 'RESULT_USER_AUTHENTICATION',
        payload: {
          isAuthenticated: false,
          authState: 2,
        },
      });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (success) => {
          console.log(success?.user?.uid);
          await dispatch({
            type: USER_AUTHENTICATION,
            payload: {
              uid: success?.user?.uid,
              isAuthenticated: true,
            },
          });
          await dispatch({
            type: 'RESULT_USER_AUTHENTICATION',
            payload: {
              isAuthenticated: true,
              authState: 1,
            },
          });
        })
        .catch((error: any) => {
          console.log(error.message);
          dispatch({
            type: USER_ERROR_MESSAGE,
            payload: {
              authState: 2,
              errorMessage: error.message,
            },
          });
        });
    }
  } catch (e: any) {
    dispatch({
      type: USER_ERROR_MESSAGE,
      payload: {
        authState: 2,

        errorMessage: e.message,
      },
    });
  }
};
