import {ADD_FILE_TO_FOLDER} from "./types";

const initState = []

const foldersReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_FOLDER:
            return [...state, action.payload]
        case ADD_FILE_TO_FOLDER:
            return [...state, action.payload]
        default:
            return state
    }
}