import {combineReducers} from "redux";

import {persistReducer} from "redux-persist";

import storage from "redux-persist/lib/storage";

import mainReducer from './mainReducer'
import filesReducer from "./filesReducer";

export const rootReducer = combineReducers({
    main: mainReducer, files: filesReducer
});

const configStorage = {
    key: "root", storage, whitelist: ['main', 'files'],
};

export default persistReducer(configStorage, rootReducer);
