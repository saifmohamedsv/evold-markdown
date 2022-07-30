import {ADD_FILE_TO_FOLDER, CREATE_FOLDER, DELETE_FILE, DELETE_FOLDER, REFETCH} from "../reducers/types";


export const createNewFolder = (values) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_FOLDER,
            payload: values
        })
    }
}

export const deleteFolder = (gid) => {
    return (dispatch, getState) => {
        const folder = getState().folders?.find(f => f.gid === gid)
        const files = getState().files?.filter((f, i) => f.fid === folder.files[i])
        files.map((file) => dispatch({
                type: DELETE_FILE,
                payload: file
            })
        )
        dispatch({
            type: DELETE_FOLDER,
            payload: gid
        })
    }
}

export const addFileToFolder = (gid, fid) => {
    return (dispatch) => {
        dispatch({
            type: ADD_FILE_TO_FOLDER,
            payload: {gid, fid}
        })
    }
}


export const reFetch = () => {
    return (dispatch) => {
        dispatch({
            type: REFETCH,
            payload: false
        })
    }
}