import { combineReducers } from "redux";
import menuReducer from './menuReducer';
import userReducer from './userReducer';

export default combineReducers({
    menu: menuReducer,
    user: userReducer
});