import {CHANGE_THEME} from "../reducers/types";

export const changeTheme = () => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_THEME,
            payload: false
        })
    }
}