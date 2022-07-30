import {ADD_FILE_TO_FOLDER, CREATE_FOLDER, DELETE_FOLDER, REFETCH} from "./types";

const initState = []

const foldersReducer = (state = initState, action) => {

    switch (action.type) {

        case CREATE_FOLDER:
            return [...state, action.payload]

        case ADD_FILE_TO_FOLDER:
            console.log(action.payload)
            const currentFolder = state.find(fo => fo.gid === action.payload.gid)
            const newFiles = [...currentFolder.files, action.payload.fid]
            const newFolder = {...currentFolder, files: newFiles}
            const removedFolder = state.filter(fo => fo.gid !== action.payload.gid)
            const result = [...removedFolder, newFolder]
            return result

        case DELETE_FOLDER:
            return state.filter(f => f.gid !== action.payload)


        default:
            return state
    }

}

export const reFetchReducer = (state = false, action) => {
    switch (action.type) {
        case REFETCH:
            return !state
        default:
            return state
    }
}

export default foldersReducer