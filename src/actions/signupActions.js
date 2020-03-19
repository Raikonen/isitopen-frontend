import { db } from '../config/db'
import { setUser } from "./authActions";

export const SIGNUP_BEGIN = 'SIGNUP_BEGIN';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signupBegin = () => ({
  type: SIGNUP_BEGIN,
});

export const signupSuccess = (userInfo) => ({
  type: SIGNUP_SUCCESS,
  payload: { userInfo }
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: { error }
});

export const signup = (email, password) => {
  let userInfo = { email: email, password: password };
  return async dispatch => {
    dispatch(signupBegin());
    try {
      let res = await fetch(`${db}/add_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })
      let data = await res.json()
      dispatch(signupSuccess(data))
      dispatch(setUser(data.email))

    } catch(error) {
      dispatch(signupFailure('Server Error. Please try again later...'));
    }
  } 
}
