import {
    SET_ISOPEN_MENU,
    SET_DARKMODE
} from '../types';

// Crear nuevo producto
export function isopenMenuAction(isopen) {
    return async (dispatch) => {
        dispatch(setIsopenMenu(isopen));
    }
}

const setIsopenMenu = (isopen) => ({
    type: SET_ISOPEN_MENU,
    payload: isopen
});

export function darkModeAction(darkMode) {
    return async (dispatch) => {
        dispatch(setDarkMode(darkMode));
    }
}

const setDarkMode = (darkMode) => ({
    type: SET_DARKMODE,
    payload: darkMode
})