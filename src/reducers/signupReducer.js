import {
    SIGNUP_BEGIN,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from '../actions/signupActions';

const initialState = {
    userInfo: {},
    loading: false,
    error: null
};

export default function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_BEGIN:
            return {
                ...state,
                loading: true
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userInfo: action.payload.userInfo
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
