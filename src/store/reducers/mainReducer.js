import {CHANGE_THEME, TOGGLE_DRAWER} from "./types";

const initState = {
    darkMode: true,
    sideMenuOpened: true,
}

const mainReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, darkMode: !state.darkMode};
        case TOGGLE_DRAWER:
            return {...state, sideMenuOpened: !state.sideMenuOpened};
        default:
            return state;
    }
};

export default mainReducer;
