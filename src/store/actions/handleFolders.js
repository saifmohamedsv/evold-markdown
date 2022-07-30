import {ADD_FILE_TO_FOLDER, CREATE_FOLDER, DELETE_FOLDER} from "../reducers/types";


export const createNewFolder = (values) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_FOLDER,
            payload: values
        })
    }
}

export const deleteFolder = (gid) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_FOLDER,
            payload: gid
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