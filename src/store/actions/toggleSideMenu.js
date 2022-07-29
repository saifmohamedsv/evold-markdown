import {TOGGLE_DRAWER} from "../reducers/types";

export const toggleSideMenu = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DRAWER,
            payload: false
        })
    }
}