import {ADD_FILE_TO_FOLDER} from "../reducers/types";


export const createFolder = (values) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_FILE_TO_FOLDER,
            payload: {gid, fid}
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