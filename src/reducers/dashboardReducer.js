import {
    GET_RESTAURANT_NAMES_BEGIN,
    GET_RESTAURANT_NAMES_SUCCESS,
    GET_RESTAURANT_NAMES_FAILURE,
    GET_RESTAURANT_NAMES_BY_DATETIME_BEGIN,
    GET_RESTAURANT_NAMES_BY_DATETIME_SUCCESS,
    GET_RESTAURANT_NAMES_BY_DATETIME_FAILURE
} from '../actions/dashboardActions';

const initialState = {
    restaurants: [],
    loading: false,
    error: null
};

export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RESTAURANT_NAMES_BEGIN:
            return {
                ...state,
                loading: true
            };
        case GET_RESTAURANT_NAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurants: action.payload.restaurants
            };
        case GET_RESTAURANT_NAMES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case GET_RESTAURANT_NAMES_BY_DATETIME_BEGIN:
            return {
                ...state,
                loading: true
            };
        case GET_RESTAURANT_NAMES_BY_DATETIME_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurants: action.payload.restaurants
            };
        case GET_RESTAURANT_NAMES_BY_DATETIME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
