import {ADD_FILE_TO_FOLDER, CREATE_FOLDER} from "../reducers/types";

const folderState = {
    nmae: "",
    id: 0,
    files: []
}

export const createNewFolder = (values) => {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_FOLDER,
            payload: values
        })
    }
}


export const addFileToFolder = (gid, fid) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_FILE_TO_FOLDER,
            payload: {gid, fid}
        })
    }
}