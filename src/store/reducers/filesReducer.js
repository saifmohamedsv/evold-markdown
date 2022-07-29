import {CREATE_FILE, DELETE_FILE, UPDATE_FILE} from "./types";

const initState = []

const filesReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_FILE:
            return [...state, action.payload]
        case DELETE_FILE:
            return state.filter(f => f.fid !== action.payload.fid)
        case UPDATE_FILE:
            const {fid} = action.payload
            const currentFile = state.find(f => f.fid === fid)
            return [...state.filter(f => f.fid !== fid), {...currentFile, content: action.payload.value}]
        default:
            return state
    }
}


export default filesReducer