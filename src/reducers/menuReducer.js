import {
    SET_ISOPEN_MENU,
    SET_DARKMODE
} from '../types';

// Cada reducer tiene su propio state
const initialState = {
    isopen: false,
    darkMode: false
}

export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ISOPEN_MENU:
            return {
                ...state,
                isopen: action.payload
            }
        case SET_DARKMODE:
            return {
                ...state,
                darkMode: action.payload
            }
        default:
            return state;
    }
}