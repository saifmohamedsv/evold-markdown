import {combineReducers} from "redux";

import {persistReducer} from "redux-persist";

import storage from "redux-persist/lib/storage";

import mainReducer from './mainReducer'
import filesReducer from "./filesReducer";
import foldersReducer, {reFetchReducer} from "./foldersReducer";

export const rootReducer = combineReducers({
    main: mainReducer, files: filesReducer, folders: foldersReducer, reFetch: reFetchReducer
});

const configStorage = {
    key: "root", storage, whitelist: ['main', 'files', 'folders'],
};

export default persistReducer(configStorage, rootReducer);
