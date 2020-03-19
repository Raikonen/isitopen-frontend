import { setUser } from "./authActions";

export const SET_EMAIL = 'SET_EMAIL';
export const VALIDATE_EMAIL_BEGIN = 'VALIDATE_EMAIL_BEGIN';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';
export const VALIDATE_PASSWORD_BEGIN = 'VALIDATE_PASSWORD_BEGIN';
export const VALIDATE_PASSWORD_SUCCESS = 'VALIDATE_PASSWORD_SUCCESS';
export const VALIDATE_PASSWORD_FAILURE = 'VALIDATE_PASSWORD_FAILURE';
export const CLEAR_FORM = 'CLEAR_FORM';

export const setEmail = (email) => ({
    type: SET_EMAIL,
    payload: { email }
});

export const validateEmailBegin = () => ({
    type: VALIDATE_EMAIL_BEGIN,
});

export const validateEmailSuccess = () => ({
    type: VALIDATE_EMAIL_SUCCESS,
});

export const validateEmailFailure = (error) => ({
    type: VALIDATE_EMAIL_FAILURE,
    payload: { error }
});

export const validatePasswordBegin = () => ({
    type: VALIDATE_PASSWORD_BEGIN,
});

export const validatePasswordSuccess = () => ({
    type: VALIDATE_PASSWORD_SUCCESS,
});

export const validatePasswordFailure = (error) => ({
    type: VALIDATE_PASSWORD_FAILURE,
    payload: { error }
});

export const clearForm = () => ({
    type: CLEAR_FORM,
});

export const validateEmail = (email) => {
    return async dispatch => {
        dispatch(validateEmailBegin());
        try {
            let res = await fetch('http://localhost:3000/validate_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
            if (res.status === 200) {
                dispatch(validateEmailSuccess())
                dispatch(setEmail(email))
            }
            else {
                dispatch(validateEmailFailure('User not found'))
            }
        } catch (error) {
            dispatch(validateEmailFailure('Server Error. Please try again later...'));
        }
    }
}

export const validatePassword = (email, password) => {
    return async dispatch => {
        dispatch(validatePasswordBegin());
        try {
            let res = await fetch('http://localhost:3000/validate_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            })
            if (res.status === 200) {
                dispatch(validateEmailSuccess())
                dispatch(clearForm())
                dispatch(setUser(email))
            }
            else {
                dispatch(validatePasswordFailure('Please check your password'))
            }
        } catch (error) {
            dispatch(validatePasswordFailure('Server Error. Please try again later...'));
        }
    }
}
