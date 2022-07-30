import {ADD_FILE_TO_FOLDER, CREATE_FOLDER, DELETE_FOLDER} from "./types";

const initState = []

const foldersReducer = (state = initState, action) => {

    switch (action.type) {
        case CREATE_FOLDER:
            return [...state, action.payload]

        case ADD_FILE_TO_FOLDER:
            const currentFolder = state.find(fo => fo.gid === action.payload.gid)
            if (currentFolder.files.includes(action.payload.fid)) {
                break;
            }
            const {files} = currentFolder
            const newFiles = [...files, action.payload.fid]
            currentFolder.files = newFiles
            return [...state.filter(fo => fo.gid !== action.payload.gid), currentFolder]

        case DELETE_FOLDER:
            return state.filter(f => f.gid !== action.payload)
        default:
            return state
    }

}

export default foldersReducer