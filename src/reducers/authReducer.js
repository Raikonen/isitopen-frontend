import {
    SET_USER,
    UNSET_USER
} from '../actions/authActions';

const initialState = {
    isLoggedIn: false,
    authedEmail: "",
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                isLoggedIn: true,
                authedEmail: action.payload.authedEmail
            };
        case UNSET_USER:
            return {
                isLoggedIn: false,
                authedEmail: null
            };
        default:
            return state;
    }
}
