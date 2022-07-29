import {combineReducers} from "redux";

import {persistReducer} from "redux-persist";

import storage from "redux-persist/lib/storage";

import mainReducer from './main'

export const rootReducer = combineReducers({
    main: mainReducer,
});

const configStorage = {
    key: "root",
    storage,
    whitelist: ['main'],
};

export default persistReducer(configStorage, rootReducer);
