export const toggleSideMenu = () => {
    return (dispatch) => {
        dispatch({
            type: "TOGGLE_DRAWER",
            payload: false
        })
    }
}