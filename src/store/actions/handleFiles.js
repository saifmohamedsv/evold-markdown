import {CREATE_FILE, DELETE_FILE, UPDATE_FILE} from "../reducers/types";


export const createNewFile = (values) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_FILE,
            payload: values
        })
    }
}

export const deleteFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_FILE,
            payload: file
        })
    }
}

export const updateFileContent = (value, fid) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_FILE,
            payload: {value, fid}
        })
    }
}