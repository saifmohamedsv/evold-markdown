import {ADD_FILE_TO_FOLDER, CREATE_FOLDER} from "./types";

const initState = []

const foldersReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_FOLDER:
            return [...state, action.payload]

        case ADD_FILE_TO_FOLDER:
            const currentFolder = state.find(fo => fo.gid === action.payload.gid)
            const {files} = currentFolder
            const newFiles = [...files, action.payload.fid]
            currentFolder.files = newFiles

            return [...state.filter(fo => fo.gid !== action.payload.gid), currentFolder]
        default:
            return state
    }
}


export default foldersReducer