import {
    SET_USER
} from '../types';

// Crear nuevo producto
export function setUserAction(user) {
    return async (dispatch) => {
        dispatch(setUser(user));
    }
}

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});